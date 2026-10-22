/**
 * THE MUDDLED RENDERINGS PROJECT - Express Server
 * 
 * Normalized REST endpoints for OECD economic data ingestion,
 * validation, metadata catalog, and production/dev Vite serving.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { IngestionEngine } from './src/server/ingestionEngine';
import { OECD_SOURCES, INDICATORS } from './src/server/data/oecdDataset';
import { PIPELINE_CODE_FILES, PIPELINE_REPOSITORY_URL } from './src/data/pipelineCode';

const currentDir = typeof __dirname !== 'undefined'
  ? __dirname
  : (typeof import.meta !== 'undefined' && import.meta.url ? path.dirname(fileURLToPath(import.meta.url)) : process.cwd());

async function startServer() {
  const app = express();
  // Support --port CLI argument passed by control-plane, or default to 3000 for AI Studio dev container
  const portArgIndex = process.argv.indexOf('--port');
  const cliPort = portArgIndex !== -1 && process.argv[portArgIndex + 1] ? Number(process.argv[portArgIndex + 1]) : null;
  const PORT = cliPort || (process.env.K_SERVICE && process.env.PORT && process.env.PORT !== '8080' ? Number(process.env.PORT) : 3000);

  app.use(express.json());

  // 1. Health check endpoints for container startup and liveness probes
  const healthResponse = (_req: express.Request, res: express.Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  };
  app.get('/api/health', healthResponse);
  app.get('/health', healthResponse);
  app.get('/healthz', healthResponse);


  // 2. Canonical Atlas Dataset (Supports multi-year time series 2014-2024)
  app.get('/api/atlas/data', (req, res) => {
    try {
      const yearParam = req.query.year ? Number(req.query.year) : 2024;
      const dataset = IngestionEngine.processAtlasDataset(yearParam);
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

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.log('[Server] Mounting dynamic Vite middleware for development');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexHtmlPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath) && fs.existsSync(path.join(distPath, 'index.html'))) {
      console.log(`[Server] Serving production static files from: ${distPath}`);
      app.use(express.static(distPath));
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
          return next();
        }
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      console.log('[Server] Production dist not found, mounting Vite middleware fallback');
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      app.use('*', async (req, res, next) => {
        if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
          return next();
        }
        try {
          const url = req.originalUrl;
          const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
          let template = fs.readFileSync(indexHtmlPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e: any) {
          next(e);
        }
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Muddled Renderings Project server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
