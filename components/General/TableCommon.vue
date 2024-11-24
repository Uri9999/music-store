<template>
    <div>
        <p v-if="isLoading">Loading...</p>
        <p v-if="error">{{ error }}</p>
        <DataTable
            v-if="!isLoading && !error"
            :value="tableData"
            v-bind="tableProps"
        >
            <template v-slot:header>
                <slot name="header" />
            </template>

            <slot />
            <template v-slot:footer>
                <slot name="footer" />
            </template>
        </DataTable>
        <Paginator
            :rows="paginator.perPage"
            :totalRecords="paginator.total"
            :first="(paginator.currentPage - 1) * paginator.perPage"
            @page="onPageChange"
        ></Paginator>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';

interface Props {
    apiFunction: any;
    rows?: number;
    rowsPerPageOptions?: number[];
    tableProps?: Record<string, any>;
}

const props = defineProps<Props>();
const tableData = ref([] as any);
const paginator = ref({} as any);
const isLoading = ref(false);
const error = ref<string | null>(null);

const currentPage = ref(1);

const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    await props
        .apiFunction({ page: currentPage.value })
        .then((res: any) => {
            tableData.value = res.data;
            paginator.value = res.meta;
            console.log('paginator', paginator.value);
        })
        .catch((err: any) => {
            error.value = err.message || 'Error fetching data';
        })
        .finally(() => {
            isLoading.value = false;
        });
};

// Handle page change
const onPageChange = (event: any) => {
    currentPage.value = event.page + 1; // PrimeVue starts from 0, so add 1
    fetchData();
};

onMounted(() => {
    fetchData();
});

defineExpose({
    refresh: () => fetchData(),
});
</script>
