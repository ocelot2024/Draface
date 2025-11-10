<script setup>
const props = defineProps({
    items: {
        type: Array,
    },
    selectable: {
        type: Boolean,
        default: false
    }
})

const model = defineModel();

const unSelect = () => model.value = -1;

const clicked = (index) => {
    if (!props.selectable) return
    model.value = index;
    emit('selected', index)
}

defineExpose({ unSelect });
const emit = defineEmits(['selected'])

</script>
<template>
    <div class="ListContainer">
        <div v-for="(value, index) in items" class="item" @click="clicked(index)" :class="{ selected: model == index }">
            {{ value }}
        </div>
    </div>
</template>
<style scoped>
.ListContainer {
    border-radius: var(--border-radius-4);
    background-color: var(--background-0);
}

.item {
    padding: var(--spacing-2);
    transition: none;
}

.item:last-child {
    border-radius: 0 0 var(--border-radius-4) var(--border-radius-4);
}

.item:first-child {
    border-radius: var(--border-radius-4) var(--border-radius-4) 0 0;
}

.item:first-child:last-child {
    border-radius: var(--border-radius-4);
}

.item:not(:last-child) {
    border-bottom: var(--border-0);
}

.selected {
    background-color: var(--background-primary-1);
    color: var(--text-inverse);
}
</style>
