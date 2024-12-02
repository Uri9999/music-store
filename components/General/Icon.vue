<template>
    <span
        v-html="icon"
        :class="[{ disable: disable, load: load }, classes]"
    ></span>
</template>

<script lang="ts">
import icons from '~/helper/icons';
import { ref } from 'vue';

export default {
    name: 'CIcon',
    props: {
        name: {
            type: String,
            default: '',
        },
        disable: {
            type: Boolean,
            default: false,
        },
        load: {
            type: Boolean,
            default: false,
        },
        classes: {
            type: [String, Object],
            default: 'flex align-items-center',
        },
    },
    methods: {},
    setup(props) {
        const icon = ref(icons[props.name]);

        return { icon };
    },
};
</script>

<style lang="scss" scoped></style>
