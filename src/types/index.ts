/**
 * THE MUDDLED RENDERINGS PROJECT - Type Definitions
 * Relational data structures, statistical observation models,
 * visual encoding types, and canvas state interfaces.
 */

export interface Country {
  id: string;              // e.g. "oecd-nor"
  isoCode: string;         // ISO 3166-1 alpha-3, e.g. "NOR"
  iso2Code: string;        // ISO 3166-1 alpha-2, e.g. "NO"
  name: string;            // e.g. "Norway"
  officialName: string;    // e.g. "Kingdom of Norway"
  oecdMemberSince: number; // Year joined OECD, e.g. 1961
  region: 'Europe' | 'Americas' | 'Asia-Pacific' | 'Middle East';
  displayOrder: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  fieldPosition: {
    x: number; // Relative anchor position in atlas field (-1 to 1 or pixel coords)
    y: number;
  };
}

export type IndicatorSlug = 
  | 'household_internet_access'
  | 'digital_intensity_businesses'
  | 'rd_expenditure_gdp'
  | 'median_disposable_income';

export interface Indicator {
  id: string;
  slug: IndicatorSlug;
  name: string;
  shortLabel: string;
  description: string;
  artisticDimension: string; // Plain English translation
  unit: string;
  unitSymbol: string;
  sourcePreference: 'OECD' | 'Eurostat' | 'World Bank' | 'ECB';
  visualizationRole: string;
  definition: string;
  methodologyUrl: string;
  minPlausible: number;
  maxPlausible: number;
}

export interface Observation {
  id: string;
  countryId: string;
  indicatorSlug: IndicatorSlug;
  value: number | null; // null represents missing/unavailable observation
  unit: string;
  referencePeriod: string; // e.g. "2023", "2024-Q2"
  frequency: 'Annual' | 'Quarterly' | 'Monthly';
  sourceId: string;
  publicationDate: string;
  retrievedAt: string;
  revisionStatus: 'Initial' | 'Revised' | 'Final';
  qualityStatus: 'Verified' | 'Provisional' | 'Estimated' | 'Missing';
  notes?: string;
}

export interface DataSource {
  id: string;
  organization: 'OECD' | 'Eurostat' | 'World Bank' | 'ECB';
  datasetName: string;
  datasetCode: string;
  url: string;
  methodologyUrl: string;
  citationText: string;
  updateCadence: 'Monthly' | 'Quarterly' | 'Annual';
  lastCheckedDate: string;
}

export interface DataRelease {
  id: string;
  sourceId: string;
  releaseDate: string;
  retrievalDate: string;
  observationsCount: number;
  status: 'Active' | 'Superceded' | 'Processing';
  notes: string;
}

export interface DataQualityReport {
  totalCountries: number;
  completeObservations: number;
  missingObservations: number;
  coverageRatio: number; // 0.0 - 1.0
  validationPassed: boolean;
  timestamp: string;
}

export interface CountryEconomicProfile {
  country: Country;
  metrics: {
    householdInternetAccess: Observation;
    digitalIntensityBusinesses: Observation;
    rdExpenditure: Observation;
    medianDisposableIncome: Observation;
  };
  normalized: NormalizedMetrics;
  encoding: VisualEncoding;
}

export interface NormalizedMetrics {
  // All normalized to [0, 1] range with outlier clipping and percentile consideration
  internetAccessNorm: number;     // 0 = lowest in OECD, 1 = highest
  digitalIntensityNorm: number;
  rdExpenditureNorm: number;
  medianIncomeNorm: number;
  completenessScore: number;      // 0 to 1 based on how many metrics are present
  hasMissingData: boolean;
}

export interface VisualEncoding {
  // 1. Terrain & Bedrock Mass (driven by Median Disposable Income)
  baseRadius: number;             // Physical footprint size
  elevationHeight: number;        // Topographic strata height
  layerCount: number;             // Stratified rock layers
  bedrockDensity: number;         // Visual weight & line weight

  // 2. Vertical Spire & Emergent Plumes (driven by R&D Expenditure)
  spireHeight: number;            // Vertical crystalline growth
  plumeParticleCount: number;     // Emitted luminous micro-nodes
  emergenceVelocity: number;      // Ascending filament speed
  branchingComplexity: number;    // Number of fractal facets

  // 3. Cybernetic Vein Lattice (driven by Digital Intensity of Businesses)
  latticeFrequency: number;       // Density of internal geometric circuits
  veinPulseSpeed: number;         // Electrical impulse rate
  crystallineAngle: number;       // Sharpness of geometric facets
  internalTextureAlpha: number;   // Opacity of digital mesh

  // 4. Coherence Aura & Flow Smoothness (driven by Household Internet Access)
  coherenceAuraRadius: number;    // Outer atmospheric aura extent
  tendrilTension: number;         // Continuity vs. fragmentation of surface curves
  filamentCount: number;          // Connective micro-tendrils in atmosphere
  particleDriftSmoothness: number;// Fluidity of local dust

  // Color Architecture (Multi-dimensional chromatic mapping)
  primaryColor: string;           // Hex or HSL
  secondaryColor: string;
  accentColor: string;
  glowColor: string;
  baseHue: number;
  saturation: number;
  lightness: number;

  // Animation Characteristics
  breathingFrequency: number;     // Base rhythmic oscillation cycle
  oscillationAmplitude: number;   // Movement magnitude
  phaseOffset: number;            // Deterministic hash based on country code
}

export interface AtlasDatasetResponse {
  atlasTitle: string;
  edition: string;
  generatedAt: string;
  nextMonthlyUpdateDue: string;
  oecdCountryCount: number;
  countries: CountryEconomicProfile[];
  sources: DataSource[];
  indicators: Indicator[];
  qualityReport: DataQualityReport;
  dataOrigin: 'DATABASE_BACKED_CANONICAL' | 'SIMULATED_INGESTION_RUN';
}
