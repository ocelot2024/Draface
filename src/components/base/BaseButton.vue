<script setup>
import { useTemplateRef } from 'vue';

const props = defineProps({
    variant: { type: String, default: "default" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])
const root = useTemplateRef('button')
defineExpose({ el: root })
</script>
<template>
    <button @click="$emit('click', $event)" :data-variant="props.variant" :data-block="props.block"
        :disabled="props.disabled" ref="button">
        <slot />
    </button>
</template>
<style scoped>
button {
    transition: var(--transition-1);
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--border-radius-3);
    border: var(--border-1);
    cursor: pointer;
    margin: var(--spacing-0) var(--spacing-1);
}

button[data-variant="default"] {
    color: var(--text-primary);
    background-color: var(--background-1);
}

button[data-variant="primary"] {
    color: var(--text-inverse);
    background-color: var(--background-primary-1);
}

button[data-variant="simple"] {
    color: var(--text-primary);
    background-color: transparent;
    border: 0;
}

button[data-variant="ini"] {
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
}

button[data-block="true"] {
    display: block;
    width: 100%;
}

button:disabled {
    color: var(--text-muted);
    cursor: not-allowed;
}
</style>
