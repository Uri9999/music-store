<template>
    <div class="tags">
        <div
            class="item"
            v-for="(item, index) in tabs"
            @click="gotoDetail(item.id)"
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
                    <div>{{ item.name }}</div>
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
                            <div>{{ item.user.name }}</div>
                        </div>
                        <div class="price">
                            {{ formatNumberWithCommas(item.price) }} Vnd
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
import { formatNumberWithCommas } from '#build/imports';
import AvatarCommon from '../General/AvatarCommon.vue';
import BackgroundImageCommon from '../General/BackgroundImageCommon.vue';

const router = useRouter();
const gotoDetail = async (id: number) => {
    router.push('/tab/' + id);
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
.info {
    width: 100%;
}
.price {
    color: var(--color-2);
    font-weight: bold;
}
</style>
