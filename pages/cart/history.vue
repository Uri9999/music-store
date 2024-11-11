<template>
    <div class="card my-5 pb-5">
        <DataTable
            scrollable
            :value="products"
            dataKey="id"
            tableStyle="min-width: 50rem"
        >
            <template #header>
                <div
                    class="flex flex-wrap align-items-center justify-content-between gap-2"
                >
                    <span class="text-xl text-900 font-bold"
                        >Lịch sử mua hàng</span
                    >
                </div>
            </template>
            <Column field="name" header="Tên">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>
            <Column header="Ảnh">
                <template #body="slotProps">
                    <img
                        src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
                        class="w-6rem border-round"
                    />
                </template>
            </Column>
            <Column field="price" header="Giá">
                <template #body="slotProps">
                    {{ slotProps.data.price }} VND
                </template>
            </Column>
            <Column field="category" header="Danh mục"></Column>
            <Column field="user_name" header="Người soạn"></Column>
            <Column field="date" header="Ngày mua"></Column>

            <template #footer>
                <div>
                    Tổng số sản phẩm
                    {{ products ? products.length : 0 }}
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedProduct = ref([]);

const products = ref([
    {
        id: 1,
        name: 'Chuc be ngu ngon',
        category: 'Bai hat',
        price: 3000,
        rating: 3,
        image: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        user_name: 'Nguyen Van Nhat',
        date: '22/12/2024',
    },
    {
        id: 2,
        name: 'Chuc be ngu ngon',
        category: 'Bai hat',
        price: 3000,
        rating: 3,
        image: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        user_name: 'Nguyen Van Nhat',
        date: '22/12/2024',
    },
    {
        id: 3,

        name: 'Chuc be ngu ngon',
        category: 'Bai hat',
        price: 3000,
        rating: 3,
        image: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        user_name: 'Nguyen Van Nhat',
        date: '22/12/2024',
    },
    {
        id: 4,

        name: 'Chuc be ngu ngon',
        category: 'Bai hat',
        price: 3000,
        rating: 3,
        image: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        user_name: 'Nguyen Van Nhat',
        date: '22/12/2024',
    },
    {
        id: 5,

        name: 'Chuc be ngu ngon',
        category: 'Bai hat',
        price: 3000,
        rating: 3,
        image: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        user_name: 'Nguyen Van Nhat',
        date: '22/12/2024',
    },
    {
        id: 6,

        name: 'Chuc be ngu ngon',
        category: 'Bai hat',
        price: 3000,
        rating: 3,
        image: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg',
        user_name: 'Nguyen Van Nhat',
        date: '22/12/2024',
    },
]);
</script>

<style scoped lang="scss">
.footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>
