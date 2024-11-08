<template>
  <div
    class="border border-surface-200 dark:border-surface-700 rounded" :class="classes"
  >
    <div class="mb-1">
      <div class="relative mx-auto">
        <img
          :src="item.image"
          class="w-full rounded"
        />
        <Tag
          :value="'INSTOCK'"
          :severity="'true'"
          class="absolute"
          style="left: 5px; top: 5px"
        />
      </div>
    </div>
    <div class="mb-1 font-medium">{{ item.name }}</div>
    <div class="flex justify-between items-center detail">
      <div class="mt-0 font-semibold text-xl">${{ item.price }}</div>
      <span>
        <!-- <Button icon="pi pi-heart" severity="secondary" outlined /> -->
        <Button icon="pi pi-shopping-cart" class="" />
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    classes: {
        type: [String, Array, Object],
        default: ''
    },
    item: {
        type: [Object],
        required: true
    }
})

</script>

<style scoped>
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
