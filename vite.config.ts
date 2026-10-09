import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { blogPosts } from './src/data/blogPosts'

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: '/src/prerender.tsx',
      renderTarget: '#root',
      additionalPrerenderRoutes: ['/blog', ...blogPosts.map((p) => `/blog/${p.slug}`)],
    }),
  ],
})
