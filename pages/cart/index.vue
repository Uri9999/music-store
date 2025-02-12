<template>
    <HeaderPage class="mt-5" title="Giỏ hàng"> </HeaderPage>
    <div class="page">
        <div class="cart my-5 pb-5" v-if="items.length">
            <div class="cart-detail">
                <div class="item-list">
                    <div class="item-show" v-for="(item, index) in items">
                        <div class="mr-3 flex align-items-center">
                            <Button
                                label="Xóa"
                                severity="danger"
                                outlined
                                @click="confirmDelete(item?.id)"
                            />
                        </div>
                        <div class="img mr-3">
                            <BackgroundImageCommon
                                :src="'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'"
                            ></BackgroundImageCommon>
                        </div>
                        <div class="flex justify-content-between w-full">
                            <div class="mr-3 content">
                                {{ item?.tab?.name }}
                            </div>
                            <div>
                                <PriceCommon
                                    v-if="item?.tab?.discount_money != 0"
                                    :value="item?.tab?.price"
                                    :textDecoration="'line-through'"
                                    class="mr-2"
                                    :font-size="'1rem'"
                                    :color="'#929292'"
                                ></PriceCommon>
                                <PriceCommon
                                    :value="item?.tab?.discount_money != 0 ? item?.tab?.discount_money : item?.tab?.price"
                                    :font-size="'1.3rem'"
                                ></PriceCommon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <div class="info-t">
                        <p>Tạm tính:</p>
                        <p>
                            <PriceCommon
                                type="default"
                                :value="calcTotalPrice(items)"
                            ></PriceCommon>
                        </p>
                    </div>
                    <div class="info-t">
                        <p>Thành tiền:</p>
                        <p>
                            <PriceCommon
                                :value="calcTotalPrice(items)"
                            ></PriceCommon>
                        </p>
                    </div>
                    <Button
                        label="Tạo đơn hàng"
                        class="custom w-full mt-3"
                        @click="checkout()"
                    ></Button>
                </div>
            </div>
        </div>
        <div class="cart-null" v-else>Chưa có sản phẩm nào trong giỏ hàng</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';
import HeaderPage from '~/components/General/HeaderPage.vue';
import BackgroundImageCommon from '~/components/General/BackgroundImageCommon.vue';
import PriceCommon from '~/components/General/PriceCommon.vue';

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const items = ref([]);
onMounted(async () => {
    await getCart();
});

const getCart = async () => {
    await Api.cart
        .getByMe()
        .then((res: any) => {
            items.value = res.data;
        })
        .catch((err: any) => {
            if (err?.status == 401) {
                router.push('/login');
            }
        });
};

const deleteItem = async (id: number) => {
    await Api.cart
        .delete(id)
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
        });
};

const confirmDelete = (id: number) => {
    confirm.require({
        header: 'Xác nhận xóa sản phẩm',
        message: 'Bạn có chắc chắn muốn xóa sản phẩm ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteItem(id);
            await getCart();
        },
        reject: () => {},
    });
};

const checkout = () => {
    const ids = items.value.map((item: any) => {
        return item.tab_id;
    });

    router.push({ path: '/order/create', query: { ids: ids } });
};

const calcTotalPrice = (items: any) => {
    const total = items.reduce((total: number, item: any) => {
        const price = item.tab.discount_money != 0 ? item.tab.discount_money : item.tab.price;
        return total + price;
    }, 0);

    return total;
};
</script>

<style scoped lang="scss">
.page {
    min-height: 70vh;
}
.footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.cart-detail {
    display: flex;
    .item-list {
        width: calc(100% - 300px);
        padding: 15px;
        .item-show {
            display: flex;
            .img {
                width: 150px;
            }
            border-bottom: 1px solid rgb(228, 228, 228);
            padding: 10px;
            .content {
                font-size: 1.2rem;
            }
        }
    }
    .info {
        font-size: 1.2rem;
        width: 300px;
        padding: 15px;
        .info-t {
            display: flex;
            align-items: end;
            padding-bottom: 5px;
            padding-top: 15px;
            border-bottom: 1px solid rgb(221, 221, 221);
            justify-content: space-between;
        }
    }
}

.cart-null {
    width: 100%;
    height: 60px;
    font-size: 1.2rem;
    border: 1px dashed rgb(201, 201, 201);
    color: var(--color-2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .cart-detail {
        flex-direction: column;
        .item-list {
            width: 100%;
        }
        .info {
            width: 100%;
        }
    }
}
</style>
