// composables/useNotifications.ts
import { getToken, onMessage } from 'firebase/messaging';

export const useNotifications = () => {
    const { $messaging } = useNuxtApp();

    // Kiểm tra xem $messaging có được khởi tạo đúng hay không
    if (!$messaging) {
        throw new Error('Firebase messaging is not initialized.');
    }

    const requestPermission = async (): Promise<string | null> => {
        try {
            const vapidKey = 'BGZPEtn_zdILligzSoVw2IQLPOq6QZ0IXhO339jgGvvg0XBf8bLWT9hrkaTHMOsq0rbrieD0clR8GrYV76O9a-Q'; // Thay thế bằng VAPID Key của bạn
            const token = await getToken($messaging, { vapidKey });

            if (!token) {
                console.warn(
                    'No registration token available. Request permission to generate one.',
                );
                return null;
            }

            console.log('FCM Token:', token);
            return token;
        } catch (error) {
            console.error('An error occurred while retrieving token:', error);
            return null;
        }
    };

    const listenToMessages = (): void => {
        onMessage($messaging, (payload) => {
            console.log('Message received. Foreground:', payload);
            alert(
                `${payload.notification?.title}: ${payload.notification?.body}`,
            );
        });
    };

    return {
        requestPermission,
        listenToMessages,
    };
};
