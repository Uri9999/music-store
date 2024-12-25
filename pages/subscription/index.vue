<template>
    <HeaderPage title="Đăng ký Subscription" class="mt-5 mb-3"> </HeaderPage>
    <div class="cart-detail">
        <div class="item-list">
            <div class="mb-3">
                <label for="note" class="block"
                    >Gói đăng ký <span class="error">*</span></label
                >
                <div>
                    <Dropdown
                        class="mr-3 mt-2"
                        v-model="subscription.subscription_id"
                        :options="subscriptions"
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Subscription"
                        @change="onSubChange($event)"
                    />
                </div>
                <small
                    class="error"
                    v-if="subscriptionError?.subscription_id"
                    >{{ subscriptionError?.subscription_id[0] }}</small
                >
            </div>

            <div class="mb-3">
                <label for="note" class="block mb-2"
                    >Ghi chú <span class="error">*</span>
                </label>
                <Textarea
                    v-model="subscription.note"
                    id="note"
                    class="flex-auto w-full"
                    rows="5"
                />
                <small class="error" v-if="subscriptionError?.note">{{
                    subscriptionError?.note[0]
                }}</small>
            </div>

            <div class="mb-3">
                <label for="note" class="block mb-2">Mã giới thiệu</label>
                <InputText
                    v-model="subscription.referral_code"
                    id="note"
                    class="flex-auto w-full referral-code"
                />
                <small class="error" v-if="subscriptionError?.referral_code">{{
                    subscriptionError?.referral_code[0]
                }}</small>
            </div>
        </div>
        <div class="info">
            <div class="info-t">
                <p>Gói đăng ký:</p>
                <p class="sub-name">
                    {{ subscriptionSelected?.name }}
                </p>
            </div>
            <div class="info-t">
                <p>Thành tiền:</p>
                <PriceCommon :value="subscriptionSelected?.price"></PriceCommon>
            </div>
            <div class="info-t tutorial-link">
                <p @click="gotoTutorial()">Click để xem hướng dẫn thanh toán</p>
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
                    <small class="error block" v-if="subscriptionError?.bill">{{
                        subscriptionError?.bill[0]
                    }}</small>
                    <ImageUploader
                        label="Tải ảnh bill chuyển khoản"
                        collection="avatar"
                        @upload="handleUpload"
                    ></ImageUploader>
                </div>
            </div>

            <Button
                label="Gửi yêu cầu thanh toán"
                class="custom w-full mt-3"
                @click="submit"
            ></Button>
        </div>
    </div>
    <div>
        <h2>Danh sách subscription đăng ký</h2>
        <div>
            <TableCommon ref="tableCommon" :apiFunction="fetch">
                <Column field="name" header="Tên Gói">
                    <template #body="slotProps">
                        <span>{{ slotProps.data?.subscription?.name }}</span>
                    </template>
                </Column>
                <Column field="price" header="Giá">
                    <template #body="slotProps">
                        <span>{{
                            formatNumberWithCommas(slotProps.data?.price)
                        }}</span>
                    </template>
                </Column>
                <Column field="created_at" header="Ngày tạo">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.created_at).format('D-M-Y') }}
                    </template>
                </Column>
                <Column field="start_date" header="Ngày bắt đầu">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.start_date).format('D-M-Y') }}
                    </template>
                </Column>
                <Column field="end_date" header="Ngày kết thúc">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.end_date).format('D-M-Y') }}
                    </template>
                </Column>
                <Column field="Trạng thái" header="Trạng thái" style="min-width: 12rem;">
                    <template #body="slotProps">
                        <span
                            :class="convertStatus(slotProps.data?.status).class"
                            >{{
                                convertStatus(slotProps.data?.status).label
                            }}</span
                        >
                    </template>
                </Column>
            </TableCommon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderPage from '~/components/General/HeaderPage.vue';
import ImageUploader from '~/components/General/ImageUploader.vue';
import Api from '~/network/Api';
import { formatNumberWithCommas } from '#build/imports';
import TableCommon from '~/components/General/TableCommon.vue';
import moment from 'moment';
import PriceCommon from '~/components/General/PriceCommon.vue';

const router = useRouter();
onMounted(async () => {
    await Api.subscription
        .list()
        .then((res: any) => {
            subscriptions.value = res.data;
            if (route.query.subscription_id) {
                subscriptionSelected.value = subscriptions.value.find(
                    (element: any) =>
                        element?.id == Number(route.query.subscription_id),
                );
            }
        })
        .catch((err: any) => {
            console.log(err);
            if (err?.status == 401) {
                router.push('/login');
            }
        });
});
const tableCommon = ref<any>();
const subscriptions = ref([]);
const toast = useToast();
const subscriptionSelected = ref();
const imageUrl = ref();
const route = useRoute();

const subscription = ref({
    subscription_id: Number(route.query.subscription_id),
    note: '',
    bill: null,
    referral_code: route.query.referral_code,
} as {
    subscription_id: number | null;
    note: string;
    bill: null | string;
    referral_code: null | string;
});
const subscriptionError = ref({
    subscription_id: [],
    note: [],
    bill: [],
    referral_code: [],
});

const handleUpload = (file: any) => {
    imageUrl.value = URL.createObjectURL(file);
    subscription.value.bill = file;
};

const onSubChange = async (event: any) => {
    subscriptionSelected.value = subscriptions.value.find(
        (element: any) => element?.id == event.value,
    );
};

const gotoTutorial = () => {
    window.open('/tutorial', '_blank');
};

const submit = async () => {
    await Api.subscription
        .register(subscription.value)
        .then(async (res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            clearSubscriptionError();
            await tableCommon.value.refresh({});
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err.status == 422) {
                subscriptionError.value = err.errors;
            }
        });
};
const fetch = () => {
    return Api.userSubscription.getMyUserSubscription();
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Chờ phê duyệt', class: 'status-process' };
    } else if (status == 2) {
        return { label: 'Hoàn thành', class: 'status-complete' };
    } else {
        return { label: 'Hoàn thành', class: 'status-fail' };
    }
};

const clearSubscriptionError = () => {
    subscriptionError.value = {
        subscription_id: [],
        note: [],
        bill: [],
        referral_code: [],
    };
};
</script>

<style lang="scss" scoped>
.status-process {
    background-color: rgb(0, 101, 253);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-complete {
    background-color: rgb(5, 187, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-fail {
    background-color: rgb(187, 5, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.tutorial-link {
    border-bottom: 1px solid #334155;
    cursor: pointer;
    display: inline-block;
}
.price {
    color: var(--color-2);
    font-size: 1.4rem;
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

        label {
            font-weight: bold;
            color: #334155;
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
.sub-name {
    color: var(--color-2);
    font-size: 1.5rem;
}
.referral-code {
    max-width: 300px;
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
