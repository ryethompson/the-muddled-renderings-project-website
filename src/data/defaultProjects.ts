import { Project } from '../types/projects';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'test',
    slug: 'test',
    title: 'Mar-a-Techno Archipelago',
    subtitle: 'A visualisation of the relationship between median disposable income, national R&D expenditure, and digital integration in the OECD',
    category: 'Macroeconomics & Living Terrain',
    description: 'In a disparate ocean, hotspots emerge. An archipelago develops; islands grow and contract in form, fed by the ever-violent outbursts of capital expenditure. Spires rise and shape the horizon, while volcanic sediment hardens into intricate circuitries. Ruffled by aura and the unknown, the islands expand and recede in size, competing for finite space in a volatile ecosystem.',
    artisticPremise: 'National economic productivity is re-imagined not as tabular spreadsheets, but as an ancient living geological shelf where digital connectivity elevates terrain and R&D fuels luminescence.',
    renderingEngine: 'oecd_atlas',
    datePublished: '21-08-2026',
    author: 'OECD Data Art Working Group',
    version: '1.4.0',
    isCanonicalTest: true,
    featured: true,
    tags: ['OECD Statistics', 'Generative Atlas', 'Economic Topography', 'Canvas 2D'],
    githubPipelineUrl: 'https://github.com/ryethompson/the-muddled-renderings-project-website/tree/main/renderings/mar-a-techno-archipelago',
    parameters: {
      colorPalette: 'obsidian_gold',
      speed: 1.0,
      particleCount: 240,
      turbulence: 1.0,
      nodeGlow: true,
      wireframe: false,
      fieldZoom: 1.0,
      customSeed: 42,
    },
    datasetName: 'OECD Main Economic Indicators (38 Member States)',
    externalSource: 'OECD Data Portal & Eurostat Harmonized Base',
    metrics: [
      { label: 'Member States Profiled', value: '38', unit: 'Nations', interpretation: 'Comprehensive coverage of OECD member economies' },
      { label: 'Harmonized Metrics', value: '4', unit: 'Dimensions', interpretation: 'Internet access, digital intensity, R&D, and median income' },
      { label: 'Data Refresh Cadence', value: 'Monthly', interpretation: 'Autonomous ingestion pipeline with audit reports' },
      { label: 'Topological Engine', value: 'Perlin-Ridge Canvas', interpretation: 'Procedural heightmaps modulated by live statistical observations' },
    ],
  },
];

