"use client"

import { motion, useScroll, useSpring } from "motion/react"
import Link from "next/link"
import { useRef } from "react"
import { ArrowRight, Brain, Factory, Layers, Radio, Ruler, Zap } from "lucide-react"
import { Reveal, RevealGroup, RevealItem, SectionTitle } from "@/components/motion/primitives"
import { DeepNeural, HeroNeuralRight, LSTMNeural, MidNeuralLeft } from "@/components/neuralDecor"
import AgentChatDemo from "@/components/viz/agentChat"
import TelemetryStrip from "@/components/viz/telemetryStrip"
import { IncidentReplayShowcase } from "@/components/projetos/assetMonitorDemo"
import { HardwareScene, FullstackScene, IndustrialScene, DeepLearningScene, TodayScene } from "@/components/sobre/eraScenes"
import { useLocale } from "@/i18n/context"

const SCENES = [HardwareScene, FullstackScene, IndustrialScene, DeepLearningScene, TodayScene]
const DOMAIN_ICONS = [Brain, Layers, Factory]
const PRINCIPLE_ICONS = [Zap, Ruler, Radio, Factory]
const MILESTONE_STYLE = [
  { pos: "4%", color: "var(--risk-warning)", delay: 0.2 },
  { pos: "38%", color: "var(--risk-critical)", delay: 0.7 },
  { pos: "68%", color: "var(--foreground)", delay: 1.2 },
  { pos: "96%", color: "var(--muted-foreground)", delay: 1.7 },
]

/* ─── Timeline com linha guiada pelo scroll ────────────────────────────── */

function Timeline() {
  const { t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <div ref={ref} className="relative pl-8 md:pl-12">
      <div className="absolute left-[9px] md:left-[13px] top-1 bottom-1 w-[2px] rounded bg-border dark:bg-white/10" />
      <motion.div
        className="absolute left-[9px] md:left-[13px] top-1 bottom-1 w-[2px] origin-top rounded"
        style={{ scaleY, background: "var(--foreground)" }}
      />

      <div className="flex flex-col gap-12">
        {t.aboutPage.timeline.items.map((item, i) => {
          const Scene = SCENES[i]
          return (
            <Reveal key={item.title} className="relative">
              <span className="absolute -left-8 md:-left-12 top-1.5 flex h-5 w-5 items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
              </span>
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{item.era}</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-7 max-w-xl">{item.text}</p>
                </div>
                <div className="shrink-0 w-48 md:w-56 border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] p-3 text-foreground/80">
                  <Scene />
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Página ───────────────────────────────────────────────────────────── */

export default function AboutStory() {
  const { t, href } = useLocale()
  const p = t.aboutPage

  return (
    <div className="relative overflow-hidden">
      <HeroNeuralRight className="absolute right-0 top-[2%] w-56 md:w-80 dark:opacity-[0.18] opacity-[0.22] pointer-events-none" />
      <MidNeuralLeft className="absolute -left-10 top-[30%] w-72 md:w-[26rem] dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />
      <DeepNeural className="absolute left-[15%] bottom-[30%] w-72 md:w-[28rem] dark:opacity-[0.12] opacity-[0.16] pointer-events-none" />
      <LSTMNeural className="absolute -right-10 bottom-[8%] w-64 md:w-96 dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28 pb-20 flex flex-col gap-20 relative">
        <header>
          <Reveal>
            <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">{p.overline}</p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {p.h1a}<span className="text-muted-foreground">{p.h1b}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-3xl">{p.lead}</p>
          </Reveal>
        </header>

        {/* Pitch duplo — técnico × decisor */}
        <section>
          <SectionTitle index="01" overline={p.why.overline} title={p.why.title} className="mb-8" />
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            <RevealItem>
              <div className="h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.why.techLabel}</p>
                <p className="leading-8 text-muted-foreground">{p.why.tech}</p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.why.execLabel}</p>
                <p className="leading-8 text-muted-foreground">{p.why.exec}</p>
              </div>
            </RevealItem>
          </RevealGroup>
        </section>

        <section>
          <SectionTitle index="02" overline={p.timeline.overline} title={p.timeline.title} className="mb-10" />
          <Timeline />
        </section>

        <section>
          <SectionTitle index="03" overline={p.domains.overline} title={p.domains.title} className="mb-8" />
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {p.domains.items.map(({ title, text, chips }, i) => {
              const Icon = DOMAIN_ICONS[i]
              return (
                <RevealItem key={title} className="h-full">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-none bg-muted border border-border text-foreground">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-7 flex-1">{text}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {chips.map((chip) => (
                        <span key={chip} className="rounded-none border border-border dark:border-white/10 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </section>

        <section>
          <SectionTitle index="04" overline={p.principles.overline} title={p.principles.title} className="mb-8" />
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
            {p.principles.items.map(({ title, text }, i) => {
              const Icon = PRINCIPLE_ICONS[i]
              return (
                <RevealItem key={title}>
                  <div className="h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-muted border border-border text-foreground">
                      <Icon size={19} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold mb-1.5">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-7">{text}</p>
                    </div>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </section>

        <section>
          <SectionTitle index="05" overline={p.practice.overline} title={p.practice.title} className="mb-8" />

          <Reveal className="mb-6">
            <TelemetryStrip />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AgentChatDemo />

            <Reveal delay={0.15}>
              <figure className="h-full border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] flex flex-col">
                <figcaption className="px-5 py-3 border-b border-border dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.practice.eventHeader}</span>
                </figcaption>
                <div className="flex-1 flex flex-col justify-center gap-8 px-6 py-8">
                  <div className="relative pt-1 pb-9">
                    <div className="h-[2px] bg-border dark:bg-white/10" />
                    <motion.div
                      className="absolute top-1 left-0 h-[2px] bg-foreground origin-left w-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                    {p.practice.milestones.map(({ label, sub }, i) => {
                      const { pos, color, delay } = MILESTONE_STYLE[i]
                      return (
                        <motion.div
                          key={label}
                          className="absolute top-0 -translate-x-1/2 flex flex-col items-center text-center w-28"
                          style={{ left: pos }}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.4, delay }}
                        >
                          <span className="h-3 w-3 border-2 bg-background" style={{ borderColor: color }} />
                          <span className="text-[10px] font-semibold leading-tight mt-2">{label}</span>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mt-0.5">{sub}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  <p className="text-sm text-muted-foreground leading-7">
                    {p.practice.textA}
                    <span className="text-foreground font-medium">{p.practice.textHighlight}</span>
                    {p.practice.textB}
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>

          <Reveal className="mt-6">
            <IncidentReplayShowcase />
          </Reveal>
        </section>

        <Reveal>
          <div className="rounded-none border border-border bg-muted/40 p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight mb-3">{p.cta.title}</h2>
            <p className="text-muted-foreground leading-7 max-w-2xl mx-auto mb-7">{p.cta.text}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={href("projects")}
                className="group inline-flex items-center gap-2 h-12 px-7 font-semibold rounded-none bg-foreground text-background hover:opacity-85 transition-opacity duration-200"
              >
                {p.cta.primary}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href={href("contact")}
                className="inline-flex items-center gap-2 h-12 px-6 font-medium rounded-none border border-border dark:border-white/15 hover:bg-accent transition-colors duration-200"
              >
                {p.cta.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
