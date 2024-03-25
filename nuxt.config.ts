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
  },
  ssr: true,
  routeRules: {
    '/admin/**' : {ssr: false},
    // '/test9/test1': {prerender: true},
    // '/test9/test2': {prerender: false},
    // Homepage pre-rendered at build time
    // '/': { prerender: true },
    // // Products page generated on demand, revalidates in background, cached until API response changes
    // '/products': { swr: true },
    // // Product page generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
    // '/products/**': { swr: 3600 },
    // // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    // '/blog': { isr: 3600 },
    // // Blog post page generated on demand once until next deployment, cached on CDN
    // '/blog/**': { isr: true },
    // // Admin dashboard renders only on client-side
    // '/admin/**': { ssr: false },
    // // Add cors headers on API routes
    // '/api/**': { cors: true },
    // // Redirects legacy urls
    // '/old-page': { redirect: '/new-page' }
  }
})
