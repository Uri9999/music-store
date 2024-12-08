<template>
    <HeaderPage title="Doanh thu"> </HeaderPage>
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
                    <CalendarCommon
                        v-model="filter.start_date"
                        placeholder="từ ngày"
                    ></CalendarCommon>
                    <CalendarCommon
                        v-model="filter.end_date"
                        placeholder="đến ngày"
                    ></CalendarCommon>
                </div>
                <div class="flex gap-2">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                            placeholder="Tìm kiếm..."
                            v-model="filter.search"
                        />
                    </IconField>
                    <Button @click="search()">Tìm kiếm</Button>
                </div>
            </div>
        </template>

        <Column field="name" header="Tên" style=""></Column>
        <Column field="email" header="Email" style=""></Column>
        <Column field="role" header="Cấp bậc" style="">
            <template #body="slotProps">
                <span>{{ slotProps.data?.role?.name }}</span>
            </template>
        </Column>
        <Column field="commission_rate" header="% Hoa hồng" style=""></Column>
        <Column
            field="referral_commissions_sum_price"
            header="Subscription (Vnd)"
        >
            <template #body="slotProps">
                <span>{{
                    formatNumberWithCommas(
                        calcSumPriceSubscription(slotProps.data),
                    )
                }}</span>
            </template>
        </Column>
        <Column field="order_items_sum_price" header="Tab (Vnd)">
            <template #body="slotProps">
                <span>{{
                    formatNumberWithCommas(calcSumPriceTab(slotProps.data))
                }}</span>
            </template>
        </Column>
        <Column field="total_price" header="Tổng tiền (Vnd)">
            <template #body="slotProps">
                <span>{{
                    formatNumberWithCommas(calcTotalPrice(slotProps.data))
                }}</span>
            </template>
        </Column>
        <Column :exportable="false" header="Hành động" style="min-width: 12rem">
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
            </template>
        </Column>
    </TableCommon>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import { useConfirm } from 'primevue/useconfirm';
import HeaderPage from '~/components/General/HeaderPage.vue';
import { formatNumberWithCommas } from '#build/imports';
import CalendarCommon from '~/components/General/CalendarCommon.vue';

definePageMeta({
    layout: 'admin',
});

onMounted(async () => {});

const filter = ref({
    search: '',
    start_date: null,
    end_date: null,
});
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const tableCommon = ref<any>();
const confirmDelete = (id: number) => {
    confirm.require({
        header: 'Xác nhận xóa danh mục',
        message: 'Bạn có chắc chắn muốn xóa danh mục ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteCategory(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
    });
};

const deleteCategory = async (id: number) => {
    Api.category
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
            console.log(err);
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
        });
};

const clearFilter = async () => {
    filter.value.search = '';
    filter.value.start_date = null;
    filter.value.end_date = null;
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetch = (payload: any) => {
    return Api.revenue.index(payload);
};

const gotoDetail = (id: number) => {
    router.push('/admin/revenue/' + id);
};

const calcSumPriceSubscription = (item: any) => {
    if (item.referral_commissions_sum_price) {
        var total = String(
            (item.referral_commissions_sum_price * item.commission_rate) / 100,
        );

        return parseInt(total);
    }
    return 0;
};
const calcSumPriceTab = (item: any) => {
    if (item.order_items_sum_price) {
        var total = String(
            (item.order_items_sum_price * item.commission_rate) / 100,
        );

        return parseInt(total);
    }
    return 0;
};
const calcTotalPrice = (item: any) => {
    const sumTabPrice = calcSumPriceTab(item);
    const sumSubscriptionPrice = calcSumPriceSubscription(item);
    return sumTabPrice + sumSubscriptionPrice;
};
</script>
<style scoped lang="scss"></style>
