<template>
    <div class="mt-5">
        <h2>Danh sách bài tag</h2>
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

const filter = ref({
    orderPrice: null,
    orderCreatedAt: null,
});
const orderPrice = ref();
const orderCreatedAt = ref();
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
        console.log('paginator.value', paginator.value);
    });
};

// Handle page change
const onPageChange = (event: any) => {
    currentPage.value = event.page + 1; // PrimeVue starts from 0, so add 1
    index({ page: currentPage.value, ...filter.value });
};
</script>
<style scoped lang="scss"></style>
