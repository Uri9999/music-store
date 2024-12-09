<template>
    <a
        class="tag border-1 surface-border surface-card border-round flex flex-column"
    >
        <div
            class="surface-50 flex justify-content-center border-round tab-image"
        >
            <ImageCommon
                :src="
                    item?.images_url?.[0]?.url ||
                    'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'
                "
            ></ImageCommon>
        </div>
        <div class="pt-2 gap-1 flex flex-column tab-content">
            <div>
                <div class="text-lg font-medium text-900 mt-1">
                    {{ item.name }}
                </div>
            </div>
            <div>({{ item?.user?.name }})</div>
            <div class="flex flex-column gap-2">
                <span class="font-semibold text-700"
                    >Giá: {{ item.price }} Vnd</span
                >
                <div class="flex justify-content-end gap-2">
                    <Button
                        icon="pi pi-info-circle"
                        label="Chi tiết"
                        class="custom"
                        @click="gotoDetail(item.id)"
                    ></Button>
                    <!-- <DisplayRateStars :stars="item?.rating"></DisplayRateStars> -->
                </div>
            </div>
        </div>
    </a>
</template>

<script setup lang="ts">
import DisplayRateStars from './DisplayRateStars.vue';
import { useRouter } from 'vue-router';
import ImageCommon from './ImageCommon.vue';

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

const router = useRouter();
const gotoDetail = async (id: number) => {
    router.push('/tab/' + id);
};
</script>

<style scoped>
.tab-content {
    padding: 10px;
}
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tab-image {
    max-height: 250px;
    overflow: hidden;
}
</style>
