/**
 * Root server.js entrypoint for Cloud Run container runtimes.
 */
import fs from 'fs';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const bundlePath = path.resolve('./dist/server.cjs');
if (fs.existsSync(bundlePath)) {
  await import('./dist/server.cjs');
} else {
  console.log('dist/server.cjs not found, running tsx server.ts');
  const { execSync } = await import('child_process');
  execSync('npx tsx server.ts', { stdio: 'inherit' });
}


