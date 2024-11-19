<template>
    <div class="request-tab">
        <h2 class="title">Danh sách yêu cầu tab của bạn</h2>
        <DataTable :value="tabs" tableStyle="min-width: 50rem">
            <Column field="name" header="Tên"></Column>
            <Column field="author" header="Tác giả"> </Column>
            <Column field="status" header="Trạng thái">
                <template #body="slotProps">
                    {{ getStatus(slotProps.data.status) }}
                </template>
            </Column>
            <Column field="receiver" header="Người nhận">
                <template #body="slotProps">
                    {{ slotProps.data.receiver.name }}
                </template>
            </Column>
            <Column field="action" header="Hành động">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button
                            label="Sửa"
                            severity="success"
                            :disabled="slotProps.data.status === 0"
                        />
                        <Button
                            label="Xóa"
                            severity="danger"
                            :disabled="slotProps.data.status === 0"
                        />
                    </div>
                </template>
            </Column>
            <template #footer>
                Tổng số lượng
                {{ tabs ? tabs.length : 0 }} tab.
            </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Api from '~/network/Api';

const tabs = ref([]);
onMounted(() => {
    Api.requestTab
        .getCreatedByMy()
        .then((res) => {
            console.log('res', res);
            tabs.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
});

const getStatus = (status) => {
    switch (status) {
        case 0:
            return 'Khởi tạo';

        case 1:
            return 'Đang thực hiện';

        case 2:
            return 'Đã hoàn thành';

        default:
            return null;
    }
};
</script>

<style scoped lang="scss">
.title {
    margin-top: 20px;
    margin-bottom: 10px;
}
.request-tab {
    min-height: 70vh;
}
</style>
