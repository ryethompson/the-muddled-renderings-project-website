import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface BottomBannerProps {
  lastUpdated?: string;
  missionStatement?: string;
  releaseNote?: string;
  renderingDate?: string;
  websiteVersion?: string;
  pipelineGithubUrl?: string;
}

export const formatToDDMMYYYY = (dateStr?: string): string => {
  if (!dateStr) return '21/08/2026';
  const clean = dateStr.trim();
  const slashParts = clean.split('/');
  if (slashParts.length === 3) {
    if (slashParts[0].length === 4) {
      return `${slashParts[2].padStart(2, '0')}/${slashParts[1].padStart(2, '0')}/${slashParts[0]}`;
    }
    return `${slashParts[0].padStart(2, '0')}/${slashParts[1].padStart(2, '0')}/${slashParts[2]}`;
  }
  const dashParts = clean.split('-');
  if (dashParts.length === 3) {
    if (dashParts[0].length === 4) {
      // YYYY-MM-DD -> DD/MM/YYYY
      return `${dashParts[2].padStart(2, '0')}/${dashParts[1].padStart(2, '0')}/${dashParts[0]}`;
    }
    if (dashParts[2].length === 4) {
      // DD-MM-YYYY -> DD/MM/YYYY
      return `${dashParts[0].padStart(2, '0')}/${dashParts[1].padStart(2, '0')}/${dashParts[2]}`;
    }
  }
  const d = new Date(clean);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return clean;
};

export const BottomBanner: React.FC<BottomBannerProps> = ({
  missionStatement = 'The Muddled Renderings Project is an ongoing visual inquiry into the ways empirical data comes to represent economic inequalities as reality. Drawing on real-world datasets, analytical pipelines, and generative mechanisms, this open source project transforms statistical abstractions into living digital landscapes: shifting terrains where numbers acquire form, relationships become spatial, and patterns emerge and dissolve. In doing so, the project challenges not only what data reveals about economic inequalities, but also what is distorted, obscured, or lost when complex realities are rendered legible through measurement.',
  renderingDate = '21-08-2026',
  websiteVersion = 'v1.4 (September, 2026)',
  pipelineGithubUrl = 'https://github.com/ryethompson/the-muddled-renderings-project-website',
}) => {
  return (
    <footer
      id="site-bottom-banner"
      className="w-full bg-[#08090d]/95 backdrop-blur-xl border-t border-white/10 px-4 sm:px-8 py-5 sm:py-6 mt-auto transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-xs font-mono">
        {/* Bottom Left: Mission Statement */}
        <div className="flex-1 max-w-3xl">
          <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed font-light m-0">
            {missionStatement}
          </p>
        </div>

        {/* Bottom Right: Release Notes Section */}
        <div className="shrink-0 font-mono flex flex-col items-start sm:items-end sm:self-end">
          <div className="text-[10px] uppercase font-mono tracking-widest text-white/45 font-semibold mb-1.5 text-left sm:text-right w-full">
            Release note
          </div>

          <div className="flex flex-col items-start sm:items-end space-y-1.5 text-left sm:text-right text-[11px]">
            {/* 1. Rendering release */}
            <div className="text-white/70 text-[11px] font-mono">
              <span className="font-medium">Rendering release </span>
              <span className="font-normal text-white/55">({formatToDDMMYYYY(renderingDate)})</span>
            </div>

            {/* 2. Link to github repository */}
            <div>
              <a
                href={pipelineGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 font-medium transition-colors group"
                title="View public repository and pipeline source code on GitHub"
              >
                <Github className="w-3.5 h-3.5 text-white/70 group-hover:text-amber-300 transition-colors" />
                <span>Github</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
