<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { handle_tab_enter, parseValue, updateCursor, } from '../assets/editor';

const text_input = ref(null)
const model = defineModel()
const lines = ref([""])

const cursor = ref({ line: 0, column: 0 })



const onEnterTab = (e) => {
    handle_tab_enter(e, text_input, model, lines, cursor);
    nextTick(() => {
        updateCursor(text_input, model, cursor);
    });
}
const onInput = (e) => {
    parseValue(e, text_input, model, lines);
    nextTick(() => {
        updateCursor(text_input, model, cursor);
    });
}

onMounted(() => {
    text_input.value.focus();
    text_input.value.addEventListener('keydown', onEnterTab)
    text_input.value.addEventListener('click', oninput)
})

onBeforeUnmount(() => {
    text_input.value.removeEventListener('keydown', onEnterTab)
    text_input.value.removeEventListener('click', oninput)
})
</script>

<template>
    <textarea id="editor" ref="text_input" v-model="model" @input="onInput"></textarea>
    <div class="text-canvas">
        <div style="display: flex; font-size: large;" v-for="(v, i) in lines" :key="i">
            <div class="row_num">{{ i + 1 }}</div>
            <div style="flex: 1; white-space: pre-wrap; word-break: break-word;">
                <template v-if="i === cursor.line">
                    <span>{{ v.slice(0, cursor.column) }}</span>
                    <span class="caret-parent"><span class="caret" /></span>
                    <span>{{ v.slice(cursor.column) }}</span>
                </template>
                <template v-else>
                    {{ v }}
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
textarea {
    position: absolute;
    opacity: 0;
    border: 0;
    outline: 0;
    min-height: 100%;
    width: 100vw;
    font-size: large;
}

.row_num {
    border-right: 2px solid var(--colour-border);
    min-width: 2rem;
    padding-right: 0.5rem;
    text-align: right;
}

.text-canvas {
    position: static;
    border: 0;
    outline: 0;
    min-height: 100%;
    width: 100vw;
    font-size: large;
    font-family: monospace;
}

.caret-parent {
    position: relative;
    padding: 0;
    margin: 0;
    height: 1.2em;
}

.caret {
    position: absolute;
    inset: 0;
    width: 1px;
    background-color: var(--colour-primary);
    animation: blink 1s step-start infinite;
    vertical-align: middle;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
