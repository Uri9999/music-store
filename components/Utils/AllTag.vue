<template>
  <div class="card">
    <DataView :value="products" :layout="layout">
      <template #header>
        <div class="filter">
          <!-- fillter -->
          <div>
            <Dropdown
              class="mr-3 mt-2"
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />

            <Dropdown
              class="mr-3 mt-2"
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Sold"
              @change="onSortChange($event)"
            />

            <Dropdown
              class="mt-2"
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Rate"
              @change="onSortChange($event)"
            />
          </div>
          <DataViewLayoutOptions v-model="layout" class="mt-2 filter-layer" />
        </div>
      </template>

      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="col-12"
          >
            <div
              class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="md:w-10rem relative">
                <img
                  class="block xl:block mx-auto border-round w-full"
                  :src="item.image"
                  :alt="item.name"
                />
                <Tag
                  :value="item.inventoryStatus"
                  :severity="getSeverity(item)"
                  class="absolute"
                  style="left: 4px; top: 4px"
                ></Tag>
              </div>
              <div
                class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
              >
                <div
                  class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
                >
                  <div>
                    <span class="font-medium text-secondary text-sm">{{
                      item.category
                    }}</span>
                    <div class="text-lg font-medium text-900 mt-2">
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-900 font-medium text-sm">{{
                        item.rating
                      }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-column md:align-items-end gap-3">
                  <span class="text-xl font-semibold text-900"
                    >${{ item.price }}</span
                  >
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" outlined></Button>
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Buy Now"
                      :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                      class="flex-auto md:flex-initial white-space-nowrap"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="col-12 sm:col-6 md:col-4 xl:col-3 p-2"
          >
            <div
              class="p-4 border-1 surface-border surface-card border-round flex flex-column"
            >
              <div class="surface-50 flex justify-content-center border-round">
                <div class="relative mx-auto">
                  <img
                    class="border-round w-full"
                    :src="item.image"
                    :alt="item.name"
                    style="max-width: 300px"
                  />
                  <Tag
                    :value="item.inventoryStatus"
                    :severity="getSeverity(item)"
                    class="absolute"
                    style="left: 4px; top: 4px"
                  ></Tag>
                </div>
              </div>
              <div class="pt-4">
                <div
                  class="flex flex-row justify-content-between align-items-start gap-2"
                >
                  <div>
                    <span class="font-medium text-secondary text-sm">{{
                      item.category
                    }}</span>
                    <div class="text-lg font-medium text-900 mt-1">
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-900 font-medium text-sm">{{
                        item.rating
                      }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-column gap-2">
                  <span class="font-semibold text-900"
                    >Price: ${{ item.price }}</span
                  >
                  <div class="flex gap-2">
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Buy Now"
                      :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                      class="flex-auto white-space-nowrap"
                    ></Button>
                    <Button icon="pi pi-heart" outlined></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const sortKey = ref();
const sortOptions = ref([
  { label: "Price High to Low", value: "!price" },
  { label: "Price Low to High", value: "price" },
]);
const products = ref([
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 1",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 2",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "LOWSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "LOWSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "OUTOFSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
  {
    image: "https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg",
    alt: "Image 3",
    name: "Product Name",
    inventoryStatus: "INSTOCK",
    price: 20,
  },
]);
const layout = ref("list"); // grid

const getSeverity = (product) => {
  switch (product.inventoryStatus) {
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

const onSortChange = (event) => {
  console.log("change");
};
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
}

.filter-layer {
  min-width: 100px;
  display: flex;
  justify-content: end;
  height: 38px;
}
</style>
