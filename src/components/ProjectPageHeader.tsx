import React from 'react';
import { Project } from '../types/projects';
import { Calendar, Github, ExternalLink } from 'lucide-react';

interface ProjectPageHeaderProps {
  project: Project;
  onToggleParameters?: () => void;
  isParametersOpen?: boolean;
}

export const ProjectPageHeader: React.FC<ProjectPageHeaderProps> = ({
  project,
}) => {
  const repoUrl = project.githubPipelineUrl || 'https://github.com/ryethompson/the-muddled-renderings-project-website';

  return (
    <header id="project-page-header" className="w-full max-w-6xl mx-auto pt-6 pb-4 px-4">
      {/* Main Project Title Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight uppercase">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-xs sm:text-sm font-mono text-white/60 mt-1 max-w-2xl">
              {project.subtitle}
            </p>
          )}
        </div>

        <div className="max-w-md text-xs text-white/60 font-light leading-relaxed">
          <p>{project.description}</p>
          <div className="mt-2 text-[10px] font-mono text-white/40 flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{project.datePublished}</span>
            </span>
            <span>•</span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
              title="View public repository and pipeline source code on GitHub"
            >
              <Github className="w-3 h-3" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
