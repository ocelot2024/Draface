<script setup></script>
<template>
    <div class="list-container">
        <slot></slot>
    </div>
</template>
<style scoped>
.list-container {
    margin-top: var(--spacing-8);
    display: flex;
    flex-direction: column;
}
</style>
