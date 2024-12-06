// import { defineConfig} from 'vite';
// import react from '@vitejs/plugin-react'

// export default defineConfig(() => {
  
//   return {
//     server: {
//       port: 20942,
//     },
//     plugins: [react()],
//   };
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:20943', // Backend server URL
        changeOrigin: true, // Ensure the host header matches the target
      },
    },
    port: 20942
  },
});
