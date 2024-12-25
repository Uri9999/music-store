<script setup lang="ts">
import { onMessage } from 'firebase/messaging';
import Notification from './components/General/Notification.vue';
import { useCartStore } from '~/stores/cartStore';

const notify = ref<InstanceType<typeof Notification> | null>(null);
const { $messaging } = useNuxtApp();
const cartStore = useCartStore();
onMessage($messaging, async (payload) => {
    await cartStore.getCount();
    
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
