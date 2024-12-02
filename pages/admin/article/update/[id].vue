<template>
    <div class="update-user">
        <h2>Cập nhật bài viết</h2>

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
                    <div>
                        <Dropdown
                            class="mr-3 mt-2"
                            v-model="articleData.status"
                            :options="selection?.article_status"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Trạng thái"
                        />
                    </div>
                    <small class="error" v-if="articleDataError?.status">{{
                        articleDataError?.status[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <MDEditor
                        v-model="articleData.content"
                        :errors="articleDataError?.content"
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
                    <Button label="Cập nhật" @click="update()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import MDEditor from '~/components/Editor/MDEditor.vue';

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
    await getDetail();
});
const route = useRoute();
const id = Number(route.params.id);
const getDetail = async () => {
    await Api.article
        .show(id)
        .then((res: any) => {
            articleData.value = res.data;
        })
        .catch((err: any) => console.log(err));
};

const update = async () => {
    Api.article
        .update(id, articleData.value)
        .then((res: any) => {
            router.push('/admin/article/' + id);
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
