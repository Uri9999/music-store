<template>
    <HeaderPage title="Chi tiết đơn hàng"></HeaderPage>
    <div>
        <div></div>
        <div></div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import HeaderPage from '~/components/General/HeaderPage.vue';
import type { Order } from '~/types/order';
definePageMeta({
    layout: 'admin',
});

const orderData = ref({} as Order);

const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
    await getDetail();
});
const route = useRoute();
const id = Number(route.params.id);
const getDetail = async () => {
    await Api.order
        .adminShow(id)
        .then((res: any) => {
            orderData.value = res.data;
        })
        .catch((err: any) => console.log(err));
};
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: center;
}
</style>
