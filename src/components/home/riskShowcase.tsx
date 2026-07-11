"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal, SectionTitle } from "@/components/motion/primitives"
import AssetMonitorDemo from "@/components/projetos/assetMonitorDemo"

export default function RiskShowcase() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-8">
        <SectionTitle index="01" overline="Operação" title="Risco de ativos, visível de uma vez" />

        <Reveal>
          <p className="text-muted-foreground leading-8 max-w-3xl">
            Usinas hidrelétricas e subestações concentram os ativos mais caros do setor elétrico.
            A plataforma que desenvolvo consolida tudo numa hierarquia navegável — empresa, ativo,
            tag — com detecção por redes neurais validada por ML clássico.
            <span className="text-foreground font-medium"> Clique numa tag do sunburst</span> e
            veja a predição do modelo contra o valor real do sensor.
          </p>
        </Reveal>

        <AssetMonitorDemo />

        <Reveal>
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-2 w-fit font-semibold text-sm uppercase tracking-widest border border-foreground/25 hover:border-foreground hover:bg-accent transition-colors duration-200 px-6 py-3.5"
          >
            Estudo de caso completo
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
