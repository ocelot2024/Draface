<script setup>
defineEmits(['click'])
</script>
<template>
    <div class="listitem" @click="$emit('click')">
        <slot />
    </div>
</template>
<style scoped>
.listitem {
    border-bottom: 1px solid var(--colour-border);
}
</style>
