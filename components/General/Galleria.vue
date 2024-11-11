<template>
    <div class="card">
        <Galleria
            :value="images"
            :numVisible="10"
            :circular="true"
            :showItemNavigators="true"
            :showThumbnails="false"
            :showIndicators="false"
            :changeItemOnIndicatorHover="true"
            :showIndicatorsOnItem="inside"
            :indicatorsPosition="'bottom'"
            :autoPlay="true"
            containerClass="gallaria-custom"
            :transitionInterval="3000"
        >
            <template #item="slotProps">
                <img
                    :src="slotProps.item.src"
                    :alt="slotProps.item.alt"
                    class="galleria-image"
                    style="width: 100%; display: block"
                />
            </template>
            <!-- <template #indicator>
        </template> -->
        </Galleria>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
    {
        src: 'https://fullscore.cdn1.cafe24.com/banner/370dbfb8-d233-47f2-aff9-c4be777f87e8.jpg',
        alt: 'Image 1',
    },
    {
        src: 'https://fullscore.cdn1.cafe24.com/banner/13964eb3-2ce4-4da4-a084-474ef0dd7b6a.jpg',
        alt: 'Image 2',
    },
    {
        src: 'https://fullscore.cdn1.cafe24.com/banner/370dbfb8-d233-47f2-aff9-c4be777f87e8.jpg',
        alt: 'Image 3',
    },
    {
        src: 'https://fullscore.cdn1.cafe24.com/banner/13964eb3-2ce4-4da4-a084-474ef0dd7b6a.jpg',
        alt: 'Image 4',
    },
]);
const inside = ref(true);
</script>

<style scoped>
.p-galleria-indicators {
    background-color: transparent !important;
}

.gallaria-custom ul {
    /* display: none; */
    background-color: transparent;
}

.p-galleria-indicators {
    background-color: transparent;
}
</style>
