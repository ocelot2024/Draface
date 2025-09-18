<script setup>
const props = defineProps(['header', "bg", "headerStyle"])


</script>
<template>
    <div style="width: 100%;">
        <small v-if="props.header" :class="headerStyle ?? 'normal'">{{ props.header }}</small>
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

.large {
    font-size: larger;
    font-weight: bold;
}

.normal {
    font-size: inherit;
}
</style>
