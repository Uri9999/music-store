<template>
    <div class="request-tab">
        <h2 class="title">Danh sách yêu cầu tab của bạn</h2>
        <Button
            label="Tạo yêu cầu tab"
            class="custom"
            @click="openCreateTab()"
        />
        <DataTable :value="tabs" tableStyle="min-width: 50rem">
            <Column field="name" header="Tên"></Column>
            <Column field="author" header="Tác giả"> </Column>
            <Column field="status" header="Trạng thái">
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
                        />
                        <Button
                            label="Xóa"
                            severity="danger"
                            :disabled="slotProps.data.status !== 0"
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
            <label for="name" class="font-semibold w-24 block mb-1">Bài hát</label>
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
            <label for="author" class="font-semibold w-24 block mb-1">Tác giả</label>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const tabs = ref([]);
onMounted(async () => {
    await getTab();
});

const getTab = async () => {
    await Api.requestTab
        .getCreatedByMy()
        .then((res: any) => {
            console.log('res', res);
            tabs.value = res.data;
        })
        .catch((err) => {
            console.log(err);
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
};
const closeCreateTab = () => {
    visibleCreate.value = false;
};
const saveTab = async () => {
    console.log('tabData.value', tabData.value);

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
