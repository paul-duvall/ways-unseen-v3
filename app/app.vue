<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  if (document.readyState === 'complete') {
    isLoading.value = false
  } else {
    window.addEventListener('load', () => {
      // Small delay for smooth transition
      setTimeout(() => {
        isLoading.value = false
      }, 150)
    })
  }
})
</script>

<template>
  <div>
    <Transition name="fade">
      <AppLoadingSpinner v-if="isLoading" overlay />
    </Transition>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
