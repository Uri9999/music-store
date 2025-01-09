<template>
    <HeaderPage title="Danh sách Blog" class="mt-3 mb-3"> </HeaderPage>
    <div class="grid-container">
        <div
            class="article-item"
            v-for="(article, index) in articles"
            :key="index"
        >
            <div
                class="article-img"
                @click="gotoDetail(article.slug)"
                :style="{
                    backgroundImage:
                        'url(' + extractFirstImageUrl(article.content) + ')',
                }"
            ></div>
            <div class="article-info mt-2">
                <div class="flex align-items-center my-2 article-author">
                    <div class="avatar-info">
                        <AvatarCommon
                            :name="article.user.name"
                            :src="article.user.avatar?.url"
                        />
                    </div>
                        <div class="ml-2">{{ article.user.name }}</div>
                </div>
                <div class="title" @click="gotoDetail(article.slug)">
                    {{ article.title }}
                </div>
            </div>
        </div>
    </div>
    <div>
        <Paginator
            :rows="paginator?.perPage"
            :totalRecords="paginator?.total"
            :first="(paginator?.currentPage - 1) * paginator?.perPage"
            @page="onPageChange"
        ></Paginator>
    </div>
</template>

<script lang="ts" setup>
import AvatarCommon from '~/components/General/AvatarCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import Api from '~/network/Api';
import type { ArticleType } from '~/types/article';
import { extractFirstImageUrl } from '~/utils/function';

const currentPage = ref(1);
const articles = ref([] as ArticleType[]);
const paginator = ref();
onMounted(async () => {
    await getArticle();
});
const router = useRouter();
const getArticle = async () => {
    await Api.article
        .getArticle({ page: currentPage.value })
        .then((res: any) => {
            articles.value = res.data;
            paginator.value = res.meta;
        })
        .catch();
};
const onPageChange = (event: any) => {
    currentPage.value = event.page + 1;
    getArticle();
};
const gotoDetail = (slug: string) => {
    router.push('/article/' + slug);
};
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
.article-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    aspect-ratio: 2 / 1;
    overflow: hidden;
}
.article-info {
    .title {
        font-size: 1.3rem;
        cursor: pointer;
    }
}

.article-item {
    // height: 250px;
}
.avatar-info {
    width: 30px;
    height: 30px;
}
</style>
