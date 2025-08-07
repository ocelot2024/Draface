<script setup>
import Vstack from './Vstack.vue';
</script>
<template>
    <div style="position: fixed; inset: 0; z-index: 0;">
        <Vstack style="height: 100vh;">
            <slot />
        </Vstack>
    </div>
</template>
