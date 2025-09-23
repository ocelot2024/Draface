<script setup>
import SidePanel from './SidePanel.vue';
</script>
<template>
    <div class="pane-container">
        <SidePanel>
            <slot name="pane-item"></slot>
        </SidePanel>
        <div class="contents-area">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<style scoped>
.pane-container {
    display: flex;
    min-width: 100%;
    min-height: 100vh;
    align-items: stretch;
}
</style>
