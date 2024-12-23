<template>
    <div class="bell-icon">
        <span class="menu-icon ml-2" @click="openPopup">
            <i class="pi pi-bell"></i>
            <span v-if="countNotRead != 0" class="badge">{{
                countNotRead
            }}</span>
        </span>
        <PopupCommon ref="popup">
            <div class="bell-content text-base">
                <div
                    class="head-notice flex justify-content-between align-items-center py-2 px-3 border-bottom"
                >
                    <div class="notify-title">Thông báo mới</div>
                    <div class="read-all" @click="readAll">Đọc toàn bộ</div>
                </div>
                <div @scroll="onScroll" class="content-notice">
                    <div v-if="notifications.length">
                        <div
                            v-for="(notice, index) in notifications"
                            :key="index"
                            class="item-notice cursor-pointer py-3 px-3 border-bottom relative"
                            @click="gotoDetail(notice.id)"
                            :class="{ 'un-read': notice.status != 2 }"
                        >
                            <div class="title-notice">{{ notice.title }}</div>
                            <div class="body-notice">
                                {{ getContentNotice(notice.body) }}
                            </div>
                            <div class="send-at" v-if="notice.send_at">
                                {{
                                    moment(notice.send_at).format(
                                        'HH:mm DD-MM-YYYY',
                                    )
                                }}
                            </div>
                        </div>
                        <div class="h-[58px] w-full" v-show="!isLastPage">
                            <LoadingCommon></LoadingCommon>
                        </div>
                    </div>
                    <div v-else class="notify-null py-5">Chưa có thông báo</div>
                </div>
                <div
                    class="text-center cursor-pointer p-2 border-top view-detail"
                    @click="gotoListNotification"
                >
                    Xem chi tiết
                </div>
            </div>
        </PopupCommon>
    </div>
</template>

<script lang="ts" setup>
import PopupCommon from './PopupCommon.vue';
import { ref, onMounted, computed } from 'vue';
import Api from '@/network/Api';
import moment from 'moment';
import { useRouter } from 'vue-router';
import type { NotificationType } from '~/types/notification';
import LoadingCommon from './LoadingCommon.vue';

const toast = useToast();
const notifications = ref([] as NotificationType[]);
const isLoading = ref(false);
const router = useRouter();
const currentPage = ref(0);
const isLastPage = ref(false);
const countNotRead = ref(0);

const getNotification = async () => {
    isLoading.value = true;
    await Api.notification
        .getMyNotify({ page: currentPage.value + 1 })
        .then((res: any) => {
            isLastPage.value = res.meta.lastPage === res.meta.currentPage;
            currentPage.value = res.meta.currentPage;
            notifications.value = notifications.value.concat(res.data);
        })
        .catch((err: any) => {
            console.log(err);
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const getCountNotRead = async () => {
    await Api.notification
        .countNotReadYet()
        .then((res: any) => {
            countNotRead.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const count = computed(() => {
    return countNotRead.value > 9 ? '+9' : countNotRead.value;
});

onMounted(async () => {
    isLoading.value = true;
    await getCountNotRead();
    await getNotification();
});

const getContentNotice = (text: string) => {
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
};

const onScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
        if (!isLoading.value && !isLastPage.value) {
            getNotification();
        }
    }
};

const popup = ref<InstanceType<typeof PopupCommon> | null>(null);

const openPopup = (event: any) => {
    popup.value?.showPopup(event);

    nextTick(() => {});
};

const gotoSetting = () => {
    popup.value?.hidePopup();
    router.push({ name: 'VSetting' });
};

const gotoListNotification = () => {
    popup.value?.hidePopup();
    router.push('/notification');
};

const gotoDetail = (id: number) => {
    router.push({ path: '/notification', query: { id: id } });
};

const readAll = async () => {
    await Api.notification
        .readAll()
        .then((res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            notifications.value = []
            countNotRead.value = 0;
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Có lỗi xảy ra',
                detail: err.message,
                life: 3000,
            });
        });
};
</script>

<style lang="scss" scoped>
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
    .badge {
        position: absolute;
        top: 13px;
        right: -5px;
        width: 16px;
        height: 16px;
        border-radius: 10px;
        background-color: var(--color-2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.6rem;
    }
}

.bell-icon {
    position: relative;

    .count-not-read {
        position: absolute;
        top: 50%;
        left: 60%;
        width: 15px;
        height: 15px;
        line-height: 15px;
        // background-color: red;
        color: white;
    }

    .bell-content {
        position: absolute;
        z-index: 10;
        right: -90px;
        width: 400px;
        background-color: white;
        box-shadow: rgb(201, 201, 201) 0px 4px 12px;
        border-radius: 2px;

        .content-notice {
            max-height: 430px;
            overflow-y: auto;

            .item-notice {
                border-bottom: 1px solid rgb(233, 233, 233);
                &:hover {
                    background-color: rgb(235, 235, 235);
                }
            }
        }
    }
}
/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(209, 209, 209);
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(185, 185, 185);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    // background: #b4b4b4;
}

.border-bottom {
    border-bottom: 1px solid rgb(233, 233, 233);
}

.border-top {
    border-top: 1px solid rgb(233, 233, 233);
}

.view-detail {
    color: var(--color-2);
}

.send-at {
    font-size: 0.9rem;
    color: rgb(94, 11, 11);
    display: flex;
    justify-content: end;
    position: absolute;
    bottom: 0;
    right: 20px;
}

.setting-notify {
    cursor: pointer;
}
.notify-title {
    color: var(--color-2);
    font-weight: 700;
}
.read-all {
    font-size: 0.9rem;
    color: var(--color-2);
    cursor: pointer;
}

.notify-null {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-2);
}
.un-read {
    // background-color: #D9ECFF;
}
</style>
