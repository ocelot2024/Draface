<script setup>
import { useHQ } from './js/hq';

const {
    Button,
    SidePanelListContainer,
    SidePanelListItem,
    SidePanelViewContainer,
    showInstallPrompt,
    installPrompt,
    Translated,
    branch,
    showAboutModal,
    sidePanelItems,
    viewSelector,
    appBox,
    setAppView,
    HomeView,
    AboutView,
} = useHQ();
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
