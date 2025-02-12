<template>
    <HeaderPage :title="'Tên bài hát: ' + tab.name" class="mt-5 mb-5">
    </HeaderPage>
    <div class="pb-5">
        <div class="card mx-2 grid">
            <div class="col-12 md:col-6">
                <div class="grid">
                    <div class="col-3 list-img grid">
                        <div
                            class="item-img col-3"
                            v-for="(image, index) in tab.images_url"
                            :key="index"
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
                            v-if="imgFirst"
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
                            <PriceCommon
                                :value="
                                    tab.discount_money != 0
                                        ? tab.discount_money
                                        : tab.price
                                "
                                class="mr-3"
                            ></PriceCommon>
                            <PriceCommon
                                v-if="tab.discount_money != 0"
                                :value="tab.price"
                                :textDecoration="'line-through'"
                                :font-size="'1rem'"
                                :color="'#929292'"
                            ></PriceCommon>
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
                                label="Tải về"
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
import ImageCommon from '~/components/General/ImageCommon.vue';
import AvatarCommon from '~/components/General/AvatarCommon.vue';
import BackgroundImageCommon from '~/components/General/BackgroundImageCommon.vue';
import { useCartStore } from '~/stores/cartStore';
import HeaderPage from '~/components/General/HeaderPage.vue';
import PriceCommon from '~/components/General/PriceCommon.vue';
import type { Tab } from '~/types/tab';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const slug = String(route.params.slug);
const tab = ref({} as Tab);
const imgFirst = ref();
onMounted(async () => {
    await getDetailTab(slug);
});

const getDetailTab = async (slug: string) => {
    await Api.tab
        .show(slug)
        .then((res: any) => {
            tab.value = res.data;
            imgFirst.value = tab.value?.images_url[0]?.url;
        })
        .catch((err: any) => {
            console.log(err);
        });
};
const addToCart = async () => {
    await Api.cart
        .add({ tab_id: tab.value.id })
        .then(async (res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            await cartStore.getCount();
            console.log(cartStore.count);
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
.list-img {
    display: flex;
    flex-direction: column;
    .item-img {
        margin-bottom: 10px;
    }
}
</style>
