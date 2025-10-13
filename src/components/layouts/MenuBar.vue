<script setup></script>
<template>
    <div class="menu-bar-parent">
        <div class="menu-bar">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.menu-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--font-size-3);
    padding: var(--spacing-4);
    background-color: var(--background-overlay);
    backdrop-filter: var(--blur-1);
    display: flex;
    align-items: center;
    font-size: var(--font-size-3);
}
</style>
