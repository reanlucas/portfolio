import type { Metadata } from "next";
import CaseStudies from "@/components/projetos/caseStudies";
import { isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : "pt"
  const t = getDictionary(locale)
  return {
    title: t.meta.projectsTitle,
    description: t.meta.projectsDescription,
    alternates: {
      canonical: localizedHref(locale, "projects"),
      languages: { "pt-BR": localizedHref("pt", "projects"), en: localizedHref("en", "projects") },
    },
  }
}

export default function ProjectsPage() {
  return <CaseStudies />;
}
