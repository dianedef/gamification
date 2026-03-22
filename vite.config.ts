import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: parseInt(process.env.PORT) || 3000
    }
  },
  plugins: [vue(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
})
