<template>
    <div
        class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
        :class="{
            'border-top-1 surface-border': true,
        }"
    >
        <div class="md:w-10rem relative tab-image">
            <ImageCommon
                :src="
                    item?.images_url?.[0]?.url ||
                    'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'
                "
            ></ImageCommon>
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
                        @click="gotoDetail(item.id)"
                    ></Button>
                </div>
            </div>
        </div>
    </div>
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
.tab-image {
    max-height: 200px;
    max-width: 300px;
    overflow: hidden;
}
</style>
