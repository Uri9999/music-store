<template>
    <div class="update-user">
        <HeaderPage title="Tạo bài viết"></HeaderPage>
        <div class="form mt-3">
            <div>
                <div class="mb-3">
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="articleData.title"
                        id="title"
                        placeholder="Tiêu đề"
                        fluid
                    />
                    <small class="error" v-if="articleDataError?.title">{{
                        articleDataError?.title[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <Dropdown
                        class="mr-3 mt-2"
                        v-model="articleData.status"
                        :options="selection?.article_status"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Trạng thái"
                    />
                    <small class="error" v-if="articleDataError?.title">{{
                        articleDataError?.title[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <MDEditor
                        v-model="articleData.content"
                        :errors="articleDataError?.content"
                        collection="article"
                        placeholder="Nội dung"
                    ></MDEditor>
                    <small class="error" v-if="articleDataError?.content">{{
                        articleDataError?.content[0]
                    }}</small>
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
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import MDEditor from '~/components/Editor/MDEditor.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const articleData = ref({
    title: '',
    content: '',
    status: 2,
});
const articleDataError = ref({
    title: [],
    content: [],
    status: [],
});
const router = useRouter();
const toast = useToast();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
});

const save = async () => {
    Api.article
        .store(articleData.value)
        .then((res: any) => {
            router.push('/admin/article');
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
                articleDataError.value = err.errors;
            }
        });
};

const back = () => {
    router.go(-1);
};
</script>

<style lang="scss" scoped></style>
