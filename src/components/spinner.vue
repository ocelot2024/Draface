<script setup></script>
<template>
    <div class="container">
        <div class="spinner"></div>
        <div class="spinner"></div>
        <div class="spinner"></div>
        <div class="spinner"></div>
        <div class="spinner"></div>
        <div class="spinner"></div>
        <div class="spinner"></div>
        <div class="spinner"></div>
    </div>
</template>
<style scoped>
.container,
.container>* {
    --spiner-size: 14px;
}

@keyframes spin {
    0% {
        opacity: .4;
    }

    100% {
        opacity: .5;
    }
}

.container {
    width: calc(var(--spiner-size) * 3);
    height: calc(var(--spiner-size) * 3);
    position: relative;
}

.spinner {
    opacity: .5;
    background-color: var(--colour-text);
    width: calc(var(--spiner-size) / 3);
    height: calc(var(--spiner-size));
    border-radius: 999px;
    position: absolute;
    top: 0;
    left: calc((var(--spiner-size) * 3 + var(--spiner-size) / 3) / 2.1 - var(--spiner-size) / 4);
    transform-origin: 50% calc(var(--spiner-size)*1.5);
    animation: infinite .7s spin;
}

.spinner:nth-child(1) {
    transform: rotate(45deg);
    animation-delay: .1s;
}

.spinner:nth-child(2) {
    transform: rotate(90deg);
    animation-delay: .2s;
}

.spinner:nth-child(3) {
    transform: rotate(135deg);
    animation-delay: .3s;
}

.spinner:nth-child(4) {
    transform: rotate(180deg);
    animation-delay: .4s;
}

.spinner:nth-child(5) {
    transform: rotate(225deg);
    animation-delay: .5s;
}

.spinner:nth-child(6) {
    transform: rotate(270deg);
    animation-delay: .6s;
}

.spinner:nth-child(7) {
    transform: rotate(315deg);
    animation-delay: .7s;
}
</style>
