<template>
    <div
        class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
        :class="{
            'border-top-1 surface-border': true,
        }"
    >
        <div class="md:w-10rem relative">
            <!-- <img
                class="block xl:block mx-auto border-round w-full"
                :src="item.image"
                :alt="item.name"
            /> -->
            <img
                class="block xl:block mx-auto border-round w-full"
                src="https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg"
            />
        </div>
        <div
            class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
        >
            <div
                class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
            >
                <div>
                    <div class="text-lg font-medium text-900 mt-2">
                        {{ item.name }}
                    </div>
                    <div>Người soạn: {{ item?.user?.name }}</div>
                </div>
                <!-- <DisplayRateStars :stars="item?.rating"></DisplayRateStars> -->
            </div>
            <div class="flex flex-column md:align-items-end gap-3">
                <span class="text-xl font-semibold text-900"
                    >Giá: {{ item.price }} Vnd</span
                >
                <div class="flex flex-row-reverse md:flex-row gap-2">
                    <!-- <Button icon="pi pi-heart" outlined></Button> -->
                    <!-- <DisplayRateStars :stars="item?.rating"></DisplayRateStars> -->
                    <Button
                        icon="pi pi-info-circle"
                        label="Chi tiết"
                        class="custom flex-auto md:flex-initial white-space-nowrap"
                    ></Button>
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

<style scoped></style>
