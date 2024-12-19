// Import Firebase scripts
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
    apiKey: 'AIzaSyBDQSXBuBrAwnPEHz_pbzPWVO6pqUml3IU',
    authDomain: 'music-store-1321a.firebaseapp.com',
    projectId: 'music-store-1321a',
    storageBucket: 'music-store-1321a.firebasestorage.app',
    messagingSenderId: '1036283114925',
    appId: '1:1036283114925:web:a4865f4dd62a72f5529d24',
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Lắng nghe thông báo nền
messaging.onBackgroundMessage((payload) => {
    console.log('Thông báo nền:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
    });
});
