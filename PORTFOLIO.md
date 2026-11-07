# Portfolio site (GitHub Pages)

This repository hosts the Next.js static portfolio at
https://akruel1.github.io/Akruel1/

The root `README.md` is the GitHub **profile** README. Site build details live here so deploy docs stay out of the profile surface.

## Deploy

Single Actions workflow: `.github/workflows/deploy-pages.yml`  
(Settings → Pages → Source: **GitHub Actions**). Builds with `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/Akruel1`.

```bash
npm install
npm run dev
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/Akruel1 npm run build
```

Art direction: Experimental Digital Editorial — ivory / cobalt / red / black / acid.  
Public campaigns: **ARAX** + **Orbox**.
