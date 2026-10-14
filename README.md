# Ways Unseen

Ways Unseen is a Nuxt 4 portfolio for hand-drawn fantasy maps, tabletop creations, and commissioned illustration work. The site uses Vue, TypeScript, and static JSON catalogs for its creation and commission content.

## Requirements

- Node.js (use a current LTS release)
- npm

## Getting started

Install the dependencies:

```bash
npm install
```

Start the local development server at `http://localhost:3000`:

```bash
npm run dev
```

Nuxt prepares the generated project files after install through the `postinstall` script. If those files need to be regenerated manually, run:

```bash
npm run postinstall
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Nuxt development server. |
| `npm run build` | Build the production Nuxt application. |
| `npm run preview` | Preview the production build locally (run `npm run build` first). |
| `npm run generate` | Generate a static site. |
| `npm run lint` | Run ESLint across the project. |
| `npm run lint:fix` | Apply ESLint fixes where possible. |

The normal production build uses Nuxt's Node server output. Use `npm run generate` when deploying as a static site, and check that all routes and forms behave correctly on the chosen host.

## Project structure

- `app/pages/` — Nuxt file-based routes.
- `app/components/` — shared Vue components, including navigation, consent, and image modal UI.
- `app/assets/` — global styles and color variables.
- `app/data/creations.json` — creation catalog, imported directly by the creations list and detail pages so content is server-rendered.
- `app/data/commissions.json` — past commission catalog, imported directly by its page.
- `public/images/` — public image assets. Files here are served from `/images/...`.
- `public/__forms.html` — Netlify Forms discovery markup for the contact and UK orders forms.

### Updating the catalogs

Edit the JSON files under `app/data/`. Keep each record's `id` aligned with its image assets:

- Creations use `public/images/creations/<id>/` for thumbnails and detail images. Existing fields include `title`, `blurb`, `intro_text`, optional `second_para`, `category`, `has_physical`, and the external store links.
- Past commissions use `public/images/commissions/<id>.jpg`. Records include `title`, `blurb`, and optional `link` and `cara_link` fields.

The creation `category` values drive the list filters (`games`, `maps`, and `resources`). Optional links should be omitted or left empty when they are not available.

## Contact and UK orders forms

The Contact and UK Orders pages submit URL-encoded form data to `/__forms.html`. The hidden forms in `public/__forms.html` declare the form names and fields with `data-netlify="true"`; Netlify scans this file during deployment to register the forms.

These forms therefore depend on **Netlify Forms being enabled for the deployed site**. When deploying to Netlify, ensure form detection is active and verify both form names (`contact` and `uk-orders`) appear in the site's Forms area. Test submissions in the deployed environment as well as locally: local development without Netlify's form handling will not deliver enquiries. If hosting elsewhere, replace the Netlify discovery markup and submission endpoint with that host's form handling service.

When changing form fields, update both the visible form in `app/pages/Contact.vue` or `app/pages/uk-orders.vue` and its matching hidden form in `public/__forms.html`. The field names must match so submitted values are recorded under the expected fields.

## Deployment

For a Node server deployment, build with:

```bash
npm run build
```

Nuxt writes the production output to `.output/`; deploy it using the instructions for the selected Nuxt-compatible host. For a static deployment, generate with:

```bash
npm run generate
```

The static output is written to `.output/public`. Forms require a host integration such as Netlify Forms; a generated static site alone does not provide a form submission backend.
