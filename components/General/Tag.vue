<template>
    <div class="tab border-1 surface-border surface-card flex flex-column">
        <div
            class="surface-50 flex justify-content-center tab-image"
            @click="gotoDetail(item.slug)"
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
                            :font-size="'1rem'"
                        ></PriceCommon>
                    </div>
                </div>
                <InfoCommon
                    :name="item.user.name"
                    :src="item.user?.avatar?.url"
                    :id="item.user.id"
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
import PriceCommon from '~/components/General/PriceCommon.vue';

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

function calcRealPrice(price: number, discountMoney: number) {
    if (discountMoney >= price) {
        return 0;
    }
    return formatNumberWithCommas(price - discountMoney);
}
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

.sold {
    font-size: 0.8rem;
}
// .price {
//     color: var(--color-2) !important;
// }
</style>
