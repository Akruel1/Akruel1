import type { Dictionary } from "./en";
import { profile } from "./profile";

export const ru: Dictionary = {
  meta: {
    title: `${profile.name} — ${profile.titles.primary}`,
    description:
      "AI Systems Engineer. Жидкий интеллект — от материи к структуре. ARAX: концепт корпоративной AI knowledge-платформы.",
    ogTitle: `${profile.name} — AI Systems Engineer`,
    ogDescription: "Портфолио: liquid intelligence, системная архитектура, ARAX.",
  },
  nav: {
    work: "Работа",
    about: "О себе",
    contact: "Контакт",
    home: "Главная",
  },
  locale: {
    en: "EN",
    ru: "RU",
    label: "Язык",
  },
  entrance: {
    skip: "Войти",
  },
  hero: {
    name: profile.name,
    nameFirst: profile.nameFirst,
    nameLast: profile.nameLast,
    title: profile.titles.primary,
    headlineLines: ["МАТЕРИЯ", "СТАНОВИТСЯ", "СТРУКТУРОЙ."],
    intro:
      "Проектирую AI-системы, где retrieval, API, хранение и процессы затвердевают в одну работоспособную архитектуру.",
    ctaWork: "Войти в ARAX",
    ctaContact: "Контакт",
    scrollHint: "Скролл — жидкость твердеет",
  },
  approach: {
    eyebrow: "Философия",
    headline: "От потока к форме",
    lead:
      "Интеллект бесполезен как пар. Я отношусь к AI как к материалу, который должен застыть в структуру — поток данных, retrieval, интерфейсы и процессы в одной геометрии.",
    beats: [
      {
        title: "Следовать потоку",
        body: "Начать с движения информации — источники, преобразования, индексы — до украшений модели.",
      },
      {
        title: "Задать материал",
        body: "Эмбеддинги, векторный поиск и API — одна поверхность. Без навесных демо.",
      },
      {
        title: "Оставить работоспособным",
        body: "Достаточно архитектуры для надёжности. Ясные отказы. Без церемоний, скрывающих слабые швы.",
      },
    ],
  },
  work: {
    eyebrow: "Избранная работа",
    headline: "ARAX",
    status: "Концепт / архитектура · Taorlox",
    tagline: "Корпоративная AI knowledge-платформа",
    summary:
      "Концепт платформы корпоративного знания: ingest, embed, retrieve и ответы через контролируемые поверхности — как инфраструктура, а не обёртка над чат-ботом.",
    explore: "Открыть кейс",
    transition: "Жидкость затвердевает в систему. Ниже — архитектура ARAX.",
  },
  capabilities: {
    eyebrow: "Компетенции",
    headline: "Технический диапазон",
    groups: [
      {
        title: "AI Systems",
        items: [
          "RAG-пайплайны",
          "Эмбеддинги и векторный поиск",
          "Корпоративные knowledge-поверхности",
          "Ограниченные model-workflow",
        ],
      },
      {
        title: "Backend",
        items: [
          "Проектирование API",
          "Сервисы на C# / .NET",
          "Сервисы на Python",
          "TypeScript / Node.js",
        ],
      },
      {
        title: "Данные и инфраструктура",
        items: ["PostgreSQL", "Qdrant", "Docker", "Linux / VPS"],
      },
      {
        title: "System Design",
        items: [
          "Интеграции сервисов",
          "Автоматизация процессов",
          "Формы деплоя",
          "Владение отказами",
        ],
      },
    ],
  },
  about: {
    eyebrow: "О себе",
    headline: "Andrey Tessa",
    body: [
      `${profile.titles.primary} — собираю системы, которые остаются понятными по мере роста.`,
      "Работа охватывает backend-engineering, архитектуру AI-систем и technical leadership. AI принадлежит реальной инфраструктуре.",
      "На сайте — избранная архитектура. Конфиденциальные детали и неподтверждённые метрики опущены.",
    ],
  },
  contact: {
    eyebrow: "Контакт",
    headline: "Открыть канал",
    lead: "По системной работе, архитектуре или сотрудничеству.",
    channels: "Каналы",
  },
  footer: {
    rights: profile.name,
    built: "Статика · GitHub Pages",
  },
  caseArax: {
    back: "Главная",
    status: "Концепт / архитектура · Taorlox",
    title: "ARAX",
    subtitle: "Корпоративная AI knowledge-платформа",
    intro:
      "ARAX — концепт платформы корпоративного знания: документы и операционный контекст в retrieval-ready системе, затем контролируемые поверхности поиска и ответов. Архитектура и намерение — не публичный продукт с метриками.",
    chapters: [
      {
        id: "sources",
        title: "Источники знания",
        body: "Файлы, API и внутренние хранилища — first-class входы. Разнообразие источников предполагается; границы доступа обязательны.",
      },
      {
        id: "ingest",
        title: "Ingestion и обработка",
        body: "Нормализация, чанки и подготовка к эмбеддингам с сохранением provenance для аудита.",
      },
      {
        id: "embed",
        title: "Эмбеддинги и retrieval",
        body: "Векторные представления питают индекс. Retrieval — спроектированный путь, а не хвост вызова модели.",
      },
      {
        id: "vector",
        title: "Векторный поиск",
        body: "Индексирование в духе Qdrant для similarity search рядом с реляционными метаданными.",
      },
      {
        id: "model",
        title: "Интеграция модели",
        body: "Генерация за контрактами: сбор контекста, ограничения и явная деградация при тонком retrieval.",
      },
      {
        id: "context",
        title: "Сборка контекста",
        body: "Фрагменты становятся структурированным контекстом. Система различает поиск и утверждение.",
      },
      {
        id: "access",
        title: "Доступ и tenancy",
        body: "Изоляция арендаторов и контроль доступа — архитектурные швы, а не переключатели в UI.",
      },
      {
        id: "audit",
        title: "Прослеживаемость",
        body: "Аудит и трассы в каркасе, чтобы ответы можно было объяснить через источники.",
      },
    ],
    implementedNote:
      "Концептуальная архитектура и целевые возможности. Публичные сроки и заявления о производительности не публикуются.",
    architecture: {
      title: "Архитектура",
      caption: "Постепенное раскрытие — сфокусируйте узел",
      nodes: [
        { id: "sources", label: "Источники", detail: "Документы, API, хранилища" },
        { id: "ingest", label: "Ingestion", detail: "Нормализация и чанки" },
        { id: "embed", label: "Эмбеддинги", detail: "Векторные формы" },
        { id: "qdrant", label: "Qdrant", detail: "Векторный индекс" },
        { id: "pg", label: "PostgreSQL", detail: "Метаданные и состояние" },
        { id: "api", label: "API", detail: "Auth и контракты" },
        { id: "rag", label: "RAG", detail: "Retrieve + generate" },
        { id: "ui", label: "Поверхность", detail: "Поиск и ответы" },
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
      ],
    },
  },
  notFound: {
    title: "Не найдено",
    body: "Этого маршрута нет в статическом экспорте.",
    home: "На главную",
  },
};
