<template>
    <div class="">
        <label :for="name" class="block mb-1">
            {{ label }} <span v-if="required" class="error">*</span>
        </label>
        <div>
            <TreeSelect
                v-model="model"
                :options="options"
                dataKey="value"
                placeholder="Chọn danh mục"
                selection-mode="single"
                :id="name"
                :disabled="disabled"
            />
        </div>
        <small class="error" v-if="error.length">{{ error[0] }}</small>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: [String, Number, null],
        default: '',
    },
    error: {
        type: Array,
        default: [],
    },
    options: {
        type: Array,
        default: [] as any,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
    get: () => {
        return props.modelValue ? { [props.modelValue]: true } : null;
    },
    set: (value: number) => {
        return emit('update:modelValue', parseInt(Object.keys(value)[0]));
    },
});
</script>
