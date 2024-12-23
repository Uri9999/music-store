<script setup lang="ts">
import { onMessage } from 'firebase/messaging';
import Notification from './components/General/Notification.vue';

const notify = ref<InstanceType<typeof Notification> | null>(null);
const { $messaging } = useNuxtApp();
onMessage($messaging, (payload) => {
    notify.value?.showNotification(
        payload.notification,
    );
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Notification ref="notify" />
</template>
