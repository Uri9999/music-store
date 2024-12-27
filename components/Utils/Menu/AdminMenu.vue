<template>
    <div class="menu" :class="{ 'small-menu': smallMenu }">
        <AdminMenuItem
            v-for="(item, index) in menuTree"
            :key="index"
            :data="item.children"
            :label="item.label"
            :icon="item.icon"
            :depth="0"
            :smallMenu="smallMenu"
            :toRoute="item?.toRoute"
        />
        <Icon
            class="icon-bar"
            v-if="smallMenu"
            @click="emit('updateIconValue', !smallMenu)"
            name="bar"
        ></Icon>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminMenuItem from './AdminMenuItem.vue';
import Icon from '~/components/General/Icon.vue';
import { useAuthStore } from '~/stores/authStore';

const props = defineProps({
    smallMenu: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['updateIconValue']);
const authStore = useAuthStore();
const { isAdmin, isAffiliate, isStaff } = storeToRefs(authStore);
const menuTree = ref([
    {
        label: 'Trang chủ',
        icon: 'home',
        toRoute: '/admin',
    },
    {
        label: 'Tab',
        icon: 'library-music',
        toRoute: '/admin/tab',
    },
    {
        label: 'Subscription',
        icon: 'subscriptions',
        toRoute: '/admin/user-subscription',
    },
    {
        label: 'Yêu cầu Tab',
        icon: 'clinical-notes',
        toRoute: '/admin/request-tab',
    },
    {
        label: 'Blog',
        icon: 'menu-book',
        toRoute: '/admin/article',
    },
]);
if (isAffiliate) {
    menuTree.value.push({
        label: 'Tab đã bán',
        icon: 'price-check',
        toRoute: '/admin/order-item',
    });
}
if (isAdmin.value || isStaff.value) {
    menuTree.value.push(
        {
            label: 'User',
            icon: 'manage-account',
            toRoute: '/admin/user',
        },
        {
            label: 'Đơn hàng',
            icon: 'list-alt-check',
            toRoute: '/admin/order',
        },
        {
            label: 'Danh mục',
            icon: 'category',
            toRoute: '/admin/category',
        },
        {
            label: 'Banner',
            icon: 'image',
            toRoute: '/admin/banner',
        },
        {
            label: 'Doanh Thu',
            icon: 'payments',
            toRoute: '/admin/revenue',
        },
        {
            label: 'Đánh giá Tab',
            icon: 'reviews',
            toRoute: '/admin/review-tab',
        },
    );
}
</script>

<style lang="scss" scoped>
.menu {
    position: sticky;
    height: 100vh;
    width: 240px;
    left: 0;
    top: 0;
    border-right: 1px solid #ececec;
    transition: all 0.3s ease;
    overflow: auto;
    .icon-bar {
        position: fixed;
        left: 250px;
        font-size: 20px;
        top: 15px;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    &.small-menu {
        overflow: inherit;
        width: 60px;
        padding-top: 50px;
        .icon-bar {
            left: 20px;
        }
    }
}
</style>
