<template>
    <Galleria></Galleria>

    <div class="mt-3 tag-container mb-5">
        <div class="table-tag">
            <h2 class="py-3">Sản phẩm mới</h2>
            <div class="grid-container">
                <Tag
                    classes="item"
                    v-for="(item, index) in newTab"
                    :key="index"
                    :item="item"
                ></Tag>
            </div>
        </div>
        <div class="list-tag">
            <h2 class="py-3">Bài tab bán chạy</h2>
            <ListTag></ListTag>
        </div>
    </div>

    <div class="">
        <h2>Danh sách bài tab</h2>
        <AllTag :tabs="tabs">
            <template #filter>
                <Dropdown
                    class="mr-3 mt-2"
                    v-model="sortKey.price"
                    :options="sortPriceOptions"
                    optionLabel="label"
                    placeholder="Lọc theo giá"
                    @change="onSortChange($event)"
                />
            </template>
        </AllTag>
        <Paginator
            :rows="tabsPagination.perPage"
            :totalRecords="tabsPagination.total"
            :first="(currentPage - 1) * tabsPagination.perPage"
            @page="onPageChange"
        ></Paginator>

    </div>

    <div class="mb-5">
        <h2 class="mb-3">Blog chia sẻ</h2>
        <Carousel></Carousel>
    </div>
    <div class="mb-5">
        <h2 class="mb-3">Các gói đăng ký</h2>
        <Subscription></Subscription>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Carousel from '~/components/General/Carousel.vue';
import Tag from '~/components/General/Tag.vue';
import ListTag from '~/components/Utils/ListTag.vue';
import Galleria from '~/components/General/Galleria.vue';
import AllTag from '~/components/Utils/AllTag.vue';
import Subscription from '~/components/Utils/Subscription.vue';
import Api from '~/network/Api';
import type { FilterIndex, Tab } from '~/types/tab';
import type { Paginator } from '~/types/paginator';

const sortKey = ref({
    price: null,
});
const sortPriceOptions = ref([
    { label: 'Tăng dần', value: 'asc' },
    { label: 'Giảm dần', value: 'desc' },
]);
const newTab = ref([] as Tab[]);
const tabs = ref([] as Tab[]);
const tabsPagination = ref({} as Paginator);
const currentPage = ref(1);
const filters = ref({
    orderPrice: '',
} as FilterIndex);

onMounted(async () => {
    await Api.tab
        .newTab()
        .then((res: any) => {
            newTab.value = res.data;
        })
        .catch((err) => console.log(err));

    await getTabIndex();
});

watch(
    () => currentPage.value,
    async (newValue, oldValue) => {
        if (newValue != oldValue) {
            await getTabIndex();
        }
    },
);
const getTabIndex = async () => {
    await Api.tab
        .index({ page: currentPage.value, ...filters.value })
        .then((res: any) => {
            tabs.value = res.data;
            tabsPagination.value = res.meta;
        })
        .catch((err) => console.log(err));
};

const onPageChange = (event: any) => {
    currentPage.value = event.first / tabsPagination.value.perPage + 1;
};

const onSortChange = async (event: any) => {
    currentPage.value = 1;
    filters.value.orderPrice = event.value.value;
    await getTabIndex();
};
</script>

<style scoped>
.tag-container {
    display: flex;
}

.table-tag {
    padding-right: 20px;
    width: 70%;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; /* khoảng cách giữa các phần tử */
}

.item {
    padding: 10px;
    border: 1px solid #e2e8f0;
    text-align: center;
    border-radius: 5px;
}
.list-tag {
    width: 30%;
}

/* Khi màn hình nhỏ hơn 1024px, hiển thị 3 item trên 1 hàng */
@media (max-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Khi màn hình nhỏ hơn 768px, hiển thị 2 item trên 1 hàng */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr);
    }

    .tag-container {
        display: block;
    }

    .table-tag {
        padding-right: 0px;
        width: 100%;
    }

    .list-tag {
        width: 100%;
        margin-bottom: 40px;
    }
}

/* Khi màn hình nhỏ hơn 480px, hiển thị 1 item trên 1 hàng */
@media (max-width: 480px) {
    .grid-container {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
