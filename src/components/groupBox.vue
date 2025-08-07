<script setup>
import Vstack from './Vstack.vue';
const props = defineProps(['header', "bg"])


</script>
<template>
    <div style="width: 100%;">
        <small v-if="props.header">{{ props.header }}</small>
        <div class="group" :style="{ backgroundColor: props.bg ?? 'var(--colour-foreground)' }">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.group {
    background-color: var(--colour-foreground);
    border-radius: 7px;
}
</style>
<style>
.group .listitem:last-child {
    border: 0;
}
</style>
