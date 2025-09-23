<script setup></script>
<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<style scoped>
.container {
    border-right: var(--border-1);
    width: 300px;
    background-color: var(--background-1);
    padding: var(--spacing-4);
}
</style>
