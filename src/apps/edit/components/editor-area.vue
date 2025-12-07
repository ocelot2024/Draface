<script setup>
import { onMounted, useTemplateRef } from 'vue';
import Editor from '../js/editor';

const instance = new Editor();
const editor = useTemplateRef("editorArea");
onMounted(() => {
    instance.setupEditor(editor.value);
})
</script>
<template>
    <div class="editor" contenteditable="true" ref="editorArea"></div>
</template>
<style scoped>
.editor {
    padding: var(--spacing-4);
    padding-top: calc(var(--spacing-4) + 32px);
    width: 100vw;
    min-height: 100%;
    border: 0;
    outline: 0;
}
</style>
