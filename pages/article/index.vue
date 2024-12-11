<template>
    <div class="grid-container">
        <div v-for="(article, index) in articles" :key="index">
            <div class="article-img"  :style="{ backgroundImage: 'url(' + extractFirstImageUrl(article.content) + ')' }">
                <!-- <img :src="extractFirstImageUrl(article.content)" alt=""> -->
            </div>
            <div class="article-info">
                <div class="title">{{ article.title }}</div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { ArticleType } from '~/types/article';
import { extractFirstImageUrl } from '~/utils/function';

const articles = ref([] as ArticleType[]);
onMounted(async () => {
    await getArticle();
});
const getArticle = async () => {
    await Api.article
        .getArticle()
        .then((res: any) => {
            articles.value = res.data;
        })
        .catch();
};
</script>

<style lang="scss" scoped>
.grid-container {
    min-height: 70vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px; /* khoảng cách giữa các phần tử */
}
.article-img {
    background-size: cover;
    background-position: center;
     background-repeat: no-repeat;
    // height: 200px;
    aspect-ratio: 2 / 1;
    overflow: hidden;
}
.article-info {
    .title {
        font-size: 1.3rem;
    }
}
</style>
