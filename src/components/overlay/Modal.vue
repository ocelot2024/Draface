<script setup>
import Button from '../base/Button.vue';
defineEmits(['close'])
</script>
<template>
    <div class="fullscreen">
        <div class="modal-container">
            <div class="modal-header">
                <div class="close-button">
                    <Button variant="simple" @click="$emit('close')">X</Button>
                </div>
            </div>
            <div class="modal-content-area">
                <slot />
            </div>
        </div>
    </div>
</template>
<style scoped>
.fullscreen {
    position: fixed;
    inset: 0;
    background-color: #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    min-width: 100px;
    min-height: 100px;
    max-width: 750px;
    max-height: 1000px;
    background-color: var(--background-1);
    border-radius: var(--border-radius-4);
    transition: all .5s ease-in-out;
    overflow-y: auto;
    padding: var(--spacing-4);
}

.modal-header {
    width: 100%;
    padding: 0 1rem;
    position: sticky;
    top: 0;

    .close-button {
        width: 1rem;
        margin-left: auto;
    }
}

.modal-content-area {
    text-overflow: clip;
    overflow-wrap: break-word;
}
</style>
