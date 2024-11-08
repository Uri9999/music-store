<template>
  <div class="carousel-container">
    <Carousel
      :value="images"
      :numVisible="1"
      :numScroll="1"
      :circular="true"
      :autoplayInterval="3000"
      :showIndicators="false"
    >
      <template #item="slotProps">
        <div class="image-wrapper">
          <img
            :src="slotProps.data.src"
            :alt="slotProps.data.alt"
            class="carousel-image"
          />
        </div>
      </template>

      <template #nexticon>
      </template>

      <template #previcon>
      </template>
    </Carousel>
  </div>
</template>
<script setup>
// slotProps.item.src  // .data.src
// https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1731052626~exp=1731056226~hmac=264f6e22575c906d9b661c29470eea03564e65e6d0c4ce4143d615c0fd303831&w=1380
import { ref } from "vue";

onMounted(() => {
  const nextButton = document.querySelector('.p-button-next');
  const prevButton = document.querySelector('.p-button-prev');

  if (nextButton) nextButton.style.display = 'none';
  if (prevButton) prevButton.style.display = 'none';
});

const images = ref([
  {
    src: "https://fullscore.cdn1.cafe24.com/banner/370dbfb8-d233-47f2-aff9-c4be777f87e8.jpg",
    alt: "Image 1",
  },
  {
    src: "https://fullscore.cdn1.cafe24.com/banner/370dbfb8-d233-47f2-aff9-c4be777f87e8.jpg",
    alt: "Image 2",
  },
  {
    src: "https://fullscore.cdn1.cafe24.com/banner/370dbfb8-d233-47f2-aff9-c4be777f87e8.jpg",
    alt: "Image 3",
  },
]);
</script>

<style scoped>
.carousel-container {
  max-width: 100%;
  margin: 0 auto;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: auto; /* Đặt chiều cao để ảnh chiếm toàn bộ màn hình */
  object-fit: cover; /* Đảm bảo ảnh giữ tỷ lệ và bao phủ toàn bộ container */
  border-radius: 0; /* Bỏ bo góc nếu có */
}

.carousel-container .p-carousel-next {
  position: absolute !important;
  right: 10px;
}

.carousel-container .p-carousel-prev {
  position: absolute !important;
  left: 10px;
}

</style>
