<template>
    <div v-if="notifications.length" class="notification-container">
        <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="notification"
            :style="{ bottom: `${index * 60}px` }"
        >
            {{ notification?.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const notifications = ref([] as any);

// Hàm để thêm thông báo
function showNotification(message: any) {
    notifications.value.push({ message });

    // Tự động xóa thông báo sau 5 giây
    setTimeout(() => {
        notifications.value.shift();
    }, 5000);
}
defineExpose({
    showNotification,
});
</script>

<style>
.notification-container {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
}

.notification {
    background-color: #444;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: slide-in 0.3s ease-out;
    min-width: 250px;
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
