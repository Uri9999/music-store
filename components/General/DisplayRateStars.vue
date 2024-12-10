<template>
    <div class="rate">
        <div class="flex align-items-center gap-1">
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
    // border: 1px solid rgb(187, 112, 15);
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
