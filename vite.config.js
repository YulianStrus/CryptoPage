import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function htmlPartialsPlugin() {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      const partialsDir = path.resolve(__dirname, 'src/partials');

      return html.replace(
        /<load\s+src="\/partials\/(.*?)\.html"\s*\/>/g,
        (match, filename) => {
          const filePath = path.join(partialsDir, `${filename}.html`);
          try {
            return fs.readFileSync(filePath, 'utf-8');
          } catch (error) {
            console.error(`Error loading partial ${filename}:`, error);
            return `<!-- Error loading partial ${filename} -->`;
          }
        }
      );
    },
  };
}

export default defineConfig({
  plugins: [htmlPartialsPlugin()],
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  resolve: {
    alias: {
      '@fonts': path.resolve(__dirname, 'src/fonts'),
    },
  },
});
