<script setup></script>
<template>
    <div class="editor-container">
        <div class="row">
            <div class="counter">
            </div>
            <div class="content">
            </div>
        </div>
    </div>
</template>
<style scoped>
.editor-container {
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
}

textarea {
    background-color: transparent;
    width: 1px;
    height: 1px;
}

.row {
    display: flex;
    gap: var(--spacing-4);
    height: 1rem;
    width: 100%;
}

.counter {
    width: 4rem;
    text-align: right;
    user-select: none;
}

.content {
    cursor: text;
    flex: 1;
}
</style>
