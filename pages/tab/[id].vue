<template>
    <div class="pb-5">
        <h2 class="py-5">Tên bài hát: {{ tab.name }}</h2>
        <div class="card mx-2 grid">
            <div class="col-12 md:col-6">
                <div class="grid">
                    <div class="col-3 list-img grid">
                        <div
                            class="item-img col-3"
                            v-for="(image, index) in tab.images_url"
                            :key="image?.id"
                            @click="toggleFirstImg(image.url)"
                            :class="{
                                'active-img': image.url == imgFirst,
                            }"
                        >
                            <div class="">
                                <BackgroundImageCommon
                                    :src="image.url"
                                ></BackgroundImageCommon>
                            </div>
                        </div>
                    </div>
                    <div class="image-main col-9">
                        <ImageCommon
                            :src="imgFirst"
                            :style="'width: auto; height: 100%;'"
                        ></ImageCommon>
                    </div>
                </div>
            </div>
            <div class="product-content col-12 md:col-6">
                <TabView>
                    <TabPanel header="Thông tin">
                        <div class="product-info">
                            <div class="product-info__title">Người soạn:</div>
                            <div>
                                <div class="product-avatar">
                                    <div class="avatar">
                                        <AvatarCommon
                                            :name="tab?.user?.name"
                                            :src="tab?.user?.avatar?.url"
                                        />
                                    </div>
                                    <span class="ml-3">{{
                                        tab?.user?.name
                                    }}</span>
                                </div>
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
                        <div class="rate-review">
                            <div
                                v-if="tab?.reviewTabs?.length"
                                v-for="(review, index) in tab.reviewTabs"
                                :key="index"
                                class="pb-2 mb-2 comment"
                            >
                                <div class="flex align-items-center mb-2">
                                    <div
                                        class="avatar-info flex align-items-center mr-3"
                                    >
                                        <AvatarCommon
                                            :name="review.user.name"
                                            :src="review.user?.avatar?.url"
                                        />
                                    </div>
                                    <div>
                                        <div>{{ review.user.name }}</div>
                                        <div>
                                            <Rating
                                                v-model="review.rating"
                                                :cancel="false"
                                                class="mr-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p class="comment-review">
                                    {{ review.comment }}
                                </p>
                            </div>
                            <div v-else>Không có đánh giá</div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
    <div class="mb-5">
        <h2 class="mb-3">Bài viết dành cho bạn</h2>
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
import BackgroundImageCommon from '~/components/General/BackgroundImageCommon.vue';

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
        height: 32px;
    }
    display: flex;
    align-items: center;
}

.price-value {
    font-size: 1.5rem;
}
.item-img {
    width: 100%;
    height: 22%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgb(231, 231, 231);
}
.avatar-info {
    width: 40px;
    height: 40px;
}
.rate-review {
    overflow-y: scroll;
    max-height: 400px;
}
.comment {
    border-bottom: 1px solid rgb(231, 231, 231);
}
.comment-review {
    margin-left: 56px;
}
.product-content {
    min-height: 450px;
}
.active-img {
    border: 1px solid rgb(0, 182, 0);
}
.image-main {
    height: 450px;
}
</style>
