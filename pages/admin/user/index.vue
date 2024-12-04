<template>
    <HeaderPage title="Danh sách User"> </HeaderPage>
    <TableCommon ref="tableCommon" :apiFunction="fetchUsers">
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
                        :options="selection?.user_status"
                        optionLabel="label"
                        optionValue="value"
                        filter
                        placeholder="Trạng thái"
                        :maxSelectedLabels="3"
                    />
                    <MultiSelect
                        v-model="filter.roles"
                        :options="selection?.user_role"
                        optionLabel="label"
                        optionValue="value"
                        filter
                        placeholder="Cấp bậc"
                        :maxSelectedLabels="3"
                    />
                    <MultiSelect
                        v-model="filter.genders"
                        :options="selection?.user_gender"
                        optionLabel="label"
                        optionValue="value"
                        filter
                        placeholder="Giới tính"
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
                            v-model="filter.search_name"
                        />
                    </IconField>
                    <Button @click="search()">Tìm kiếm</Button>
                </div>
            </div>
        </template>

        <Column field="name" header="Tên" style="min-width: 12rem"></Column>
        <Column field="email" header="Email" style="min-width: 12rem"></Column>
        <Column field="status" header="Trạng thái">
            <template #body="slotProps">
                <span class="status-unactive" v-if="slotProps.data.status == 0"
                    >Chưa kích hoạt</span
                >
                <span
                    class="status-active"
                    v-else-if="slotProps.data.status == 1"
                    >Hoạt động</span
                >
                <span class="status-locked" v-else>Khóa</span>
            </template>
        </Column>
        <Column field="role_id" header="Cấp bậc">
            <template #body="slotProps">
                <span class="role-admin" v-if="slotProps.data.role_id == 1"
                    >Admin</span
                >
                <span class="role-staff" v-else-if="slotProps.data.role_id == 2"
                    >Staff</span
                >
                <span
                    class="role-affiliate"
                    v-else-if="slotProps.data.role_id == 3"
                    >Afiliate</span
                >
                <span class="role-user" v-else>Khách hàng</span>
            </template>
        </Column>
        <Column field="gender" header="Giới tính">
            <template #body="slotProps">
                <span class="gender-male" v-if="slotProps.data.gender == 1"
                    >Nam</span
                >
                <span class="gender-female" v-else>Nữ</span>
            </template>
        </Column>
        <Column field="dob" header="Ngày sinh"></Column>
        <Column :exportable="false" header="Hành động" style="min-width: 12rem">
            <template #body="slotProps">
                <Button
                    icon="pi pi-pencil"
                    outlined
                    rounded
                    class="mr-2"
                    @click="gotoEditUser(slotProps.data.id)"
                />

                <Button
                    icon="pi pi-lock"
                    outlined
                    rounded
                    class="mr-2"
                    severity="danger"
                    @click="confirmLock(slotProps.data.id)"
                    v-if="
                        slotProps.data.status != 2 &&
                        slotProps.data.role_id != 1
                    "
                />
                <Button
                    icon="pi pi-lock-open"
                    outlined
                    rounded
                    severity="info"
                    @click="confirmUnlock(slotProps.data.id)"
                    v-if="
                        slotProps.data.status == 2 &&
                        slotProps.data.role_id != 1
                    "
                />
            </template>
        </Column>
    </TableCommon>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import { useConfirm } from 'primevue/useconfirm';
import { useSelectionStore } from '~/stores/selectionStore';
import type { Selection, Item } from '~/types/selection';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
});

const router = useRouter();
const toast = useToast();
const tableCommon = ref<any>();
const confirm = useConfirm();
const filter = ref({
    search_name: null,
    status: null,
    roles: null,
    genders: null,
});

const fetchUsers = (payload: any) => {
    return Api.user.index(payload);
};

const confirmLock = (id: number) => {
    confirm.require({
        header: 'Xác nhận khóa tài khoản',
        message: 'Bạn có chắc chắn muốn khóa tài khoản ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Khóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await lockUser(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
    });
};
const confirmUnlock = (id: number) => {
    confirm.require({
        header: 'Xác nhận mở khóa tài khoản',
        message: 'Bạn có chắc chắn muốn mở khóa tài khoản ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Mở khóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await unlockUser(id);
            tableCommon.value.refresh();
        },
        reject: () => {},
    });
};
const lockUser = async (id: number) => {
    await Api.user
        .lock(id)
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
const unlockUser = async (id: number) => {
    await Api.user
        .unlock(id)
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
const clearFilter = async () => {
    filter.value = {
        search_name: null,
        status: null,
        roles: null,
        genders: null,
    };
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};
const gotoEditUser = (id: number) => {
    router.push('/admin/user/update/' + id);
};
</script>
<style scoped lang="scss">
.status-active {
    background-color: rgb(5, 187, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-unactive {
    background-color: rgb(197, 197, 197);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-locked {
    background-color: rgb(202, 3, 3);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
</style>
