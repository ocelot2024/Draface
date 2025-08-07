<script setup>
import { inject } from 'vue';

const prop = defineProps(
    {
        key_bind: Object,
        separate: {
            default() {
                return 'none'
            },
            validator(value, _props) {
                return ['above', 'bellow', 'none'].includes(value)
            }
        },
    }
)

const emits = defineEmits(['menu_click']);
const menu_manager = inject('menu_manager')

const on_click = () => {
    menu_manager.close();
    emits('menu_click')
}
</script>
<template>
    <span :class="prop.separate" class="menu-item" @click="on_click">
        <slot />
    </span>
</template>
<style scoped>
.menu-item {
    width: 100%;
    padding: 1px;
}

.above {
    border-top: 1px solid var(--colour-border);
}

.bellow {
    border-bottom: 1px solid var(--colour-border);
}

.none {
    border: 1px transparent solid;
}
</style>
