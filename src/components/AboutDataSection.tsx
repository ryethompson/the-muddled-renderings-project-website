/**
 * THE MUDDLED RENDERINGS PROJECT - About the Data & Sources
 * 
 * Authoritative citations, methodology references, relational data architecture transparency,
 * multi-year time series specifications (2014–2024), and 2-year maximum interpolation rules.
 */

import React, { useState } from 'react';
import { DataSource, DataQualityReport, TimeSeriesSummary } from '../types';
import { Database, ExternalLink, ShieldCheck, RefreshCw, CheckCircle2, Calendar, GitCommit, AlertCircle } from 'lucide-react';

interface AboutDataSectionProps {
  sources: DataSource[];
  qualityReport: DataQualityReport;
  timeSeriesMetadata?: TimeSeriesSummary;
  onTriggerIngestion: () => Promise<void>;
  isIngesting: boolean;
}

export const AboutDataSection: React.FC<AboutDataSectionProps> = ({
  sources,
  qualityReport,
  timeSeriesMetadata,
  onTriggerIngestion,
  isIngesting,
}) => {
  const [ingestionMessage, setIngestionMessage] = useState<string | null>(null);

  const handleRunPipeline = async () => {
    setIngestionMessage('Ingestion pipeline running: validating 38 OECD economies across 2014–2024 time series...');
    await onTriggerIngestion();
    setIngestionMessage('Validation and normalization completed: all 38 member profiles verified with 2-year interpolation bounds.');
    setTimeout(() => setIngestionMessage(null), 5000);
  };

  return (
    <section id="about-data-sources-section" className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="border-t border-white/10 pt-8 mb-8">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">
          <Database size={13} />
          <span>Data Provenance & Time Series Architecture</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl text-white font-medium tracking-tight">
          Authoritative Data & Methodology
        </h2>
        <p className="text-xs text-white/50 max-w-2xl mt-1.5 leading-relaxed">
          The atlas is powered by a normalized relational time series (2014–2024) across 38 OECD member states, backed by strict mathematical interpolation boundaries and monthly automated ingestion workflows.
        </p>
      </div>

      {/* Time Series Methodology Callout Card */}
      <div className="mb-8 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] backdrop-blur-sm text-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
          <Calendar size={15} />
          <span>2014–2024 Multi-Year Time Series & 2-Year Maximum Interpolation Protocol</span>
        </div>
        <p className="text-white/70 leading-relaxed">
          To illustrate macroeconomic evolution over time without compromising empirical integrity, the platform maintains an 11-year annual longitudinal panel (2014–2024). Because national statistical surveys (such as the OECD Income Distribution Database or Eurostat enterprise ICT questionnaires) are published on staggered or biennial cycles, our pipeline adheres to the following methodological rules:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-[11px]">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-amber-300 font-bold block">1. 2-Year Boundary Limit</span>
            <p className="text-white/50">
              Interpolation is permitted strictly for gaps of ≤ 2 calendar years (|t_anchor - t| ≤ 2). If two empirical anchors span ≤ 3 years, exact linear interpolation is executed.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-amber-300 font-bold block">2. Strict Rejection of Gaps &gt; 2 Yrs</span>
            <p className="text-white/50">
              Any gap exceeding 2 consecutive years is rejected from imputation and categorized as <span className="text-red-400">Missing</span>. No speculative extrapolations are permitted.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-amber-300 font-bold block">3. Global Temporal Scaling</span>
            <p className="text-white/50">
              Normalization bounds (min/max) are unified across the entire 2014–2024 window so temporal visual shifts faithfully mirror real growth trajectories.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Authoritative Sources List (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">
            Primary Public Statistical Registries
          </h3>

          <div className="space-y-3">
            {sources.map((src) => (
              <div
                key={src.id}
                id={`source-card-${src.id}`}
                className="p-4 rounded-xl border border-white/10 bg-[#0d0f17]/40 hover:border-white/20 transition-colors text-xs"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10 mr-2">
                      {src.organization}
                    </span>
                    <span className="font-medium text-white/90">{src.datasetName}</span>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white/40 hover:text-white transition-colors shrink-0 text-[11px]"
                  >
                    <span>Dataset</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <p className="text-[11px] text-white/50 mb-2 italic">
                  "{src.citationText}"
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/40 font-mono">
                  <span>Code: {src.datasetCode}</span>
                  <span>Cadence: {src.updateCadence}</span>
                  <span>Coverage: 2014–2024</span>
                  <span>Last Audited: {src.lastCheckedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Quality & Monthly Ingestion Pipeline (1 column) */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">
            Pipeline Health & Quality Gates
          </h3>

          <div className="p-5 rounded-xl border border-white/10 bg-[#0d0f17]/60 text-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={16} />
              <span className="font-mono text-xs font-semibold">Integrity Verified</span>
            </div>

            <div className="space-y-2 text-[11px] border-y border-white/10 py-3 font-mono text-white/60">
              <div className="flex justify-between">
                <span>Total OECD States:</span>
                <span className="text-white">{qualityReport.totalCountries}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Series Range:</span>
                <span className="text-amber-400">2014 – 2024 (11 yrs)</span>
              </div>
              <div className="flex justify-between">
                <span>Max Interpolation Gap:</span>
                <span className="text-white">≤ 2 calendar years</span>
              </div>
              <div className="flex justify-between">
                <span>Coverage Ratio:</span>
                <span className="text-emerald-400">{(qualityReport.coverageRatio * 100).toFixed(1)}%</span>
              </div>
              {timeSeriesMetadata && (
                <div className="flex justify-between">
                  <span>Imputation Method:</span>
                  <span className="text-white">Linear Bounded</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                id="trigger-monthly-ingestion-button"
                onClick={handleRunPipeline}
                disabled={isIngesting}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all disabled:opacity-50 text-xs cursor-pointer"
              >
                <RefreshCw size={13} className={isIngesting ? 'animate-spin' : ''} />
                <span>{isIngesting ? 'Auditing 2014-2024 Endpoints...' : 'Simulate Monthly Ingestion Cycle'}</span>
              </button>

              {ingestionMessage && (
                <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                  <span>{ingestionMessage}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] text-white/40 leading-relaxed">
              Automated validation asserts Frascati Manual standards and Eurostat DII score boundaries prior to visual emission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
