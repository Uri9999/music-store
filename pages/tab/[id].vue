<template>
    <div class="pb-5">
        <h2 class="py-5">Tên bài hát: {{ tab.name }}</h2>
        <div class="card grid">
            <!-- card left -->
            <div class="col-12 md:col-6">
                <div class="grid">
                    <div class="col-3">
                        <div
                            class="item-img col-3"
                            v-for="(image, index) in tab.images_url"
                            :key="image?.id"
                            @click="toggleFirstImg(image.url)"
                        >
                            <img
                                :src="image.url"
                                alt=""
                                class="inline-block w-full"
                            />
                        </div>
                    </div>
                    <div class="image-main col-9">
                        <ImageCommon :src="imgFirst"></ImageCommon>
                    </div>
                </div>
            </div>
            <!-- card right -->
            <div class="product-content col-12 md:col-6">
                <TabView>
                    <TabPanel header="Thông tin">
                        <div class="product-info">
                            <div class="product-avatar">
                                <div class="avatar">
                                    <AvatarCommon
                                        :name="tab?.user?.name"
                                        :src="tab?.user?.avatar?.url"
                                    />
                                </div>
                                <span class="ml-3">{{ tab?.user?.name }}</span>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Tên bài hát:</div>
                            <div>{{ tab.name }}</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Tác giả:</div>
                            <div>{{ tab.author }}</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Thể loại:</div>
                            <div>{{ tab.category?.name }}</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Đánh giá:</div>
                            <div>
                                <span class="flex">
                                    <Rating
                                        v-model="tab.reviewTabsAvg"
                                        :cancel="false"
                                        class="mr-3"
                                    />{{ tab.reviewTabsAvg }} ({{
                                        tab.reviewTabsCount
                                    }})</span
                                >
                            </div>
                        </div>

                        <div class="product-info">
                            <div class="product-info__title">
                                Định dạng tệp:
                            </div>
                            <div>PDF</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Giá:</div>
                            <div class="price-value">
                                {{ formatNumberWithCommas(tab.price) }} VND
                            </div>
                        </div>
                        <div class="mt-5">
                            <Button
                                icon="pi pi-shopping-cart"
                                label="Thêm vào giỏ hàng"
                                class="custom mt-2"
                                @click="addToCart()"
                                v-if="!tab.pdf"
                            ></Button>
                            <Button
                                label="Download PDF"
                                v-if="tab.pdf"
                                icon="pi pi-download"
                                @click="downloadPdf"
                            />
                        </div>
                    </TabPanel>
                    <TabPanel header="Mô tả">
                        <p class="m-0">
                            {{ tab.description }}
                        </p>
                    </TabPanel>
                    <TabPanel header="Đánh giá">
                        <p class="m-0">
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga. Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
    <div class="mb-5">
        <h2 class="mb-3">Gợi ý dành cho bạn</h2>
        <Carousel></Carousel>
    </div>
</template>

<script setup lang="ts">
import Rating from 'primevue/rating';
import Carousel from '~/components/General/Carousel.vue';
import { useRoute, useRouter } from 'vue-router';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';
import { formatNumberWithCommas } from '#build/imports';
import ImageCommon from '~/components/General/ImageCommon.vue';
import AvatarCommon from '~/components/General/AvatarCommon.vue';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const tab = ref({} as any);
const imgFirst = ref();
onMounted(async () => {
    await getDetailTab(id);
});

const getDetailTab = async (id: number) => {
    await Api.tab
        .show(id)
        .then((res: any) => {
            console.log(res);
            tab.value = res.data;
            imgFirst.value = tab.value?.images_url[0].url;
        })
        .catch((err: any) => {
            console.log(err);
        });
};
const addToCart = async () => {
    await Api.cart
        .add({ tab_id: id })
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            if (err?.status == 401) {
                router.push('/login');
            }
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
        });
};
const toggleFirstImg = (url: string) => {
    imgFirst.value = url;
};
const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = tab.value.pdf.url;
    link.download = tab.value.name + '.pdf';
    link.target = '_blank';
    link.click();
};
</script>

<style scoped lang="scss">
.card {
    .thumbnail-img {
        img {
            padding: 10px;
            border-radius: 10px;
            width: 100%;
        }
    }
}

.product-info {
    pointer-events: none;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .product-info__title {
        width: 30%;
    }
}

.product-avatar {
    .avatar {
        width: 32px;
    }
    display: flex;
    align-items: center;
}

.price-value {
    font-size: 1.5rem;
}
.item-img {
    width: 100%;
    height: 20%;
    overflow: hidden;
    cursor: pointer;
}
</style>
