"use client"

import { motion } from "motion/react"
import { ArrowRight, Crosshair, Rocket, ShieldCheck } from "lucide-react"
import { Reveal, RevealGroup, RevealItem, SectionTitle } from "@/components/motion/primitives"
import { DeepNeural, MidNeuralLeft } from "@/components/neuralDecor"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/i18n/context"

/*
  Proposta de valor do Forward Deployed Engineer: o que muda quando ele entra
  na sala, o playbook dos primeiros 90 dias, a objeção mais comum respondida
  e a inversão de risco antes do CTA.
*/

const PILLAR_ICONS = [Crosshair, Rocket, ShieldCheck]

export default function FdeValue() {
  const { t } = useLocale()
  const f = t.fde

  return (
    <section className="relative overflow-hidden">
      <MidNeuralLeft className="absolute -left-10 top-10 w-72 md:w-[26rem] dark:opacity-[0.16] opacity-[0.22] pointer-events-none" />
      <DeepNeural className="absolute -right-10 bottom-0 w-72 md:w-[30rem] dark:opacity-[0.12] opacity-[0.16] pointer-events-none" />

      <Separator orientation="horizontal" className="max-w-[90vw] m-auto dark:bg-white/20 bg-black/10 my-8" />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10 relative">
        <SectionTitle index="02" overline={f.overline} title={f.title} />

        <Reveal>
          <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-3xl">{f.lead}</p>
        </Reveal>

        {/* Três pilares */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
          {f.pillars.map(({ title, text }, i) => {
            const Icon = PILLAR_ICONS[i]
            return (
              <RevealItem key={title} className="h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center bg-muted border border-border text-foreground">
                      <Icon size={21} />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight leading-tight">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-7">{text}</p>
                </motion.div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        {/* Playbook — 90 dias */}
        <div className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4 border-b border-border dark:border-white/10">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{f.playbook.overline}</p>
            <h3 className="font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight">{f.playbook.title}</h3>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border dark:divide-white/10">
            {/* trilho que se desenha no scroll */}
            <motion.div
              className="hidden lg:block absolute top-0 left-0 h-[2px] bg-foreground origin-left w-full z-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {f.playbook.steps.map(({ when, title, text }, i) => (
              <motion.div
                key={when}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.3 }}
                className="p-6 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-foreground inline-block" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{when}</span>
                </div>
                <p className="font-display text-base font-bold uppercase tracking-tight">{title}</p>
                <p className="text-sm text-muted-foreground leading-7">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Objeção + inversão de risco */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-5 gap-6" stagger={0.15}>
          <RevealItem className="md:col-span-3">
            <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
              <p className="font-display text-xl md:text-2xl font-extrabold tracking-tight mb-3">{f.objection.q}</p>
              <p className="leading-8 text-muted-foreground">{f.objection.a}</p>
            </div>
          </RevealItem>
          <RevealItem className="md:col-span-2">
            <div className="h-full border border-foreground bg-foreground text-background p-7 flex flex-col justify-between gap-6">
              <p className="text-base md:text-lg leading-7 font-medium">{f.riskReversal}</p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 w-fit font-semibold text-sm uppercase tracking-widest border border-background/40 hover:border-background px-5 py-3 transition-colors duration-200"
              >
                {f.cta}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
