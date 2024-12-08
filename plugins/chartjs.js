import { Chart } from 'chart.js';

export default defineNuxtPlugin((nuxtApp) => {
    // Đăng ký Chart.js vào Nuxt
    nuxtApp.provide('chart', Chart);
});
