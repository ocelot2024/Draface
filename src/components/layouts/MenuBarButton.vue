<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue';
import Button from '../base/BaseButton.vue';
defineProps(['label'])
const menuButton = useTemplateRef('menuButton')
const boxPosition = ref(null)
const boxShow = ref(false)
onMounted(() => {
    const pos = menuButton.value.el.getClientRects();
    boxPosition.value = pos[0].left + 'px';
    window.addEventListener('click', onClick)
})
onBeforeUnmount(() => {
    window.removeEventListener('click', onClick)
})
const onClick = (e) => {
    if (e.target == menuButton.value.el) {
        boxShow.value = !boxShow.value;
    } else {
        boxShow.value = false;
    }
}
</script>
<template>
    <div class="menu-bar-button">
        <Button variant="simple" ref="menuButton">{{ label }}</Button>
        <Teleport defer to=".menu-bar-parent">
            <div class="blur" :style="{ left: boxPosition }" v-show="boxShow">
                <p v-for="value in 10">{{ value }}</p>
            </div>
        </Teleport>
    </div>
</template>
<style scoped>
.menu-bar-button {
    position: relative;
}

.blur {
    background-color: var(--background-overlay);
    position: absolute;
    top: calc(var(--font-size-3) + (var(--spacing-4)/2.01));
    left: 10px;
    padding: var(--spacing-2);
    width: 250px;
    border-radius: var(--border-radius-3);
    backdrop-filter: var(--blur-1);
}
</style>
