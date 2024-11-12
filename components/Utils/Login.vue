<template>
    <div class="login" @click.self="close" v-if="visible">
        <div class="content">
            <h2 class="mb-5">Đăng nhập</h2>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="username" class="font-semibold w-6rem"
                    >Tài khoản</label
                >
                <InputText id="username" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Mật khẩu</label>
                <InputText id="email" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button
                    type="button"
                    label="Đóng"
                    severity="secondary"
                    @click="close"
                ></Button>
                <Button
                    type="button"
                    label="Login"
                    class="custom"
                    @click="close"
                ></Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits('close')

const close = () => {
    emit('close')
}

</script>

<style scoped lang="scss">
.login {
    z-index: 10;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #e6e6e6, $alpha: 0.5);

    .content {
        padding: 20px;
        max-width: 400px;
        background-color: white;
        border-radius: 5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%);
    }
}
</style>
