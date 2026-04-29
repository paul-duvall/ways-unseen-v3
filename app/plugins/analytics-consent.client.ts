export default defineNuxtPlugin(() => {
	const consent = useCookie<"accepted" | "declined" | undefined>("cookie-consent", {
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 365,
	})

	if (consent.value !== "accepted") {
		return
	}

	const GA_ID = "G-Y954BMSL4W"
	const script = document.createElement("script")
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
	script.async = true
	document.head.appendChild(script)
	window.dataLayer = window.dataLayer || []
	window.gtag = function (...args: unknown[]) { window.dataLayer.push(args) }
	window.gtag("js", new Date())
	window.gtag("config", GA_ID)
})
