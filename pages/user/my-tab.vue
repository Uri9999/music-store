<template>
    <h2 class="my-5">Thông tin User</h2>
    <div class="profile mb-5">
        <div class="avatar">
            <Avatar
                class="avatar"
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
            />
        </div>
        <div class="info">
            <div class="info-item">
                <span class="info-column">Tên người soạn: </span>
                <span> Nguyen Van Nhat</span>
            </div>
            <div class="info-item">
                <span class="info-column">Ngày đăng ký:</span>
                <span> 20/11/2022</span>
            </div>
            <div class="info-item">
                <span class="info-column">Số lượng tag:</span>
                <span> 15</span>
            </div>
            <div class="info-item">
                <span class="info-column">Giới tính:</span>
                <span> Nam</span>
            </div>
        </div>
    </div>
    <div class="file">
        <h3 class="mb-3">Giới thiệu</h3>
        <div class="introduce">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
            velit, sed quia non numquam eius modi.
        </div>
        <div class="social mt-4 flex">
            <Button
                class="bg-red-600 hover:bg-red-700 text-white flex items-center px-4 py-2 border-transparent mr-3"
                @click="handleClick('https://www.youtube.com')"
            >
                <i class="pi pi-youtube text-2xl mr-2"></i>
                YouTube
            </Button>
            <Button
                class="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 border-transparent"
                @click="handleClick('https://www.facebook.com')"
            >
                <i class="pi pi-facebook text-2xl mr-2"></i>
                Facebook
            </Button>
        </div>
    </div>
    <div class="products mb-3">
        <AllTag :tabs="tabs">
            <template #filter>
                <h3 class="h-full flex align-items-end">
                    Sản phẩm tạo bởi user
                </h3>
            </template>
        </AllTag>
        <Paginate></Paginate>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AllTag from '~/components/Utils/AllTag.vue';
import Paginate from '~/components/General/Paginate.vue';

const tabs = ref([
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 1',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 2',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'OUTOFSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'OUTOFSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'LOWSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'LOWSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'OUTOFSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
    {
        image: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg',
        alt: 'Image 3',
        name: 'Product Name',
        inventoryStatus: 'INSTOCK',
        price: 20,
    },
]);
</script>

<style scoped lang="scss">
.profile {
    margin-top: 20px;
    margin-left: 20px;
    display: flex;
    .avatar {
        width: 70px;
        display: inline-block;
        margin-right: 20px;
        div {
            width: 100%;
            display: inline-block;
        }
    }
    .info {
        font-size: 1rem;
        .info-item {
            display: flex;

            .info-column {
                font-weight: bold;
                display: inline-block;
                width: 120px;
            }
        }
    }
}

.introduce {
    font-size: 1.1rem;
}
</style>
