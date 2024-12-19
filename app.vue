<script setup>
import { onMessage } from 'firebase/messaging';

const { $messaging } = useNuxtApp();
onMessage($messaging, (payload) => {
    console.log('Message received. Foreground:', payload);
    alert(`${payload.notification?.title}: ${payload.notification?.body}`);
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
</template>
