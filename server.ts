/**
 * THE MUDDLED RENDERINGS PROJECT - Express Server
 * 
 * Normalized REST endpoints for OECD economic data ingestion,
 * validation, metadata catalog, and production/dev Vite serving.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { IngestionEngine } from './src/server/ingestionEngine';
import { OECD_SOURCES, INDICATORS } from './src/server/data/oecdDataset';
import { PIPELINE_CODE_FILES, PIPELINE_REPOSITORY_URL } from './src/data/pipelineCode';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check endpoints for container startup and liveness probes
  const healthResponse = (_req: express.Request, res: express.Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  };
  app.get('/api/health', healthResponse);
  app.get('/health', healthResponse);
  app.get('/healthz', healthResponse);


  // 2. Canonical Atlas Dataset
  app.get('/api/atlas/data', (req, res) => {
    try {
      const dataset = IngestionEngine.processAtlasDataset();
      res.json(dataset);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to process dataset', message: err?.message });
    }
  });

  // 3. Metadata, Sources & Indicators Catalog
  app.get('/api/atlas/metadata', (req, res) => {
    res.json({
      sources: OECD_SOURCES,
      indicators: INDICATORS,
      updateCadence: 'Monthly',
      lastIngestion: new Date().toISOString(),
    });
  });

  // 4. Monthly Ingestion Trigger Simulation
  app.post('/api/atlas/ingest', (req, res) => {
    try {
      const refreshed = IngestionEngine.processAtlasDataset();
      res.json({
        ...refreshed,
        dataOrigin: 'SIMULATED_INGESTION_RUN',
        generatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Ingestion pipeline error', message: err?.message });
    }
  });

  // 5. Complete Pipeline Code Catalog Endpoint (OECD Database -> Analytics -> Canvas Visuals)
  app.get('/api/pipeline/code', (req, res) => {
    try {
      res.json({
        repositoryUrl: PIPELINE_REPOSITORY_URL,
        files: PIPELINE_CODE_FILES,
        generatedAt: new Date().toISOString(),
        pipelineStages: [
          {
            stage: 1,
            name: 'OECD SDMX Database Extraction',
            technology: 'Python / Requests / Pandas',
            sourceFile: 'pipeline/oecd_database_etl.py',
            description: 'Queries public OECD SDMX REST API series, validates distributions, and imputes regional medians.',
          },
          {
            stage: 2,
            name: 'Statistical Analytics & Harmonic Modeling',
            technology: 'TypeScript / Statistical Math',
            sourceFile: 'analytics/analytics_engine.ts',
            description: 'Computes robust z-scores, percentile clipping, covariance matrix, and harmonic resonance scores.',
          },
          {
            stage: 3,
            name: 'Website Canvas Procedural Visualizer',
            technology: 'HTML5 2D Canvas Engine',
            sourceFile: 'visualization/landscape_canvas_renderer.ts',
            description: 'Translates economic data into geological bedrock, crystalline spires, circuit traces, and particle wind.',
          },
          {
            stage: 4,
            name: 'Automated CI/CD GitHub Action',
            technology: 'GitHub Actions YAML',
            sourceFile: '.github/workflows/oecd_atlas_pipeline.yml',
            description: 'Autonomous monthly runner executing OECD ingestion, quality assertions, and automated deployment.',
          },
        ],
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve pipeline code', message: err?.message });
    }
  });

  // 6. Pipeline Metadata Endpoint
  app.get('/api/atlas/pipeline', (req, res) => {
    res.json({
      status: 'active',
      cadence: 'Monthly (1st of month at 00:00 UTC)',
      repositoryUrl: PIPELINE_REPOSITORY_URL,
      memberStatesCount: 38,
      dimensions: 4,
      architecture: 'OECD SDMX REST API -> Statistical Analytics -> Living Canvas Viewport',
      lastRun: new Date().toISOString(),
      validationPassed: true,
    });
  });

  // Robust production detection (Cloud Run sets K_SERVICE, but not always NODE_ENV)
  const distPath = path.join(process.cwd(), 'dist');
  const hasDistIndex = fs.existsSync(path.join(distPath, 'index.html'));
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.K_SERVICE || hasDistIndex;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Muddled Renderings Project server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
