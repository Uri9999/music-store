<template>
    <div class="panel-menu select-none text-lg">
        <div class="menu-item">
            <MenuItem
                v-for="(item, index) in menuTree"
                :key="index"
                :item="item"
                :isFirstItem="index == 0"
                :level="1"
                :classes="item.classes"
                @itemClicked="closeMegaMenu"
            ></MenuItem>
        </div>
        <div class="bottom-panel cursor-pointer">
            <i class="pi pi-sign-out"></i>
            <span class="pl-2">Logout</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuItem from './MenuItem.vue';

const menuTree = ref([
    {
        label: 'Trang chủ',
        icon: 'pi pi-home',
        toRoute: '/',
    },
    {
        label: 'Danh sách',
        icon: 'pi pi-list-check',
        toRoute: '/tag',
    },
    {
        label: 'Chi tiết',
        icon: 'pi pi-list-check',
        toRoute: '/tag/1',
    },
    {
        label: 'Giỏ hàng',
        icon: 'pi pi-shopping-cart',
        toRoute: '/cart',
    },
    {
        label: 'Lịch sử mua hàng',
        icon: 'pi pi-shopping-cart',
        toRoute: '/cart/history',
    },
    {
        label: 'Danh sách tag của user',
        icon: 'pi pi-shopping-cart',
        toRoute: '/user/my-tag',
    },
    {
        label: 'Home',
        icon: 'pi pi-box',
        //   toRoute:
        children: [
            {
                label: 'Living Room',
                children: [
                    { label: 'Accessories' },
                    { label: 'Armchair' },
                    { label: 'Coffee Table' },
                    { label: 'Couch' },
                    { label: 'TV Stand' },
                ],
            },
            {
                label: 'Kitchen',
                children: [
                    { label: 'Bar stool' },
                    { label: 'Chair' },
                    { label: 'Table' },
                ],
            },
            {
                label: 'Bathroom',
                children: [{ label: 'Accessories' }],
            },

            {
                label: 'Bedroom',
                children: [
                    { label: 'Bed' },
                    { label: 'Chaise lounge' },
                    { label: 'Cupboard' },
                    { label: 'Dresser' },
                    { label: 'Wardrobe' },
                ],
            },

            {
                label: 'Office',
                children: [
                    { label: 'Bookcase' },
                    { label: 'Cabinet' },
                    { label: 'Chair' },
                    { label: 'Desk' },
                    { label: 'Executive Chair' },
                ],
            },
        ],
    },
    {
        label: 'Features',
        icon: 'pi pi-mobile',
        children: [
            {
                label: 'Computer',
                children: [
                    { label: 'Monitor' },
                    { label: 'Mouse' },
                    { label: 'Notebook' },
                    { label: 'Keyboard' },
                    { label: 'Printer' },
                    { label: 'Storage' },
                ],
            },
            {
                label: 'Home Theater',
                children: [
                    { label: 'Projector' },
                    { label: 'Speakers' },
                    { label: 'TVs' },
                ],
            },
            {
                label: 'Gaming',
                children: [
                    { label: 'Accessories' },
                    { label: 'Console' },
                    { label: 'PC' },
                    { label: 'Video Games' },
                ],
            },
            {
                label: 'Appliances',
                children: [
                    { label: 'Coffee Machine' },
                    { label: 'Fridge' },
                    { label: 'Oven' },
                    { label: 'Vaccum Cleaner' },
                    { label: 'Washing Machine' },
                ],
            },
        ],
    },
    {
        label: 'Projects',
        icon: 'pi pi-clock',
        children: [
            {
                label: 'Football',
                children: [
                    { label: 'Kits' },
                    { label: 'Shoes' },
                    { label: 'Shorts' },
                    { label: 'Training' },
                ],
            },
            {
                label: 'Running',
                children: [
                    { label: 'Accessories' },
                    { label: 'Shoes' },
                    { label: 'T-Shirts' },
                    { label: 'Shorts' },
                ],
            },
            {
                label: 'Swimming',
                children: [
                    { label: 'Kickboard' },
                    { label: 'Nose Clip' },
                    { label: 'Swimsuits' },
                    { label: 'Paddles' },
                ],
            },
            {
                label: 'Tennis',
                children: [
                    { label: 'Balls' },
                    { label: 'Rackets' },
                    { label: 'Shoes' },
                    { label: 'Training' },
                ],
            },
        ],
    },
]);
const emit = defineEmits(['closeMegaMenu']);
const closeMegaMenu = () => {
    emit('closeMegaMenu');
};
</script>
<style lang="scss" scoped>
.panel-menu {
    position: sticky;
    top: 0;
    height: calc(100vh - 80px);
    position: relative;

    .menu-item {
        // overflow-y: scroll;
        // overflow-x: hidden;
        height: calc(100% - 50px);
        // scrollbar-color: rgba(0, 0, 0, 0) transparent;
    }

    .bottom-panel {
        display: flex;
        align-items: center;
        height: 50px;
        position: absolute;
        bottom: 0;
        box-shadow: 0 0px 6px white;
    }
}

@media (max-width: 768px) {
    .panel-menu {
        height: 100vh;
        .menu-item {
            overflow: auto;
        }
    }
}
</style>
