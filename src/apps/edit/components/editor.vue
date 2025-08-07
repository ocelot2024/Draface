<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { handle_tab_enter } from '../assets/editor';

const editor = ref(null)
const model = defineModel()

const handle = (e) => handle_tab_enter(e, editor, model)

onMounted(() => {
    editor.value.focus();
    editor.value.addEventListener('keydown', handle)
}
)
onBeforeUnmount(() => {
    editor.value.removeEventListener('keydown', handle)
})

</script>
<template>
    <textarea id="editor" ref="editor" v-model="model"></textarea>
</template>
<style scoped>
textarea {
    position: static;
    border: 0;
    outline: 0;
    min-height: 100%;
    width: 100vw;
    font-size: large;
}
</style>
