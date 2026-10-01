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
      <div className="flex flex-col border-b border-white/10 pb-6">
        {/* Title and Subtitle (In the top-right hand) */}
        <div className="flex flex-col items-end text-right">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-medium tracking-[0.14em] uppercase leading-snug text-white/50 select-none"
            style={{
              fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-sm sm:text-base font-sans text-white/50 mt-2 max-w-xl ml-auto leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Longer text (Below the subtitle and above the canvas, full width of canvas) */}
        {project.description && (
          <div className="w-full mt-6">
            <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed w-full whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};
