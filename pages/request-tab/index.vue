<template>
    <HeaderPage class="mt-5 mb-3" title="Danh sách yêu cầu của bạn">
    </HeaderPage>
    <div class="request-tab">
        <Button
            label="Tạo yêu cầu tab"
            class="custom"
            @click="openCreateTab()"
        />
        <DataTable :value="tabs" tableStyle="min-width: 50rem">
            <Column field="name" header="Tên"></Column>
            <Column field="author" header="Tác giả"> </Column>
            <Column field="status" header="Trạng thái" style="min-width: 12rem">
                <template #body="slotProps">
                    {{ getStatus(slotProps.data.status) }}
                </template>
            </Column>
            <Column field="receiver" header="Người nhận">
                <template #body="slotProps">
                    {{ slotProps.data?.receiver?.name }}
                </template>
            </Column>
            <Column field="action" header="Hành động">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button
                            label="Sửa"
                            severity="success"
                            :disabled="slotProps.data.status !== 0"
                            @click="openEditTab(slotProps.data)"
                        />
                        <Button
                            label="Xóa"
                            severity="danger"
                            outlined
                            :disabled="slotProps.data.status !== 0"
                            @click="
                                confirmDelete(
                                    slotProps.data.id,
                                    slotProps.data.name,
                                )
                            "
                        />
                    </div>
                </template>
            </Column>
            <template #footer>
                Tổng số lượng
                {{ tabs ? tabs.length : 0 }} tab.
            </template>
        </DataTable>
    </div>

    <Dialog
        v-model:visible="visibleCreate"
        modal
        header="Tạo tab"
        :style="{ width: '25rem' }"
    >
        <div class="mb-2">
            <label for="name" class="font-semibold w-24 block mb-1"
                >Bài hát</label
            >
            <InputText
                id="name"
                class="flex-auto w-full"
                v-model="tabData.name"
                autocomplete="off"
            />
            <small class="error" v-if="tabDataError?.name">{{
                tabDataError?.name[0]
            }}</small>
        </div>
        <div class="mb-2">
            <label for="author" class="font-semibold w-24 block mb-1"
                >Tác giả</label
            >
            <InputText
                id="author"
                class="flex-auto w-full"
                v-model="tabData.author"
                autocomplete="off"
            />
            <small class="error" v-if="tabDataError?.author">{{
                tabDataError?.author[0]
            }}</small>
        </div>
        <div class="flex justify-content-end gap-2 mt-4">
            <Button
                type="button"
                label="Đóng"
                severity="secondary"
                @click="closeCreateTab"
            ></Button>
            <Button type="button" label="Lưu" @click="saveTab"></Button>
        </div>
    </Dialog>

    <Dialog
        v-model:visible="visibleEdit"
        modal
        header="Sửa tab"
        :style="{ width: '25rem' }"
    >
        <div class="mb-2">
            <label for="name" class="font-semibold w-24 block mb-1"
                >Bài hát</label
            >
            <InputText
                id="name"
                class="flex-auto w-full"
                v-model="tabEditData.name"
                autocomplete="off"
            />
            <small class="error" v-if="tabEditDataError?.name">{{
                tabEditDataError?.name[0]
            }}</small>
        </div>
        <div class="mb-2">
            <label for="author" class="font-semibold w-24 block mb-1"
                >Tác giả</label
            >
            <InputText
                id="author"
                class="flex-auto w-full"
                v-model="tabEditData.author"
                autocomplete="off"
            />
            <small class="error" v-if="tabEditDataError?.author">{{
                tabEditDataError?.author[0]
            }}</small>
        </div>
        <div class="flex justify-content-end gap-2 mt-4">
            <Button
                type="button"
                label="Đóng"
                severity="secondary"
                @click="closeEditTab"
            ></Button>
            <Button type="button" label="Lưu" @click="updateTab"></Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import HeaderPage from '~/components/General/HeaderPage.vue';

const confirm = useConfirm();
const toast = useToast();
const tabs = ref([]);
const router = useRouter();
onMounted(async () => {
    await getTab();
});

const getTab = async () => {
    await Api.requestTab
        .getCreatedByMy()
        .then((res: any) => {
            tabs.value = res.data;
        })
        .catch((err) => {
            if (err?.status == 401) {
                router.push('/login');
            }
        });
};

const getStatus = (status: number) => {
    switch (status) {
        case 0:
            return 'Khởi tạo';

        case 1:
            return 'Đang thực hiện';

        case 2:
            return 'Đã hoàn thành';

        default:
            return null;
    }
};

// Create
const visibleCreate = ref(false);
const tabData = ref({
    name: '',
    author: '',
});
const tabDataError = ref({
    name: [],
    author: [],
});
const openCreateTab = () => {
    visibleCreate.value = true;
    tabData.value = {
        name: '',
        author: '',
    };
    tabDataError.value = {
        name: [],
        author: [],
    };
};
const closeCreateTab = () => {
    visibleCreate.value = false;
};
const saveTab = async () => {
    Api.requestTab
        .store(tabData.value)
        .then(async (res: any) => {
            closeCreateTab();
            await getTab();
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                tabDataError.value = err.errors;
            }
        });
};

// Delete
const confirmDelete = (id: number, name: string) => {
    confirm.require({
        header: 'Xóa yêu cầu',
        message:
            'Bạn có thực sự muốn xóa yêu cầu tạo tab cho bài hát "' +
            name +
            '" không ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteTab(id);
            await getTab();
        },
        reject: () => {},
    });
};
const deleteTab = async (id: number) => {
    await Api.requestTab
        .delete(id)
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err) => {
            console.log(err);
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
        });
};

// Sửa
const visibleEdit = ref(false);
const tabEditData = ref({
    id: 1,
    name: '',
    author: '',
});
const tabEditDataError = ref({
    name: [],
    author: [],
});
const openEditTab = (tab: any) => {
    visibleEdit.value = true;
    tabEditData.value.name = tab.name;
    tabEditData.value.author = tab.author;
    tabEditData.value.id = tab.id;

    tabEditDataError.value = {
        name: [],
        author: [],
    };
};
const closeEditTab = () => {
    visibleEdit.value = false;
};

const updateTab = async () => {
    await Api.requestTab
        .update(tabEditData.value.id, tabEditData.value)
        .then(async (res: any) => {
            closeEditTab();
            await getTab();
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err) => {
            console.log(err);
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                tabEditDataError.value = err.errors;
            }
        });
};
</script>

<style scoped lang="scss">
.title {
    margin-top: 20px;
    margin-bottom: 10px;
}
.request-tab {
    min-height: 70vh;
}
</style>
