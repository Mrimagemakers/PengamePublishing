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

// gate-config.json tells the sign-in gate in each game (public/pengame-gate.js) whether
// sign-in is switched on and where the access server lives. Off unless VITE_GATE_ENABLED=true.
function gateConfig() {
  return {
    name: 'gate-config',
    apply: 'build',
    generateBundle() {
      const apiUrl = (process.env.VITE_GAMEPASS_API_URL || '').replace(/\/$/, '')
      const enabled = process.env.VITE_GATE_ENABLED === 'true' && Boolean(apiUrl && process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY)
      this.emitFile({ type: 'asset', fileName: 'gate-config.json', source: JSON.stringify({ enabled, apiUrl: enabled ? apiUrl : '' }) })
    },
  }
}

export default defineConfig({
  logLevel: 'error',
  base: './',
  plugins: [react(), publishWebsiteImages(), gateConfig()],
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
})
