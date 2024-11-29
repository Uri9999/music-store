<template>
    <div>
        <h2 class="mb-2">Danh sách Banner</h2>
        <Button
            label="Tạo mới"
            icon="pi pi-plus"
            severity="success"
            @click="gotoCreate()"
            class="ml-3"
        />
        <TableCommon ref="tableCommon" :apiFunction="fetchBanners">
            <Column field="name" header="Tên" style=""></Column>
            <Column field="description" header="Mô tả" style=""></Column>
            <Column field="image" header="Ảnh" style="">
                <template #body="slotProps">
                    <img class="img-banner" :src="slotProps.data?.images_url[0].url" alt="">
                </template>
                <!-- images_url -->
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
                        @click="gotoEditBanner(slotProps.data.id)"
                    />

                    <Button
                        icon="pi pi-trash"
                        outlined
                        rounded
                        class="mr-2"
                        severity="danger"
                        @click="confirmDelete(slotProps.data.id)"
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
            await deleteBanner(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
    });
};

const deleteBanner = async (id: number) => {
    Api.banner
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

const fetchBanners = (payload: any) => {
    return Api.banner.index();
};

const gotoCreate = () => {
    router.push('/admin/banner/create');
};
const gotoEditBanner = (id: number) => {
    router.push('/admin/banner/update/' + id);
};
</script>
<style scoped lang="scss">
.img-banner {
    width: 100px;
}
</style>
