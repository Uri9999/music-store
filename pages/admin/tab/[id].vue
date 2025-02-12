<template>
    <HeaderPage title="Chi tiết Tab"> </HeaderPage>
    <div class="tab-creation">

        <div class="form flex gap-5 mt-3">
            <div class="attribute">
                <!-- Tên Tab -->
                <div class="mb-3">
                    <label for="name" class="block mb-1"> Tên </label>
                    <InputText
                        v-model="tabData.name"
                        id="name"
                        placeholder="Tên Tab"
                        class="w-full"
                        fluid
                        disabled
                    />
                </div>

                <!-- Tác Giả -->
                <div class="mb-3">
                    <label for="author" class="block mb-1"> Tác Giả </label>
                    <InputText
                        v-model="tabData.author"
                        id="author"
                        placeholder="Tác Giả"
                        class="w-full"
                        fluid
                        disabled
                    />
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
                        disabled
                    />
                </div>

                <!-- Danh mục -->
                <div class="mb-3">
                    <TreeSelectCommon
                        v-model="tabData.category_id"
                        :options="selection?.categories"
                        :disabled="true"
                        label="Danh Mục"
                        name="category"
                        :required="false"
                    ></TreeSelectCommon>
                </div>

                <!-- Người làm tab -->
                <div class="mb-3">
                    <label for="user" class="block mb-1">
                        Người làm Tab (Affiliate)
                    </label>
                    <div>
                        <Dropdown
                            disabled
                            v-model="tabData.user_id"
                            :options="affiliateUsers"
                            filter
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Affiliate trống"
                            class="w-full md:w-14rem"
                        />
                    </div>
                </div>

                <!-- Giá -->
                <div class="mb-3">
                    <label for="price" class="block mb-1"> Giá </label>
                    <div>
                        <InputNumber
                            disabled
                            v-model="tabData.price"
                            id="price"
                            fluid
                        />
                    </div>
                </div>

                <!-- discount money -->
                <div class="mb-3">
                    <label for="discount_money" class="block mb-1">
                        Giá KM
                    </label>
                    <div>
                        <InputNumber disabled v-model="tabData.discount_money" id="discount_money" fluid />
                    </div>
                </div>
            </div>

            <div class="attribute">
                <!-- Tải ảnh -->
                <div class="mb-3">
                    <label for="images" class="block mb-1"> Ảnh bài Tab </label>
                    <div
                        class="image-list"
                        v-if="tabData.images_url.length > 0"
                    >
                        <div
                            class="image-item"
                            v-for="(img, index) in tabData.images_url"
                        >
                            <img :src="img.url" alt="" />
                        </div>
                    </div>
                    <div v-else>Không có ảnh</div>
                </div>

                <!-- Tải PDF -->
                <div class="mb-3">
                    <label for="pdf" class="block mb-1"> PDF </label>
                    <Button
                        label="Download PDF"
                        v-if="tabData?.pdf"
                        icon="pi pi-download"
                        @click="downloadPdf"
                    />
                    <div v-else>File không tồn tại</div>
                </div>

                <!-- Mô tả -->
                <div class="mb-3">
                    <label for="description" class="block mb-1">Mô Tả</label>
                    <Textarea
                        disabled
                        v-model="tabData.description"
                        id="description"
                        rows="5"
                        class="w-full"
                        fluid
                    />
                </div>

                <!-- Button group -->
                <div class="mb-3 flex justify-content-between">
                    <div></div>
                    <Button
                        label="Trở lại"
                        severity="secondary"
                        @click="goBack"
                    />
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
import TreeSelectCommon from '~/components/General/TreeSelectCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({ layout: 'admin' });

const router = useRouter();
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
    discount_money: null,
    category_id: null,
    category_value: null,
    youtube_url: '',
    images: [] as File[],
    images_url: [] as string[],
    pdf: null as File | null,
} as any);

const route = useRoute();

const id = Number(route.params.id);
onMounted(async () => {
    try {
        selection.value = await selectionStore.getData();
        const response = (await Api.user.getManager({})) as any;
        affiliateUsers.value = response.data;

        const resShow = (await Api.tab.adminShow(id)) as any;
        tabData.value = resShow.data;
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = tabData.value.pdf.url;
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

    .image-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        img {
            display: inline-block;
        }
    }
}
</style>
