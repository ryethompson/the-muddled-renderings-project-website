/**
 * THE MUDDLED RENDERINGS PROJECT - Visual Grammar Legend
 * 
 * Understated explanatory bar communicating the mathematical and artistic
 * translation from economic dimensions into generative landscape features.
 */

import React from 'react';
import { Layers, Sparkles, Cpu, Radio } from 'lucide-react';

export const VisualGrammarLegend: React.FC = () => {
  return (
    <div
      id="visual-grammar-legend"
      className="w-full max-w-6xl mx-auto my-6 px-4"
    >
      <div className="rounded-xl border border-white/10 bg-[#0d0e14]/80 backdrop-blur-md p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/5">
          <div>
            <h3 className="font-cinzel text-sm uppercase tracking-widest text-white/90 font-medium">
              Visual Grammar of the Atlas
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              The landscapes are generated deterministically from OECD economic statistics. Form, mass, complexity, and movement evolve with the data.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">
            4-Dimensional Encoding
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Dimension 1: Income -> Bedrock */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
            <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Layers size={14} />
            </div>
            <div>
              <span className="font-medium text-white/90 block">Median Income</span>
              <span className="text-amber-400/80 text-[11px] font-mono block mb-0.5">Geological Bedrock Mass</span>
              <p className="text-[11px] text-white/50 leading-normal">
                Controls physical landform footprint, stratified rock layer depth, and mineral color richness.
              </p>
            </div>
          </div>

          {/* Dimension 2: R&D -> Spire */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
            <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Sparkles size={14} />
            </div>
            <div>
              <span className="font-medium text-white/90 block">R&D Expenditure</span>
              <span className="text-cyan-400/80 text-[11px] font-mono block mb-0.5">Vertical Spire & Emergence</span>
              <p className="text-[11px] text-white/50 leading-normal">
                Generates towering crystalline obelisks, ascent velocity, and energetic particle dispersion.
              </p>
            </div>
          </div>

          {/* Dimension 3: Business Digital Intensity -> Veins */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
            <div className="p-1.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
              <Cpu size={14} />
            </div>
            <div>
              <span className="font-medium text-white/90 block">Business Digital Intensity</span>
              <span className="text-violet-400/80 text-[11px] font-mono block mb-0.5">Cybernetic Vein Lattice</span>
              <p className="text-[11px] text-white/50 leading-normal">
                Powers internal geometric circuit density, faceted sharpness, and electrical impulse rates.
              </p>
            </div>
          </div>

          {/* Dimension 4: Internet Access -> Atmosphere */}
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Radio size={14} />
            </div>
            <div>
              <span className="font-medium text-white/90 block">Household Internet Access</span>
              <span className="text-emerald-400/80 text-[11px] font-mono block mb-0.5">Atmospheric Coherence</span>
              <p className="text-[11px] text-white/50 leading-normal">
                Governs surface continuity, connective tendril density, and harmonic outer luminous aura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
