<template>
    <div class="mt-5">
        <h2>Danh sách bài tag</h2>
        <AllTag :tags="tags">
            <template #filter>
                <Dropdown
                    class="mr-3 mt-2"
                    v-model="sortKey"
                    :options="sortOptions"
                    optionLabel="label"
                    placeholder="Sort By Price"
                    @change="onSortChange($event)"
                />

                <Dropdown
                    class="mr-3 mt-2"
                    v-model="sortKey"
                    :options="sortOptions"
                    optionLabel="label"
                    placeholder="Sort By Sold"
                    @change="onSortChange($event)"
                />

                <Dropdown
                    class="mt-2"
                    v-model="sortKey"
                    :options="sortOptions"
                    optionLabel="label"
                    placeholder="Sort By Rate"
                    @change="onSortChange($event)"
                />
            </template>
        </AllTag>
        <div class="card">
            <Paginate></Paginate>
        </div>
    </div>
</template>
<script setup>
import AllTag from '~/components/Utils/AllTag.vue';
import Paginate from '~/components/General/Paginate.vue';
import Dropdown from 'primevue/dropdown';

const sortKey = ref();
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
]);
const onSortChange = (event) => {
    console.log('change');
};
const tags = ref([
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
<style scoped lang="scss"></style>
