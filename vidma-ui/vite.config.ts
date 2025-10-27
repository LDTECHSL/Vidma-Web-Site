import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 5174
    port: 5174
  }
})
