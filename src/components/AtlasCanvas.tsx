/**
 * THE MUDDLED RENDERINGS PROJECT - Atlas Canvas Component
 * 
 * Interactive 2D Canvas viewport containing the giant OECD visual field.
 * Supports:
 * - Multi-year temporal slider (2014–2024) with interactive scrubbing and animated playback
 * - Smooth cross-temporal visual parameter morphing (60 FPS)
 * - Pan/zoom camera controls and click hit-testing
 * - Transparent display of verified vs. 2-year interpolated observations
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CountryEconomicProfile, Indicator, TimeSeriesSummary } from '../types';
import {
  FieldRenderState,
  drawAtmosphericField,
  drawCountryLandscape,
  hitTestCountry,
} from '../visual/landscapeRenderer';
import { CountryAnnotationCard } from './CountryAnnotationCard';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface AtlasCanvasProps {
  countries: CountryEconomicProfile[];
  indicators: Indicator[];
  selectedCountryId: string | null;
  onSelectCountry: (id: string | null) => void;
  // Time Series Props
  availableYears?: number[];
  selectedYear?: number;
  onSelectYear?: (year: number) => void;
  yearlyProfiles?: Record<number, CountryEconomicProfile[]>;
  timeSeriesMetadata?: TimeSeriesSummary;
}

export const AtlasCanvas: React.FC<AtlasCanvasProps> = ({
  countries: defaultCountries,
  indicators,
  selectedCountryId,
  onSelectCountry,
  availableYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  selectedYear: externalSelectedYear,
  onSelectYear,
  yearlyProfiles,
  timeSeriesMetadata,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Temporal State
  const [internalYear, setInternalYear] = useState<number>(externalSelectedYear || 2024);
  const currentYear = externalSelectedYear !== undefined ? externalSelectedYear : internalYear;

  // Active countries for selected year
  const activeCountries = useMemo(() => {
    if (yearlyProfiles && yearlyProfiles[currentYear]) {
      return yearlyProfiles[currentYear];
    }
    return defaultCountries;
  }, [yearlyProfiles, currentYear, defaultCountries]);

  // Smooth visual morphing state: tracks smoothly lerped profiles between years
  const lerpedProfilesRef = useRef<CountryEconomicProfile[]>(activeCountries);

  // Update target profiles when year or dataset changes
  useEffect(() => {
    // If not initialized yet, clone active
    if (!lerpedProfilesRef.current || lerpedProfilesRef.current.length !== activeCountries.length) {
      lerpedProfilesRef.current = JSON.parse(JSON.stringify(activeCountries));
    }
  }, [activeCountries]);

  // Handle year change from slider
  const handleYearChange = (newYear: number) => {
    const clamped = Math.max(availableYears[0], Math.min(availableYears[availableYears.length - 1], newYear));
    if (onSelectYear) {
      onSelectYear(clamped);
    } else {
      setInternalYear(clamped);
    }
  };

  // Camera & Interaction State
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 0.95 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Motion state: Live motion animation kept active as default
  const reducedMotion = false;

  // Target camera for smooth interpolation
  const targetCameraRef = useRef({ x: 0, y: 0, zoom: 0.95 });
  const currentCameraRef = useRef({ x: 0, y: 0, zoom: 0.95 });

  // When a country is selected, smoothly pan towards it
  useEffect(() => {
    if (selectedCountryId) {
      const selected = activeCountries.find((c) => c.country.id === selectedCountryId);
      if (selected) {
        targetCameraRef.current = {
          x: -selected.country.fieldPosition.x * 1.05,
          y: -selected.country.fieldPosition.y * 1.05 + 40,
          zoom: 1.15,
        };
      }
    }
  }, [selectedCountryId, activeCountries]);

  // Main Canvas Render Loop with real-time parameter morphing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) / 1000;

      // 1. Smooth camera lerp
      currentCameraRef.current.x += (targetCameraRef.current.x - currentCameraRef.current.x) * 0.08;
      currentCameraRef.current.y += (targetCameraRef.current.y - currentCameraRef.current.y) * 0.08;
      currentCameraRef.current.zoom += (targetCameraRef.current.zoom - currentCameraRef.current.zoom) * 0.08;

      // 2. Smoothly morph country visual encodings toward target year
      const lerpSpeed = reducedMotion ? 1.0 : 0.12;
      const targetProfiles = activeCountries;

      if (!lerpedProfilesRef.current || lerpedProfilesRef.current.length !== targetProfiles.length) {
        lerpedProfilesRef.current = JSON.parse(JSON.stringify(targetProfiles));
      } else {
        for (let i = 0; i < targetProfiles.length; i++) {
          const cur = lerpedProfilesRef.current[i];
          const tgt = targetProfiles[i];
          if (!cur || !tgt) continue;

          // Morph terrain geometry
          cur.encoding.baseRadius += (tgt.encoding.baseRadius - cur.encoding.baseRadius) * lerpSpeed;
          cur.encoding.elevationHeight += (tgt.encoding.elevationHeight - cur.encoding.elevationHeight) * lerpSpeed;
          cur.encoding.spireHeight += (tgt.encoding.spireHeight - cur.encoding.spireHeight) * lerpSpeed;
          cur.encoding.plumeParticleCount += (tgt.encoding.plumeParticleCount - cur.encoding.plumeParticleCount) * lerpSpeed;
          cur.encoding.emergenceVelocity += (tgt.encoding.emergenceVelocity - cur.encoding.emergenceVelocity) * lerpSpeed;
          cur.encoding.coherenceAuraRadius += (tgt.encoding.coherenceAuraRadius - cur.encoding.coherenceAuraRadius) * lerpSpeed;
          cur.encoding.veinPulseSpeed += (tgt.encoding.veinPulseSpeed - cur.encoding.veinPulseSpeed) * lerpSpeed;
          cur.encoding.internalTextureAlpha += (tgt.encoding.internalTextureAlpha - cur.encoding.internalTextureAlpha) * lerpSpeed;
          cur.encoding.latticeFrequency = tgt.encoding.latticeFrequency;
          cur.encoding.layerCount = tgt.encoding.layerCount;
          cur.encoding.filamentCount = tgt.encoding.filamentCount;
          cur.encoding.baseHue += (tgt.encoding.baseHue - cur.encoding.baseHue) * lerpSpeed;
          cur.encoding.saturation += (tgt.encoding.saturation - cur.encoding.saturation) * lerpSpeed;
          cur.encoding.lightness += (tgt.encoding.lightness - cur.encoding.lightness) * lerpSpeed;

          // Synchronize metric values & smoothly interpolate normalized values
          cur.metrics = tgt.metrics;
          cur.normalized = {
            ...tgt.normalized,
            rdExpenditureNorm: cur.normalized.rdExpenditureNorm + (tgt.normalized.rdExpenditureNorm - cur.normalized.rdExpenditureNorm) * lerpSpeed,
          };
        }
      }

      const displayProfiles = lerpedProfilesRef.current;

      const state: FieldRenderState = {
        time,
        selectedCountryId,
        camera: currentCameraRef.current,
        width: canvas.width,
        height: canvas.height,
        reducedMotion,
      };

      // Paint atmospheric field
      drawAtmosphericField(ctx, state, displayProfiles);

      // Paint country landscapes
      ctx.save();
      ctx.translate(canvas.width / 2 + state.camera.x, canvas.height / 2 + state.camera.y);
      ctx.scale(state.camera.zoom, state.camera.zoom);

      // Sort by Y position for proper isometric depth layering
      const sorted = [...displayProfiles].sort(
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
        const sel = displayProfiles.find((c) => c.country.id === selectedCountryId);
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
  }, [activeCountries, selectedCountryId, reducedMotion]);

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

    let clickedProfile: CountryEconomicProfile | null = null;
    for (let i = activeCountries.length - 1; i >= 0; i--) {
      if (hitTestCountry(clickX, clickY, activeCountries[i], state)) {
        clickedProfile = activeCountries[i];
        break;
      }
    }

    if (clickedProfile) {
      onSelectCountry(clickedProfile.country.id);
    } else {
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

  const selectedProfile = activeCountries.find((c) => c.country.id === selectedCountryId) || null;

  // Year macro averages for HUD badge
  return (
    <div
      id="atlas-canvas-container"
      ref={containerRef}
      className="relative w-full h-[82vh] min-h-[660px] max-h-[940px] rounded-2xl overflow-hidden border border-white/10 bg-[#090a0f] shadow-2xl shadow-black/80 flex flex-col justify-end"
    >
      <canvas
        id="atlas-interactive-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing block"
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

      {/* ========================================================================= */}
      {/* FLOATING VIEWPORT & TIME SERIES CONTROLS */}
      {/* Sequence: Zoom In, Zoom Out, Reset, Time Series Slider */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full p-4 sm:p-6 flex items-end justify-between pointer-events-none">
        <div 
          id="canvas-controls-toolbar"
          className="pointer-events-auto flex items-center flex-wrap gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-white/15 bg-[#0d0f18]/90 backdrop-blur-md text-white/70 shadow-2xl max-w-full"
        >
          {/* 1. Zoom In */}
          <button
            id="zoom-in-button"
            onClick={() => handleZoom(0.15)}
            title="Zoom In"
            className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={15} />
          </button>

          {/* 2. Zoom Out */}
          <button
            id="zoom-out-button"
            onClick={() => handleZoom(-0.15)}
            title="Zoom Out"
            className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut size={15} />
          </button>

          <div className="w-[1px] h-5 bg-white/15 mx-0.5" />

          {/* 3. Reset */}
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

          <div className="w-[1px] h-5 bg-white/15 mx-0.5" />

          {/* 4. Time Series Slider */}
          <div 
            id="timeseries-slider-container"
            className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 hidden md:inline">Year</span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 text-center select-none min-w-[3.25rem]">
                {currentYear}
              </span>
            </div>

            <span className="text-[10px] font-mono text-white/40 hidden sm:inline select-none">
              {availableYears[0]}
            </span>

            <input
              id="timeseries-range-slider"
              type="range"
              min={availableYears[0]}
              max={availableYears[availableYears.length - 1]}
              step={1}
              value={currentYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="w-28 xs:w-36 sm:w-44 md:w-56 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 focus:outline-none transition-all"
              aria-label="Time series year slider"
            />

            <span className="text-[10px] font-mono text-white/40 hidden sm:inline select-none">
              {availableYears[availableYears.length - 1]}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. COUNTRY ANNOTATION CARD (WHEN COUNTRY IS CLICKED) */}
      {/* ========================================================================= */}
      <CountryAnnotationCard
        profile={selectedProfile}
        indicators={indicators}
        selectedYear={currentYear}
        onClose={() => onSelectCountry(null)}
      />


    </div>
  );
};
