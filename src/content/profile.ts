/**
 * Centralized profile facts. Only verified or brief-approved fields.
 */
export const profile = {
  name: "Andrey Tessa",
  githubHandle: "Akruel1",
  titles: {
    primary: "AI Systems Engineer",
    also: [
      "Backend Engineer",
      "AI Systems Architect",
      "Technical Lead & Co-Founder",
    ] as const,
  },
  focus: [
    "AI-powered systems",
    "RAG",
    "enterprise knowledge",
    "backend architecture",
    "integrations",
    "workflow automation",
    "vector search",
    "reliable infrastructure",
  ] as const,
  stack: [
    "C#",
    "Python",
    "TypeScript / JavaScript / Node.js",
    "PostgreSQL",
    "Qdrant",
    "Docker",
    "Linux / VPS",
    "AI / embeddings",
    "APIs",
  ] as const,
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
      publicRepo: null,
    },
    orbox: {
      slug: "orbox",
      status: "applied-work" as const,
      org: null,
      publicRepo: null,
    },
  },
} as const;

export type Locale = "en" | "ru";
