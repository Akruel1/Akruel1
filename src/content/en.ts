import { profile } from "./profile";

export const en = {
  meta: {
    title: `${profile.name} — ${profile.titles.primary}`,
    description:
      "AI Systems Engineer focused on RAG, enterprise knowledge platforms, backend architecture, and reliable infrastructure.",
    ogTitle: `${profile.name} — AI Systems Engineer`,
    ogDescription:
      "Portfolio: liquid systems, RAG platforms, and applied AI engineering.",
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
    title: profile.titles.primary,
    headlineLines: ["ENGINEERING", "THE UNSEEN."],
    intro:
      "I shape AI-powered systems where retrieval, APIs, storage, and process form one living architecture.",
    ctaWork: "Explore work",
    ctaContact: "Contact",
  },
  approach: {
    eyebrow: "Approach",
    headline: "Systems with weight",
    lead:
      "Useful AI is infrastructure. Models matter only when data flow, retrieval, interfaces, and process are designed as one material.",
    beats: [
      {
        title: "Trace the flow",
        body: "Start from how information moves — sources, transforms, indexes — and what must stay coherent under change.",
      },
      {
        title: "Bind intelligence to structure",
        body: "Embeddings, vector search, and APIs share one surface. No bolted-on demos.",
      },
      {
        title: "Leave operable systems",
        body: "Enough architecture for reliability. Clear failure modes. No ceremony that hides weak seams.",
      },
    ],
  },
  work: {
    eyebrow: "Selected work",
    headline: "Matter in production form",
    lead: "Two threads — an enterprise knowledge platform concept, and applied AI for operational systems.",
    explore: "Enter case",
    items: {
      arax: {
        name: "ARAX",
        org: "Taorlox",
        status: "Concept / architecture",
        tagline: "Enterprise AI knowledge platform",
        summary:
          "A platform concept for enterprise knowledge: ingest, embed, retrieve, and answer through controlled surfaces — designed as infrastructure, not a chatbot wrapper.",
      },
      orbox: {
        name: "Orbox",
        org: "Applied AI",
        status: "Applied solutions",
        tagline: "AI inside operational workflows",
        summary:
          "Applied AI solutions and workflow automation — models wired into real processes where boundaries, retries, and human checkpoints are first-class.",
      },
    },
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
      "Work spans backend engineering, AI systems architecture, and technical leadership. AI belongs inside real infrastructure: clear data paths, deliberate integrations, operable boundaries.",
      "This site covers selected architecture and applied work. Confidential client detail and unverified metrics are omitted.",
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline: "Open a channel",
    lead: "For systems work, architecture, or collaboration — use a verified link.",
    channels: "Channels",
  },
  footer: {
    rights: profile.name,
    built: "Static · GitHub Pages",
  },
  caseArax: {
    back: "Work",
    status: "Concept / architecture · Taorlox",
    title: "ARAX",
    subtitle: "Enterprise AI knowledge platform",
    intro:
      "ARAX is a platform concept for enterprise knowledge — bringing documents and operational context into a retrieval-ready system, then exposing controlled search and answer surfaces. Documented here as architecture and intent, not as a shipped public product with published metrics.",
    chapters: [
      {
        id: "sources",
        title: "Knowledge sources",
        body: "Files, APIs, and internal stores enter as first-class inputs. Diversity of source is assumed; access boundaries are not optional.",
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
        body: "Tenant isolation and access control are architectural concerns — planned as platform seams, not UI toggles.",
      },
      {
        id: "audit",
        title: "Traceability",
        body: "Auditing and trace hooks belong in the spine so answers can be explained against sources.",
      },
    ],
    implementedNote:
      "This case describes conceptual architecture and intended capabilities. Public implementation timelines and performance claims are not published here.",
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
  caseOrbox: {
    back: "Work",
    status: "Applied AI solutions",
    title: "Orbox",
    subtitle: "AI inside operational workflows",
    intro:
      "Orbox covers applied AI solutions and workflow automation — connecting models and process logic to operational paths. Description stays architectural; confidential client specifics are not disclosed.",
    sections: [
      {
        title: "Problem space",
        body: "Operations need automation that survives edges: integrations fail, inputs vary, and intelligent steps must degrade safely.",
      },
      {
        title: "Design stance",
        body: "Explicit workflows with AI-assisted steps over opaque agents. Handoffs, retries, and human checkpoints are first-class.",
      },
      {
        title: "Scope note",
        body: "Described as applied solutions work. No invented timelines, volume metrics, or client names.",
      },
    ],
    architecture: {
      title: "Architecture",
      caption: "Logical flow — focus a node",
      nodes: [
        { id: "trigger", label: "Triggers", detail: "Events & schedules" },
        { id: "orchestrate", label: "Orchestration", detail: "Workflow control" },
        { id: "integrate", label: "Integrations", detail: "External APIs" },
        { id: "ai", label: "AI steps", detail: "Classify / extract / draft" },
        { id: "store", label: "Persistence", detail: "State & audit" },
        { id: "ops", label: "Ops", detail: "Review & intervene" },
      ],
      edges: [
        ["trigger", "orchestrate"],
        ["orchestrate", "integrate"],
        ["orchestrate", "ai"],
        ["ai", "store"],
        ["integrate", "store"],
        ["store", "ops"],
        ["ops", "orchestrate"],
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
