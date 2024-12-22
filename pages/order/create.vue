<template>
    <HeaderPage class="mt-5 mb-3" title="Thanh toán đơn hàng"> </HeaderPage>
    <div class="cart my-5 pb-5">
        <div class="cart-detail">
            <div class="item-list">
                <div class="item-show" v-for="(item, index) in items">
                    <div class="img mr-3">
                        <BackgroundImageCommon
                            :src="'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'"
                        ></BackgroundImageCommon>
                    </div>
                    <div class="flex justify-content-between w-full">
                        <div class="mr-3 content">{{ item?.name }}</div>
                        <div>
                            <PriceCommon :value="item?.price"></PriceCommon>
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
                    <PriceCommon :value="calcTotalPrice(items)"></PriceCommon>
                </div>
                <div class="info-t tutorial-link">
                    <p @click="gotoTutorial()">
                        Click để xem hướng dẫn thanh toán
                    </p>
                </div>
                <div class="info-t">
                    <div class="mb-3">
                        <label class="block mb-2" for=""
                            >Ảnh chụp bill chuyển khoản
                        </label>
                        <div class="mb-3" v-if="imageUrl">
                            <img
                                :src="imageUrl"
                                alt="Uploaded Image"
                                style="max-width: 70px"
                            />
                        </div>
                        <small
                            class="error block"
                            v-if="orderDataError?.bill"
                            >{{ orderDataError?.bill[0] }}</small
                        >
                        <ImageUploader
                            label="Tải ảnh bill chuyển khoản"
                            collection="avatar"
                            @upload="handleUpload"
                        ></ImageUploader>
                    </div>
                </div>
                <div class="info-t note">
                    <div class="w-full">
                        <label class="block mb-2" for="note"
                            >Ghi chú <span class="error">*</span></label
                        >
                        <Textarea
                            id="note"
                            v-model="orderData.note"
                            class="w-full"
                            rows="5"
                        />
                        <small
                            class="error block"
                            v-if="orderDataError?.note"
                            >{{ orderDataError?.note[0] }}</small
                        >
                    </div>
                </div>

                <Button
                    label="Gửi yêu cầu thanh toán"
                    class="custom w-full mt-3"
                    @click="createOrder"
                    :disabled="btnDisable"
                ></Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';
import ImageUploader from '~/components/General/ImageUploader.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import BackgroundImageCommon from '~/components/General/BackgroundImageCommon.vue';
import PriceCommon from '~/components/General/PriceCommon.vue';

const btnDisable = ref(false);
const toast = useToast();
const totalPrice = ref(0);
const route = useRoute();
var ids = route.query.ids;
if (typeof ids == 'string') {
    ids = [ids];
}
const imageUrl = ref();
const bill = ref();
const orderData = ref({
    bill: null,
    note: null,
    tab_ids: ids,
});
const orderDataError = ref({
    bill: [],
    note: [],
    tab_ids: [],
});
const router = useRouter();
const items = ref([]);
onMounted(async () => {
    await getTabs();
});
const handleUpload = (file: any) => {
    imageUrl.value = URL.createObjectURL(file);
    bill.value = file;
    orderData.value.bill = file;
};
const getTabs = async () => {
    await Api.tab
        .getTabByIds({ ids: ids })
        .then((res: any) => {
            items.value = res.data;
            console.log('items', items.value);

            totalPrice.value = items.value.reduce(
                (total, i: any) => total + i.price,
                0,
            );
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const createOrder = async () => {
    btnDisable.value = true;
    console.log('orderData.value', orderData.value);
    await Api.order
        .store(orderData.value)
        .then((res: any) => {
            console.log('res', res);
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            router.push('/order');
        })
        .catch((err: any) => {
            console.log(err);
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err.status == 422) {
                orderDataError.value = err.errors;
            }
        })
        .finally(() => {
            btnDisable.value = false;
        });
};

const gotoTutorial = () => {
    window.open('/tutorial', '_blank');
};

const calcTotalPrice = (items: any) => {
    const total = items.reduce((total: number, item: any) => {
        return total + item.price;
    }, 0);

    return total;
};
</script>

<style scoped lang="scss">
.footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.cart {
    min-height: 70vh;
}
.tutorial-link {
    cursor: pointer;
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
        width: 400px;
        padding: 15px;
        .info-t {
            width: 100%;
            display: flex;
            align-items: end;
            padding-bottom: 5px;
            padding-top: 15px;
            border-bottom: 1px solid rgb(221, 221, 221);
            justify-content: space-between;
        }

        .note {
            border-bottom: none;
        }
    }
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
