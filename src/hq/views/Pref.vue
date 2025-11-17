<script setup>
import List from '@/components/data/List.vue';
import SidePanel from '@/components/layouts/SidePanel.vue';
import { onMounted, ref } from 'vue';
import { Translated } from '@/store/translate';
import { PrefItems } from '../js/Prefs';

const emit = defineEmits(['opened'])
onMounted(() => {
    emit('opened');
    lists.value[0] = 0
})

const lists = ref([])

const selected = (listItemIndex, targetList) => {
    lists.value.forEach((_, i) => {
        lists.value[i] = -1;
    })
    lists.value[targetList] = listItemIndex;
}
</script>
<template>
    <div class="content">
        <SidePanel :hideable="false">
            <template #main>
                <h1>{{ Translated.data.hq.pref.name }}</h1>
                <br>
                <div class="list-container">
                    <div v-for="(value, index) in PrefItems">
                        <List :items="value.map(i => Translated.data.hq.pref.prefSections[i.name])" :selectable="true"
                            @selected="listItemIndex => selected(listItemIndex, index)" v-model="lists[index]" />
                    </div>
                </div>
            </template>
        </SidePanel>
        <div class="prefView">
            <div v-if="lists[0] !== undefined">
                <h1>{{Translated.data.hq.pref.prefSections[PrefItems[lists.findIndex(v => v >
                    -1)][lists[lists.findIndex(v =>
                        v >
                        -1)]].name]}}</h1>
                <div
                    style="background-color: var(--background-0); border-radius: var(--border-radius-4); padding: var(--spacing-2); margin-top: var(--spacing-4);">
                    a</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.content {
    padding: 0;
    display: flex;
    flex-shrink: 0;
}

.list-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}

.list-container div {
    cursor: pointer;
}

.prefView {
    padding: var(--spacing-4);
    padding-top: calc(var(--spacing-4) + 32px);
    background-color: var(--background-1);
    flex: 1;
}
</style>
