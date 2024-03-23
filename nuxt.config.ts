// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
  ],
  css: ['@unocss/reset/tailwind.css'],
  features: {
    devLogs: true
    // or 'silent' to allow you to handle yourself with `dev:ssr-logs` hook
  },
  experimental: {
    sharedPrerenderData: true,
    defaults: {
      nuxtLink: {
        activeClass: 'text-green',
        trailingSlash: 'append'
      }
    }
  }
})
