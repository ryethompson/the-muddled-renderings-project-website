import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Github,
  ExternalLink,
  Code2,
  FileCode,
  Terminal,
  Database,
  Layers,
  Sparkles,
  Workflow,
  BookOpen
} from 'lucide-react';
import { PIPELINE_CODE_FILES, PIPELINE_REPOSITORY_URL, PipelineFile } from '../data/pipelineCode';

interface PipelineCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFile?: string;
  githubUrl?: string;
}

export const PipelineCodeModal: React.FC<PipelineCodeModalProps> = ({
  isOpen,
  onClose,
  initialFile = 'oecd_database_etl.py',
  githubUrl = PIPELINE_REPOSITORY_URL,
}) => {
  const [activeFilename, setActiveFilename] = useState<string>(initialFile);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile =
    PIPELINE_CODE_FILES.find((f) => f.filename === activeFilename) || PIPELINE_CODE_FILES[0];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    // Generate combined bundle
    let bundleText = `# THE MUDDLED RENDERINGS PROJECT - COMPLETE PIPELINE BUNDLE\n# Exported: ${new Date().toISOString()}\n\n`;
    for (const file of PIPELINE_CODE_FILES) {
      bundleText += `\n${'='.repeat(80)}\n# FILE: ${file.path} (${file.title})\n${'='.repeat(80)}\n\n${file.code}\n\n`;
    }
    const blob = new Blob([bundleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oecd_to_canvas_pipeline_bundle.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: PipelineFile['category']) => {
    switch (category) {
      case 'database_pipeline':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'analytics':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'canvas_visualization':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'github_workflow':
        return <Workflow className="w-4 h-4 text-purple-400" />;
      case 'documentation':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      default:
        return <FileCode className="w-4 h-4 text-white/60" />;
    }
  };

  const codeLines = currentFile.code.trim().split('\n');

  return (
    <div
      id="pipeline-code-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="pipeline-code-modal-window"
        className="w-full max-w-5xl h-[90vh] max-h-[850px] flex flex-col bg-[#0b0c12] border border-white/20 rounded-2xl shadow-2xl overflow-hidden text-[#e2e4ec]"
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#11131c] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-base sm:text-lg text-white font-semibold tracking-wide">
                  OECD Pipeline & Canvas Architecture
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-white/10 text-amber-300 border border-amber-500/30 font-semibold">
                  Open Source Code
                </span>
              </div>
              <p className="text-[11px] font-mono text-white/50 mt-0.5">
                Full end-to-end pipeline: OECD Database SDMX ETL → Statistical Analytics → Living Canvas Visuals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct GitHub Link */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-amber-300 transition-colors font-mono"
              title="Open GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white transition-colors"
              title="Close Modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Architecture Breadcrumbs */}
        <div className="px-5 py-2.5 bg-[#0e1017] border-b border-white/10 flex items-center justify-between text-[11px] font-mono overflow-x-auto gap-4 shrink-0">
          <div className="flex items-center gap-2 min-w-max text-white/60">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Database className="w-3 h-3" /> OECD SDMX API
            </span>
            <span>→</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <Layers className="w-3 h-3" /> Statistical Analytics
            </span>
            <span>→</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Canvas Visualizer
            </span>
            <span>→</span>
            <span className="text-purple-400 font-semibold flex items-center gap-1">
              <Workflow className="w-3 h-3" /> GitHub Actions CI/CD
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
              title="Download all pipeline files into one archive bundle"
            >
              <Download className="w-3 h-3" />
              <span>Export All Files</span>
            </button>
          </div>
        </div>

        {/* Main Body: Left File Tabs & Right Code Display */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Tab Selector (Sidebar) */}
          <div className="w-full md:w-72 bg-[#090a0f] border-b md:border-b-0 md:border-r border-white/10 p-3 overflow-y-auto shrink-0 flex md:flex-col gap-1.5">
            <div className="hidden md:block text-[10px] font-mono uppercase tracking-widest text-white/40 px-2 py-1 font-semibold">
              Pipeline Stages
            </div>

            {PIPELINE_CODE_FILES.map((file) => {
              const isActive = file.filename === activeFilename;
              return (
                <button
                  key={file.filename}
                  onClick={() => setActiveFilename(file.filename)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all font-mono text-xs ${
                    isActive
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                      : 'bg-white/[0.02] hover:bg-white/5 border border-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  <div className="shrink-0">{getCategoryIcon(file.category)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{file.filename}</div>
                    <div className="text-[10px] text-white/40 truncate">{file.path}</div>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono">
                    {file.language}
                  </span>
                </button>
              );
            })}

            {/* External repository hint */}
            <div className="hidden md:block mt-auto pt-4 border-t border-white/5 px-2">
              <div className="text-[10px] text-white/40 leading-relaxed font-mono">
                Code verified against live OECD databases. Automatic synchronization runs on the 1st of every month via GitHub Actions.
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#07080b] overflow-hidden">
            {/* Code Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c0e15] border-b border-white/10 text-xs font-mono shrink-0">
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-white font-medium truncate">{currentFile.path}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/50 text-[11px] hidden sm:inline truncate">
                  {currentFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-amber-300 transition-colors"
                  title="Copy code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {/* Download Single File */}
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-white transition-colors"
                  title="Download this file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Content Scrollable Area */}
            <div className="flex-1 overflow-auto p-4 font-mono text-[11px] sm:text-xs leading-relaxed selection:bg-amber-500/30 selection:text-white">
              <pre className="text-white/90">
                {codeLines.map((line, idx) => (
                  <div key={idx} className="flex hover:bg-white/[0.03] py-0.5 rounded px-1">
                    <span className="w-10 select-none text-white/20 text-right pr-4 shrink-0 font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre flex-1">{line}</span>
                  </div>
                ))}
              </pre>
            </div>

            {/* Footer Summary Bar */}
            <div className="px-4 py-2 bg-[#0a0b10] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 shrink-0">
              <div>
                <span>Language: </span>
                <span className="text-amber-400 uppercase font-semibold">{currentFile.language}</span>
                <span className="mx-2">•</span>
                <span>{codeLines.length} lines</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <span>Inspect on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
