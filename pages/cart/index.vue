<template>
    <div class="cart my-5 pb-5">
        <h2>Danh sách sản phẩm trong giỏ hàng</h2>
        <DataTable
            v-model:selection="selectedItems"
            :value="items"
            dataKey="id"
            tableStyle="min-width: 50rem"
        >
            <Column
                selectionMode="multiple"
                frozen
                headerStyle="width: 3rem"
            ></Column>
            <Column field="name" header="Tên">
                <template #body="slotProps">
                    {{ slotProps.data.tab.name }}
                </template>
            </Column>
            <Column header="Ảnh">
                <template #body="slotProps">
                    <img
                        src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
                        class="w-6rem border-round"
                    />
                </template>
            </Column>
            <Column field="price" header="Giá">
                <template #body="slotProps">
                    {{ slotProps.data.tab.price }} VND
                </template>
            </Column>
            <Column field="category" header="Danh mục">
                <template #body="slotProps">
                    {{ slotProps.data.tab.category.name }}
                </template>
            </Column>
            <Column field="action" header="Hành động">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button
                            label="Xóa"
                            severity="danger"
                            outlined
                            @click="confirmDelete(slotProps.data.id)"
                        />
                    </div> </template
            ></Column>

            <template #footer>
                <div class="footer">
                    <div class="quantity">
                        <div>
                            Tổng số sản phẩm
                            {{ items ? items.length : 0 }}
                        </div>
                        <div>
                            Số lượng sản phẩm đã chọn:
                            {{ selectedItems ? selectedItems.length : 0 }}
                        </div>
                    </div>
                    <Button
                        :disabled="selectedItems.length == 0"
                        label="Tạo đơn hàng"
                        class="custom"
                        @click="checkout()"
                    ></Button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const confirm = useConfirm();
const selectedItems = ref([]);
const router = useRouter();
const items = ref([]);
onMounted(async () => {
    await getCart();
});

const getCart = async () => {
    await Api.cart
        .getByMe()
        .then((res: any) => {
            items.value = res.data;
        })
        .catch((err: any) => {
            if (err?.status == 401) {
                router.push('/login');
            }
        });
};

const deleteItem = async (id: number) => {
    await Api.cart
        .delete(id)
        .then((res: any) => {
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
        });
};

const confirmDelete = (id: number) => {
    confirm.require({
        header: 'Xác nhận xóa sản phẩm',
        message: 'Bạn có chắc chắn muốn xóa sản phẩm ?',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Đóng',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteItem(id);
            await getCart();
        },
        reject: () => {},
    });
};

const checkout = () => {
    const ids = selectedItems.value.map((item: any) => {
        return item.tab_id;
    });

    router.push({ path: '/order/create', query: { ids: ids } });
};
</script>

<style scoped lang="scss">
.footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.cart {
    min-height: 70vh;
}
</style>
