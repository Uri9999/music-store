<template>
    <div class="card">
        <Carousel
            :value="articles"
            :numVisible="4"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            :circular="true"
            :autoplayInterval="3000"
            :showIndicators="false"
            :showNavigators="false"
        >
            <template #item="slotProps">
                <div class="border-1 surface-border m-2 article-item">
                    <div
                        class="article-img"
                        @click="gotoDetail(slotProps.data.slug)"
                        :style="{
                            backgroundImage:
                                'url(' +
                                extractFirstImageUrl(slotProps.data.content) +
                                ')',
                        }"
                    ></div>
                    <p class="article-title font-medium ellipsis">
                        {{ slotProps.data.title }}
                    </p>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { extractFirstImageUrl } from '~/utils/function';
import Api from '~/network/Api';

const articles = ref([]);
onMounted(async () => {
    await Api.article
        .getRandomArticle()
        .then((res: any) => {
            articles.value = res.data;
        })
        .catch((err: any) => console.log(err));
});

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '350px',
        numVisible: 2,
        numScroll: 1,
    },
]);

const router = useRouter();
const gotoDetail = (slug: string) => {
    router.push('/article/' + slug);
};
</script>

<style scoped lang="scss">
.article-item {
    border-radius: 3px;
}
.article-title {
    margin: 10px;
    height: 80px;
    overflow: hidden; /* Ẩn nội dung tràn */
    display: -webkit-box; /* Tạo hộp flex */
    // -webkit-line-clamp: 2; /* Hiển thị tối đa 2 dòng */
    -webkit-box-orient: vertical; /* Định hướng dọc */
    text-overflow: ellipsis; /* Thêm dấu "..." */
}
.article-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    aspect-ratio: 2 / 1;
    overflow: hidden;
}
</style>
