<script setup lang="ts">
defineProps<{
	text: string
	label?: string
}>()

const isOpen = ref(false)
const popoverId = `info-popover-${Math.random().toString(36).slice(2, 10)}`

const openPopover = () => {
	isOpen.value = true
}

const closePopover = () => {
	isOpen.value = false
}

const togglePopover = () => {
	isOpen.value = !isOpen.value
}
</script>

<template>
	<span
		class="info-popover"
		@mouseenter="openPopover"
		@mouseleave="closePopover"
		@focusin="openPopover"
		@focusout="closePopover"
	>
		<button
			type="button"
			class="info-popover__trigger"
			:aria-label="label || 'More information'"
			:aria-expanded="isOpen"
			:aria-describedby="isOpen ? popoverId : undefined"
			@click="togglePopover"
		>
			<i aria-hidden="true">i</i>
		</button>
		<span
			v-if="isOpen"
			:id="popoverId"
			class="info-popover__bubble"
			role="tooltip"
		>
			{{ text }}
		</span>
	</span>
</template>

<style scoped>
.info-popover {
	display: inline-flex;
	position: relative;
	align-items: center;
	margin-left: 0.35rem;
	vertical-align: middle;
}

.info-popover__trigger {
	align-items: center;
	background: transparent;
	border: 1px solid var(--secondary-color);
	border-radius: 999px;
	color: var(--secondary-color);
	cursor: pointer;
	display: inline-flex;
	font: inherit;
	font-weight: 700;
	height: 1rem;
	justify-content: center;
	line-height: 1;
	padding: 0;
	width: 1rem;
}

.info-popover__trigger:hover,
.info-popover__trigger:focus-visible {
	background: rgba(230, 137, 42, 0.14);
	outline: none;
}

.info-popover__trigger i {
	font-style: normal;
	font-size: 0.65rem;
	line-height: 1;
	transform: translateY(-0.02rem);
}

.info-popover__bubble {
	position: absolute;
	left: 50%;
	top: calc(100% + 0.5rem);
	transform: translateX(-50%);
	z-index: 10;
	min-width: 12rem;
	max-width: 18rem;
	padding: 0.65rem 0.75rem;
	border-radius: 0.5rem;
	background: var(--primary-color-darkest);
	border: 1px solid var(--primary-color-lighter);
	color: var(--primary-color-lightest);
	box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.35);
	font-size: 0.95rem;
	line-height: 1.35;
	white-space: normal;
}

.info-popover__bubble::before {
	content: "";
	position: absolute;
	left: 50%;
	top: -0.35rem;
	width: 0.65rem;
	height: 0.65rem;
	transform: translateX(-50%) rotate(45deg);
	background: var(--primary-color-darkest);
	border-left: 1px solid var(--primary-color-lighter);
	border-top: 1px solid var(--primary-color-lighter);
}
</style>
