/**
 * THE MUDDLED RENDERINGS PROJECT - Multi-Project Architecture
 * Types and interfaces for publishing, managing, and rendering project pages.
 */

export type RenderingEngineType =
  | 'oecd_atlas'          // The canonical OECD macroeconomic landscape (used for "test")
  | 'power_bi'            // Microsoft Power BI interactive embedded report or dashboard
  | 'fluid_harmonic'      // Navier-Stokes inspired dynamic fluid vector fields & thermoclines
  | 'quantum_lattice'     // 3D nodal spring graph & topological spore resonance
  | 'neural_morphogenesis'// Reaction-diffusion organic cellular morphogenesis
  | 'cybernetic_waves';   // Multi-frequency Lissajous & kinetic chrono-oscillations

export interface ProjectParameters {
  colorPalette: 'obsidian_gold' | 'neon_amber' | 'celestial_amethyst' | 'emerald_mist' | 'monochrome_noir' | 'cinnabar_ember';
  speed: number;           // 0.2 to 3.0
  particleCount: number;   // 50 to 800
  turbulence: number;      // 0.1 to 2.5
  nodeGlow: boolean;
  wireframe: boolean;
  fieldZoom: number;       // 0.5 to 2.0
  customSeed: number;
}

export interface ProjectMetric {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  interpretation?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;           // E.g. "test", "Hydra Flow", "Noosphere Lattice"
  subtitle: string;
  category: string;
  description: string;
  artisticPremise: string;
  renderingEngine: RenderingEngineType;
  datePublished: string;
  author: string;
  version: string;
  isCanonicalTest?: boolean; // Set true for "test"
  tags: string[];
  parameters: ProjectParameters;
  metrics?: ProjectMetric[];
  datasetName?: string;
  externalSource?: string;
  featured?: boolean;
  githubPipelineUrl?: string; // Link to the GitHub pipeline repository / workflow where it is defined
  powerBiEmbedUrl?: string;   // Microsoft Power BI Report web publish or embed URL
  powerBiReportName?: string;
}

