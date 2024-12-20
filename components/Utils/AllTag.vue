<template>
    <div class="card">
        <DataView :value="tabs" :layout="layout">
            <template #header>
                <div class="filter">
                    <div>
                        <slot name="filter"></slot>
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
import { ref } from 'vue';
import Tag from '../General/Tag.vue';
import TagTypeList from '../General/TagTypeList.vue';

const props = defineProps({
    tabs: {
        type: [Array],
        required: true,
    },
});

const layout = ref('grid'); // list | grid
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
