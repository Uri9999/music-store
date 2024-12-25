<template>
    <div v-if="notifications.length" class="notification-container">
        <div
            class="notification"
            v-for="(notification, index) in notifications"
            :key="index"
        >
            <div class="flex align-items-center justify-content-between head">
                <img class="logo mr-1" src="~/public/images/logo.jpg" />
                <i
                    @click="removeNotification(index)"
                    class="pi pi-times close cursor-pointer"
                ></i>
            </div>
            <h4 class="title mt-2">
                {{ truncateDescription(notification?.title, 30) }}
            </h4>
            <p class="body">
                {{ truncateDescription(notification?.body, 100) }}
            </p>
            <p class="domain">www.zumitap.vn</p>
            <Button
                label="Đóng"
                @click="removeNotification(index)"
                class="w-full btn-close custom"
                severity="secondary"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { truncateDescription } from '#build/imports';

const notifications = ref([] as any);

// Hàm để thêm thông báo
function showNotification(notification: any) {
    notifications.value.push(notification);

    // Tự động xóa thông báo sau 5 giây
    // setTimeout(() => {
    //     notifications.value.shift();
    // }, 5000);
}
// Hàm để xóa thông báo dựa trên chỉ mục
function removeNotification(index: number) {
    notifications.value.splice(index, 1);
}
defineExpose({
    showNotification,
});
</script>

<style scoped lang="scss">
.logo {
    width: 50px;
}
.notification-container {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
}

.notification {
    .head {
        color: var(--color-2);
    }
    background-color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: rgb(150, 150, 150) 0px 3px 5px;
    animation: slide-in 0.3s ease-out;
    width: 300px;
    height: 180px;
    padding: 10px;
    border-radius: 10px;

    .title {
        margin-bottom: 10px;
        color: var(--color-2);
        font-weight: 700;
    }

    .body {
        color: black;
        height: 60px;
    }
    .btn-close {
        color: white;
        height: 30px;
    }
}
/* Hiệu ứng slide-in */
@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
.close {
    color: rgb(110, 110, 110);
}
.domain {
    font-size: 0.9rem;
    color: rgb(104, 104, 104);
}
</style>
