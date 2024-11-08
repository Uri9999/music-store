// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/base.css',
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.min.css",
    // 'primevue/resources/themes/aura-light-noir/theme.css',
    "primeicons/primeicons.css",
    "primeflex/primeflex.min.css",
  ],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-primevue"],
  primevue: {
    components: {
      include: "*",
    },
  },
  plugins: ['~/plugins/primevue-plugin.ts'],
});
