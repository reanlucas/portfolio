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

/* ─── Pipeline da detecção ─────────────────────────────────────────────── */

const pipeline = [
  { Icon: Waves, label: "Sensores", detail: "vibração · temperatura · corrente" },
  { Icon: Boxes, label: "Janelamento", detail: "séries temporais multivariadas" },
  { Icon: Minimize2, label: "Detecção por IA", detail: "RNN/LSTM · CNN · autoencoders" },
  { Icon: RefreshCcw, label: "ML clássico", detail: "Random Forest · KNN validam" },
  { Icon: Activity, label: "Score de risco", detail: "consenso do ensemble por tag" },
  { Icon: BellRing, label: "Agente de IA", detail: "dispara WhatsApp e e-mail" },
]

function Pipeline() {
  return (
    <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3" stagger={0.12}>
      {pipeline.map(({ Icon, label, detail }, i) => (
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

          {i < pipeline.length - 1 && (
            <motion.span
              className="absolute top-1/2 -right-[13px] z-10 hidden lg:block h-1.5 w-1.5 rounded-full bg-foreground"
              animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
            />
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/* ─── Conteúdo ─────────────────────────────────────────────────────────── */

const integrations = [
  "SAP", "Hitachi NM", "Oracle SQL", "Keycloak", "Autenticação corporativa",
  "Data lakes", "Denodo", "SCADA / ICCP",
]

const impact = [
  {
    Icon: CalendarCheck,
    title: "Crise vira agenda",
    text: "Manutenção deixa de ser emergência de madrugada e vira intervenção planejada — com peça em estoque, equipe escalada e janela combinada com a operação.",
  },
  {
    Icon: Eye,
    title: "Visibilidade 24/7",
    text: "Cada tag monitorada ganha um envelope de normalidade próprio. O time enxerga tendência e desvio em tempo real, não só depois do estrago.",
  },
  {
    Icon: AlertTriangle,
    title: "Risco antecipado",
    text: "Falha não planejada em ativo crítico custa indisponibilidade, multa e risco físico. Detectar o desvio dias antes muda a economia da manutenção inteira.",
  },
]

const stack = [
  { Icon: FaPython, label: "Python" },
  { Icon: SiPytorch, label: "PyTorch" },
  { Icon: SiGooglecloud, label: "GCP · AlloyDB" },
  { Icon: SiTerraform, label: "Terraform" },
  { Icon: SiFlask, label: "Flask" },
  { Icon: SiPlotly, label: "Plotly" },
  { Icon: SiNumpy, label: "NumPy" },
]

/* ─── Página ───────────────────────────────────────────────────────────── */

export default function CaseStudies() {
  return (
    <div className="relative overflow-hidden">
      <HeroNeuralLeft className="absolute -left-10 top-[3%] w-72 md:w-[28rem] dark:opacity-[0.18] opacity-[0.22] pointer-events-none" />
      <MidNeuralRight className="absolute -right-10 top-[25%] w-72 md:w-[28rem] dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />
      <DeepNeural className="absolute left-[20%] top-[55%] w-72 md:w-[30rem] dark:opacity-[0.12] opacity-[0.16] pointer-events-none" />
      <LSTMNeural className="absolute -right-8 bottom-[20%] w-64 md:w-96 dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />
      <BottomNeural className="absolute -left-10 bottom-[2%] w-72 md:w-[30rem] dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28 pb-20 flex flex-col gap-20 relative">
        {/* Hero */}
        <header>
          <Reveal>
            <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
              Projetos · Deep learning fora do notebook
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 uppercase">
              Sistemas que <span className="text-muted-foreground">não podem falhar</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-3xl">
              Meu portfólio não é uma coleção de demos — é o registro do que roda em produção,
              em ambiente crítico, gerando valor todo dia. Explore o estudo de caso interativo abaixo.
            </p>
          </Reveal>
        </header>

        {/* ── Case principal ── */}
        <section className="flex flex-col gap-12">
          <div>
            <SectionTitle
              index="01"
              overline="Estudo de caso"
              title="Plataforma de Gestão de Ativos e Riscos"
              className="mb-4"
            />
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-none border border-border bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Em produção
                </span>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  Setor elétrico · UHEs e subestações · Centro de monitoramento de ativos
                </span>
              </div>
            </Reveal>
          </div>

          {/* O problema / A solução */}
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  O problema
                </p>
                <p className="leading-8 text-muted-foreground">
                  Ativos de UHEs e subestações falham — e quando falham sem aviso, o custo é brutal:
                  indisponibilidade de energia, manutenção emergencial, risco físico e regulatório.
                  O modelo tradicional é reativo (conserta depois que quebra) ou preventivo cego
                  (troca peça boa por calendário). Uma das maiores companhias de energia do Brasil
                  precisava de uma terceira via: saber <em>antes</em> — e ter isso integrado ao
                  ecossistema corporativo que já existe.
                </p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  A solução
                </p>
                <p className="leading-8 text-muted-foreground">
                  Uma plataforma de gestão de ativos e riscos em nuvem (GCP, com AlloyDB no núcleo
                  de dados): detecção por IA com redes neurais recorrentes e convolucionais
                  (LSTM Autoencoders, CNNs) validada por modelos clássicos de ML — Random Forest e
                  KNN — num ensemble que atribui score de risco por tag de telemetria. A hierarquia
                  empresa → ativo → tag consolida tudo numa visão só, e um agente de IA dispara os
                  alertas com contexto por WhatsApp e e-mail.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>

          {/* Pipeline */}
          <div>
            <Reveal className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                O pipeline — do sensor ao alerta
              </p>
            </Reveal>
            <Pipeline />
          </div>

          {/* Demo interativa */}
          <div>
            <Reveal className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                Explore — clique numa tag do sunburst
              </p>
            </Reveal>
            <AssetMonitorDemo />
          </div>

          {/* Integrações corporativas */}
          <Reveal>
            <div className="border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Integrações corporativas
              </p>
              <p className="leading-8 text-muted-foreground mb-5">
                Plataforma de verdade não vive em ilha: autenticação via Keycloak e sistemas
                corporativos internos, ordens e cadastros do SAP e do Hitachi NM, históricos em
                Oracle SQL, dados servidos por data lakes e virtualização com Denodo. O modelo
                é só o coração — o valor aparece quando ele conversa com o organismo inteiro.
              </p>
              <div className="flex flex-wrap gap-2">
                {integrations.map((name) => (
                  <span
                    key={name}
                    className="border border-border dark:border-white/10 bg-background/60 px-3 py-1.5 text-xs font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Impacto */}
          <div>
            <Reveal className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                O impacto
              </p>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
              {impact.map(({ Icon, title, text }) => (
                <RevealItem key={title} className="h-full">
                  <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-muted border border-border text-foreground">
                      <Icon size={19} />
                    </div>
                    <h3 className="font-display text-base font-bold uppercase tracking-tight">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-7">{text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Stack */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-5">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mr-2">
                Stack
              </span>
              {stack.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 border border-border dark:border-white/10 bg-background/60 px-3 py-1.5 text-xs font-medium"
                >
                  <Icon size={13} /> {label}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock size={12} /> Código privado — detalhes internos sob confidencialidade
              </span>
            </div>
          </Reveal>
        </section>

        {/* ── Agente de IA ── */}
        <section className="flex flex-col gap-8">
          <SectionTitle index="02" overline="IA generativa" title="Agente de IA & LLMs" className="mb-0" />

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  O que faz
                </p>
                <p className="leading-8 text-muted-foreground">
                  Agente conversacional com LLM que responde sobre os ativos e o risco em linguagem
                  natural: o engenheiro pergunta &quot;como está o Trafo 01?&quot; e o agente consulta a
                  plataforma, cruza telemetria, histórico e ordens de manutenção, e responde com
                  contexto — citando as tags que sustentam a resposta. Quando o ensemble atinge
                  consenso de anomalia, é o mesmo agente que redige e dispara o alerta.
                </p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Como funciona
                </p>
                <p className="leading-8 text-muted-foreground">
                  Orquestração de LLMs integrada ao Vertex AI e a modelos open source servidos em
                  infraestrutura própria — o roteamento escolhe o modelo por custo, latência e
                  sensibilidade do dado. Function calling dá ao agente acesso controlado às APIs
                  da plataforma; RAG ancora as respostas na documentação técnica; guardrails e
                  avaliação contínua mantêm o agente no trilho.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>

          {/* O agente em ação + roteamento de modelos */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <AgentChatDemo className="h-full" />
            </div>
            <Reveal delay={0.15} className="lg:col-span-2">
              <figure className="h-full border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] flex flex-col">
                <figcaption className="px-5 py-3 border-b border-border dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Roteamento por modelo · exemplo ilustrativo
                  </span>
                </figcaption>
                <div className="flex-1 flex flex-col justify-center gap-5 px-5 py-6">
                  {[
                    { label: "Gemini · Vertex AI", pct: 62, note: "raciocínio geral e ferramentas" },
                    { label: "Llama · self-hosted", pct: 28, note: "dados sensíveis ficam em casa" },
                    { label: "Mistral · self-hosted", pct: 10, note: "classificação e triagem baratas" },
                  ].map(({ label, pct, note }, i) => (
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
                  <p className="text-[11px] text-muted-foreground leading-5 border-t border-border dark:border-white/10 pt-4">
                    O roteador escolhe o LLM por custo, latência e sensibilidade do dado —
                    Vertex AI para o raciocínio pesado, open source self-hosted para o que
                    não pode sair de casa.
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>

          {/* Integrações do agente */}
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                Icon: FaWhatsapp,
                title: "Dispara WhatsApp",
                text: "Consenso de anomalia no ensemble → o agente redige o alerta com tag, desvio e recomendação, e entrega no grupo da equipe de manutenção.",
              },
              {
                Icon: Mail,
                title: "Dispara e-mail",
                text: "Relatório estruturado por e-mail para gestores: o que desviou, desde quando, qual o risco e qual a janela sugerida de intervenção.",
              },
              {
                Icon: Workflow,
                title: "Aciona sistemas",
                text: "Via function calling, o agente consulta e alimenta os sistemas corporativos — do histórico no Oracle à ordem de serviço no SAP.",
              },
            ].map(({ Icon, title, text }) => (
              <RevealItem key={title} className="h-full">
                <div className="h-full border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-muted border border-border text-foreground">
                    <Icon size={19} />
                  </div>
                  <h3 className="font-display text-base font-bold uppercase tracking-tight">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-7">{text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3 border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-5">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mr-2">
                Stack
              </span>
              {["Vertex AI", "LLMs open source", "Function calling", "RAG", "Python", "GCP"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 border border-border dark:border-white/10 bg-background/60 px-3 py-1.5 text-xs font-medium"
                >
                  {label === "Vertex AI" || label === "GCP" ? <SiGooglecloud size={13} /> : label === "Python" ? <FaPython size={13} /> : <MessageSquareText size={13} />}
                  {label}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock size={12} /> Código privado
              </span>
            </div>
          </Reveal>
        </section>

        {/* ── Confidenciais + CTA ── */}
        <section>
          <SectionTitle index="03" overline="O resto do iceberg" title="Projetos confidenciais" className="mb-8" />
          <Reveal>
            <div className="border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7 mb-10">
              <p className="leading-8 text-muted-foreground">
                Integrações industriais, pipelines de dados e automações em ambiente crítico —
                o trabalho que constrói vantagem competitiva de verdade raramente pode ir para o
                GitHub. Esses projetos são confidenciais por dever ético e profissional, e é
                exatamente por isso que valem tanto: rodam onde erro tem consequência.
                Numa conversa, explico arquitetura e decisões até onde a confidencialidade permite.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight mb-3 uppercase">
                Curioso sobre os detalhes?
              </h2>
              <p className="text-muted-foreground leading-7 max-w-2xl mx-auto mb-7">
                Arquitetura, trade-offs, o que funcionou e o que eu faria diferente —
                conversa técnica boa é a minha parte favorita do trabalho.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 h-12 px-7 font-semibold text-sm uppercase tracking-widest bg-foreground text-background hover:opacity-85 transition-opacity duration-200"
                >
                  Vamos conversar
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 h-12 px-6 font-semibold text-sm uppercase tracking-widest border border-foreground/25 hover:border-foreground hover:bg-accent transition-colors duration-200"
                >
                  Conhecer minha história
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
