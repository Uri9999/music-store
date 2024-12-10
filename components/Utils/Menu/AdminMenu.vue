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
            @click="smallMenu = !smallMenu"
            name="bar"
        ></Icon>
    </div>
</template>

<script>
import AdminMenuItem from './AdminMenuItem.vue';
import Icon from '~/components/General/Icon.vue';

export default {
    name: 'recursive-menu',
    data: () => ({
        smallMenu: false,
        menuTree: [
            {
                label: 'Trang chủ',
                icon: 'home',
                toRoute: '/admin'
                // children: [
                //     {
                //         label: 'level 1.1',
                //         children: [
                //             {
                //                 label: 'level 1.1.1',
                //                 children: [
                //                     {
                //                         label: 'level 1.1.1.1',
                //                     },
                //                 ],
                //             },
                //         ],
                //     },
                //     {
                //         label: 'level 1.2',
                //     },
                // ],
            },
            {
                label: 'User',
                icon: 'manage-account',
                toRoute: '/admin/user'
                // children: [
                //     {
                //         label: 'Danh sách user',
                //         toRoute: '/admin/user'
                //     },
                //     {
                //         label: 'Tạo mới user',
                //     }
                // ],
            },
            {
                label: 'Tab',
                icon: 'library-music',
                toRoute: '/admin/tab'
            },
            {
                label: 'Đơn hàng',
                icon: 'list-alt-check',
                toRoute: '/admin/order'
            },
            {
                label: 'Subscription',
                icon: 'subscriptions',
                toRoute: '/admin/user-subscription'
            },
            {
                label: 'Danh mục',
                icon: 'category',
                toRoute: '/admin/category'
            },
            {
                label: 'Yêu cầu Tab',
                icon: 'clinical-notes',
                toRoute: '/admin/request-tab'
            },
            {
                label: 'Blog',
                icon: 'menu-book',
                toRoute: '/admin/article'
            },
            {
                label: 'Doanh Thu',
                icon: 'payments',
                toRoute: '/admin/revenue'
            },
            {
                label: 'Banner',
                icon: 'image',
                toRoute: '/admin/banner'
            },
            {
                label: 'Đánh giá Tab',
                icon: 'reviews',
                toRoute: '/admin/review-tab'
            },
        ],
    }),
    components: {
        AdminMenuItem,
        Icon,
    },
};
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
