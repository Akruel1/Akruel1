/**
 * Centralized profile facts. Only verified or brief-approved fields.
 */
export const profile = {
  name: "Andrey Tessa",
  nameFirst: "Andrey",
  nameLast: "Tessa",
  /** Russian brand rendering — АНДРЕЙ ТЕССА */
  nameRu: "Андрей Тесса",
  nameFirstRu: "Андрей",
  nameLastRu: "Тесса",
  mark: "AT",
  githubHandle: "Akruel1",
  titles: {
    primary: "AI Systems Engineer",
  },
  portrait: "/images/andrey-tessa.jpg",
  contact: {
    email: {
      value: "tecca5864@gmail.com",
      href: "mailto:tecca5864@gmail.com",
      verified: true,
    },
    telegram: {
      value: "@Akruel1",
      href: "https://t.me/Akruel1",
      verified: true,
    },
    github: {
      value: "Akruel1",
      href: "https://github.com/Akruel1",
      verified: true,
    },
    linkedin: {
      value: "LinkedIn",
      href: "https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B4%D1%80%D0%B5%D0%B9-%D1%82%D0%B5%D1%81%D1%81%D0%B0-65993738b/",
      verified: true,
    },
  },
  projects: {
    arax: {
      slug: "arax",
      status: "concept" as const,
      org: "Taorlox",
    },
    orbox: {
      slug: "orbox",
      status: "applied-work" as const,
      org: null,
    },
  },
} as const;

export type Locale = "en" | "ru";

export function displayName(locale: Locale) {
  return locale === "ru" ? profile.nameRu : profile.name;
}

export function displayNameParts(locale: Locale) {
  return locale === "ru"
    ? { first: profile.nameFirstRu, last: profile.nameLastRu }
    : { first: profile.nameFirst, last: profile.nameLast };
}
