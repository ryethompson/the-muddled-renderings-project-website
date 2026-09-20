/**
 * THE MUDDLED RENDERINGS PROJECT - Atlas Canvas Component
 * 
 * Interactive 2D Canvas viewport containing the giant OECD visual field.
 * Supports smooth autonomous 60fps animation, pan/zoom camera controls,
 * click hit-testing, and accessible navigation.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CountryEconomicProfile, Indicator } from '../types';
import {
  FieldRenderState,
  drawAtmosphericField,
  drawCountryLandscape,
  hitTestCountry,
} from '../visual/landscapeRenderer';
import { CountryAnnotationCard } from './CountryAnnotationCard';
import { Compass, RotateCcw, ZoomIn, ZoomOut, Eye, Wind } from 'lucide-react';

interface AtlasCanvasProps {
  countries: CountryEconomicProfile[];
  indicators: Indicator[];
  selectedCountryId: string | null;
  onSelectCountry: (id: string | null) => void;
}

export const AtlasCanvas: React.FC<AtlasCanvasProps> = ({
  countries,
  indicators,
  selectedCountryId,
  onSelectCountry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Camera & Interaction State
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 0.95 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  // Target camera for smooth interpolation
  const targetCameraRef = useRef({ x: 0, y: 0, zoom: 0.95 });
  const currentCameraRef = useRef({ x: 0, y: 0, zoom: 0.95 });

  // Detect system reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // When a country is selected, smoothly pan towards it
  useEffect(() => {
    if (selectedCountryId) {
      const selected = countries.find((c) => c.country.id === selectedCountryId);
      if (selected) {
        targetCameraRef.current = {
          x: -selected.country.fieldPosition.x * 1.05,
          y: -selected.country.fieldPosition.y * 1.05 + 40,
          zoom: 1.15,
        };
      }
    }
  }, [selectedCountryId, countries]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) / 1000;

      // Smooth camera lerp
      currentCameraRef.current.x += (targetCameraRef.current.x - currentCameraRef.current.x) * 0.08;
      currentCameraRef.current.y += (targetCameraRef.current.y - currentCameraRef.current.y) * 0.08;
      currentCameraRef.current.zoom += (targetCameraRef.current.zoom - currentCameraRef.current.zoom) * 0.08;

      const state: FieldRenderState = {
        time,
        selectedCountryId,
        camera: currentCameraRef.current,
        width: canvas.width,
        height: canvas.height,
        reducedMotion,
      };

      // 1. Clear and paint ambient field
      drawAtmosphericField(ctx, state, countries);

      // 2. Paint country landscapes
      ctx.save();
      ctx.translate(canvas.width / 2 + state.camera.x, canvas.height / 2 + state.camera.y);
      ctx.scale(state.camera.zoom, state.camera.zoom);

      // Sort by Y position for proper isometric depth layering
      const sorted = [...countries].sort(
        (a, b) => a.country.fieldPosition.y - b.country.fieldPosition.y
      );

      // Draw non-selected countries first, then selected country on top
      for (const profile of sorted) {
        if (profile.country.id !== selectedCountryId) {
          drawCountryLandscape(ctx, profile, state);
        }
      }

      // Draw selected on top if present
      if (selectedCountryId) {
        const sel = countries.find((c) => c.country.id === selectedCountryId);
        if (sel) {
          drawCountryLandscape(ctx, sel, state);
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [countries, selectedCountryId, reducedMotion]);

  // Resize Observer for HiDPI crisp canvas
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Pointer & Pan Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    targetCameraRef.current.x += dx;
    targetCameraRef.current.y += dy;
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newZoom = Math.max(0.45, Math.min(2.4, targetCameraRef.current.zoom * zoomFactor));
    targetCameraRef.current.zoom = newZoom;
  };

  // Click Selection Handler
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const state: FieldRenderState = {
      time: 0,
      selectedCountryId,
      camera: currentCameraRef.current,
      width: rect.width,
      height: rect.height,
      reducedMotion,
    };

    // Check hit test across all countries (check selected first or reverse sorted)
    let clickedProfile: CountryEconomicProfile | null = null;
    for (let i = countries.length - 1; i >= 0; i--) {
      if (hitTestCountry(clickX, clickY, countries[i], state)) {
        clickedProfile = countries[i];
        break;
      }
    }

    if (clickedProfile) {
      onSelectCountry(clickedProfile.country.id);
    } else {
      // Click on background deselects
      onSelectCountry(null);
    }
  };

  // Reset Camera View
  const handleResetView = () => {
    onSelectCountry(null);
    targetCameraRef.current = { x: 0, y: 0, zoom: 0.95 };
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.45, Math.min(2.4, targetCameraRef.current.zoom + delta));
    targetCameraRef.current.zoom = newZoom;
  };

  const selectedProfile = countries.find((c) => c.country.id === selectedCountryId) || null;

  return (
    <div
      id="atlas-canvas-container"
      ref={containerRef}
      className="relative w-full h-[78vh] min-h-[640px] max-h-[920px] rounded-2xl overflow-hidden border border-white/10 bg-[#090a0f] shadow-2xl shadow-black/80"
    >
      <canvas
        id="atlas-interactive-canvas"
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
        tabIndex={0}
        aria-label="Interactive OECD Economic Atlas Field"
        role="region"
      />

      {/* Floating Viewport Controls */}
      <div 
        id="canvas-controls-toolbar"
        className="absolute bottom-5 left-6 z-20 flex items-center gap-1.5 p-1.5 rounded-xl border border-white/10 bg-[#0d0f18]/80 backdrop-blur-md text-white/70"
      >
        <button
          id="zoom-in-button"
          onClick={() => handleZoom(0.15)}
          title="Zoom In"
          className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={15} />
        </button>
        <button
          id="zoom-out-button"
          onClick={() => handleZoom(-0.15)}
          title="Zoom Out"
          className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={15} />
        </button>
        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />
        <button
          id="reset-view-button"
          onClick={handleResetView}
          title="Reset Perspective"
          className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
          aria-label="Reset perspective"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline text-[11px]">Reset</span>
        </button>
        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />
        <button
          id="reduced-motion-toggle"
          onClick={() => setReducedMotion(!reducedMotion)}
          title={reducedMotion ? "Enable Autonomous Animation" : "Reduce Motion"}
          className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs ${
            reducedMotion ? 'bg-white/20 text-white' : 'hover:bg-white/10 hover:text-white'
          }`}
          aria-label="Toggle animation motion"
        >
          <Wind size={14} />
          <span className="text-[10px] font-mono hidden md:inline">
            {reducedMotion ? 'Motion: Off' : 'Motion: Live'}
          </span>
        </button>
      </div>

      {/* Understated Field Atmosphere Status */}
      <div className="absolute top-5 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/40 bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>38 OECD ARCHIPELAGO ECOSYSTEMS</span>
      </div>

      {/* Country Annotation Details Card */}
      <CountryAnnotationCard
        profile={selectedProfile}
        indicators={indicators}
        onClose={() => onSelectCountry(null)}
      />
    </div>
  );
};
