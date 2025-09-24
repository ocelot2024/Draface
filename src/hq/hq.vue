<script setup>
import Button from '@/components/base/Button.vue';
import SidePanelListContainer from '@/components/base/SidePanelListContainer.vue';
import SidePanelListItem from '@/components/base/SidePanelListItem.vue';
import SidePanelViewContainer from '@/components/layouts/SidePanelViewContainer.vue';
import { showInstallPrompt, registerInstallPrompt, installPrompt } from '@/core/pwa';
import { Translated } from '@/store/translate';
import { ref } from 'vue';

const viewSelector = ref('')

const sidePanelItems = [
    { id: 'home', content: Translated.data.hq.navigation.to_home },
    { id: 'to_recent', content: Translated.data.hq.navigation.to_recent }

]
registerInstallPrompt();
</script>
<template>
    <SidePanelViewContainer>
        <template #pane-item>
            <h1>{{ Translated.data.brand.normal }} HQ</h1>
            <SidePanelListContainer>
                <SidePanelListItem v-for="value in sidePanelItems" @click="viewSelector = value.id"
                    v-bind:active="viewSelector == value.id" :key="value.id">
                    {{ value.content }}
                </SidePanelListItem>
            </SidePanelListContainer>
        </template>
        <template #pane-footer>
            <Button :block="true" variant="simple" @click="showInstallPrompt()" v-if="installPrompt">install</Button>
        </template>
    </SidePanelViewContainer>
</template>
