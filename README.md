# Andrey Tessa — Portfolio

Liquid-glass interactive portfolio for **Andrey Tessa** (AI Systems Engineer).  
Next.js App Router · React Three Fiber · static export for **GitHub Pages**.

- Repo: [Akruel1/Akruel1](https://github.com/Akruel1/Akruel1)
- Pages URL: [https://akruel1.github.io/Akruel1/](https://akruel1.github.io/Akruel1/)

## Stack

- Next.js `output: 'export'` → `out/`
- TypeScript, Framer Motion, Three.js / R3F (custom liquid shader)
- EN default + complete RU (client dictionaries)
- Featured work: **ARAX**, **Orbox** (Swiss Remit removed)

## Local

```bash
npm install
npm run dev
```

## Production build (project Pages path)

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/Akruel1 npm run build
```

Preview:

```bash
rm -rf /tmp/at-pages && mkdir -p /tmp/at-pages/Akruel1 && cp -r out/. /tmp/at-pages/Akruel1/
npx --yes serve /tmp/at-pages -l 4173
# http://localhost:4173/Akruel1/
```

## Deploy

1. Merge to `main` (or run **Deploy Portfolio to GitHub Pages**).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Site: `https://akruel1.github.io/Akruel1/`

Prefer `.github/workflows/deploy-pages.yml` for this export. Disable conflicting Pages workflows if more than one is enabled.
