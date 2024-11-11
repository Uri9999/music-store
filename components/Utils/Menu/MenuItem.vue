<template>
    <div
        :class="{
            'menu-dropdown': !isFirstItem && level == 1 && hasChildren(item),
        }"
    >
        <div class="label-item" :class="[classes]" @click="handleClick(item)">
            <i v-if="item.icon" class="mr-2 first-icon" :class="item.icon"></i>
            <span
                :class="[
                    { 'style-level-1': level == 1 },
                    { 'style-level-2': level == 2 },
                    { 'style-level-3': level == 3 },
                ]"
                >{{ item.label }}</span
            >
            <span class="last-icon" v-if="hasChildren(item)"
                ><i
                    :class="{ rotate: isShowSubItem(item) }"
                    class="pi-angle-right pi"
                ></i
            ></span>
        </div>

        <div v-show="isShowSubItem(item)">
            <MenuItem
                :classes="[{ 'pl-4': level == 1 }, { 'pl-6': level == 2 }]"
                v-for="(subItem, index) in item.children"
                :key="index"
                :item="subItem"
                :level="level + 1"
            ></MenuItem>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const props = defineProps({
    item: {
        type: [Object],
        default: {},
    },
    classes: {
        type: [String, Object],
        default: '',
    },
    isLastItem: {
        type: Boolean,
        default: false,
    },
    isFirstItem: {
        type: Boolean,
        default: false,
    },
    level: {
        type: [Number],
        default: null,
    },
});

const emit = defineEmits(['itemClicked']);
const route = useRoute();
const router = useRouter();
const routeName = computed(() => {
    return route.query.name;
});

const isShowSubItem = (item) => {
    return !!(item?.isShowSubItem && item?.children);
};
const hasChildren = (item) => {
    return !!item?.children;
};
// const isActive = (item) => {
//   if (item.toRoute?.query?.name) {
//     return routeName.value === item.toRoute?.query?.name;
//   }
//   return false;
// };
const handleClick = (item) => {
    if (item?.toRoute) {
        emit('itemClicked');
        router.push(item.toRoute);
    } else if (item.isShowSubItem) {
        item.isShowSubItem = !item.isShowSubItem;
    } else {
        item.isShowSubItem = true;
    }
};
</script>

<style lang="scss" scoped>
.label-item {
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 35px;
    position: relative;

    .last-icon {
        position: absolute;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: end;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
}

.rotate {
    transform: rotate(90deg);
}

.style-level-1 {
    color: var(--color-3);
    font-weight: 600;
}
.style-level-2 {
    font-weight: 500;
    color: var(--color-1);
}
.style-level-3 {
    color: var(--color-1);
}
</style>
