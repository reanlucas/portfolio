import type { Metadata } from "next";
import AboutStory from "@/components/sobre/aboutStory";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : "pt"
  const t = getDictionary(locale)
  return {
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    alternates: {
      canonical: localizedHref(locale, "about"),
      languages: { "pt-BR": localizedHref("pt", "about"), en: localizedHref("en", "about") },
    },
  }
}

export default function AboutPage() {
  return <AboutStory />;
}
