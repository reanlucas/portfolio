"use client"

import { motion } from "motion/react"
import Link from "next/link"
import {
  Activity, AlertTriangle, ArrowRight, BellRing, Boxes, CalendarCheck,
  Eye, Lock, Mail, MessageSquareText, Minimize2, RefreshCcw, Waves, Workflow,
} from "lucide-react"
import { FaPython, FaWhatsapp } from "react-icons/fa"
import { SiFlask, SiGooglecloud, SiNumpy, SiPlotly, SiPytorch, SiTerraform } from "react-icons/si"
import { Reveal, RevealGroup, RevealItem, SectionTitle } from "@/components/motion/primitives"
import { BottomNeural, DeepNeural, HeroNeuralLeft, LSTMNeural, MidNeuralRight } from "@/components/neuralDecor"
import AssetMonitorDemo from "@/components/projetos/assetMonitorDemo"
import AgentChatDemo from "@/components/viz/agentChat"
import { useLocale } from "@/i18n/context"

const PIPELINE_ICONS = [Waves, Boxes, Minimize2, RefreshCcw, Activity, BellRing]
const IMPACT_ICONS = [CalendarCheck, Eye, AlertTriangle]
const AGENT_ICONS = [FaWhatsapp, Mail, Workflow]

const stack = [
  { Icon: FaPython, label: "Python" },
  { Icon: SiPytorch, label: "PyTorch" },
  { Icon: SiGooglecloud, label: "GCP · AlloyDB" },
  { Icon: SiTerraform, label: "Terraform" },
  { Icon: SiFlask, label: "Flask" },
  { Icon: SiPlotly, label: "Plotly" },
  { Icon: SiNumpy, label: "NumPy" },
]

function Pipeline() {
  const { t } = useLocale()
  const steps = t.projectsPage.pipeline
  return (
    <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3" stagger={0.12}>
      {steps.map(({ label, detail }, i) => {
        const Icon = PIPELINE_ICONS[i]
        return (
          <RevealItem key={label} className="relative">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-4 flex flex-col items-center text-center gap-2"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex h-10 w-10 items-center justify-center bg-muted border border-border text-foreground">
                <Icon size={19} />
              </div>
              <p className="font-display text-sm font-bold leading-tight">{label}</p>
              <p className="text-[11px] text-muted-foreground leading-snug">{detail}</p>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.span
                className="absolute top-1/2 -right-[13px] z-10 hidden lg:block h-1.5 w-1.5 rounded-full bg-foreground"
                animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
              />
            )}
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}

export default function CaseStudies() {
  const { t, href } = useLocale()
  const p = t.projectsPage

  return (
    <div className="relative overflow-hidden">
      <HeroNeuralLeft className="absolute -left-10 top-[3%] w-72 md:w-[28rem] dark:opacity-[0.18] opacity-[0.22] pointer-events-none" />
      <MidNeuralRight className="absolute -right-10 top-[25%] w-72 md:w-[28rem] dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />
      <DeepNeural className="absolute left-[20%] top-[55%] w-72 md:w-[30rem] dark:opacity-[0.12] opacity-[0.16] pointer-events-none" />
      <LSTMNeural className="absolute -right-8 bottom-[20%] w-64 md:w-96 dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />
      <BottomNeural className="absolute -left-10 bottom-[2%] w-72 md:w-[30rem] dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28 pb-20 flex flex-col gap-20 relative">
        <header>
          <Reveal>
            <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">{p.overline}</p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 uppercase">
              {p.h1a}<span className="text-muted-foreground">{p.h1b}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-3xl">{p.lead}</p>
          </Reveal>
        </header>

        {/* ── Case principal ── */}
        <section className="flex flex-col gap-12">
          <div>
            <SectionTitle index="01" overline={p.caseOverline} title={p.caseTitle} className="mb-4" />
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-none border border-border bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {p.badge}
                </span>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{p.context}</span>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.problemLabel}</p>
                <p className="leading-8 text-muted-foreground">{p.problem}</p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.solutionLabel}</p>
                <p className="leading-8 text-muted-foreground">{p.solution}</p>
              </div>
            </RevealItem>
          </RevealGroup>

          <div>
            <Reveal className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{p.pipelineLabel}</p>
            </Reveal>
            <Pipeline />
          </div>

          <div>
            <Reveal className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{p.exploreLabel}</p>
            </Reveal>
            <AssetMonitorDemo />
          </div>

          <Reveal>
            <div className="border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.integrationsLabel}</p>
              <p className="leading-8 text-muted-foreground mb-5">{p.integrations}</p>
              <div className="flex flex-wrap gap-2">
                {p.integrationList.map((name) => (
                  <span key={name} className="border border-border dark:border-white/10 bg-background/60 px-3 py-1.5 text-xs font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{p.impactLabel}</p>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
              {p.impact.map(({ title, text }, i) => {
                const Icon = IMPACT_ICONS[i]
                return (
                  <RevealItem key={title} className="h-full">
                    <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-muted border border-border text-foreground">
                        <Icon size={19} />
                      </div>
                      <h3 className="font-display text-base font-bold uppercase tracking-tight">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-7">{text}</p>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3 border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-5">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mr-2">{p.stackLabel}</span>
              {stack.map(({ Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 border border-border dark:border-white/10 bg-background/60 px-3 py-1.5 text-xs font-medium">
                  <Icon size={13} /> {label}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock size={12} /> {p.privateNote}
              </span>
            </div>
          </Reveal>
        </section>

        {/* ── Agente de IA ── */}
        <section className="flex flex-col gap-8">
          <SectionTitle index="02" overline={p.agent.overline} title={p.agent.title} className="mb-0" />

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.agent.whatLabel}</p>
                <p className="leading-8 text-muted-foreground">{p.agent.what}</p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{p.agent.howLabel}</p>
                <p className="leading-8 text-muted-foreground">{p.agent.how}</p>
              </div>
            </RevealItem>
          </RevealGroup>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <AgentChatDemo className="h-full" />
            </div>
            <Reveal delay={0.15} className="lg:col-span-2">
              <figure className="h-full border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] flex flex-col">
                <figcaption className="px-5 py-3 border-b border-border dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.agent.routingHeader}</span>
                </figcaption>
                <div className="flex-1 flex flex-col justify-center gap-5 px-5 py-6">
                  {p.agent.routing.map(({ label, pct, note }, i) => (
                    <div key={label}>
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <span className="text-xs font-semibold">{label}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-2.5 bg-border/60 dark:bg-white/8">
                        <motion.div
                          className="h-full"
                          style={{ background: `color-mix(in oklab, var(--foreground) ${78 - i * 22}%, var(--background))` }}
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">{note}</p>
                    </div>
                  ))}
                  <p className="text-[11px] text-muted-foreground leading-5 border-t border-border dark:border-white/10 pt-4">{p.agent.routingNote}</p>
                </div>
              </figure>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.12}>
            {p.agent.integrations.map(({ title, text }, i) => {
              const Icon = AGENT_ICONS[i]
              return (
                <RevealItem key={title} className="h-full">
                  <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-muted border border-border text-foreground">
                      <Icon size={19} />
                    </div>
                    <h3 className="font-display text-base font-bold uppercase tracking-tight">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-7">{text}</p>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3 border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-5">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mr-2">{p.stackLabel}</span>
              {p.agent.stack.map((label, i) => (
                <span key={label} className="inline-flex items-center gap-2 border border-border dark:border-white/10 bg-background/60 px-3 py-1.5 text-xs font-medium">
                  {i === 0 || i === 5 ? <SiGooglecloud size={13} /> : i === 4 ? <FaPython size={13} /> : <MessageSquareText size={13} />}
                  {label}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock size={12} /> {p.privateShort}
              </span>
            </div>
          </Reveal>
        </section>

        {/* ── Confidenciais + CTA ── */}
        <section>
          <SectionTitle index="03" overline={p.confidential.overline} title={p.confidential.title} className="mb-8" />
          <Reveal>
            <div className="border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7 mb-10">
              <p className="leading-8 text-muted-foreground">{p.confidential.text}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight mb-3 uppercase">{p.cta.title}</h2>
              <p className="text-muted-foreground leading-7 max-w-2xl mx-auto mb-7">{p.cta.text}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={href("contact")}
                  className="group inline-flex items-center gap-2 h-12 px-7 font-semibold text-sm uppercase tracking-widest bg-foreground text-background hover:opacity-85 transition-opacity duration-200"
                >
                  {p.cta.primary}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href={href("about")}
                  className="inline-flex items-center gap-2 h-12 px-6 font-semibold text-sm uppercase tracking-widest border border-foreground/25 hover:border-foreground hover:bg-accent transition-colors duration-200"
                >
                  {p.cta.secondary}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
