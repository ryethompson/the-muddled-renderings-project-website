import { Project } from '../types/projects';
import { DEFAULT_PROJECTS } from '../data/defaultProjects';

const STORAGE_KEY = 'muddled_renderings_projects_v7';

export class ProjectStorage {
  private static subscribers: Array<(projects: Project[]) => void> = [];

  static getProjects(): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
        return DEFAULT_PROJECTS;
      }
      let parsed: Project[] = JSON.parse(stored);
      // Ensure power-bi-global-connectivity is excluded
      parsed = parsed.filter(p => p.id !== 'power-bi-global-connectivity');

      DEFAULT_PROJECTS.forEach(def => {
        const existingIdx = parsed.findIndex(p => p.id === def.id);
        if (existingIdx === -1) {
          parsed.push(def);
        } else {
          if (def.isCanonicalTest || def.id === 'test') {
            parsed[existingIdx].title = def.title;
            parsed[existingIdx].subtitle = def.subtitle;
            parsed[existingIdx].description = def.description;
          }
          if (def.githubPipelineUrl) {
            parsed[existingIdx].githubPipelineUrl = def.githubPipelineUrl;
          }
          if (def.renderingEngine) {
            parsed[existingIdx].renderingEngine = def.renderingEngine;
          }
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    } catch (e) {
      console.warn('Failed to read projects from localStorage:', e);
      return DEFAULT_PROJECTS;
    }
  }

  static getProjectById(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id || p.slug === id);
  }

  static saveProject(project: Project): Project[] {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    let updated: Project[];

    if (existingIndex >= 0) {
      updated = [...projects];
      updated[existingIndex] = { ...project };
    } else {
      updated = [project, ...projects];
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save project:', e);
    }

    this.notify(updated);
    return updated;
  }

  static deleteProject(id: string): Project[] {
    if (id === 'test') {
      console.warn('Cannot delete canonical "test" project');
      return this.getProjects();
    }
    const projects = this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Failed to delete project:', e);
    }
    this.notify(filtered);
    return filtered;
  }

  static resetToDefaults(): Project[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
    } catch (e) {
      console.error('Failed to reset defaults:', e);
    }
    this.notify(DEFAULT_PROJECTS);
    return DEFAULT_PROJECTS;
  }

  static subscribe(callback: (projects: Project[]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private static notify(projects: Project[]) {
    this.subscribers.forEach((cb) => {
      try {
        cb(projects);
      } catch (err) {
        console.error('Project subscriber notification error:', err);
      }
    });
  }
}
