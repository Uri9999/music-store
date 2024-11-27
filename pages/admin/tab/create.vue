<template>
    <div class="tab-creation">
        <h2>Tạo Tab</h2>

        <div class="form mt-3">
            <div>
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

                <!-- Danh mục -->
                <div class="mb-3">
                    <label for="category" class="block mb-1">
                        Danh Mục <span class="error">*</span>
                    </label>
                    <div>
                        <TreeSelect
                            v-model="tabData.category_value"
                            :options="selection?.categories"
                            dataKey="value"
                            placeholder="Chọn danh mục"
                            selection-mode="single"
                            id="category"
                        />
                    </div>
                    <small class="error" v-if="tabErrors?.category_id">{{
                        tabErrors?.category_id[0]
                    }}</small>
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

                <!-- Tải ảnh -->
                <div class="mb-3">
                    <label for="images" class="block mb-1">
                        Ảnh bài Tab (Tối đa 5 ảnh)
                        <span class="error">*</span>
                    </label>
                    <FileUpload
                        ref="imageUpload"
                        name="images[]"
                        :multiple="true"
                        :fileLimit="5"
                        :maxFileSize="4194304"
                        :showUploadButton="false"
                        :showCancelButton="false"
                        chooseLabel="Chọn ảnh"
                        :auto="false"
                        @upload="onFileUpload"
                    />
                    <small class="error" v-if="tabErrors?.images">{{
                        tabErrors?.images[0]
                    }}</small>
                </div>

                <!-- Button group -->
                <div class="mb-3 flex justify-content-between">
                    <Button
                        label="Trở lại"
                        severity="secondary"
                        @click="goBack"
                    />
                    <Button label="Lưu" @click="saveTab" />
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

definePageMeta({ layout: 'admin' });

const toast = useToast();
const router = useRouter();
const route = useRoute();

const imageUpload = ref<any>();
const affiliateUsers = ref<any[]>([]);
const selection = ref<Selection | null>(null);
const selectionStore = useSelectionStore();

// Data model
const tabData = ref({
    name: '',
    author: '',
    description: '',
    user_id: null,
    price: null,
    category_id: null,
    category_value: null,
    youtube_url: '',
    images: [] as File[],
    pdf: null,
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
        const response = await Api.user.getAllAffiliate({});
        affiliateUsers.value = response.data;
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

// Handle file upload event
const onFileUpload = (event: any) => {
    tabData.value.images = event.files;
    console.log('Uploaded files:', event.files);
};

// Save tab data
const saveTab = async () => {
    try {
        if (imageUpload.value.files.length > 0) {
            tabData.value.images = imageUpload.value.files;
        }

        tabData.value.category_id = tabData.value.category_value
            ? parseInt(Object.keys(tabData.value.category_value)[0])
            : null;

        const response = (await Api.tab.adminStore(tabData.value)) as any;
        console.log('Tab saved successfully:', response);
        toast.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: response?.message,
            life: 3000,
        });
    } catch (error: any) {
        console.error('Error saving tab:', error);
        if (error?.status == 422) {
            tabErrors.value = error.errors;
        }
        toast.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: error?.message,
            life: 3000,
        });
    }
};

// Navigate back to previous page
const goBack = () => {
    router.push('/admin/user');
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.tab-creation {
    max-width: 600px;
}
</style>
