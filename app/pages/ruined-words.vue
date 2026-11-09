<script setup lang="ts">
definePageMeta({
	layout: "standalone",
})

useSeoMeta({
	title: "Ruined Words — Issue 1",
	description: "Ruined Words, a new series of zines from writer Alex Minns. Issue 1 features speculative stories based on Norfolk sites.",
})

const galleryImages = [
	{ src: "/images/ruined-words/image-1.jpg", alt: "Ruined Words, Issue 1" },
	{ src: "/images/ruined-words/image-2.jpg", alt: "Ruined Words, Issue 1 detail" },
	{ src: "/images/ruined-words/image-3.jpg", alt: "Map of locations featured in Ruined Words" },
	{ src: "/images/ruined-words/image-4.jpg", alt: "Ruined Words, Issue 1" },
]

const activeImage = ref(0)
const formStatus = ref("")
const isSubmitting = ref(false)

const handleSubmit = async (event: Event) => {
	const form = event.target as HTMLFormElement
	const formData = new FormData(form)
	isSubmitting.value = true
	formStatus.value = ""

	try {
		const response = await fetch("/__forms.html", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams([...formData.entries()] as [string, string][]).toString(),
		})

		if (response.ok) {
			formStatus.value = "success"
			form.reset()
		}
		else {
			formStatus.value = "error"
		}
	}
	catch {
		formStatus.value = "error"
	}
	finally {
		isSubmitting.value = false
	}
}
</script>

<template>
	<div class="ruined-words-page">
		<div class="page-container">
		<header class="page-heading">
			<h1>Ruined Words</h1>
			<p class="subtitle">Issue 1 / Great Melton, Letheringsett Tunnel Bungay, St. Mary's Church - East Somerton</p>
		</header>

		<section class="feature" aria-label="Ruined Words, Issue 1 gallery">
			<div class="gallery">
				<Transition name="image-fade" mode="out-in">
					<img
						:key="galleryImages[activeImage].src"
						class="main-image"
						:src="galleryImages[activeImage].src"
						:alt="galleryImages[activeImage].alt"
					>
				</Transition>
				<div class="thumbnails" aria-label="Choose an image">
					<button
						v-for="(image, index) in galleryImages"
						:key="image.src"
						type="button"
						class="thumbnail-button"
						:class="{ selected: activeImage === index }"
						:aria-label="`Show image ${index + 1}`"
						:aria-pressed="activeImage === index"
						@click="activeImage = index"
					>
						<img :src="image.src" :alt="image.alt">
					</button>
				</div>
			</div>
		</section>

		<div class="blurb">
			<p>
				Ruined Words is a new series of zines from writer Alex Minns. This first issue contains four speculative stories based on Norfolk sites including the Witch’s Leg of East Somerton. Some existing folklore plays a part and some is brand new.
			</p>
			<p>
				Also included is a new map, showing key locations from around Norfolk featured in the zine from Ways Unseen.
			</p>
		</div>

		<hr>

		<section class="order-section">
			<p>
				If you're in the UK and would like to order a copy, complete the following form. We'll let you know the total cost, including postage, via email.
			</p>
			<form name="ruined-words" @submit.prevent="handleSubmit">
				<input type="hidden" name="form-name" value="ruined-words">
				<div class="field">
					<label for="ruined-words-email">Email</label>
					<input id="ruined-words-email" name="email" type="email" autocomplete="email" required>
				</div>
				<div class="field">
					<label for="ruined-words-comments">Additional Order Notes</label>
					<textarea id="ruined-words-comments" name="comments" rows="5" />
				</div>
				<div class="submit-row">
					<button type="submit" :disabled="isSubmitting">
						{{ isSubmitting ? "Sending…" : "Submit" }}
					</button>
				</div>
				<p v-if="formStatus === 'success'" class="form-message" role="status">
					Thank you! Your order enquiry has been sent successfully.
				</p>
				<p v-else-if="formStatus === 'error'" class="form-message error" role="alert">
					Sorry, there was an error sending your enquiry. Please try again or email ways.unseen@gmail.com directly.
				</p>
			</form>
		</section>
		</div>
	</div>
</template>

<style scoped>
.ruined-words-page {
	--ruined-bg: #877d83;
	--ruined-text: #e6e1e3;
	min-height: 100vh;
	padding: clamp(1.25rem, 4vw, 4rem) clamp(1rem, 5vw, 5rem);
	background: var(--ruined-bg) !important;
	color: var(--ruined-text);
}

.page-container {
	width: min(100%, 50rem);
	margin-inline: auto;
	background: var(--ruined-bg) !important;
}

.page-heading {
	text-align: left;
	width: min(100%, 68rem);
	margin: 0 auto 1.5rem;
}

.page-heading h1 {
	margin: 0;
	color: #655b61;
	font-size: clamp(2.5rem, 7vw, 5rem);
	line-height: 1.1;
}

.subtitle {
	margin: 0.4rem 0 0;
	font-size: clamp(1rem, 2.2vw, 1.35rem);
}

.feature,
.blurb,
.order-section {
	width: min(100%, 68rem);
	margin: 0 auto;
}

.feature {
	display: block;
}

.gallery {
	display: grid;
	grid-template-columns: minmax(0, 48rem) clamp(5rem, 13vw, 9rem);
	align-items: stretch;
	gap: 0.75rem;
	min-width: 0;
	width: fit-content;
	max-width: 100%;
}

.main-image {
	display: block;
	width: 100%;
	max-height: 38rem;
	object-fit: contain;
	background: rgba(35, 31, 34, 0.16);
}

.image-fade-enter-active,
.image-fade-leave-active {
	transition: opacity 220ms ease;
}

.image-fade-enter-from,
.image-fade-leave-to {
	opacity: 0;
}

.thumbnails {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(4, minmax(0, 1fr));
	gap: 0.5rem;
	min-height: 0;
}

.thumbnail-button {
	width: 100%;
	height: 100%;
	min-height: 0;
	overflow: hidden;
	padding: 0;
	border: 2px solid transparent;
	background: transparent;
	cursor: pointer;
}

.thumbnail-button.selected,
.thumbnail-button:focus-visible {
	border-color: var(--ruined-text);
	outline: none;
}

.thumbnail-button img {
	display: block;
	width: 100%;
	height: 100%;
	min-height: 0;
	object-fit: cover;
	transition: filter 180ms ease;
}

.thumbnail-button:hover img,
.thumbnail-button:focus-visible img {
	filter: brightness(0.82);
}

.blurb p,
.order-section > p {
	font-size: clamp(1rem, 1.6vw, 1.15rem);
	line-height: 1.6;
}

.blurb {
	margin-top: 1.5rem;
}

hr {
	width: min(100%, 68rem);
	margin: clamp(1rem, 3vw, 2rem) auto;
	border: 0;
	border-top: 1px solid rgba(230, 225, 227, 0.75);
}

.order-section > p {
	margin: 0 auto 1.5rem;
}

.order-section form {
	max-width: 48rem;
	margin-inline: auto;
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
	margin-bottom: 1rem;
}

.field input,
.field textarea {
	width: 100%;
	padding: 0.75rem;
	border: 1px solid rgba(230, 225, 227, 0.7);
	border-radius: 0.2rem;
	background: rgba(50, 44, 48, 0.2);
	color: #fff;
}

.field input:focus,
.field textarea:focus {
	outline: 2px solid var(--ruined-text);
	outline-offset: 2px;
}

.submit-row {
	display: flex;
	justify-content: flex-end;
}

.submit-row button {
	padding: 0.65rem 1.5rem;
	border: 1px solid var(--ruined-text);
	border-radius: 0.2rem;
	background: var(--ruined-text);
	color: #51494e;
	cursor: pointer;
	transition: filter 180ms ease;
}

.submit-row button:hover:not(:disabled) {
	filter: brightness(0.9);
}

.submit-row button:disabled {
	cursor: wait;
	opacity: 0.7;
}

.form-message {
	margin-top: 1rem;
}

.error {
	color: #fff0ef;
}

@media (max-width: 760px) {
	.gallery {
		grid-template-columns: minmax(0, 1fr) 4.5rem;
		gap: 0.5rem;
	}

	.thumbnails {
		gap: 0.35rem;
	}
}
</style>
