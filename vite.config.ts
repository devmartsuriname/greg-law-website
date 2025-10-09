import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(async ({ mode }) => {
  const plugins = [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'images',
          dest: ''
        },
        {
          src: 'css',
          dest: ''
        },
        {
          src: 'js',
          dest: ''
        },
        {
          src: 'fonts',
          dest: ''
        }
      ]
    })
  ];
  
  // Dynamically import lovable-tagger only in development mode
  if (mode === 'development') {
    const { componentTagger } = await import('lovable-tagger');
    plugins.push(componentTagger());
  }
  
  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '::',
      port: 8080,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
