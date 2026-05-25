<script setup lang="ts">
interface Commission {
  id: string
  title: string
  blurb: string
  link?: string
  cara_link?: string
}

const commissions = ref<Commission[]>([])
const isLoading = ref(true)
const error = ref('')

const hasUrl = (url?: string): boolean => {
  return Boolean(url && url.trim())
}

onMounted(async () => {
  try {
    const response = await fetch('/data/commissions.json')
    if (!response.ok) {
      throw new Error('Failed to load commissions')
    }

    commissions.value = await response.json()
  } catch (err) {
    error.value = 'Unable to load past commissions. Please try again later.'
    console.error('Error loading commissions:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container">
    <section>
      <h2>Past Commissions</h2>
      <p class="intro">
        I've been commissioned to draw maps for all kinds of products, including gamebooks, board games, rpg supplements and adventures. Hover or click the cards below to find out more. You can find out more about
        <NuxtLink to="/commissions">my commission process here</NuxtLink>
        and feel free to
        <NuxtLink to="/contact">contact me</NuxtLink>
        if you'd like to discuss a map you need for your project.
      </p>

      <AppLoadingSpinner v-if="isLoading" />

      <div v-else-if="error" class="status-message error">
        {{ error }}
      </div>

      <div v-else-if="commissions.length === 0" class="status-message">
        No past commissions available yet.
      </div>

      <div v-else class="commissions-grid">
        <article
          v-for="commission in commissions"
          :key="commission.id"
          class="commission-card"
        >
          <img
            :src="`/images/commissions/${commission.id}.jpg`"
            :alt="`${commission.title} commission artwork`"
            class="card-image"
          >

          <div class="card-overlay" aria-hidden="true" />

          <div class="title-strip">
            <h3>{{ commission.title }}</h3>
          </div>

          <div class="hover-content">
            <p class="hover-blurb">{{ commission.blurb }}</p>
            <div class="hover-actions">
              <a
                v-if="hasUrl(commission.link)"
                :href="commission.link"
                target="_blank"
                rel="noopener noreferrer"
                class="action-link"
              >
                View item
              </a>
              <a
                v-if="hasUrl(commission.cara_link)"
                :href="commission.cara_link"
                target="_blank"
                rel="noopener noreferrer"
                class="action-link"
              >
                View illustration
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--primary-color-dark);
  padding: 2rem;
}

section {
  margin: 0 auto;
  max-width: 70rem;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.intro {
  text-align: center;
  margin: 0 auto 2rem;
  max-width: 45rem;
}

.status-message {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.status-message.error {
  color: var(--secondary-color);
}

.commissions-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.commission-card {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0.6rem;
  border: 2px solid transparent;
  background-color: var(--primary-color-darker);
  max-width: 22rem;
  width: 100%;
  margin: 0 auto;
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.45s ease;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.title-strip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem 0.9rem;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(0);
  transition: transform 0.35s ease;
  z-index: 2;
}

.title-strip h3 {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 1.3rem;
  line-height: 1.3;
}

.hover-content {
  position: absolute;
  inset: 0;
  z-index: 3;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.hover-blurb {
  margin: 0;
  line-height: 1.45;
}

.hover-actions {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  justify-content: center;
}

.action-link {
  background-color: var(--secondary-color);
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 0.35rem;
  padding: 0.45rem 0.75rem;
  transition: background-color 0.2s ease;
  pointer-events: auto;
}

.action-link:hover {
  background-color: var(--secondary-color-dark);
}

.action-link:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.commission-card:hover .card-image,
.commission-card:focus-within .card-image {
  transform: scale(1.06);
}

.commission-card:hover .card-overlay,
.commission-card:focus-within .card-overlay {
  opacity: 1;
}

.commission-card:hover .title-strip,
.commission-card:focus-within .title-strip {
  transform: translateY(100%);
}

.commission-card:hover .hover-content,
.commission-card:focus-within .hover-content {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1023px) {
  .commissions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .commissions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .hover-blurb {
    font-size: 0.95rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-image,
  .card-overlay,
  .title-strip,
  .hover-content,
  .action-link {
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
</style>
