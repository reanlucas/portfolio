import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import SideNav from "@/components/nav/sideNav";
import { ScrollProgress } from "@/components/motion/primitives";
import { LocaleProvider } from "@/i18n/context";
import { htmlLang, isLocale, locales, localizedHref, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/socialMediaLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Grotesca reta e sóbria para títulos — tom corporativo, sem floreio.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
});

type Params = Promise<{ lang: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : "pt"
  const t = getDictionary(locale)
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: localizedHref(locale, "home"),
      languages: {
        "pt-BR": localizedHref("pt", "home"),
        en: localizedHref("en", "home"),
        "x-default": localizedHref("pt", "home"),
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      url: localizedHref(locale, "home"),
      siteName: "Rean Lucas",
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
      >
        <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
          <LocaleProvider locale={lang}>
            <ScrollProgress />
            <SideNav />
            <main className="md:pl-[68px] pb-24 md:pb-0">{children}</main>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
