// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@comark/nuxt'
  ],
  
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      defaultVariants: {
        color: 'neutral'
      }
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
