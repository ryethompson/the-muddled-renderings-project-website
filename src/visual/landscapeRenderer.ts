/**
 * THE MUDDLED RENDERINGS PROJECT - Surreal Landscape Renderer
 * 
 * High-performance Canvas 2D procedural rendering engine that paints each country
 * as a living, abstract geological-biological-crystalline entity driven by
 * the 4 OECD economic indicators.
 */

import { CountryEconomicProfile } from '../types';

export interface FieldRenderState {
  time: number;                   // Global timestamp in seconds
  selectedCountryId: string | null;
  camera: { x: number; y: number; zoom: number };
  width: number;
  height: number;
  reducedMotion: boolean;
}

/**
 * Draws the atmospheric connective ether & cosmic dust particles connecting OECD economies
 */
export function drawAtmosphericField(
  ctx: CanvasRenderingContext2D,
  state: FieldRenderState,
  countries: CountryEconomicProfile[]
) {
  const { width, height, time, camera } = state;

  // 1. Draw subtle ambient radial depth gradient
  const bgGrad = ctx.createRadialGradient(
    width / 2, height / 2, 50,
    width / 2, height / 2, Math.max(width, height) * 0.8
  );
  bgGrad.addColorStop(0, '#10121a');
  bgGrad.addColorStop(0.5, '#0b0c10');
  bgGrad.addColorStop(1, '#060709');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2 + camera.x, height / 2 + camera.y);
  ctx.scale(camera.zoom, camera.zoom);

  // 2. Draw subtle connective orbital lines & faint economic resonance filaments
  ctx.lineWidth = 0.5;
  for (let i = 0; i < countries.length; i++) {
    const c1 = countries[i];
    const p1 = c1.country.fieldPosition;

    // Connect to 2 nearest neighbors
    for (let j = i + 1; j < Math.min(countries.length, i + 4); j++) {
      const c2 = countries[j];
      const p2 = c2.country.fieldPosition;
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

      if (dist < 320) {
        const pulse = Math.sin(time * 0.8 + i + j) * 0.5 + 0.5;
        const alpha = (1 - dist / 320) * 0.08 * (0.5 + 0.5 * pulse);
        
        ctx.strokeStyle = `rgba(140, 160, 210, ${alpha})`;
        ctx.beginPath();
        
        // Curved cubic bezier tendril
        const midX = (p1.x + p2.x) / 2 + Math.sin(time * 0.3 + i) * 15;
        const midY = (p1.y + p2.y) / 2 + Math.cos(time * 0.3 + j) * 15;
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  // 3. Draw ambient drift particles (atmospheric trade dust)
  const particleCount = 45;
  for (let p = 0; p < particleCount; p++) {
    const angle = (p / particleCount) * Math.PI * 2 + time * 0.02;
    const radius = 200 + (p * 37) % 600;
    const px = Math.cos(angle) * radius + Math.sin(p * 5 + time * 0.1) * 30;
    const py = Math.sin(angle) * (radius * 0.6) + Math.cos(p * 3 + time * 0.1) * 30;
    const pAlpha = 0.04 + (Math.sin(time * 1.2 + p) * 0.5 + 0.5) * 0.08;

    ctx.fillStyle = `rgba(210, 225, 255, ${pAlpha})`;
    ctx.beginPath();
    ctx.arc(px, py, (p % 3 === 0 ? 1.5 : 1), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draws an individual surreal country landscape
 */
export function drawCountryLandscape(
  ctx: CanvasRenderingContext2D,
  profile: CountryEconomicProfile,
  state: FieldRenderState
) {
  const { country, encoding, normalized } = profile;
  const { x, y } = country.fieldPosition;
  const isSelected = state.selectedCountryId === country.id;
  const time = state.reducedMotion ? 0 : state.time;

  ctx.save();
  ctx.translate(x, y);

  // Time-based organic breathing calculation
  const breathTime = time * encoding.breathingFrequency + encoding.phaseOffset;
  const breath = Math.sin(breathTime);
  const breathScale = 1 + breath * 0.035 * (isSelected ? 0.4 : 1.0);
  const breathElevation = breath * encoding.oscillationAmplitude * 0.5;

  ctx.scale(breathScale, breathScale);

  // ----------------------------------------------------
  // A. Atmospheric Coherence Aura (Household Internet Access)
  // ----------------------------------------------------
  const auraRad = encoding.coherenceAuraRadius * (1 + breath * 0.05);
  const auraGrad = ctx.createRadialGradient(0, -encoding.elevationHeight * 0.3, 5, 0, -encoding.elevationHeight * 0.3, auraRad);
  auraGrad.addColorStop(0, encoding.glowColor);
  auraGrad.addColorStop(0.5, `hsla(${encoding.baseHue}, ${encoding.saturation}%, 40%, ${0.06 + normalized.internetAccessNorm * 0.08})`);
  auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(0, -encoding.elevationHeight * 0.3, auraRad, 0, Math.PI * 2);
  ctx.fill();

  // Draw delicate internet coherence tendrils / orbital ripples
  if (normalized.internetAccessNorm > 0.4) {
    ctx.strokeStyle = `hsla(${encoding.baseHue + 20}, 75%, 70%, ${0.12 + normalized.internetAccessNorm * 0.18})`;
    ctx.lineWidth = 0.75;
    for (let f = 0; f < encoding.filamentCount; f++) {
      const fAngle = (f / encoding.filamentCount) * Math.PI * 2 + time * 0.15 + encoding.phaseOffset;
      const fDist = encoding.baseRadius * (1.1 + (f % 3) * 0.15);
      const fx = Math.cos(fAngle) * fDist;
      const fy = Math.sin(fAngle) * (fDist * 0.45) - encoding.elevationHeight * 0.2;

      ctx.beginPath();
      ctx.arc(fx, fy, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${encoding.baseHue + 40}, 90%, 80%, 0.4)`;
      ctx.fill();
    }
  }

  // ----------------------------------------------------
  // B. Geological Strata & Bedrock Mass (Median Disposable Income)
  // ----------------------------------------------------
  const r = encoding.baseRadius;
  const layers = encoding.layerCount;

  // Draw stratified geological plates from back to front
  for (let l = layers; l >= 1; l--) {
    const layerRatio = l / layers;
    const layerRadius = r * (0.45 + layerRatio * 0.55);
    const layerHeight = (encoding.elevationHeight * (1 - layerRatio * 0.75)) + breathElevation * layerRatio;
    const yOffset = (layerRatio - 1) * (encoding.elevationHeight * 0.45);

    ctx.beginPath();
    
    // Procedural organic contour with harmonics
    const points = 18;
    for (let p = 0; p <= points; p++) {
      const angle = (p / points) * Math.PI * 2;
      const wave1 = Math.sin(angle * 3 + l + encoding.phaseOffset) * (r * 0.08);
      const wave2 = Math.cos(angle * 5 - l * 0.5) * (r * 0.04);
      const dist = layerRadius + wave1 + wave2;

      // Elliptical perspective compression for terrain plane
      const px = Math.cos(angle) * dist;
      const py = Math.sin(angle) * (dist * 0.42) - layerHeight + yOffset;

      if (p === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();

    // Strata coloration: deep volcanic mineral core to luminous upper ridges
    const shadeL = Math.max(8, encoding.lightness - (layers - l) * 5);
    const shadeS = Math.max(20, encoding.saturation - (layers - l) * 4);
    const strataHue = (encoding.baseHue + (layers - l) * 6) % 360;

    const strataGrad = ctx.createLinearGradient(0, -layerHeight - 20, 0, 20);
    strataGrad.addColorStop(0, `hsl(${strataHue}, ${shadeS}%, ${shadeL + 12}%)`);
    strataGrad.addColorStop(0.7, `hsl(${strataHue}, ${shadeS}%, ${shadeL}%)`);
    strataGrad.addColorStop(1, `hsl(${strataHue}, ${shadeS * 0.8}%, ${Math.max(6, shadeL - 10)}%)`);

    ctx.fillStyle = strataGrad;
    ctx.fill();

    // Topographic edge highlight
    ctx.strokeStyle = `hsla(${strataHue}, 80%, ${shadeL + 25}%, ${0.25 + (l / layers) * 0.35})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ----------------------------------------------------
  // C. Cybernetic Vein Lattice (Digital Intensity of Businesses)
  // ----------------------------------------------------
  if (normalized.digitalIntensityNorm > 0.15) {
    const latticeR = r * 0.65;
    const pulseRate = time * encoding.veinPulseSpeed + encoding.phaseOffset;
    const pulsePhase = Math.sin(pulseRate) * 0.5 + 0.5;

    ctx.save();
    ctx.strokeStyle = `hsla(${encoding.baseHue + 60}, 90%, 75%, ${encoding.internalTextureAlpha * (0.4 + pulsePhase * 0.6)})`;
    ctx.lineWidth = 0.9;

    const nodes: { x: number; y: number }[] = [];
    const nodeCount = encoding.latticeFrequency;

    for (let n = 0; n < nodeCount; n++) {
      const nAngle = (n / nodeCount) * Math.PI * 2 + (n % 2 === 0 ? 0.2 : -0.2);
      const nDist = latticeR * (0.3 + (n % 3) * 0.25);
      const nx = Math.cos(nAngle) * nDist;
      const ny = Math.sin(nAngle) * (nDist * 0.38) - encoding.elevationHeight * 0.6;
      nodes.push({ x: nx, y: ny });
    }

    // Connect nodes into crystalline geometric web
    ctx.beginPath();
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      const n2 = nodes[(i + 2) % nodes.length];
      const n3 = nodes[(i + 3) % nodes.length];

      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      if (i % 2 === 0) {
        ctx.lineTo(n3.x, n3.y);
      }
    }
    ctx.stroke();

    // Node micro-sparks
    for (const node of nodes) {
      ctx.fillStyle = `hsla(${encoding.baseHue + 80}, 95%, 85%, ${0.5 + pulsePhase * 0.5})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ----------------------------------------------------
  // D. Vertical Spire & Emergent Energy Plumes (R&D Expenditure)
  // ----------------------------------------------------
  const spireH = encoding.spireHeight + breath * 4;
  const spireApexY = -encoding.elevationHeight * 0.7 - spireH;

  // Draw central crystalline spire / obelisk
  ctx.beginPath();
  const spireBaseW = 4 + normalized.rdExpenditureNorm * 8;
  const spireMidW = spireBaseW * 0.6;
  const spireBaseY = -encoding.elevationHeight * 0.6;

  ctx.moveTo(-spireBaseW, spireBaseY);
  ctx.lineTo(-spireMidW, spireBaseY - spireH * 0.5);
  ctx.lineTo(0, spireApexY);
  ctx.lineTo(spireMidW, spireBaseY - spireH * 0.5);
  ctx.lineTo(spireBaseW, spireBaseY);
  ctx.closePath();

  const spireGrad = ctx.createLinearGradient(0, spireBaseY, 0, spireApexY);
  spireGrad.addColorStop(0, `hsla(${encoding.baseHue}, 80%, 45%, 0.8)`);
  spireGrad.addColorStop(0.6, `hsla(${encoding.baseHue + 40}, 90%, 65%, 0.9)`);
  spireGrad.addColorStop(1, `hsla(${encoding.baseHue + 90}, 95%, 90%, 1.0)`);

  ctx.fillStyle = spireGrad;
  ctx.fill();

  // Spire facet highlight
  ctx.beginPath();
  ctx.moveTo(0, spireApexY);
  ctx.lineTo(0, spireBaseY);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Emergent Plume Particles ascending from R&D Spire
  const pCount = encoding.plumeParticleCount;
  for (let p = 0; p < pCount; p++) {
    const pSeed = (p * 137.5) % 1000 / 1000;
    const pProgress = ((time * encoding.emergenceVelocity * 0.4 + pSeed) % 1.0);
    const pAltitude = pProgress * (spireH * 0.9 + 30);
    const py = spireApexY - pAltitude + 20;
    const pxSpread = Math.sin(time * 1.5 + p) * (8 + pProgress * 22) * (p % 2 === 0 ? 1 : -1);
    const pAlpha = Math.sin(pProgress * Math.PI) * (0.4 + normalized.rdExpenditureNorm * 0.5);
    const pSize = 1.0 + (1 - pProgress) * 2.2;

    ctx.fillStyle = `hsla(${encoding.baseHue + 60 + pProgress * 60}, 95%, 80%, ${pAlpha})`;
    ctx.beginPath();
    ctx.arc(pxSpread, py, pSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // ----------------------------------------------------
  // E. Understated Country Label & Selection Marker
  // ----------------------------------------------------
  const labelY = r * 0.55 + 18;

  // Selected Country Accent Ring & Glyphs
  if (isSelected) {
    // Focus beacon ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.25, r * 0.6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Delicate reticle indicators
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, spireApexY - 10, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Subtle inspection ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(0, spireApexY - 10, 8 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Country ISO & Name Typography
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // ISO Code Badge
  ctx.font = '500 10px var(--font-mono, monospace)';
  ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(215, 222, 240, 0.7)';
  ctx.fillText(country.isoCode, 0, labelY - 4);

  // Full Country Name (Understated)
  ctx.font = '400 11px var(--font-sans, "Plus Jakarta Sans", sans-serif)';
  ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(165, 175, 200, 0.55)';
  ctx.fillText(country.name, 0, labelY + 11);

  ctx.restore();
}

/**
 * Helper to test if a point (canvas coordinates) clicks on a country landscape
 */
export function hitTestCountry(
  canvasX: number,
  canvasY: number,
  profile: CountryEconomicProfile,
  state: FieldRenderState
): boolean {
  const { width, height, camera } = state;
  const worldX = (canvasX - width / 2 - camera.x) / camera.zoom;
  const worldY = (canvasY - height / 2 - camera.y) / camera.zoom;

  const dx = worldX - profile.country.fieldPosition.x;
  const dy = worldY - profile.country.fieldPosition.y;

  // Hit area approximates the landscape's base radius + elevation
  const hitRadius = Math.max(35, profile.encoding.baseRadius * 0.9);
  return Math.hypot(dx, dy + profile.encoding.elevationHeight * 0.3) <= hitRadius;
}
