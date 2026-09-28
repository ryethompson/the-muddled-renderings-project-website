import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Project, ProjectParameters } from '../types/projects';
import { Play, Pause, RotateCcw, Sparkles, Maximize2, Minimize2, Eye, Compass, Waves, Activity } from 'lucide-react';

interface GenerativeProjectCanvasProps {
  project: Project;
  onUpdateParameters?: (params: Partial<ProjectParameters>) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  id: string;
  cluster?: number;
  label?: string;
  value?: string;
}

const PALETTES = {
  obsidian_gold: {
    bg: '#08090c',
    primary: '#d4af37',
    secondary: '#8e793e',
    glow: '#f3e5ab',
    accent: '#e6c66e',
    lines: 'rgba(212, 175, 55, 0.18)',
    particles: ['#d4af37', '#e6c66e', '#fdf6e2', '#8e793e', '#bfa14b'],
  },
  neon_amber: {
    bg: '#090807',
    primary: '#ff9900',
    secondary: '#d66800',
    glow: '#ffbb4d',
    accent: '#ffa62b',
    lines: 'rgba(255, 153, 0, 0.18)',
    particles: ['#ff9900', '#ffa62b', '#ffd166', '#d66800', '#fff3b0'],
  },
  celestial_amethyst: {
    bg: '#090810',
    primary: '#a855f7',
    secondary: '#6366f1',
    glow: '#c084fc',
    accent: '#ec4899',
    lines: 'rgba(168, 85, 247, 0.18)',
    particles: ['#a855f7', '#818cf8', '#c084fc', '#e879f9', '#f43f5e'],
  },
  emerald_mist: {
    bg: '#060a08',
    primary: '#10b981',
    secondary: '#06b6d4',
    glow: '#34d399',
    accent: '#14b8a6',
    lines: 'rgba(16, 185, 129, 0.18)',
    particles: ['#10b981', '#34d399', '#2dd4bf', '#06b6d4', '#6ee7b7'],
  },
  monochrome_noir: {
    bg: '#070708',
    primary: '#e5e7eb',
    secondary: '#9ca3af',
    glow: '#ffffff',
    accent: '#d1d5db',
    lines: 'rgba(229, 231, 235, 0.15)',
    particles: ['#ffffff', '#e5e7eb', '#9ca3af', '#6b7280', '#d1d5db'],
  },
  cinnabar_ember: {
    bg: '#0a0606',
    primary: '#ef4444',
    secondary: '#f97316',
    glow: '#f87171',
    accent: '#fb923c',
    lines: 'rgba(239, 68, 68, 0.18)',
    particles: ['#ef4444', '#f97316', '#fb923c', '#f87171', '#fca5a5'],
  },
};

export const GenerativeProjectCanvas: React.FC<GenerativeProjectCanvasProps> = ({
  project,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Particle | null>(null);
  const [fps, setFps] = useState(60);
  const [activeParticleCount, setActiveParticleCount] = useState(project.parameters.particleCount);

  const mousePosRef = useRef<{ x: number; y: number; isDown: boolean; isHovering: boolean }>({
    x: 0,
    y: 0,
    isDown: false,
    isHovering: false,
  });

  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);
  const fpsTrackerRef = useRef<{ lastTime: number; frames: number }>({
    lastTime: performance.now(),
    frames: 0,
  });

  const palette = useMemo(() => {
    return PALETTES[project.parameters.colorPalette] || PALETTES.obsidian_gold;
  }, [project.parameters.colorPalette]);

  // Initialize particles based on renderingEngine and customSeed
  useEffect(() => {
    const count = project.parameters.particleCount;
    setActiveParticleCount(count);
    const newParticles: Particle[] = [];
    const colors = palette.particles;

    // Seeded random helper
    let seed = project.parameters.customSeed || 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const width = 1200;
    const height = 650;

    const sampleLabels = [
      'Nodal Resonance α', 'Vector Vorticity', 'Kinetic Flux Point', 'Harmonic Anchor',
      'Entropy Siphon', 'Lorentz Curve 04', 'Thermal Crest', 'Topological Spore',
      'Quantum Node 12', 'Decay Gradient', 'Geomagnetic Node', 'Spectral Singularity'
    ];

    for (let i = 0; i < count; i++) {
      const cluster = i % 5;
      const angle = pseudoRandom() * Math.PI * 2;
      const dist = pseudoRandom() * (Math.min(width, height) * 0.42);
      const cx = width / 2 + Math.cos(angle) * dist;
      const cy = height / 2 + Math.sin(angle) * dist;

      const baseRad = 1.5 + pseudoRandom() * 3.5;
      const hasLabel = i < 12;

      newParticles.push({
        id: `node-${i}`,
        x: cx,
        y: cy,
        vx: (pseudoRandom() - 0.5) * 1.2 * project.parameters.speed,
        vy: (pseudoRandom() - 0.5) * 1.2 * project.parameters.speed,
        radius: baseRad,
        baseRadius: baseRad,
        color: colors[Math.floor(pseudoRandom() * colors.length)],
        alpha: 0.3 + pseudoRandom() * 0.7,
        life: pseudoRandom() * 100,
        maxLife: 80 + pseudoRandom() * 120,
        cluster,
        label: hasLabel ? sampleLabels[i] : undefined,
        value: hasLabel ? `${(pseudoRandom() * 95 + 5).toFixed(1)} unit` : undefined,
      });
    }

    particlesRef.current = newParticles;
    setSelectedNode(null);
  }, [project.id, project.parameters.particleCount, project.parameters.customSeed, palette, project.parameters.speed]);

  // Main rendering & physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const now = performance.now();
      fpsTrackerRef.current.frames++;
      if (now - fpsTrackerRef.current.lastTime >= 1000) {
        setFps(fpsTrackerRef.current.frames);
        fpsTrackerRef.current.frames = 0;
        fpsTrackerRef.current.lastTime = now;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Subtle background trail
      ctx.fillStyle = palette.bg;
      ctx.globalAlpha = 0.22;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1.0;

      timeRef.current += 0.015 * project.parameters.speed;
      const t = timeRef.current;
      const mouse = mousePosRef.current;
      const turbulence = project.parameters.turbulence;
      const engine = project.renderingEngine;

      // Draw subtle coordinate grid / radar rings in background
      ctx.strokeStyle = palette.lines;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.38, 0, Math.PI * 2);
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.22, 0, Math.PI * 2);
      ctx.stroke();

      // Draw vector field or wave background depending on engine
      if (engine === 'cybernetic_waves') {
        ctx.strokeStyle = palette.lines;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < w; x += 6) {
          const y = h / 2 + Math.sin(x * 0.008 + t * 2) * 50 * turbulence + Math.cos(x * 0.018 - t) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const particles = particlesRef.current;

      // Physics update & connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isPlaying) {
          if (engine === 'fluid_harmonic') {
            // Harmonic curl noise vector field
            const angle = Math.sin(p.x * 0.004 * turbulence + t) * Math.cos(p.y * 0.004 * turbulence + t * 0.7) * Math.PI * 2;
            p.vx += Math.cos(angle) * 0.08 * project.parameters.speed;
            p.vy += Math.sin(angle) * 0.08 * project.parameters.speed;
          } else if (engine === 'quantum_lattice') {
            // Nodal orbit / central gravitational attraction
            const dx = w / 2 - p.x;
            const dy = h / 2 - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 0.0004 * project.parameters.speed;
            p.vx += dx * force + (Math.sin(p.y * 0.01 + t) * 0.05);
            p.vy += dy * force + (Math.cos(p.x * 0.01 + t) * 0.05);
          } else {
            // Brownian drift + oscillatory harmonic
            p.vx += (Math.sin(t + i) * 0.04 - p.vx * 0.02) * project.parameters.speed;
            p.vy += (Math.cos(t * 0.9 + i) * 0.04 - p.vy * 0.02) * project.parameters.speed;
          }

          // Damping to prevent runaway velocities
          p.vx *= 0.96;
          p.vy *= 0.96;

          // Mouse interaction (repulsion or pull)
          if (mouse.isHovering) {
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 160 && mDist > 0) {
              const factor = mouse.isDown ? -0.4 : 0.25; // Click to pull, hover to repel
              p.vx += (mdx / mDist) * factor * 2;
              p.vy += (mdy / mDist) * factor * 2;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          // Boundary wrapping
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        // Draw spring lattice connections if quantum_lattice or wireframe enabled
        if (project.parameters.wireframe || engine === 'quantum_lattice') {
          for (let j = i + 1; j < Math.min(i + 12, particles.length); j++) {
            const p2 = particles[j];
            const cdx = p.x - p2.x;
            const cdy = p.y - p2.y;
            const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cDist < 85) {
              const linkAlpha = (1 - cDist / 85) * 0.25;
              ctx.strokeStyle = palette.lines;
              ctx.globalAlpha = linkAlpha;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Render particle / node
        const isSelected = selectedNode?.id === p.id;
        ctx.globalAlpha = isSelected ? 1.0 : p.alpha;

        if (project.parameters.nodeGlow || isSelected) {
          ctx.shadowBlur = isSelected ? 18 : 8;
          ctx.shadowColor = isSelected ? '#ffffff' : palette.glow;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = isSelected ? '#ffffff' : p.color;
        ctx.beginPath();
        const rad = isSelected ? p.radius * 2.2 : p.radius;
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        // If labeled node, draw subtle tag
        if (p.label && (isSelected || !selectedNode)) {
          ctx.shadowBlur = 0;
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = isSelected ? palette.glow : 'rgba(255,255,255,0.45)';
          ctx.fillText(p.label, p.x + 8, p.y - 6);
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, palette, project, selectedNode]);

  // Handle canvas sizing with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = Math.max(rect.height, 560) * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${Math.max(rect.height, 560)}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [isFullscreen]);

  // Mouse & Touch events
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current.x = x;
    mousePosRef.current.y = y;
    mousePosRef.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isHovering = false;
    mousePosRef.current.isDown = false;
  };

  const handleMouseDown = () => {
    mousePosRef.current.isDown = true;
  };

  const handleMouseUp = () => {
    mousePosRef.current.isDown = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find closest particle
    const particles = particlesRef.current;
    let closest: Particle | null = null;
    let minD = 24;

    for (const p of particles) {
      const dx = p.x - x;
      const dy = p.y - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < minD) {
        minD = d;
        closest = p;
      }
    }

    setSelectedNode(closest);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id={`canvas-stage-${project.id}`}
      className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#07080b] shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px]'
      }`}
    >
      {/* Interactive HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        className="w-full h-full cursor-crosshair block"
      />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
          <div className="flex items-center gap-2 text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-cinzel tracking-wider uppercase font-semibold text-[11px]">
              {project.title}
            </span>
          </div>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[10px] text-white/50">{project.renderingEngine}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
            className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              // Reshuffle seed
              const newSeed = Math.floor(Math.random() * 9999);
              project.parameters.customSeed = newSeed;
              setSelectedNode(null);
            }}
            title="Reshuffle Stochastic Seed"
            className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Floating Telemetry & Node Inspection */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
        {/* Left Telemetry */}
        <div className="pointer-events-auto bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[11px] font-mono text-white/60 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{fps} FPS</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5 text-sky-400" />
            <span>{activeParticleCount} Nodes</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Seed #{project.parameters.customSeed}</span>
          </div>
        </div>

        {/* Right: Selected Node Card */}
        {selectedNode && (
          <div className="pointer-events-auto bg-[#0f1118]/90 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-xs shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Inspected Vector</span>
                <h4 className="font-semibold text-white text-sm">{selectedNode.label || selectedNode.id}</h4>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-white/40 hover:text-white text-sm px-1"
              >
                ×
              </button>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-white/70">
              <div className="flex justify-between">
                <span>Co-ordinates:</span>
                <span className="text-white">({Math.round(selectedNode.x)}, {Math.round(selectedNode.y)})</span>
              </div>
              <div className="flex justify-between">
                <span>Kinetic Velocity:</span>
                <span className="text-white">
                  {Math.sqrt(selectedNode.vx * selectedNode.vx + selectedNode.vy * selectedNode.vy).toFixed(2)} px/f
                </span>
              </div>
              {selectedNode.value && (
                <div className="flex justify-between">
                  <span>Observation:</span>
                  <span className="text-amber-300 font-semibold">{selectedNode.value}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
