<script setup>
import { useRoute } from 'vue-router';
import apps from './apps';
import router from '@/router';
import { defineAsyncComponent } from 'vue';
import AppLodingComponent from './app-loding-component.vue';
const appData = apps.find((v) => useRoute().params.id == v.id);
if (!appData) router.replace('/')

const App = defineAsyncComponent({
    loader: () => import(`./${appData.id}/${appData.id}.vue`),
    loadingComponent: AppLodingComponent
})
</script>
<template>
    <App />
</template>
<style scoped></style>
