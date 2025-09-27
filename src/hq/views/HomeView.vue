<script setup>
import { Translated } from '@/store/translate';
import apps from '@/apps/apps';
import { reactive } from 'vue';
import { getElementPos } from '@/core/dom';
const appindex = reactive(apps);
defineEmits(['launchApp'])
</script>
<template>
    <div class="content">
        <div>
            <h1>{{ Translated.data.hq.home.home }}</h1>
            <h2>{{ Translated.data.hq.home.apps }}</h2>
        </div>
        <div class="apps">
            <div v-for="value in appindex" :key="value.id" class="app-container"
                @click="$emit('launchApp', getElementPos($event.target))">
                <div class="app" :style="{ backgroundImage: `url(${value.icon})` }"></div>
                <div class="app-name">{{ value.name }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.content {
    padding: var(--spacing-4);
    width: 100%;
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
