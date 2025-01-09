<template>
    <div class="search-icon">
        <span class="menu-icon ml-2" @click="openPopup">
            <i class="pi pi-search"></i>
        </span>

        <PopupCommon ref="popup">
            <div class="search-body text-base">
                <IconField>
                    <InputIcon
                        class="pi pi pi-search icon-search"
                        @click="submitSearch()"
                    />
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="text"
                        placeholder="Tìm kiếm"
                        fluid
                        @keyup="submitSearch"
                        @vue:mounted="textFocus"
                    />
                </IconField>
                <!-- <small v-show="isShowInstruct">Enter to search</small> -->
                <div class="list-result">
                    <div
                        v-for="(result, index) in results"
                        :key="index"
                        @click="gotoDetail(result.slug)"
                        class="cursor-pointer item-result"
                    >
                        {{ result.name }}
                    </div>
                    <div
                        v-show="showBtnLoadMore"
                        class="see-more"
                        @click="getMoreResult()"
                    >
                        Xem thêm...
                    </div>
                    <small v-show="isShowNoResult">Không tìm thấy !</small>
                </div>
            </div>
        </PopupCommon>
    </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import Api from '@/network/Api';
import type { Tab } from '~/types/tab';
import { useRouter } from 'vue-router';
import PopupCommon from './PopupCommon.vue';
import InputText from 'primevue/inputtext';

const router = useRouter();
const text = ref('');
const isLastPageResult = ref(false);
const currentPage = ref(1);
const results = ref([] as Tab[]);
const isShowNoResult = ref(false);
const isShowInstruct = ref(true);
const showBtnLoadMore = ref(false);
const resetData = () => {
    text.value = '';
    isShowNoResult.value = false;
    isShowInstruct.value = true;
    showBtnLoadMore.value = false;
    results.value = [];
};

const gotoDetail = async (slug: string) => {
    popup.value?.hidePopup();

    await router.push('/tab/' + slug);
};

const submitSearch = async () => {
    results.value = [];
    showBtnLoadMore.value = false;
    isShowNoResult.value = false;
    if (text.value.length === 0) {
        isShowNoResult.value = true;
        return;
    }

    isShowInstruct.value = false;
    await getResult();
};

const getMoreResult = async () => {
    if (!isLastPageResult.value) {
        currentPage.value++;
        await getResult();
    }
};

const getResult = async () => {
    await Api.tab
        .index({ search: text.value, page: currentPage.value, per_page: 5 })
        .then((res: any) => {
            results.value = results.value.concat(res.data);
            console.log('results.value', results.value);

            isLastPageResult.value = res.meta.lastPage === res.meta.currentPage;
            showBtnLoadMore.value = !isLastPageResult.value;

            isShowNoResult.value = false;
            if (results.value.length === 0) {
                isShowNoResult.value = true;
                showBtnLoadMore.value = false;
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const popup = ref<InstanceType<typeof PopupCommon> | null>(null);
const openPopup = (event: any) => {
    popup.value?.showPopup(event);

    nextTick(() => {});
};
const textFocus = (el: any) => {
    el.el?.focus();
};
</script>

<style lang="scss" scoped>
.search-icon {
    width: 43px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    position: relative;

    .search-body {
        z-index: 10;
        overflow-y: auto;
        position: absolute;
        top: 45px;
        right: -103px;
        width: 500px;
        max-height: 700px;
        padding: 16px;
        background-color: white;
        box-shadow: rgb(201, 201, 201) 0px 4px 12px;
        border-radius: 2px;

        .list-result .item-result {
            padding: 8px;
            color: black;
            &:hover {
                background-color: rgb(238, 238, 238);
            }
        }
    }
}

@media (max-width: 550px) {
    .search-body {
        position: fixed !important;
        left: 5vw;
        width: 90vw !important;
        max-height: 50%;
    }
}

.menu-icon {
    display: inline-block;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(238, 238, 238);
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}

.icon-search {
    cursor: pointer;
}

.see-more {
    cursor: pointer;
    font-size: 0.9rem;
    color: rgb(90, 0, 0);
}
</style>
