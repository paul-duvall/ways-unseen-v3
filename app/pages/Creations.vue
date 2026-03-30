<script setup lang="ts">
interface Creation {
  id: string
  title: string
  blurb: string
  category: string
}

const creations = ref<Creation[]>([])
const isLoading = ref(true)
const error = ref('')

// Filter state - all checked by default
const showGames = ref(true)
const showMaps = ref(true)
const showResources = ref(true)

// Computed filtered creations based on checkbox states
const filteredCreations = computed(() => {
  return creations.value.filter(creation => {
    if (creation.category === 'games' && !showGames.value) return false
    if (creation.category === 'maps' && !showMaps.value) return false
    if (creation.category === 'resources' && !showResources.value) return false
    return true
  })
})

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
        I have created a range of tabletop resources and solo games, available digitally, many featuring my maps and illustrations. Explore below and click through to itch.io or drivethrurpg if you'd like to find out more about any of them or to purchase a copy!
      </p>

      <AppLoadingSpinner v-if="isLoading" />

      <div v-else-if="error" class="status-message error">
        {{ error }}
      </div>

      <div v-else>
        <div class="filter-section">
          <label class="filter-checkbox">
            <input type="checkbox" v-model="showGames" />
            <span>Solo games</span>
          </label>
          <label class="filter-checkbox">
            <input type="checkbox" v-model="showMaps" />
            <span>Maps etc</span>
          </label>
          <label class="filter-checkbox">
            <input type="checkbox" v-model="showResources" />
            <span>Other tabletop resources</span>
          </label>
        </div>

        <div v-if="filteredCreations.length === 0" class="status-message">
          Select at least one category to see some creations
        </div>

        <TransitionGroup v-else name="card-list" tag="div" class="creations-grid">
          <NuxtLink 
            v-for="creation in filteredCreations" 
            :key="creation.id" 
          :to="`/creations/${creation.id}`" 
          class="creation-card"
        >
          <img :src="`/images/creations/${creation.id}/thumbnail.png`" :alt="creation.title" class="creation-image" />
          <div class="card-content">
            <h3 class="creation-title">{{ creation.title }}</h3>
            <p class="creation-blurb">{{ creation.blurb }}</p>
          </div>
        </NuxtLink>
        </TransitionGroup>
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

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0 auto 2rem;
  padding: 1rem;
  background-color: var(--primary-color-darker);
  border-radius: 0.5rem;
  justify-content: center;
  max-width: 32rem;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-color);
}

.filter-checkbox input[type="checkbox"] {
  cursor: pointer;
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--secondary-color);
}

.filter-checkbox:hover span {
  color: var(--primary-color-lightest);
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.status-message {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.status-message.error {
  color: var(--secondary-color);
}

.creations-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
}

@media (max-width: 1100px) {
  .creations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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
  width: 100%;
  max-width: 20rem;
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

/* Card list transition animations */
.card-list-enter-active {
  transition: opacity 0.3s ease-out;
}

.card-list-leave-active {
  transition: opacity 0.2s ease-in;
}

.card-list-enter-from {
  opacity: 0;
}

.card-list-leave-to {
  opacity: 0;
}
</style>
