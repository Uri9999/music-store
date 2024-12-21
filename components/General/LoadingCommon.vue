<template>
    <div
        class="loading w-full h-full flex align-items-center justify-content-center"
        :class="classes"
    >
        <img class="w-[40px] h-[40px]" src="/images/loading.svg" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    classes: {
        type: [String, Array, Object],
        default: '',
    },
});
</script>

<style lang="scss" scoped></style>
