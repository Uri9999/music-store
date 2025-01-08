<template>
    <div
        class="flex gap-2 align-items-center cursor-pointer"
        @click="gotoUserDetail()"
    >
        <div class="avatar-info">
            <AvatarCommon :name="name" :src="src" />
        </div>
        <div class="name">{{ name }}</div>
    </div>
</template>

<script lang="ts" setup>
import AvatarCommon from './AvatarCommon.vue';
const props = defineProps({
    name: {
        type: [String],
        required: true,
    },
    src: {
        type: [String],
        required: false,
    },
    id: {
        type: [Number],
        required: true,
    },
});

const router = useRouter();

const gotoUserDetail = () => {
    router.push('/user/' + props.id);
};
</script>

<style lang="scss" scoped>
.avatar-info {
    width: 26px;
    height: 26px;
}
.name {
    font-size: 0.9rem;
    color: var(--color-2);
}
</style>
