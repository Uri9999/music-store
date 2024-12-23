<template>
    <HeaderPage class="mt-5" title="Danh sách bài tag"> </HeaderPage>
    <div>
        <AllTag :tabs="tabs">
            <template #filter>
                <Dropdown
                    class="mr-3 mt-2"
                    v-model="orderPrice"
                    :options="sortPriceOptions"
                    optionLabel="label"
                    placeholder="Sắp xếp theo giá"
                    @change="onOrderPriceChange($event)"
                />
                <Dropdown
                    class="mr-3 mt-2"
                    v-model="orderCreatedAt"
                    :options="sortCreatedAtOptions"
                    optionLabel="label"
                    placeholder="Sắp xếp theo ngày tạo"
                    @change="onOrderCreatedAtChange($event)"
                />
                <div class="select-category">
                    <TreeSelectCommon
                        v-model="categories"
                        :options="selection?.categories"
                        name="category"
                    ></TreeSelectCommon>
                </div>
            </template>
        </AllTag>
        <div class="card">
            <Paginator
                :rows="paginator?.perPage"
                :totalRecords="paginator?.total"
                :first="(paginator?.currentPage - 1) * paginator?.perPage"
                @page="onPageChange"
            ></Paginator>
        </div>
    </div>
</template>
<script setup lang="ts">
import AllTag from '~/components/Utils/AllTag.vue';
import Paginate from '~/components/General/Paginate.vue';
import Dropdown from 'primevue/dropdown';
import Api from '~/network/Api';
import HeaderPage from '~/components/General/HeaderPage.vue';
import type { Selection, Item } from '~/types/selection';
import TreeSelectCommon from '~/components/General/TreeSelectCommon.vue';

const filter = ref({
    orderPrice: null,
    orderCreatedAt: null,
    categories: [],
});

const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
});
const orderPrice = ref();
const orderCreatedAt = ref();
const categories = ref();
const sortPriceOptions = ref([
    { label: 'Tăng dần', value: 'asc' },
    { label: 'Giảm dần', value: 'desc' },
]);
const sortCreatedAtOptions = ref([
    { label: 'Mới Nhất', value: 'desc' },
    { label: 'Cũ Nhất', value: 'asc' },
]);
const onOrderPriceChange = async (event: Event) => {
    filter.value.orderPrice = orderPrice.value.value;
    await index(filter.value);
};
const onOrderCreatedAtChange = async (event: Event) => {
    filter.value.orderCreatedAt = orderCreatedAt.value.value;
    await index(filter.value);
};
watch(
    () => categories.value,
    async (newValue, oldValue) => {
        if (newValue != oldValue) {
            filter.value.categories = [newValue];
            await index(filter.value);
        }
    },
);

const currentPage = ref(1);
const tabs = ref([]);
const paginator = ref();
onMounted(async () => {
    await index({});
});
const index = async (payload: any) => {
    await Api.tab.index(payload).then((res: any) => {
        tabs.value = res.data;
        paginator.value = res.meta;
    });
};

// Handle page change
const onPageChange = (event: any) => {
    currentPage.value = event.page + 1; // PrimeVue starts from 0, so add 1
    index({ page: currentPage.value, ...filter.value });
};
</script>
<style scoped lang="scss">
.select-category {
    display: inline-block;
}
</style>
