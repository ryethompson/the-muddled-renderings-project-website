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
