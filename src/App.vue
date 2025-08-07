<script setup>
</script>

<template>
  <RouterView />
  <RouterView name="app" class="app-wrapper" v-slot="{ Component }">
    <Transition name="app">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.app-wrapper {
  position: fixed;
  inset: 0;
}

.app-enter-active,
.app-leave-active {
  transition: all .1s ease-in-out;
}

.app-enter-from,
.app-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.app-enter-to,
.app-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
