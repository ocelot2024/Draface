<script setup>
import { inject, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue';

const data = defineModel()
const instance = inject('instance')
const lines = instance.data

const textArea = useTemplateRef('textarea');
const carretPos = instance.carretPos

const focused = ref(false)

const onInput = () => {
    instance.onChange(data.value);
    instance.updateCursor(textArea.value)
}

const focus = () => { textArea.value.focus(); focused.value = true }
const unfocus = () => focused.value = false;

onMounted(() => {
    textArea.value.addEventListener('input', onInput);
    textArea.value.addEventListener('focusout', unfocus)
    focus();
})
onBeforeUnmount(() => {
    textArea.value.removeEventListener('input', onInput)
    textArea.value.removeEventListener('focusout', unfocus)
})
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
                        <span class="carret" :key="carretPos.pos" v-show="focused"><span /></span>
                        <span>{{ v.slice(carretPos.pos) }}</span>
                    </template>
                    <template v-else>
                        <span>{{ v }}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <textarea v-model="data" ref="textarea"></textarea>
</template>
<style scoped>
.editor {
    padding-top: 36px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

textarea {
    opacity: 0;
}

.line {
    display: flex;
    gap: var(--spacing-5);
    width: 100%;
    overflow-wrap: anywhere;
}

.line-counter {
    min-width: 1rem;
    padding-left: 1rem;
    text-align: right;
    color: var(--text-secondary);
}

.line-content-container {
    vertical-align: baseline;
}

.line * {
    font-family: monospace;
    font-size: 18px;
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
