<template>
    <div>
        <HeaderPage title="Danh sách bài Tab">
            <template v-slot:head-right>
                <Button
                    label="Tạo mới"
                    icon="pi pi-plus"
                    severity="success"
                    @click="goCreateTab()"
                />
            </template>
        </HeaderPage>

        <TableCommon
            ref="tableCommon"
            :payload="filter"
            :apiFunction="fetchTabs"
        >
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
                                placeholder="Tên bài hát hoặc tác giả"
                                v-model="filter.search"
                            />
                        </IconField>
                        <Button @click="search()">Tìm kiếm</Button>
                    </div>
                </div>
            </template>

            <Column field="name" header="Tên bài hát" style=""></Column>
            <Column field="user" header="Người tạo" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.user?.name }}</span>
                </template>
            </Column>
            <Column field="author" header="Tác giả" style=""></Column>
            <Column field="price" header="Giá" style=""></Column>
            <Column field="category" header="Danh mục" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.category?.name }}</span>
                </template>
            </Column>
            <Column field="youtube_url" header="Youtube" style="">
                <template #body="slotProps">
                    <a
                        v-tooltip="slotProps.data?.youtube_url"
                        :href="slotProps.data?.youtube_url"
                        target="_blank"
                        >Link</a
                    >
                </template>
            </Column>
            <Column field="description" header="Mô tả" style="">
                <template #body="slotProps">
                    <span>
                        {{ truncateDescription(slotProps.data?.description) }}
                    </span>
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
                        @click="gotoUpdateTab(slotProps.data?.id)"
                        outlined
                        rounded
                        class="mr-2"
                    />
                    <Button
                        icon="pi pi-info-circle"
                        outlined
                        rounded
                        severity="info"
                        class="mr-2"
                        @click="gotoDetailTab(slotProps.data?.id)"
                    />
                    <Button
                        icon="pi pi-times"
                        outlined
                        rounded
                        severity="danger"
                        @click="confirmDelete(slotProps.data?.id)"
                    />
                </template>
            </Column>
        </TableCommon>
    </div>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import HeaderPage from '~/components/General/HeaderPage.vue';
import { truncateDescription } from '~/utils/funciton';

definePageMeta({
    layout: 'admin',
});
const router = useRouter();
const allUserAffiliate = ref([]);
onMounted(async () => {
    await Api.user
        .getAllAffiliate({})
        .then((res: any) => {
            allUserAffiliate.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
});

const filter = ref({
    search: '',
});
const toast = useToast();
const tableCommon = ref<any>();
const confirm = useConfirm();
const clearFilter = async () => {
    filter.value.search = '';
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetchTabs = (payload: any) => {
    return Api.tab.adminIndex(payload);
};

const goCreateTab = () => {
    router.push('/admin/tab/create');
};

const confirmDelete = (id: number) => {
    confirm.require({
        header: 'Xác nhận xóa bài tab',
        message: 'Bạn có chắc chắn muốn xóa bài tab ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteTab(id);
            tableCommon.value.refresh(filter.value);
        },
        reject: () => {},
    });
};

const deleteTab = async (id: number) => {
    try {
        const resDelete = (await Api.tab.adminDelete(id)) as any;
        toast.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: resDelete?.message,
            life: 3000,
        });
    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: error?.message,
            life: 3000,
        });
    }
};

const gotoDetailTab = (id: number) => {
    router.push('/admin/tab/' + id);
};

const gotoUpdateTab = (id: number) => {
    router.push('/admin/tab/update/' + id);
};
</script>
<style scoped lang="scss"></style>
