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
                    <span class="menu-icon ml-2">
                        <i class="pi pi-shopping-cart"></i>
                        <span class="badge">8</span>
                    </span>
                    <Avatar
                        v-if="!isMobile"
                        class="avatar"
                        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        shape="circle"
                    />
                    <Button
                        label="Login"
                        class="ml-2 login-btn"
                        severity="secondary"
                        @click="router.push('/login')"
                    ></Button>
                </div>
            </template>
        </MegaMenu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWindowSize } from 'vue-window-size';
import Menu from './Menu/Menu.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showMenuMobile = ref(false);
const pointisMobile = ref(830);
const { width, height } = useWindowSize();
const isMobile = computed(() => {
    return width.value <= pointisMobile.value;
});

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-box',
        items: [
            [
                {
                    label: 'Living Room',
                    items: [
                        { label: 'Accessories' },
                        { label: 'Armchair' },
                        { label: 'Coffee Table' },
                        { label: 'Couch' },
                        { label: 'TV Stand' },
                    ],
                },
            ],
            [
                {
                    label: 'Kitchen',
                    items: [
                        { label: 'Bar stool' },
                        { label: 'Chair' },
                        { label: 'Table' },
                    ],
                },
                {
                    label: 'Bathroom',
                    items: [{ label: 'Accessories' }],
                },
            ],
            [
                {
                    label: 'Bedroom',
                    items: [
                        { label: 'Bed' },
                        { label: 'Chaise lounge' },
                        { label: 'Cupboard' },
                        { label: 'Dresser' },
                        { label: 'Wardrobe' },
                    ],
                },
            ],
            [
                {
                    label: 'Office',
                    items: [
                        { label: 'Bookcase' },
                        { label: 'Cabinet' },
                        { label: 'Chair' },
                        { label: 'Desk' },
                        { label: 'Executive Chair' },
                    ],
                },
            ],
        ],
    },
    {
        label: 'Features',
        icon: 'pi pi-mobile',
        items: [
            [
                {
                    label: 'Computer',
                    items: [
                        { label: 'Monitor' },
                        { label: 'Mouse' },
                        { label: 'Notebook' },
                        { label: 'Keyboard' },
                        { label: 'Printer' },
                        { label: 'Storage' },
                    ],
                },
            ],
            [
                {
                    label: 'Home Theater',
                    items: [
                        { label: 'Projector' },
                        { label: 'Speakers' },
                        { label: 'TVs' },
                    ],
                },
            ],
            [
                {
                    label: 'Gaming',
                    items: [
                        { label: 'Accessories' },
                        { label: 'Console' },
                        { label: 'PC' },
                        { label: 'Video Games' },
                    ],
                },
            ],
            [
                {
                    label: 'Appliances',
                    items: [
                        { label: 'Coffee Machine' },
                        { label: 'Fridge' },
                        { label: 'Oven' },
                        { label: 'Vaccum Cleaner' },
                        { label: 'Washing Machine' },
                    ],
                },
            ],
        ],
    },
    {
        label: 'Projects',
        icon: 'pi pi-clock',
        items: [
            [
                {
                    label: 'Football',
                    items: [
                        { label: 'Kits' },
                        { label: 'Shoes' },
                        { label: 'Shorts' },
                        { label: 'Training' },
                    ],
                },
            ],
            [
                {
                    label: 'Running',
                    items: [
                        { label: 'Accessories' },
                        { label: 'Shoes' },
                        { label: 'T-Shirts' },
                        { label: 'Shorts' },
                    ],
                },
            ],
            [
                {
                    label: 'Swimming',
                    items: [
                        { label: 'Kickboard' },
                        { label: 'Nose Clip' },
                        { label: 'Swimsuits' },
                        { label: 'Paddles' },
                    ],
                },
            ],
            [
                {
                    label: 'Tennis',
                    items: [
                        { label: 'Balls' },
                        { label: 'Rackets' },
                        { label: 'Shoes' },
                        { label: 'Training' },
                    ],
                },
            ],
        ],
    },
]);

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
