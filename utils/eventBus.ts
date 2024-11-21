import { reactive } from 'vue'

const eventBus = reactive({
    currentPopupId: null as null | string | Symbol // Theo dõi popup hiện tại đang hiển thị
})

export default eventBus
