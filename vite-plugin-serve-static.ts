import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

export function serveStaticPlugin(): Plugin {
  return {
    name: 'serve-static-from-root',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        
        // Handle requests for images, css, js, fonts from root
        const staticPaths = ['/images/', '/css/', '/js/', '/fonts/'];
        const matchedPath = staticPaths.find(p => url.startsWith(p));
        
        if (matchedPath) {
          const filePath = path.join(process.cwd(), url.split('?')[0]);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            // Set appropriate content type
            const ext = path.extname(filePath).toLowerCase();
            const contentTypes: Record<string, string> = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif',
              '.svg': 'image/svg+xml',
              '.css': 'text/css',
              '.js': 'application/javascript',
              '.woff': 'font/woff',
              '.woff2': 'font/woff2',
              '.ttf': 'font/ttf',
              '.eot': 'application/vnd.ms-fontobject',
            };
            
            res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        
        next();
      });
    },
    async closeBundle() {
      // Copy static assets to dist folder during build
      const fsPromises = fs.promises;
      const distPath = path.join(process.cwd(), 'dist');
      
      const copyDir = async (src: string, dest: string) => {
        await fsPromises.mkdir(dest, { recursive: true });
        const entries = await fsPromises.readdir(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
          } else {
            await fsPromises.copyFile(srcPath, destPath);
          }
        }
      };
      
      const dirs = ['images', 'css', 'js', 'fonts'];
      for (const dir of dirs) {
        const srcDir = path.join(process.cwd(), dir);
        if (fs.existsSync(srcDir)) {
          await copyDir(srcDir, path.join(distPath, dir));
        }
      }
    },
  };
}
