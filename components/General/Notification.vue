<template>
    <div v-if="notifications.length" class="notification-container">
        <div
            class="notification"
            v-for="(notification, index) in notifications"
            :key="index"
        >
            <h4 class="title">
                {{ truncateDescription(notification?.title, 50) }}
            </h4>
            <p class="body">
                {{ truncateDescription(notification?.body, 190) }}
            </p>
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
    setTimeout(() => {
        notifications.value.shift();
    }, 5000);
}
defineExpose({
    showNotification,
});
</script>

<style scoped lang="scss">
.notification-container {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
}

.notification {
    background-color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: rgb(201, 201, 201) 0px 4px 6px;
    animation: slide-in 0.3s ease-out;
    width: 300px;
    height: 180px;
    padding: 10px;
    border-radius: 3px;

    .title {
        font-size: 1.1rem;
        margin-bottom: 10px;
        color: var(--color-2);
    }

    .body {
        color: black;
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
</style>
