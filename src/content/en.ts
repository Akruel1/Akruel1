import { profile } from "./profile";

export const en = {
  meta: {
    title: `${profile.name} — ${profile.titles.primary}`,
    description:
      "AI Systems Engineer. Building intelligent systems that turn complexity into real value. ARAX & Orbox.",
    ogTitle: `${profile.name} — AI Systems Engineer`,
    ogDescription: "Portfolio: liquid glass systems, ARAX, Orbox.",
  },
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    home: "Home",
    menu: "Menu",
  },
  locale: { en: "EN", ru: "RU", label: "Language" },
  entrance: { skip: "Enter" },
  hero: {
    title: profile.titles.primary,
    name: profile.name,
    intro:
      "Building intelligent systems that turn complex problems into scalable solutions.",
    cta: "Explore my work",
    scroll: "SCROLL",
    pager: [
      { n: "01", label: "ARAX" },
      { n: "02", label: "Orbox" },
      { n: "03", label: "About" },
    ],
  },
  work: {
    eyebrow: "MY WORK",
    headline: "Selected Projects",
    lead: "Real systems. Clear architecture. Applied AI where it earns its place.",
    viewCase: "View case study",
    items: {
      arax: {
        index: "01",
        name: "ARAX",
        tagline: "Enterprise AI Knowledge Platform",
        summary:
          "A platform concept for enterprise knowledge — ingest, embed, retrieve, and answer through controlled surfaces. Designed as infrastructure, not a chatbot wrapper.",
      },
      orbox: {
        index: "02",
        name: "Orbox",
        tagline: "AI inside operational workflows",
        summary:
          "Applied AI solutions and workflow automation — models wired into real processes where boundaries, retries, and human checkpoints are first-class.",
      },
    },
  },
  approach: {
    eyebrow: "ABOUT",
    headline: "The mind behind the systems",
    lead:
      "I design and build AI-powered backends where retrieval, APIs, storage, and process work as one architecture.",
    link: "My approach",
    pillars: [
      {
        title: "Systems thinking",
        body: "Start from data flow and ownership — not from model demos.",
      },
      {
        title: "Practical AI",
        body: "Intelligence only where it reduces real operational work.",
      },
      {
        title: "Clean architecture",
        body: "Clear contracts, failure modes, and deployable shapes.",
      },
    ],
  },
  about: {
    eyebrow: "ABOUT",
    headline: `I'm ${profile.name}.`,
    titleLine: profile.titles.primary,
    body: [
      "I build AI systems that stay understandable as they grow — clear data paths, deliberate integrations, operable boundaries.",
      "Work spans backend engineering, AI systems architecture, and technical leadership under Taorlox and applied product work.",
    ],
    approachTitle: "My approach",
    approach: [
      "System thinking",
      "Pragmatic engineering",
      "Continuous learning",
      "Focus on real value",
    ],
  },
  capabilities: {
    eyebrow: "TECH STACK",
    headline: "Technologies & Tools",
    lead: "Modern technologies for scalable AI systems.",
    groups: [
      {
        title: "Frontend",
        items: ["Next.js", "React", "TypeScript", "CSS Modules"],
      },
      {
        title: "Backend",
        items: ["Node.js", "Python", "C# / .NET", "APIs"],
      },
      {
        title: "AI / ML",
        items: ["RAG", "Embeddings", "Qdrant", "LLM integration"],
      },
      {
        title: "Data",
        items: ["PostgreSQL", "Vector search", "Docker"],
      },
      {
        title: "Infra",
        items: ["Linux / VPS", "Docker", "Git"],
      },
      {
        title: "Practice",
        items: ["System design", "Integrations", "Automation"],
      },
    ],
  },
  process: {
    eyebrow: "MY APPROACH",
    headline: "From ideas to production",
    steps: [
      { n: "01", title: "Understand", body: "Goals, constraints, sources, operators." },
      { n: "02", title: "Design", body: "Flow, storage, retrieval, interfaces." },
      { n: "03", title: "Implement", body: "APIs, indexes, deployable spine." },
      { n: "04", title: "Iterate", body: "Observe, harden, hand off cleanly." },
    ],
  },
  contact: {
    eyebrow: "GET IN TOUCH",
    headline: "Let's build something intelligent.",
    cta: "Get in touch",
    channels: "Channels",
  },
  footer: {
    rights: profile.name,
    title: profile.titles.primary,
  },
  caseArax: {
    back: "Work",
    eyebrow: "CASE STUDY",
    title: "ARAX",
    subtitle: "Enterprise AI knowledge platform",
    intro:
      "ARAX is a platform concept for enterprise knowledge under Taorlox — documents and operational context into a retrieval-ready system, then controlled search and answer surfaces. Architecture and intent — not a shipped public product with published metrics.",
    tags: ["AI", "RAG", "Vector Search", "Access Control"],
    bigPicture: "THE BIG PICTURE",
    bigPictureLead: "From scattered knowledge to a unified intelligence layer.",
    implementedNote:
      "Conceptual architecture and intended capabilities. Public timelines and performance claims are not published here.",
    architecture: {
      title: "Architecture",
      caption: "Focus a node to inspect the flow",
      nodes: [
        { id: "sources", label: "Sources", detail: "Docs, DBs, APIs, Web" },
        { id: "ingest", label: "Ingestion", detail: "Normalize & chunk" },
        { id: "embed", label: "Embeddings", detail: "Vector forms" },
        { id: "qdrant", label: "Vector store", detail: "Qdrant index" },
        { id: "llm", label: "LLM", detail: "Model integration" },
        { id: "ctx", label: "Context", detail: "Orchestration" },
        { id: "apps", label: "Apps", detail: "Chat · Search · Custom" },
      ],
      edges: [
        ["sources", "ingest"],
        ["ingest", "embed"],
        ["embed", "qdrant"],
        ["qdrant", "ctx"],
        ["llm", "ctx"],
        ["ctx", "apps"],
      ] as [string, string][],
    },
  },
  caseOrbox: {
    back: "Work",
    eyebrow: "CASE STUDY",
    title: "Orbox",
    subtitle: "AI inside operational workflows",
    intro:
      "Orbox covers applied AI solutions and workflow automation — models and process logic on operational paths. Architectural description only; confidential client specifics are not disclosed.",
    tags: ["Automation", "Integrations", "Applied AI"],
    sections: [
      {
        title: "Problem space",
        body: "Operations need automation that survives edges: integrations fail, inputs vary, intelligent steps must degrade safely.",
      },
      {
        title: "Design stance",
        body: "Explicit workflows with AI-assisted steps over opaque agents. Handoffs, retries, and human checkpoints are first-class.",
      },
      {
        title: "Scope note",
        body: "No invented timelines, volume metrics, or client names.",
      },
    ],
    architecture: {
      title: "Architecture",
      caption: "Focus a node",
      nodes: [
        { id: "trigger", label: "Triggers", detail: "Events & schedules" },
        { id: "orch", label: "Orchestration", detail: "Workflow control" },
        { id: "api", label: "Integrations", detail: "External APIs" },
        { id: "ai", label: "AI steps", detail: "Classify / extract / draft" },
        { id: "store", label: "Persistence", detail: "State & audit" },
        { id: "ops", label: "Ops", detail: "Review & intervene" },
      ],
      edges: [
        ["trigger", "orch"],
        ["orch", "api"],
        ["orch", "ai"],
        ["ai", "store"],
        ["api", "store"],
        ["store", "ops"],
        ["ops", "orch"],
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
