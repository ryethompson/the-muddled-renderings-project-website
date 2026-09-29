/**
 * THE MUDDLED RENDERINGS PROJECT - Country Annotation Card
 * 
 * Minimalist, elegant data annotation layer attached to a selected country.
 * Displays exact numerical values, authentic units, source citations,
 * visual grammar decoding, and explicit quality status (Verified vs 2-year Interpolated).
 */

import React from 'react';
import { CountryEconomicProfile, Indicator } from '../types';
import { X, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { BedrockIcon, SpireIcon, CircuitsIcon, AuraIcon } from './VisualGrammarIcons';

interface CountryAnnotationCardProps {
  profile: CountryEconomicProfile | null;
  indicators: Indicator[];
  selectedYear?: number;
  onClose: () => void;
}

export const CountryAnnotationCard: React.FC<CountryAnnotationCardProps> = ({
  profile,
  indicators,
  selectedYear = 2024,
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

  const renderStatusBadge = (status?: string, notes?: string) => {
    if (status === 'Verified') {
      return (
        <span 
          title="Verified official statistical release" 
          className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20"
        >
          <CheckCircle2 size={10} />
          Verified
        </span>
      );
    }
    if (status === 'Interpolated') {
      return (
        <span 
          title={notes || "Interpolated observation"}
          className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20"
        >
          <AlertCircle size={10} />
          Interpolated
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[9px] font-mono text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">
        Missing (&gt;2yr)
      </span>
    );
  };

  return (
    <div 
      id="country-annotation-card"
      className="absolute top-28 right-6 z-30 w-96 max-w-[calc(100vw-3rem)] rounded-xl border border-white/10 bg-[#0d0f18]/90 backdrop-blur-xl shadow-2xl shadow-black/80 text-[#e4e7f2] p-5 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-serif-display text-2xl text-white font-normal tracking-tight">
            {country.name}
          </h2>
          <p className="text-xs text-white/50 mt-1">{country.officialName} • {country.region}</p>
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

      {/* 4 Economic Indicators with Visual Grammar Links and Provenance */}
      <div className="space-y-3 my-3.5 max-h-[50vh] overflow-y-auto pr-1">
        {/* 1. Median Disposable Income -> Bedrock Mass */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <BedrockIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Median Disposable Income
            </span>
            <div className="flex items-center gap-1.5">
              {renderStatusBadge(metrics.medianDisposableIncome?.qualityStatus, metrics.medianDisposableIncome?.notes)}
              <span className="font-mono text-xs font-semibold text-white">
                {formatVal(metrics.medianDisposableIncome?.value, metrics.medianDisposableIncome?.unit || '')}
              </span>
            </div>
          </div>
          <div className="mt-0.5">
            <span className="text-amber-300/80 font-mono font-medium text-[11px]">Bedrock</span>
          </div>
        </div>

        {/* 2. R&D Expenditure -> Spire & Plumes */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <SpireIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              R&D Expenditure (% GDP)
            </span>
            <div className="flex items-center gap-1.5">
              {renderStatusBadge(metrics.rdExpenditure?.qualityStatus, metrics.rdExpenditure?.notes)}
              <span className="font-mono text-xs font-semibold text-white">
                {formatVal(metrics.rdExpenditure?.value, metrics.rdExpenditure?.unit || '')}
              </span>
            </div>
          </div>
          <div className="mt-0.5">
            <span className="text-cyan-300/80 font-mono font-medium text-[11px]">Spire</span>
          </div>
        </div>

        {/* 3. Business Digital Intensity -> Vein Lattice */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <CircuitsIcon className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              Digital Intensity of Businesses
            </span>
            <div className="flex items-center gap-1.5">
              {renderStatusBadge(metrics.digitalIntensityBusinesses?.qualityStatus, metrics.digitalIntensityBusinesses?.notes)}
              <span className="font-mono text-xs font-semibold text-white">
                {formatVal(metrics.digitalIntensityBusinesses?.value, metrics.digitalIntensityBusinesses?.unit || '')}
              </span>
            </div>
          </div>
          <div className="mt-0.5">
            <span className="text-violet-300/80 font-mono font-medium text-[11px]">Circuits</span>
          </div>
        </div>

        {/* 4. Household Internet Access -> Coherence Aura */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-white/70 font-medium">
              <AuraIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Household Internet Access
            </span>
            <div className="flex items-center gap-1.5">
              {renderStatusBadge(metrics.householdInternetAccess?.qualityStatus, metrics.householdInternetAccess?.notes)}
              <span className="font-mono text-xs font-semibold text-white">
                {formatVal(metrics.householdInternetAccess?.value, metrics.householdInternetAccess?.unit || '')}
              </span>
            </div>
          </div>
          <div className="mt-0.5">
            <span className="text-emerald-300/80 font-mono font-medium text-[11px]">Aura</span>
          </div>
        </div>
      </div>

      {/* Metadata & Authoritative Citation Footer */}
      <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-white/40">
        <div>
          <span>OECD.Stat & Eurostat</span>
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
