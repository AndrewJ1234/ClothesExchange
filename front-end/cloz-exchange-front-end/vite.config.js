import { defineConfig} from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  
  return {
    server: {
      port: 20942,
    },
    plugins: [react()],
  };
});
