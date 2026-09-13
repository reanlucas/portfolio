"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal, SectionTitle } from "@/components/motion/primitives"
import AssetMonitorDemo from "@/components/projetos/assetMonitorDemo"
import { useLocale } from "@/i18n/context"

export default function RiskShowcase() {
  const { t, href } = useLocale()
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-8">
        <SectionTitle index="01" overline={t.risk.overline} title={t.risk.title} />

        <Reveal>
          <p className="text-muted-foreground leading-8 max-w-3xl">
            {t.risk.intro}
          </p>
          <p className="mt-3 text-muted-foreground leading-8 max-w-3xl">
            <span className="text-foreground font-medium">{t.risk.hook}</span>
            {t.risk.hookAction}
          </p>
        </Reveal>

        <AssetMonitorDemo />

        <Reveal>
          <Link
            href={href("projects")}
            className="group inline-flex items-center gap-2 w-fit font-semibold text-sm uppercase tracking-widest border border-foreground/25 hover:border-foreground hover:bg-accent transition-colors duration-200 px-6 py-3.5"
          >
            {t.risk.cta}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
