<script setup>
import { KeyNames } from '@/assets/staticData/keys';
import { ref } from 'vue';

const props = defineProps(
    {
        keyBind: Array,
        default: () => [],
        validator(value, _props) {
            for (let i = 0; i < value.length; i++) {
                if (KeyNames.includes(value[i])) continue
                else console.log(value[i] + ' is not valid key.')
            }
        }
    }
)
const KeyBind = ref(props.keyBind)
</script>
<template>
    <div class="item">
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
