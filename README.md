# Andrey Tessa — Portfolio

Experimental digital editorial portfolio for GitHub Pages.

- Projects: **ARAX** + **Orbox** as campaign spreads
- Stack: Next.js App Router, CSS Modules, EN/RU, static export
- Art direction: fashion-campaign editorial (ivory / cobalt / red / black / acid)
- URL: https://akruel1.github.io/Akruel1/

## GitHub Pages

Deploy is a single Actions workflow: `.github/workflows/deploy-pages.yml`  
(Settings → Pages → Source: **GitHub Actions**). Builds with `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/Akruel1`.

```bash
npm install
npm run dev
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/Akruel1 npm run build
```
