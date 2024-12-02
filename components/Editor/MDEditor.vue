<template>
    <MdEditor
        ref="editorRef"
        v-model="model"
        @onChange="onChange"
        @onUploadImg="onUploadImg"
        @onSave="onSave"
        @onBlur="onBlur"
        :language="language"
        :showCodeRowNumber="showCodeRowNumber"
        :previewTheme="previewTheme"
        :toolbars="toolbars"
        :placeholder="placeholder"
        :footers="footers"
        :maxLength="maxLength"
        :autoDetectCode="true"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { MdEditor, config } from 'md-editor-v3'
import type { ExposeParam, Footers, Themes, ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import Api from '@/network/Api'
// import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

config({
    editorConfig: {
        languageUserDefined: {
            'en-US': {
                toolbarTips: {
                    bold: 'bold',
                    underline: 'underline',
                    italic: 'italic',
                    strikeThrough: 'strikeThrough',
                    title: 'title',
                    sub: 'subscript',
                    sup: 'superscript',
                    quote: 'quote',
                    unorderedList: 'unordered list',
                    orderedList: 'ordered list',
                    task: 'task list',
                    codeRow: 'inline code',
                    code: 'block-level code',
                    link: 'link',
                    image: 'image',
                    table: 'table',
                    mermaid: 'mermaid',
                    katex: 'formula',
                    revoke: 'back',
                    next: 'forward',
                    save: 'save',
                    prettier: 'prettier',
                    pageFullscreen: 'fullscreen in page',
                    fullscreen: 'fullscreen',
                    preview: 'preview',
                    previewOnly: 'previewOnly',
                    htmlPreview: 'html preview',
                    catalog: 'catalog',
                    github: 'source code'
                },
                titleItem: {
                    h1: 'Lv1 Heading',
                    h2: 'Lv2 Heading',
                    h3: 'Lv3 Heading',
                    h4: 'Lv4 Heading',
                    h5: 'Lv5 Heading',
                    h6: 'Lv6 Heading'
                },
                imgTitleItem: {
                    link: 'Add Img Link',
                    upload: 'Upload Img',
                    clip2upload: 'Clip Upload'
                },
                linkModalTips: {
                    linkTitle: 'Add Link',
                    imageTitle: 'Add Image',
                    descLabel: 'Desc:',
                    descLabelPlaceHolder: 'Enter a description...',
                    urlLabel: 'Link:',
                    urlLabelPlaceHolder: 'Enter a link...',
                    buttonOK: 'OK'
                },
                clipModalTips: {
                    title: 'Crop Image',
                    buttonUpload: 'Upload'
                },
                copyCode: {
                    text: 'Copy',
                    successTips: 'Copied!',
                    failTips: 'Copy failed!'
                },
                mermaid: {
                    flow: 'flow',
                    sequence: 'sequence',
                    gantt: 'gantt',
                    class: 'class',
                    state: 'state',
                    pie: 'pie',
                    relationship: 'relationship',
                    journey: 'journey'
                },
                katex: {
                    inline: 'inline',
                    block: 'block'
                },
                footer: {
                    markdownTotal: 'Word Count',
                    scrollAuto: 'Scroll Auto'
                }
            }
        }
    }
})
const toolbars = ref([
    'revoke',
    'next',
    'save',
    '-',
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'previewOnly',
    'htmlPreview',
    'catalog'
] as ToolbarNames[])
const props = defineProps({
    modelValue: {
        type: [String],
        default: ''
    },
    theme: {
        type: null,
        default: () => {
            null
        }
    },
    language: {
        type: String,
        default: 'en-US'
    },
    showCodeRowNumber: {
        type: Boolean,
        default: true
    },
    previewTheme: {
        type: String,
        default: 'default'
    },
    placeholder: {
        type: String,
        default: ''
    },
    maxLength: {
        type: Number,
        default: 10000
    },
    footers: {
        type: null,
        default: () => {
            ;['markdownTotal', '=', 'scrollSwitch'] as Footers[]
        }
    },
    errors: {
        type: [Array],
        default: []
    },
    collection: {
        type: String,
        default: 'article'
    }
})

// const themeStore = useThemeStore()
// const { activeTheme } = storeToRefs(themeStore)

const themeMode = computed(() => {
    // if (props.theme == null) {
    //     return activeTheme.value as Themes
    // }

    return 'light'
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

const editorRef = ref<ExposeParam>()

onMounted(() => {
    editorRef.value?.on('catalog', console.log)
})

const onChange = (val: string) => {
    console.log('change', val)
}

const onUploadImg = async (files: File[], callback: any) => {
    const res = await Promise.all(
        files.map((file: File) => {
            return new Promise((rev, rej) => {
                const form = new FormData()
                form.append('file', file)
                Api.media
                    .upload(props.collection, file, (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        console.log('percentCompleted: ', percentCompleted);
                    })
                    .then((res: any) => rev(res))
                    .catch((err: any) => rej(err))
            })
        })
    )

    callback(
        res.map((item: any) => ({
            url: item.data.original_url,
            alt: item.data.name
            // title: item.data.file_name
        }))
    )
}

const onSave = (v: any, h: any) => {
    console.log(v)

    h.then((html: HTMLElement) => {
        console.log(html)
    })
}

const onBlur = (e: Event) => {
    console.log('onBlur', e)
}
</script>

<style lang="scss" scoped>
.md-editor {
    height: calc(100vh - 170px);
}
</style>
