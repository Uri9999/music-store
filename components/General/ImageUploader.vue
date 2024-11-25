<template>
    <Button class="btn-upload" @click="openPopup">
        {{ label }}
    </Button>
    <PopupCommon ref="popup">
        <div class="container">
            <div class="upload-head">
                <h2 class="mr-6">{{ label }}</h2>
                <i class="pi pi-times close" @click="close()"></i>
            </div>
            <div class="upload-container" v-if="!imageUrl">
                <input
                    type="file"
                    @change="onFileChange"
                    accept="image/*"
                    :class="{ dragging: isDragging }"
                    @dragenter="onDragEnter"
                    @dragleave="onDragLeave"
                    @dragover.prevent
                />
                <span>Nhấn hoặc kéo ảnh vào đây!</span>
            </div>

            <div class="img mx-auto mb-5" v-if="imageUrl">
                <img
                    ref="image"
                    class="crop-img"
                    :src="imageUrl"
                    alt="Image for Cropping"
                />
            </div>

            <div class="upload-footer" v-if="imageUrl">
                <Button
                    label="Chọn lại ảnh"
                    classes="px-[15px] btn"
                    @click="clear($event)"
                    outlined
                ></Button>
                <Button
                    label="Lưu"
                    classes="px-[15px] h-[30px] btn"
                    @click="saveImg()"
                ></Button>
            </div>
        </div>
    </PopupCommon>
</template>

<script setup lang="ts">
import { ref, nextTick, type PropType } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Api from '@/network/Api';
import PopupCommon from './PopupCommon.vue';

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    collection: {
        type: String,
        default: '',
    },
    classes: {
        type: [String, Array, Object],
        default: '',
    },
    aspectRatio: {
        type: Number as PropType<number>,
        default: 0, // 1 / 1
    },
});

const popup = ref<InstanceType<typeof PopupCommon> | null>(null);
const openPopup = (event: any) => {
    popup.value?.showPopup(event); // Gọi phương thức showPopup từ CommonPopup
};
const imageUrl = ref<string | null>(null);
const cropper = ref<Cropper | null>(null);
const croppedImage = ref<string | null>(null);
const emit = defineEmits(['upload']);
const isDragging = ref(false);

const onDragEnter = () => {
    isDragging.value = true;
};

const onDragLeave = () => {
    isDragging.value = false;
};

const onFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            imageUrl.value = reader.result as string;

            nextTick(() => {
                if (cropper.value) {
                    cropper.value.destroy();
                }
                const imageElement = document.querySelector(
                    '.crop-img',
                ) as HTMLImageElement;
                cropper.value = new Cropper(imageElement, {
                    aspectRatio: props.aspectRatio, // Tỷ lệ crop vd 1/2, rộng 1 - cao 2
                    viewMode: 1,
                });
            });
        };
    } else {
        // toast.error('Please select a valid image file.');
        imageUrl.value = null;
    }
};

const saveImg = async () => {
    console.log('save');

    if (cropper.value) {
        const canvas = cropper.value.getCroppedCanvas();
        croppedImage.value = canvas.toDataURL('image/png');
    }

    if (!croppedImage.value) return;
    const blob = dataURLtoBlob(croppedImage.value);

    const file = new File([blob], 'avatar.png', { type: 'image/png' });

    emit('upload', file);
    close();
};

const close = () => {
    popup.value?.hidePopup();
};

const clear = (event: any) => {
    imageUrl.value = null;
    cropper.value = null;
    croppedImage.value = null;
    isDragging.value = false;
    popup.value?.showPopup(event);
};

const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
</script>

<style scoped lang="scss">
.container {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgb(197, 197, 197) 0px 2px 8px;
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
.upload-container:has(.dragging) {
    border-color: rgb(90, 221, 3);
}

.upload-container {
    border: 2px dashed rgb(221, 221, 221);
    border-radius: 3px;
    height: 200px;
    position: relative;

    input {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background-color: transparent;
    }

    span {
        cursor: pointer;
        position: absolute;
        z-index: 0;
        top: 50%;
        left: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
    }
}

.crop-container {
    margin-top: 20px;
    border: 2px dashed #3498db;
    padding: 10px;
    border-radius: 10px;
    background-color: #ecf0f1;
}

.image-to-crop {
    max-width: 100%;
    max-height: 400px;
    border-radius: 10px;
}

.btn {
    border-radius: 3px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-upload {
    cursor: pointer;
}

.upload-footer {
    display: flex;
    justify-content: space-between;
}
.upload-head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
}
.close {
    cursor: pointer;
}
</style>
