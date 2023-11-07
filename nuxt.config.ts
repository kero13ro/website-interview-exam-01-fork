// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  nitro: {
    routeRules: {
      "/api/images": {
        // cache: {
        //   maxAge: 60 * 60,
        // },
      },
    },
  },
  modules: [
    '@nuxtjs/device',
  ]
})
