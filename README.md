# Andrey Tessa — Portfolio

Personal portfolio for **Andrey Tessa** (AI Systems Engineer).  
Static Next.js App Router site, exported for **GitHub Pages**.

- Repo (from git remote): [Akruel1/Akruel1](https://github.com/Akruel1/Akruel1)
- Expected Pages URL: [https://akruel1.github.io/Akruel1/](https://akruel1.github.io/Akruel1/)

## Stack

- Next.js App Router + React + TypeScript (strict)
- CSS Modules + global design tokens
- Framer Motion (purposeful motion; respects `prefers-reduced-motion`)
- `output: 'export'` → static `out/`
- EN default + complete RU (client locale switcher, static-export safe)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Local dev uses an empty `basePath` so routes work at `/`.

## Production build (GitHub Pages project path)

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/Akruel1 npm run build
```

Artifacts land in `out/`. Preview locally with the project base path:

```bash
rm -rf /tmp/at-pages && mkdir -p /tmp/at-pages/Akruel1 && cp -r out/. /tmp/at-pages/Akruel1/
npx --yes serve /tmp/at-pages -l 4173
# open http://localhost:4173/Akruel1/
```

## Deploy (GitHub Pages)

1. Merge to `main` (or run **Deploy Portfolio to GitHub Pages** via `workflow_dispatch`).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds the static export with `basePath` `/Akruel1` and deploys the Pages artifact.
4. Site: `https://akruel1.github.io/Akruel1/`

For a custom root domain later, set `NEXT_PUBLIC_BASE_PATH=` (empty) in the workflow and point DNS as needed.

## Content policy

Profile copy is centralized in `src/content/profile.ts` and locale dictionaries (`en.ts` / `ru.ts`).  
Unverified social links are marked as placeholders. No invented metrics, dates, or confidential client detail.

## Project layout

```
src/app/           # routes (home, case studies, 404)
src/components/    # UI sections + architecture diagrams
src/content/       # profile + EN/RU copy
src/lib/           # site config, i18n
public/            # favicon, robots.txt, sitemap.xml
```
