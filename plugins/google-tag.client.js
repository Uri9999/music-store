// plugins/google-tag.client.js

export default defineNuxtPlugin(() => {
    if (process.client) {
        // Thêm script gtag.js vào <head>
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EGGL9ECBV3';
        script.async = true;
        document.head.appendChild(script);

        // Khởi tạo dataLayer và hàm gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        // Gửi sự kiện khởi tạo
        window.gtag('js', new Date());
        window.gtag('config', 'G-EGGL9ECBV3');
    }
});
