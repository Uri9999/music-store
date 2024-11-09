<template>
  <div class="pricing-container">
    <!-- Basic Plan -->
    <div class="card">
      <h2 class="plan-title">Basic</h2>
      <p class="description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
      <hr />
      <div class="price">
        <span class="amount">$9</span>
        <span class="per-month">per month</span>
      </div>
      <hr />
      <ul class="features">
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Arcu vitae elementum
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Dui faucibus in ornare
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Morbi tincidunt augue
        </li>
      </ul>
      <Button label="Buy Now" class="btn px-5 py-3" />
    </div>

    <!-- Premium Plan -->
    <div class="card">
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
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Arcu vitae elementum
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Dui faucibus in ornare
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Morbi tincidunt augue
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Duis ultricies lacus sed
        </li>
      </ul>
      <Button label="Buy Now" class="btn px-5 py-3" />
    </div>

    <!-- Enterprise Plan -->
    <div class="card">
      <h2 class="plan-title">Enterprise</h2>
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
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Arcu vitae elementum
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Dui faucibus in ornare
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Morbi tincidunt augue
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Duis ultricies lacus sed
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Imperdiet proin
        </li>
        <li>
          <span><i class="pi pi-check-circle text-green-500 text-lg" /></span>
          Nisi scelerisque
        </li>
      </ul>
      <Button label="Buy Now" class="btn px-5 py-3" />
    </div>
  </div>
</template>
<script setup></script>
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
  align-items: center;
  min-height: 500px; /* Đảm bảo chiều cao tối thiểu */
}

.plan-title {
  width: 100%;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #464646;
}

.description {
  color: #666;
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  padding: 0;
  width: 100%;
}

.features li {
  display: flex;
  align-items: center;
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

/* @media (max-width: 980px) {
    .pricing-container {
        flex-direction: column;
        align-items: center;
    }
} */
</style>
