<template>
    <div class="pricing-container">
        <!-- Basic Plan -->
        <div class="card" v-for="(sub, index) in subscriptions" :key="index">
            <h2 class="plan-title">{{ sub.name }}</h2>
            <p class="description">
                {{ sub.description }}
            </p>
            <hr />
            <div class="price">
                <span class="amount"
                    >{{ formatNumberWithCommas(sub.price) }} Vnd</span
                >
                <span class="per-month">{{ sub.duration_in_days }} Ngày</span>
            </div>
            <hr />
            <ul class="features">
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Arcu vitae elementum
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Dui faucibus in ornare
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Morbi tincidunt augue
                </li>
            </ul>
            <Button label="Đăng Ký" class="btn custom px-5 py-3" />
        </div>

        <!-- Premium Plan -->
        <!-- <div class="card">
            <h2 class="plan-title">Premium</h2>
            <p class="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <hr />
            <div class="price">
                <span class="amount">$29</span>
                <span class="per-month">per month</span>
            </div>
            <hr />
            <ul class="features">
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Arcu vitae elementum
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Dui faucibus in ornare
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Morbi tincidunt augue
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Duis ultricies lacus sed
                </li>
            </ul>
            <Button label="Đăng Ký" class="btn custom px-5 py-3" />
        </div> -->

        <!-- Enterprise Plan -->
        <!-- <div class="card">
            <div class="plan">
                <h2 class="plan-title">Enterprise</h2>
                <div class="sale">🎉 Save 20%</div>
            </div>
            <p class="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <hr />
            <div class="price">
                <span class="amount">$49</span>
                <span class="per-month">per month</span>
            </div>
            <hr />
            <ul class="features">
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Arcu vitae elementum
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Dui faucibus in ornare
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Morbi tincidunt augue
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Duis ultricies lacus sed
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Imperdiet proin
                </li>
                <li>
                    <span
                        ><i class="pi pi-check-circle text-green-500 text-lg"
                    /></span>
                    Nisi scelerisque
                </li>
            </ul>
            <Button label="Đăng Ký" class="btn custom px-5 py-3" />
        </div> -->
    </div>
</template>
<script setup lang="ts">
import Api from '~/network/Api';
import type { SubscriptionType } from '~/types/Subscription';
import { formatNumberWithCommas } from '#build/imports';
onMounted(async () => {
    await getSubscriptions();
});

const subscriptions = ref([] as SubscriptionType[]);
const getSubscriptions = async () => {
    await Api.subscription
        .index()
        .then((res: any) => {
            subscriptions.value = res.data;
        })
        .catch((err: any) => {});
};
</script>
<style scoped>
.container {
    text-align: center;
    padding: 20px;
}

.title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.subtitle {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 40px;
}

.pricing-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    flex-direction: column;
    min-height: 500px; /* Đảm bảo chiều cao tối thiểu */
}

.plan {
    display: flex;
    justify-content: space-between;
}
.sale {
    font-weight: 600;
    display: flex;
    align-items: center;
    color: #f97316;
    height: 26px;
    font-size: 1rem;
    border-radius: 5px;
    padding: 3.5px 7px;
    background-color: #ffedd5;
}

.plan-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #464646;
    margin-bottom: 20px;
}

.description {
    color: #666;
    font-size: 1rem;
}

.price {
    display: flex;
    align-items: baseline;
    gap: 5px;
    width: 100%;
    font-size: 1.5rem;
}

.amount {
    font-weight: bold;
    color: #333333;
}

.per-month {
    color: #666;
    font-size: 1rem;
}

hr {
    width: 100%;
    border: none;
    border-top: 1px solid #ddd;
    margin: 15px 0;
}

.features {
    list-style: none;
    font-size: 1rem;
    padding: 0;
    width: 100%;
}

.features li {
    display: flex;
    color: #666;
    gap: 10px;
    margin-bottom: 15px;
}

.features li span {
    color: green;
}

.btn {
    margin-top: auto; /* Đẩy nút xuống cuối cùng */
}

@media (max-width: 768px) {
    .card {
        min-height: 450px;
    }
}

@media (max-width: 480px) {
    .card {
        min-height: 420px;
    }
}
</style>
