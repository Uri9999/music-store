<template>
    <div>
        <h2 class="mb-2">Danh sách yêu cầu</h2>
        <TableCommon ref="tableCommon" :payload="filter" :apiFunction="fetchRequests">
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
                                placeholder="Tìm kiếm..."
                                v-model="filter.search"
                            />
                        </IconField>
                        <Button @click="search()">Tìm kiếm</Button>
                    </div>
                </div>
            </template>

            <Column field="name" header="Tên" style=""></Column>
            <Column field="author" header="Tác giả" style=""></Column>
            <Column field="status" header="Trạng thái" style="">
                <template #body="slotProps">
                    <span
                        :class="convertStatus(slotProps.data?.status).class"
                        >{{ convertStatus(slotProps.data?.status).label }}</span
                    >
                </template>
            </Column>
            <Column field="user" header="Khách hàng yêu cầu" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.user?.name }}</span>
                </template>
            </Column>
            <Column field="receiver" header="Nhân viên thực hiện" style="">
                <template #body="slotProps">
                    <div
                        v-if="
                            visibleSelect &&
                            originReiverId == slotProps.data?.id
                        "
                        class="flex gap-2"
                    >
                        <Dropdown
                            v-model="selectedReiverId"
                            :options="allUserAffiliate"
                            filter
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Select a Affiliate"
                            class="w-full md:w-14rem"
                        >
                        </Dropdown>
                        <Button
                            label="Lưu"
                            @click="updateReceiver(slotProps.data.id)"
                        ></Button>
                        <Button
                            label="Đóng"
                            severity="secondary"
                            @click="closeEdit()"
                        ></Button>
                    </div>
                    <span v-else>{{ slotProps.data?.receiver?.name }}</span>
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
                        @click="editRequestTab(slotProps.data)"
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
const visibleSelect = ref(false);
const selectedReiverId = ref();
const originReiverId = ref();
const allUserAffiliate = ref([]);
onMounted(async () => {
    await Api.user
        .getAllAffiliate({})
        .then((res: any) => {
            console.log('res', res);
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

const clearFilter = async () => {
    filter.value.search = '';
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetchRequests = (payload: any) => {
    return Api.requestTab.index(payload);
};

const convertStatus = (status: number) => {
    if (status == 0) {
        return { label: 'Khởi tạo', class: 'status-create' };
    } else if (status == 1) {
        return { label: 'Đang thực hiện', class: 'status-process' };
    } else {
        return { label: 'Hoàn thành', class: 'status-complete' };
    }
};

const editRequestTab = (requestTab: any) => {
    originReiverId.value = requestTab.id;
    selectedReiverId.value = requestTab?.receiver?.id;
    visibleSelect.value = true;
};

const closeEdit = () => {
    originReiverId.value = null;
    selectedReiverId.value = null;
    visibleSelect.value = false;
};
const updateReceiver = async (id: number) => {
    await Api.requestTab
        .updateReceiver(id, { receiver_id: selectedReiverId.value })
        .then(async (res: any) => {
            await tableCommon.value.refresh(filter.value);
            closeEdit();
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
</style>
