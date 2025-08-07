<script setup>
import Vstack from './Vstack.vue';

const prop = defineProps({
    header: String
})
</script>
<template>
    <Vstack -align="top">
        <h1>{{ prop.header }}</h1>
    </Vstack>
</template>
<style scoped></style>
