<script setup>
import { translateData } from '@/assets/js/core/translations';
import { computed } from 'vue';
import Modal from '@/components/modal.vue';
import { SysStatus } from '@/assets/js/core/states';

const unSupported = computed(() => {
    return Object.entries(SysStatus.browserFeatureSupport)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
})
</script>
<template>
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
