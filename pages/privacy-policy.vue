<template>
    <div>
        <h2 class="title flex justify-content-center">{{ policy?.title }}</h2>
        <div class="content">
            <MdPreview editorId="show-article" :modelValue="policy?.content" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import { MdPreview } from 'md-editor-v3';

const policy = ref(
    {} as {
        id: number;
        title: string;
        content: string;
    },
);
onMounted(async () => {
    await Api.article
        .policy()
        .then((res: any) => {
            policy.value = res.data;
        })
        .catch((err: any) => {});
});
</script>

<style lang="scss" scoped>
.title {
    font-size: 2.5rem;
    margin-top: 50px;
    margin-bottom: 20px;
}

.content {
    max-width: 900px;
    margin: 0 auto;
    margin-bottom: 50px;
    min-height: 70vh;
}
</style>
