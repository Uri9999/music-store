<template>
    <footer class="footer">
        <div class="container">
            <!-- Phần thông tin liên hệ -->
            <div class="footer-section contact-info">
                <h3>Contact Us</h3>
                <p>📍 Nam Sách - huyện Nam Sách - Hải Dương</p>
                <p>📧 zumitabvn@gmail.com</p>
                <p>📞 0326833330</p>
            </div>

            <!-- Phần liên kết -->
            <div class="footer-section links">
                <h3>Quick Links</h3>
                <ul>
                    <li @click.prevent="router.push('/')">
                        <a href="#">Trang chủ</a>
                    </li>
                    <li @click.prevent="router.push('tab')">
                        <a href="#">Bài tab</a>
                    </li>
                    <li @click.prevent="router.push('request-tab')">
                        <a href="#">Yêu cầu</a>
                    </li>
                    <li @click.prevent="router.push('article')">
                        <a href="#">Blog</a>
                    </li>
                    <li><a href="#">Shopee</a></li>
                    <li @click.prevent="router.push('article/policy')">
                        <a href="#">Điều khoản</a>
                    </li>
                    <li @click.prevent="router.push('article/tutorial')">
                        <a href="#">Hướng dẫn thanh toán</a>
                    </li>
                </ul>
            </div>

            <!-- Phần mạng xã hội -->
            <div class="footer-section social-media">
                <h3>Follow Us:</h3>
                <div>
                    <a href="https://www.facebook.com/shopzumivn" class="social-icon"
                        ><i class="pi pi-facebook"></i
                    ></a>
                    <a href="https://www.tiktok.com/@zumishopvn" class="social-icon"
                        ><i class="pi pi-tiktok"></i
                    ></a>
                    <a href="https://shopee.vn/kalimbatran" class="social-icon"
                        ><i class="pi pi-shopping-bag"></i
                    ></a>
                </div>
            </div>
        </div>

        <!-- Phần bản quyền -->
        <div class="footer-bottom">
            <p>&copy; 2024 Kalimba. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
const router = useRouter();
</script>

<style scoped>
/* Thiết lập tổng quát cho footer */
.footer {
    background-color: #2c3e50;
    color: #ffffff;
    padding: 20px 20px;
    padding-bottom: 10px;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
}

/* Các phần trong footer */
.footer-section {
    flex: 1;
    min-width: 250px;
}

.footer-section h3 {
    margin-bottom: 10px;
    font-size: 1.5rem;
    border-bottom: 2px solid var(--primary-light-color);
    display: inline-block;
}

/* Phần thông tin liên hệ */
.contact-info p {
    margin: 8px 0;
}

/* Phần liên kết */
.links ul {
    list-style: none;
    padding: 0;
}

.links ul li {
    margin-bottom: 10px;
}

.links ul li a {
    text-decoration: none;
    color: #bdc3c7;
    transition: color 0.3s;
}

.links ul li a:hover {
    color: #e67e22;
}

/* Phần mạng xã hội */
.social-media {
    /* display: flex;
  align-items: center;
  gap: 15px; */
}

.social-icon {
    color: #ffffff;
    font-size: 1.5rem;
    text-decoration: none;
    transition: color 0.3s;
    margin-right: 20px;
}

.social-icon:hover {
    color: #e67e22;
}

/* Phần bản quyền */
.footer-bottom {
    text-align: center;
    margin-top: 10px;
    border-top: 1px solid #34495e;
    padding-top: 10px;
    font-size: 0.9rem;
    color: #bdc3c7;
}

/* Responsive cho thiết bị di động */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .footer-section {
        text-align: center;
        min-width: 100%;
        margin-bottom: 20px;
    }
}

@media (max-width: 500px) {
    .footer-section {
        text-align: left;
        margin-bottom: 10px;
    }
}
</style>
