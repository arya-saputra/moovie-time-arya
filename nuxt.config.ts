// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'MoovieTime - M. Arya Yudha S',
      link: [
        {
          rel: 'stylesheet',
          href: "https://cdn.jsdelivr.net/npm/instantsearch.css@8.1.0/themes/reset-min.css"
        },
        {
          rel: 'stylesheet',
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        },
        {
          rel: 'stylesheet',
          href: '/css/style.css'
        },
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@pinia/nuxt'
  ],
})
