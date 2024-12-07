<template>
    <Calendar
        v-model="model"
        dateFormat="yy-mm-dd"
        :placeholder="placeholder"
    />
</template>
<script lang="ts" setup>
import moment from 'moment';

const props = defineProps({
    modelValue: {
        type: [String, null],
        default: null,
    },
    placeholder: {
        type: [String],
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
    get: () => {
        return props.modelValue ? new Date(props.modelValue) : null;
    },
    set: (value: Date) => {
        console.log('vlue', moment(value).format('YYYY-MM-DD'));

        return emit('update:modelValue', moment(value).format('YYYY-MM-DD'));
    },
});
</script>
