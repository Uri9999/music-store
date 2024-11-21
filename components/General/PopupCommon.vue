<template>
    <div v-if="isVisible" class="popup-wrapper" ref="popup">
        <div class="popup-body" @click.self="hidePopup">
            <slot></slot>
            <!-- Nơi để hiển thị nội dung truyền từ component cha -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import eventBus from '~/utils/eventBus';

const isVisible = ref(false); // Trạng thái hiển thị popup
const popup = ref<HTMLElement | null>(null);
const popupId = Symbol();

const showPopup = (event: MouseEvent) => {
    event.stopPropagation();
    eventBus.currentPopupId = popupId;
    isVisible.value = true;
};

// Phương thức đóng popup
const hidePopup = () => {
    isVisible.value = false;
};

// Phương thức xử lý khi click bên ngoài để đóng popup
const handleClickOutside = (event: MouseEvent) => {
    if (popup.value && !popup.value.contains(event.target as Node)) {
        hidePopup();
    }
};

// Gắn sự kiện khi component được mount
onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

// Loại bỏ sự kiện khi component bị hủy
onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
});

// Lắng nghe sự thay đổi từ event bus để đóng popup khi có popup khác mở
watch(
    () => eventBus.currentPopupId,
    (newPopupId) => {
        if (newPopupId !== popupId) {
            hidePopup();
        }
    },
);

// Phơi bày các phương thức để component cha có thể sử dụng
defineExpose({
    showPopup,
    hidePopup,
});
</script>

<style scoped></style>
