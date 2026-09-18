# NEXURA LABS

Conversion-focused websites for Malaysian local businesses, supported by a reusable demo-first sales system.

## Project structure

```text
NEXURA_LABS/
|-- apps/
|   |-- nexura-website/               # Main Nexura Labs website
|   `-- maymori-demo/                 # Independent client concept
|-- packages/
|   `-- shared-components/            # Reusable, client-neutral resources
|-- docs/
|   `-- clients/maymori/              # Client-specific working documentation
|-- operations/
|   |-- lead-tracker-template.csv     # Lightweight sales pipeline
|   `-- outreach-scripts.md           # Honest outreach and follow-ups
|-- AGENTS.md                         # Shared workspace instructions
|-- index.html                        # Root compatibility redirect
|-- demo/maymorii/index.html          # Legacy demo-route redirect
|-- robots.txt
|-- sitemap.xml
|-- .github/workflows/deploy.yml      # GitHub Pages deployment
`-- package.json
```

The main agency site and client demo keep separate styles, scripts, content, and assets. Shared resources must remain client-neutral. The root redirect files preserve previously published links while source ownership stays under `apps/`.

## Current offer

- Starter: RM899
- Business: RM1499 (recommended)
- Business+: from RM2499
- Website Care: RM79/month
- Annual Website Care: RM399/year

Normal payment terms are 50% before production and 50% before launch. Complex projects may use written milestone payments.

## Run locally

```bash
npm run serve
```

- Root redirect: `http://localhost:8088/`
- Agency: `http://localhost:8088/apps/nexura-website/`
- Maymori concept: `http://localhost:8088/apps/maymori-demo/`
- Legacy Maymorii route: `http://localhost:8088/demo/maymorii/`

Check JavaScript syntax with:

```bash
npm run check:js
```

## Deployment

The workflow in `.github/workflows/deploy.yml` checks the source and assembles a public-only artifact whenever `main` is updated. It publishes the two apps, redirect routes, and required SEO files without exposing internal docs, operations files, or repository instructions. The root redirect keeps the existing repository URL usable without duplicating app source files.

When the repository or domain changes, update the canonical URL in `apps/nexura-website/index.html`, plus the URLs in `robots.txt` and `sitemap.xml`.

## Important launch checklist

1. Add Afiq's real agency WhatsApp number or email destination. The form currently builds and copies a project brief without sending it anywhere.
2. Confirm pricing and scope before every quotation.
3. Connect the final branded domain, canonical URL, and social preview image.
4. Replace remote concept imagery with licensed or client-approved assets before production launch.
5. Test every contact, booking, payment, analytics, and form integration on the production domain.

## Demo policy

- Label every speculative concept as independent and unofficial.
- Never route agency leads to a client's contact details.
- Do not invent results, testimonials, ratings, awards, or client relationships.
- Move a signed client's production site to their own approved domain and infrastructure.
