<template>
    <div class="card-wrapper">
        <div class="card grid">
            <!-- card left -->
            <div class="product-imgs col-12 md:col-6">left</div>
            <!-- card right -->
            <div class="product-content col-12 md:col-6">
                <h2 class="product-title">nike shoes</h2>
                <div class="product-category mb-2">Danh muc: Nhạc</div>
                <div class="product-rating">
                    <span
                        ><Rating
                            v-model="tag.rate"
                            :cancel="false"
                        />4.7(21)</span
                    >
                </div>

                <div class="product-price">
                    <p class="last-price">Old Price: <span>$257.00</span></p>
                    <p class="new-price">
                        New Price: <span>$249.00 (-5%)</span>
                    </p>
                </div>

                <div class="product-detail">
                    <h2>about this item:</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illo eveniet veniam tempora fuga tenetur placeat
                        sapiente architecto illum soluta consequuntur,
                        aspernatur quidem at sequi ipsa!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur, perferendis eius. Dignissimos, labore
                        suscipit. Unde.
                    </p>
                    <ul>
                        <li>
                            <span
                                ><i
                                    class="pi pi-check-circle text-green-500 text-lg" /></span
                            >Color: <span>Black</span>
                        </li>
                        <li>
                            <span
                                ><i
                                    class="pi pi-check-circle text-green-500 text-lg" /></span
                            >Available: <span>in stock</span>
                        </li>
                        <li>
                            <span
                                ><i
                                    class="pi pi-check-circle text-green-500 text-lg" /></span
                            >Category: <span>Shoes</span>
                        </li>
                        <li>
                            <span
                                ><i
                                    class="pi pi-check-circle text-green-500 text-lg" /></span
                            >Shipping Area: <span>All over the world</span>
                        </li>
                        <li>
                            <span
                                ><i
                                    class="pi pi-check-circle text-green-500 text-lg" /></span
                            >Shipping Fee: <span>Free</span>
                        </li>
                    </ul>
                </div>

                <div class="purchase-info">
                    <Button label="Add to Cart" class="custom" />
                </div>

                <div class="social-links">
                    <p class="font-bold">Share At:</p>
                    <span><i class="pi pi-facebook"></i></span>
                    <span><i class="pi pi-twitter"></i></span>
                    <span><i class="pi pi-instagram"></i></span>
                    <span><i class="pi pi-whatsapp"></i></span>
                    <span><i class="pi pi-pinterest"></i></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Rating from 'primevue/rating';

const count = ref(1);
const tag = ref({
    rate: 3,
});
</script>

<style scoped lang="scss">
.card-wrapper {
    max-width: 1100px;
    margin: 0 auto;
}
.product-content {
    padding: 2rem 1rem;
}
.product-title {
    font-size: 2rem;
    text-transform: capitalize;
    font-weight: 700;
    position: relative;
    margin: 1rem 0;
}
.product-category {
    font-size: 1.3rem;
}
.product-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 80px;
    background: var(--color-1);
}

.product-rating span {
    display: flex;
    font-weight: 600;
    color: #252525;
}
.product-price {
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: 700;
}
.product-price span {
    font-weight: 400;
}
.last-price span {
    color: #f64749;
    text-decoration: line-through;
    font-size: 1.3rem;
}
.new-price span {
    font-size: 1.3rem;
}
.product-detail h2 {
    text-transform: capitalize;
    padding-bottom: 0.6rem;
}
.product-detail p {
    padding: 0.3rem;
    opacity: 0.8;
}
.product-detail ul {
    margin: 1rem 0;
}
.product-detail ul li {
    i {
        margin-right: 10px;
    }
    display: flex;
    align-items: center;
    margin: 0;
    list-style: none;
    background-size: 18px;
    margin: 0.4rem 0;
    font-weight: 600;
    opacity: 0.9;
}
.product-detail ul li span {
    font-weight: 400;
}
.purchase-info {
    margin: 1.5rem 0;
}

.social-links {
    display: flex;
    align-items: center;
    p {
        margin-right: 10px;
    }
    span {
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid var(--color-1);
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 15px;
        cursor: pointer;
        position: relative;

        &:hover {
            color: #f64749;
            border-color: #f64749;
        }
        i {
            font-size: 1.2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

@media screen and (min-width: 768px) {
    .card-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product-imgs {
    }
    .product-content {
    }
}
</style>
