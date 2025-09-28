<script setup>
import { useRoute } from 'vue-router';
import apps from './apps';
import router from '@/router';
const appData = apps.find((v) => useRoute().params.id == v.id);
if (!appData) router.replace('/')
</script>
<template>
    <div class="loading-wrapper">
        <img :src="appData.icon" width="80">
    </div>
</template>
<style scoped>
.loading-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
