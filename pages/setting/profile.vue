<template>
    <HeaderPage class="mt-5 mb-3" title="Thay đổi thông tin"> </HeaderPage>
    <div class="form mb-5">
        <div class="grid">
            <div class="col-12 sm:col-6">
                <div class="avatar rounded-full mb-3">
                    <AvatarCommon
                        :name="userData.name"
                        :src="avatarUrl ?? userData?.avatar?.url"
                    />
                </div>
                <div class="btn-upload">
                    <ImageUploader
                        label="Cập nhật ảnh đại diện cho user"
                        collection="avatar"
                        :aspectRatio="1 / 1"
                        @upload="handleUpload"
                    ></ImageUploader>
                </div>
            </div>

            <div class="col-12 sm:col-6">
                <div class="mb-3">
                    <label for="name" class="block mb-1"
                        >Tên <span class="error">*</span></label
                    >
                    <InputText
                        type="text"
                        placeholder="Name"
                        class="w-full"
                        v-model="userData.name"
                        id="name"
                        fluid
                    />
                    <small class="error" v-if="userDataError?.name">{{
                        userDataError?.name[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="email" class="block mb-1">Email</label>
                    <InputText
                        type="text"
                        placeholder="Email"
                        class="w-full"
                        v-model="userData.email"
                        id="email"
                        fluid
                        disabled
                    />
                    <small class="error" v-if="userDataError?.email">{{
                        userDataError?.email[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="referral-code" class="block mb-1"
                        >Mã giới thiệu</label
                    >
                    <div class="flex">
                        <InputText
                            type="text"
                            placeholder="referral-code"
                            class="w-full"
                            v-model="userData.referral_code"
                            id="referral-code"
                            fluid
                            disabled
                        />

                        <Button
                            type="button"
                            icon="pi pi-copy"
                            class="ml-3 pointer"
                            outlined
                            rounded
                            @click="copyReferralCode()"
                        />
                    </div>
                    <small class="error" v-if="userDataError?.email">{{
                        userDataError?.email[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="email" class="block mb-1"
                        >Giới tính <span class="error">*</span></label
                    >
                    <Dropdown
                        v-model="userData.gender"
                        :options="selection?.user_gender"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a role"
                        class="w-60"
                    />
                    <small class="error" v-if="userDataError?.gender">{{
                        userDataError?.gender[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="email" class="block mb-1"
                        >Ngày sinh <span class="error">*</span></label
                    >
                    <div>
                        <Calendar
                            v-model="userData.dob"
                            dateFormat="yy-mm-dd"
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                    <small class="error" v-if="userDataError?.dob">{{
                        userDataError?.dob[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="phone" class="block mb-1"
                        >Số điện thoại <span class="error">*</span></label
                    >
                    <InputText
                        type="text"
                        placeholder="Phone"
                        class="w-full"
                        v-model="userData.phone"
                        id="phone"
                        fluid
                    />
                    <small class="error" v-if="userDataError?.phone">{{
                        userDataError?.phone[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="introduce" class="block mb-1">Giới thiệu</label>
                    <Textarea
                        v-model="userData.introduce"
                        id="introduce"
                        class="w-full"
                        rows="5"
                        fluid
                    />
                    <small class="error" v-if="userDataError?.introduce">{{
                        userDataError?.introduce[0]
                    }}</small>
                </div>
            </div>
        </div>
        <div class="mt-5 flex justify-content-between">
            <Button
                label="Trở lại"
                severity="secondary"
                @click="back()"
            ></Button>
            <Button label="Lưu" @click="save()"></Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import moment from 'moment';
import Avatar from 'primevue/avatar';
import AvatarCommon from '~/components/General/AvatarCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';
import ImageUploader from '~/components/General/ImageUploader.vue';
import Api from '~/network/Api';
import type { Selection } from '~/types/selection';
import type { Profile, UserDataError } from '~/types/user';

const authStore = useAuthStore();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
const userData = ref({} as Profile);
const userDataError = ref({} as UserDataError);
const avatarUrl = ref();
const router = useRouter();
const toast = useToast();

onMounted(async () => {
    selection.value = await selectionStore.getData();
    await getInfo();
});
const getInfo = async () => {
    Api.auth
        .getInfo()
        .then((res: any) => {
            console.log(res.data);
            userData.value = res.data;
            localStorage.setItem('user', JSON.stringify(res.data));
            authStore.setProfile(res.data);
        })
        .catch();
};

const save = async () => {
    const payload = {
        ...userData.value,
        dob: userData.value.dob
            ? moment(userData.value.dob).format('YYYY-MM-DD') // Định dạng ngày
            : null, // Nếu không có ngày, giữ null
    };
    await Api.auth
        .updateInfo(payload)
        .then(async (res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            await getInfo();
            userDataError.value = {} as UserDataError;
        })
        .catch((err: any) => {
            if (err?.status == 422) {
                userDataError.value = err.errors;
            }
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            console.log(err);
        });
};

const handleUpload = (file: any) => {
    avatarUrl.value = URL.createObjectURL(file);
    userData.value.media_avatar = file;
};

const copyReferralCode = async () => {
    await navigator.clipboard.writeText(userData.value.referral_code);
    toast.add({
        severity: 'success',
        summary: 'Thông báo',
        detail: 'Copy thành công',
        life: 3000,
    });
};

const back = () => {
    router.go(-1);
};
</script>
<style lang="scss" scoped>
.avatar {
    width: 150px;
    height: 150px;
    margin: 0 auto;
}

.btn-upload {
    display: flex;
    justify-content: center;
}

label {
    font-weight: bold;
    color: #334155;
}
</style>
