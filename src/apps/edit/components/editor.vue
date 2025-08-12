<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, computed, reactive } from 'vue';
import { handle_tab_enter, parseValue, scrollToLine, updateCursor, } from '../assets/editor';

const text_input = ref(null)
const canvas = ref(null)

const model = defineModel()
const lines = ref([""])

const cursor = reactive(
    {
        start:
            { line: 0, column: 0 },
        end:
            { line: 0, column: 0 }
    })


const onEnterTab = (e) => {
    handle_tab_enter(e, text_input, model, lines, cursor);
    nextTick(() => {
        updateCursor(text_input, model, cursor, canvas);
    });
}
const onInput = (e) => {
    parseValue(e, text_input, model, lines);
    nextTick(() => {
        updateCursor(text_input, model, cursor, canvas);
        scrollToLine(cursor.end.line, canvas)
    });
}

const focused = ref(false)

const isSinglePoint = computed(() => {
    return (
        cursor.start.line === cursor.end.line &&
        cursor.start.column === cursor.end.column
    );
});

const focus = () => {
    text_input.value.focus();
    focused.value = true;
}

const unFocus = () => {
    focused.value = false;
}

onMounted(() => {
    focus();
    text_input.value.addEventListener('keydown', onEnterTab)
    text_input.value.addEventListener('change', unFocus);
    text_input.value.addEventListener('click', oninput)
    canvas.value.addEventListener('click', focus)
})

onBeforeUnmount(() => {
    text_input.value.removeEventListener('keydown', onEnterTab)
    text_input.value.removeEventListener('change', unFocus)
    text_input.value.removeEventListener('click', oninput)
    canvas.value.removeEventListener('click', focus)
})
</script>

<template>
    <div class="text-canvas" ref="canvas">
        <div style="display: flex; font-size: large; gap: 2px;" v-for="(v, i) in lines" :key="i">
            <div class="row_num">{{ i + 1 }}</div>
            <div style="flex: 1; white-space: pre-wrap; word-break: break-word;" v-if="isSinglePoint">
                <template v-if="i === cursor.end.line">
                    <span>{{ v.slice(0, cursor.end.column) }}</span>
                    <span class="caret-parent"><span class="caret" v-show="focused" /></span>
                    <span>{{ v.slice(cursor.end.column) }}</span>
                </template>
                <template v-else>
                    <span>{{ v }}</span>
                </template>
            </div>
            <div style="flex: 1; white-space: pre-wrap; word-break: break-word;" v-else>
                <template v-if="cursor.start.line == i">
                    <span>
                        {{ v.slice(0, cursor.start.column) }}
                    </span>
                    <span class="high">
                        {{ v.slice(
                            cursor.start.column,
                            cursor.end.line != cursor.start.line
                                ? v.length
                                : cursor.end.column) }}</span>
                    <span>{{ v.slice(cursor.end.column + 1) }}</span>
                </template>
                <template v-else-if="cursor.start.line < i && i < cursor.end.line">
                    <span class="high">{{ v }}</span>
                </template>
                <template v-else-if="i === cursor.end.line">
                    <span class="high">{{ v.slice(0, cursor.end.column) }}</span>
                    <span class="caret-parent"><span class="caret" v-show="focused" /></span>
                    <span>{{ v.slice(cursor.end.column) }}</span>
                </template>
                <template v-else>
                    {{ v }}
                </template>
            </div>
        </div>
    </div>
    <textarea id="editor" ref="text_input" v-model="model" @input="onInput"
        style="position: absolute; z-index: 0;"></textarea>
</template>

<style scoped>
textarea {
    position: absolute;
    opacity: 0;
    border: 0;
    outline: 0;
}

.row_num {
    border-right: 2px solid var(--colour-border);
    min-width: 2rem;
    padding-right: 0.5rem;
    text-align: right;
}

.text-canvas {
    z-index: 1;
    position: absolute;
    border: 0;
    outline: 0;
    height: 100%;
    width: 100vw;
    font-size: large;
    overflow-y: auto;
    cursor: text;
    padding-bottom: 30vh;
}

.caret-parent {
    position: relative;
    padding: 0;
    margin: 0;
    height: 21px;
}

.caret {
    position: absolute;
    inset: 0;
    height: 21px;
    width: 1px;
    background-color: var(--colour-primary);
    animation: blink 1s step-start infinite;
    vertical-align: middle;
}

.high {
    background-color: var(--colour-primary);
}

span {
    font-family: monospace;
    font-size: 18px;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
