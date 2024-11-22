<template>
    <div>
        <AdminMenu></AdminMenu>
    </div>
</template>
<script lang="ts" setup>
import AdminMenu from '~/components/Utils/Menu/AdminMenu.vue';

definePageMeta({
    layout: 'manage',
    title: 'Đăng nhập',
});
</script>
