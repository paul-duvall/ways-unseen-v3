// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/image"],
	devtools: { enabled: true },
	css: ['@picocss/pico', '~/assets/variables.css', '~/assets/base.css'],
	compatibilityDate: "2025-07-15",
	eslint: {
		config: {
			stylistic: {
				semi: false,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
})
