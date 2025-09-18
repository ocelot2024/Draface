<script setup>
import Vstack from '@/components/Vstack.vue';
import { addRecentApps } from '../assets/core';
const props = defineProps(
    {
        iconURL: {
            type: [String],
            default: () => '/logo.svg'
        },
        appname: String,
        appURL: String
    }
)
</script>
<template>
    <RouterLink @click="addRecentApps({ ...props })" :to="appURL" style="background-color: transparent;">
        <Vstack :spacing="7" class="appicon">
            <img :src="props.iconURL" alt="" width="128">
            <p>{{ appname }}</p>
        </Vstack>
    </RouterLink>
</template>
<style scoped>
.appicon {
    padding: 14px;
    background-color: transparent;
}

* {
    background-color: transparent;
}
</style>
