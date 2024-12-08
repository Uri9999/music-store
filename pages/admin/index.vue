<template>
    <HeaderPage title="Dashboard"> </HeaderPage>
    <div>
        <div class="head flex mt-3">
            <div
                class="head-item type-2 m-2"
                @click="router.push('/admin/user')"
            >
                <div class="flex justify-content-between p-3">
                    <div>
                        <p class="value">
                            {{ formatNumberWithCommas(count?.user_count) }}
                        </p>
                        <p class="detail">Người dùng</p>
                    </div>
                    <div class="icon"><Icon name="person-add"></Icon></div>
                </div>
                <div
                    class="info flex align-items-center justify-content-center py-1"
                >
                    Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                </div>
            </div>

            <div
                class="head-item type-1 m-2"
                @click="router.push('/admin/order')"
            >
                <div class="flex justify-content-between p-3">
                    <div>
                        <p class="value">
                            {{ formatNumberWithCommas(count?.order_count) }}
                        </p>
                        <p class="detail">Đơn hàng</p>
                    </div>
                    <div class="icon"><Icon name="shopping-bag"></Icon></div>
                </div>
                <div
                    class="info flex align-items-center justify-content-center py-1"
                >
                    Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                </div>
            </div>

            <div
                class="head-item type-3 m-2"
                @click="router.push('/admin/tab')"
            >
                <div class="flex justify-content-between p-3">
                    <div>
                        <p class="value">
                            {{ formatNumberWithCommas(count?.tab_count) }}
                        </p>
                        <p class="detail">Tab</p>
                    </div>
                    <div class="icon"><Icon name="music-note-add"></Icon></div>
                </div>
                <div
                    class="info flex align-items-center justify-content-center py-1"
                >
                    Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                </div>
            </div>

            <div
                class="head-item type-4 m-2"
                @click="router.push('/admin/revenue')"
            >
                <div class="flex justify-content-between p-3">
                    <div>
                        <p class="value">
                            {{ formatNumberWithCommas(count?.tab_revenue) }}
                        </p>
                        <p class="detail">Doanh thu Tab</p>
                    </div>
                    <div class="icon"><Icon name="attach-money"></Icon></div>
                </div>
                <div
                    class="info flex align-items-center justify-content-center py-1"
                >
                    Xem chi tiết <Icon name="attach-money"></Icon>
                </div>
            </div>

            <div
                class="head-item type-5 m-2"
                @click="router.push('/admin/revenue')"
            >
                <div class="flex justify-content-between p-3">
                    <div>
                        <p class="value">
                            {{
                                formatNumberWithCommas(
                                    count?.subscription_revenue,
                                )
                            }}
                        </p>
                        <p class="detail">Doanh thu Subscription</p>
                    </div>
                    <div class="icon"><Icon name="add-card"></Icon></div>
                </div>
                <div
                    class="info flex align-items-center justify-content-center py-1"
                >
                    Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Icon from '~/components/General/Icon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import Api from '~/network/Api';
import { formatNumberWithCommas } from '#build/imports';
definePageMeta({
    layout: 'admin',
});
const router = useRouter();
const count = ref();
onMounted(async () => {
    await Api.dashboard
        .getCount({})
        .then((res: any) => {
            count.value = res.data;
            console.log('res', res.data);
        })
        .catch((err: any) => {
            console.log(err);
        });
});
</script>

<style lang="scss" scoped>
.head-item {
    width: 20%;
    border-radius: 5px;
    color: rgb(255, 255, 255);

    cursor: pointer;
    position: relative;
    .icon {
        color: rgba($color: #000000, $alpha: 0.2);
        transform: scale(2.5);
        position: absolute;
        top: 30px;
        right: 30px;
    }
    .value {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
    }
    .detail {
        font-size: 1.1rem;
    }
    .info {
        background-color: rgba($color: #000000, $alpha: 0.1);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}

.type-1 {
    background-color: #17a2b8;
}
.type-2 {
    background-color: #28a745;
}
.type-3 {
    background-color: #ffc107;
}
.type-4 {
    background-color: #dc3545;
}
.type-5 {
    background-color: #5017b9;
}
</style>
