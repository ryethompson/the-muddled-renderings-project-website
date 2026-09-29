/**
 * THE MUDDLED RENDERINGS PROJECT - Visual Encoding Engine
 * 
 * Translates the 4 OECD economic dimensions into deterministic,
 * highly sophisticated generative landscape characteristics.
 * 
 * 1. Household Internet Access      -> Surface Continuity, Atmospheric Aura, Tendril Density
 * 2. Digital Intensity of Business   -> Crystalline Lattice, Vein Network, Pulse Frequency
 * 3. R&D Expenditure (% GDP)        -> Vertical Spire Elevation, Energy Plumes, Emergent Filaments
 * 4. Median Disposable Income (PPP)  -> Geological Bedrock Mass, Strata Depth, Chromatic Opulence
 */

import { NormalizedMetrics, VisualEncoding } from '../types';

/**
 * Deterministic string hash for consistent procedural phase offsets & aesthetics
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Generates the complete visual encoding for a country landscape
 */
export function computeVisualEncoding(
  isoCode: string,
  normalized: NormalizedMetrics,
  region: string
): VisualEncoding {
  const hash = hashString(isoCode);
  const seed = (hash % 1000) / 1000;

  const {
    internetAccessNorm,
    digitalIntensityNorm,
    rdExpenditureNorm,
    medianIncomeNorm,
    hasMissingData,
  } = normalized;

  // 1. Bedrock & Terrain Mass (Driven by Median Disposable Income)
  // Amplified Covariate Sensitivity: linear uniform weighting across all countries so subtle
  // shifts in median disposable income create dramatic, clearly discernible geological landform changes
  const baseRadius = 32 + medianIncomeNorm * 68;
  const elevationHeight = 18 + medianIncomeNorm * 88;
  const layerCount = Math.round(3 + medianIncomeNorm * 9); // 3 to 12 geological strata layers
  const bedrockDensity = 0.5 + medianIncomeNorm * 0.9;

  // 2. Vertical Spire & Emergent Plumes (Driven by R&D Expenditure)
  // Height range: 24px (low R&D) to 364px (towering high R&D)
  // Linear uniform sensitivity: increased covariate weight so subtle changes in % of GDP cause amplified, unmistakably visible changes in spire elevation
  const spireHeight = 24 + rdExpenditureNorm * 340;
  const plumeParticleCount = Math.round(6 + rdExpenditureNorm * 38);
  const emergenceVelocity = 0.6 + rdExpenditureNorm * 3.0;
  const branchingComplexity = Math.round(2 + rdExpenditureNorm * 10);

  // 3. Cybernetic Vein Lattice (Driven by Digital Intensity of Businesses)
  // Heightened dynamic range: density, pulsing tempo, and trace brilliance multiply visibly as businesses adopt digital tech over time
  const latticeFrequency = 4 + Math.round(digitalIntensityNorm * 14);
  const veinPulseSpeed = 0.8 + digitalIntensityNorm * 3.2;
  const crystallineAngle = Math.PI / (3 + Math.round((1 - digitalIntensityNorm) * 4));
  const internalTextureAlpha = 0.35 + digitalIntensityNorm * 0.65;

  // 4. Coherence Aura & Flow Smoothness (Driven by Household Internet Access)
  const coherenceAuraRadius = baseRadius * (1.2 + internetAccessNorm * 0.8);
  const tendrilTension = 0.3 + internetAccessNorm * 0.7; // Higher = continuous smooth curves
  const filamentCount = Math.round(3 + internetAccessNorm * 9);
  const particleDriftSmoothness = 0.4 + internetAccessNorm * 0.6;

  // Semantic Multi-Dimensional Chromatic System
  // Base hue responds to regional mineral personality combined with digital/income shifts
  let regionHueBase = 220; // Europe core: deep mineral cobalt/indigo
  if (region === 'Europe' && (isoCode === 'NOR' || isoCode === 'SWE' || isoCode === 'FIN' || isoCode === 'ISL' || isoCode === 'DNK')) {
    regionHueBase = 185; // Nordic: glacial cyan-teal
  } else if (region === 'Americas') {
    regionHueBase = 28; // Americas: warm volcanic copper / terracotta
  } else if (region === 'Asia-Pacific') {
    regionHueBase = 320; // Asia-Pacific: jade / magenta crystalline
  } else if (region === 'Middle East') {
    regionHueBase = 45; // Middle East: solar cadmium amber
  }

  // Modulate hue with digital intensity and income
  const baseHue = (regionHueBase + digitalIntensityNorm * 40 - medianIncomeNorm * 20 + 360) % 360;
  const saturation = hasMissingData ? 25 : 65 + medianIncomeNorm * 28;
  const lightness = hasMissingData ? 40 : 42 + internetAccessNorm * 18 + rdExpenditureNorm * 8;

  // Compute complementary palette
  const primaryColor = `hsl(${Math.round(baseHue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
  const secondaryHue = (baseHue + 38 + digitalIntensityNorm * 25) % 360;
  const secondaryColor = `hsl(${Math.round(secondaryHue)}, ${Math.round(saturation * 0.9)}%, ${Math.round(lightness * 0.82)}%)`;
  
  const accentHue = (baseHue + 140 + rdExpenditureNorm * 50) % 360;
  const accentColor = `hsl(${Math.round(accentHue)}, 88%, ${Math.round(55 + rdExpenditureNorm * 25)}%)`;
  
  const glowColor = `hsla(${Math.round(accentHue)}, 95%, 65%, ${0.25 + internetAccessNorm * 0.35})`;

  // Rhythmic Animation Dynamics
  const breathingFrequency = 0.5 + (1 - medianIncomeNorm * 0.4) * 0.8; // Heavier landforms breathe slower
  const oscillationAmplitude = 2 + rdExpenditureNorm * 6;
  const phaseOffset = seed * Math.PI * 2;

  return {
    baseRadius,
    elevationHeight,
    layerCount,
    bedrockDensity,
    spireHeight,
    plumeParticleCount,
    emergenceVelocity,
    branchingComplexity,
    latticeFrequency,
    veinPulseSpeed,
    crystallineAngle,
    internalTextureAlpha,
    coherenceAuraRadius,
    tendrilTension,
    filamentCount,
    particleDriftSmoothness,
    primaryColor,
    secondaryColor,
    accentColor,
    glowColor,
    baseHue,
    saturation,
    lightness,
    breathingFrequency,
    oscillationAmplitude,
    phaseOffset,
  };
}

/**
 * Normalization helper with min-max scaling, boundary clamps, and missing handling
 */
export function normalizeMetric(
  value: number | null,
  min: number,
  max: number,
  fallback = 0.5
): number {
  if (value === null || isNaN(value)) {
    return fallback;
  }
  const clamped = Math.max(min, Math.min(max, value));
  return (clamped - min) / (max - min);
}
