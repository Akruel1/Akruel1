import { profile } from "./profile";

export const en = {
  meta: {
    title: `${profile.name} — ${profile.titles.primary}`,
    description:
      "AI Systems Engineer focused on RAG, enterprise knowledge platforms, backend architecture, and reliable infrastructure.",
    ogTitle: `${profile.name} — AI Systems Engineer`,
    ogDescription:
      "Portfolio: systems architecture, RAG platforms, and applied AI engineering.",
  },
  nav: {
    work: "Work",
    approach: "Approach",
    capabilities: "Capabilities",
    about: "About",
    contact: "Contact",
    home: "Home",
  },
  locale: {
    en: "EN",
    ru: "RU",
    label: "Language",
  },
  hero: {
    name: profile.name,
    title: profile.titles.primary,
    also: profile.titles.also.join(" · "),
    headline: "Complex systems. Clear thinking.",
    intro:
      "I design and build AI-powered systems where retrieval, APIs, storage, and process work as one — not as bolted-on features.",
    ctaWork: "Selected work",
    ctaContact: "Get in touch",
    scroll: "Scroll",
  },
  philosophy: {
    eyebrow: "Engineering philosophy",
    headline: "Systems, not features",
    lead:
      "Useful AI work is infrastructure work. Models matter — but only when data flow, retrieval, APIs, storage, and process are designed together.",
    points: [
      {
        title: "Data flow first",
        body: "I start from how information moves: sources, transforms, indexing, and what must stay consistent under change.",
      },
      {
        title: "Models + retrieval + APIs",
        body: "Embeddings, vector search, and application interfaces are one surface — not three separate experiments.",
      },
      {
        title: "Practical complexity",
        body: "I keep architecture honest: enough structure for reliability, no ceremony that hides weak interfaces.",
      },
    ],
  },
  work: {
    eyebrow: "Selected work",
    headline: "Case studies",
    lead:
      "Two threads of applied systems work — an enterprise knowledge platform concept, and AI solutions for operational workflows.",
    readCase: "Read case study",
    statusConcept: "Concept / architecture",
    statusApplied: "Applied solutions",
    items: {
      arax: {
        name: "ARAX",
        org: "Under Taorlox",
        tagline: "Enterprise AI knowledge platform",
        summary:
          "A concept architecture for enterprise knowledge: ingestion, embeddings, vector retrieval, and controlled answer surfaces — designed as a coherent platform rather than a chatbot wrapper.",
        focus: ["RAG", "Knowledge systems", "Platform architecture"],
      },
      swissremit: {
        name: "SwissRemit / Orbox",
        org: "AI solutions & automation",
        tagline: "Workflow automation with AI",
        summary:
          "Applied AI solutions and workflow automation — integrating models into operational processes where reliability and clear system boundaries matter more than demos.",
        focus: ["Workflow automation", "Integrations", "Applied AI"],
      },
    },
  },
  capabilities: {
    eyebrow: "Capabilities",
    headline: "Technical range",
    lead: "Grouped by domain — not skill meters.",
    groups: [
      {
        title: "AI Systems",
        items: [
          "RAG pipelines",
          "Embeddings & vector search",
          "Enterprise knowledge surfaces",
          "Prompted workflows with guardrails",
        ],
      },
      {
        title: "Backend",
        items: [
          "API design",
          "C# / .NET-oriented services",
          "Python services",
          "TypeScript / Node.js",
        ],
      },
      {
        title: "Data & Infrastructure",
        items: [
          "PostgreSQL",
          "Qdrant",
          "Docker",
          "Linux / VPS operations",
        ],
      },
      {
        title: "System Design",
        items: [
          "Integrations across services",
          "Workflow automation",
          "Reliable deployment shapes",
          "Clear ownership of failure modes",
        ],
      },
    ],
  },
  process: {
    eyebrow: "How I work",
    headline: "A connected sequence",
    lead: "Five steps — each feeds the next.",
    steps: [
      {
        title: "Frame the system",
        body: "Clarify goals, constraints, data sources, and what “done” means for operators — not only for demos.",
      },
      {
        title: "Map the flow",
        body: "Sketch ingestion, storage, retrieval, and interfaces before choosing model flourishes.",
      },
      {
        title: "Build the spine",
        body: "APIs, persistence, indexing, and deployment paths that can carry real traffic.",
      },
      {
        title: "Wire intelligence",
        body: "Add embeddings, retrieval, and automation where they reduce work — with explicit failure handling.",
      },
      {
        title: "Harden & hand off",
        body: "Observe, tighten boundaries, document ownership, and leave the system operable without heroics.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    headline: "Builder of systems in motion",
    body: [
      `I'm ${profile.name} — ${profile.titles.primary}, with work spanning backend engineering, AI systems architecture, and technical leadership.`,
      "I care about systems that stay understandable as they grow: clear data paths, deliberate integrations, and AI that sits inside real infrastructure.",
      "This site covers selected architecture and applied work. Dates, metrics, and client-confidential detail are omitted where they are not public.",
    ],
    portraitLabel: "Portrait placeholder",
    portraitHint: "Photo slot reserved",
  },
  contact: {
    eyebrow: "Contact",
    headline: "Start a conversation",
    lead: "For systems work, architecture discussions, or collaboration — reach out through a verified channel.",
    placeholderNote: "Placeholder — not verified",
    channels: "Channels",
  },
  footer: {
    rights: `${profile.name}`,
    built: "Static portfolio · GitHub Pages",
  },
  caseArax: {
    back: "All work",
    status: "Concept / architecture under Taorlox",
    title: "ARAX",
    subtitle: "Enterprise AI knowledge platform",
    intro:
      "ARAX is a platform concept for enterprise knowledge: bringing documents and operational context into a retrieval-ready system, then exposing controlled answer and search surfaces. It is documented here as architecture and intent — not as a shipped public product with published metrics.",
    sections: [
      {
        title: "Problem space",
        body: "Enterprises accumulate knowledge across files, tools, and tribal memory. A useful AI layer must respect source diversity, access boundaries, and the difference between “search” and “assert.”",
      },
      {
        title: "Design stance",
        body: "Treat knowledge as a system: ingest → normalize → embed → index → retrieve → respond. The model is one component; the platform is the product.",
      },
      {
        title: "Implemented vs planned",
        body: "This case study describes the conceptual architecture and intended capabilities. Public implementation details, timelines, and performance claims are not published here.",
      },
    ],
    architecture: {
      title: "Architecture outline",
      caption: "Logical flow — keyboard-focusable nodes",
      nodes: [
        { id: "sources", label: "Sources", detail: "Docs, APIs, internal stores" },
        { id: "ingest", label: "Ingestion", detail: "Normalize & chunk" },
        { id: "embed", label: "Embeddings", detail: "Vector representations" },
        { id: "qdrant", label: "Qdrant", detail: "Vector index" },
        { id: "pg", label: "PostgreSQL", detail: "Metadata & state" },
        { id: "api", label: "API layer", detail: "Auth & contracts" },
        { id: "rag", label: "RAG surface", detail: "Retrieve + generate" },
        { id: "ui", label: "Knowledge UI", detail: "Search & answers" },
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
    stackNote: "Representative stack alignment with platform focus: Python/TypeScript services, PostgreSQL, Qdrant, Docker, Linux/VPS.",
  },
  caseSwiss: {
    back: "All work",
    status: "Applied AI solutions & workflow automation",
    title: "SwissRemit / Orbox",
    subtitle: "AI inside operational workflows",
    intro:
      "SwissRemit / Orbox covers applied AI solutions and workflow automation — connecting models and process logic to real operational paths. Details stay at the architectural and capability level; confidential client specifics are not disclosed.",
    sections: [
      {
        title: "Problem space",
        body: "Operational teams need automation that survives edge cases: integrations fail, inputs vary, and “smart” steps must degrade safely.",
      },
      {
        title: "Design stance",
        body: "Prefer explicit workflows with AI-assisted steps over opaque agents. Make handoffs, retries, and human checkpoints first-class.",
      },
      {
        title: "Implemented vs planned",
        body: "Described as applied solutions work in AI and automation. No invented timelines, volume metrics, or client names appear on this page.",
      },
    ],
    architecture: {
      title: "Architecture outline",
      caption: "Logical flow — keyboard-focusable nodes",
      nodes: [
        { id: "trigger", label: "Triggers", detail: "Events & schedules" },
        { id: "orchestrate", label: "Orchestration", detail: "Workflow control" },
        { id: "integrate", label: "Integrations", detail: "External APIs" },
        { id: "ai", label: "AI steps", detail: "Classify / extract / draft" },
        { id: "store", label: "Persistence", detail: "State & audit" },
        { id: "ops", label: "Ops surface", detail: "Review & intervene" },
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
    stackNote: "Typical delivery surface: APIs, backend services (C# / Python / TypeScript), PostgreSQL, Docker, and Linux/VPS deployment.",
  },
  notFound: {
    title: "Page not found",
    body: "This route is not part of the portfolio export.",
    home: "Back home",
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
