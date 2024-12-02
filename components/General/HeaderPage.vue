<template>
    <div class="head-title">
        <Icon @click="goBack()" class="mr-3 icon-back" name="arrow-back"></Icon>
        <h2>{{ title }}</h2>
    </div>
</template>

<script lang="ts" setup>
import Icon from '~/components/General/Icon.vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
});
const router = useRouter();
const goBack = () => {
    router.go(-1);
}
</script>

<style lang="scss" scoped>
.head-title {
    display: flex;
    align-items: center;
}

.icon-back {
    background-color: rgb(235, 235, 235);
    border-radius: 5px;
    cursor: pointer;
}
</style>
