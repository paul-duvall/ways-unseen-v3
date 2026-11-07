<script setup>
useHead({
	bodyAttrs: {
		class: "ruined-words-standalone",
	},
})
</script>

<template>
	<main class="standalone-layout">
		<slot />
	</main>
</template>

<style>
body.ruined-words-standalone {
	min-height: 100vh;
	background: #877d83 !important;
}

.standalone-layout {
	min-height: 100vh;
	background: #877d83 !important;
}

.standalone-layout > * {
	background-color: #877d83 !important;
}
</style>
