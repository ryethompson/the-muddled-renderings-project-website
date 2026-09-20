/**
 * THE MUDDLED RENDERINGS PROJECT - Metric Definitions
 * 
 * Concise editorial breakdown of the 4 economic dimensions:
 * Digitalisation + Innovation + Material Living Conditions.
 */

import React from 'react';
import { Indicator } from '../types';
import { Layers, Sparkles, Cpu, Radio, BookOpen } from 'lucide-react';

interface MetricDefinitionsProps {
  indicators: Indicator[];
}

export const MetricDefinitions: React.FC<MetricDefinitionsProps> = ({ indicators }) => {
  return (
    <section id="metric-definitions-section" className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="border-t border-white/10 pt-8 mb-8">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">
          <BookOpen size={13} />
          <span>Dimension Catalog</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl text-white font-medium tracking-tight">
          Four Dimensions of the Landscape
        </h2>
        <p className="text-xs text-white/50 max-w-2xl mt-1.5 leading-relaxed">
          The artwork observes spatial and material patterns across digitalization, innovation, and living conditions across OECD economies without asserting causal determinism.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Metric A: Household Internet Access */}
        <div id="metric-def-internet" className="p-6 rounded-xl border border-white/10 bg-[#0d0f17]/60 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Radio size={16} />
            </div>
            <div>
              <h3 className="text-base text-white font-serif-display font-medium">
                Household Internet Access
              </h3>
              <span className="text-[11px] font-mono text-emerald-400/80">
                Digital Infrastructure Coherence
              </span>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed mb-4">
            The proportion of private households equipped with home broadband or mobile internet connectivity.
          </p>
          <div className="space-y-1.5 text-[11px] text-white/50 border-t border-white/5 pt-3">
            <div className="flex justify-between">
              <span className="text-white/40">Why Included:</span>
              <span className="text-white/70">Measures universal civic connectivity baseline</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Authoritative Source:</span>
              <span className="text-white/70">OECD Telecommunications & ICT Database</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Unit & Reference:</span>
              <span className="text-white/70">% of households • 2023</span>
            </div>
          </div>
        </div>

        {/* Metric B: Digital Intensity of Businesses */}
        <div id="metric-def-digital" className="p-6 rounded-xl border border-white/10 bg-[#0d0f17]/60 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Cpu size={16} />
            </div>
            <div>
              <h3 className="text-base text-white font-serif-display font-medium">
                Digital Intensity of Businesses
              </h3>
              <span className="text-[11px] font-mono text-violet-400/80">
                Enterprise Technological Depth
              </span>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed mb-4">
            The percentage of enterprises utilizing advanced digital systems, cloud computing, e-commerce, and data-driven infrastructure.
          </p>
          <div className="space-y-1.5 text-[11px] text-white/50 border-t border-white/5 pt-3">
            <div className="flex justify-between">
              <span className="text-white/40">Why Included:</span>
              <span className="text-white/70">Reflects technological integration in production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Authoritative Source:</span>
              <span className="text-white/70">Eurostat & OECD Digital Economy Metrics</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Unit & Reference:</span>
              <span className="text-white/70">% of enterprises • 2023</span>
            </div>
          </div>
        </div>

        {/* Metric C: R&D Expenditure */}
        <div id="metric-def-rd" className="p-6 rounded-xl border border-white/10 bg-[#0d0f17]/60 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base text-white font-serif-display font-medium">
                R&D Expenditure (% GDP)
              </h3>
              <span className="text-[11px] font-mono text-cyan-400/80">
                Invested Innovation Velocity
              </span>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed mb-4">
            Gross domestic expenditure on scientific research and experimental development as a proportion of total national GDP.
          </p>
          <div className="space-y-1.5 text-[11px] text-white/50 border-t border-white/5 pt-3">
            <div className="flex justify-between">
              <span className="text-white/40">Why Included:</span>
              <span className="text-white/70">Captures commitment to knowledge creation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Authoritative Source:</span>
              <span className="text-white/70">OECD Main Science & Technology Indicators</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Unit & Reference:</span>
              <span className="text-white/70">% of GDP (GERD) • 2023</span>
            </div>
          </div>
        </div>

        {/* Metric D: Median Disposable Income */}
        <div id="metric-def-income" className="p-6 rounded-xl border border-white/10 bg-[#0d0f17]/60 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Layers size={16} />
            </div>
            <div>
              <h3 className="text-base text-white font-serif-display font-medium">
                Median Disposable Income
              </h3>
              <span className="text-[11px] font-mono text-amber-400/80">
                Material Living Standard
              </span>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed mb-4">
            Annual median equivalised household disposable net income per person, calibrated using purchasing power parity (USD PPP).
          </p>
          <div className="space-y-1.5 text-[11px] text-white/50 border-t border-white/5 pt-3">
            <div className="flex justify-between">
              <span className="text-white/40">Why Included:</span>
              <span className="text-white/70">Captures central living standard without average skew</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Authoritative Source:</span>
              <span className="text-white/70">OECD Income Distribution Database (IDD)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Unit & Reference:</span>
              <span className="text-white/70">USD PPP / year • 2023</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
