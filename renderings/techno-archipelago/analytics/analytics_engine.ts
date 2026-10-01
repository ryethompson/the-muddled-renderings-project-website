/**
 * THE MUDDLED RENDERINGS PROJECT
 * Rendering: Techno Archipelago
 * Module: Analytics & Harmonic Modeling Engine (Multi-Year 2014–2024)
 * 
 * Translates multi-source OECD macroeconomic observations across an 11-year time series
 * into mathematically stable visual dimensions: Bedrock mass, Crystalline spires, Circuitry density,
 * and Particle flow dynamics, enforcing the 2-Year Maximum Interpolation Rule.
 */

export interface RawMetrics {
  internetAccess: number | null;
  digitalIntensity: number | null;
  rdExpenditure: number | null;
  medianIncome: number | null;
}

export interface StatisticalBounds {
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  p05: number;
  p95: number;
}

export interface VisualDimensionalEncoding {
  // Dimension 1: Geological Bedrock (Median Disposable Income)
  bedrockMass: number;          // [0..1] Base width and volumetric mass
  elevationHeight: number;      // Canvas pixel relief [20..60]
  stratificationLayers: number; // Discrete geological strata [3..8]
  
  // Dimension 2: Vertical Obelisks (R&D Expenditure % GDP)
  spireHeight: number;          // Vertical needle elevation [16..126]
  spireLuminescence: number;    // Particle photon intensity [0..1]
  branchingComplexity: number;  // Multi-spire fractal branches [2..8]
  
  // Dimension 3: Circuitry & Veins (Business Digital Intensity)
  circuitDensity: number;       // Micro-trace radial ring count [3..12]
  pulseVelocity: number;        // Rate of electrical signal propagation
  crystallineAngle: number;     // Angular polygon cleavage
  
  // Dimension 4: Atmospheric Particle Drift (Household Internet Access)
  particleVelocity: number;     // Vector wind velocity magnitude
  auraRadius: number;           // Coherence radius of island halo
  harmonicResonanceIndex: number; // Multi-indicator composite harmonic
}

export class HarmonicAnalyticsEngine {
  /**
   * Maximum permitted interpolation threshold between empirical anchors (years).
   */
  public static readonly MAX_INTERPOLATION_GAP = 2;

  /**
   * Normalizes raw indicator values into [0..1] continuous scalar space
   * with outlier clipping at 5th and 95th percentiles.
   */
  public static calculateRobustNorm(value: number | null, bounds: StatisticalBounds): number {
    if (value === null || isNaN(value)) return 0.5; // Impute neutral median
    const clipped = Math.max(bounds.p05, Math.min(bounds.p95, value));
    const range = bounds.p95 - bounds.p05;
    return range === 0 ? 0.5 : Math.max(0, Math.min(1, (clipped - bounds.p05) / range));
  }

  /**
   * Validates if a target year is mathematically eligible for linear interpolation.
   */
  public static isEligibleForInterpolation(
    targetYear: number,
    anchorYears: number[]
  ): boolean {
    const validAnchors = anchorYears.filter((y) => Math.abs(y - targetYear) <= this.MAX_INTERPOLATION_GAP);
    return validAnchors.length > 0;
  }

  /**
   * Computes annual rate of change (temporal velocity) between two reference periods.
   */
  public static calculateGrowthVelocity(val0: number, val1: number, yearsSpan: number): number {
    if (yearsSpan <= 0 || val0 === 0) return 0;
    return Math.pow(val1 / val0, 1 / yearsSpan) - 1;
  }

  /**
   * Translates 4 OECD indicators into visual dimension primitives.
   */
  public static deriveVisualEncoding(
    metrics: RawMetrics,
    boundsTable: Record<string, StatisticalBounds>
  ): VisualDimensionalEncoding {
    const netNorm = this.calculateRobustNorm(metrics.internetAccess, boundsTable.internet);
    const digNorm = this.calculateRobustNorm(metrics.digitalIntensity, boundsTable.digital);
    const rdNorm = this.calculateRobustNorm(metrics.rdExpenditure, boundsTable.rd);
    const incNorm = this.calculateRobustNorm(metrics.medianIncome, boundsTable.income);

    // Harmonic interaction index: compound resonance between connectivity & investment
    const resonance = Math.sqrt(rdNorm * digNorm * (0.5 + incNorm * 0.5));

    return {
      bedrockMass: incNorm,
      elevationHeight: 20 + incNorm * 40,
      stratificationLayers: Math.round(3 + incNorm * 5),

      spireHeight: 16 + Math.pow(rdNorm, 1.2) * 110,
      spireLuminescence: 0.4 + rdNorm * 0.6,
      branchingComplexity: Math.round(2 + rdNorm * 6),

      circuitDensity: 3 + Math.round(digNorm * 9),
      pulseVelocity: 0.6 + digNorm * 2.2,
      crystallineAngle: Math.PI / (3 + Math.round((1 - digNorm) * 4)),

      particleVelocity: 0.4 + netNorm * 1.6,
      auraRadius: 25 + netNorm * 75,
      harmonicResonanceIndex: resonance,
    };
  }
}
