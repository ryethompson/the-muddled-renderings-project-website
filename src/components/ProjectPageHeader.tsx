import React from 'react';
import { Project } from '../types/projects';
import { Calendar } from 'lucide-react';

interface ProjectPageHeaderProps {
  project: Project;
  onToggleParameters?: () => void;
  isParametersOpen?: boolean;
}

const formatDateToDDMMYYYY = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // YYYY-MM-DD -> DD-MM-YYYY
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    if (parts[2].length === 4) {
      return dateStr;
    }
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return dateStr;
};

export const ProjectPageHeader: React.FC<ProjectPageHeaderProps> = ({
  project,
}) => {
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
              <span>{formatDateToDDMMYYYY(project.datePublished)}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
