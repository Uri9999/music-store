<template>
    <div class="main">
        <div class="head">
            <AdminMenu></AdminMenu>
            <div>ok</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import AdminMenu from '~/components/Utils/Menu/AdminMenu.vue';

definePageMeta({
    layout: 'manage',
    title: 'Đăng nhập',
});
</script>

<style lang="scss" scoped>
.head {
    display: flex;
}
</style>
