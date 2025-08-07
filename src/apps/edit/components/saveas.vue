<script setup>
import Modal from '@/components/modal.vue';
import Hstack from '@/components/Hstack.vue';
import Vstack from '@/components/Vstack.vue';

const model = defineModel('shown')
const filename = defineModel('filename')
defineEmits(['save_as'])
</script>
<template>
    <Modal v-model:shown="model" :show_buttons="false">
        <Vstack justify="start" :spacing="14" style="padding: 7px;">
            <h2>名前をつけて保存</h2>
        </Vstack>
        <Hstack style="padding: 7px;" :-spacing="14">
            <button @click="model = false">キャンセル</button>
            <input type="text" v-model="filename" />
            <button class="primary" @click="$emit('save_as')">保存</button>
        </Hstack>
    </Modal>
</template>
<style scoped>
button.primary {
    background-color: var(--colour-primary);
}
</style>
