<template>
    <div class="pb-5">
        <h2 class="py-5">Tên bài hát: Chúc bé ngủ ngon</h2>
        <div class="card grid">
            <!-- card left -->
            <div class="col-12 md:col-6">
                <div>
                    <div class="image-main w-full">
                        <img
                            src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
                            class="inline-block w-full"
                            alt=""
                        />
                    </div>
                    <div class="list-img grid">
                        <div class="item-img col-3">
                            <img
                                src="https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg"
                                alt=""
                            />
                        </div>
                        <div class="item-img col-3">
                            <img
                                src="https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg"
                                alt=""
                            />
                        </div>
                        <div class="item-img col-3">
                            <img
                                src="https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg"
                                alt=""
                            />
                        </div>
                        <div class="item-img col-3">
                            <img
                                src="https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!-- card right -->
            <div class="product-content col-12 md:col-6">
                <TabView>
                    <TabPanel header="Thông tin">
                        <div class="product-info">
                            <div class="product-avatar">
                                <Avatar
                                    class="avatar-mobile"
                                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                                    shape="circle"
                                />
                                <span class="ml-3">Nguyễn Văn Nhất</span>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Tên bài hát:</div>
                            <div>Chuc be ngu ngon</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Tác giả:</div>
                            <div>Nguyen Nhat</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Thể loại:</div>
                            <div>Chuc be ngu ngon</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Đánh giá:</div>
                            <div>
                                <span class="flex">
                                    <Rating
                                        v-model="tag.rate"
                                        :cancel="false"
                                        class="mr-3"
                                    />3.7(21)</span
                                >
                            </div>
                        </div>

                        <div class="product-info">
                            <div class="product-info__title">Số trang:</div>
                            <div>3</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">
                                Định dạng tệp:
                            </div>
                            <div>PDF</div>
                        </div>
                        <div class="product-info">
                            <div class="product-info__title">Giá:</div>
                            <div class="price-value">3000 VND</div>
                        </div>
                        <div class="mt-5">
                            <Button
                                icon="pi-shopping-bag pi"
                                label="Mua ngay"
                                class="custom mr-3 mt-2"
                            ></Button>
                            <Button
                                icon="pi pi-shopping-cart"
                                label="Thêm vào giỏ hàng"
                                class="custom mt-2"
                            ></Button>
                        </div>
                    </TabPanel>
                    <TabPanel header="Mô tả">
                        <p class="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adipisci
                            velit, sed quia non numquam eius modi.
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

<script setup>
import Rating from 'primevue/rating';
import Carousel from '~/components/General/Carousel.vue';

const tag = ref({
    rate: 3,
});

const images = ref([
    {
        src: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        alt: 'Image 1',
    },
    {
        src: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 2',
    },
    {
        src: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        alt: 'Image 3',
    },
    {
        src: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 4',
    },
]);
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
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .product-info__title {
        width: 30%;
    }
}

.product-avatar {
    display: flex;
    align-items: center;
}

.price-value {
    font-size: 1.5rem;
}
</style>
