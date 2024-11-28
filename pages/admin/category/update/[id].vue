<template>
    <div class="update-category">
        <h1>Cập nhật Danh mục</h1>

        <div class="form mt-3">
            <div>
                <div class="mb-3">
                    <label for="name" class="block mb-1"
                        >Tên <span class="error">*</span></label
                    >
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
                    <TreeSelectCommon
                        v-model="categoryData.parent_id"
                        :options="selection?.categories"
                        name="category"
                        :error="categoryDataError?.parent_id"
                        label="Thuộc về danh mục"
                    ></TreeSelectCommon>
                </div>
                <div class="mb-3 flex justify-content-between">
                    <Button
                        label="Trở lại"
                        @click="back()"
                        severity="secondary"
                    ></Button>
                    <Button label="Lưu" @click="update()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import TreeSelectCommon from '~/components/General/TreeSelectCommon.vue';

definePageMeta({
    layout: 'admin',
});

const categoryData = ref({
    name: '',
    description: '',
    parent_id: null,
} as any);
const categoryDataError = ref({
    name: [],
    description: [],
    parent_id: [],
});
const router = useRouter();
const toast = useToast();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
const route = useRoute();
const id = Number(route.params.id);
onMounted(async () => {
    selection.value = await selectionStore.getData();
    await getCategory();
});

// const treeSelectValue = computed({
//     get() {
//         return categoryData.value.parent_id
//             ? { [categoryData.value.parent_id]: true } // Chuyển thành {number: true}
//             : null;
//     },
//     set(value) {
//         categoryData.value.parent_id = value
//             ? parseInt(Object.keys(value)[0])
//             : null; // Lấy số từ {number: true}
//     },
// });

const getCategory = async () => {
    Api.category
        .show(id)
        .then((res: any) => {
            categoryData.value = res.data;
        })
        .catch((err: any) => console.log(err));
};

const update = async () => {
    Api.category
        .update(id, categoryData.value)
        .then((res: any) => {
            router.push('/admin/category');
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

const back = () => {
    router.go(-1);
};
</script>

<style lang="scss" scoped>
.update-category {
    max-width: 600px;
}
</style>
