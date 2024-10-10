// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_URL_BACK, // URL do seu servidor backend
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo '/api'
//       },
//     },
//   },
// })
