// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    parallel: false,
  },
  app: {
    head: {
      title: "Zumi Shop",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/images/favicon.png" },
        { rel: "manifest", href: "/firebase-messaging-sw.js" },
      ],
    },
  },
  ssr: false,
  css: [
    "~/assets/css/reset.css",
    "~/assets/css/base.css",
    "~/assets/styles/main.scss",
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.min.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.min.css",
    "~/assets/css/custom-theme.css",
  ],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@pinia/nuxt"],
  primevue: {
    components: {
      include: "*",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
          // additionalData: '@use "~/assets/_colors.scss" as *;'
        },
      },
    },
  },
  plugins: [
    // Đăng ký plugin Chart.js
    { src: '~/plugins/chartjs.js', mode: 'client' }
  ],
});
