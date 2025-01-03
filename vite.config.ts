import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@helpers': path.resolve(__dirname, './src/_metronic/helpers'),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: { 
      external: [] 
    },
  },
  server: {
    port: 44343,
    https: { cert: './.cert/server.crt', key: './.cert/server.key' },
    // hmr: false,
    watch: {
      usePolling: true
    }
  },
})
