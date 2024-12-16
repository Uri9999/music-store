<template>
    <HeaderPage title="Danh sách đăng ký Subscription"> </HeaderPage>
    <TableCommon ref="tableCommon" :apiFunction="fetch">
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
                        :options="selection?.user_subscription_status"
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

        <Column field="subscription" header="Subscription" style="">
            <template #body="slotProps">
                <span>{{ slotProps.data?.subscription?.name }}</span>
            </template>
        </Column>

        <Column field="price" header="Giá (Vnd)" style="">
            <template #body="slotProps">
                <span>{{
                    formatNumberWithCommas(slotProps.data?.meta?.price)
                }}</span>
            </template>
        </Column>
        <Column field="start_date" header="Ngày bắt đầu" style="">
            <template #body="slotProps">
                <span>{{ slotProps.data?.start_date }}</span>
            </template>
        </Column>
        <Column field="end_date" header="Ngày kết thúc" style="">
            <template #body="slotProps">
                <span>{{ slotProps.data?.end_date }}</span>
            </template>
        </Column>

        <Column field="status" header="Trạng thái" style="min-width: 12rem">
            <template #body="slotProps">
                <span :class="convertStatus(slotProps.data?.status).class">{{
                    convertStatus(slotProps.data?.status).label
                }}</span>
            </template>
        </Column>

        <Column field="bill" header="Bill">
            <template #body="slotProps">
                <div class="order-bill">
                    <ImageCommon
                        v-if="slotProps.data?.bill?.url"
                        :src="slotProps.data?.bill?.url"
                    ></ImageCommon>
                </div>
            </template>
        </Column>

        <Column field="note" header="Ghi chú">
            <template #body="slotProps">
                <span>{{ truncateDescription(slotProps.data?.note) }}</span>
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
                <div v-if="slotProps.data?.rejector?.name">
                    Người hủy: {{ slotProps.data?.rejector?.name }}
                </div>
            </template>
        </Column>

        <Column :exportable="false" header="Hành động">
            <template #body="slotProps">
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
import type { Selection } from '~/types/selection';
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

const fetch = (payload: any) => {
    return Api.userSubscription.index(payload);
};
const confirmApproval = (id: number) => {
    confirm.require({
        header: 'Xác nhận phê duyệt subscription',
        message:
            'Bạn đã kiểm tra bill chuyển khoản và muốn hoàn thành yêu cầu ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'OK',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await approval(id);
            tableCommon.value.refresh(filter.value);
        },
        reject: () => {},
    });
};
const approval = async (id: number) => {
    await Api.userSubscription
        .approve(id)
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
        header: 'Xác nhận Hủy',
        message: 'Bạn có muốn hủy yêu cầu đăng ký subscription ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Hủy',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await cancel(id);
            tableCommon.value.refresh(filter.value);
        },
        reject: () => {},
    });
};
const cancel = async (id: number) => {
    await Api.userSubscription
        .reject(id)
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
        return { label: 'Chờ phê duyệt', class: 'status-process' };
    } else if (status == 2) {
        return { label: 'Đã phê duyệt', class: 'status-complete' };
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
