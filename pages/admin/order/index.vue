<template>
    <div>
        <h2 class="mb-2">Danh sách Đơn hàng</h2>
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
                                placeholder="Tìm kiếm..."
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
            <Column field="status" header="Trạng thái">
                <template #body="slotProps">
                    <span
                        :class="convertStatus(slotProps.data?.status).class"
                        >{{ convertStatus(slotProps.data?.status).label }}</span
                    >
                </template>
            </Column>
            <Column field="total_price" header="Tổng số tiền"></Column>
            <Column field="count" header="Số lượng">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.order_items?.length }}</span>
                </template>
            </Column>
            <Column field="bill" header="Bill">
                <template #body="slotProps">
                    <div class="order-bill">
                        <ImageComponent
                            :src="slotProps.data?.media_bill?.url"
                        ></ImageComponent>
                    </div>
                </template>
            </Column>
            <Column field="note" header="Ghi chú"> </Column>
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
                        @click="gotoEditCategory(slotProps.data.id)"
                    />

                    <!-- <Button
                        icon="pi pi-trash"
                        outlined
                        rounded
                        class="mr-2"
                        severity="danger"
                        @click="confirmDelete(slotProps.data.id)"
                        v-if="
                            slotProps.data.status != 2 &&
                            slotProps.data.role_id != 1
                        "
                    /> -->
                </template>
            </Column>
        </TableCommon>
    </div>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import { useConfirm } from 'primevue/useconfirm';
import { useSelectionStore } from '~/stores/selectionStore';
import type { Selection, Item } from '~/types/selection';
import ImageComponent from '~/components/General/ImageComponent.vue';

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
// const confirmDelete = (id: number) => {
//     confirm.require({
//         header: 'Xác nhận xóa danh mục',
//         message: 'Bạn có chắc chắn muốn xóa danh mục ?',
//         icon: 'pi pi-info-circle',
//         rejectLabel: 'Đóng',
//         acceptLabel: 'Xóa',
//         rejectClass: 'p-button-secondary p-button-outlined',
//         acceptClass: 'p-button-danger',
//         accept: async () => {
//             await deleteCategory(id);
//             tableCommon.value.refresh();
//         },
//         reject: () => {},
//     });
// };

// const deleteCategory = async (id: number) => {
//     Api.category
//         .delete(id)
//         .then((res: any) => {
//             toast.add({
//                 severity: 'success',
//                 summary: 'Thông báo',
//                 detail: res.message,
//                 life: 3000,
//             });
//         })
//         .catch((err: any) => {
//             console.log(err);
//             toast.add({
//                 severity: 'error',
//                 summary: 'Thông báo',
//                 detail: err.message,
//                 life: 3000,
//             });
//         });
// };

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

const gotoEditCategory = (id: number) => {
    router.push('/admin/category/update/' + id);
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Khởi tạo', class: 'status-create' };
    } else if (status == 2) {
        return { label: 'Thanh toán thành công', class: 'status-process' };
    } else if (status == 3) {
        return { label: 'Hoàn thành', class: 'status-complete' };
    } else {
        return { label: 'Thanh toán thất bại', class: 'status-fail' };
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
