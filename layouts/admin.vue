<template>
    <div class="main">
        <AdminMenu></AdminMenu>
        <div class="body">
            <div class="head">
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
            <div class="container">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import AdminMenu from '~/components/Utils/Menu/AdminMenu.vue';
import AvatarCommon from '~/components/General/AvatarCommon.vue';
import authService from '~/services/AuthService';

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
    // position: sticky;
    // top: 0;
    // z-index: 10;
    background-color: white;
    height: 56px;
    border-bottom: 1px solid rgb(235, 235, 235);
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 20px;
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
