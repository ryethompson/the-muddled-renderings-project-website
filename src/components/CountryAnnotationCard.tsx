/**
 * THE MUDDLED RENDERINGS PROJECT - Country Annotation Card
 * 
 * Minimalist, elegant data annotation layer attached to a selected country.
 * Displays exact numerical values, authentic units, source citations,
 * and the visual grammar decoding.
 */

import React from 'react';
import { CountryEconomicProfile, Indicator } from '../types';
import { X, ExternalLink, Activity, Layers, Cpu, Radio, Sparkles } from 'lucide-react';

interface CountryAnnotationCardProps {
  profile: CountryEconomicProfile | null;
  indicators: Indicator[];
  onClose: () => void;
}

export const CountryAnnotationCard: React.FC<CountryAnnotationCardProps> = ({
  profile,
  indicators,
  onClose,
}) => {
  if (!profile) return null;

  const { country, metrics, encoding } = profile;

  // Format helpers
  const formatVal = (val: number | null, unit: string) => {
    if (val === null || val === undefined) return 'N/A';
    if (unit.includes('USD') || unit.includes('$')) {
      return `$${val.toLocaleString('en-US')}`;
    }
    if (unit.includes('%')) {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString('en-US');
  };

  return (
    <div 
      id="country-annotation-card"
      className="absolute top-6 right-6 z-30 w-96 max-w-[calc(100vw-3rem)] rounded-xl border border-white/10 bg-[#0d0f18]/90 backdrop-blur-xl shadow-2xl shadow-black/80 text-[#e4e7f2] p-5 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white/90 border border-white/10 tracking-wider">
              {country.isoCode}
            </span>
            <span className="text-xs text-white/40 font-mono">
              OECD since {country.oecdMemberSince}
            </span>
          </div>
          <h2 className="font-serif-display text-2xl text-white font-normal mt-1 tracking-tight">
            {country.name}
          </h2>
          <p className="text-xs text-white/50">{country.officialName} • {country.region}</p>
        </div>

        <button
          id="close-country-detail-button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
          aria-label="Close country details"
        >
          <X size={16} />
        </button>
      </div>

      {/* 4 Economic Indicators with Visual Grammar Links */}
      <div className="space-y-3.5 my-4">
        {/* 1. Median Disposable Income -> Bedrock Mass */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <Layers size={13} className="text-amber-400/80" />
              Median Disposable Income
            </span>
            <span className="font-mono text-xs font-semibold text-white">
              {formatVal(metrics.medianDisposableIncome?.value, metrics.medianDisposableIncome?.unit || '')}
            </span>
          </div>
          <p className="text-[11px] text-white/40 leading-relaxed">
            <span className="text-amber-300/60 font-mono">Form:</span> Determines bedrock footprint ({Math.round(encoding.baseRadius)}px) and {encoding.layerCount} stratified geological layers.
          </p>
        </div>

        {/* 2. R&D Expenditure -> Spire & Plumes */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <Sparkles size={13} className="text-cyan-400/80" />
              R&D Expenditure (% GDP)
            </span>
            <span className="font-mono text-xs font-semibold text-white">
              {formatVal(metrics.rdExpenditure?.value, metrics.rdExpenditure?.unit || '')}
            </span>
          </div>
          <p className="text-[11px] text-white/40 leading-relaxed">
            <span className="text-cyan-300/60 font-mono">Spire:</span> Generates {Math.round(encoding.spireHeight)}px vertical crystalline apex and {encoding.plumeParticleCount} ascending energetic micro-nodes.
          </p>
        </div>

        {/* 3. Business Digital Intensity -> Vein Lattice */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <Cpu size={13} className="text-violet-400/80" />
              Digital Intensity of Businesses
            </span>
            <span className="font-mono text-xs font-semibold text-white">
              {formatVal(metrics.digitalIntensityBusinesses?.value, metrics.digitalIntensityBusinesses?.unit || '')}
            </span>
          </div>
          <p className="text-[11px] text-white/40 leading-relaxed">
            <span className="text-violet-300/60 font-mono">Circuit:</span> Powers {encoding.latticeFrequency}-node internal geometric lattice pulsing at {encoding.veinPulseSpeed.toFixed(1)}x frequency.
          </p>
        </div>

        {/* 4. Household Internet Access -> Coherence Aura */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <Radio size={13} className="text-emerald-400/80" />
              Household Internet Access
            </span>
            <span className="font-mono text-xs font-semibold text-white">
              {formatVal(metrics.householdInternetAccess?.value, metrics.householdInternetAccess?.unit || '')}
            </span>
          </div>
          <p className="text-[11px] text-white/40 leading-relaxed">
            <span className="text-emerald-300/60 font-mono">Aura:</span> Radiates {Math.round(encoding.coherenceAuraRadius)}px atmospheric coherence aura and {encoding.filamentCount} connective tendrils.
          </p>
        </div>
      </div>

      {/* Metadata & Authoritative Citation Footer */}
      <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-white/40">
        <div>
          <span>Ref: {metrics.householdInternetAccess?.referencePeriod || '2023'} • OECD.Stat</span>
        </div>
        <a
          href="https://data.oecd.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
        >
          <span>Source</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
};
