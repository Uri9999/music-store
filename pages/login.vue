<template>
    <div
        class="container"
        :class="[
            {
                'sign-up-mode': activeSignUp,
            },
        ]"
    >
        <div class="forms-container">
            <div class="signin-signup">
                <form action="#" class="sign-in-form">
                    <div v-if="!forgotPasswordView">
                        <h2 class="title mb-4">Sign in</h2>

                        <div class="card justify-center">
                            <div class="mb-3">
                                <InputText
                                    type="text"
                                    placeholder="Email"
                                    class="w-full"
                                    v-model="authData.email"
                                    fluid
                                />
                                <small
                                    class="error"
                                    v-if="authDataError?.email"
                                    >{{ authDataError?.email[0] }}</small
                                >
                            </div>
                            <div class="mb-3">
                                <Password
                                    name="password"
                                    placeholder="Password"
                                    v-model="authData.password"
                                    toggleMask
                                    :feedback="false"
                                    fluid
                                />
                                <small
                                    class="error"
                                    v-if="authDataError?.password"
                                    >{{ authDataError?.password[0] }}</small
                                >
                            </div>

                            <div
                                class="mb-3 btn-redirect"
                                @click="showForgotPassword()"
                            >
                                Forgot password
                            </div>
                            <Button
                                severity="secondary"
                                class="w-full"
                                label="Login"
                                @click="login()"
                            />
                        </div>
                    </div>
                    <div v-else>
                        <h2 class="title mb-4">Forgot Password</h2>

                        <div class="card justify-center">
                            <div class="mb-3">
                                <InputText
                                    type="text"
                                    placeholder="Email"
                                    class="w-full"
                                    v-model="fogotPasswordData.email"
                                    fluid
                                />
                                <small
                                    class="error"
                                    v-if="fogotPasswordDataError?.email"
                                    >{{
                                        fogotPasswordDataError?.email[0]
                                    }}</small
                                >
                            </div>
                            <div class="mb-3 btn-redirect" @click="showLogin()">
                                Trở lại màn login
                            </div>
                            <Button
                                severity="secondary"
                                class="w-full"
                                label="Forgot Password"
                                @click="forgotPassword()"
                            />
                        </div>
                    </div>
                </form>
                <form action="#" class="sign-up-form">
                    <h2 class="title mb-4">Sign up</h2>
                    <div class="card justify-center">
                        <div class="mb-3">
                            <InputText
                                v-model="registerData.name"
                                type="text"
                                placeholder="name"
                                class="w-full"
                                fluid
                            />
                            <small
                                class="error"
                                v-if="registerDataError?.name"
                                >{{ registerDataError?.name[0] }}</small
                            >
                        </div>
                        <div class="mb-3">
                            <InputText
                                v-model="registerData.email"
                                type="text"
                                placeholder="email"
                                class="w-full"
                                fluid
                            />
                            <small
                                class="error"
                                v-if="registerDataError?.email"
                                >{{ registerDataError?.email[0] }}</small
                            >
                        </div>
                        <div class="mb-3">
                            <Password
                                v-model="registerData.password"
                                placeholder="Password"
                                toggleMask
                                :feedback="false"
                                fluid
                            />
                            <small
                                class="error"
                                v-if="registerDataError?.password"
                                >{{ registerDataError?.password[0] }}</small
                            >
                        </div>
                        <div class="mb-3">
                            <Password
                                v-model="registerData.password_confirmation"
                                placeholder="Confirm password"
                                toggleMask
                                :feedback="false"
                                fluid
                            />
                            <small
                                class="error"
                                v-if="registerDataError?.password_confirmation"
                                >{{
                                    registerDataError?.password_confirmation[0]
                                }}</small
                            >
                        </div>
                        <Button
                            severity="secondary"
                            class="w-full"
                            label="Sign up"
                            @click="register()"
                        />
                    </div>
                </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>Bạn chưa có tài khoản ?</h3>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Debitis, ex ratione. Aliquid!
                    </p>
                    <button
                        class="btn transparent"
                        id="sign-up-btn"
                        @click="activeSignUp = true"
                    >
                        Đăng ký
                    </button>
                </div>
                <img src="~/assets/images/log.svg" class="image" alt="" />
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>Bạn đã có tài khoản ?</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum laboriosam ad deleniti.
                    </p>
                    <button
                        class="btn transparent"
                        id="sign-in-btn"
                        @click="activeSignUp = false"
                    >
                        Đăng nhập
                    </button>
                </div>
                <img src="~/assets/images//register.svg" class="image" alt="" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';

definePageMeta({
    layout: 'auth',
    title: 'Đăng nhập',
});

const activeSignUp = ref(false);
const forgotPasswordView = ref(false);
const toast = useToast();
const authData = ref({
    email: '',
    password: '',
});
const authDataError = ref({} as any);

const registerData = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});
const registerDataError = ref({} as any);

const login = async () => {
    authDataError.value = {};

    await Api.auth
        .login(authData.value)
        .then((res: any) => {
            console.log('res data:', res);
            localStorage.setItem('access_token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        })
        .catch((err: any) => {
            console.log('err', err);
            toast.add({
                severity: 'error',
                summary: 'Có lỗi xảy ra',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                authDataError.value = err.errors;
            }
            if (err?.status == 401) {
                authDataError.value = {
                    password: ['Tên tài khoản hoặc mật khẩu không chính xác'],
                };
            }
        });
};

const register = async () => {
    registerDataError.value = {};
    await Api.auth
        .register(registerData.value)
        .then((res: any) => {
            registerData.value = {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            };
            // activeSignUp.value = false;
            toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Có lỗi xảy ra',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                registerDataError.value = err.errors;
            }
        });
};

const fogotPasswordData = ref({
    email: '',
});
const fogotPasswordDataError = ref({} as any);
const forgotPassword = async () => {
    await Api.auth
        .forgotPassword(fogotPasswordData.value)
        .then((res: any) => {
            console.log('res data:', res);
        })
        .catch((err: any) => {
            console.log('err', err);
            // toast.add({
            //     severity: 'error',
            //     summary: 'Có lỗi xảy ra',
            //     detail: err.message,
            //     life: 3000,
            // });
            // if (err?.status == 422) {
            //     authDataError.value = err.errors;
            // }
            // if (err?.status == 401) {
            //     authDataError.value = {
            //         password: ['Tên tài khoản hoặc mật khẩu không chính xác'],
            //     };
            // }
        });
};

const showForgotPassword = () => {
    forgotPasswordView.value = true;
};
const showLogin = () => {
    forgotPasswordView.value = false;
};
</script>
<style scoped lang="scss">
.btn-redirect {
    text-align: right;
    width: 100%;
    cursor: pointer;
    &:hover {
        color: green;
    }
}
.card {
    max-width: 278px;
}
.container {
    margin: auto;
    margin-top: 20px;
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 90vh;
    overflow: hidden;
    border: 1px solid rgb(228, 228, 228);
    border-radius: 10px;
}

.forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.signin-signup {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

form.sign-up-form {
    opacity: 0;
    z-index: 1;
}

form.sign-in-form {
    z-index: 2;
}

.title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
}

.input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
}

.input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 1.1rem;
}

.input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
}

.social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
}

.btn {
    width: 150px;
    background-color: #5995fd;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
}

.btn:hover {
    background-color: #4d84e2;
}
.panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.container:before {
    content: '';
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(
        -45deg,
        var(--color-1) 0%,
        var(--color-1) 100%
    );
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
}

.image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
}

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
}

.right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
}

.panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
}

.panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
}

.btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
    transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
    left: 25%;
}

.container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
    pointer-events: none;
}

.container.sign-up-mode .right-panel {
    pointer-events: all;
}

@media (max-width: 870px) {
    .container {
        // min-height: 60vh;
        // min-height: 800px;
        // height: 100vh;
    }
    .signin-signup {
        width: 100%;
        top: 95%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .container.sign-up-mode .signin-signup {
        left: 50%;
    }

    .panels-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
    }

    .right-panel {
        grid-row: 3 / 4;
    }

    .left-panel {
        grid-row: 1 / 2;
    }

    .image {
        width: 200px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel .content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    .panel h3 {
        font-size: 1.2rem;
    }

    .panel p {
        font-size: 0.7rem;
        padding: 0.5rem 0;
    }

    .btn.transparent {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
    }

    .container:before {
        width: 1500px;
        height: 1500px;
        transform: translateX(-50%);
        left: 30%;
        bottom: 68%;
        right: initial;
        top: initial;
        transition: 2s ease-in-out;
    }

    .container.sign-up-mode:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
        transform: translateY(-300px);
    }

    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
        transform: translateY(0px);
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateY(300px);
    }

    .container.sign-up-mode .signin-signup {
        top: 5%;
        transform: translate(-50%, 0);
    }
}

@media (max-width: 570px) {
    .container {
        min-height: 60vh;
        margin-top: 20%;
    }
    form {
        padding: 0 1.5rem;
    }

    .image {
        display: none;
    }
    .panel .content {
        padding: 0.5rem 1rem;
    }
    .container {
        padding: 1.5rem;
    }

    .container:before {
        bottom: 72%;
        left: 50%;
    }

    .container.sign-up-mode:before {
        bottom: 28%;
        left: 50%;
    }
}
</style>
