<template>
    <div class="rate">
        <div class="flex align-items-center gap-1" v-if="stars != 0">
            <span>{{ stars }}</span>
            <span><i class="pi pi-star-fill text-yellow-500"></i></span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    stars: {
        type: Number,
        default: 0,
    },
});
</script>

<style lang="scss" scoped>
.rate {
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 3px;
}
</style>
