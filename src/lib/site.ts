/** Detected from git remote: Akruel1/Akruel1 */
export const SITE = {
  owner: "Akruel1",
  repo: "Akruel1",
  /** Project Pages URL unless a custom domain is configured */
  pagesUrl: "https://akruel1.github.io/Akruel1/",
  githubUrl: "https://github.com/Akruel1/Akruel1",
  profileGithub: "https://github.com/Akruel1",
} as const;

/**
 * Keep in sync with next.config.ts.
 * CI sets NEXT_PUBLIC_BASE_PATH=/Akruel1; local `next dev` leaves it empty.
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === "production"
      ? `/${SITE.repo}`
      : "";

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
