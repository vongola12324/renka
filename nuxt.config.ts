import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  // Other configurations...
  target: 'static',
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    baseURL: '/renka/', // Update this to match your repository name
    head: {
      title: 'RenKa - Song Practice App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Practice your favorite songs with RenKa' }
      ],
    },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  compatibilityDate: '2024-09-06',
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com; img-src 'self' https://i.ytimg.com https://img.youtube.com; style-src 'self' 'unsafe-inline';"
        }
      }
    }
  }
})