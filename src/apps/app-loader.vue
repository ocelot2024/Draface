<script setup>
import FullScreen from '@/components/FullScreen.vue';
import Vstack from '@/components/Vstack.vue';
import data from '@/assets/data';
import Spinner from '@/components/spinner.vue';
import { useRoute } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';

const route = useRoute();

const destination = computed(() => {
    const id = route.params.id;
    if (!id) return null;
    return defineAsyncComponent(() => import(`./${id}/${id}.vue`));
});
</script>

<template>
    <div>
        <Suspense>
            <component :is="destination" />
            <template #fallback>
                <FullScreen>
                    <Vstack align="center" :spacing="7">
                        <img :src="`/${route.params.id}.svg`" :alt="route.params.id" width="128" />
                        <h1>{{ data.appName }} {{ data.apps.names[route.params.id] }}</h1>
                        <Spinner />
                    </Vstack>
                </FullScreen>
            </template>
        </Suspense>
    </div>
</template>
