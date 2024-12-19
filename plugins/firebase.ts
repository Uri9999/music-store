// plugins/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: 'AIzaSyBDQSXBuBrAwnPEHz_pbzPWVO6pqUml3IU',
        authDomain: 'music-store-1321a.firebaseapp.com',
        projectId: 'music-store-1321a',
        storageBucket: 'music-store-1321a.firebasestorage.app',
        messagingSenderId: '1036283114925',
        appId: '1:1036283114925:web:a4865f4dd62a72f5529d24',
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    return {
        provide: {
            firebaseApp,
            messaging,
        },
    };
});
