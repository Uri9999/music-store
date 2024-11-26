<template>
    <div>
        <h2 class="mb-2">Danh sách yêu cầu</h2>
        <TableCommon ref="tableCommon" :apiFunction="fetchRequests">
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
                    <span>{{ slotProps.data?.receiver?.name }}</span>
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
                        @click="editRequestTab(slotProps.data.id)"
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
    search: '',
});
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
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

const editRequestTab = (id: number) => {

}
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
