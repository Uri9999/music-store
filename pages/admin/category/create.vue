<template>
    <div class="update-user">
        <h1>Tạo Danh mục</h1>

        <div class="form mt-3">
            <div>
                <div class="mb-3">
                    <label for="name" class="block mb-1">Tên <span class="error">*</span></label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="categoryData.name"
                        id="name"
                        fluid
                    />
                    <small class="error" v-if="categoryDataError?.name">{{
                        categoryDataError?.name[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="description" class="block mb-1">Mô tả</label>
                    <Textarea
                        v-model="categoryData.description"
                        id="description"
                        class="w-full"
                        rows="5"
                        fluid
                    />
                    <small
                        class="error"
                        v-if="categoryDataError?.description"
                        >{{ categoryDataError?.description[0] }}</small
                    >
                </div>

                <div class="mb-3">
                    <label for="category" class="block mb-1"
                        >Thuộc về danh mục</label
                    >
                    <TreeSelect
                        v-model="categoryData.parent"
                        :options="selection?.categories"
                        dataKey="value"
                        placeholder="Select an item"
                        :selection-mode="'single'"
                        id="category"
                    />
                    <small class="error" v-if="categoryDataError?.parent_id">{{
                        categoryDataError?.parent_id[0]
                    }}</small>
                </div>
                <div class="mb-3 flex justify-content-between">
                    <Button label="Trở lại" severity="secondary"></Button>
                    <Button label="Lưu" @click="save()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import TreeSelect from 'primevue/treeselect';

definePageMeta({
    layout: 'admin',
});

const categoryData = ref({
    name: '',
    description: '',
    parent: null,
});
const categoryDataError = ref({
    name: [],
    description: [],
    parent_id: [],
});
const router = useRouter();
const toast = useToast();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
    console.log('selection.value', selection.value);
});

const save = async () => {
    const payload = {
        ...categoryData.value,
        parent_id: categoryData.value.parent
            ? parseInt(Object.keys(categoryData.value.parent)[0])
            : null,
    };
    Api.category
        .store(payload)
        .then((res: any) => {
            router.push('/admin/category')
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
            if (err?.status == 422) {
                categoryDataError.value = err.errors;
            }
        });
};
</script>

<style lang="scss" scoped>

</style>
