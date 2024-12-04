<template>
    <div class="tab-creation">
        <HeaderPage title="Cập nhật Tab"> </HeaderPage>
        <div class="form flex gap-5 mt-3">
            <div class="attribute">
                <!-- Tên Tab -->
                <div class="mb-3">
                    <label for="name" class="block mb-1">
                        Tên <span class="error">*</span>
                    </label>
                    <InputText
                        v-model="tabData.name"
                        id="name"
                        placeholder="Tên Tab"
                        class="w-full"
                        fluid
                    />
                    <small class="error" v-if="tabErrors?.name">{{
                        tabErrors?.name[0]
                    }}</small>
                </div>

                <!-- Tác Giả -->
                <div class="mb-3">
                    <label for="author" class="block mb-1">
                        Tác Giả <span class="error">*</span>
                    </label>
                    <InputText
                        v-model="tabData.author"
                        id="author"
                        placeholder="Tác Giả"
                        class="w-full"
                        fluid
                    />
                    <small class="error" v-if="tabErrors?.author">{{
                        tabErrors?.author[0]
                    }}</small>
                </div>

                <!-- Youtube URL -->
                <div class="mb-3">
                    <label for="youtube" class="block mb-1">Youtube</label>
                    <InputText
                        v-model="tabData.youtube_url"
                        id="youtube"
                        placeholder="Youtube"
                        class="w-full"
                        fluid
                    />
                    <small class="error" v-if="tabErrors?.youtube_url">{{
                        tabErrors?.youtube_url[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <TreeSelectCommon
                        v-model="tabData.category_id"
                        :options="selection?.categories"
                        name="category"
                        :error="tabErrors?.category_id"
                        label="Danh Mục"
                    ></TreeSelectCommon>
                </div>

                <!-- Người làm tab -->
                <div class="mb-3">
                    <label for="user" class="block mb-1">
                        Người làm Tab (Affiliate) <span class="error">*</span>
                    </label>
                    <div>
                        <Dropdown
                            v-model="tabData.user_id"
                            :options="affiliateUsers"
                            filter
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Chọn Affiliate"
                            class="w-full md:w-14rem"
                        />
                    </div>
                    <small class="error" v-if="tabErrors?.user_id">{{
                        tabErrors?.user_id[0]
                    }}</small>
                </div>

                <!-- Giá -->
                <div class="mb-3">
                    <label for="price" class="block mb-1">
                        Giá <span class="error">*</span>
                    </label>
                    <div>
                        <InputNumber v-model="tabData.price" id="price" fluid />
                    </div>
                    <small class="error" v-if="tabErrors?.price">{{
                        tabErrors?.price[0]
                    }}</small>
                </div>
            </div>

            <div class="attribute">
                <!-- Sửa ảnh -->
                <div class="mb-3">
                    <label for="images" class="block mb-1">
                        Ảnh bài Tab (Tối đa 5 ảnh)
                        <span class="error">*</span>
                    </label>
                    <UploadMultipleFile
                        :imgs="tabData.images_url"
                        :filesUpload="tabData.images"
                        @deleteById="confirmDelete"
                        @selectFiles="setSelectedFiles"
                        @deleteUploadIndex="deleteImagesByIndex"
                    ></UploadMultipleFile>
                    <small class="error" v-if="tabErrors?.images">{{
                        tabErrors?.images[0]
                    }}</small>
                </div>

                <!-- Tải PDF -->
                <div class="mb-3">
                    <label for="pdf" class="block mb-1">
                        Tải PDF <span class="error">*</span>
                    </label>
                    <div class="mb-3" v-if="tabData.pdf">
                        <Button
                            label="Download PDF"
                            v-if="tabData?.pdf"
                            icon="pi pi-download"
                            @click="downloadPdf(tabData?.pdf.url)"
                        />
                    </div>
                    <FileUpload
                        mode="basic"
                        ref="pdfUpload"
                        name="pdf"
                        :accept="'application/pdf'"
                        :maxFileSize="10485760"
                        chooseLabel="Cập nhật PDF"
                    />
                    <small class="error" v-if="tabErrors?.pdf">{{
                        tabErrors?.pdf[0]
                    }}</small>
                </div>

                <!-- Mô tả -->
                <div class="mb-3">
                    <label for="description" class="block mb-1">Mô Tả</label>
                    <Textarea
                        v-model="tabData.description"
                        id="description"
                        rows="5"
                        class="w-full"
                        fluid
                    />
                    <small class="error" v-if="tabErrors?.description">{{
                        tabErrors?.description[0]
                    }}</small>
                </div>

                <!-- Button group -->
                <div class="mb-3 flex justify-content-between">
                    <Button
                        label="Trở lại"
                        severity="secondary"
                        @click="goBack"
                    />
                    <Button @click="update" label="Cập nhật" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import { useSelectionStore } from '~/stores/selectionStore';
import type { Selection } from '~/types/selection';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import UploadMultipleFile from '~/components/General/UploadMultipleFile.vue';
import TreeSelectCommon from '~/components/General/TreeSelectCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({ layout: 'admin' });

const toast = useToast();
const router = useRouter();
const pdfUpload = ref<any>();
const affiliateUsers = ref<any[]>([]);
const selection = ref<Selection | null>(null);
const selectionStore = useSelectionStore();
const route = useRoute();
const id = Number(route.params.id);

const tabData = ref({
    name: '',
    author: '',
    description: '',
    user_id: null,
    price: null,
    category_id: null,
    youtube_url: '',
    images: [] as File[],
    images_url: [] as any,
    pdf: null as File | null,
} as any);

const tabErrors = ref({
    name: [],
    author: [],
    description: [],
    user_id: [],
    price: [],
    category_id: [],
    youtube_url: [],
    images: [],
    pdf: [],
});

onMounted(async () => {
    try {
        selection.value = await selectionStore.getData();
        const response = (await Api.user.getAllAffiliate({})) as any;
        affiliateUsers.value = response.data;

        await getDetailTab();
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

const getDetailTab = async () => {
    try {
        const resShow = (await Api.tab.adminShow(id)) as any;
        tabData.value = resShow.data;
        // Kiểm tra và khởi tạo lại images nếu cần
        if (!Array.isArray(tabData.value.images)) {
            tabData.value.images = [];
        }
    } catch (error: any) {
        console.log(error);
    }
};

const confirm = useConfirm();
const confirmDelete = (mediaId: number) => {
    confirm.require({
        header: 'Xác nhận xóa ảnh',
        message: 'Bạn có chắc chắn muốn xóa ảnh ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteImage(mediaId);
            tabData.value.images_url = tabData.value.images_url.filter(
                (image: any) => image.id !== mediaId,
            );
        },
        reject: () => {},
    });
};
const deleteImage = async (mediaId: number) => {
    try {
        const resDelete = (await Api.tab.adminRemoveTabImage(
            id,
            mediaId,
        )) as any;
        toast.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: resDelete?.message,
            life: 3000,
        });
    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: error?.message,
            life: 3000,
        });
    }
};
const setSelectedFiles = (files: File[]) => {
    files.forEach((file: File) => {
        tabData.value.images.push(file);
    });
};

const deleteImagesByIndex = (index: number) => {
    tabData.value.images.splice(index, 1);
};

const update = async () => {
    try {
        if (pdfUpload.value.files.length > 0) {
            tabData.value.pdf = pdfUpload.value.files[0];
        }
        const resUpdate = (await Api.tab.adminUpdateTab(
            id,
            tabData.value,
        )) as any;
        router.push('/admin/tab/' + id);
        toast.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: resUpdate?.message,
            life: 3000,
        });
    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: error?.message,
            life: 3000,
        });
    }
};

const downloadPdf = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = tabData.value.name + '.pdf';
    link.target = '_blank';
    link.click();
};

const goBack = () => {
    router.go(-1);
};
</script>

<style lang="scss" scoped>
.attribute {
    width: 50%;
}
</style>
