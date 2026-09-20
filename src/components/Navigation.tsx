import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types/projects';
import { ChevronDown, Sparkles } from 'lucide-react';

interface NavigationProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  onOpenPublish?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onOpenPublish,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      id="site-top-banner"
      className="sticky top-0 z-40 w-full bg-[#08090d]/95 backdrop-blur-xl border-b border-white/10 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Left: Logo & Project Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 text-left select-none">
              {/* Minimal graphic logo: screen pixels derived from data bits (grayscale, stationary, slow random pulsing) */}
              <div
                id="brand-data-pixel-logo"
                className="relative w-8 h-8 rounded-[6px] bg-[#0c0d14] border border-white/20 p-[4.5px] flex items-center justify-center hover:border-white/50 hover:shadow-[0_0_12px_rgba(255,255,255,0.18)] transition-all duration-300 overflow-hidden"
                aria-label="Pixel data emblem"
              >
                <div className="grid grid-cols-3 gap-[2.5px] w-full h-full relative z-10">
                  {/* Bit row 1: Pixels 1, 2, 3 */}
                  <span className="bg-white rounded-[0.5px] pixel-pulse-1" />
                  <span className="bg-white rounded-[0.5px] pixel-pulse-2" />
                  <span className="bg-white rounded-[0.5px] pixel-pulse-3" />

                  {/* Bit row 2: Pixels 4, 5, 6 */}
                  <span className="bg-white rounded-[0.5px] pixel-pulse-4" />
                  <span className="bg-white rounded-[0.5px] pixel-pulse-5" />
                  <span className="bg-white rounded-[0.5px] pixel-pulse-6" />

                  {/* Bit row 3: Pixels 7, 8, 9 */}
                  <span className="bg-white rounded-[0.5px] pixel-pulse-7" />
                  <span className="bg-white rounded-[0.5px] pixel-pulse-8" />
                  <span className="bg-white rounded-[0.5px] pixel-pulse-9" />
                </div>
              </div>

              <span className="font-rubik text-xs sm:text-sm md:text-[15px] font-medium tracking-[0.14em] text-white uppercase select-none transition-all">
                The Muddled Renderings Project
              </span>
            </div>
          </div>

          {/* Right: Project Selection */}
          <div className="flex items-center gap-2" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white/90 transition-all hover:border-white/30"
                aria-expanded={isDropdownOpen}
                aria-label="Select Project"
                id="project-selector-button"
              >
                <span className="text-white/40 hidden sm:inline">rendering:</span>
                <span className="font-semibold text-white tracking-wide truncate max-w-[120px] sm:max-w-[180px]">
                  {activeProject?.title || 'Invest-a-techno Archipelago'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  id="project-selector-dropdown"
                  className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0e1017] border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <div className="px-2 py-1 mb-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      Select Project ({projects.length})
                    </span>
                  </div>

                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProject(p.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                          activeProjectId === p.id
                            ? 'bg-white/15 text-white font-bold'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="truncate mr-2">
                          <div className="truncate">{p.title}</div>
                          {p.subtitle && (
                            <div className="text-[10px] text-white/40 font-normal truncate">
                              {p.subtitle}
                            </div>
                          )}
                        </div>
                        {p.id === 'test' ? (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0">
                            Canonical
                          </span>
                        ) : p.renderingEngine === 'power_bi' ? (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#f2c811]/20 text-[#f2c811] shrink-0 font-medium">
                            Power BI
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


