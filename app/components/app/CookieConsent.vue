<script setup lang="ts">
const consent = useCookie<"accepted" | "declined" | undefined>("cookie-consent", {
	sameSite: "lax",
	maxAge: 60 * 60 * 24 * 365,
})

const showBanner = computed(() => !consent.value)

const GA_ID = "G-Y954BMSL4W"

function loadAnalytics() {
	const script = document.createElement("script")
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
	script.async = true
	document.head.appendChild(script)
	window.dataLayer = window.dataLayer || []
	window.gtag = function (...args: unknown[]) { window.dataLayer.push(args) }
	window.gtag("js", new Date())
	window.gtag("config", GA_ID)
}

function acceptTracking() {
	loadAnalytics()
	consent.value = "accepted"
}

function declineTracking() {
	consent.value = "declined"
}
</script>

<template>
	<div v-if="showBanner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
		<div class="cookie-banner__content">
			<p class="cookie-banner__text">
				Analytics cookies are used to understand site usage and improve your experience.
			</p>
			<div class="cookie-banner__actions">
				<button class="cookie-banner__button cookie-banner__button--secondary" type="button" @click="declineTracking">
					Decline
				</button>
				<button class="cookie-banner__button cookie-banner__button--primary" type="button" @click="acceptTracking">
					Accept
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.cookie-banner {
	position: fixed;
	left: 1rem;
	right: 1rem;
	bottom: 1rem;
	z-index: 2000;
	background: var(--primary-color-darkest);
	border: 1px solid var(--primary-color-light);
	border-radius: 0.75rem;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.cookie-banner__content {
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: space-between;
	padding: 0.9rem 1rem;
}

.cookie-banner__text {
	margin: 0;
	color: #fff;
	font-size: 0.95rem;
	line-height: 1.35;
}

.cookie-banner__actions {
	display: flex;
	gap: 0.5rem;
	flex-shrink: 0;
}

.cookie-banner__button {
	border: none;
	padding: 0.5rem 0.8rem;
	border-radius: 0.5rem;
	font-weight: 600;
	cursor: pointer;
}

.cookie-banner__button--primary {
	background: var(--secondary-color);
	color: #fff;
}

.cookie-banner__button--primary:hover {
	background: var(--secondary-color-dark);
}

.cookie-banner__button--secondary {
	background: var(--primary-color-lightest);
	color: var(--primary-color-darkest);
}

@media (max-width: 720px) {
	.cookie-banner__content {
		flex-direction: column;
		align-items: flex-start;
	}

	.cookie-banner__actions {
		width: 100%;
	}

	.cookie-banner__button {
		flex: 1;
	}
}
</style>
