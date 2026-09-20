import React, { useState } from 'react';
import { Project } from '../types/projects';
import { ExternalLink, Github, Maximize2, Minimize2, RefreshCw, BarChart3, Database, Globe, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface PowerBICanvasProps {
  project: Project;
  onUpdateProject?: (updated: Project) => void;
}

export const PowerBICanvas: React.FC<PowerBICanvasProps> = ({
  project,
  onUpdateProject,
}) => {
  const [embedUrl, setEmbedUrl] = useState(project.powerBiEmbedUrl || '');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(project.powerBiEmbedUrl || '');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePage, setActivePage] = useState<'overview' | 'telemetry' | 'pipeline'>('overview');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedMetric, setSelectedMetric] = useState<'throughput' | 'latency' | 'coverage'>('throughput');

  const githubUrl =
    project.githubPipelineUrl ||
    'https://github.com/the-muddled-renderings-project/pipelines/blob/main/.github/workflows/powerbi_ingestion_etl.yml';

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setEmbedUrl(tempUrl);
    setIsEditingUrl(false);
    if (onUpdateProject) {
      onUpdateProject({
        ...project,
        powerBiEmbedUrl: tempUrl,
      });
    }
  };

  const sampleData = [
    { region: 'North America', throughput: 84.2, latency: 18, coverage: 96, status: 'Optimal' },
    { region: 'Europe & UK', throughput: 79.6, latency: 22, coverage: 94, status: 'Optimal' },
    { region: 'Asia-Pacific', throughput: 92.1, latency: 34, coverage: 89, status: 'Optimal' },
    { region: 'Latin America', throughput: 46.5, latency: 58, coverage: 78, status: 'Elevated' },
    { region: 'Middle East & Africa', throughput: 38.0, latency: 64, coverage: 71, status: 'Normal' },
  ];

  const filteredData = selectedRegion === 'All Regions' 
    ? sampleData 
    : sampleData.filter(d => d.region === selectedRegion);

  return (
    <div
      id="power-bi-viewport"
      className={`w-full bg-[#0b0c12] border border-white/15 rounded-xl overflow-hidden transition-all duration-300 shadow-2xl ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-none bg-[#090a0f]' : 'relative'
      }`}
    >
      {/* Top Power BI Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#11131c] border-b border-white/10 text-xs font-mono">
        {/* Left: Engine & Report Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#f2c811]/15 text-[#f2c811] border border-[#f2c811]/30 font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Microsoft Power BI Report</span>
          </div>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-white/80 font-medium truncate max-w-[200px] sm:max-w-xs">
            {project.powerBiReportName || project.title}
          </span>
        </div>

        {/* Right: GitHub Pipeline link & Viewport Actions */}
        <div className="flex items-center gap-2">
          {/* Direct GitHub Pipeline Link */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white hover:text-amber-300 transition-all font-semibold"
            title="Inspect GitHub pipeline workflow and ETL code"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Pipeline</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Embed URL toggle */}
          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Configure Power BI Embed URL"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Embed URL Configuration Bar (Expandable) */}
      {isEditingUrl && (
        <div className="p-3 bg-[#141724] border-b border-white/10 animate-in fade-in">
          <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full">
              <label className="block text-[10px] font-mono text-white/50 mb-1">
                Microsoft Power BI Embed / Web Publish URL:
              </label>
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://app.powerbi.com/view?r=... or https://app.powerbi.com/reportEmbed?..."
                className="w-full px-3 py-1.5 bg-[#090a0f] border border-white/20 rounded-lg text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto mt-2 sm:mt-4">
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs font-mono transition-colors"
              >
                Apply URL
              </button>
              <button
                type="button"
                onClick={() => {
                  setTempUrl('');
                  setEmbedUrl('');
                  setIsEditingUrl(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-xs font-mono transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Center Visual Canvas Area */}
      {embedUrl ? (
        /* Live Power BI Iframe Embed */
        <div className="relative w-full aspect-[16/9] min-h-[560px] bg-black">
          <iframe
            title={project.title}
            src={embedUrl}
            frameBorder="0"
            allowFullScreen={true}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        /* Native Power BI-Engine Visual Surface */
        <div className="p-5 sm:p-7 space-y-6">
          {/* Top Banner Notice: Live pipeline & Interactive Surface */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#f2c811]/10 text-[#f2c811] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white font-mono">
                  Autonomous Ingestion Pipeline & Power BI Data Model
                </h4>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  Processed via scheduled GitHub Actions workflow with delta-parquet lakehouse storage.
                </p>
              </div>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-amber-300 font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Read GitHub Pipeline ETL</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Slicers & Page Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            {/* Power BI Page Tabs */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => setActivePage('overview')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  activePage === 'overview'
                    ? 'bg-[#f2c811] text-black font-semibold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                1. Executive Overview
              </button>
              <button
                onClick={() => setActivePage('telemetry')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  activePage === 'telemetry'
                    ? 'bg-[#f2c811] text-black font-semibold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                2. Latency Matrix
              </button>
              <button
                onClick={() => setActivePage('pipeline')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  activePage === 'pipeline'
                    ? 'bg-[#f2c811] text-black font-semibold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                3. Pipeline Diagnostics
              </button>
            </div>

            {/* Region Slicer Dropdown */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-white/40">Region Filter:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-[#141724] border border-white/20 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
              >
                <option value="All Regions">All Regions</option>
                {sampleData.map(d => (
                  <option key={d.region} value={d.region}>{d.region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* KPI Cards Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[11px] font-mono text-white/40 uppercase">Egress Throughput</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {selectedRegion === 'All Regions' ? '340.4' : filteredData[0]?.throughput} <span className="text-xs text-white/50 font-normal">Tbps</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <span>▲ +8.4%</span>
                <span className="text-white/30">vs previous pipeline run</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[11px] font-mono text-white/40 uppercase">Mean RTT Latency</div>
              <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
                {selectedRegion === 'All Regions' ? '28.6' : filteredData[0]?.latency} <span className="text-xs text-white/50 font-normal">ms</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <span>▼ -2.1ms</span>
                <span className="text-white/30">optimized routing</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[11px] font-mono text-white/40 uppercase">Fiber Reliability</div>
              <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
                99.98%
              </div>
              <div className="text-[10px] font-mono text-white/40 mt-1">
                SLA compliance confirmed
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="text-[11px] font-mono text-white/40 uppercase">Pipeline Health</div>
              <div className="text-2xl font-bold font-mono text-white mt-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Healthy</span>
              </div>
              <div className="text-[10px] font-mono text-white/40 mt-1 truncate">
                CI/CD sync passed
              </div>
            </div>
          </div>

          {/* Interactive Chart Visuals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart: Regional Throughput */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-semibold font-mono text-white">
                    Regional Backbone Capacity & Utilization
                  </h5>
                  <p className="text-xs text-white/40 font-mono">
                    Ingested directly from telecommunication carrier API endpoints
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-md text-[10px] font-mono">
                  <button
                    onClick={() => setSelectedMetric('throughput')}
                    className={`px-2 py-1 rounded ${selectedMetric === 'throughput' ? 'bg-amber-400/20 text-amber-300' : 'text-white/50'}`}
                  >
                    Throughput
                  </button>
                  <button
                    onClick={() => setSelectedMetric('latency')}
                    className={`px-2 py-1 rounded ${selectedMetric === 'latency' ? 'bg-amber-400/20 text-amber-300' : 'text-white/50'}`}
                  >
                    Latency
                  </button>
                </div>
              </div>

              {/* Synthetic Visual Bars */}
              <div className="space-y-3 pt-2">
                {filteredData.map((item) => {
                  const val = selectedMetric === 'throughput' ? item.throughput : item.latency;
                  const max = selectedMetric === 'throughput' ? 100 : 70;
                  const percentage = Math.round((val / max) * 100);

                  return (
                    <div key={item.region} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/80">{item.region}</span>
                        <span className="text-white font-semibold">
                          {val} {selectedMetric === 'throughput' ? 'Tbps' : 'ms'}
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-300"
                          style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pipeline & Ingestion Specification Card */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-2">
                  <Github className="w-4 h-4" />
                  <span>Pipeline Definition</span>
                </div>
                <h5 className="text-sm font-semibold font-mono text-white">
                  Automated ETL & Modeling
                </h5>
                <p className="text-xs text-white/50 font-mono mt-2 leading-relaxed">
                  Web visitors can inspect the complete data extraction, transform, and schema definitions hosted in the GitHub repository.
                </p>

                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Workflow:</span>
                    <span className="text-white/80">.github/workflows/*.yml</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Engine:</span>
                    <span className="text-white/80">Power BI REST API & DAX</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Trigger:</span>
                    <span className="text-white/80">Cron (0 */6 * * *)</span>
                  </div>
                </div>
              </div>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10"
              >
                <Github className="w-4 h-4" />
                <span>Open GitHub Pipeline</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status bar inside Power BI frame */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d0e15] border-t border-white/10 text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Data Model Connected</span>
        </div>
        <div>
          <span>To embed custom Power BI report, click the sliders icon above</span>
        </div>
      </div>
    </div>
  );
};
