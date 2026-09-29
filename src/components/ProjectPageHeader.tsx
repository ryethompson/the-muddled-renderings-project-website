import React from 'react';
import { Project } from '../types/projects';

interface ProjectPageHeaderProps {
  project: Project;
  onToggleParameters?: () => void;
  isParametersOpen?: boolean;
}

export const ProjectPageHeader: React.FC<ProjectPageHeaderProps> = ({
  project,
}) => {
  return (
    <header id="project-page-header" className="w-full max-w-6xl mx-auto pt-6 pb-4 px-4">
      {/* Main Project Title Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="flex-1 min-w-0">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-medium tracking-[0.14em] uppercase leading-snug text-white/50 select-none"
            style={{
              fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-sm sm:text-base font-sans text-white/50 mt-2 max-w-xl leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </div>

        <div className="max-w-md text-white/50 font-light leading-relaxed flex-shrink-0">
          <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </header>
  );
};
