<template>
    <div class="tags">
        <div class="item" v-for="(item, index) in tabs">
            <div class="image">
                <!-- <img :src="item.image" /> -->
                <img
                    src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
                />
                <div class="pl-3">
                    <div>{{ item.name }}</div>
                    <div>Người soạn: {{ item.user.name }}</div>
                </div>
            </div>
            <!-- <div>{{ item.price }} Vnd</div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Api from '~/network/Api';
import type { Tab } from '~/types/tab';

const tabs = ref([] as Tab[]);
onMounted(async () => {
    Api.tab
        .randomTab()
        .then((res: any) => {
            tabs.value = res.data;
        })
        .catch((err) => console.log(err));
});
</script>

<style scoped>
.tags {
    border-radius: 5px;
    border: 1px solid rgb(236, 236, 236);
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}
.item:hover {
    background-color: rgb(245, 245, 245);
}
.image {
    display: flex;
    align-items: center;
}
.image img {
    width: 56px;
    border-radius: 5px;
}
</style>
