<template>
    <CIcon
        name="pen"
        :class="classes"
        class="cursor-pointer"
        @click="openPopup"
    ></CIcon>
    <PopupCommon ref="popup">
        <div class="container">
            <h2>Upload and Crop Image</h2>
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
                <span>Click or drop image to here!</span>
            </div>

            <div class="img mx-auto" v-if="imageUrl">
                <img
                    ref="image"
                    class="crop-img"
                    :src="imageUrl"
                    alt="Image for Cropping"
                />

                <div class="progress-bar-container mt-5">
                    <div
                        class="progress-bar"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>
                <p>{{ progress }}%</p>
            </div>

            <div class="flex justify-between mt-[20px]" v-if="imageUrl">
                <Button
                    label="Save"
                    classes="px-[15px] h-[30px] btn"
                    @clickCButton="saveImg()"
                ></Button>
                <Button
                label="Clear"
                    classes="px-[15px] btn"
                    @clickCButton="clear"
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
        default: 1 / 1,
    },
});

const progress = ref(0);
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
    if (cropper.value) {
        const canvas = cropper.value.getCroppedCanvas();
        croppedImage.value = canvas.toDataURL('image/png');
    }

    if (!croppedImage.value) return;
    const blob = dataURLtoBlob(croppedImage.value);

    const file = new File([blob], 'avatar.png', { type: 'image/png' });
    // await Api.user
    //     .upload(props.collection, file, (progressEvent) => {
    //         const percentCompleted = Math.round(
    //             (progressEvent.loaded * 100) / progressEvent.total,
    //         );
    //         progress.value = percentCompleted;
    //     })
    //     .then((res: any) => {
    //         // cho delay 0.7s vì trường hợp load nhanh quá ko nhìn được thanh progress
    //         setTimeout(() => {
    //             emit('upload', res.data.original_url);
    //             popup.value?.hidePopup();
    //             clear();
    //         }, 700);
    //     })
    //     .catch((err: any) => {
    //         console.log(err);
    //         // toast.error(err);
    //     });
};

const clear = () => {
    imageUrl.value = null;
    cropper.value = null;
    croppedImage.value = null;
    isDragging.value = false;
    progress.value = 0;
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
    background-color: var(--bg-color-primary);
    box-shadow: var(--shadow-color-primary) 0px 2px 8px;
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.upload-container:has(.dragging) {
    border-color: var(--text-color-second);
}

.upload-container {
    border: 2px dashed var(--border-color-primary);
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

h2 {
    font-family: 'Roboto', sans-serif;
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: left;
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

.bg-second {
    background-color: var(--bg-color-second);
}

.progress-bar-container {
    width: 100%;
    height: 5px;
    background-color: #f3f3f3;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-color-primary);
}

.progress-bar {
    height: 100%;
    background-color: #3787ff; /* Màu xanh lá cây */
    width: 0%; /* Bắt đầu với chiều rộng là 0 */
    transition: width 0.4s ease;
}
</style>
