<script setup>
import Button from '@/components/base/Button.vue';
import SidePanelListContainer from '@/components/base/SidePanelListContainer.vue';
import SidePanelListItem from '@/components/base/SidePanelListItem.vue';
import SidePanelViewContainer from '@/components/layouts/SidePanelViewContainer.vue';
import { showInstallPrompt, registerInstallPrompt, installPrompt } from '@/core/pwa';
import { Translated } from '@/store/translate';
import { onMounted, reactive, ref } from 'vue';
import HomeView from './views/HomeView.vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const sidePanelItems = [
    { id: 'home', content: Translated.data.hq.navigation.to_home },
    { id: 'to_recent', content: Translated.data.hq.navigation.to_recent }
];

const viewSelector = ref(sidePanelItems[0].id);
registerInstallPrompt();
const appBox = reactive({
    top: '0px',
    left: '0px',
    right: 'auto',
    bottom: 'auto',
    width: '80px',
    height: '80px',
    transition: 'none',
    shown: false
});
const showAppBox = () => {
    appBox.shown = true;
    appBox.top = '0px';
    appBox.left = '0px';
    appBox.right = '0px';
    appBox.bottom = '0px';
    appBox.width = '100%';
    appBox.height = '100%';
}
const setAppView = (data) => {
    const pos = data[0];
    const appData = data[1]
    router.push('/app/' + appData.id)
    appBox.transition = 'none'
    appBox.top = pos.top + 'px';
    appBox.left = pos.left + 'px';
    appBox.width = 80 + 'px';
    appBox.height = 80 + 'px';
    appBox.shown = true;
    appBox.transition = 'all 150ms cubic-bezier(1, 0.08, 0, 0.86)'
    setTimeout(() => {
        showAppBox()
    }, 100);
};
const isAppPage = (to) => {
    if (to.name == "root")
        appBox.shown = false;
    else
        showAppBox();
}
router.beforeResolve(isAppPage)
onMounted(() => isAppPage(useRoute()))
</script>

<template>
    <SidePanelViewContainer>
        <template #pane-item>
            <h1>{{ Translated.data.brand.normal }} HQ</h1>
            <SidePanelListContainer>
                <SidePanelListItem v-for="value in sidePanelItems" :key="value.id" @click="viewSelector = value.id"
                    :active="viewSelector === value.id">
                    {{ value.content }}
                </SidePanelListItem>
            </SidePanelListContainer>
        </template>
        <template #pane-footer>
            <Button :block="true" variant="simple" @click="showInstallPrompt()" v-if="installPrompt">
                install
            </Button>
        </template>
        <template #content>
            <HomeView v-if="viewSelector === 'home'" @launch-app="setAppView($event)" />
        </template>
    </SidePanelViewContainer>

    <div v-show="appBox.shown" class="app-container" :style="{
        top: appBox.top,
        left: appBox.left,
        right: appBox.right,
        bottom: appBox.bottom,
        width: appBox.width,
        height: appBox.height,
        transition: appBox.transition
    }">
        <RouterView name="app" />
    </div>
</template>

<style scoped>
.app-container {
    position: fixed;
    background-color: var(--background-1);
    border-radius: var(--border-radius-4);
    transition: none;
    z-index: 999;
}
</style>
