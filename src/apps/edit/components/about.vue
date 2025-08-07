<script setup>
import Modal from '@/components/modal.vue';
import Vstack from '@/components/Vstack.vue';

const model = defineModel('shown')
</script>
<template>
    <Modal v-model:shown="model">
        <Vstack style="padding: 7px;">
            <img src="/edit.svg" width="150px">
            <h1>Edit</h1>
            <p>ブラウザ上で動作するシンプルなテキストエディタ。</p>
            <br>
            <small>Built with Vue.js</small>
        </Vstack>
    </Modal>
</template>
<style scoped></style>
