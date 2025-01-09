<template>
    <div class="mega-menu">
        <MegaMenu
            :model="items"
            :breakpoint="pointisMobile + 'px'"
            class="custom-menu"
        >
            <template #start>
                <div class="logo" v-if="!isMobile" @click="gotoHome()">
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
                                    <div class="avatar-mobile">
                                        <AvatarCommon
                                            :name="profile?.name"
                                            :src="profile?.avatar?.url"
                                        />
                                    </div>
                                    <span class="ml-3">{{
                                        profile?.name
                                    }}</span>
                                </div>
                                <i
                                    class="icon-close pi pi-times"
                                    @click="showMenuMobile = false"
                                ></i>
                            </div>
                            <CustomMenu
                                @closeMegaMenu="showMenuMobile = false"
                                :menuTree="items"
                            ></CustomMenu>
                        </div>
                    </div>
                </div>
            </template>

            <template #end>
                <div class="menu-end">
                    <div class="responsive-items" v-if="isMobile">
                        <div class="logo" @click="gotoHome">
                            <img src="~/public/images/logo.jpg" />
                        </div>
                    </div>
                    <Search></Search>
                    <Bell></Bell>
                    <span class="menu-icon ml-2" @click="gotoCartView()">
                        <i class="pi pi-shopping-cart"></i>
                        <span class="badge" v-if="count">{{
                            count > 9 ? '+9' : count
                        }}</span>
                    </span>
                    <div
                        v-if="!isMobile && isAuthenticated"
                        class="avatar"
                        @click="toggle"
                    >
                        <AvatarCommon
                            :name="profile?.name"
                            :src="profile?.avatar?.url"
                        />
                    </div>
                    <Menu
                        ref="menu"
                        id="overlay_menu"
                        :model="dropdownItems"
                        :popup="true"
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
import CustomMenu from './Menu/CustomMenu.vue';
import { useRouter } from 'vue-router';
import { useSelectionStore } from '~/stores/selectionStore';
import { useAuthStore } from '~/stores/authStore';
import Search from '../General/Search.vue';
import Bell from '../General/Bell.vue';
import Menu from 'primevue/menu';
import authService from '~/services/AuthService';
import AvatarCommon from '../General/AvatarCommon.vue';
import { useCartStore } from '~/stores/cartStore';

const items = ref<[]>([]);
const selectionStore = useSelectionStore();
const router = useRouter();
const showMenuMobile = ref(false);
const pointisMobile = ref(830);
const { width, height } = useWindowSize();
const isMobile = computed(() => {
    return width.value <= pointisMobile.value;
});
const { confirmDelete } = authService();
const authStore = useAuthStore();
const { isAuthenticated, profile } = storeToRefs(authStore);
const cartStore = useCartStore();
const { count } = storeToRefs(cartStore);

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
            label: 'Chuyên mục',
            icon: 'pi pi-box',
            items: itemsCategory,
        },
        // {
        //     label: 'Bài tab',
        //     icon: 'pi pi-list',
        //     toRoute: '/tab',
        //     command: (event: any) => handleNavigation(event.item.toRoute),
        // },
        {
            label: 'Giới thiệu',
            icon: 'pi pi-list',
            toRoute: '/tab',
            command: (event: any) => {
                router.push('/article/tutorial')
            },
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
            toRoute: '/article',
            command: (event: any) => handleNavigation(event.item.toRoute),
        },
        {
            label: 'Shopee',
            icon: 'pi pi-shop',
            command: (event: any) =>
                window.open('https://shope.ee/8UZ8lUUeWM', '_blank'),
        },
        {
            label: 'Đơn hàng',
            icon: 'pi pi-shopping-bag',
            toRoute: '/order',
            command: (event: any) => handleNavigation(event.item.toRoute),
        },
    ] as any;

    // count cart items
    await cartStore.getCount();
});

const handleNavigation = (route: string) => {
    if (route) {
        router.push(route);
    }
};

const gotoCartView = () => {
    router.push('/cart');
};

const gotoHome = () => {
    router.push('/');
};

const menu = ref();
const dropdownItems = ref([
    {
        label: 'Thay đổi thông tin',
        icon: 'pi pi-cog',
        command: () => {
            router.push('/setting/profile');
        },
    },
    {
        label: 'Đăng xuất',
        icon: 'pi pi-sign-out',
        command: () => {
            confirmDelete();
        },
    },
]);
const toggle = (event: Event) => {
    menu.value.toggle(event);
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
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-left: 10px;
}

.login-btn {
    padding: 7px;
}

.logo {
    cursor: pointer;
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
        background-color: var(--color-2);
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
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
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
