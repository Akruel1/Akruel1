import type { Dictionary } from "./en";
import { profile } from "./profile";

export const ru: Dictionary = {
  meta: {
    title: `${profile.name} — ${profile.titles.primary}`,
    description:
      "AI Systems Engineer. Строю интеллектуальные системы, которые превращают сложность в ценность. ARAX и Orbox.",
    ogTitle: `${profile.name} — AI Systems Engineer`,
    ogDescription: "Портфолио: liquid glass, ARAX, Orbox.",
  },
  nav: {
    work: "Работы",
    about: "О себе",
    contact: "Контакт",
    home: "Главная",
    menu: "Меню",
  },
  locale: { en: "EN", ru: "RU", label: "Язык" },
  entrance: { skip: "Войти" },
  hero: {
    title: profile.titles.primary,
    name: profile.name,
    intro:
      "Строю интеллектуальные системы, которые превращают сложные задачи в масштабируемые решения.",
    cta: "Смотреть работы",
    scroll: "СКРОЛЛ",
    pager: [
      { n: "01", label: "ARAX" },
      { n: "02", label: "Orbox" },
      { n: "03", label: "О себе" },
    ],
  },
  work: {
    eyebrow: "МОИ РАБОТЫ",
    headline: "Избранные проекты",
    lead: "Реальные системы. Ясная архитектура. Прикладной AI там, где он окупается.",
    viewCase: "Смотреть кейс",
    items: {
      arax: {
        index: "01",
        name: "ARAX",
        tagline: "Корпоративная AI knowledge-платформа",
        summary:
          "Концепт платформы корпоративного знания — ingest, embed, retrieve и ответы через контролируемые поверхности. Как инфраструктура, а не обёртка над чат-ботом.",
      },
      orbox: {
        index: "02",
        name: "Orbox",
        tagline: "AI внутри операционных workflow",
        summary:
          "Прикладные AI-решения и автоматизация процессов — модели в реальных процессах, где границы, retry и человеческие контрольные точки first-class.",
      },
    },
  },
  approach: {
    eyebrow: "О СЕБЕ",
    headline: "Разум за системами",
    lead:
      "Проектирую и собираю AI-backend'ы, где retrieval, API, хранение и процессы — одна архитектура.",
    link: "Мой подход",
    pillars: [
      {
        title: "Системное мышление",
        body: "Начинать с потока данных и владения — не с демо модели.",
      },
      {
        title: "Практичный AI",
        body: "Интеллект только там, где снижает реальную операционную работу.",
      },
      {
        title: "Чистая архитектура",
        body: "Ясные контракты, режимы отказа и формы деплоя.",
      },
    ],
  },
  about: {
    eyebrow: "О СЕБЕ",
    headline: `Я ${profile.name}.`,
    titleLine: profile.titles.primary,
    body: [
      "Собираю AI-системы, которые остаются понятными по мере роста — ясные пути данных, осознанные интеграции, рабочие границы.",
      "Работа охватывает backend-engineering, архитектуру AI-систем и technical leadership в рамках Taorlox и прикладных продуктов.",
    ],
    approachTitle: "Мой подход",
    approach: [
      "Системное мышление",
      "Прагматичная инженерия",
      "Непрерывное обучение",
      "Фокус на реальной ценности",
    ],
  },
  capabilities: {
    eyebrow: "ТЕХНОЛОГИИ",
    headline: "Стек и инструменты",
    lead: "Современные технологии для масштабируемых AI-систем.",
    groups: [
      {
        title: "Frontend",
        items: ["Next.js", "React", "TypeScript", "CSS Modules"],
      },
      {
        title: "Backend",
        items: ["Node.js", "Python", "C# / .NET", "API"],
      },
      {
        title: "AI / ML",
        items: ["RAG", "Эмбеддинги", "Qdrant", "Интеграция LLM"],
      },
      {
        title: "Данные",
        items: ["PostgreSQL", "Векторный поиск", "Docker"],
      },
      {
        title: "Инфраструктура",
        items: ["Linux / VPS", "Docker", "Git"],
      },
      {
        title: "Практика",
        items: ["System design", "Интеграции", "Автоматизация"],
      },
    ],
  },
  process: {
    eyebrow: "МОЙ ПОДХОД",
    headline: "От идеи до продакшена",
    steps: [
      { n: "01", title: "Понять", body: "Цели, ограничения, источники, операторы." },
      { n: "02", title: "Спроектировать", body: "Поток, хранение, retrieval, интерфейсы." },
      { n: "03", title: "Реализовать", body: "API, индексы, каркас деплоя." },
      { n: "04", title: "Итерировать", body: "Наблюдать, укреплять, передавать чисто." },
    ],
  },
  contact: {
    eyebrow: "СВЯЗАТЬСЯ",
    headline: "Давайте соберём что-то умное.",
    cta: "Написать",
    channels: "Каналы",
  },
  footer: {
    rights: profile.name,
    title: profile.titles.primary,
  },
  caseArax: {
    back: "Работы",
    eyebrow: "КЕЙС",
    title: "ARAX",
    subtitle: "Корпоративная AI knowledge-платформа",
    intro:
      "ARAX — концепт платформы корпоративного знания в рамках Taorlox: документы и операционный контекст в retrieval-ready системе, затем контролируемые поверхности поиска и ответов. Архитектура и намерение — без публичных метрик.",
    tags: ["AI", "RAG", "Vector Search", "Access Control"],
    bigPicture: "БОЛЬШАЯ КАРТИНА",
    bigPictureLead: "От разрозненного знания к единому intelligence-слою.",
    implementedNote:
      "Концептуальная архитектура. Публичные сроки и заявления о производительности не публикуются.",
    architecture: {
      title: "Архитектура",
      caption: "Сфокусируйте узел",
      nodes: [
        { id: "sources", label: "Источники", detail: "Документы, БД, API, Web" },
        { id: "ingest", label: "Ingestion", detail: "Нормализация и чанки" },
        { id: "embed", label: "Эмбеддинги", detail: "Векторные формы" },
        { id: "qdrant", label: "Vector store", detail: "Индекс Qdrant" },
        { id: "llm", label: "LLM", detail: "Интеграция модели" },
        { id: "ctx", label: "Контекст", detail: "Оркестрация" },
        { id: "apps", label: "Приложения", detail: "Чат · Поиск · Custom" },
      ],
      edges: [
        ["sources", "ingest"],
        ["ingest", "embed"],
        ["embed", "qdrant"],
        ["qdrant", "ctx"],
        ["llm", "ctx"],
        ["ctx", "apps"],
      ],
    },
  },
  caseOrbox: {
    back: "Работы",
    eyebrow: "КЕЙС",
    title: "Orbox",
    subtitle: "AI внутри операционных workflow",
    intro:
      "Orbox — прикладные AI-решения и автоматизация процессов. Описание архитектурное; конфиденциальные детали клиентов не раскрываются.",
    tags: ["Автоматизация", "Интеграции", "Прикладной AI"],
    sections: [
      {
        title: "Пространство задачи",
        body: "Операциям нужна автоматизация на краях: интеграции падают, входы плывут, умные шаги деградируют безопасно.",
      },
      {
        title: "Позиция дизайна",
        body: "Явные workflow с AI-шагами важнее непрозрачных агентов.",
      },
      {
        title: "Границы",
        body: "Без выдуманных сроков, объёмов и имён клиентов.",
      },
    ],
    architecture: {
      title: "Архитектура",
      caption: "Сфокусируйте узел",
      nodes: [
        { id: "trigger", label: "Триггеры", detail: "События и расписания" },
        { id: "orch", label: "Оркестрация", detail: "Управление workflow" },
        { id: "api", label: "Интеграции", detail: "Внешние API" },
        { id: "ai", label: "AI-шаги", detail: "Классификация / извлечение" },
        { id: "store", label: "Персистентность", detail: "Состояние и аудит" },
        { id: "ops", label: "Ops", detail: "Просмотр и вмешательство" },
      ],
      edges: [
        ["trigger", "orch"],
        ["orch", "api"],
        ["orch", "ai"],
        ["ai", "store"],
        ["api", "store"],
        ["store", "ops"],
        ["ops", "orch"],
      ],
    },
  },
  notFound: {
    title: "Не найдено",
    body: "Этого маршрута нет в статическом экспорте.",
    home: "На главную",
  },
};
