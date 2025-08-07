<script setup>
import { computed } from 'vue';

const prop = defineProps(
    {
        Spacing: [Number, String],
        Align: String,
        Justify: String
    }
)
const styles = computed(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: prop.Align || 'center',
    justifyContent: prop.Justify || 'center',
    gap: prop.Spacing + 'px' || 0
}))
</script>
<template>
    <div class="h-stack" :style="styles">
        <slot></slot>
    </div>
</template>
<style scoped>
.h-stack {
    width: 100%;
    min-height: 0;
    align-items: stretch;
}
</style>
