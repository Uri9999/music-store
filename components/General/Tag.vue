<template>
    <div class="tab border-1 surface-border surface-card flex flex-column">
        <div
            class="surface-50 flex justify-content-center tab-image"
            @click="gotoDetail(item.id)"
        >
            <BackgroundImageCommon
                :src="
                    item?.images_url?.[0]?.url ||
                    'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'
                "
            ></BackgroundImageCommon>
        </div>
        <div class="pt-2 gap-1 flex flex-column tab-content">
            <div>
                <div class="text-lg">
                    {{ item.name }}
                </div>
            </div>
            <div class="flex flex-column gap-2">
                <div class="flex align-items-center justify-content-between">
                    <div>
                        <DisplayRateStars
                            :stars="item?.rating"
                        ></DisplayRateStars>
                        <span class="sold"
                            >(Đã bán {{ item?.total_order_items }})</span
                        >
                    </div>
                    <span class="font-semibold text-700 price"
                        >{{ formatNumberWithCommas(item.price) }} Vnd</span
                    >
                </div>
                <InfoCommon
                    :name="item.user.name"
                    :src="item.user?.avatar?.url"
                ></InfoCommon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumberWithCommas } from '#build/imports';
import { useRouter } from 'vue-router';
import DisplayRateStars from './DisplayRateStars.vue';
import BackgroundImageCommon from './BackgroundImageCommon.vue';
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
const gotoDetail = async (id: number) => {
    router.push('/tab/' + id);
};
</script>

<style lang="scss" scoped>
.tab-content {
    padding: 5px;
}
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tab {
    border-radius: 3px;
}
.tab-image {
    cursor: pointer;
    max-height: 250px;
    overflow: hidden;
    border-radius: 3px 3px 0px 0px;
}

.avatar-info {
    width: 30px;
    height: 30px;
}

.price {
    color: var(--color-2) !important;
}
.sold {
    font-size: 0.8rem;
}
</style>
