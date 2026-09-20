import React from 'react';
import { Project, ProjectParameters } from '../types/projects';
import { X, RefreshCw, Palette, Sliders, Zap } from 'lucide-react';

interface ProjectParametersDrawerProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onUpdateParams: (newParams: Partial<ProjectParameters>) => void;
}

export const ProjectParametersDrawer: React.FC<ProjectParametersDrawerProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateParams,
}) => {
  if (!isOpen) return null;

  const params = project.parameters;

  const palettes: Array<{ id: ProjectParameters['colorPalette']; label: string; color: string }> = [
    { id: 'obsidian_gold', label: 'Obsidian Gold', color: '#d4af37' },
    { id: 'emerald_mist', label: 'Emerald Mist', color: '#10b981' },
    { id: 'celestial_amethyst', label: 'Amethyst', color: '#a855f7' },
    { id: 'cinnabar_ember', label: 'Cinnabar Ember', color: '#ef4444' },
    { id: 'neon_amber', label: 'Neon Amber', color: '#ff9900' },
    { id: 'monochrome_noir', label: 'Monochrome Noir', color: '#ffffff' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-6 animate-in fade-in slide-in-from-top-2">
      <div className="bg-[#0e1017] border border-white/15 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="font-cinzel text-sm font-bold text-white uppercase">
              Live Parameter Modulation — {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Palette Picker */}
          <div>
            <label className="block text-[11px] font-mono text-white/60 uppercase mb-2">
              Color Palette
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {palettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onUpdateParams({ colorPalette: p.id })}
                  className={`p-2 rounded-lg border text-[10px] font-mono flex items-center gap-1.5 transition-all ${
                    params.colorPalette === p.id
                      ? 'border-white bg-white/10 text-white font-semibold'
                      : 'border-white/10 bg-black/30 text-white/60 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="truncate">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Speed slider */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1.5">
              <span>Velocity Vector</span>
              <span className="text-white font-semibold">{params.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={3.0}
              step={0.1}
              value={params.speed}
              onChange={(e) => onUpdateParams({ speed: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-white/30 mt-1">
              <span>0.2x (Glacial)</span>
              <span>3.0x (Kinetic)</span>
            </div>
          </div>

          {/* Turbulence slider */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1.5">
              <span>Turbulence Coefficient</span>
              <span className="text-white font-semibold">{params.turbulence.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2.5}
              step={0.1}
              value={params.turbulence}
              onChange={(e) => onUpdateParams({ turbulence: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-white/30 mt-1">
              <span>Laminar (Smooth)</span>
              <span>Vortical (Chaotic)</span>
            </div>
          </div>

          {/* Particle count slider & Toggles */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1.5">
                <span>Nodal Density</span>
                <span className="text-white font-semibold">{params.particleCount}</span>
              </div>
              <input
                type="range"
                min={50}
                max={600}
                step={25}
                value={params.particleCount}
                onChange={(e) => onUpdateParams({ particleCount: Number(e.target.value) })}
                className="w-full accent-amber-400"
              />
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 text-[11px] font-mono text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={params.nodeGlow}
                  onChange={(e) => onUpdateParams({ nodeGlow: e.target.checked })}
                  className="accent-amber-400 rounded"
                />
                <span>Luminescent Glow</span>
              </label>

              <label className="flex items-center gap-1.5 text-[11px] font-mono text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={params.wireframe}
                  onChange={(e) => onUpdateParams({ wireframe: e.target.checked })}
                  className="accent-amber-400 rounded"
                />
                <span>Lattice Links</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
