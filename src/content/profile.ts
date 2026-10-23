/**
 * Centralized profile facts. Only verified or brief-approved fields.
 * Unverified contact/social entries are marked placeholder: true.
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
      href: "#",
      verified: false,
      placeholder: true,
    },
  },
  projects: {
    arax: {
      slug: "arax",
      status: "concept" as const,
      org: "Taorlox",
      publicRepo: null,
    },
    swissremitOrbox: {
      slug: "swissremit-orbox",
      status: "applied-work" as const,
      org: null,
      publicRepo: null,
    },
  },
} as const;

export type Locale = "en" | "ru";
