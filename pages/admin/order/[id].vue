<template>
    <HeaderPage title="Chi tiết đơn hàng"></HeaderPage>
    <div class="flex mt-5 gap-4">
        <div>
            <h3 class="mb-3 order-title">Thông tin đơn hàng</h3>
            <div class="order">
                <div class="order-detail">
                    <div class="mb-3 order-info">
                        <div class="label">Khách hàng:</div>
                        <div class="order-avatar">
                            <Avatar
                                :image="orderData.user?.avatar_url?.url"
                                shape="circle"
                            />
                            <span class="ml-3">{{ orderData.user?.name }}</span>
                        </div>
                    </div>
                    <div class="mb-3 order-info">
                        <div class="label">Số lượng sản phẩm:</div>
                        <div class="">
                            {{ orderData.order_items?.length }}
                        </div>
                    </div>
                    <div class="mb-3 order-info">
                        <div class="label">Tổng giá trị đơn hàng (Vnd):</div>
                        <div class="">
                            {{ formatNumberWithCommas(orderData.total_price) }}
                        </div>
                    </div>
                    <div class="mb-3 order-info">
                        <div class="label">Ngày tạo order:</div>
                        <div class="">
                            {{ orderData.total_price }}
                        </div>
                    </div>
                    <div class="mb-3 order-info">
                        <div class="label">
                            Ngày quản lý xác nhận thanh toán:
                        </div>
                        <div class="">
                            {{ orderData.total_price }}
                        </div>
                    </div>
                    <div class="mb-3 order-info">
                        <div class="label">Trạng thái:</div>
                        <div
                            :class="{
                                'status-created': orderData?.status == 1,
                                'status-payment-success':
                                    orderData?.status == 2,
                                'status-completed': orderData?.status == 3,
                                'status-fail': orderData?.status == 4,
                            }"
                        >
                            {{
                                handleSelectedValue(
                                    orderData.status,
                                    selection?.order_status,
                                )
                            }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="label">Ghi chú:</div>
                        <div class="">
                            {{ orderData.note }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="label">Bill:</div>
                        <div class="bill-img">
                            <ImageCommon
                                :src="orderData.media_bill?.url"
                            ></ImageCommon>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full">
            <h3 class="mb-3 order-title">Các sản phẩm trong đơn hàng</h3>
            <div class="order-items">
                <DataTable :value="orderData.order_items">
                    <Column field="name" header="Tên" style="">
                        <template #body="slotProps">
                            <span>{{ slotProps.data?.meta?.name }}</span>
                        </template>
                    </Column>
                    <Column field="price" header="Giá (Vnd)" style="">
                        <template #body="slotProps">
                            <span>{{
                                formatNumberWithCommas(slotProps.data?.price)
                            }}</span>
                        </template>
                    </Column>
                    <Column field="detail" header="Chi tiết" style="">
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-info-circle"
                                outlined
                                rounded
                                severity="info"
                                class="mr-2"
                                @click="gotoDetail(slotProps.data?.id)"
                            />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import HeaderPage from '~/components/General/HeaderPage.vue';
import type { Order } from '~/types/order';
import { handleSelectedValue } from '~/utils/function';
import ImageCommon from '~/components/General/ImageCommon.vue';
import { formatNumberWithCommas } from '~/utils/function';

definePageMeta({
    layout: 'admin',
});

const orderData = ref({} as Order);
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onBeforeMount(async () => {
    selection.value = await selectionStore.getData();
});
onMounted(async () => {
    await getDetail();
});
const route = useRoute();
const id = Number(route.params.id);
const router = useRouter();

const getDetail = async () => {
    await Api.order
        .adminShow(id)
        .then((res: any) => {
            orderData.value = res.data;
        })
        .catch((err: any) => console.log(err));
};

const gotoDetail = (id: number) => {
    window.open(router.resolve({ path: '/tab/' + id }).href, '_blank');
};
</script>

<style lang="scss" scoped>
.label {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 18px;
}
.order-title {
    color: var(--color-2);
    font-size: 1.5rem;
}
.order {
    display: flex;
}
.order-avatar {
    display: flex;
    align-items: center;
}

.order-detail {
    width: 500px;
    margin-right: 20px;
}

.order-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bill-img {
    width: 200px;
}

.status-created {
    padding: 5px;
    background-color: rgb(167, 167, 167);
    border-radius: 5px;
    color: white;
}
.status-payment-success {
    padding: 5px;
    background-color: rgb(42, 253, 0);
    border-radius: 5px;
    color: white;
}
.status-completed {
    padding: 5px;
    background-color: rgb(0, 38, 255);
    border-radius: 5px;
    color: white;
}
.status-fail {
    padding: 5px;
    background-color: red;
    border-radius: 5px;
    color: white;
}
</style>
