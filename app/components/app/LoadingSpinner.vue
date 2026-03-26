<script setup lang="ts">
interface Props {
  overlay?: boolean
  showLogo?: boolean
  size?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  overlay: false,
  showLogo: true,
  size: '100px',
  message: ''
})
</script>

<template>
  <div :class="{ 'loading-overlay': overlay, 'loading-inline': !overlay }">
    <div class="spinner-wrapper">
      <div class="spinner-container" :style="{ width: size, height: size }">
        <div class="spinner"></div>
        <div v-if="showLogo" class="logo-background"></div>
        <img v-if="showLogo" src="/images/logo-white.png" alt="Logo" class="logo" />
      </div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
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

.loading-inline {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

.loading-message {
  font-size: 1.1rem;
  color: var(--primary-color-lightest);
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
