# NEXURA LABS

Conversion-focused websites for Malaysian local businesses, supported by a reusable demo-first sales system.

## Project structure

```text
NEXURA_LABS/
|-- index.html                         # Main Nexura Labs website
|-- assets/
|   |-- css/futuristic.css            # Design system and responsive styles
|   |-- js/agency.js                  # Navigation, reveals, form and motion
|   `-- favicon.svg                   # Nexura Labs browser icon
|-- demo/
|   |-- _template/
|   |   `-- business-data.example.json # Reusable client-demo data model
|   `-- maymorii/                     # Independent Maymorii concept
|-- operations/
|   |-- lead-tracker-template.csv     # Lightweight sales pipeline
|   `-- outreach-scripts.md           # Honest outreach and follow-ups
|-- robots.txt
|-- sitemap.xml
|-- .github/workflows/deploy.yml      # GitHub Pages deployment
`-- package.json
```

The main agency site and every demo keep separate styles and scripts. This avoids accidental design conflicts and allows each concept to move into its own production repository later.

## Current offer

- Starter: RM899
- Business: RM1499 (recommended)
- Business+: from RM2499
- Website Care: RM79/month
- Annual Website Care: RM399/year

Normal payment terms are 50% before production and 50% before launch. Complex projects may use written milestone payments.

## Run locally

```bash
python -m http.server 8088
```

- Agency: `http://localhost:8088/`
- Maymorii concept: `http://localhost:8088/demo/maymorii/`

Check JavaScript syntax with:

```bash
npm run check:js
```

## Deployment

The workflow in `.github/workflows/deploy.yml` publishes this static project to GitHub Pages whenever `main` is updated. No build step is required.

When the repository or domain changes, update the canonical URL in `index.html`, plus the URLs in `robots.txt` and `sitemap.xml`.

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
