<script setup>
import { computed, inject, ref } from 'vue';
import Vstack from './Vstack.vue';
import { generateID } from '@/assets/js/utils';
const prop = defineProps(
    ['label']
)
const id = ref(generateID());

const menu_manager = inject('menu_manager')

const opend = computed(() => menu_manager.openID.value === id.value)

const open = () => {
    menu_manager.open(id.value)
}
</script>
<template>
    <div class="menu-wrapper">
        <button class="menu-button" @click="open()">
            {{ prop.label }}
        </button>
        <div class="menu-list blurred" :class="{ open: opend }">
            <vstack justify="flex-start">
                <slot />
            </vstack>
        </div>
    </div>
</template>
<style scoped>
.menu-wrapper {
    font-size: .8rem;
    position: relative;
}

.menu-button {
    border: 0;
    height: 100%;
    display: block;
    text-align: justify;
    cursor: pointer;
    padding: 3px;
    border-radius: 3px;
    border: 0;
    box-shadow: none;
}

.menu-list {
    display: none;
    top: 31px;
    background-color: var(--colour-blurred);
    position: absolute;
    border-radius: 7px;
    padding: 5px;
    min-width: 230px;
    backdrop-filter: blur(3px);
    box-shadow: 0 7px 22px 0 #00000040, 0 0 1.5px 0 #0000004d, 0 0 1px 0 #00000066;
}

.open {
    display: block;
}

.menu-list,
.menu-list * {
    list-style: none;
}
</style>
