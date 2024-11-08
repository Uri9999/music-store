<template>
  <div class="app">
    <Menu/>
    <Carousel/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "~/components/Utils/Menu.vue";
import Carousel from "~/components/General/Carousel.vue";

</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
