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
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner-container">
          <div class="spinner"></div>
          <div class="logo-background"></div>
          <img src="/images/logo-white.png" alt="Logo" class="logo" />
        </div>
      </div>
    </Transition>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.loading-overlay {
  align-items: center;
  background-color: var(--primary-color-dark);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}

.spinner-container {
  height: 100px;
  position: relative;
  width: 100px;
}

.spinner {
  animation: spin 0.8s linear infinite;
  border: 4px solid var(--primary-color-lighter);
  border-radius: 50%;
  border-top-color: var(--secondary-color);
  height: 100%;
  width: 100%;
}

.logo-background {
  background-color: #3a3a3a;
  border-radius: 50%;
  height: 92px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 92px;
}

.logo {
  height: 60px;
  left: 50%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
