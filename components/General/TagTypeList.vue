<template>
    <div
        class="flex align-items-center p-4 gap-3"
        :class="{
            'border-top-1 surface-border': true,
        }"
    >
        <div class="md:w-10rem relative tab-image">
            <BackgroundImageCommon
                :src="
                    item?.images_url?.[0]?.url ||
                    'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'
                "
            ></BackgroundImageCommon>
        </div>
        <div
            class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-2"
        >
            <div
                class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
            >
                <div>
                    <div class="text-lg font-medium text-900">
                        {{ item.name }}
                    </div>
                    <div class="mt-2">
                        <InfoCommon
                            :name="item.user.name"
                            :src="item.user?.avatar?.url"
                            :id="item.user.id"
                        ></InfoCommon>
                    </div>
                </div>
            </div>
            <div class="flex flex-column md:align-items-end gap-3">
                <div>
                    <PriceCommon
                        v-if="item.discount_money != 0"
                        :value="item.price"
                        :textDecoration="'line-through'"
                        class="mr-2"
                        :font-size="'.8rem'"
                        :color="'#929292'"
                    ></PriceCommon>
                    <PriceCommon
                        :value="item.discount_money != 0 ? item.discount_money : item.price"
                        :font-size="'1.3rem'"
                    ></PriceCommon>
                </div>
                <div>
                    <DisplayRateStars :stars="item?.rating"></DisplayRateStars>
                    <span class="sold"
                        >(Đã bán {{ item?.total_order_items }})</span
                    >
                </div>
                <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button
                        icon="pi pi-arrow-right"
                        label="Xem thêm"
                        class="custom flex-auto md:flex-initial white-space-nowrap"
                        @click="gotoDetail(item.slug)"
                    ></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BackgroundImageCommon from './BackgroundImageCommon.vue';
import DisplayRateStars from './DisplayRateStars.vue';
import PriceCommon from './PriceCommon.vue';
import InfoCommon from './InfoCommon.vue';

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
const gotoDetail = async (slug: string) => {
    router.push('/tab/' + slug);
};
</script>

<style scoped>
.tab-image {
    max-height: 200px;
    max-width: 150px;
    overflow: hidden;
}

.sold {
    font-size: 0.8rem;
}

@media (max-width: 300px) {
    .tab-image {
        max-width: 100%;
    }
}
</style>
