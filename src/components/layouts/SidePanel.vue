<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import BaseButton from '../base/BaseButton.vue';
import { ref } from 'vue';

const showPane = ref(true);
</script>
<template>
    <BaseButton variant="icon" @click="showPane = !showPane" v-if="!showPane" class="showButton">
        <ChevronRightIcon v-if="!showPane" />
    </BaseButton>
    <div class="container" :class="{ hide: !showPane }">
        <header>
            <BaseButton variant="icon" @click="showPane = !showPane">
                <ChevronLeftIcon v-if="showPane" />
                <ChevronRightIcon v-if="!showPane" />
            </BaseButton>
        </header>
        <div>
            <slot name="main" />
        </div>
        <div class="footer">
            <slot name="footer" />
        </div>
    </div>
</template>
<style scoped>
.container {
    transition: all 0.35s cubic-bezier(0.4, 1, 0.4, 1);
    border-right: var(--border-1);
    width: 300px;
    background-color: var(--background-1);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100dvh;
    padding: var(--spacing-4);
    white-space: nowrap;
}

.container.hide {
    width: calc(var(--spacing-4)*2);
    border-color: transparent;
    overflow-x: hidden;
    opacity: 0;
    white-space: nowrap;
}

.showButton {
    position: fixed;
    z-index: 999;
    top: var(--spacing-4);
    left: var(--spacing-2);
}

header {
    display: flex;
    justify-content: right;
    width: 100%;
}


.footer {
    margin-top: auto;
}
</style>
