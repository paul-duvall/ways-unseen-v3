<script setup lang="ts">
interface Creation {
  id: string
  title: string
  image_folder: string
  blurb: string
  intro_text: string
  itch_link: string
  drivethru_link: string
  kind_words?: Array<{
    author: string
    text: string
  }>
}

const route = useRoute()
const creationId = route.params.id as string

const creation = ref<Creation | null>(null)
const isLoading = ref(true)
const notFound = ref(false)

onMounted(async () => {
  try {
    const response = await fetch('/data/creations.json')
    if (!response.ok) {
      throw new Error('Failed to load creations')
    }
    const creations: Creation[] = await response.json()
    const found = creations.find(c => c.id === creationId)
    
    if (found) {
      creation.value = found
    } else {
      notFound.value = true
    }
  } catch (err) {
    console.error('Error loading creation:', err)
    notFound.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container">
    <section>
      <AppLoadingSpinner v-if="isLoading" />

      <div v-else-if="notFound" class="not-found">
        <h2>Creation Not Found</h2>
        <p>Sorry, we couldn't find the creation you're looking for.</p>
        <NuxtLink to="/creations" class="back-link">
          ← Back to Creations
        </NuxtLink>
      </div>

      <div v-else-if="creation" class="creation-detail">
        <div class="detail-content">
          <div class="title-header">
            <h2>{{ creation.title }}</h2>
            <NuxtLink to="/creations" class="back-button">
              ← Back to Creations
            </NuxtLink>
          </div>
          
          <div class="intro-card">
            <p class="intro-text">{{ creation.intro_text }}</p>
            <p class="button-label">Grab a digital copy of this creation...</p>
            <div class="button-container">
              <a :href="creation.itch_link" target="_blank" rel="noopener noreferrer" class="creation-btn">
                itch.io
              </a>
              <a 
                v-if="creation.drivethru_link !== 'null'" 
                :href="creation.drivethru_link" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="creation-btn"
              >
                drivethrurpg
              </a>
            </div>
          </div>
          
          <div class="images-container">
            <img :src="`/images/creations/${creation.image_folder}/image-1.jpg`" :alt="`${creation.title} - Image 1`" class="detail-image" />
            <img :src="`/images/creations/${creation.image_folder}/image-2.jpg`" :alt="`${creation.title} - Image 2`" class="detail-image" />
          </div>
          
          <div v-if="creation.kind_words && creation.kind_words.length > 0" class="kind-words-section">
            <h3 class="kind-words-title">Kind Words</h3>
            <div v-for="(kindWord, index) in creation.kind_words" :key="index" class="kind-word">
              <p class="kind-word-text">{{ kindWord.text }}</p>
              <p class="kind-word-author">— {{ kindWord.author }}</p>
            </div>
          </div>
        </div>
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
  margin-bottom: 1.5rem;
}

section {
  margin: 0 auto;
  max-width: 45rem;
}

.not-found {
  text-align: center;
  padding: 2rem 0;
}

.not-found h2 {
  color: var(--secondary-color);
}

.detail-content {
  padding: 0;
}

.title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.detail-content h2 {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--primary-color-lightest);
  border-bottom: 3px solid var(--secondary-color);
  padding-bottom: 0.5rem;
  text-align: left;
  display: inline-block;
}

.back-button {
  display: inline-block;
  background-color: var(--primary-color-light);
  color: white;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 0.3rem;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.9rem;
}

.back-button:hover,
.back-button:focus {
  background-color: var(--primary-color-lighter);
}

.images-container {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .images-container {
    flex-direction: column;
    max-width: 100%;
  }
}

.detail-image {
  width: calc(50% - 0.5rem);
  height: auto;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .detail-image {
    width: 100%;
  }
}

.intro-card {
  background-color: var(--primary-color-darker);
  border: 2px solid var(--primary-color-light);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.button-label {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--primary-color-lightest);
  font-style: italic;
}

.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.creation-btn {
  display: inline-block;
  background-color: var(--secondary-color);
  color: white;
  border: 2px solid var(--secondary-color);
  padding: 0.4rem 1rem;
  border-radius: 0.3rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.creation-btn:hover,
.creation-btn:focus {
  filter: brightness(0.85);
}

.kind-words-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.kind-words-title {
  text-align: center;
  color: var(--primary-color-lightest);
  margin-bottom: 1.5rem;
}

.kind-word {
  margin-bottom: 2rem;
  text-align: center;
}

.kind-word-text {
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.kind-word-author {
  font-size: 0.95rem;
  color: var(--primary-color-lighter);
  margin-top: 0.5rem;
}
</style>
