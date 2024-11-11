<template>
    <div class="card">
        <DataView :value="products" :layout="layout">
            <template #header>
                <div class="filter">
                    <!-- fillter -->
                    <div>
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
                    </div>
                    <DataViewLayoutOptions
                        v-model="layout"
                        class="mt-2 filter-layer"
                    />
                </div>
            </template>

            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        class="col-12"
                    >
                        <TagTypeList :item="item"></TagTypeList>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-nogutter">
                    <div
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        class="col-6 sm:col-6 md:col-4 xl:col-3 p-2"
                    >
                        <Tag :item="item"></Tag>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DisplayRateStars from '../General/DisplayRateStars.vue';
import Tag from '../General/Tag.vue';
import TagTypeList from '../General/TagTypeList.vue';

const sortKey = ref();
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
]);
const products = ref([
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
const layout = ref('list'); // grid

const onSortChange = (event) => {
    console.log('change');
};
</script>

<style scoped>
.filter {
    display: flex;
    justify-content: space-between;
}

.filter-layer {
    min-width: 100px;
    display: flex;
    justify-content: end;
    height: 38px;
}
</style>
