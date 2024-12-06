<template>
    <div class="update-user">
        <HeaderPage title="Chỉnh sửa thông tin user"> </HeaderPage>
        <div class="form mt-3">
            <div>
                <div class="mb-3">
                    <Avatar
                        classes="avatar mb-3"
                        :name="userData.name"
                        :src="avatarUrl ?? userData?.avatar?.url"
                    ></Avatar>
                    <ImageUploader
                        label="Cập nhật ảnh đại diện cho user"
                        collection="avatar"
                        :aspectRatio="1 / 1"
                        @upload="handleUpload"
                    ></ImageUploader>
                </div>

                <div class="mb-3">
                    <label for="name" class="block mb-1">Tên</label>
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
                    <label for="email" class="block mb-1">Chức vụ</label>
                    <Dropdown
                        v-model="userData.role_id"
                        :options="selection?.user_role"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a role"
                        class="w-full md:w-56"
                        :disabled="userData.role_id == 1"
                    />
                    <small class="error" v-if="userDataError?.role_id">{{
                        userDataError?.role_id[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="email" class="block mb-1">Giới tính</label>
                    <Dropdown
                        v-model="userData.gender"
                        :options="selection?.user_gender"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a role"
                        class="w-full md:w-56"
                    />
                    <small class="error" v-if="userDataError?.gender">{{
                        userDataError?.gender[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="email" class="block mb-1">Trạng thái</label>
                    <Dropdown
                        v-model="userData.status"
                        :options="selection?.user_status"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a status"
                        class="w-full md:w-56"
                    />
                    <small class="error" v-if="userDataError?.status">{{
                        userDataError?.status[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="email" class="block mb-1">Ngày sinh</label>
                    <Calendar
                        v-model="userData.dob"
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                    />
                    <small class="error" v-if="userDataError?.dob">{{
                        userDataError?.dob[0]
                    }}</small>
                </div>

                <div class="mb-3">
                    <label for="commission-rate" class="block mb-1"
                        >Phần trăm hoa hồng</label
                    >
                    <InputNumber
                        v-model="userData.commission_rate"
                        id="commission-rate"
                        fluid
                        :min="0"
                        :max="100"
                    />
                    <small
                        class="error"
                        v-if="userDataError?.commission_rate"
                        >{{ userDataError?.commission_rate[0] }}</small
                    >
                </div>

                <div class="mb-3 flex justify-content-between">
                    <Button
                        label="Trở lại"
                        severity="secondary"
                        @click="back()"
                    ></Button>
                    <Button label="Lưu" @click="save()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import { useSelectionStore } from '~/stores/selectionStore';
import type { Selection, Item } from '~/types/selection';
import type { Profile, UserDataError } from '~/types/user';
import ImageUploader from '~/components/General/ImageUploader.vue';
import moment from 'moment';
import Avatar from '~/components/General/AvatarCommon.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const toast = useToast();
const selection = ref<Selection | null>();
const selectionStore = useSelectionStore();
onMounted(async () => {
    selection.value = await selectionStore.getData();
    await getUserDetail();
});
const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const userData = ref({} as Profile);
const userDataError = ref({} as UserDataError);
const avatarUrl = ref();

const getUserDetail = async () => {
    await Api.user
        .show(id)
        .then((res: any) => {
            userData.value = res.data;
        })
        .catch((err: any) => console.log(err));
};

const save = async () => {
    const payload = {
        ...userData.value,
        dob: userData.value.dob
            ? moment(userData.value.dob).format('YYYY-MM-DD') // Định dạng ngày
            : null, // Nếu không có ngày, giữ null
    };
    await Api.user
        .update(id, payload)
        .then(async (res: any) => {
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
            await getUserDetail();
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

const back = () => {
    router.push('/admin/user');
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50px;
}

.update-user {
    max-width: 600px;
}
</style>
