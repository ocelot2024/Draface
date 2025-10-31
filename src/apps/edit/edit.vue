<script setup>
import MenuBar from '@/components/layouts/MenuBar.vue';
import MenuBarButton from '@/components/layouts/MenuBarButton.vue';
import MenuBarButtonItem from '@/components/layouts/MenuBarButtonItem.vue';
import MenuBarButtonItemDevider from '@/components/layouts/MenuBarButtonItemDevider.vue';
import { Translated } from '@/store/translate';
import { onMounted, provide, reactive } from 'vue';
import { Editor } from './js/editor';
import { pickFile } from '@/core/file';
import editorArea from './components/editor-area.vue';

const instance = reactive(new Editor());

provide('instance', instance)

const start_with_new = () => {
    Object.assign(instance, new Editor());
}
</script>
<template>
    <div class="app">
        <MenuBar>
            <MenuBarButton :label="Translated.data.edit.menubar.file.label">
                <MenuBarButtonItem :key-bind="['Ctrl', 'N']" :handler="start_with_new">
                    {{ Translated.data.edit.menubar.file.start_with_new }}
                </MenuBarButtonItem>
                <MenuBarButtonItemDevider />
                <MenuBarButtonItem :key-bind="['Ctrl', 'S']" :handler="() => instance.save_to_local()">
                    {{ Translated.data.edit.menubar.file.save_to_local }}
                </MenuBarButtonItem>
                <MenuBarButtonItemDevider />
                <MenuBarButtonItem :key-bind="['Ctrl', 'Q']" :handler="() => pickFile(['*', true])">
                    {{ Translated.data.edit.menubar.file.quit }}
                </MenuBarButtonItem>
            </MenuBarButton>
        </MenuBar>
        <editorArea />
    </div>
</template>
<style scoped>
.app {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
}
</style>
