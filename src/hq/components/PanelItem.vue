<script setup>
import Icon from '@/components/Icon.vue';
import Hstack from '@/components/Hstack.vue';
const prop = defineProps(['icon'])
</script>
<template>
    <button>
        <Hstack -spacing="7" -justify="start" class="child">
            <Icon>{{ prop.icon }}</Icon>
            <span>
                <slot />
            </span>
        </Hstack>
    </button>
</template>
<style scoped>
button {
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
}

button>.child {
    padding: 7px;
}

button:hover {
    background-color: #dedede80;
}

button * {
    background-color: transparent;
}
</style>
