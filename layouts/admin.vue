<template>
    <div class="main">
        <AdminMenu
            :smallMenu="smallMenu"
            @updateIconValue="toggleMenu"
        ></AdminMenu>
        <div class="body">
            <div class="head px-3">
                <div>
                    <Icon
                        class="icon-bar cursor-pointer"
                        @click="smallMenu = !smallMenu"
                        v-if="!smallMenu"
                        name="bar"
                    ></Icon>
                </div>
                <div class="flex align-items-center">
                    <span class="mr-3 profile-name">{{ profile?.name }}</span>
                    <div class="avatar" @click="toggle">
                        <AvatarCommon
                            :name="profile?.name"
                            :src="profile?.avatar?.url ?? null"
                        />
                    </div>
                    <Menu
                        ref="menu"
                        id="overlay_menu"
                        :model="dropdownItems"
                        :popup="true"
                    />
                </div>
            </div>
            <div class="container">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import AdminMenu from '~/components/Utils/Menu/AdminMenu.vue';
import AvatarCommon from '~/components/General/AvatarCommon.vue';
import Icon from '~/components/General/Icon.vue';
import authService from '~/services/AuthService';

const smallMenu = ref(false);
const authStore = useAuthStore();
const { profile } = storeToRefs(authStore);
const { confirmDelete } = authService();
const dropdownItems = ref([
    {
        label: 'Đăng xuất',
        icon: 'pi pi-sign-out',
        command: () => {
            confirmDelete();
        },
    },
]);
const menu = ref();
const toggle = (event: Event) => {
    menu.value.toggle(event);
};

const toggleMenu = (value: boolean) => {
    smallMenu.value = value;
};
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    width: 100%;
}

.main:has(.small-menu) {
    .body {
        width: calc(100% - 60px);
    }
}

.body {
    width: calc(100% - 240px);
}

.head {
    background-color: white;
    height: 56px;
    border-bottom: 1px solid rgb(235, 235, 235);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .avatar {
        width: 30px;
        height: 30px;
    }

    .profile-name {
        color: var(--color-2);
    }
}

.container {
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 20px;
}
</style>
