<template>
    <div>
        <HeaderPage title="Danh sách bài viết"></HeaderPage>
        <Button
            label="Tạo mới"
            icon="pi pi-plus"
            severity="success"
            @click="gotoCreate()"
            class="ml-3"
        />
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
                                placeholder="Tìm kiếm tiêu đề"
                                v-model="filter.search"
                            />
                        </IconField>
                        <Button @click="search()">Tìm kiếm</Button>
                    </div>
                </div>
            </template>

            <Column field="title" header="Tiêu đề" style=""></Column>
            <Column field="status" header="Trạng thái" style="">
                <template #body="slotProps">
                    <span>{{ handleSelectedValue(slotProps.data.status, selection.article_status) }}</span>
                </template>
            </Column>
            <Column field="type" header="Loại" style="">
                <template #body="slotProps">
                    <span>{{ handleSelectedValue(slotProps.data.type, selection.article_types) }}</span>
                </template>
            </Column>
            <Column field="user" header="Người viết" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.user?.name }}</span>
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
                        @click="gotoEdit(slotProps.data.id)"
                    />
                    <Button
                        icon="pi pi-info-circle"
                        outlined
                        rounded
                        severity="info"
                        class="mr-2"
                        @click="gotoDetail(slotProps.data?.id)"
                    />
                    <Button
                        icon="pi pi-trash"
                        outlined
                        rounded
                        class="mr-2"
                        severity="danger"
                        @click="confirmDelete(slotProps.data.id)"
                        v-if="slotProps.data.type == 1"
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
import { handleSelectedValue } from '~/utils/funciton';
import type { Selection } from '~/types/selection';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onBeforeMount(async () => {
    selection.value = await selectionStore.getData();
});


const filter = ref({
    search: '',
});
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const tableCommon = ref<any>();
const confirmDelete = (id: number) => {
    confirm.require({
        header: 'Xác nhận xóa',
        message: 'Bạn có chắc chắn muốn xóa ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteArticle(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
    });
};

const deleteArticle = async (id: number) => {
    Api.article
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
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetch = (payload: any) => {
    return Api.article.index(payload);
};

const gotoCreate = () => {
    router.push('/admin/article/create');
};
const gotoEdit = (id: number) => {
    router.push('/admin/article/update/' + id);
};
const gotoDetail = (id: number) => {
    router.push('/admin/article/' + id);
};

</script>
<style scoped lang="scss"></style>
