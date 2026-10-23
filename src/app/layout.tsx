import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Unbounded } from "next/font/google";
import type { CSSProperties } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { en } from "@/content/en";
import { I18nProvider } from "@/lib/i18n";
import { BASE_PATH, SITE } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = SITE.pagesUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: en.meta.title,
    template: `%s · ${en.meta.title}`,
  },
  description: en.meta.description,
  applicationName: "Andrey Tessa Portfolio",
  authors: [{ name: "Andrey Tessa", url: SITE.profileGithub }],
  openGraph: {
    type: "website",
    url: siteUrl,
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body
        style={
          {
            "--font-display": "var(--font-unbounded), Unbounded, sans-serif",
            "--font-body": "var(--font-plex-sans), 'IBM Plex Sans', sans-serif",
            "--font-mono": "var(--font-plex-mono), 'IBM Plex Mono', monospace",
          } as CSSProperties
        }
      >
        <I18nProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <div className="site-shell">
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
