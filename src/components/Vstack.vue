<script setup>
import { computed } from 'vue';

const prop = defineProps(
    {
        spacing: Number,
        align: String,
        justify: String
    }
)
const styles = computed(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: prop.align || 'center',
    alignItems: prop.justify || 'center',
    gap: prop.spacing + 'px'
}))
</script>
<template>
    <div class="v-stack" :style="styles">
        <slot></slot>
    </div>
</template>
<style scoped>
.v-stack {
    width: 100%;
    min-height: 0;
    align-items: stretch;
}
</style>
