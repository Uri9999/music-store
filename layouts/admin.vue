<template>
    <div class="main">
        <AdminMenu></AdminMenu>
        <div class="body">
            <div class="head">
                <span class="mr-3">{{ profile?.name }}</span>
                <AvatarCommon
                    :name="profile?.name"
                    :src="profile?.avatar?.url ?? null"
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

const authStore = useAuthStore();
const { profile } = storeToRefs(authStore);
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
}

.container {
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 20px;
}
</style>
