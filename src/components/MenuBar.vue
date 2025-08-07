<script setup>
import { provide, ref } from 'vue';
import Hstack from './Hstack.vue';
import Icon from './Icon.vue';

const pinned = ref(true)

const openID = ref(null);
provide('menu_manager', {
    openID,
    open(id) {
        openID.value = openID.value === id ? null : id;
    },
    close() {
        openID.value = null;
    }
})
defineEmits(['help'])
</script>
<template>
    <Hstack class="menu-bar blurred" -justify="left">
        <div class="menu-buttons">
            <Hstack -justify="left" style="width: 100vw;">
                <Hstack -justify="left" -spacing="14" style="flex: 1;">
                    <slot />
                </Hstack>
                <Hstack style="flex: 0; padding-right: 24px;" -spacing="14">
                    <Icon @click="$emit('help')">help</Icon>
                    <Icon @click="pinned = !pinned">{{ pinned ? 'keep' : 'keep_off' }}</Icon>
                </Hstack>
            </Hstack>
        </div>
    </Hstack>
</template>
<style scoped>
.menu-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 35px;
    padding: 7px;
    z-index: 999999;
}

.menu-bar * {
    user-select: none;
    background-color: transparent;
}
</style>
