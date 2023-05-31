import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Chuck-Norris-Jokes/",
  plugins: [react()],

});


