<script setup>
import GroupBox from '@/components/groupBox.vue';
import Hstack from '@/components/Hstack.vue';
import ListItem from '@/components/ListItem.vue';
import Modal from '@/components/modal.vue';
import PullDown from '@/components/PullDown.vue';
import Vstack from '@/components/Vstack.vue';
import { ref } from 'vue';
import { AppGlobalSettings, save_settings } from '@/assets/js/core/settings';

const model = defineModel('shown')

const indent_char = ref(AppGlobalSettings.apps.Editor.indent_char)
const space_len = ref(AppGlobalSettings.apps.Editor.space_len)

const moda_prop = {
    footerButtons: [
        {
            label: "キャンセル",
            onClick: () => { model.value = false }
        },
        {
            label: "保存",
            type: "primary",
            onClick: () => {
                AppGlobalSettings.apps.Editor.indent_char = indent_char.value;
                AppGlobalSettings.apps.Editor.space_len = space_len.value;
                save_settings();
                model.value = false
            }
        },
    ],
}
</script>
<template>
    <Modal v-model:shown="model" v-bind="moda_prop">
        <Vstack class="modal">
            <GroupBox header="エディタ">
                <ListItem>
                    <Hstack -justify="flex-start" style="padding: 7px;">
                        <p style="flex: 1;">タブの種類</p>
                        <PullDown style="flex: 0;" v-model:selected="indent_char" :options="['タブ文字', 'スペース']" />
                    </Hstack>
                </ListItem>
                <ListItem>
                    <Hstack -justify="flex-start" style="padding: 7px;">
                        <p style="flex: 1;">タブの文字数</p>
                        <PullDown style="flex: 0;" v-model:selected="space_len" :options="[2, 4, 8]" />
                    </Hstack>
                </ListItem>
                <ListItem>
                    <Hstack -justify="flex-start" style="padding: 7px;">
                        <p>改行時にインデントを保持する</p>
                    </Hstack>
                </ListItem>
            </GroupBox>
        </Vstack>
    </Modal>
</template>
<style scoped>
.modal {
    width: 550px;
}
</style>
