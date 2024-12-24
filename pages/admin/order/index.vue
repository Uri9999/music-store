<template>
    <HeaderPage title="Danh sách Đơn hàng"> </HeaderPage>
    <TableCommon ref="tableCommon" :apiFunction="fetchOrders">
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-end justify-content-between"
            >
                <div class="flex gap-2 mt-2">
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Reset bộ lọc"
                        outlined
                        @click="clearFilter()"
                    />
                    <MultiSelect
                        v-model="filter.status"
                        :options="selection?.order_status"
                        optionLabel="label"
                        optionValue="value"
                        filter
                        placeholder="Trạng thái"
                        :maxSelectedLabels="3"
                    />
                </div>
                <div class="flex gap-2">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                            placeholder="Tên khách hàng"
                            v-model="filter.search"
                        />
                    </IconField>
                    <Button @click="search()">Tìm kiếm</Button>
                </div>
            </div>
        </template>

        <Column field="name" header="Khách hàng" style="">
            <template #body="slotProps">
                <span>{{ slotProps.data?.user?.name }}</span>
            </template>
        </Column>
        <Column field="status" header="Trạng thái" style="min-width: 12rem">
            <template #body="slotProps">
                <span :class="convertStatus(slotProps.data?.status).class">{{
                    convertStatus(slotProps.data?.status).label
                }}</span>
            </template>
        </Column>
        <Column field="total_price" header="Tổng số tiền">
            <template #body="slotProps">
                <span>{{
                    formatNumberWithCommas(slotProps.data.total_price)
                }}</span>
            </template>
        </Column>
        <Column field="count" header="Số lượng">
            <template #body="slotProps">
                <span>{{ slotProps.data?.order_items?.length }}</span>
            </template>
        </Column>
        <Column field="bill" header="Bill">
            <template #body="slotProps">
                <div class="order-bill">
                    <ImageCommon
                        v-if="slotProps.data?.media_bill?.url"
                        :src="slotProps.data?.media_bill?.url"
                    ></ImageCommon>
                </div>
            </template>
        </Column>
        <Column field="note" header="Ghi chú">
            <template #body="slotProps">
                <span>{{ truncateDescription(slotProps.data.note) }}</span>
            </template>
        </Column>
        <Column field="note" header="Chi tiết">
            <template #body="slotProps">
                <div v-if="slotProps.data?.approver">
                    Người phê duyệt: {{ slotProps.data?.approver?.name }}
                </div>
                <div v-if="slotProps.data?.approval_date">
                    Ngày phê duyệt: {{ slotProps.data?.approval_date }}
                </div>
                <div v-if="slotProps.data?.canceller?.name">
                    Người hủy: {{ slotProps.data?.canceller?.name }}
                </div>
            </template>
        </Column>
        <Column :exportable="false" header="Hành động"  style="min-width: 11rem">
            <template #body="slotProps">
                <Button
                    icon="pi pi-info-circle"
                    outlined
                    rounded
                    severity="info"
                    class="mr-2"
                    @click="gotoDetail(slotProps.data?.id)"
                    v-tooltip="'Thông tin'"
                />
                <Button
                    outlined
                    rounded
                    icon="pi pi-check-circle"
                    class="mr-2"
                    @click="confirmApproval(slotProps.data?.id)"
                    v-tooltip="'Phê duyệt'"
                    v-if="slotProps.data.status == 1"
                />
                <Button
                    outlined
                    rounded
                    icon="pi pi-times-circle"
                    severity="danger"
                    @click="confirmCancel(slotProps.data?.id)"
                    v-tooltip="'Hủy'"
                    v-if="slotProps.data.status == 1"
                />
            </template>
        </Column>
    </TableCommon>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import { useConfirm } from 'primevue/useconfirm';
import { useSelectionStore } from '~/stores/selectionStore';
import type { Selection, Item } from '~/types/selection';
import ImageCommon from '~/components/General/ImageCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import { formatNumberWithCommas } from '~/utils/function';
import { truncateDescription } from '~/utils/function';

definePageMeta({
    layout: 'admin',
});

const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
});

const filter = ref({
    search: '',
    status: [],
});
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const tableCommon = ref<any>();
const clearFilter = async () => {
    filter.value.search = '';
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetchOrders = (payload: any) => {
    return Api.order.index(payload);
};
const confirmApproval = (id: number) => {
    confirm.require({
        header: 'Xác nhận hoàn thành đơn hàng',
        message:
            'Bạn đã kiểm tra bill chuyển khoản và muốn chuyển đơn hàng sang trạng thái hoàn thành ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'OK',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await approvalOrder(id);
            tableCommon.value.refresh(filter.value);
        },
        reject: () => {},
    });
};
const approvalOrder = async (id: number) => {
    await Api.order
        .adminApproval(id)
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res?.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err?.message,
                life: 3000,
            });
        });
};

const confirmCancel = (id: number) => {
    confirm.require({
        header: 'Xác nhận Hủy đơn hàng',
        message: 'Bạn có muốn hủy đơn hàng không ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Hủy',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await cancelOrder(id);
            tableCommon.value.refresh(filter.value);
        },
        reject: () => {},
    });
};
const cancelOrder = async (id: number) => {
    await Api.order
        .adminCancel(id)
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res?.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err?.message,
                life: 3000,
            });
        });
};

const gotoDetail = (id: number) => {
    router.push('/admin/order/' + id);
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Khởi tạo', class: 'status-create' };
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
.order-bill {
    display: inline-block;
    width: 150px;
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
