import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Conditionally load local dev plugins (gitignored)
const loadLocalPlugins = async () => {
  const plugins = []
  const localPluginPath = path.resolve(__dirname, '.local/vite-plugins/registry-api.js')

  if (fs.existsSync(localPluginPath)) {
    try {
      const { registryApiPlugin } = await import(localPluginPath)
      plugins.push(registryApiPlugin())
      console.log('✓ Loaded local registry-api plugin')
    } catch (e) {
      console.warn('Failed to load local plugin:', e.message)
    }
  }

  return plugins
}

export default defineConfig(async () => {
  const localPlugins = await loadLocalPlugins()

  return {
    plugins: [react(), ...localPlugins],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
  }
})
