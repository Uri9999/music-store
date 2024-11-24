<template>
    <div>
        <h2>Danh sách User</h2>
        <TableCommon ref="tableCommon" :apiFunction="fetchUsers">
            <template #header>
                <div
                    class="flex flex-wrap gap-2 align-items-center justify-content-between"
                >
                    <div>
                        <!-- <Button
                            type="button"
                            icon="pi pi-filter-slash"
                            label="Clear"
                            outlined
                            @click=""
                        /> -->
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
                        <Button>Tìm kiếm</Button>
                    </div>
                </div>
            </template>

            <Column field="name" header="Tên" style="min-width: 12rem"></Column>
            <Column
                field="email"
                header="Email"
                style="min-width: 12rem"
            ></Column>
            <Column field="status" header="Trạng thái">
                <template #body="slotProps">
                    <span
                        class="status-unactive"
                        v-if="slotProps.data.status == 0"
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
                    <span class="role-admin" v-if="slotProps.data.role_id == 0"
                        >Admin</span
                    >
                    <span
                        class="role-staff"
                        v-else-if="slotProps.data.status == 1"
                        >Staff</span
                    >
                    <span
                        class="role-affiliate"
                        v-else-if="slotProps.data.status == 1"
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
                        @click=""
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
    </div>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';
import { useConfirm } from 'primevue/useconfirm';

definePageMeta({
    layout: 'admin',
});

const toast = useToast();
const tableCommon = ref<any>();
const confirm = useConfirm();
const filter = ref({
    search_name: null,
    status: null,
    role_id: null,
    gender: null,
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
        acceptLabel: 'Xóa',
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
        acceptLabel: 'Xóa',
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
    Api.user
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
    Api.user
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
