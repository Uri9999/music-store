<template>
    <div class="flex gap-2 align-items-center">
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
});
</script>

<style lang="scss" scoped>
.avatar-info {
    width: 26px;
    height: 26px;
}
.name {
    font-size: .9rem;
    color: var(--color-2);
}
</style>
