<template>
    <div class="mega-menu">
        <MegaMenu
            :model="items"
            :breakpoint="pointisMobile + 'px'"
            class="custom-menu"
        >
            <template #start>
                <div class="logo" v-if="!isMobile">
                    <img src="~/public/images/logo.jpg" />
                </div>
            </template>
            <template #menubutton>
                <div v-if="isMobile">
                    <i
                        class="pi pi-bars icon-bar"
                        @click="showMenuMobile = !showMenuMobile"
                    ></i>
                    <div
                        class="menu-mobile"
                        :class="[{ 'menu-mobile-show': showMenuMobile }]"
                        @click.self="showMenuMobile = false"
                    >
                        <!-- menu header -->
                        <div class="menu-content">
                            <div class="menu-header">
                                <div class="menu-header__info">
                                    <Avatar
                                        class="avatar-mobile"
                                        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                                        shape="circle"
                                    />
                                    <span class="ml-3">Nguyễn Văn Nhất</span>
                                </div>
                                <i
                                    class="icon-close pi pi-times"
                                    @click="showMenuMobile = false"
                                ></i>
                            </div>
                            <Menu
                                @closeMegaMenu="showMenuMobile = false"
                            ></Menu>
                        </div>
                    </div>
                </div>
            </template>

            <template #end>
                <div class="menu-end">
                    <div class="responsive-items" v-if="isMobile">
                        <div class="logo">
                            <img src="~/public/images/logo.jpg" />
                        </div>
                    </div>
                    <span class="menu-icon ml-2">
                        <i class="pi pi-search"></i
                    ></span>
                    <span class="menu-icon ml-2">
                        <i class="pi pi-bell"></i>
                        <span class="badge">+9</span>
                    </span>
                    <span class="menu-icon ml-2" @click="gotoCartView()">
                        <i class="pi pi-shopping-cart"></i>
                        <span class="badge">{{ countCartItem }}</span>
                    </span>
                    <Avatar
                        v-if="!isMobile && isAuthenticated"
                        class="avatar"
                        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        shape="circle"
                    />
                    <Button
                        label="Login"
                        class="ml-2 login-btn"
                        severity="secondary"
                        @click="router.push('/login')"
                        v-if="!isAuthenticated"
                    ></Button>
                </div>
            </template>
        </MegaMenu>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useWindowSize } from 'vue-window-size';
import Menu from './Menu/Menu.vue';
import { useRouter } from 'vue-router';
import { useSelectionStore } from '~/stores/selectionStore';
import type { MenuType } from '~/types/menu';
import Api from '~/network/Api';
import { useAuthStore } from '~/stores/authStore';

const items = ref<[]>([]);
const selectionStore = useSelectionStore();
const router = useRouter();
const showMenuMobile = ref(false);
const pointisMobile = ref(830);
const { width, height } = useWindowSize();
const isMobile = computed(() => {
    return width.value <= pointisMobile.value;
});
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

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
                    command: (event: any) =>
                        handleNavigation(event.item.toRoute),
                };
            });
        }
        return [item];
    });

    items.value = [
        {
            label: 'Trang chủ',
            icon: 'pi pi-home',
            toRoute: '/',
            command: (event: any) => handleNavigation(event.item.toRoute),
        },
        {
            label: 'Chuyên mục',
            icon: 'pi pi-box',
            items: itemsCategory,
        },
        {
            label: 'Bài tab',
            icon: 'pi pi-list',
            toRoute: '/tab',
            command: (event: any) => handleNavigation(event.item.toRoute),
        },
        {
            label: 'Yêu cầu',
            icon: 'pi pi-th-large',
            toRoute: '/request-tab',
            command: (event: any) => handleNavigation(event.item.toRoute),
        },
        {
            label: 'Blog',
            icon: 'pi pi-book',
            toRoute: '/blog',
            command: (event: any) => handleNavigation(event.item.toRoute),
        },
        {
            label: 'Shopee',
            icon: 'pi pi-shop',
            command: (event: any) =>
                window.open('https://shope.ee/8UZ8lUUeWM', '_blank'),
        },
    ] as any;

    // count cart items
    await getCountCartItem();
});

const handleNavigation = (route: string) => {
    if (route) {
        router.push(route);
    }
};

const countCartItem = ref(0);
const gotoCartView = () => {
    router.push('/cart');
};

const getCountCartItem = async () => {
    Api.cart
        .getCountByMe()
        .then((res: any) => {
            console.log('count cart');
            countCartItem.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
};
</script>

<style scoped lang="scss">
.mega-menu {
    max-width: 1200px;
    margin: auto;
}
.custom-menu {
    border: none;
    border-radius: 0 !important;
}

.menu-end {
    display: flex;
    align-items: center;
}

.avatar {
    width: 30px;
    height: 30px;
    margin-left: 10px;
}

.login-btn {
    padding: 7px;
}

.logo {
    height: 25px;
    width: 83px;
    margin-right: 15px;
}

.menu-end {
    width: 100%;
    display: flex;
    justify-content: end;
}

.responsive-items {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.menu-icon {
    display: inline-block;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(238, 238, 238);
    border-radius: 5px;
    cursor: pointer;
    position: relative;

    .badge {
        position: absolute;
        top: 13px;
        right: -5px;
        width: 16px;
        height: 16px;
        border-radius: 10px;
        background-color: #10b981;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.6rem;
    }
}

.icon-bar {
    cursor: pointer;
    font-size: 1.5rem;
}
.menu-mobile {
    position: fixed;
    top: 0;
    left: -150%;
    z-index: 10;
    background-color: rgba($color: #a5a5a5, $alpha: 0.3);
    width: 100vw;
    height: 100vh;

    .menu-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .icon-close {
            font-size: 1.5rem;
            cursor: pointer;
        }

        .menu-header__info {
            color: var(--color-1);
            display: flex;
            align-items: center;
            .avatar-mobile {
                width: 40px;
                height: 40px;
            }
            span {
                font-weight: 600;
                font-size: 1.5rem;
            }
        }
    }
    .menu-content {
        padding: 20px;
        max-width: 400px;
        background-color: white;
        box-shadow: 0 0px 10px rgb(71, 71, 71);
    }
}
.menu-mobile-show {
    left: 0;
}
@media (max-width: 470px) {
    .search {
        width: 75%;
    }
}

.p-megamenu-button {
    display: none;
}
</style>
