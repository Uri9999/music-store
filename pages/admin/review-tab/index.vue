<template>
    <HeaderPage title="Danh sách đánh giá"> </HeaderPage>
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
                            placeholder="Tên người dùng"
                            v-model="filter.search"
                        />
                    </IconField>
                    <Button @click="search()">Tìm kiếm</Button>
                </div>
            </div>
        </template>

        <Column field="name" header="Người đánh giá">
            <template #body="slotProps">
                <span>{{ slotProps.data.user.name }}</span>
            </template>
        </Column>
        <Column field="tab" header="Tab">
            <template #body="slotProps">
                <span>{{ slotProps.data.tab.name }}</span>
            </template>
        </Column>
        <Column field="content" header="Nội dung">
            <template #body="slotProps">
                <span>{{ slotProps.data.comment }}</span>
            </template>
        </Column>
        <Column field="rating" header="Đánh giá" style="">
            <template #body="slotProps">
                <DisplayRateStars
                    :stars="slotProps.data.rating"
                ></DisplayRateStars>
            </template>
        </Column>
        <Column field="status" header="Trạng thái">
            <template #body="slotProps">
                <span :class="convertStatus(slotProps.data?.status).class">{{
                    convertStatus(slotProps.data?.status).label
                }}</span>
            </template>
        </Column>
        <Column :exportable="false" header="Hành động" style="min-width: 12rem">
            <template #body="slotProps">
                <Button
                    icon="pi pi-eye"
                    outlined
                    rounded
                    class="mr-2"
                    v-tooltip="'Hiển thị'"
                    @click="confirmEnable(slotProps.data.id)"
                    :disabled="slotProps.data.status == 1"
                />
                <Button
                    icon="pi pi-eye-slash"
                    outlined
                    rounded
                    v-tooltip="'Ẩn'"
                    severity="danger"
                    class="mr-2"
                    @click="confirmDisable(slotProps.data.id)"
                    :disabled="slotProps.data.status == 2"
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
import DisplayRateStars from '~/components/General/DisplayRateStars.vue';

definePageMeta({
    layout: 'admin',
});

onMounted(async () => {});
const filter = ref({
    search: '',
});
const toast = useToast();
const confirm = useConfirm();
const tableCommon = ref<any>();
const confirmEnable = (id: number) => {
    confirm.require({
        header: 'Xác nhận hiển thị đánh giá',
        message: 'Bạn có chắc chắn muốn hiển thị đánh giá ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'OK',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await enableReview(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
    });
};
const confirmDisable = (id: number) => {
    confirm.require({
        header: 'Xác nhận ẩn đánh giá',
        message: 'Bạn có chắc chắn muốn ẩn đánh giá ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'OK',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await disableReview(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
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
    return Api.reviewTab.index(payload);
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Hiển thị', class: 'status-enable' };
    } else {
        return { label: 'Ẩn', class: 'status-disable' };
    }
};

const enableReview = async (id: number) => {
    await Api.reviewTab
        .enable(id)
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
        });
};

const disableReview = async (id: number) => {
    await Api.reviewTab
        .disable(id)
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
        });
};
</script>
<style scoped lang="scss">
.status-enable {
    background-color: rgb(5, 187, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}

.status-disable {
    background-color: rgb(187, 5, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
</style>
