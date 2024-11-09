<template>
  <div class="app">
    <!-- <Menu /> -->
    <div class="container">
      <MenuMega></MenuMega>
      <Galleria></Galleria>
    </div>

    <div class="container mt-3 tag-container">
      <div class="table-tag">
        <h2 class="py-3">Tag music maybe you need</h2>
        <div class="grid-container">
          <Tag
            classes="item"
            v-for="(item, index) in items"
            :key="index"
            :item="item"
          ></Tag>
        </div>
        <div class="card">
          <Paginate></Paginate>
        </div>
      </div>
      <div class="list-tag">
        <h2 class="py-3">Free Tags</h2>
        <ListTag></ListTag>
      </div>
    </div>

    <div class="container mb-5">
      <h2>List Tag for best</h2>
      <Carousel></Carousel>
    </div>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "~/components/Utils/Menu.vue";
import Carousel from "~/components/General/Carousel.vue";
import Tag from "~/components/General/Tag.vue";
import Paginate from "~/components/General/Paginate.vue";
import MenuMega from "~/components/Utils/MenuMega.vue";
import ListTag from "~/components/Utils/ListTag.vue";
import Galleria from "~/components/General/Galleria.vue";
import Footer from "~/components/Utils/Footer.vue";

const items = [
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Yellow watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Blue watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Green watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
  {
    name: "Black watch",
    price: 20,
    image:
      "https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg",
  },
];
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
}

.tag-container {
  display: flex;
}

.table-tag {
  padding-right: 20px;
  width: 70%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; /* khoảng cách giữa các phần tử */
}

.item {
  padding: 10px;
  border: 1px solid #e2e8f0;
  text-align: center;
  border-radius: 5px;
}
.list-tag {
  width: 30%;
}

/* Khi màn hình nhỏ hơn 1024px, hiển thị 3 item trên 1 hàng */
@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Khi màn hình nhỏ hơn 768px, hiển thị 2 item trên 1 hàng */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .tag-container {
    display: block;
  }

  .table-tag {
    padding-right: 0px;
    width: 100%;
  }

  .list-tag {
    width: 100%;
    margin-bottom: 40px;
  }
}

/* Khi màn hình nhỏ hơn 480px, hiển thị 1 item trên 1 hàng */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
