<template>
    <div class="app layout">
        <div class="container">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
import MenuMega from '~/components/Utils/MenuMega.vue';
import Footer from '~/components/Utils/Footer.vue';
</script>

<style scoped lang="scss">
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
