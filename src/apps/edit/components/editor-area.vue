<script setup>
import { inject, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue';

const data = defineModel()
const instance = inject('instance')
const lines = instance.data

const textArea = useTemplateRef('textarea');
const carretPos = reactive({ line: 0, pos: 0 })

const onInput = () => {
    instance.onChange(data.value, lines);
}

onMounted(() => {
    textArea.value.addEventListener('input', onInput)
})
onBeforeUnmount(() => {
    textArea.value.removeEventListener('input', onInput)
})
</script>
<template>
    <div class="editor">
        <textarea v-model="data" ref="textarea"></textarea>
        <div v-for="(v, i) in lines">
            <div class="line">
                <div class="line-counter-container">
                    <div class="line-counter">{{ i + 1 }}</div>
                </div>
                <div class="line-content-container">
                    <div v-if="i == carretPos.line">
                        {{ v.slice(0, carretPos.pos) }}
                        <div class="carret"></div>
                        {{ v.slice(carretPos) }}
                    </div>
                    <div v-else>
                        {{ v }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.editor {
    padding-top: 36px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
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

.line * {
    font-family: monospace;
    font-size: 18px;
}
</style>
