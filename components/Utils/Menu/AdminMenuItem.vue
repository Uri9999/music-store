<template>
    <div class="menu-item" :class="{ opened: expanded }">
        <div
            class="label"
            @click="toggleMenu()"
            :style="{ paddingLeft: depth * 20 + 20 + 'px' }"
        >
            <div class="left">
                <Icon v-if="icon" :name="icon"></Icon>
                <span v-if="showLabel">{{ label }}</span>
            </div>
            <div v-if="data" class="right">
                <i
                    class="expand pi-angle-right pi"
                    :class="{ opened: expanded }"
                ></i>
            </div>
        </div>
        <div
            v-show="showChildren"
            :class="{ 'small-menu': smallMenu }"
            class="items-container"
            :style="{ height: containerHeight }"
            ref="container"
        >
            <AdminMenuItem
                :class="{ opened: showChildren }"
                v-for="(item, index) in data"
                :key="index"
                :data="item.children"
                :label="item.label"
                :icon="item.icon"
                :depth="depth + 1"
                :smallMenu="smallMenu"
                :toRoute="item?.toRoute"
            />
        </div>
    </div>
</template>

<script>
import Icon from '~/components/General/Icon.vue';

export default {
    name: 'menu-item',
    components: {
        Icon,
    },
    data: () => ({
        showChildren: false,
        expanded: false,
        containerHeight: 0,
    }),
    props: {
        data: {
            type: Array,
        },
        label: {
            type: String,
        },
        icon: {
            type: String,
        },
        depth: {
            type: Number,
        },
        smallMenu: {
            type: Boolean,
        },
        toRoute: {
            type: String,
        },
    },
    computed: {
        showLabel() {
            return this.smallMenu ? this.depth > 0 : true;
        },
    },
    methods: {
        toggleMenu() {
            if (this.toRoute) {
                this.$router.push(this.toRoute)
            }
            this.expanded = !this.expanded;
            if (!this.showChildren) {
                this.showChildren = true;
                this.$nextTick(() => {
                    this.containerHeight =
                        this.$refs['container'].scrollHeight + 'px';
                    setTimeout(() => {
                        this.containerHeight = 'fit-content';
                        if (navigator.userAgent.indexOf('Firefox') != -1)
                            this.containerHeight = '-moz-max-content';
                        this.$refs['container'].style.overflow = 'visible';
                    }, 300);
                });
            } else {
                this.containerHeight =
                    this.$refs['container'].scrollHeight + 'px';
                this.$refs['container'].style.overflow = 'hidden';
                setTimeout(() => {
                    this.containerHeight = 0 + 'px';
                }, 10);
                setTimeout(() => {
                    this.showChildren = false;
                }, 300);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.menu-item {
    position: relative;
    width: 100%;
    .label {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        white-space: nowrap;
        user-select: none;
        height: 50px;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        > div {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        i {
            font-size: 20px;
            color: #6e6e6e;
            transition: all 0.3s ease;
            &.expand {
                font-size: 16px;
                color: #cacaca;
                &.opened {
                    transform: rotate(90deg);
                }
            }
        }
        &.small-item {
            width: fit-content;
        }
        &:hover {
            background: #deedff;
            cursor: pointer;
        }
    }
    .items-container {
        width: 100%;
        left: calc(100% + 6px);
        transition: height 0.3s ease;
        overflow: hidden;
        &.small-menu {
            width: fit-content;
            position: absolute;
            background: #fff;
            box-shadow: 0 0 10px #ebebeb;
            top: 0;
            .label {
                width: 100% !important;
                padding-left: 20px !important;
            }
        }
    }
}
</style>
