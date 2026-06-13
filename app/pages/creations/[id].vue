<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue"

interface Creation {
	id: string
	title: string
	blurb: string
	intro_text: string
	second_para?: string
	has_physical: boolean
	itch_link: string
	drivethru_link: string
	rpg_trader_link?: string
}

const route = useRoute()
const creationId = route.params.id as string

const creation = ref<Creation | null>(null)
const isLoading = ref(true)
const notFound = ref(false)
const showImageModal = ref(false)
const currentModalImageSrc = ref("")
const currentModalImageTitle = ref("")
let previousActiveElement: HTMLElement | null = null

function openImageModal(imageSrc: string, title: string) {
	previousActiveElement = typeof document !== "undefined" ? document.activeElement as HTMLElement | null : null
	currentModalImageSrc.value = imageSrc
	currentModalImageTitle.value = title
	showImageModal.value = true
}

function closeImageModal() {
	showImageModal.value = false
	nextTick(() => {
		if (previousActiveElement && typeof previousActiveElement.focus === "function") {
			previousActiveElement.focus()
		}
	})
}

onMounted(async () => {
	try {
		const response = await fetch("/data/creations.json")
		if (!response.ok) {
			throw new Error("Failed to load creations")
		}
		const creations: Creation[] = await response.json()
		const found = creations.find(c => c.id === creationId)

		if (found) {
			creation.value = found
		}
		else {
			notFound.value = true
		}
	}
	catch (err) {
		console.error("Error loading creation:", err)
		notFound.value = true
	}
	finally {
		isLoading.value = false
	}
})

onUnmounted(() => {
	previousActiveElement = null
	showImageModal.value = false
})
</script>

<template>
	<div class="container">
		<section>
			<AppLoadingSpinner v-if="isLoading" />

			<div
				v-else-if="notFound"
				class="not-found"
			>
				<h2>Creation Not Found</h2>
				<p>Sorry, we couldn't find the creation you're looking for.</p>
				<NuxtLink
					to="/creations"
					class="back-link"
				>
					← Back to Creations
				</NuxtLink>
			</div>

			<div
				v-else-if="creation"
				class="creation-detail"
			>
				<div class="detail-content">
					<div class="title-header">
						<h2>{{ creation.title }}</h2>
						<NuxtLink
							to="/creations"
							class="back-button"
						>
							← Back to Creations
						</NuxtLink>
					</div>

					<div class="images-container">
						<button
							type="button"
							class="image-trigger"
							:aria-label="`Open ${creation.title} image 1`"
							@click="openImageModal(`/images/creations/${creation.id}/image-1.jpg`, `${creation.title} - Image 1`)"
						>
							<img
								:src="`/images/creations/${creation.id}/image-1.jpg`"
								:alt="`${creation.title} - Image 1`"
								class="detail-image"
							>
						</button>
						<button
							type="button"
							class="image-trigger"
							:aria-label="`Open ${creation.title} image 2`"
							@click="openImageModal(`/images/creations/${creation.id}/image-2.jpg`, `${creation.title} - Image 2`)"
						>
							<img
								:src="`/images/creations/${creation.id}/image-2.jpg`"
								:alt="`${creation.title} - Image 2`"
								class="detail-image"
							>
						</button>
					</div>

					<div class="intro-card">
						<p class="intro-text">
							{{ creation.intro_text }}
						</p>
						<p class="button-label">
							Grab a digital copy of this creation...
						</p>
						<div class="button-container">
							<a
								:href="creation.itch_link"
								target="_blank"
								rel="noopener noreferrer"
								class="creation-btn"
							>
								Itch.io
							</a>
							<a
								v-if="creation.drivethru_link !== null"
								:href="creation.drivethru_link"
								target="_blank"
								rel="noopener noreferrer"
								class="creation-btn"
							>
								DriveThruRPG
							</a>
							<a
								v-if="creation.rpg_trader_link"
								:href="creation.rpg_trader_link"
								target="_blank"
								rel="noopener noreferrer"
								class="creation-btn"
							>
								RPG Trader
							</a>
						</div>
					</div>

					<p
						v-if="creation.has_physical"
						style="border: 2px dashed white; padding: 10px; max-width: 30rem; margin: 0 auto 1rem; text-align: center;"
					>
						<strong>Physical copies available within the UK. <NuxtLink :to="{ path: '/uk-orders', query: { creationId: creation.id } }">Click here</NuxtLink> or email ways.unseen@gmail.com to find out more!</strong>
					</p>
					<p
						v-if="creation.second_para"
						class="second-para"
					>
						{{ creation.second_para }}
					</p>

					<Transition
						name="image-modal"
						appear
					>
						<AppImageModal
							v-if="showImageModal"
							:image-src="currentModalImageSrc"
							:title="currentModalImageTitle"
							@close="closeImageModal"
						/>
					</Transition>
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

@media (max-width: 768px) {
  .title-header {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 1rem;
  }
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

@media (max-width: 768px) {
  .detail-content h2 {
    display: block;
    width: 100%;
  }
}

.back-button {
  display: inline-block;
  background-color: transparent;
  color: var(--primary-color-light);
  border: 2px solid var(--primary-color-light);
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 0.3rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.9rem;
}

.back-button:hover,
.back-button:focus {
  background-color: var(--primary-color-light);
  color: white;
}

.images-container {
  display: flex;
  gap: 1rem;
	margin-top: 0;
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

.image-trigger {
	background: transparent;
	border: 0;
	padding: 0;
	cursor: pointer;
	display: block;
	width: calc(50% - 0.5rem);
	border-radius: 0.5rem;
	line-height: 0;
	text-align: left;
}

.image-trigger:focus-visible {
	outline: 3px solid var(--secondary-color);
	outline-offset: 4px;
}

@media (max-width: 768px) {
	.image-trigger {
		width: 100%;
	}
}

.detail-image {
	width: 100%;
  height: auto;
  border-radius: 0.5rem;
	display: block;
}

@media (max-width: 768px) {
  .detail-image {
    margin: 0 auto;
  }
}

.intro-card {
  background-color: var(--primary-color-darker);
  border: 2px solid var(--primary-color-light);
  border-radius: 0.5rem;
  padding: 1rem;
	margin-top: 0;
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.second-para {
  margin: 0 auto 1.5rem;
  max-width: 42rem;
  line-height: 1.6;
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
</style>
