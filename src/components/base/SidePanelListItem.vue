<script setup>
import Button from './BaseButton.vue';

defineProps({ active: { type: Boolean, default: false } })
defineEmits(['click'])
</script>
<template>
    <Button variant="ini" class="list-item" :class="{ active: active }" @click="$emit('click')">
        <slot />
    </Button>
</template>
<style scoped>
button.list-item {
    width: 100%;
    text-align: left;
    padding: var(--spacing-2);
    transform: translateX(calc(-1*var(--spacing-2)));
}

button.active {
    background-color: var(--background-2);
}
</style>
