<script setup>
import { inject, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue';
import { Editor } from '../js/editor';

const instance = reactive(new Editor())

//const instance = inject('instance')
const lines = instance.data

const textArea = useTemplateRef('textarea');
const carret_ref = useTemplateRef('carret_ref');

const carretPos = instance.carretPos

const focused = ref(false)

const updateSelecte = () => {
    instance.updateSelection(textArea.value);
}

const onInput = (e) => {
    instance.onChange(textArea.value.value);
    instance.updateCursor(textArea.value, carret_ref.value[0])
}

const focus = () => { textArea.value.focus(); focused.value = true }
const unfocus = () => focused.value = false;

onMounted(() => {
    instance.init(textArea, carret_ref);
    textArea.value.addEventListener('input', onInput);
    textArea.value.addEventListener('focusout', unfocus);
    textArea.value.addEventListener('selectionchange', updateSelecte)
    focus();
})

onBeforeUnmount(() => {
    textArea.value.removeEventListener('input', onInput);
    textArea.value.removeEventListener('focusout', unfocus);
});
</script>
<template>
    <div class="editor" @click="focus">
        <div v-for="(v, i) in lines">
            <div class="line">
                <div class="line-counter-container">
                    <div class="line-counter">{{ i + 1 }}</div>
                </div>
                <div class="line-content-container">
                    <template v-if="i === carretPos.line">
                        <span>{{ v.slice(0, carretPos.pos) }}</span>
                        <span>{{ instance.compositing }}</span>
                        <span class="carret" :key="carretPos.pos" v-show="focused" ref="carret_ref"><span /></span>
                        <span>{{ v.slice(carretPos.pos) }}</span>
                    </template>
                    <template v-else>
                        <span>{{ v }}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <textarea ref="textarea" style="position: fixed; width: 100%;"
        :style="{ top: instance.textareaPos.top + 'px', left: '4rem' }"></textarea>
</template>
<style scoped>
.editor {
    padding-top: 36px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    cursor: text;
}

textarea {
    opacity: 0;
    z-index: -999;
}

.line {
    display: flex;
    gap: var(--spacing-5);
    width: 100%;
    overflow-wrap: anywhere;
    line-height: 26px;
}

.line-counter {
    min-width: 3rem;
    padding-left: 1rem;
    text-align: right;
    color: var(--text-secondary);
    user-select: none;
}

.line-content-container {
    vertical-align: baseline;
    user-select: text;
}

.line * {
    font-family: monospace;
    font-size: 18px;
    user-select: text;
}

.carret {
    position: relative;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.carret>span {
    position: absolute;
    top: 0;
    left: 1px;
    height: 26px;
    width: 2px;
    background-color: var(--colour-primary);
    animation: infinite 1.5s step-end blink;
}
</style>
