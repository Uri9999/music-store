<template>
    <HeaderPage :title="'Chi tiết doanh thu của ' + user?.name"> </HeaderPage>
    <div class="mt-3 flex flex-wrap gap-2 align-items-end justify-content-between">
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
        </div>
        <div class="flex gap-2">
            <Button @click="search()">Tìm kiếm</Button>
        </div>
    </div>

    <div class="detail-revenue mt-3">
        <div class="order-items">
            <h3 class="title-detail mb-3">Tab bán được</h3>
            <DataTable :value="user?.order_items">
                <Column field="name" header="Tên">
                    <template #body="slotProps">
                        <span>{{ slotProps.data?.meta?.name }}</span>
                    </template>
                </Column>
                <Column field="price" header="Giá (Vnd)">
                    <template #body="slotProps">
                        <span>{{
                            formatNumberWithCommas(slotProps.data?.price)
                        }}</span>
                    </template>
                </Column>
                <Column field="approval_date" header="Ngày phê duyệt">
                    <template #body="slotProps">
                        <span>{{
                            formatNumberWithCommas(
                                slotProps.data?.order?.approval_date,
                            )
                        }}</span>
                    </template>
                </Column>

                <template #footer>
                    <div>
                        Tổng số tab bán được:
                        {{ user?.order_items ? user?.order_items.length : 0 }}
                    </div>
                    <div v-if="user?.order_items">
                        Tổng tiền (Vnd):
                        {{
                            formatNumberWithCommas(
                                calcTotalPrice(user.order_items),
                            )
                        }}
                    </div>
                    <div v-if="user?.order_items">
                        Hoa hồng nhận được ({{ user?.commission_rate }}%):
                        {{
                            formatNumberWithCommas(
                                (calcTotalPrice(user.order_items) *
                                    user?.commission_rate) /
                                    100,
                            )
                        }}
                    </div>
                </template>
            </DataTable>
        </div>

        <div class="user-subscriptions">
            <h3 class="title-detail mb-3">Subscription giới thiệu</h3>
            <DataTable :value="user?.referral_commissions">
                <Column field="name" header="Người đăng ký">
                    <template #body="slotProps">
                        <span>{{ slotProps.data?.user?.name }}</span>
                    </template>
                </Column>
                <Column field="approval_date" header="Ngày phê duyệt">
                    <template #body="slotProps">
                        <span>{{ slotProps.data?.approval_date }}</span>
                    </template>
                </Column>
                <Column field="price" header="Giá (Vnd)">
                    <template #body="slotProps">
                        <span>{{
                            formatNumberWithCommas(slotProps.data?.price)
                        }}</span>
                    </template>
                </Column>

                <template #footer>
                    <div>
                        Tổng số subscription:
                        {{ user?.referral_commissions ? user?.referral_commissions.length : 0 }}
                    </div>
                    <div v-if="user?.referral_commissions">
                        Tổng tiền (Vnd):
                        {{
                            formatNumberWithCommas(
                                calcTotalPrice(user.referral_commissions),
                            )
                        }}
                    </div>
                    <div v-if="user?.referral_commissions">
                        Hoa hồng nhận được ({{ user?.commission_rate }}%):
                        {{
                            formatNumberWithCommas(
                                (calcTotalPrice(user.referral_commissions) *
                                    user?.commission_rate) /
                                    100,
                            )
                        }}
                    </div>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import Api from '~/network/Api';
import HeaderPage from '~/components/General/HeaderPage.vue';
import { formatNumberWithCommas } from '#build/imports';
import CalendarCommon from '~/components/General/CalendarCommon.vue';

definePageMeta({
    layout: 'admin',
});

onMounted(async () => {
    await fetchShow();
});

const filter = ref({
    start_date: null,
    end_date: null,
});
const user = ref();
const route = useRoute();
const id = Number(route.params.id);
const fetchShow = async () => {
    Api.revenue
        .show(id, filter.value)
        .then((res: any) => {
            user.value = res.data;
            console.log('user', user.value);
        })
        .catch((err: any) => {
            console.log(err);
        });
};
const clearFilter = async () => {
    filter.value.start_date = null;
    filter.value.end_date = null;
    await search();
};
const search = async () => {
    await fetchShow()
};

const calcTotalPrice = (items: any) => {
    const total = items.reduce((total: number, item: any) => {
        return total + item.price;
    }, 0);

    return total;
};
</script>

<style scoped lang="scss">
.detail-revenue {
    display: flex;
    justify-content: space-between;

    .order-items {
        margin-right: 20px;
        width: 50%;
    }

    .user-subscriptions {
        width: 50%;
        margin-left: 20px;
    }
}

.title-detail {
    justify-content: center;
    display: flex;
    font-size: 1.5rem;
}
</style>
