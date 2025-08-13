<script setup></script>
<template>
    <div class="side-panel">
        <slot></slot>
    </div>
</template>
<style scoped>
.side-panel {
    flex: 0;
    padding: 14px;
    border-right: 2px solid var(--colour-border);
    height: 100%;
    min-width: 200px;
}
</style>
