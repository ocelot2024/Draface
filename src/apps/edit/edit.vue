<script setup>
import MenuBar from '@/components/layouts/MenuBar.vue';
import MenuBarButton from '@/components/layouts/MenuBarButton.vue';
import MenuBarButtonItem from '@/components/layouts/MenuBarButtonItem.vue';
import MenuBarButtonItemDevider from '@/components/layouts/MenuBarButtonItemDevider.vue';
import { Translated } from '@/store/translate';
</script>
<template>
    <div class="app">
        <MenuBar>
            <MenuBarButton :label="Translated.data.edit.menubar.file">
                <MenuBarButtonItem>新規</MenuBarButtonItem>
                <MenuBarButtonItemDevider />
                <MenuBarButtonItem :key-bind="['Ctrl', 'Q']">閉じる</MenuBarButtonItem>
            </MenuBarButton>
        </MenuBar>
    </div>
</template>
<style scoped>
.app {
    position: relative;
}
</style>
