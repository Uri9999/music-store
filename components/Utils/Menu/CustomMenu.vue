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

<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from './MenuItem.vue';
import { useSelectionStore } from '~/stores/selectionStore';

const selectionStore = useSelectionStore();
const menuTree = ref();

onMounted(async () => {
    const selection = await selectionStore.getData();

    const itemsCategory = selection?.categories?.map((category: any) => {
        var item = {
            label: category.label,
            items: null,
        };
        if (category.children) {
            item.items = category.children.map((subItem: any) => {
                return {
                    label: subItem.label,
                    toRoute: 'tab?categoy=' + subItem.value,
                };
            });
        }
        return item;
    });

    menuTree.value = [
        {
            label: 'Chuyên mục',
            icon: 'pi pi-box',
            items: itemsCategory,
        },
        {
            label: 'Bài tab',
            icon: 'pi pi-list',
            toRoute: '/tab',
        },
        {
            label: 'Yêu cầu',
            icon: 'pi pi-th-large',
            toRoute: '/request-tab',
        },
        {
            label: 'Blog',
            icon: 'pi pi-book',
            toRoute: '/article',
        },
        {
            label: 'Shopee',
            icon: 'pi pi-shop',
            newView: 'https://shope.ee/8UZ8lUUeWM',
        },
        {
            label: 'Đơn hàng',
            icon: 'pi pi-shopping-bag',
            toRoute: '/order',
        },
    ] as any;
});

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
        height: calc(100% - 50px);
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
