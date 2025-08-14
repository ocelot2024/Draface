<script setup>
import FullScreen from '@/components/FullScreen.vue';
import MenuBar from '@/components/MenuBar.vue';
import MenuButton from '@/components/MenuButton.vue';
import MenuItem from '@/components/MenuItem.vue';
import router from '@/router';
import { provide, reactive, ref } from 'vue';
import Editor from './components/editor.vue';
import Hstack from '@/components/Hstack.vue';
import About from './components/about.vue';
import Settings from './components/settings.vue';
import { DefineMenu, DefineMenuItem } from './assets/util';
import { openAppFile, PlainTextFile } from './assets/file';
import { dlFile } from '@/assets/js/core/file';
import Saveas from './components/saveas.vue';

const show_about = ref(false)
const show_settings = ref(false)
const show_save_prompt = ref(false)
const instance = reactive(new PlainTextFile('untitle'))

provide('instance', instance);

const Menu = reactive(
    [
        DefineMenu(
            "ファイル",
            [
                DefineMenuItem("開く", () => openAppFile(instance)),
                DefineMenuItem("保存", () => dlFile(instance),),
                DefineMenuItem("名前をつけて保存", () => show_save_prompt.value = true, "none"),
                DefineMenuItem("環境設定", () => show_settings.value = true, "above"),
                DefineMenuItem('閉じる', () => router.back(), "above")
            ]
        ),
        DefineMenu(
            "編集",
            [
                DefineMenuItem('もとに戻す'),
                DefineMenuItem('やり直し')
            ]
        )
    ])

</script>
<template>
    <FullScreen>
        <MenuBar @help="show_about = true" style="position: fixed; z-index: 9999999;">
            <strong style="width: 4rem ; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{
                instance.filename }}</strong>
            <MenuButton v-for="MenuB in Menu" :label="MenuB.label" :key="MenuB">
                <MenuItem v-for="MenuI in MenuB.items" v-bind="MenuI.bind" @menu_click="MenuI.command" :key="MenuI">
                {{ MenuI.label }}
                </MenuItem>
            </MenuButton>
        </MenuBar>
        <Hstack style="position: fixed; inset: 0; top: 35px;" -spacing="0">
            <Editor v-model="instance.data" />
        </Hstack>
        <About v-model:shown="show_about" />
        <Settings v-model:shown="show_settings" />
        <Saveas v-model:shown="show_save_prompt" v-model:filename="instance.filename"
            @save_as="() => dlFile(instance)" />
    </FullScreen>
</template>
