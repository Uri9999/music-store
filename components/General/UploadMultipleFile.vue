<template>
    <div class="upload-multiple">
   
        <div class="current-file mb-3 imgs-detail">
            <div
                v-for="(image, index) in imgs"
                :key="image?.id"
                class="image-container"
            >
                <img
                    :src="image?.url"
                    alt="Image Preview"
                    class="image-preview"
                />
                <Button
                    class="btn-remove"
                    icon="pi pi-times"
                    rounded
                    severity="danger"
                    @click="emit('deleteById', image?.id)"
                    v-if="!hidenDelete"
                />
            </div>

            <div
                v-for="(image, index) in currentFiles"
                :key="image?.id"
                class="image-container"
            >
                <img
                    :src="image?.url"
                    alt="Image Preview"
                    class="image-preview"
                />
                <Button
                    class="btn-remove"
                    icon="pi pi-times"
                    rounded
                    severity="danger"
                    @click="emit('deleteUploadIndex', index)"
                    v-if="!hidenDelete"
                />
            </div>
        </div>
        <FileUpload
            mode="basic"
            @select="onFileSelect"
            :multiple="true"
            customUpload
            auto
            severity="secondary"
            class="p-button-outlined"
            chooseLabel="Chọn ảnh"
        />
    </div>
</template>

<script lang="ts" setup>
import type { MediaType } from '~/types/File';
import { watch } from 'vue';
const props = defineProps({
    imgs: {
        type: Array,
        required: false,
        default: () => [] as MediaType[],
    },
    filesUpload: {
        type: Array,
        required: false,
        default: () => [] as File[],
    },
    hidenDelete: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['selectFiles', 'deleteById', 'deleteUploadIndex']);

const currentFiles = ref<any[]>([]);

watch(
    () => props.filesUpload,
    (files: any) => {
        currentFiles.value = [];
        files.forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                currentFiles.value.push({
                    id: null,
                    type: 0,
                    url: e.target.result,
                });
            };
            reader.readAsDataURL(file);
        });
    },
    { immediate: true, deep: true },
);

function onFileSelect(event: any) {
    const files = event.files;
    emit('selectFiles', files);
}
</script>

<style lang="scss" scoped>
.imgs-detail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    img {
        display: inline-block;
    }

    .image-container {
        position: relative;
        .btn-remove {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
</style>
