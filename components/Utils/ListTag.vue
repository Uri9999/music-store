<template>
  <div class="tags">
    <div class="item" v-for="(item, index) in products">
      <div class="image">
        <img :src="item.image" />
        <div class="pl-3">{{ item.name }}</div>
      </div>
      <div>${{ item.price }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = [
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Happy birthday",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Chuc be ngu ngon",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Chuc mung sinh nhat",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "How to win",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
  {
    id: 1,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
    name: "Influence",
    price: 20,
  },
];
const selectedId = ref(null);
</script>

<style scoped>
.tags {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgb(236, 236, 236);
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.item:hover {
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}
.image {
  display: flex;
  align-items: center;
}
.image img {
  width: 56px;
  border-radius: 5px;
}
</style>
