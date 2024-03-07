import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        strictPort: true,
        watch: {
            usePolling: true, // Enable polling mode
            interval: 1000, // Poll every 1 second
            ignored: '**/node_modules' // Ignore node_modules
        }
    },
})
