import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000,
    host: true,
    historyApiFallback: true
  },
  preview: {
    port: 3333,
    host: true,
    allowedHosts: ['localhost', '127.0.0.1', 'first-skynet-redesign-impde4-e7b78d-212-115-124-106.traefik.me', "skynet.simeonsamari.xyz"],
  },
})
