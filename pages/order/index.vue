<template>
    <div class="cart my-3 pb-5">
        <HeaderPage title="Đơn hàng"> </HeaderPage>
        <DataTable
            @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse"
            v-model:expandedRows="expandedRows"
            :value="items"
            dataKey="id"
            tableStyle="min-width: 50rem"
        >
            <Column expander style="width: 5rem" />
            <Column field="name" header="Ngày đặt">
                <template #body="slotProps">
                    {{ moment(slotProps.data.created_at).format('D-M-Y') }}
                </template>
            </Column>
            <Column field="status" header="Trạng thái" style="min-width: 12rem">
                <template #body="slotProps">
                    <span
                        :class="convertStatus(slotProps.data?.status).class"
                        >{{ convertStatus(slotProps.data?.status).label }}</span
                    >
                </template>
            </Column>
            <Column header="Số lượng">
                <template #body="slotProps">
                    {{ slotProps.data.order_items.length }}
                </template>
            </Column>
            <Column field="total_price" header="Tổng số tiền">
                <template #body="slotProps">
                    {{ formatNumberWithCommas(slotProps.data.total_price) }}
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-4">
                    <DataTable :value="slotProps.data.order_items">
                        <Column field="name" header="Tên tab" sortable>
                            <template #body="slotProps">
                                {{ slotProps.data.meta.name }}
                            </template>
                        </Column>
                        <Column field="price" header="Giá" sortable>
                            <template #body="slotProps">
                                {{
                                    formatNumberWithCommas(
                                        slotProps.data.meta.price,
                                    )
                                }}
                            </template>
                        </Column>
                        <Column field="rating" header="Đánh giá" sortable>
                            <template #body="slotProps">
                                <DisplayRateStars
                                    v-if="
                                        slotProps.data?.tab.reviewTabs[0]
                                            ?.rating > 0
                                    "
                                    :stars="
                                        slotProps.data?.tab.reviewTabs[0]
                                            ?.rating
                                    "
                                ></DisplayRateStars>
                            </template>
                        </Column>
                        <Column
                            field="rating-content"
                            header="Nội dung đánh giá"
                            sortable
                        >
                            <template #body="slotProps">
                                {{ slotProps.data?.tab.reviewTabs[0]?.comment }}
                            </template>
                        </Column>

                        <Column
                            :exportable="false"
                            header="Hành động"
                            style="min-width: 12rem"
                        >
                            <template #body="slotProps">
                                <Button
                                    icon="pi pi-pencil"
                                    outlined
                                    rounded
                                    class="mr-2"
                                    v-tooltip="'Viết đánh giá'"
                                    v-if="!slotProps.data?.tab.reviewTabs[0]"
                                    @click="
                                        openReviewTab(slotProps.data.tab_id)
                                    "
                                />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>

            <template #footer>
                <div class="footer">
                    <div class="quantity">
                        <div>
                            Tổng số đơn hàng:
                            {{ items ? items.length : 0 }}
                        </div>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>

    <Dialog
        v-model:visible="visibleReviewTab"
        header="Đánh giá Tab"
        :style="{ width: '30rem' }"
    >
        <div class="mb-2 flex justify-content-center">
            <Rating
                class="custom-rating mb-2"
                v-model="reviewTab.rating"
                aria-label="Rating"
                :cancel="false"
            />
            <small class="error" v-if="reviewTabError?.rating">{{
                reviewTabError?.rating[0]
            }}</small>
        </div>
        <div class="mb-2">
            <label for="description" class="font-semibold w-24 block mb-1"
                >Nội dung đánh giá</label
            >
            <Textarea
                v-model="reviewTab.comment"
                id="description"
                class="flex-auto w-full"
                rows="5"
            />
            <small class="error" v-if="reviewTabError?.comment">{{
                reviewTabError?.comment[0]
            }}</small>
        </div>
        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Đóng"
                severity="secondary"
                @click="visibleReviewTab = false"
            ></Button>
            <Button type="button" label="Tạo" @click="createReviewTab"></Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import { formatNumberWithCommas } from '#build/imports';
import Api from '~/network/Api';
import moment from 'moment';
import DisplayRateStars from '~/components/General/DisplayRateStars.vue';

const reviewTab = ref({
    rating: 0,
    comment: '',
    tab_id: null,
} as {
    rating: number;
    comment: string;
    tab_id: number | null;
});
const reviewTabError = ref({
    rating: [],
    comment: [],
});
const visibleReviewTab = ref(false);
const toast = useToast();
const expandedRows = ref([]);
const onRowExpand = (event: any) => {
    console.log('Row expanded: ', event.data);
};

const onRowCollapse = (event: any) => {
    console.log('Row collapsed: ', event.data);
};

const openReviewTab = (id: number) => {
    reviewTab.value.tab_id = id;
    visibleReviewTab.value = true;
};
const createReviewTab = async () => {
    await Api.reviewTab
        .store(reviewTab.value)
        .then(async (res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            visibleReviewTab.value = false;
            await getMyOrder();
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                reviewTabError.value = err.errors;
            }
        });
};

const router = useRouter();
const items = ref([]);
onMounted(async () => {
    await getMyOrder();
});
const getMyOrder = async () => {
    await Api.order
        .getMyOrder()
        .then((res: any) => {
            items.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Chờ phê duyệt', class: 'status-create' };
    } else if (status == 2) {
        return { label: 'Thanh toán thành công', class: 'status-process' };
    } else if (status == 3) {
        return { label: 'Hoàn thành', class: 'status-complete' };
    } else {
        return { label: 'Đã Hủy', class: 'status-fail' };
    }
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

.status-create {
    background-color: rgb(197, 197, 197);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
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
</style>
