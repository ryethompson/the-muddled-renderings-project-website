/**
 * THE MUDDLED RENDERINGS PROJECT
 * Rendering: Techno Archipelago
 * Module: Website Canvas Procedural Landscape Visualizer
 * 
 * High-performance 60 FPS HTML5 Canvas engine rendering the living economic
 * archipelago. Features autonomous wave equation synthesis, particle flow
 * fields, camera matrix transformations, and coordinate raycasting.
 */

export interface ViewportCamera {
  x: number;
  y: number;
  zoom: number;
}

export interface CanvasCountryNode {
  id: string;
  name: string;
  iso: string;
  fieldX: number;
  fieldY: number;
  bedrockMass: number;
  spireHeight: number;
  circuitDensity: number;
  particleVelocity: number;
  paletteAccent: string;
}

export class LandscapeCanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = [];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.initAtmosphericParticles();
  }

  private initAtmosphericParticles() {
    this.particles = [];
    for (let i = 0; i < 180; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 1600,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.4,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 200,
      });
    }
  }

  /**
   * Master frame renderer executing 60 FPS visual loop.
   */
  public renderFrame(
    nodes: CanvasCountryNode[],
    camera: ViewportCamera,
    selectedNodeId: string | null,
    time: number
  ) {
    const ctx = this.ctx;
    ctx.save();
    
    // 1. Clear background and draw deep ocean canvas
    ctx.fillStyle = '#07080b';
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Camera matrix transformation (Centered pan & zoom)
    ctx.translate(this.width / 2 + camera.x, this.height / 2 + camera.y);
    ctx.scale(camera.zoom, camera.zoom);

    // 3. Render organic ocean flow lines
    this.drawOceanHarmonics(time);

    // 4. Render atmospheric particle currents
    this.drawParticleWind(time);

    // 5. Render archipelago islands with geological bedrock & spires
    for (const node of nodes) {
      const isSelected = node.id === selectedNodeId;
      this.drawIslandLandform(node, isSelected, time);
    }

    ctx.restore();
  }

  private drawOceanHarmonics(time: number) {
    const ctx = this.ctx;
    ctx.lineWidth = 1;
    for (let i = -800; i < 800; i += 70) {
      ctx.beginPath();
      for (let x = -1200; x < 1200; x += 40) {
        const wave = Math.sin(x * 0.004 + time * 0.001) * Math.cos(i * 0.005 + time * 0.0012) * 18;
        const y = i + wave;
        if (x === -1200) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.stroke();
    }
  }

  private drawParticleWind(time: number) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      if (p.life > p.maxLife) {
        p.x = (Math.random() - 0.5) * 2400;
        p.y = (Math.random() - 0.5) * 1600;
        p.life = 0;
      }
      const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;
      ctx.fillStyle = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
      ctx.fillRect(p.x, p.y, 2, 2);
    }
  }

  private drawIslandLandform(node: CanvasCountryNode, isSelected: boolean, time: number) {
    const ctx = this.ctx;
    const { fieldX, fieldY, bedrockMass, spireHeight, circuitDensity, paletteAccent } = node;
    const baseRadius = 28 + bedrockMass * 45;

    ctx.save();
    ctx.translate(fieldX, fieldY);

    // Bedrock base gradient
    const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, baseRadius);
    grad.addColorStop(0, '#1c1e28');
    grad.addColorStop(0.7, '#0f1118');
    grad.addColorStop(1, 'rgba(10, 11, 16, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
    ctx.fill();

    // Circuit traces
    ctx.strokeStyle = paletteAccent;
    ctx.lineWidth = 1;
    for (let c = 1; c <= circuitDensity; c++) {
      const ringRadius = (baseRadius / circuitDensity) * c;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 0.85);
      ctx.globalAlpha = 0.15 + (c / circuitDensity) * 0.2;
      ctx.stroke();
    }

    // Central Innovation Spire
    const spireTipY = -spireHeight;
    ctx.globalAlpha = isSelected ? 1.0 : 0.75;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(0, spireTipY);
    ctx.lineTo(6, 0);
    ctx.closePath();

    const spireGrad = ctx.createLinearGradient(0, 0, 0, spireTipY);
    spireGrad.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
    spireGrad.addColorStop(1, paletteAccent);
    ctx.fillStyle = spireGrad;
    ctx.fill();

    // Spire Glow Beacon
    ctx.beginPath();
    ctx.arc(0, spireTipY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();
  }
}
