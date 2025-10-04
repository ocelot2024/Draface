<script setup>
import SidePanelViewContainer from '@/components/layouts/SidePanelViewContainer.vue';
import Editor from './components/editor.vue';

</script>
<template>
    <SidePanelViewContainer>
        <template #pane-item>
            <h1>Edit</h1>
        </template>
        <template #content>
            <Editor />
        </template>
    </SidePanelViewContainer>
</template>
