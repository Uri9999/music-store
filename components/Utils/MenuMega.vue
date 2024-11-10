<template>
  <div class="card">
    <MegaMenu
      :model="items"
      :breakpoint="pointResponsiveMenu + 'px'"
      class="custom-menu"
    >
      <template #start>
        <div class="logo" v-if="!responsiveMenu">
          <img src="~/public/images/logo.jpg" />
        </div>
      </template>

      <template #end>
        <div class="menu-end">
          <div class="responsive-items" v-if="responsiveMenu">
            <div class="logo">
              <img src="~/public/images/logo.jpg" />
            </div>
            <span class="search-icon"> <i class="pi pi-search"></i></span>
          </div>
          <InputText
            v-if="!responsiveMenu"
            placeholder="Search"
            type="text"
            class="sm:w-auto search"
          />
          <Avatar
            class="avatar"
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </MegaMenu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWindowSize } from "vue-window-size";

const pointResponsiveMenu = ref(830);
const { width, height } = useWindowSize();
const responsiveMenu = computed(() => {
  return width.value <= pointResponsiveMenu.value;
});
console.log("wid", width.value);

const items = ref([
  {
    label: "Home",
    icon: "pi pi-box",
    items: [
      [
        {
          label: "Living Room",
          items: [
            { label: "Accessories" },
            { label: "Armchair" },
            { label: "Coffee Table" },
            { label: "Couch" },
            { label: "TV Stand" },
          ],
        },
      ],
      [
        {
          label: "Kitchen",
          items: [
            { label: "Bar stool" },
            { label: "Chair" },
            { label: "Table" },
          ],
        },
        {
          label: "Bathroom",
          items: [{ label: "Accessories" }],
        },
      ],
      [
        {
          label: "Bedroom",
          items: [
            { label: "Bed" },
            { label: "Chaise lounge" },
            { label: "Cupboard" },
            { label: "Dresser" },
            { label: "Wardrobe" },
          ],
        },
      ],
      [
        {
          label: "Office",
          items: [
            { label: "Bookcase" },
            { label: "Cabinet" },
            { label: "Chair" },
            { label: "Desk" },
            { label: "Executive Chair" },
          ],
        },
      ],
    ],
  },
  {
    label: "Features",
    icon: "pi pi-mobile",
    items: [
      [
        {
          label: "Computer",
          items: [
            { label: "Monitor" },
            { label: "Mouse" },
            { label: "Notebook" },
            { label: "Keyboard" },
            { label: "Printer" },
            { label: "Storage" },
          ],
        },
      ],
      [
        {
          label: "Home Theater",
          items: [
            { label: "Projector" },
            { label: "Speakers" },
            { label: "TVs" },
          ],
        },
      ],
      [
        {
          label: "Gaming",
          items: [
            { label: "Accessories" },
            { label: "Console" },
            { label: "PC" },
            { label: "Video Games" },
          ],
        },
      ],
      [
        {
          label: "Appliances",
          items: [
            { label: "Coffee Machine" },
            { label: "Fridge" },
            { label: "Oven" },
            { label: "Vaccum Cleaner" },
            { label: "Washing Machine" },
          ],
        },
      ],
    ],
  },
  {
    label: "Projects",
    icon: "pi pi-clock",
    items: [
      [
        {
          label: "Football",
          items: [
            { label: "Kits" },
            { label: "Shoes" },
            { label: "Shorts" },
            { label: "Training" },
          ],
        },
      ],
      [
        {
          label: "Running",
          items: [
            { label: "Accessories" },
            { label: "Shoes" },
            { label: "T-Shirts" },
            { label: "Shorts" },
          ],
        },
      ],
      [
        {
          label: "Swimming",
          items: [
            { label: "Kickboard" },
            { label: "Nose Clip" },
            { label: "Swimsuits" },
            { label: "Paddles" },
          ],
        },
      ],
      [
        {
          label: "Tennis",
          items: [
            { label: "Balls" },
            { label: "Rackets" },
            { label: "Shoes" },
            { label: "Training" },
          ],
        },
      ],
    ],
  },
]);
</script>

<style scoped>
.custom-menu {
  border: none;
  border-radius: 0 !important;
}

.menu-end {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.logo {
  height: 25px;
  width: 83px;
  margin-right: 15px;
}

.menu-end {
  width: 100%;
  display: flex;
  justify-content: end;
}

.responsive-items {
  display: flex;
  align-items: center;
}

.responsive-items .logo {
  margin-right: calc(50vw - 130px);
}

.search-icon {
  display: inline-block;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(238, 238, 238);
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 470px) {
  .search {
    width: 75%;
  }
}
</style>
