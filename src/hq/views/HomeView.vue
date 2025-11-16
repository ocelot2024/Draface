<script setup>
import { Translated } from '@/store/translate';
import apps from '@/apps/apps';
import { reactive } from 'vue';
import { getElementPos } from '@/core/dom';
import { AppData } from '@/core/store';

const appindex = reactive(apps);
const recent_apps = reactive(AppData.data.HQ.AppHistory)
defineEmits(['launchApp'])
</script>
<template>
    <header style="height: 32px;" />
    <div class="content">
        <div>
            <h1>{{ Translated.data.hq.home.home }}</h1>
        </div>
        <h2>{{ Translated.data.hq.home.recent_items }}</h2>
        <div class="apps">
            <div v-for="value in recent_apps" :key="value.id" class="app-container"
                @click="$emit('launchApp', [getElementPos($event.target), value])">
                <div class="app" :style="{ backgroundImage: `url(${value.icon})` }"></div>
                <div class="app-name">{{ value.name }}</div>
            </div>
        </div>
        <h2>{{ Translated.data.hq.home.apps }}</h2>
        <div class="apps">
            <div v-for="value in appindex" :key="value.id" class="app-container"
                @click="$emit('launchApp', [getElementPos($event.target), value])">
                <div class="app" :style="{ backgroundImage: `url(${value.icon})` }"></div>
                <div class="app-name">{{ value.name }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}

.apps {
    display: grid;
    grid-template-columns: repeat(auto-fit, 80px);
    gap: 16px;
    width: 100%;
    margin-top: var(--spacing-2);
}

.app-container {
    cursor: pointer;
}

.app {
    aspect-ratio: 1;
    border-radius: var(--border-radius-4);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}


.app-name {
    text-align: center;
    width: 100%;
    margin-top: var(--spacing-2);
}
</style>
