<template>
  <div class="layout">
    <!-- Sidebar Menu -->
    <MenuMega class="container"/>

    <!-- Main content -->
    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import MenuMega from "~/components/Utils/MenuMega.vue";
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
