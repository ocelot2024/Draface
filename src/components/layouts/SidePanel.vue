<script setup></script>
<template>
    <div class="container">
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
    border-right: var(--border-1);
    width: 300px;
    background-color: var(--background-1);
    padding: var(--spacing-4);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100dvh;
}

.footer {
    margin-top: auto;
}
</style>
