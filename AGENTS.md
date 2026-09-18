# Nexura Labs workspace instructions

## Repository purpose

This repository is the multi-site workspace for Nexura Labs. It keeps the agency's public website, isolated client concepts, reusable client-neutral resources, compatibility routes, and supporting documentation in one deployable project.

## Ownership and boundaries

- `apps/nexura-website/` is the public Nexura Labs agency website. Its brand, offer, lead-generation copy, styles, scripts, and assets belong to Nexura Labs.
- `apps/maymori-demo/` is a separate, speculative Maymori client concept. It is not part of the Nexura website and must retain honest demo disclosures and isolated client branding.
- `packages/shared-components/` is for code or data contracts that are useful to at least two applications and contain no client-specific copy or styling.
- `docs/clients/` contains client-specific working documentation without secrets or unnecessary personal data.
- `index.html` and `demo/maymorii/index.html` are lightweight compatibility redirects; preserve their public routes when reorganizing source files.

Do not edit both applications in one task unless the user explicitly requests changes to both. Apply the nested `AGENTS.md` instructions for whichever application is in scope. Keep app-specific content, configuration, and assets inside the owning app, and do not import Maymori-specific material into the Nexura app or shared packages.

## Deployment controls

- `.github/workflows/deploy.yml` is the GitHub Pages build and deployment definition. It runs checks, assembles the `_site` artifact, and publishes the two applications, compatibility redirects, and public SEO files.
- `package.json` defines the commands used locally and by deployment.
- `index.html`, `demo/maymorii/index.html`, `robots.txt`, `sitemap.xml`, and `.nojekyll` are copied into the deployed artifact by the workflow.
- `apps/nexura-website/index.html` contains the Nexura canonical URL; `robots.txt` and `sitemap.xml` also contain public deployment URLs that must be updated when the repository or domain changes.

## Commands

Run commands from the repository root:

- `npm run check` — run the complete repository check (currently JavaScript syntax checks for both apps).
- `npm run check:js` — run the JavaScript syntax checks directly.
- `npm run serve` — serve the workspace at `http://localhost:8088` using Python.
- `npm start` — serve the workspace at `http://localhost:8088` using the `serve` package.
- `npm run dev` — start the `serve` package with its default local port.

When serving on port 8088, verify the relevant route:

- Nexura: `http://localhost:8088/apps/nexura-website/`
- Maymori: `http://localhost:8088/apps/maymori-demo/`
- Root compatibility redirect: `http://localhost:8088/`
- Legacy Maymori redirect: `http://localhost:8088/demo/maymorii/`

## Required workflow

- Inspect `git status` before editing and preserve all unrelated or pre-existing work.
- Read the relevant files and the in-scope application's nested `AGENTS.md` before making changes.
- Do not move files whose ownership is unclear; leave them in place and report the ambiguity.
- Never commit credentials, private customer details, payment keys, or production secrets.
- Test every change in proportion to its impact. At minimum, run the relevant checks; for layout or routing changes, serve the repository and verify the affected route.
- At handoff, summarize every file changed and report the checks performed and their results.
