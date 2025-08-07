<script setup>
import { computed } from 'vue'

const props = defineProps({
    minWidth: {
        type: String,
        default: '300px'
    },
    gap: {
        type: String,
        default: '8px'
    }
})

const gridStyle = computed(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${props.minWidth}, 1fr))`,
    gap: props.gap
}))
</script>

<template>
    <div class="grid" :style="gridStyle">
        <slot />
    </div>
</template>

<style scoped>
.grid {
    width: 100%;
}
</style>
