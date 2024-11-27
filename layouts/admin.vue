<template>
    <div class="main">
        <AdminMenu></AdminMenu>
        <div class="body">
            <div class="head">
                <Avatar
                    class="avatar-mobile"
                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    shape="circle"
                />
                <span class="ml-3">Nguyễn Văn Nhất</span>
            </div>
            <div class="container">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import AdminMenu from '~/components/Utils/Menu/AdminMenu.vue';

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
