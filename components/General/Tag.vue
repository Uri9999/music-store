<template>
    <div
        class="p-4 border-1 surface-border surface-card border-round flex flex-column"
    >
        <div class="surface-50 flex justify-content-center border-round">
            <div class="relative mx-auto">
                <img
                    class="border-round w-full"
                    :src="item.image"
                    :alt="item.name"
                />
            </div>
        </div>
        <div class="pt-4">
            <div
                class="flex flex-row justify-content-between align-items-start gap-2"
            >
                <div>
                    <span class="font-medium text-secondary text-sm">{{
                        item?.category
                    }}</span>
                    <div class="text-lg font-medium text-900 mt-1">
                        {{ item.name }}
                    </div>
                </div>
                <!-- Rate starts -->
                <DisplayRateStars :stars="item?.rating"></DisplayRateStars>
            </div>
            <div class="flex flex-column gap-2">
                <span class="font-semibold text-900"
                    >Price: ${{ item.price }}</span
                >
                <div class="flex gap-2">
                    <Button
                        icon="pi pi-shopping-cart"
                        class="flex-auto white-space-nowrap custom"
                        label="Mua ngay"
                    ></Button>
                    <Button icon="pi pi-heart" outlined></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DisplayRateStars from './DisplayRateStars.vue';

const props = defineProps({
    classes: {
        type: [String, Array, Object],
        default: '',
    },
    item: {
        type: [Object],
        required: true,
    },
});
</script>

<style scoped>
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
