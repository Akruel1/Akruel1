import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import type { CSSProperties } from "react";
import { ExperienceShell } from "@/components/ExperienceShell";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { en } from "@/content/en";
import { I18nProvider } from "@/lib/i18n";
import { BASE_PATH, SITE } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.pagesUrl),
  title: {
    default: en.meta.title,
    template: `%s · ${en.meta.title}`,
  },
  description: en.meta.description,
  applicationName: "Andrey Tessa Portfolio",
  authors: [{ name: "Andrey Tessa", url: SITE.profileGithub }],
  openGraph: {
    type: "website",
    url: SITE.pagesUrl,
    title: en.meta.ogTitle,
    description: en.meta.ogDescription,
    siteName: "Andrey Tessa",
    locale: "en_US",
    alternateLocale: ["ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.ogTitle,
    description: en.meta.ogDescription,
  },
  icons: {
    icon: [{ url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body
        style={
          {
            "--font-display": "var(--font-cormorant), 'Cormorant Garamond', serif",
            "--font-body": "var(--font-manrope), Manrope, sans-serif",
            "--font-mono": "var(--font-plex-mono), 'IBM Plex Mono', monospace",
          } as CSSProperties
        }
      >
        <I18nProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <ExperienceShell>
            <div className="site-shell">
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </div>
          </ExperienceShell>
        </I18nProvider>
      </body>
    </html>
  );
}
