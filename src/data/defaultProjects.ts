import { Project } from '../types/projects';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'test',
    slug: 'test',
    title: 'Techno Archipelago',
    subtitle: 'A visualisation of the relationship between median disposable income, national R&D expenditure, and digital integration in the OECD',
    category: 'Macroeconomics & Living Terrain',
    artisticPremise: 'National economic productivity is re-imagined not as tabular spreadsheets, but as an ancient living geological shelf where digital connectivity elevates terrain and R&D fuels luminescence.',
    description: `In a disparate ocean, hotspots emerge. An archipelago develops; the bedrock of islands grow and contract in form, fed by violent outbursts of capital expenditure. Their spires shape the horizon, while the volcanic sediment hardens into intricate circuitries. Ruffled by aura and the unknown, these islands expand and contract in size.

Does greater technological intensity - expressed through R&D expenditure, digital business integration and household internet access - coincide with higher median disposable income? If technological capacity expands, should we expect the nominal prosperity of households to expand with it? Does investment in innovation eventually settle into the bedrock, or can technological intensity accumulate above a landscape without substantially altering the ground beneath it?

Most islands seem to confirm to the premise: taller spires, denser circuits, and thicker bedrocks appear to develop together. Elsewhere, the relationship fragments. Technologically intensive landscapes emerge without equally pronounced prosperity; prosperous terrains exist without corresponding technological heights. The archipelago begins to look less like a coherent system and more like a collection of partial and sometimes contradictory geographies.

What unique conditions would then shape these environmental forces to belong to the same landscape?`,
    renderingEngine: 'oecd_atlas',
    datePublished: '21-08-2026',
    author: 'OECD Data Art Working Group',
    version: '1.4.0',
    isCanonicalTest: true,
    featured: true,
    tags: ['OECD Statistics', 'Generative Atlas', 'Economic Topography', 'Canvas 2D'],
    githubPipelineUrl: 'https://github.com/ryethompson/the-muddled-renderings-project-website/tree/main/renderings/techno-archipelago',
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

