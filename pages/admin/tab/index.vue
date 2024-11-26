<template>
    <div>
        <h2 class="mb-2">Danh sách bài tab</h2>
        <TableCommon
            ref="tableCommon"
            :payload="filter"
            :apiFunction="fetchTabs"
        >
            <template #header>
                <div
                    class="flex flex-wrap gap-2 align-items-end justify-content-between"
                >
                    <div>
                        <Button
                            type="button"
                            icon="pi pi-filter-slash"
                            label="Reset bộ lọc"
                            outlined
                            @click="clearFilter()"
                        />
                    </div>
                    <div class="flex gap-2">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText
                                placeholder="Tên bài hát hoặc tác giả"
                                v-model="filter.search"
                            />
                        </IconField>
                        <Button @click="search()">Tìm kiếm</Button>
                    </div>
                </div>
            </template>

            <Column field="name" header="Tên bài hát" style=""></Column>
            <Column field="user" header="Người tạo" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.user?.name }}</span>
                </template>
            </Column>
            <Column field="author" header="Tác giả" style=""></Column>
            <Column field="price" header="Giá" style=""></Column>
            <Column field="category" header="Danh mục" style="">
                <template #body="slotProps">
                    <span>{{ slotProps.data?.category?.name }}</span>
                </template>
            </Column>
            <Column field="youtube_url" header="Youtube" style="">
                <template #body="slotProps">
                    <a v-tooltip="slotProps.data?.youtube_url" :href="slotProps.data?.youtube_url">Link</a>
                </template>
            </Column>
            <Column field="description" header="Mô tả" style=""></Column>
            <Column
                :exportable="false"
                header="Hành động"
                style="min-width: 12rem"
            >
                <template #body="slotProps">
                    <Button
                        icon="pi pi-pencil"
                        outlined
                        rounded
                        class="mr-2"
                    />
                </template>
            </Column>
        </TableCommon>
    </div>
</template>

<script setup lang="ts">
import TableCommon from '~/components/General/TableCommon.vue';
import Api from '~/network/Api';

definePageMeta({
    layout: 'admin',
});

const allUserAffiliate = ref([]);
onMounted(async () => {
    await Api.user
        .getAllAffiliate({})
        .then((res: any) => {
            console.log('res', res);
            allUserAffiliate.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
});

const filter = ref({
    search: '',
});
const toast = useToast();
const tableCommon = ref<any>();

const clearFilter = async () => {
    filter.value.search = '';
    await search();
};
const search = async () => {
    await tableCommon.value.refresh(filter.value);
};

const fetchTabs = (payload: any) => {
    return Api.tab.adminIndex(payload);
};


</script>
<style scoped lang="scss">
</style>
