<template>
  <div class="card">
    <Carousel
      :value="products"
      :numVisible="5"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :circular="true"
      :autoplayInterval="3000"
      :showIndicators="false"
      :showNavigators="false"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full border-round"
              />
              <Tag
                :value="slotProps.data.inventoryStatus"
                :severity="getSeverity(slotProps.data.inventoryStatus)"
                class="absolute"
                style="left: 5px; top: 5px"
              />
            </div>
          </div>
          <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex justify-content-between align-items-center">
            <div class="mt-0 font-semibold text-xl">
              ${{ slotProps.data.price }}
            </div>
            <span>
              <!-- <Button icon="pi pi-heart" severity="secondary" outlined /> -->
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 5,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "350px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};

const products = ref([
  {
    image:
      "https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg",
    alt: "Image 1",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image:
      "https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg",
    alt: "Image 2",
    name: "Product Name",
    inventoryStatus: "LOWSTOCK",
    price: 20,
  },
  {
    image:
      "https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
  {
    image:
      "https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
  {
    image:
      "https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
  {
    image:
      "https://primefaces.org/cdn/primevue/images/product/chakra-bracelet.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
]);
</script>
