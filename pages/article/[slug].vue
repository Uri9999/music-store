<template>
    <HeaderPage title="Chi tiết bài viết" class="mt-3 mb-3"> </HeaderPage>
    <div>
        <h2 class="title flex justify-content-center">{{ article?.title }}</h2>
        <div class="flex align-items-center my-2 article-author">
            <div class="avatar-info">
                <AvatarCommon
                    :name="article.user?.name"
                    :src="article.user?.avatar?.url"
                />
            </div>
            <span class="ml-3">{{ article.user?.name }}</span>
        </div>
        <div class="content">
            <MdPreview editorId="show-article" :modelValue="article?.content" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import { MdPreview } from 'md-editor-v3';
import HeaderPage from '~/components/General/HeaderPage.vue';
import type { ArticleType } from '~/types/article';
import AvatarCommon from '~/components/General/AvatarCommon.vue';

const article = ref({} as ArticleType);
const route = useRoute();
const slug = String(route.params.slug);
onMounted(async () => {
    await Api.article
        .getDetailArticle(slug)
        .then((res: any) => {
            article.value = res.data;
        })
        .catch((err: any) => {});
});
</script>

<style lang="scss" scoped>
.title {
    font-size: 2.5rem;
    margin-top: 30px;
    margin-bottom: 20px;
}

.content {
    max-width: 900px;
    margin: 0 auto;
    margin-bottom: 50px;
    min-height: 70vh;
}

.avatar-info {
    width: 30px;
    height: 30px;
}
</style>
