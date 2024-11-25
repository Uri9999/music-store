<template>
    <div>
        <h2>Danh sách User</h2>
        <TableCommon ref="tableCommon" :apiFunction="fetchUsers">
            <template #header>
                <div
                    class="flex flex-wrap gap-2 align-items-center justify-content-between"
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
                                placeholder="Tìm kiếm..."
                                v-model="filter.name"
                            />
                        </IconField>
                        <Button @click="search()">Tìm kiếm</Button>
                    </div>
                </div>
            </template>

            <Column field="name" header="Tên" style=""></Column>
            <Column field="description" header="Mô tả" style=""></Column>
            <Column field="parent" header="Danh mục cha" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.parent?.name }}</span>
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
                        @click="gotoEditCategory(slotProps.data.id)"
                    />

                    <Button
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
                    />
                </template>
            </Column>
        </TableCommon>
    </div>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import { useConfirm } from 'primevue/useconfirm';

definePageMeta({
    layout: 'admin',
});

onMounted(async () => {});

const filter = ref({
    name: '',
});

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
    filter.value.name = '';
    await search()
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetchUsers = (payload: any) => {
    return Api.category.index(payload);
};
</script>
<style scoped lang="scss">

</style>
