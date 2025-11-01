<script setup>
import Button from '@/components/base/BaseButton.vue';
import SidePanelListContainer from '@/components/base/SidePanelListContainer.vue';
import SidePanelListItem from '@/components/base/SidePanelListItem.vue';
import SidePanelViewContainer from '@/components/layouts/SidePanelViewContainer.vue';
import { showInstallPrompt, registerInstallPrompt, installPrompt } from '@/core/pwa';
import { Translated } from '@/store/translate';
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import Modal from '@/components/overlay/Modal.vue';
import Spinner from '@/components/base/Spinner.vue';

const branch = __BRANCH__
const showAboutModal = ref(false);

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
    shown: false,
    opacity: 0
});
const showAppBox = () => {
    appBox.shown = true;
    appBox.top = '0px';
    appBox.left = '0px';
    appBox.right = '0px';
    appBox.bottom = '0px';
    appBox.width = '100%';
    appBox.height = '100%';
    appBox.opacity = 1;
}
const setAppView = (data) => {
    const pos = data[0];
    const appData = data[1]
    appBox.transition = 'none'
    appBox.top = pos.top + 'px';
    appBox.left = pos.left + 'px';
    appBox.width = 80 + 'px';
    appBox.height = 80 + 'px';
    appBox.shown = true;
    appBox.opacity = 0
    appBox.transition = 'all 150ms cubic-bezier(1, 0.08, 0, 0.86)'
    setTimeout(() => {
        router.push('/app/' + appData.id)
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

const HomeView = defineAsyncComponent({
    loader: () => import('./views/HomeView.vue'),
    loadingComponent: Spinner
})
const AboutView = defineAsyncComponent({
    loader: () => import('./views/AboutView.vue'),
    loadingComponent: Spinner
})
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
            <p style="text-align: center;">{{ branch }}</p>
            <Button :block="true" variant="simple" @click="showInstallPrompt()" v-if="installPrompt">
                {{ Translated.data.hq.navigation.install_pwa }}
            </Button>
            <Button :block="true" variant="simple" @click="showAboutModal = true">
                {{ Translated.data.hq.navigation.about }}
            </Button>
        </template>
        <template #content>
            <div style="display: flex; justify-content: center;">
                <HomeView v-if="viewSelector === 'home'" @launch-app="setAppView($event)" />
            </div>
        </template>
    </SidePanelViewContainer>

    <Modal @close="showAboutModal = false" v-show="showAboutModal">
        <AboutView />
    </Modal>

    <div v-show="appBox.shown" class="app-container" :style="{
        top: appBox.top,
        left: appBox.left,
        right: appBox.right,
        bottom: appBox.bottom,
        width: appBox.width,
        height: appBox.height,
        transition: appBox.transition,
        opacity: appBox.opacity
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
