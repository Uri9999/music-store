<template>
    <div class="p-1">
        <div class="flex align-items-center gap-2">
            <span>{{ stars }}</span>
            <span><i class="pi pi-star-fill text-yellow-500"></i></span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    stars: {
        type: Number,
        default: 0,
    },
});
</script>
