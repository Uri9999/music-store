<template>
    <a
        class="tag border-1 surface-border surface-card border-round flex flex-column"
    >
        <div class="surface-50 flex justify-content-center border-round">
            <!-- <img
                class="border-round w-full"
                :src="item.image"
                :alt="item.name"
            /> -->
             <img
                class="border-round w-full"
                src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
            />
        </div>
        <div class="pt-2 gap-1 flex flex-column">
            <div>
                <div class="text-lg font-medium text-900 mt-1">
                    {{ item.name }}
                </div>
            </div>
            <div>
                Người soạn: {{ item?.user?.name }}
            </div>
            <div class="flex flex-column gap-2">
                <span class="font-semibold text-700"
                    >Giá: {{ item.price }} Vnd</span
                >
                <div class="flex justify-content-end gap-2">
                    <Button
                        icon="pi pi-info-circle"
                        label="Chi tiết"
                        class="custom"
                    ></Button>
                    <!-- <DisplayRateStars :stars="item?.rating"></DisplayRateStars> -->
                </div>
            </div>
        </div>
    </a>
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
.tag {
    padding: 10px;
}
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
