<template>
    <div
        class="bg"
        :style="{
            backgroundImage: `url(${src})`,
        }"
    >
        <img :src="src" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    src: {
        type: [String],
        required: false,
    },
});
</script>

<style lang="scss" scoped>
.bg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    aspect-ratio: 2/ 1.3;
    overflow: hidden;
}
</style>
