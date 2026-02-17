<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  imageSrc: { type: String, required: true },
  title: { type: String, default: '' }
})
const emit = defineEmits(['close'])

const closeBtn = ref(null)
const dialog = ref(null)

function close() {
  emit('close')
}

onMounted(() => {
  // focus the close button for keyboard users
  closeBtn.value?.focus()
})
</script>

<template>
  <div
    class="image-modal__overlay"
    @click.self="close"
    @keydown.esc.window="close"
    role="dialog"
    aria-modal="true"
    :aria-label="title || 'Image preview'"
  >
    <div class="image-modal__dialog" ref="dialog" tabindex="-1">
      <button class="image-modal__close" @click="close" ref="closeBtn" aria-label="Close image preview">×</button>
      <img :src="imageSrc" :alt="title || 'Image preview'" class="image-modal__image" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-modal__overlay {
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 1rem;
  position: fixed;
  z-index: 2000;
  
}
.image-modal__dialog {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}
.image-modal__image {
  display: block;
  max-width: 90vw;
  max-height: 80vh;
  width: auto;
  height: auto;
}
.image-modal__close {
  align-items: center;
  background: var(--primary-color);
  border: none;
  border-radius: 0.25rem;
  color: var(--primary-color-lightest);
  cursor: pointer;
  display: flex;
  font-size: 1.25rem;
  height: 2rem;
  justify-content: center;
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;  
  width: 2rem;
  line-height: 1;
}
.image-modal__close:focus {
  outline: 3px solid color-mix(in srgb, var(--primary-color) 20%, white);
}

/* Transition classes for Vue <Transition> when mounting/unmounting */
.image-modal-enter-active,
.image-modal-leave-active {
  transition: opacity 220ms ease;
}
.image-modal-enter-from,
.image-modal-leave-to {
  opacity: 0;
}
.image-modal-enter-to,
.image-modal-leave-from {
  opacity: 1;
}

/* Slight dialog scale on appear */
.image-modal-enter-from .image-modal__dialog {
  transform: scale(0.98);
  transition: transform 220ms ease;
}
.image-modal-enter-to .image-modal__dialog {
  transform: none;
}
.image-modal-leave-from .image-modal__dialog {
  transform: none;
}
.image-modal-leave-to .image-modal__dialog {
  transform: scale(0.98);
}
</style>
