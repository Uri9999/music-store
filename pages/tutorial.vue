<template>
    <div>
        <h2 class="title flex justify-content-center">{{ tutorial?.title }}</h2>
        <div class="content">
            <MdPreview
                editorId="show-article"
                :modelValue="tutorial?.content"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import { MdPreview } from 'md-editor-v3';

const tutorial = ref(
    {} as {
        id: number;
        title: string;
        content: string;
    },
);
onMounted(async () => {
    await Api.article
        .tutorial()
        .then((res: any) => {
            tutorial.value = res.data;
            console.log('res', res.data);
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
