/**
 * THE MUDDLED RENDERINGS PROJECT
 * Multi-Project Generative Anthology Architecture
 */

import React, { useState, useEffect } from 'react';
import { AtlasDatasetResponse } from './types';
import { Project, ProjectParameters } from './types/projects';
import { ProjectStorage } from './lib/projectStorage';
import { IngestionEngine } from './server/ingestionEngine';

// Components
import { Navigation } from './components/Navigation';
import { BottomBanner } from './components/BottomBanner';
import { ProjectPageHeader } from './components/ProjectPageHeader';
import { ProjectParametersDrawer } from './components/ProjectParametersDrawer';
import { PublishProjectModal } from './components/PublishProjectModal';
import { GenerativeProjectCanvas } from './components/GenerativeProjectCanvas';
import { AtlasCanvas } from './components/AtlasCanvas';
import { PowerBICanvas } from './components/PowerBICanvas';
import { DesktopGuard } from './components/DesktopGuard';

export function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>('test');
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isParamsDrawerOpen, setIsParamsDrawerOpen] = useState(false);

  // OECD Atlas specific state (used for "test" project page)
  const [oecdData, setOecdData] = useState<AtlasDatasetResponse | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initialize projects from local storage / defaults
  useEffect(() => {
    const loaded = ProjectStorage.getProjects();
    setProjects(loaded);

    const unsubscribe = ProjectStorage.subscribe((updated) => {
      setProjects(updated);
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync URL Hash for deep-linking (#test, #hydra-flow, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash === 'publish') {
        setIsPublishOpen(true);
      } else if (hash) {
        const found = ProjectStorage.getProjectById(hash);
        if (found) {
          setActiveProjectId(found.id);
        } else {
          setActiveProjectId('test');
        }
      } else {
        setActiveProjectId('test');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Load canonical OECD dataset for "test" project page
  useEffect(() => {
    async function loadDataset() {
      try {
        const res = await fetch('/api/atlas/data');
        if (res.ok) {
          const json = await res.json();
          setOecdData(json);
        } else {
          const fallback = IngestionEngine.processAtlasDataset();
          setOecdData(fallback);
        }
      } catch (err) {
        const fallback = IngestionEngine.processAtlasDataset();
        setOecdData(fallback);
      } finally {
        setIsLoading(false);
      }
    }

    loadDataset();
  }, []);

  // Keyboard navigation when inspecting countries in OECD "test" view
  useEffect(() => {
    if (!oecdData || activeProjectId !== 'test') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCountryId(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const currentIndex = oecdData.countries.findIndex(
          (c) => c.country.id === selectedCountryId
        );
        const nextIndex = (currentIndex + 1) % oecdData.countries.length;
        setSelectedCountryId(oecdData.countries[nextIndex].country.id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const currentIndex = oecdData.countries.findIndex(
          (c) => c.country.id === selectedCountryId
        );
        const prevIndex = (currentIndex - 1 + oecdData.countries.length) % oecdData.countries.length;
        setSelectedCountryId(oecdData.countries[prevIndex].country.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [oecdData, activeProjectId, selectedCountryId]);

  // Handle OECD Ingestion trigger
  const handleTriggerIngestion = async () => {
    setIsIngesting(true);
    try {
      const res = await fetch('/api/atlas/ingest', { method: 'POST' });
      if (res.ok) {
        const updated = await res.json();
        setOecdData(updated);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const updated = IngestionEngine.processAtlasDataset();
        setOecdData(updated);
      }
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const updated = IngestionEngine.processAtlasDataset();
      setOecdData(updated);
    } finally {
      setIsIngesting(false);
    }
  };

  // Switch project handler
  const handleSelectProject = (projectId: string) => {
    setActiveProjectId(projectId);
    window.location.hash = projectId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Publish new project
  const handlePublishProject = (newProject: Project) => {
    ProjectStorage.saveProject(newProject);
    setActiveProjectId(newProject.id);
    window.location.hash = newProject.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete project
  const handleDeleteProject = (projectId: string) => {
    ProjectStorage.deleteProject(projectId);
    if (activeProjectId === projectId) {
      setActiveProjectId('test');
    }
  };

  // Update live parameters for active project
  const handleUpdateActiveParams = (newParams: Partial<ProjectParameters>) => {
    const current = projects.find((p) => p.id === activeProjectId);
    if (!current) return;

    const updated: Project = {
      ...current,
      parameters: {
        ...current.parameters,
        ...newParams,
      },
    };

    ProjectStorage.saveProject(updated);
  };

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  if (isLoading || !oecdData) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#07080b] text-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto" />
          <p className="font-cinzel text-xs tracking-widest uppercase text-white/60">
            Initializing The Muddled Renderings Project...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#07080b] text-[#e2e4ec] selection:bg-amber-500/30 selection:text-white relative font-sans">
      {/* 1. Global Navigation / Top Banner (Logo, Name, Project Selection) */}
      <Navigation
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={handleSelectProject}
        onOpenPublish={() => setIsPublishOpen(true)}
      />

      {/* 2. Main Content Area (Dynamic Middle Section: Changes Depending on the Project) */}
      <div className="flex-1 flex flex-col">
        {activeProject && (
          <div className="pb-12 space-y-8 animate-in fade-in duration-300">
            {/* Project Page Header */}
            <ProjectPageHeader
              project={activeProject}
              onToggleParameters={() => setIsParamsDrawerOpen(!isParamsDrawerOpen)}
              isParametersOpen={isParamsDrawerOpen}
            />

            {/* Optional Live Parameter Modulation Drawer */}
            <ProjectParametersDrawer
              project={activeProject}
              isOpen={isParamsDrawerOpen}
              onClose={() => setIsParamsDrawerOpen(false)}
              onUpdateParams={handleUpdateActiveParams}
            />

            {/* Project Canvas Viewport */}
            <main id="main-project-viewport" className="w-full max-w-6xl mx-auto px-4">
              {activeProject.id === 'test' || activeProject.renderingEngine === 'oecd_atlas' ? (
                /* Canonical OECD Economic Atlas Visual Field ('test') */
                <div>
                  <AtlasCanvas
                    countries={oecdData.countries}
                    indicators={oecdData.indicators}
                    selectedCountryId={selectedCountryId}
                    onSelectCountry={setSelectedCountryId}
                  />
                </div>
              ) : activeProject.renderingEngine === 'power_bi' ? (
                /* Microsoft Power BI Visualization Canvas */
                <div className="space-y-8">
                  <PowerBICanvas
                    project={activeProject}
                    onUpdateProject={(updated) => ProjectStorage.saveProject(updated)}
                  />
                </div>
              ) : (
                /* Specialized Generative Project Canvas */
                <div className="space-y-8">
                  <GenerativeProjectCanvas
                    project={activeProject}
                    onUpdateParameters={handleUpdateActiveParams}
                  />
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* 3. Bottom Banner: Mission Statement (Left) & Pipeline Last Updated / Release Note & GitHub Pipeline (Right) */}
      <BottomBanner
        lastUpdated={oecdData?.generatedAt}
        pipelineGithubUrl={activeProject?.githubPipelineUrl || 'https://github.com/the-muddled-renderings-project/pipelines'}
      />

      {/* 4. Publish New Project Modal */}
      <PublishProjectModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onPublish={handlePublishProject}
      />

      {/* 5. Small-screen visual guard */}
      <DesktopGuard />
    </div>
  );
}


export default App;
