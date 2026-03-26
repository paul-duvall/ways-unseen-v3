<script setup lang="ts">
interface Creation {
  id: string
  title: string
  image_folder: string
  blurb: string
}

const creations = ref<Creation[]>([])
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/data/creations.json')
    if (!response.ok) {
      throw new Error('Failed to load creations')
    }
    creations.value = await response.json()
  } catch (err) {
    error.value = 'Unable to load creations. Please try again later.'
    console.error('Error loading creations:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container">
    <section>
      <h2>Creations</h2>
      <p class="intro">
        I have a range of tabletop resources (and some solo games) available online that feature my maps and illustrations. Explore below and click through to itch.io or drivethrurpg if you'd like to find out more about any of them or to get yourself a copy!
      </p>

      <AppLoadingSpinner v-if="isLoading" />

      <div v-else-if="error" class="status-message error">
        {{ error }}
      </div>

      <div v-else class="creations-grid">
        <NuxtLink 
          v-for="creation in creations" 
          :key="creation.id" 
          :to="`/creations/${creation.id}`" 
          class="creation-card"
        >
          <img :src="`/images/creations/${creation.image_folder}/thumbnail.png`" :alt="creation.title" class="creation-image" />
          <div class="card-content">
            <h3 class="creation-title">{{ creation.title }}</h3>
            <p class="creation-blurb">{{ creation.blurb }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--primary-color-dark);
  padding: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

section {
  margin: 0 auto;
  max-width: 60rem;
}

.intro {
  text-align: center;
  margin: 0 auto 2rem;
  max-width: 45rem;
}

.status-message.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: var(--secondary-color);
}

.creations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
}

@media (max-width: 1023px) {
  .creations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .creations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.creation-card {
  background-color: var(--primary-color-darker);
  border-radius: 0.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  transition: border 0.2s ease;
  overflow: hidden;
  width: 18rem;
  margin: 0 auto;
  text-decoration: none;
  border: 2px solid transparent;
  color: var(--text-color);
}

.creation-card:hover {
  border: 2px solid var(--secondary-color);
}

.creation-image {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 0;
}

.card-content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.creation-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: var(--primary-color-lightest);
}

.creation-blurb {
  flex-grow: 1;
  margin-bottom: 0.75rem;
  line-height: 1.5;
  font-size: 0.9rem;
  color: var(--text-color);
}
</style>
