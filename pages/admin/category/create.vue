<template>
    <HeaderPage title="Tạo Danh mục"> </HeaderPage>
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
                <small class="error" v-if="categoryDataError?.description">{{
                    categoryDataError?.description[0]
                }}</small>
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
                    severity="secondary"
                    @click="back()"
                ></Button>
                <Button label="Lưu" @click="save()"></Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import TreeSelectCommon from '~/components/General/TreeSelectCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const categoryData = ref({
    name: '',
    description: '',
    parent_id: null,
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
});

const save = async () => {
    Api.category
        .store(categoryData.value)
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

<style lang="scss" scoped></style>
