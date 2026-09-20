import { Project } from '../types/projects';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'test',
    slug: 'test',
    title: 'Invest-a-techno Archipelago',
    subtitle: 'Expressions of median disposable income in the OECD to R&D expendature and digital integration',
    category: 'Macroeconomics & Living Terrain',
    description: 'In a disparate ocean, hotspots emerge. An archipelago develops: islands grow and contract in form, fed by the ever-violent outbursts of capital expenditure. Spires rise and shape the sightlines, while volcanic sediment hardens into intricate circuitry. Ruffled by aura and the unknown, the islands expand and recede, competing for finite space in an unstable geography of accumulation.',
    artisticPremise: 'National economic productivity is re-imagined not as tabular spreadsheets, but as an ancient living geological shelf where digital connectivity elevates terrain and R&D fuels luminescence.',
    renderingEngine: 'oecd_atlas',
    datePublished: '2026-08-21',
    author: 'OECD Data Art Working Group',
    version: '1.4.0',
    isCanonicalTest: true,
    featured: true,
    tags: ['OECD Statistics', 'Generative Atlas', 'Economic Topography', 'Canvas 2D'],
    githubPipelineUrl: 'https://github.com/the-muddled-renderings-project/pipelines/blob/main/.github/workflows/oecd_pipeline.yml',
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

