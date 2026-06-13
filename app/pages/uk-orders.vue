<script setup lang="ts">
import InfoPopover from "~/components/app/InfoPopover.vue"

useHead({ title: "UK Orders" })

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
			console.error("Form submission failed:", response.status, response.statusText)
		}
	}
	catch (error) {
		formStatus.value = "error"
		console.error("Form submission error:", error)
	}
	finally {
		isSubmitting.value = false
	}
}
</script>

<template>
	<div class="container">
		<main class="uk-orders">
			<section class="section-container">
				<h1 class="uk-orders-title">
					UK Orders
				</h1>
				<p>
					If you're in the UK and are interested in ordering some physical products from me,
					complete the following form. I'll let you know the total cost, including postage,
					via email.
				</p>
				<p>
					Thanks for your interest and, if you have any questions, you can fill them in in
					the relevant field!
				</p>
				<form
					name="uk-orders"
					@submit.prevent="handleSubmit"
				>
					<input
						type="hidden"
						name="form-name"
						value="uk-orders"
					>
					<div class="uk-orders-field">
						<label for="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							required
						>
					</div>
					<fieldset class="uk-orders-fieldset">
						<legend>Products</legend>
						<div class="checkbox-group">
							<label>
								<input
									type="checkbox"
									name="d12-locations"
									value="yes"
								>
								D12 Locations zine - £10
							</label>
							<label>
								<input
									type="checkbox"
									name="d12-locations-2"
									value="yes"
								>
								D12 Locations II zine - £10
							</label>
							<label>
								<input
									type="checkbox"
									name="mini-cave"
									value="yes"
								>
								Mini Cave zine - £6
								<InfoPopover text="This zine contains maps and tables from the Subterranean Map Pack." />
							</label>
							<label>
								<input
									type="checkbox"
									name="dungeon-tiles-1"
									value="yes"
								>
								Dungeon Tiles Set 1 - £6
								<InfoPopover text="The Dungeon Tile Set is split into two physical packs, each containing 13 cards." />
							</label>
							<label>
								<input
									type="checkbox"
									name="dungeon-tiles-2"
									value="yes"
								>
								Dungeon Tiles Set 2 - £6
							</label>
							<label>
								<input
									type="checkbox"
									name="forest-tiles-1"
									value="yes"
								>
								Forest Tiles Set 1 - £6
								<InfoPopover text="The Forest Tile Set is split into two physical packs, each containing 13 cards." />
							</label>
							<label>
								<input
									type="checkbox"
									name="forest-tiles-2"
									value="yes"
								>
								Forest Tiles Set 2 - £6
							</label>
							<label>
								<input
									type="checkbox"
									name="four-adventure-bookmarks"
									value="yes"
								>
								Four Adventure Bookmarks - £5
							</label>
						</div>
					</fieldset>
					<div class="uk-orders-field">
						<label for="comments">Comments / Questions</label>
						<textarea
							id="comments"
							name="comments"
							rows="5"
						/>
					</div>
					<div class="button-container">
						<button
							type="submit"
							:disabled="isSubmitting"
						>
							<span v-if="!isSubmitting">Submit</span>
							<span
								v-else
								class="loading-content"
							>
								<span class="spinner" />
								Sending...
							</span>
						</button>
					</div>
					<div
						v-if="formStatus === 'success'"
						class="form-message success"
					>
						Thank you! Your order enquiry has been sent successfully.
					</div>
					<div
						v-if="formStatus === 'error'"
						class="form-message error"
					>
						Sorry, there was an error sending your enquiry. Please try again or email <a href="mailto:ways.unseen@gmail.com">ways.unseen@gmail.com</a> directly.
					</div>
				</form>
			</section>
		</main>
	</div>
</template>

<style scoped>
.container {
padding: 2rem;
}

@media (max-width: 768px) {
.container {
padding: 1rem;
}
}

.uk-orders-title {
text-align: center;
color: var(--secondary-color);
}

.uk-orders p {
max-width: 45rem;
margin: 1rem auto;
}

.uk-orders form {
margin: 1rem auto;
max-width: 45rem;
}

.uk-orders-field {
display: flex;
flex-direction: column;
}

.uk-orders-field label {
margin-bottom: 0.15rem;
}

.uk-orders input[type="email"],
.uk-orders textarea {
background-color: var(--primary-color-darker);
border: none;
border-radius: 0.2rem;
color: var(--primary-color-lightest);
padding: 0.5rem;
margin-bottom: 1rem;
margin-top: 0;
}

.uk-orders-fieldset {
border: 1px solid var(--primary-color-lighter);
border-radius: 0.2rem;
margin-bottom: 1rem;
padding: 0.75rem 1rem;
}

.uk-orders-fieldset legend {
padding: 0 0.4rem;
}

.checkbox-group {
display: flex;
flex-direction: column;
gap: 0.6rem;
margin-top: 0.25rem;
}

.checkbox-group label {
display: flex;
align-items: center;
gap: 0.5rem;
cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
accent-color: var(--secondary-color);
width: 1rem;
height: 1rem;
flex-shrink: 0;
}

.uk-orders button {
background-color: var(--secondary-color);
border: 0;
border-radius: 0.2rem;
color: var(--primary-color-lightest);
cursor: pointer;
padding: 0.5rem 1.2rem;
width: auto;
min-width: 120px;
}

.uk-orders button:hover:not(:disabled) {
background-color: var(--secondary-color-dark);
}

.uk-orders button:disabled {
opacity: 0.7;
cursor: not-allowed;
}

.loading-content {
display: flex;
align-items: center;
gap: 0.5rem;
}

.spinner {
width: 14px;
height: 14px;
border: 2px solid var(--primary-color-lightest);
border-top-color: transparent;
border-radius: 50%;
animation: spin 0.9s linear infinite;
}

@keyframes spin {
to {
transform: rotate(360deg);
}
}

.form-message {
background-color: var(--primary-color);
border: 1px solid var(--primary-color-lighter);
border-radius: 0.5rem;
margin-top: 1rem;
max-width: 45rem;
padding: 1rem;
text-align: center;
}

.form-message.success {
background-color: rgba(34, 197, 94, 0.15);
border-color: rgba(34, 197, 94, 0.4);
color: rgb(34, 197, 94);
}

.form-message.error {
background-color: rgba(239, 68, 68, 0.15);
border-color: rgba(239, 68, 68, 0.4);
color: rgb(239, 68, 68);
}

.button-container {
display: flex;
justify-content: flex-end;
}
</style>
