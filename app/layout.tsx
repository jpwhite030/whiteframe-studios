import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import { MotionProvider } from "@/components/motion-provider";
import { LenisProvider } from "@/lib/lenis-provider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  // No default `alternates.canonical` here on purpose: every page sets its
  // own through buildMetadata(). A default of "/" is worse than none — it
  // silently tells search engines that any page which forgot one is a
  // duplicate of the homepage.
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f1eb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${manrope.variable} h-full`}>
      <head>
        {/* Without JavaScript nothing may stay hidden behind an entrance. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-light"
        >
          Skip to content
        </a>
        <LenisProvider>
          <MotionProvider>{children}</MotionProvider>
        </LenisProvider>
        <CustomCursor />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
