import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Publish website artwork already uploaded to the repository's images/ folder.
function publishWebsiteImages() {
  return {
    name: 'publish-website-images',
    apply: 'build',
    generateBundle() {
      const folder = join(process.cwd(), 'images')
      for (const name of readdirSync(folder)) {
        if (!/\.webp$/i.test(name)) continue
        this.emitFile({
          type: 'asset',
          fileName: 'images/' + name,
          source: readFileSync(join(folder, name)),
        })
      }
    },
  }
}

export default defineConfig({
  logLevel: 'error',
  base: './',
  plugins: [react(), publishWebsiteImages()],
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
})
