<template>
    <div class="tags">
        <div
            class="item"
            v-for="(item, index) in tabs"
            @click="gotoDetail(item.slug)"
        >
            <div class="image">
                <div class="tab-img">
                    <BackgroundImageCommon
                        :src="
                            item?.images_url?.[0]?.url ||
                            'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'
                        "
                    ></BackgroundImageCommon>
                </div>
                <div class="pl-3 info">
                    <div>
                        {{ item.name }}
                        <span class="sold"
                            >(Đã bán {{ item?.total_order_items }})</span
                        >
                    </div>

                    <div
                        class="flex justify-content-between gap-2 align-items-center"
                    >
                        <div class="flex gap-2 align-items-center">
                            <div class="avatar-info">
                                <AvatarCommon
                                    :name="item.user.name"
                                    :src="item.user?.avatar?.url"
                                />
                            </div>
                            <div class="name">{{ item.user.name }}</div>
                        </div>
                        <div class="price">
                            <PriceCommon
                                v-if="item.discount_money"
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Api from '~/network/Api';
import type { Tab } from '~/types/tab';
import { useRouter } from 'vue-router';
import AvatarCommon from '../General/AvatarCommon.vue';
import BackgroundImageCommon from '../General/BackgroundImageCommon.vue';
import PriceCommon from '~/components/General/PriceCommon.vue';

const router = useRouter();
const gotoDetail = async (slug: string) => {
    router.push('/tab/' + slug);
};
const tabs = ref([] as Tab[]);
onMounted(async () => {
    Api.tab
        .randomTab()
        .then((res: any) => {
            tabs.value = res.data;
        })
        .catch((err) => console.log(err));
});
</script>

<style lang="scss" scoped>
.tags {
    border-radius: 3px;
    border: 1px solid rgb(236, 236, 236);
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}
.item:hover {
    background-color: rgb(245, 245, 245);
}
.image {
    width: 100%;
    display: flex;
    align-items: center;
    .tab-img {
        width: 80px;
        border-radius: 3px;
    }
}
.image img {
    width: 56px;
    height: 40px;
    border-radius: 5px;
}

.avatar-info {
    width: 26px;
    height: 26px;
}
.name {
    font-size: 0.9rem;
    color: var(--color-2);
}
.info {
    width: 100%;
}
.sold {
    font-size: 0.8rem;
}
</style>
