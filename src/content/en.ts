import { profile } from "./profile";

export const en = {
  meta: {
    title: `${profile.name} — ${profile.titles.primary}`,
    description:
      "AI Systems Engineer. Liquid intelligence — from matter to structure. ARAX: enterprise AI knowledge platform concept.",
    ogTitle: `${profile.name} — AI Systems Engineer`,
    ogDescription: "Portfolio: liquid intelligence, systems architecture, ARAX.",
  },
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    home: "Home",
  },
  locale: {
    en: "EN",
    ru: "RU",
    label: "Language",
  },
  entrance: {
    skip: "Enter",
  },
  hero: {
    name: profile.name,
    nameFirst: profile.nameFirst,
    nameLast: profile.nameLast,
    title: profile.titles.primary,
    headlineLines: ["MATTER", "BECOMES", "STRUCTURE."],
    intro:
      "I design AI-powered systems where retrieval, APIs, storage, and process harden into one operable architecture.",
    ctaWork: "Enter ARAX",
    ctaContact: "Contact",
    scrollHint: "Scroll — liquid hardens",
  },
  approach: {
    eyebrow: "Philosophy",
    headline: "From fluid to form",
    lead:
      "Intelligence is useless as vapor. I treat AI as material that must set into structure — data flow, retrieval, interfaces, and process sharing one geometry.",
    beats: [
      {
        title: "Follow the flow",
        body: "Start with how information moves — sources, transforms, indexes — before choosing model flourishes.",
      },
      {
        title: "Set the material",
        body: "Embeddings, vector search, and APIs are one surface. No bolted-on demos.",
      },
      {
        title: "Leave it operable",
        body: "Enough architecture for reliability. Clear failure modes. No ceremony that hides weak seams.",
      },
    ],
  },
  work: {
    eyebrow: "Featured work",
    headline: "ARAX",
    status: "Concept / architecture · Taorlox",
    tagline: "Enterprise AI knowledge platform",
    summary:
      "A platform concept for enterprise knowledge: ingest, embed, retrieve, and answer through controlled surfaces — designed as infrastructure, not a chatbot wrapper.",
    explore: "Open case study",
    transition:
      "The liquid hardens into a system. Below — the architecture of ARAX.",
  },
  capabilities: {
    eyebrow: "Capabilities",
    headline: "Technical range",
    groups: [
      {
        title: "AI Systems",
        items: [
          "RAG pipelines",
          "Embeddings & vector search",
          "Enterprise knowledge surfaces",
          "Guarded model workflows",
        ],
      },
      {
        title: "Backend",
        items: [
          "API design",
          "C# / .NET services",
          "Python services",
          "TypeScript / Node.js",
        ],
      },
      {
        title: "Data & Infra",
        items: ["PostgreSQL", "Qdrant", "Docker", "Linux / VPS"],
      },
      {
        title: "System Design",
        items: [
          "Service integrations",
          "Workflow automation",
          "Deployable shapes",
          "Owned failure modes",
        ],
      },
    ],
  },
  about: {
    eyebrow: "About",
    headline: "Andrey Tessa",
    body: [
      `${profile.titles.primary} — building systems that stay understandable as they grow.`,
      "Work spans backend engineering, AI systems architecture, and technical leadership. AI belongs inside real infrastructure.",
      "This site covers selected architecture. Confidential client detail and unverified metrics are omitted.",
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline: "Open a channel",
    lead: "For systems work, architecture, or collaboration.",
    channels: "Channels",
  },
  footer: {
    rights: profile.name,
    built: "Static · GitHub Pages",
  },
  caseArax: {
    back: "Home",
    status: "Concept / architecture · Taorlox",
    title: "ARAX",
    subtitle: "Enterprise AI knowledge platform",
    intro:
      "ARAX is a platform concept for enterprise knowledge — documents and operational context into a retrieval-ready system, then controlled search and answer surfaces. Architecture and intent — not a shipped public product with published metrics.",
    chapters: [
      {
        id: "sources",
        title: "Knowledge sources",
        body: "Files, APIs, and internal stores enter as first-class inputs. Source diversity is assumed; access boundaries are not optional.",
      },
      {
        id: "ingest",
        title: "Ingestion & processing",
        body: "Normalize, chunk, and prepare content for embedding while preserving provenance for later audit.",
      },
      {
        id: "embed",
        title: "Embeddings & retrieval",
        body: "Vector representations feed an index. Retrieval is a designed path — not an afterthought around a model call.",
      },
      {
        id: "vector",
        title: "Vector search",
        body: "Qdrant-aligned indexing for similarity search, paired with relational metadata for state and filters.",
      },
      {
        id: "model",
        title: "Model integration",
        body: "Generation sits behind contracts: context assembly, guardrails, and explicit degradation when retrieval is thin.",
      },
      {
        id: "context",
        title: "Context assembly",
        body: "Retrieved fragments become structured context. The system distinguishes search from assertion.",
      },
      {
        id: "access",
        title: "Access & tenancy",
        body: "Tenant isolation and access control are architectural seams — planned as platform concerns, not UI toggles.",
      },
      {
        id: "audit",
        title: "Traceability",
        body: "Auditing and trace hooks belong in the spine so answers can be explained against sources.",
      },
    ],
    implementedNote:
      "Conceptual architecture and intended capabilities. Public implementation timelines and performance claims are not published here.",
    architecture: {
      title: "Architecture",
      caption: "Progressive reveal — focus a node",
      nodes: [
        { id: "sources", label: "Sources", detail: "Docs, APIs, stores" },
        { id: "ingest", label: "Ingestion", detail: "Normalize & chunk" },
        { id: "embed", label: "Embeddings", detail: "Vector forms" },
        { id: "qdrant", label: "Qdrant", detail: "Vector index" },
        { id: "pg", label: "PostgreSQL", detail: "Metadata & state" },
        { id: "api", label: "API", detail: "Auth & contracts" },
        { id: "rag", label: "RAG", detail: "Retrieve + generate" },
        { id: "ui", label: "Surface", detail: "Search & answers" },
      ],
      edges: [
        ["sources", "ingest"],
        ["ingest", "embed"],
        ["embed", "qdrant"],
        ["ingest", "pg"],
        ["qdrant", "rag"],
        ["pg", "api"],
        ["api", "rag"],
        ["rag", "ui"],
      ] as [string, string][],
    },
  },
  notFound: {
    title: "Not found",
    body: "This route is not in the static export.",
    home: "Home",
  },
};

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (infer U)[]
      ? DeepStringify<U>[]
      : T[K] extends object
        ? DeepStringify<T[K]>
        : T[K];
};

export type Dictionary = DeepStringify<typeof en>;
