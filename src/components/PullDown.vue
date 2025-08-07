<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Hstack from './Hstack.vue';
import Vstack from './Vstack.vue';
import GroupBox from './groupBox.vue';
import ListItem from './ListItem.vue';

const props = defineProps(['options']);
const selected = defineModel("selected");
const is_open = ref(false);

const selected_lebel = computed(() => props.options[selected.value] ?? '選択してください');

const clicked = (value) => {
    selected.value = value;
    is_open.value = false;
}

const DropDown_ref = ref(null);

const handle_click_outside = (event) => {
    if (DropDown_ref.value && !DropDown_ref.value.contains(event.target)) {
        is_open.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handle_click_outside);
});

onUnmounted(() => {
    document.removeEventListener('click', handle_click_outside);
});
</script>

<template>
    <div class="border" ref="DropDown_ref">
        <Hstack :spacing="10" @click="is_open = true" @click.stop>
            <div style="min-width: 85px; width: max-content;" :key="selected">{{ selected_lebel }}</div>
            <div class="triangle"></div>
        </Hstack>
        <Vstack class="options blurred" align="start" v-show="is_open" @click.stop>
            <GroupBox bg="transparent">
                <ListItem v-for="(v, i) in props.options" :key="i" @click="clicked(i)">
                    <div style="padding: 7px;">{{ v }}</div>
                </ListItem>
            </GroupBox>
        </Vstack>
    </div>
</template>

<style scoped>
.border {
    box-shadow: 0 0 0 1px var(--colour-shadow), 0 0.5px 2.5px 0 var(--colour-shadow-2);
    border-radius: 5px;
    padding: 3px 7px;
    position: relative;
    cursor: pointer;
    border: 0;
    font-size: 18px;
}



.triangle {
    width: 15px;
    height: 16px;
    background-image: url(../assets/img/arrow.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
}

.options {
    position: absolute;
    top: 120%;
    left: 0px;
    max-height: 500px;
    overflow-y: auto;
    text-align: left;
    z-index: 1;
}

.blurred {
    background-color: var(--colour-blurred);
    backdrop-filter: blur(6px);
    border-radius: 5px;
    box-shadow: 0 0 0 1px var(--colour-shadow), 0 0.5px 2.5px 0 var(--colour-shadow-2);
}
</style>
