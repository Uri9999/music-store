<template>
    <div class="cart my-5 pb-5">
        <h2>Danh sách đơn hàng</h2>
        <DataTable
            @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse"
            v-model:expandedRows="expandedRows"
            :value="items"
            dataKey="id"
            tableStyle="min-width: 50rem"
        >
            <template #header>
                <div class="flex flex-wrap justify-content-end gap-2">
                    <Button
                        text
                        icon="pi pi-plus"
                        label="Expand All"
                        @click="expandAll"
                    />
                    <Button
                        text
                        icon="pi pi-minus"
                        label="Collapse All"
                        @click="collapseAll"
                    />
                </div>
            </template>
            <Column expander style="width: 5rem" />
            <Column field="name" header="Ngày đặt hàng">
                <template #body="slotProps">
                    {{ slotProps.data.created_at }}
                </template>
            </Column>
            <Column field="status" header="Trạng thái">
                <template #body="slotProps">
                    <span
                        :class="convertStatus(slotProps.data?.status).class"
                        >{{ convertStatus(slotProps.data?.status).label }}</span
                    >
                </template>
            </Column>
            <Column header="Số lượng sản phẩm">
                <template #body="slotProps">
                    {{ slotProps.data.order_items.length }}
                </template>
            </Column>
            <Column field="total_price" header="Tổng số tiền">
                <template #body="slotProps">
                    {{ slotProps.data.total_price }} VND
                </template>
            </Column>
            <Column field="action" header="Hành động">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button label="Chi tiết" severity="success" />
                    </div> </template
            ></Column>

            <template #expansion="slotProps">
                <div class="p-4">
                    <DataTable :value="slotProps.data.order_items">
                        <Column field="name" header="Tên tab" sortable>
                            <template #body="slotProps">
                                {{ slotProps.data.meta.name }}
                            </template>
                        </Column>
                        <Column field="price" header="Giá" sortable>
                            <template #body="slotProps">
                                {{ slotProps.data.meta.price }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>

            <template #footer>
                <div class="footer">
                    <div class="quantity">
                        <div>
                            Tổng số đơn hàng:
                            {{ items ? items.length : 0 }}
                        </div>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Api from '~/network/Api';

const expandedRows = ref([]);
const onRowExpand = (event) => {
    console.log('Row expanded: ', event.data);
};

const onRowCollapse = (event) => {
    console.log('Row collapsed: ', event.data);
};
const expandAll = () => {
    // expandedRows.value = products.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
};
const collapseAll = () => {
    // expandedRows.value = null;
};
const router = useRouter();
const items = ref([]);
onMounted(async () => {
    await getTabs();
});
const getTabs = async () => {
    await Api.order
        .getMyOrder()
        .then((res: any) => {
            items.value = res.data;
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const convertStatus = (status: number) => {
    if (status == 1) {
        return { label: 'Khởi tạo', class: 'status-create' };
    } else if (status == 2) {
        return { label: 'Thanh toán thành công', class: 'status-process' };
    } else if (status == 3) {
        return { label: 'Hoàn thành', class: 'status-complete' };
    } else {
        return { label: 'Đã Hủy', class: 'status-fail' };
    }
};
</script>

<style scoped lang="scss">
.footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.cart {
    min-height: 70vh;
}

.status-create {
    background-color: rgb(197, 197, 197);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-process {
    background-color: rgb(0, 101, 253);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-complete {
    background-color: rgb(5, 187, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
.status-fail {
    background-color: rgb(187, 5, 5);
    color: white;
    padding: 6px;
    border-radius: 5px;
}
</style>
