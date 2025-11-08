<script setup>
defineProps(['title'])
</script>
<template>
    <header>
    </header>
    <h1>{{ title }}</h1>
</template>
<style scoped>
header {
    background-color: var(--background-overlay);
    border-bottom: var(--border-0);
}
</style>
