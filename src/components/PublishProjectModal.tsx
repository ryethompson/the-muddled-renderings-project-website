import React, { useState } from 'react';
import { Project, RenderingEngineType, ProjectParameters } from '../types/projects';
import { X, Sparkles, Wand2, Check, Layers, Play } from 'lucide-react';

interface PublishProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newProject: Project) => void;
}

const TEMPLATES = [
  {
    title: 'Global Telemetry Power BI Report',
    subtitle: 'Microsoft Power BI Interactive Ingestion Dashboard & Latency Matrix',
    category: 'Business Intelligence & Cloud Telemetry',
    premise: 'Aggregates undersea fiber capacity, global data center egress throughput, and multi-region packet routing telemetry into an interactive Power BI canvas.',
    engine: 'power_bi' as RenderingEngineType,
    palette: 'obsidian_gold' as const,
    tags: ['Microsoft Power BI', 'Telecommunications', 'ETL Pipeline', 'Analytics'],
    githubPipelineUrl: 'https://github.com/the-muddled-renderings-project/pipelines/blob/main/.github/workflows/powerbi_ingestion_etl.yml',
    powerBiEmbedUrl: '',
  },
  {
    title: 'Aerosol Plume Kinetic Vector',
    subtitle: 'Microscopic Particulate Fluid Dynamics & Thermal Updrafts',
    category: 'Atmospheric Physics & Environmental Fluid Dynamics',
    premise: 'Visualizes micro-scale air quality particulate dispersal under convective turbulent boundary conditions.',
    engine: 'fluid_harmonic' as RenderingEngineType,
    palette: 'emerald_mist' as const,
    tags: ['Aerosol', 'Fluid Vectors', 'Atmospheric', 'Turbulence'],
    githubPipelineUrl: 'https://github.com/the-muddled-renderings-project/pipelines/blob/main/.github/workflows/atmospheric_vector_etl.yml',
    powerBiEmbedUrl: '',
  },
  {
    title: 'Synaptic Resonance Lattice',
    subtitle: 'Cortical Neural Oscillations & Connectome Spore Topography',
    category: 'Computational Neuroscience & Graph Topology',
    premise: 'Models phase-locked gamma rhythms across cortical columns as continuous dynamic spring attractions.',
    engine: 'quantum_lattice' as RenderingEngineType,
    palette: 'celestial_amethyst' as const,
    tags: ['Neuroscience', 'Connectome', 'Lattice', 'Gamma Rhythms'],
    githubPipelineUrl: 'https://github.com/the-muddled-renderings-project/pipelines/blob/main/.github/workflows/connectome_ingestion.yml',
    powerBiEmbedUrl: '',
  },
  {
    title: 'Solar Plasma Chrono-Field',
    subtitle: 'Coronal Mass Dynamics & Magnetohydrodynamic Wavefronts',
    category: 'Astrophysics & Solar Kinetics',
    premise: 'Translates extreme ultraviolet solar telescope data into swirling magnetic flux loops and ember sparks.',
    engine: 'cybernetic_waves' as RenderingEngineType,
    palette: 'cinnabar_ember' as const,
    tags: ['Solar', 'Plasma', 'MHD', 'Coronal Flux'],
    githubPipelineUrl: 'https://github.com/the-muddled-renderings-project/pipelines/blob/main/.github/workflows/heliophysics_pipeline.yml',
    powerBiEmbedUrl: '',
  },
];

export const PublishProjectModal: React.FC<PublishProjectModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Algorithmic Topology & Creative Systems');
  const [author, setAuthor] = useState('Studio Resident');
  const [description, setDescription] = useState('');
  const [artisticPremise, setArtisticPremise] = useState('');
  const [renderingEngine, setRenderingEngine] = useState<RenderingEngineType>('fluid_harmonic');
  const [colorPalette, setColorPalette] = useState<ProjectParameters['colorPalette']>('obsidian_gold');
  const [particleCount, setParticleCount] = useState<number>(300);
  const [speed, setSpeed] = useState<number>(1.2);
  const [turbulence, setTurbulence] = useState<number>(1.0);
  const [nodeGlow, setNodeGlow] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState('Generative, Data Art, Vector Field');
  const [githubPipelineUrl, setGithubPipelineUrl] = useState('');
  const [powerBiEmbedUrl, setPowerBiEmbedUrl] = useState('');

  if (!isOpen) return null;

  const handleApplyTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setTitle(tmpl.title);
    setSubtitle(tmpl.subtitle);
    setCategory(tmpl.category);
    setDescription(tmpl.premise);
    setArtisticPremise(tmpl.premise);
    setRenderingEngine(tmpl.engine);
    setColorPalette(tmpl.palette);
    setTagInput(tmpl.tags.join(', '));
    setGithubPipelineUrl(tmpl.githubPipelineUrl || '');
    setPowerBiEmbedUrl(tmpl.powerBiEmbedUrl || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const id = `project-${Date.now()}-${slug.slice(0, 16)}`;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject: Project = {
      id,
      slug,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Experimental Generative Rendering',
      category: category.trim() || 'Generative Art & Data Visualization',
      description: description.trim() || `An experimental autonomous rendering page exploring ${title}.`,
      artisticPremise: artisticPremise.trim() || 'Mathematical aesthetics translated into continuous kinetic reality.',
      renderingEngine,
      datePublished: new Date().toISOString().split('T')[0],
      author: author.trim() || 'Anonymous Artist',
      version: '1.0.0',
      tags: tags.length ? tags : ['Generative', 'Anthology'],
      githubPipelineUrl: githubPipelineUrl.trim() || 'https://github.com/the-muddled-renderings-project/pipelines',
      powerBiEmbedUrl: powerBiEmbedUrl.trim() || undefined,
      powerBiReportName: title.trim(),
      parameters: {
        colorPalette,
        speed,
        particleCount,
        turbulence,
        nodeGlow,
        wireframe,
        fieldZoom: 1.0,
        customSeed: Math.floor(Math.random() * 99999),
      },
      metrics: [
        { label: 'Generative Mode', value: renderingEngine, interpretation: 'Core physics & vector calculation' },
        { label: 'Active Particles', value: particleCount.toString(), interpretation: 'Nodal density' },
        { label: 'Velocity Vector', value: `${speed.toFixed(1)}x`, interpretation: 'Kinetic time rate' },
        { label: 'Fluid Turbulence', value: turbulence.toFixed(2), interpretation: 'Curl noise coefficient' },
      ],
    };

    onPublish(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e1017] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-white/[0.03] to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-xl font-bold text-white uppercase tracking-tight">
                Publish New Project Page
              </h2>
              <p className="text-xs text-white/50 font-mono">
                Deploy a new generative rendering page to The Muddled Renderings Project
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Idea Templates */}
        <div className="px-6 pt-4 pb-2 border-b border-white/5 bg-black/20">
          <div className="text-[11px] font-mono text-white/40 uppercase mb-2 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Start Idea Inspiration:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.title}
                type="button"
                onClick={() => handleApplyTemplate(tmpl)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/20 hover:text-amber-200 border border-white/10 text-white/70 transition-colors"
              >
                + {tmpl.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Row 1: Title & Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-semibold">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Solar Wind Harmonics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/80 uppercase mb-1.5">
                Subtitle / Concept Premise
              </label>
              <input
                type="text"
                placeholder="e.g. Magnetohydrodynamic Kinetic Drift"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Row 2: Category & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/80 uppercase mb-1.5">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Fluid Dynamics & Earth Systems"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/80 uppercase mb-1.5">
                Author / Studio Attribution
              </label>
              <input
                type="text"
                placeholder="e.g. Visual Mechanics Lab"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Row 3: Description & Artistic Premise */}
          <div>
            <label className="block text-xs font-mono text-white/80 uppercase mb-1.5">
              Artistic & Conceptual Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe the mathematical, empirical, or poetic premise behind this rendering..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Row 4: Engine & Palette */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-semibold">
                Rendering Engine
              </label>
              <select
                value={renderingEngine}
                onChange={(e) => setRenderingEngine(e.target.value as RenderingEngineType)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="fluid_harmonic">Fluid Harmonic (Curl Noise Vector Flow)</option>
                <option value="power_bi">Microsoft Power BI (Interactive Embedded Report)</option>
                <option value="quantum_lattice">Quantum Lattice (3D Nodal Spring Graph)</option>
                <option value="cybernetic_waves">Cybernetic Waves (Electromagnetic Brownian Drift)</option>
                <option value="neural_morphogenesis">Neural Morphogenesis (Organic Cell Patterns)</option>
                <option value="oecd_atlas">OECD Macroeconomic Atlas Field (Topological Mass)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/80 uppercase mb-1.5 font-semibold">
                Aesthetic Color Palette
              </label>
              <select
                value={colorPalette}
                onChange={(e) => setColorPalette(e.target.value as any)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="obsidian_gold">Obsidian & Imperial Gold</option>
                <option value="emerald_mist">Deep Emerald & Cyan Mist</option>
                <option value="celestial_amethyst">Celestial Amethyst & Indigo</option>
                <option value="cinnabar_ember">Cinnabar & Solar Flare</option>
                <option value="neon_amber">Neon Amber & Phosphor</option>
                <option value="monochrome_noir">Monochrome Noir & Pearl</option>
              </select>
            </div>
          </div>

          {/* Optional Power BI Embed URL Field */}
          {renderingEngine === 'power_bi' && (
            <div className="p-4 rounded-xl bg-amber-500/[0.04] border border-amber-400/20 space-y-2 animate-in fade-in">
              <label className="block text-xs font-mono text-amber-300 uppercase font-semibold">
                Microsoft Power BI Embed URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://app.powerbi.com/view?r=... (Leave blank to use integrated Power BI model)"
                value={powerBiEmbedUrl}
                onChange={(e) => setPowerBiEmbedUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
              />
              <p className="text-[11px] font-mono text-white/50">
                To embed a live Power BI report, publish it to web in Power BI Service and paste the generated iframe or view URL here.
              </p>
            </div>
          )}

          {/* GitHub Pipelines URL Field */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <label className="block text-xs font-mono text-white/80 uppercase font-semibold flex items-center gap-2">
              <span>GitHub Pipelines URL (Where Pipelines Are Defined)</span>
            </label>
            <input
              type="url"
              placeholder="https://github.com/the-muddled-renderings-project/pipelines/blob/main/workflows/..."
              value={githubPipelineUrl}
              onChange={(e) => setGithubPipelineUrl(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
            />
            <p className="text-[11px] font-mono text-white/50">
              Webpage visitors can click through to read into the ingestion pipelines, ETL scripts, and workflow definitions on GitHub.
            </p>
          </div>

          {/* Row 5: Kinetic Sliders */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
            <div className="text-xs font-mono text-amber-400 uppercase font-semibold">
              Simulation Parameters
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                  <span>Particle Count</span>
                  <span className="text-white">{particleCount}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={600}
                  step={20}
                  value={particleCount}
                  onChange={(e) => setParticleCount(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                  <span>Kinetic Speed</span>
                  <span className="text-white">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={3.0}
                  step={0.1}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-white/60 mb-1">
                  <span>Turbulence Ratio</span>
                  <span className="text-white">{turbulence.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={2.5}
                  step={0.1}
                  value={turbulence}
                  onChange={(e) => setTurbulence(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-mono text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nodeGlow}
                  onChange={(e) => setNodeGlow(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                <span>Luminescent Node Glow</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-mono text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={(e) => setWireframe(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                <span>Spring Tension Links (Wireframe)</span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono text-white/80 uppercase mb-1.5">
              Keywords & Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="Fluid, Vector, Kinetic, Topography"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-mono transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-xs font-mono tracking-wider uppercase transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Publish Rendering Page</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
