<template>
    <HeaderPage title="Dashboard"> </HeaderPage>
    <div>
        <div>
            <div
                class="flex flex-wrap gap-2 align-items-end justify-content-between mt-1"
            >
                <div class="flex gap-2 mt-2">
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Reset bộ lọc"
                        outlined
                        @click="clearFilter()"
                    />
                    <CalendarCommon
                        v-model="filter.start_date"
                        placeholder="từ ngày"
                    ></CalendarCommon>
                    <CalendarCommon
                        v-model="filter.end_date"
                        placeholder="đến ngày"
                    ></CalendarCommon>
                    <Button @click="getCount()">Tìm kiếm</Button>
                </div>
                <div class="flex gap-2"></div>
            </div>
            <div class="flex mt-3">
                <div
                    v-if="!isAffiliate"
                    class="head-item type-2 m-2"
                    @click="router.push('/admin/user')"
                >
                    <div class="flex justify-content-between p-3">
                        <div>
                            <p class="value">
                                {{ formatNumberWithCommas(count?.user_count) }}
                            </p>
                            <p class="detail">Người dùng</p>
                        </div>
                        <div class="icon"><Icon name="person-add"></Icon></div>
                    </div>
                    <div
                        class="info flex align-items-center justify-content-center py-1"
                    >
                        Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                    </div>
                </div>

                <div
                    v-if="!isAffiliate"
                    class="head-item type-1 m-2"
                    @click="router.push('/admin/order')"
                >
                    <div class="flex justify-content-between p-3">
                        <div>
                            <p class="value">
                                {{ formatNumberWithCommas(count?.order_count) }}
                            </p>
                            <p class="detail">Đơn hàng</p>
                        </div>
                        <div class="icon">
                            <Icon name="shopping-bag"></Icon>
                        </div>
                    </div>
                    <div
                        class="info flex align-items-center justify-content-center py-1"
                    >
                        Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                    </div>
                </div>

                <div
                    class="head-item type-3 m-2"
                    @click="router.push('/admin/tab')"
                >
                    <div class="flex justify-content-between p-3">
                        <div>
                            <p class="value">
                                {{ formatNumberWithCommas(count?.tab_count) }}
                            </p>
                            <p class="detail">Tab</p>
                        </div>
                        <div class="icon">
                            <Icon name="music-note-add"></Icon>
                        </div>
                    </div>
                    <div
                        class="info flex align-items-center justify-content-center py-1"
                    >
                        Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                    </div>
                </div>

                <div
                    class="head-item type-4 m-2"
                    @click="router.push('/admin/revenue')"
                >
                    <div class="flex justify-content-between p-3">
                        <div>
                            <p class="value">
                                {{ formatNumberWithCommas(count?.tab_revenue) }}
                            </p>
                            <p class="detail">Doanh thu Tab</p>
                        </div>
                        <div class="icon">
                            <Icon name="attach-money"></Icon>
                        </div>
                    </div>
                    <div
                        class="info flex align-items-center justify-content-center py-1"
                    >
                        Xem chi tiết <Icon name="attach-money"></Icon>
                    </div>
                </div>

                <div
                    class="head-item type-5 m-2"
                    @click="router.push('/admin/revenue')"
                >
                    <div class="flex justify-content-between p-3">
                        <div>
                            <p class="value">
                                {{
                                    formatNumberWithCommas(
                                        count?.subscription_revenue,
                                    )
                                }}
                            </p>
                            <p class="detail">Doanh thu Subscription</p>
                        </div>
                        <div class="icon"><Icon name="add-card"></Icon></div>
                    </div>
                    <div
                        class="info flex align-items-center justify-content-center py-1"
                    >
                        Xem chi tiết <Icon name="arrow-right-alt"></Icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart mt-3" v-if="!isAffiliate">
            <h2>Biểu đồ</h2>
            <div
                class="flex flex-wrap gap-2 align-items-end justify-content-between mt-1"
            >
                <div class="flex gap-2 mt-2">
                    <Calendar
                        v-model="selectedYear"
                        placeholder="năm"
                        :view="'year'"
                        :showIcon="true"
                        :dateFormat="'yy'"
                        :monthNavigator="false"
                        :yearNavigator="true"
                        :yearRange="'2023:2030'"
                    />
                    <Button @click="getStats()">Tìm kiếm</Button>
                </div>
                <div class="flex gap-2"></div>
            </div>

            <div class="chart">
                <Chart
                    :type="'line'"
                    :data="chartData"
                    :options="chartOptions"
                    class="h-30rem"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Icon from '~/components/General/Icon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import Api from '~/network/Api';
import { formatNumberWithCommas } from '#build/imports';
import Chart from 'primevue/chart';
import moment from 'moment';
import CalendarCommon from '~/components/General/CalendarCommon.vue';
import { useAuthStore } from '#build/imports';

definePageMeta({
    layout: 'admin',
});

const { isAffiliate } = useAuthStore();
const filter = ref({
    start_date: null,
    end_date: null,
});
const selectedYear = ref<Date>(new Date(moment().year(), 0, 1));
const router = useRouter();
const count = ref();

onMounted(async () => {
    await getCount();
    await getStats();
});

const getCount = async () => {
    await Api.dashboard
        .getCount(filter.value)
        .then((res: any) => {
            count.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const chartData = ref({});
const getStats = async () => {
    try {
        const year = moment(selectedYear.value).format('YYYY');
        const [userStatsResponse, orderStatsResponse, tabStatsResponse] =
            (await Promise.all([
                Api.dashboard.getUserStats({ year: year }),
                Api.dashboard.getOrderStats({ year: year }),
                Api.dashboard.getTabStats({ year: year }),
            ])) as any;

        const userStats = userStatsResponse.data;
        const orderStats = orderStatsResponse.data;
        const tabStats = tabStatsResponse.data;

        chartData.value = {
            labels: userStats.months.map((month: number) => `Tháng ${month}`), // Tháng 1, Tháng 2, ...
            datasets: [
                {
                    label: 'Số lượng người dùng mới',
                    backgroundColor: '#28a745',
                    borderColor: '#28a745',
                    data: userStats.data,
                    tension: 0.3,
                },
                {
                    label: 'Số lượng đơn hàng mới',
                    backgroundColor: '#17a2b8',
                    borderColor: '#17a2b8',
                    data: orderStats.data,
                    tension: 0.3,
                },
                {
                    label: 'Số lượng bài Tab mới',
                    backgroundColor: '#ffc107',
                    borderColor: '#ffc107',
                    data: tabStats.data,
                    tension: 0.3,
                },
            ],
        };
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
    }
};

const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            enabled: true,
        },
    },
});

const clearFilter = async () => {
    filter.value.start_date = null;
    filter.value.end_date = null;
    await getCount();
};
</script>

<style lang="scss" scoped>
.head-item {
    width: 20%;
    border-radius: 5px;
    color: rgb(255, 255, 255);

    cursor: pointer;
    position: relative;
    .icon {
        color: rgba($color: #000000, $alpha: 0.2);
        transform: scale(2.5);
        position: absolute;
        top: 30px;
        right: 30px;
    }
    .value {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
    }
    .detail {
        font-size: 1.1rem;
    }
    .info {
        background-color: rgba($color: #000000, $alpha: 0.1);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}

.type-1 {
    background-color: #17a2b8;
}
.type-2 {
    background-color: #28a745;
}
.type-3 {
    background-color: #ffc107;
}
.type-4 {
    background-color: #dc3545;
}
.type-5 {
    background-color: #5017b9;
}

.chart {
    max-width: 1200px;
}
</style>
