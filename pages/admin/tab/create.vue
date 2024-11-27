<template>
    <div class="update-user">
        <h2>Tạo tab</h2>

        <div class="form mt-3">
            <div>
                <div class="mb-3">
                    <label for="name" class="block mb-1"
                        >Tên <span class="error">*</span></label
                    >
                    <InputText
                        type="text"
                        placeholder="Name"
                        class="w-full"
                        v-model="tabData.name"
                        id="name"
                        fluid
                    />
                    <small class="error" v-if="tabDataError?.name">{{
                        tabDataError?.name[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="author" class="block mb-1"
                        >Tác giả <span class="error">*</span></label
                    >
                    <InputText
                        type="text"
                        placeholder="Author"
                        class="w-full"
                        v-model="tabData.author"
                        id="author"
                        fluid
                    />
                    <small class="error" v-if="tabDataError?.author">{{
                        tabDataError?.author[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="youtube" class="block mb-1">Youtube</label>
                    <InputText
                        type="text"
                        placeholder="Youtube"
                        class="w-full"
                        v-model="tabData.youtube_url"
                        id="youtube"
                        fluid
                    />
                    <small class="error" v-if="tabDataError?.youtube_url">{{
                        tabDataError?.youtube_url[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="category" class="block mb-1"
                        >Danh mục <span class="error">*</span></label
                    >
                    <TreeSelect
                        v-model="tabData.category_value"
                        :options="selection?.categories"
                        dataKey="value"
                        placeholder="Select an item"
                        :selection-mode="'single'"
                        id="category"
                    />
                    <small class="error" v-if="tabDataError?.category_id">{{
                        tabDataError?.category_id[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="user" class="block mb-1"
                        >Người làm tab (Affiliate)
                        <span class="error">*</span></label
                    >
                    <Dropdown
                        id="user"
                        v-model="tabData.user_id"
                        :options="allUserAffiliate"
                        filter
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Select a Affiliate"
                        class="w-full md:w-14rem"
                    ></Dropdown>
                    <small class="error" v-if="tabDataError?.user_id">{{
                        tabDataError?.user_id[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="description" class="block mb-1">Mô tả</label>
                    <Textarea
                        v-model="tabData.description"
                        id="description"
                        class="w-full"
                        rows="5"
                        fluid
                    />
                    <small class="error" v-if="tabDataError?.description">{{
                        tabDataError?.description[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="price" class="block mb-1"
                        >Giá <span class="error">*</span></label
                    >
                    <InputNumber v-model="tabData.price" id="price" fluid />
                    <small class="error" v-if="tabDataError?.price">{{
                        tabDataError?.price[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="price" class="block mb-1"
                        >Ảnh bài tab (tối đa 5 mảnh)
                        <span class="error">*</span></label
                    >
                    <FileUpload
                        name="demo[]"
                        :url="''"
                        :multiple="true"
                        chooseLabel="Chọn ảnh"
                        :showCancelButton="false"
                        :showUploadButton="false"
                        :fileLimit="5"
                        :maxFileSize="4194304"
                        ref="imageUpload"
                        :auto="false"
                    >
                    </FileUpload>
                    <small class="error" v-if="tabDataError?.images">{{
                        tabDataError?.price[0]
                    }}</small>
                </div>

                <div class="mb-3 flex justify-content-between">
                    <Button
                        label="Trở lại"
                        severity="secondary"
                        @click="back()"
                    ></Button>
                    <Button label="Lưu" @click="save()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import { useSelectionStore } from '~/stores/selectionStore';
import type { Selection } from '~/types/selection';

definePageMeta({
    layout: 'admin',
});

const imageUpload = ref<any>();
const allUserAffiliate = ref([]);
const toast = useToast();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
    await Api.user
        .getAllAffiliate({})
        .then((res: any) => {
            console.log('res', res);
            allUserAffiliate.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
});
const route = useRoute();
const router = useRouter();

const tabData = ref({
    name: null,
    author: null,
    description: null,
    user_id: null,
    price: null,
    category_id: null,
    category_value: null,
    youtube_url: null,
    images: [],
    pdf: null,
} as any);
const tabDataError = ref({
    name: [],
    author: [],
    description: [],
    user_id: [],
    price: [],
    category_id: [],
    youtube_url: [],
    images: [],
    pdf: [],
} as any);

const save = async () => {
    console.log(
        'imageUpload.value.files.length',
        imageUpload.value.files.length,
    );

    await imageUpload.value.upload();
    if (imageUpload.value.files.length > 0) {
        tabData.value.images = imageUpload.value.files;
    } else {
        console.log('Không có tệp nào để tải lên!');
    }

    tabData.value.category_id = tabData.value.category_value
        ? parseInt(Object.keys(tabData.value.category_value)[0])
        : null;
    console.log('tabData.value', tabData.value);

    await Api.tab
        .adminStore(tabData.value)
        .then((res: any) => {
            console.log('res', res);
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const back = () => {
    router.push('/admin/user');
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50px;
}

.update-user {
    max-width: 600px;
}
</style>
