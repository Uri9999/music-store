<template>
    <img
        class="image"
        @click="visible = true"
        :class="classes"
        :src="src"
        :alt="alt"
    />
    <div class="detail" v-if="visible">
        <div class="action-icon">
            <Icon
                name="download"
                @click="download()"
                class="icon-item p-3"
            ></Icon>
            <Icon
                name="fit-screen"
                @click="scale = !scale"
                class="icon-item p-3"
            ></Icon>
            <Icon
                name="close"
                @click="visible = false"
                class="icon-item p-3"
            ></Icon>
        </div>
        <div class="image-detail">
            <img :class="{'scale' : scale}" :src="src" :alt="alt" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from '~/components/General/Icon.vue';

const props = defineProps({
    src: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: '',
    },
    classes: {
        type: [String, Object],
        default: 'flex align-items-center',
    },
});

const visible = ref(false);
const scale = ref(true);

const download = () => {
    const filename = props.src.split('/').pop() || 'image.jpg';
    const link = document.createElement('a');
    link.href = props.src;
    link.download = filename;
    link.target = '_blank';
    link.click();
};
</script>

<style lang="scss" scoped>
.image {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 100%;
}

.detail {
    background-color: rgba($color: #7e7e7e, $alpha: 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;

    .image-detail {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 300px;
        }
    }
    .action-icon {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        background-color: white;
        .icon-item {
            cursor: pointer;
            &:hover {
                background-color: rgb(167, 167, 167);
            }
        }

    }
}
.scale {
    width: 500px !important;
}
</style>
