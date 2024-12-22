<template>
    <div class="avatar-placeholder">
        <img :src="src" v-if="src" :class="[classes, 'avatar']" alt="avatar" />
        <div
            v-else
            :class="classes"
            class="avatar-placeholder rounded-full"
            :style="{ backgroundColor: simpleColor }"
        >
            {{ firstLetterOfName }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    src: {
        type: [String, null],
        required: false,
    },
    name: {
        type: [String],
        required: false,
    },
    classes: {
        type: [String, Array],
        default: '',
    },
});

const firstLetterOfName = computed(() => {
    if (props.name) {
        return props.name.charAt(0).toUpperCase();
    }
    return '';
});

// Hàm đơn giản để tạo màu từ chữ cái đầu tiên
function getSimpleColorFromChar(char: string) {
    // Chuyển ký tự đầu tiên thành mã ASCII và tạo màu
    const charCode = char.charCodeAt(0);
    const hue = charCode % 360; // Tạo giá trị màu từ 0 - 360 (hue)
    return `hsl(${hue}, 70%, 50%)`; // Màu HSL với độ bão hòa và độ sáng cố định
}

// Tạo màu nền đơn giản từ chữ cái đầu tiên của tên người dùng
const simpleColor = computed(() => {
    return getSimpleColorFromChar(firstLetterOfName.value);
});
</script>

<style scoped lang="scss">
.avatar-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.avatar {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
</style>
