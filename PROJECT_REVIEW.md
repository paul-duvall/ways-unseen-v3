# Project Review: Ways Unseen

## Recommended improvements

1. **[High] Make cookie consent revocable and consolidate analytics loading.** Visitors can accept tracking, but there is no visible way to later change that choice. Analytics is loaded by both the consent component and a client plugin, which risks initializing it twice on first acceptance. Add a persistent privacy settings control and route analytics initialization through one consent-aware path. See [CookieConsent.vue](app/components/app/CookieConsent.vue) and [analytics-consent.client.ts](app/plugins/analytics-consent.client.ts).

2. **[High] Render portfolio content on the server — COMPLETE.** The creations and past commissions pages fetch their JSON only in `onMounted`, so their main content is missing from the initial server-rendered page. The creation detail page has the same issue. This can make pages less accessible to search engines and slower to display. Completed: the catalog JSON now lives in `app/data` and is imported directly, so the portfolio content is included in server-rendered HTML. See [Creations.vue](app/pages/Creations.vue), [past-commissions.vue](app/pages/past-commissions.vue), and [creations/[id].vue](app/pages/creations/[id].vue).

3. **[High] Improve keyboard and screen-reader navigation.** The mobile menu trigger is a clickable `div` rather than a button, so it lacks built-in keyboard support and menu state announcements. The image modal does not trap focus, and commission card descriptions/actions are revealed on hover or focus-within, which may be hard to discover on touch devices. Use semantic controls, expose state, and ensure those details are available without relying on hover. See [NavBar.vue](app/components/app/NavBar.vue), [ImageModal.vue](app/components/app/ImageModal.vue), and [past-commissions.vue](app/pages/past-commissions.vue).

4. **[Medium] Add page-specific titles and descriptions — COMPLETE.** Added route-specific titles and descriptions across the site, including dynamic creation details, and changed page titles to `<h1>` with section headings below them. See [nuxt.config.ts](nuxt.config.ts) and the pages under [app/pages](app/pages).

5. **[Medium] Optimize image delivery and remove source/backup files from public assets.** The public image directory contains a Krita autosave and a backup file, which appear to be development artifacts. Portfolio images are also served directly without responsive sizing or lazy loading. Remove unintended public files and consider responsive formats/sizes for large images. See [public/images](public/images).

6. **[Medium] Replace the starter README with project-specific documentation.** The current README is Nuxt starter text. Document the site's content data format, local development/build steps, and how the contact and UK order forms are deployed. See [README.md](README.md).

## Review checks

- `npm run lint` completed without reported errors.
- `npm run build` completed successfully; it reported only that Browserslist data is stale.
- The pre-existing deletion of `eslint-config-dump.json` was left untouched.


