<template>
    <div class="update-category">
        <h1>Cập nhật Danh mục</h1>

        <div class="form mt-3">
            <div>
                <div class="mb-3">
                    <label for="name" class="block mb-1"
                        >Tên <span class="error">*</span></label
                    >
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="bannerData.name"
                        id="name"
                        fluid
                    />
                    <small class="error" v-if="bannerDataError?.name">{{
                        bannerDataError?.name[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="description" class="block mb-1">Mô tả</label>
                    <Textarea
                        v-model="bannerData.description"
                        id="description"
                        class="w-full"
                        rows="5"
                        fluid
                    />
                    <small class="error" v-if="bannerDataError?.description">{{
                        bannerDataError?.description[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="image" class="block mb-1">Ảnh</label>
                    <UploadFile
                        :imgs="bannerData.images_url"
                        :filesUpload="bannerData.image"
                        @selectFiles="setSelectedFiles"
                        :visibleDelete="false"
                        :multiple="false"
                    ></UploadFile>
                    <small class="error" v-if="bannerDataError?.description">{{
                        bannerDataError?.description[0]
                    }}</small>
                </div>

                <div class="mb-3 flex justify-content-between">
                    <Button
                        label="Trở lại"
                        @click="back()"
                        severity="secondary"
                    ></Button>
                    <Button label="Lưu" @click="update()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import UploadFile from '~/components/General/UploadFile.vue';

definePageMeta({
    layout: 'admin',
});

const bannerData = ref({
    name: '',
    description: '',
    image: null,
    images_url: '',
} as any);
const bannerDataError = ref({
    name: [],
    description: [],
    image: [],
});
const router = useRouter();
const toast = useToast();
const route = useRoute();
const id = Number(route.params.id);
onMounted(async () => {
    await getBanner();
});

const getBanner = async () => {
    Api.banner
        .show(id)
        .then((res: any) => {
            bannerData.value = res.data;
        })
        .catch((err: any) => console.log(err));
};

const update = async () => {
    Api.banner
        .update(id, bannerData.value)
        .then((res: any) => {
            router.push('/admin/banner/' + id);
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                bannerDataError.value = err.errors;
            }
        });
};

const setSelectedFiles = (file: File) => {
    console.log('file', file);
    
    bannerData.value.image = file;
};

const back = () => {
    router.go(-1);
};
</script>

<style lang="scss" scoped>
.update-category {
    max-width: 600px;
}
</style>
