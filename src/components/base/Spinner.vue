<script setup></script>

<template>
    <div>
        <div class="spinner-container">
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
        </div>
    </div>
</template>

<style scoped>
div {
    --spinner-size: 28px;
    --spinner-speed: 1s;
    --spinner-color: var(--text-primary);
}

@keyframes spin {
    0% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.3;
    }
}

.spinner-container {
    width: var(--spinner-size);
    height: var(--spinner-size);
    position: relative;
}

.spinner {
    position: absolute;
    width: calc(var(--spinner-size) * 0.104);
    height: calc(var(--spinner-size) * 0.3125);
    border-radius: calc(var(--spinner-size) * 0.0625);
    background-color: var(--spinner-color);
    left: calc(var(--spinner-size) * 0.375);
    transform-origin: 50% calc(var(--spinner-size) * 0.5);
    animation: spin var(--spinner-speed) linear infinite;
}

.spinner:nth-child(1) {
    transform: rotate(calc(45deg * 1));
    animation-delay: calc(var(--spinner-speed) / 8 * 0);
}

.spinner:nth-child(2) {
    transform: rotate(calc(45deg * 2));
    animation-delay: calc(var(--spinner-speed) / 8 * 1);
}

.spinner:nth-child(3) {
    transform: rotate(calc(45deg * 3));
    animation-delay: calc(var(--spinner-speed) / 8 * 2);
}

.spinner:nth-child(4) {
    transform: rotate(calc(45deg * 4));
    animation-delay: calc(var(--spinner-speed) / 8 * 3);
}

.spinner:nth-child(5) {
    transform: rotate(calc(45deg * 5));
    animation-delay: calc(var(--spinner-speed) / 8 * 4);
}

.spinner:nth-child(6) {
    transform: rotate(calc(45deg * 6));
    animation-delay: calc(var(--spinner-speed) / 8 * 5);
}

.spinner:nth-child(7) {
    transform: rotate(calc(45deg * 7));
    animation-delay: calc(var(--spinner-speed) / 8 * 6);
}

.spinner:nth-child(8) {
    transform: rotate(calc(45deg * 8));
    animation-delay: calc(var(--spinner-speed) / 8 * 7);
}
</style>
