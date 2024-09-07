import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  // Other configurations...
  target: 'static',
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    baseURL: '/renka/', // Make sure this ends with a trailing slash
    head: {
      title: 'RenKa - Song Practice App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Practice your favorite songs with RenKa' }
      ],
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  router: {
    base: '/renka/' // This ensures all router links are prefixed with /renka/
  },
  runtimeConfig: {
    public: {
      githubRepo: 'https://github.com/vongola12324/renka'
    }
  },
  compatibilityDate: '2024-09-06',
  nitro: {
    preset: 'github-pages',
  },
  generate: {
    fallback: '404.html'
  },
  vite: {
    build: {
      assetsDir: '_nuxt', // This will put the assets in a _nuxt folder
      rollupOptions: {
        output: {
          entryFileNames: '_nuxt/[name].[hash].js',
          chunkFileNames: '_nuxt/[name].[hash].js',
          assetFileNames: '_nuxt/[name].[hash][extname]',
        },
      },
    },
  }
})