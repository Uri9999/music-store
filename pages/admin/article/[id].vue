<template>
    <HeaderPage title="Chi tiết bài viết"></HeaderPage>
    <div>
        <h1 class="mb-5 title">{{ articleData.title }}</h1>
        <div>
            <MdPreview
                editorId="show-article"
                :modelValue="articleData.content"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MdPreview } from 'md-editor-v3';
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const articleData = ref({
    title: '',
    content: '',
    status: 2,
});

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
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: center;
}
</style>
