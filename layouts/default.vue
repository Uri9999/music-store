<template>
  <div class="app layout">
    <!-- Sidebar Menu -->
    <MenuMega class="container" />
    <!-- Main content -->
    <div class="container">
      <NuxtPage />
    </div>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script setup>
import MenuMega from "~/components/Utils/MenuMega.vue";
import Footer from "~/components/Utils/Footer.vue";
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
