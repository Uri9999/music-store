<template>
    <div class="confirm-register">
        <div v-if="!message">Đang tiền hành yêu cầu, vui lòng đợi.</div>
        <div v-else>
            <div class="icon" v-if="status === true">
                <i class="pi pi-check-circle text-green-500 text-lg"></i>
            </div>
            <div class="icon" v-if="status === false">
                <i class="pi pi-times-circle text-red-500 text-lg"></i>
            </div>
            <div>{{ message }} <span class="goto-login cursor-pointer" @click="router.push('/login')" v-if="status === true"> Đi đến màn đăng nhập</span></div>
            
        </div>
    </div>
</template>
<script setup>
import Api from '~/network/Api';
definePageMeta({
    layout: 'auth',
    title: 'Quên mật khẩu',
});

const route = useRoute();
const router = useRouter();
const email = route.query.email || '';
const token = route.query.token || '';
const message = ref();
const status = ref();
onMounted(async () => {
    Api.auth
        .verifyUser({ email: email, token: token })
        .then((res) => {
            message.value = res.message;
            status.value = true;
        })
        .catch((err) => {
            console.log(err);
            message.value = err.message;
            status.value = false;
        });
});
</script>

<style scoped lang="scss">
.confirm-register {
    text-align: center;
    margin: 20px;
}
.icon {
    margin-top: 50px;
    margin-bottom: 30px;
    i {
        font-size: 5rem !important;
    }
}

.goto-login {
    color: var(--color-2);
    border-bottom: 1px solid var(--color-2);
}
</style>
