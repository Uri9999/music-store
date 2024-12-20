<template>
    <p
        :class="{
            price: type == 'price',
            default: type == 'default',
        }"
    >
        {{ formatNumberWithCommas(value) }} đ
    </p>
</template>

<script lang="ts" setup>
import { formatNumberWithCommas } from '#build/imports';
const props = defineProps({
    value: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        default: 'price',
    },
});
</script>
<style lang="scss" scoped>
.price {
    display: inline-block;
    font-size: 1.5rem;
    color: var(--color-2);
}
</style>
