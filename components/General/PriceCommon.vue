<template>
    <p class="price" :style="{ 'font-size': fontSize, 'text-decoration': textDecoration, 'color': color }">
        <span class="unit">đ</span>{{ formatNumberWithCommas(value) }}
    </p>
</template>

<script lang="ts" setup>
import { formatNumberWithCommas } from '#build/imports';
const props = defineProps({
    value: {
        type: Number,
        default: 0,
    },
    fontSize: {
        type: String,
        default: '1.5rem',
    },
    textDecoration: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '#d0011b',
    },
});
</script>
<style lang="scss" scoped>
.price {
    display: inline-block;
    // color: var(--color-2);
}

.unit {
    text-decoration: underline;
    font-size: 0.6em;
    vertical-align: super;
}

.gach-giua {
    text-decoration: line-through;
}
</style>
