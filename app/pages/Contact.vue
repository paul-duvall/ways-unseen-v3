<script setup lang="ts">
const formStatus = ref('')
const isSubmitting = ref(false)

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  
  isSubmitting.value = true
  formStatus.value = ''

  try {
    const response = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    })

    if (response.ok) {
      formStatus.value = 'success'
      form.reset()
    } else {
      formStatus.value = 'error'
      console.error('Form submission failed:', response.status, response.statusText)
    }
  } catch (error) {
    formStatus.value = 'error'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container">
    <main class="contact">
      <section class="section-container">
        <h1 class="contact-title">Contact</h1>
        <p>
          If you want to discuss a project or make an enquiry about a commission,
          fill in the form below and I'll get in contact with your via email.
        </p>
        <p>
          If you would prefer to email directly, you can reach me at
          <a href="mailto:ways.unseen@gmail.com">ways.unseen@gmail.com</a> or, alternatively,
          you can message me on
          <a href="https://bsky.app/profile/ways-unseen.bsky.social" target="_blank">Bluesky</a>
          or
          <a href="https://www.instagram.com/ways.unseen" target="_blank">Instagram</a>.
        </p>
        <form
          name="contact"
          @submit.prevent="handleSubmit"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div class="contact-field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div class="contact-field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div class="contact-field">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <div class="button-container">
            <button type="submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Submit</span>
              <span v-else class="loading-content">
                <span class="spinner"></span>
                Sending...
              </span>
            </button>
          </div>
          <div v-if="formStatus === 'success'" class="form-message success">
            Thank you! Your message has been sent successfully.
          </div>
          <div v-if="formStatus === 'error'" class="form-message error">
            Sorry, there was an error sending your message. Please try again or email directly.
          </div>
        </form>
      </section>
    </main>
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
.contact-title {
  text-align: center;
  color: var(--secondary-color);
}
.contact p {
  max-width: 45rem;
  margin-top: 1rem;
  margin: 1rem auto;
}
.contact form {
  margin: 1rem auto;
  max-width: 45rem;
}
.contact-field {
  display: flex;
  flex-direction: column;
}
.contact-field label {
  margin-bottom: 0.15rem;
}
.contact input,
.contact textarea {
  background-color: var(--primary-color-darker);
  border: none;
  border-radius: 0.2rem;
  color: var(--primary-color-lightest);
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0;
}
.contact button {
  background-color: var(--primary-color-darkest);
  border: 0;
  border-radius: 0.2rem;
  color: var(--primary-color-lightest);
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  width: auto;
  min-width: 120px;
}
.contact button:hover:not(:disabled) {
  background-color: var(--primary-color-darker);
}
.contact button:disabled {
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