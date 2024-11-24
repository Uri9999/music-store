<template>
    <div>
        <h2 class="mb-3">Danh sách user</h2>
        <div>
            <DataTable
                :value="users"
                dataKey="id"
            >
                <template #header>
                    <div
                        class="flex flex-wrap gap-2 align-items-center justify-content-between"
                    >
                        <div>
                            <Button
                                type="button"
                                icon="pi pi-filter-slash"
                                label="Clear"
                                outlined
                                @click="clearFilter()"
                            />
                        </div>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText
                                v-model="filter.search_name"
                                placeholder="Tìm kiếm..."
                            />
                        </IconField>
                    </div>
                </template>
                <Column
                    field="name"
                    header="Tên"
                    style="min-width: 12rem"
                ></Column>
                <Column
                    field="email"
                    header="Email"
                    style="min-width: 16rem"
                ></Column>
                <Column
                    field="status"
                    header="Trạng thái"
                    style="min-width: 8rem"
                >
                    <template #body="slotProps">
                        {{ slotProps.data.price }}
                    </template>
                </Column>
                <Column
                    field="role_id"
                    header="Quyền"
                    style="min-width: 10rem"
                ></Column>
                <Column
                    field="gender"
                    header="Giới tính"
                    style="min-width: 10rem"
                ></Column>
                <Column
                    field="dob"
                    header="Ngày sinh"
                    style="min-width: 10rem"
                ></Column>
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
                            severity="danger"
                            @click=""
                        />
                    </template>
                </Column>
                <!-- <template #footer>
                    <div>footer</div>
                </template> -->
            </DataTable>
            <Paginator
                :rows="paginator.perPage"
                :totalRecords="paginator.total"
                :first="(paginator.currentPage - 1) * paginator.perPage"
                @page="onPageChange"
            ></Paginator>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Api from '~/network/Api';

definePageMeta({
    layout: 'admin',
});

onMounted(async () => {
    await getUser();
});

const users = ref([]);
const filter = ref({
    search_name: null,
    status: null,
    role_id: null,
    gender: null,
});
const paginator = ref({} as any);

const getUser = async () => {
    await Api.user
        .index(filter.value)
        .then((res: any) => {
            users.value = res.data;
            console.log('r', res);
            paginator.value = res.meta;
        })
        .catch((err) => console.log(err));
};
const clearFilter = () => {
    filter.value = {
        search_name: null,
        status: null,
        role_id: null,
        gender: null,
    };
};

const onPageChange = (event: any) => {
    // currentPage.value = event.first / tabsPagination.value.perPage + 1;
};
</script>
