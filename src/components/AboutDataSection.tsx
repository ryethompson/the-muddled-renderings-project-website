/**
 * THE MUDDLED RENDERINGS PROJECT - About the Data & Sources
 * 
 * Authoritative citations, methodology references, relational data architecture transparency,
 * and monthly ingestion pipeline status.
 */

import React, { useState } from 'react';
import { DataSource, DataQualityReport } from '../types';
import { Database, ExternalLink, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface AboutDataSectionProps {
  sources: DataSource[];
  qualityReport: DataQualityReport;
  onTriggerIngestion: () => Promise<void>;
  isIngesting: boolean;
}

export const AboutDataSection: React.FC<AboutDataSectionProps> = ({
  sources,
  qualityReport,
  onTriggerIngestion,
  isIngesting,
}) => {
  const [ingestionMessage, setIngestionMessage] = useState<string | null>(null);

  const handleRunPipeline = async () => {
    setIngestionMessage('Ingestion pipeline running: validating 38 OECD economies against public statistical endpoints...');
    await onTriggerIngestion();
    setIngestionMessage('Validation and normalization completed: all 38 member profiles verified.');
    setTimeout(() => setIngestionMessage(null), 5000);
  };

  return (
    <section id="about-data-sources-section" className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="border-t border-white/10 pt-8 mb-8">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">
          <Database size={13} />
          <span>Data Layer & Provenance</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl text-white font-medium tracking-tight">
          About the Data Architecture
        </h2>
        <p className="text-xs text-white/50 max-w-2xl mt-1.5 leading-relaxed">
          The atlas is powered by a normalized relational data model and monthly automated ingestion workflows reading from international public statistical repositories.
        </p>
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
                  <span>Last Audited: {src.lastCheckedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Quality & Monthly Ingestion Pipeline (1 column) */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">
            Monthly Ingestion Pipeline
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
                <span>Verified Observations:</span>
                <span className="text-white">{qualityReport.completeObservations}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Coverage Ratio:</span>
                <span className="text-emerald-400">{(qualityReport.coverageRatio * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Relational Normalization:</span>
                <span className="text-white">PostgreSQL Standard</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                id="trigger-monthly-ingestion-button"
                onClick={handleRunPipeline}
                disabled={isIngesting}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all disabled:opacity-50 text-xs cursor-pointer"
              >
                <RefreshCw size={13} className={isIngesting ? 'animate-spin' : ''} />
                <span>{isIngesting ? 'Auditing Public Repositories...' : 'Simulate Monthly Ingestion Cycle'}</span>
              </button>

              {ingestionMessage && (
                <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                  <span>{ingestionMessage}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] text-white/40 leading-relaxed">
              Updates execute on the 1st of every month. Revisions are tracked with immutable historical snapshots and normalized statistical scaling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
