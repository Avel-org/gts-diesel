import { defineConfig, type Plugin, type Connect } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('./dist', import.meta.url));

/**
 * Resolves extensionless paths the way a static host does: `/cowboys-radiator`
 * serves `cowboys-radiator/index.html`, and anything unmatched serves 404.html.
 * Vite's own MPA mode only answers the trailing-slash form, which left the
 * browser tests hitting a 404 on a page that deploys fine.
 */
function staticHostPaths(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const url = req.url ?? '/';
    const [path = '/'] = url.split('?');
    if (path !== '/' && !path.includes('.') && !path.endsWith('/')) {
      if (existsSync(join(distDir, path, 'index.html'))) {
        req.url = `${path}/index.html${url.slice(path.length)}`;
      } else if (existsSync(join(distDir, '404.html'))) {
        req.url = '/404.html';
        res.statusCode = 404;
      }
    }
    next();
  };
  /**
   * In dev there is no dist to resolve against, so extensionless app routes
   * fall back to index.html the way SPA mode used to. Without this, MPA mode
   * makes /cowboys-radiator a 404 on the dev server.
   */
  const devFallback: Connect.NextHandleFunction = (req, _res, next) => {
    const url = req.url ?? '/';
    const [path = '/'] = url.split('?');
    const internal = path.startsWith('/@') || path.startsWith('/api') || path.startsWith('/node_modules');
    if (!internal && !path.includes('.')) req.url = '/index.html';
    next();
  };

  return {
    name: 'gts:static-host-paths',
    configureServer(server) {
      server.middlewares.use(devFallback);
    },
    configurePreviewServer(server) {
      // Registered directly, not in a returned post hook, so it rewrites the
      // URL before Vite's static-file middleware tries to resolve it.
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  // Every route is pre-rendered to its own HTML file, so serve those files
  // rather than falling back to / for every unknown path the way SPA mode does.
  appType: 'mpa',
  plugins: [react(), tailwindcss(), staticHostPaths()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    // MPA mode would otherwise glob every .html in the repo as an entry,
    // including the 1.1 MB design handoff under docs/.
    rollupOptions: { input: fileURLToPath(new URL('./index.html', import.meta.url)) },
  },
});
