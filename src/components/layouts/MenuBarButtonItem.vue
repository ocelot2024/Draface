<script setup>
import { KeyNames } from '@/assets/staticData/keys';
import { ref } from 'vue';

const props = defineProps({
    keyBind: {
        type: Array,
        default: () => [],
        validator(value) {
            return value.every(v => KeyNames.includes(v))
        }
    },
    handler: {
        type: Function,
        default: () => { },
    }
})

const KeyBind = ref(props.keyBind)

const clicked = (e) => {
    e.preventDefault();
    props.handler();
}

</script>
<template>
    <div class="item" @click="clicked">
        <div class="label">
            <slot></slot>
        </div>
        <div class="key">{{ KeyBind?.join(' + ') }}</div>
    </div>
</template>
<style scoped>
.item {
    display: flex;
    cursor: pointer;
}

.label {
    flex: 1;
}

.key {
    color: var(--text-secondary);
}
</style>
