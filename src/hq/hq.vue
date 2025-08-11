<script setup>
import data from './assets/data';
import GridStack from '@/components/GridStack.vue';
import appicon from './components/appicon.vue';
import Modal from '@/components/modal.vue';
import { SysStatus } from '@/assets/js/core/states';
import { translateData } from '@/assets/js/core/translations';
import { computed } from 'vue';

const unSupported = computed(() => {
    return Object.entries(SysStatus.browserFeatureSupport)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
})

</script>

<template>
    <GridStack columns="auto" class="launch">
        <appicon v-for="i in data.apps" v-bind="i" />
    </GridStack>
    <Modal :shown="unSupported.length > 0">
        <h1>お使いのブラウザでは機能が制限されます</h1>
        <p>以下の機能が使用不可、または制限がかかります。</p>
        <ul>
            <li v-for="(key, index) in unSupported" :key="index">
                {{ translateData.Features[key] }}
            </li>
        </ul>
    </Modal>
</template>
<style scoped>
.launch {
    padding: 14px;
}

p {
    padding-top: 14px;
}
</style>
