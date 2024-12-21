<template>
    <HeaderPage title="Danh sách thông báo" class="mt-5 mb-3"> </HeaderPage>
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
                        :options="selection?.notification_status"
                        optionLabel="label"
                        optionValue="value"
                        filter
                        placeholder="Trạng thái"
                        :maxSelectedLabels="3"
                    />
                    <MultiSelect
                        v-model="filter.type"
                        :options="selection?.notification_type"
                        optionLabel="label"
                        optionValue="value"
                        filter
                        placeholder="Loại"
                        :maxSelectedLabels="3"
                    />
                </div>
                <div class="flex gap-2">
                    <Button @click="search()">Tìm kiếm</Button>
                </div>
            </div>
        </template>

        <Column field="title" header="Tiêu đề"></Column>
        <Column field="body" header="Nội dung">
            <template #body="slotProps">
                {{ truncateDescription(slotProps.data.body, 50) }}
            </template>
        </Column>
        <Column field="status" header="Trạng thái" style="width: 9rem">
            <template #body="slotProps">
                <span :class="convertStatus(slotProps.data?.status).class">{{
                    convertStatus(slotProps.data?.status).label
                }}</span>
            </template>
        </Column>
        <Column field="type" header="Loại" style="width: 10rem">
            <template #body="slotProps">
                <span :class="convertType(slotProps.data?.type).class">{{
                    convertType(slotProps.data?.type).label
                }}</span>
            </template>
        </Column>
        <Column field="send_at" header="Gửi lúc" style="width: 10rem">
            <template #body="slotProps">
                <span v-if="slotProps.data.send_at">{{
                    moment(slotProps.data.send_at).format('HH:mm DD-MM-YYYY')
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
                    @click="getDetail(slotProps.data.id)"
                    v-tooltip="'Chi tiết'"
                />
            </template>
        </Column>
    </TableCommon>
    <Button label="Show" @click="visible = true" />
    <Dialog
        v-model:visible="visible"
        maximizable
        modal
        :header="notificationDetail.title"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        @hide="onDialogClose"
    >
        <p class="m-0">
            {{ notificationDetail.body }}
        </p>
        <p class="mt-3">
            Thời gian gửi:
            {{ moment(notificationDetail.send_at).format('HH:mm DD-MM-YYYY') }}
        </p>
        <p class="mt-3">
            Loại: {{ convertType(notificationDetail.type).label }}
        </p>
    </Dialog>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import HeaderPage from '~/components/General/HeaderPage.vue';
import type { Selection, Item } from '~/types/selection';
import type { NotificationType } from '~/types/notification';
import moment from 'moment';
import { truncateDescription } from '#build/imports';

const route = useRoute();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
});
watch(
    () => route.query.id,
    async (newValue, oldValue) => {
        if (newValue != oldValue) {
            await getDetail(Number(newValue));
        }
    },
);
const visible = ref(false);
const filter = ref({
    status: [],
    type: [],
});
const tableCommon = ref<any>();
const notificationDetail = ref({} as NotificationType);

const clearFilter = async () => {
    filter.value.status = [];
    filter.value.type = [];
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetch = (payload: any) => {
    return Api.notification.index(payload);
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Chưa đọc', class: 'status-sent' };
    } else if (status == 2) {
        return { label: 'Đã đọc', class: 'status-read' };
    }
    return { label: 'Chưa gửi', class: 'status-fail' };
};
const convertType = (type: number) => {
    if (type == 1) {
        return { label: 'Tạo đơn hàng', class: 'status-sent' };
    } else if (type == 2) {
        return { label: '??', class: 'status-read' };
    }
    return { label: 'error', class: 'status-fail' };
};

const getDetail = async (id: number) => {
    await Api.notification
        .show(id)
        .then((res: any) => {
            visible.value = true;
            notificationDetail.value = res.data;
        })
        .catch((err: any) => {
            visible.value = false;
        })
        .finally(() => {});
};
const onDialogClose = async () => {
    await search();
};
</script>
<style scoped lang="scss">
.status-sent {
    color: white;
    padding: 6px;
    border-radius: 5px;
    background-color: rgb(163, 163, 163);
}
.status-read {
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
