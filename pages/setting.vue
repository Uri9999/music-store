<template>
    <HeaderPage title="Cài đặt" class="my-3"></HeaderPage>
    <div class="">
        <div class="tabs">
            <NuxtLink
                v-for="(tab, index) in tabs"
                :key="index"
                :to="tab.toRoute"
                class="tab"
                :class="{ active: currentPath === tab.toRoute }"
            >
                <i :class="tab.icon"></i>
                <span class="tab-name">{{ tab.label }}</span>
            </NuxtLink>
        </div>

        <div class="tab-content">
            <NuxtPage />
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderPage from '~/components/General/HeaderPage.vue';

const router = useRouter();
const currentPath = router.currentRoute.value.path;
const tabs = [
    { toRoute: '/setting/profile', label: 'Profile', icon: 'pi-user pi' },
    { toRoute: '/setting/summary', label: 'Summary', icon: 'pi-cog pi' },
];
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    height: 38px;
    border-top: 1px solid var(--border-color-primary);
    border-bottom: 1px solid var(--border-color-primary);

    .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
        padding-left: 12px;
        padding-right: 12px;
        color: var(--color-2);
        text-decoration: none;
        &:hover {
            background-color: rgb(248, 242, 242);
        }

        .tab-name {
            margin-left: 5px;
        }
    }

    .active {
        background-color: rgb(230, 230, 230);
    }
}

.tab-content {
    padding: 20px;
}

@media (max-width: 500px) {
    .tab .tab-name {
        display: none;
    }
}
</style>
