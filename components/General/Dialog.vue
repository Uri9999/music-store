<template>
    <div class="dialog" v-if="visible">
        <div class="body">
            <div class="head">
                <h2>Header</h2>
                <i class="pi pi-times"></i>
            </div>

            <div class="content">
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #808080, $alpha: 0.2);
    z-index: 10;

    .body {
        width: 450px;
        padding: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 5px;

        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            i {
                cursor: pointer;
            }
        }

        .content {
            line-height: 1.3em;
        }
    }
}
@media (max-width: 480px) {
    .body {
        width: 90vw !important;
    }
}
</style>
