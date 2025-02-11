<template>
    <HeaderPage title="Danh sách bài tab đã bán được"> </HeaderPage>
    <TableCommon ref="tableCommon" :apiFunction="fetch">
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-end justify-content-between"
            >
                <div>
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Reset bộ lọc"
                        outlined
                        @click="clearFilter()"
                    />
                </div>
                <div class="flex gap-2">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                            placeholder="Tìm kiếm tên tab"
                            v-model="filter.search"
                        />
                    </IconField>
                    <Button @click="search()">Tìm kiếm</Button>
                </div>
            </div>
        </template>

        <Column field="name" header="Tên tab">
            <template #body="slotProps">
                {{ slotProps.data.tab.name }}
            </template>
        </Column>

        <Column field="user" header="Người mua">
            <template #body="slotProps">
                {{ slotProps.data.user.name }}
            </template>
        </Column>
        <Column field="price" header="Giá">
            <template #body="slotProps">
                {{ formatNumberWithCommas(slotProps.data.price) }}
            </template>
        </Column>
        <Column field="price" header="Giá sau giảm giá">
            <template #body="slotProps">
                {{ formatNumberWithCommas(slotProps.data.meta.price_discount) }}
            </template>
        </Column>
        <Column
            field="commission_rate"
            :header="'Hoa hồng nhận (' + commissionRate + '%)'"
        >
            <template #body="slotProps">
                {{
                    formatNumberWithCommas(
                        (slotProps.data.meta.price_discount * commissionRate) / 100,
                    )
                }}
            </template>
        </Column>
        <Column field="status" header="Trạng thái">
            <template #body="slotProps">
                <span
                    :class="convertStatus(slotProps.data.order.status).class"
                    >{{
                        convertStatus(slotProps.data.order.status).label
                    }}</span
                >
            </template>
        </Column>
    </TableCommon>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import HeaderPage from '~/components/General/HeaderPage.vue';
import { formatNumberWithCommas } from '#build/imports';
import { useAuthStore } from '#build/imports';

definePageMeta({
    layout: 'admin',
});
const { profile } = useAuthStore();
console.log('profile', profile);

const commissionRate = profile?.commission_rate ?? 0;
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onBeforeMount(async () => {
    selection.value = await selectionStore.getData();
});

const filter = ref({
    search: '',
});
const tableCommon = ref<any>();

const clearFilter = async () => {
    filter.value.search = '';
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetch = (payload: any) => {
    return Api.orderItem.index(payload);
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Chờ phê duyệt', class: 'status-process' };
    } else if (status == 2) {
        return { label: 'Hoàn thành', class: 'status-complete' };
    } else {
        return { label: 'Đã hủy', class: 'status-fail' };
    }
};
</script>
<style scoped lang="scss">
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
