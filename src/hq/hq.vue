<script setup>
import { onMounted, reactive, ref } from 'vue';
import data, { menuItems } from './assets/data';
import appicon from './components/appicon.vue';
import Unspported from './components/unspported.vue';
import Hstack from '@/components/Hstack.vue';
import SidePanel from '@/components/SidePanel.vue';
import Icon from '@/components/Icon.vue';
import PanelItem from './components/PanelItem.vue';
import GroupBox from '@/components/groupBox.vue';
import { getRecentApps } from './assets/core';
const show_pane = ref(true)
const content_id = ref('apps')

const menu = menuItems;

const recent_app = ref([]);

onMounted(() => {
    recent_app.value = getRecentApps();
})
</script>

<template>
    <Hstack -align="start" -justify="start">
        <div v-show="!show_pane" class="closed_pane">
            <button @click="show_pane = true">
                <Icon>
                    right_panel_close
                </Icon>
            </button>
        </div>
        <SidePanel v-show="show_pane">
            <Hstack -justify="end">
                <button @click="show_pane = false">
                    <Icon>
                        left_panel_close
                    </Icon>
                </button>
            </Hstack>
            <h1>Neffice</h1>
            <ul style="margin-top: 28px;">
                <PanelItem v-for="value in menu" :icon="value.icon" @click="content_id = value.item_id">
                    {{ value.label }}
                </PanelItem>
            </ul>
        </SidePanel>
        <div class="content-area">
            <div v-show="content_id == 'home'">
                <GroupBox header="最近の項目" headerStyle="large">
                    <appicon v-for="i in recent_app" v-bind="i" :key="recent_app.length" />
                </GroupBox>
            </div>
            <div v-show="content_id == 'apps'">
                <appicon v-for="i in data.apps" v-bind="i" />
            </div>
        </div>
    </Hstack>
    <Unspported />
</template>
<style scoped>
.launch {
    padding: 14px;
}

p {
    padding-top: 14px;
}

.content-area {
    flex: 1;
    background-color: var(--colour-foreground);
    height: 100%;
}

.content-area * {
    background-color: transparent;
}

button {
    border: 0;
    padding: 0;
    cursor: pointer;
}

.closed_pane,
.closed_pane * {
    background-color: transparent;
}

.closed_pane {
    position: absolute;
    top: 14px;
    left: 14px;
}

ul,
li {
    list-style: none;
    padding: 0;
    vertical-align: middle;
}
</style>
