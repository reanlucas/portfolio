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

/* ─── Conteúdo ─────────────────────────────────────────────────────────── */

const timeline = [
  {
    era: "Primeiros anos",
    title: "Hardware desmontado, curiosidade montada",
    text: "Antes de escrever a primeira linha de código, eu já desmontava computadores para entender o que tinha dentro. A lição ficou: nenhum sistema é caixa-preta — sempre dá para abrir, entender e melhorar.",
    Scene: HardwareScene,
  },
  {
    era: "A base",
    title: "Full-stack de verdade",
    text: "TypeScript, React, Next.js, Node, PostgreSQL, Docker, Linux. Anos construindo interfaces, APIs e infraestrutura me deram o que falta em muito cientista de dados: a capacidade de transformar um modelo em produto que roda, escala e não cai.",
    Scene: FullstackScene,
  },
  {
    era: "O mundo industrial",
    title: "Onde o software encontra o físico",
    text: "SCADA, SAP, Oracle, protocolos como Modbus, DNP3, IEC 61850 e ICCP/TASE.2. Ambientes onde um bug não gera um ticket — gera consequência física. Aqui aprendi que confiabilidade não é feature, é pré-requisito.",
    Scene: IndustrialScene,
  },
  {
    era: "Deep learning em produção",
    title: "A rede neural que vigia a rede elétrica",
    text: "Projetei e coloquei em produção um sistema de manutenção preditiva com LSTM Autoencoders em PyTorch para o centro de monitoramento de ativos de uma das maiores companhias de energia do Brasil. Modelos que aprendem o comportamento normal de cada equipamento e denunciam a anomalia antes da falha.",
    Scene: DeepLearningScene,
  },
  {
    era: "Hoje",
    title: "Teoria e operação, em paralelo",
    text: "Curso Análise e Desenvolvimento de Sistemas na PUC-Paraná enquanto opero no laboratório mais exigente que existe: a produção real, onde modelo errado não perde ponto — perde energia.",
    Scene: TodayScene,
  },
]

const domains = [
  {
    Icon: Brain,
    title: "Deep Learning & ML",
    text: "Arquiteturas neurais aplicadas a problemas reais: LSTM, autoencoders, CNN, detecção de anomalias, séries temporais multivariadas. PyTorch como ferramenta, produção como critério.",
    chips: ["PyTorch", "LSTM Autoencoder", "Transformers", "CNNs", "Detecção de anomalias", "Risco de ativos", "Séries temporais", "Feature engineering"],
  },
  {
    Icon: Layers,
    title: "Engenharia de Software",
    text: "Do banco ao browser: APIs, bancos relacionais, containers, CI/CD e interfaces que convencem. O modelo mais brilhante do mundo não vale nada se não virar sistema confiável.",
    chips: ["Python / Flask", "TypeScript / Next.js", "Google Cloud", "Terraform", "PostgreSQL", "Docker", "DevOps", "UI/UX"],
  },
  {
    Icon: Factory,
    title: "Mundo Industrial",
    text: "O domínio que quase nenhum dev tem: protocolos de subestação, sistemas SCADA, integração SAP. Eu falo a língua dos engenheiros de campo e a dos cientistas de dados — e traduzo entre elas.",
    chips: ["SCADA", "ICCP/TASE.2", "IEC 61850", "Modbus / DNP3", "SAP", "Oracle SQL", "UHEs & subestações", "KPIs de manutenção"],
  },
]

const principles = [
  {
    Icon: Zap,
    title: "Do zero ao deploy",
    text: "Não entrego notebook com gráfico bonito. Entrego sistema rodando: modelo treinado, API servindo, dashboard no ar, alerta chegando em quem precisa agir.",
  },
  {
    Icon: Ruler,
    title: "Produção > prova de conceito",
    text: "POC impressiona em reunião; produção gera valor todo dia. Cada decisão técnica que tomo — do limiar do modelo ao retry da API — assume que o sistema vai rodar anos, não semanas.",
  },
  {
    Icon: Radio,
    title: "Tradução entre mundos",
    text: "Explico erro de reconstrução para o engenheiro de manutenção e ROI de manutenção preditiva para o executivo — sem dumbing down para nenhum dos dois.",
  },
  {
    Icon: Factory,
    title: "Confiabilidade como requisito",
    text: "Formado em ambiente onde falha tem consequência física. Isso muda a forma de escrever software: logging, monitoramento, degradação graciosa e humildade com o que o modelo não sabe.",
  },
]

/* ─── Timeline com linha guiada pelo scroll ────────────────────────────── */

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <div ref={ref} className="relative pl-8 md:pl-12">
      {/* trilho + linha que cresce com o scroll */}
      <div className="absolute left-[9px] md:left-[13px] top-1 bottom-1 w-[2px] rounded bg-border dark:bg-white/10" />
      <motion.div
        className="absolute left-[9px] md:left-[13px] top-1 bottom-1 w-[2px] origin-top rounded"
        style={{
          scaleY,
          background: "var(--foreground)",
        }}
      />

      <div className="flex flex-col gap-12">
        {timeline.map((item) => (
          <Reveal key={item.title} className="relative">
            <span className="absolute -left-8 md:-left-12 top-1.5 flex h-5 w-5 items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
            </span>
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                  {item.era}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-7 max-w-xl">{item.text}</p>
              </div>
              {/* vinheta animada da era */}
              <div className="shrink-0 w-48 md:w-56 border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] p-3 text-foreground/80">
                <item.Scene />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

/* ─── Página ───────────────────────────────────────────────────────────── */

export default function AboutStory() {
  return (
    <div className="relative overflow-hidden">
      <HeroNeuralRight className="absolute right-0 top-[2%] w-56 md:w-80 dark:opacity-[0.18] opacity-[0.22] pointer-events-none" />
      <MidNeuralLeft className="absolute -left-10 top-[30%] w-72 md:w-[26rem] dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />
      <DeepNeural className="absolute left-[15%] bottom-[30%] w-72 md:w-[28rem] dark:opacity-[0.12] opacity-[0.16] pointer-events-none" />
      <LSTMNeural className="absolute -right-10 bottom-[8%] w-64 md:w-96 dark:opacity-[0.16] opacity-[0.2] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28 pb-20 flex flex-col gap-20 relative">
        {/* Hero */}
        <header>
          <Reveal>
            <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
              Sobre · O caminho até aqui
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Do hardware desmontado à{" "}
              <span className="text-muted-foreground">rede neural em produção</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-3xl">
              Sou o Rean Lucas — engenheiro de machine learning. Atuo no trecho onde a
              maioria dos projetos de IA morre: tirar o modelo do notebook e colocá-lo em
              produção, vigiando ativos críticos 24 horas por dia.
            </p>
          </Reveal>
        </header>

        {/* Pitch duplo — técnico × executivo */}
        <section>
          <SectionTitle index="01" overline="Dois públicos, um perfil" title="Por que eu?" className="mb-8" />
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
            <RevealItem>
              <div className="h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Para o time técnico
                </p>
                <p className="leading-8 text-muted-foreground">
                  Arquiteto, não só uso: LSTM Autoencoder com limiar calibrado por equipamento,
                  ensemble com Random Forest e KNN antes de qualquer alerta, features em NumPy,
                  serving em Flask na GCP, front em TypeScript/Next.js. Code review comigo é
                  conversa entre pares — do backprop ao backend.
                </p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Para executivos
                </p>
                <p className="leading-8 text-muted-foreground">
                  Falha não planejada é o custo mais caro do setor: emergência, indisponibilidade,
                  multa. Meu sistema converte esse risco em aviso com dias de antecedência —
                  manutenção vira agenda, não crise. Um profissional cobrindo modelo, plataforma e
                  integração: menos handoff, entrega mais rápida.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* Timeline */}
        <section>
          <SectionTitle index="02" overline="Trajetória" title="A história" className="mb-10" />
          <Timeline />
        </section>

        {/* Domínios */}
        <section>
          <SectionTitle index="03" overline="Expertise" title="Três domínios, uma cabeça" className="mb-8" />
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {domains.map(({ Icon, title, text, chips }) => (
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
                      <span
                        key={chip}
                        className="rounded-none border border-border dark:border-white/10 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Como eu trabalho */}
        <section>
          <SectionTitle index="04" overline="Método" title="Como eu trabalho" className="mb-8" />
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
            {principles.map(({ Icon, title, text }) => (
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
            ))}
          </RevealGroup>
        </section>

        {/* Na prática — o agente e a antecipação */}
        <section>
          <SectionTitle index="05" overline="Na prática" title="O que isso vira no dia a dia" className="mb-8" />

          {/* O dado bruto que alimenta os modelos */}
          <Reveal className="mb-6">
            <TelemetryStrip />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AgentChatDemo />

            <Reveal delay={0.15}>
              <figure className="h-full border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] flex flex-col">
                <figcaption className="px-5 py-3 border-b border-border dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Linha do tempo de um evento · exemplo ilustrativo
                  </span>
                </figcaption>
                <div className="flex-1 flex flex-col justify-center gap-8 px-6 py-8">
                  {/* trilho com marcos */}
                  <div className="relative pt-1 pb-9">
                    <div className="h-[2px] bg-border dark:bg-white/10" />
                    <motion.div
                      className="absolute top-1 left-0 h-[2px] bg-foreground origin-left w-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                    {[
                      { pos: "4%", label: "Desvio detectado", sub: "modelo denuncia", color: "var(--risk-warning)", delay: 0.2 },
                      { pos: "38%", label: "Consenso do ensemble", sub: "3/3 modelos", color: "var(--risk-critical)", delay: 0.7 },
                      { pos: "68%", label: "Intervenção planejada", sub: "OS + peça + janela", color: "var(--foreground)", delay: 1.2 },
                      { pos: "96%", label: "Falha evitada", sub: "que nunca aconteceu", color: "var(--muted-foreground)", delay: 1.7 },
                    ].map(({ pos, label, sub, color, delay }) => (
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
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-7">
                    O valor do meu trabalho se mede pelo intervalo entre o primeiro marco e o
                    último: <span className="text-foreground font-medium">dias de antecedência</span>{" "}
                    para transformar o que seria uma emergência de madrugada em manutenção
                    de agenda. Para o executivo, isso é custo evitado e disponibilidade;
                    para o time técnico, é dormir em paz.
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>

          {/* Replay: a tag desvia, o sunburst cresce, o agente alerta */}
          <Reveal className="mt-6">
            <IncidentReplayShowcase />
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="rounded-none border border-border bg-muted/40 p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
              Quer ver isso aplicado?
            </h2>
            <p className="text-muted-foreground leading-7 max-w-2xl mx-auto mb-7">
              O estudo de caso do sistema de monitoramento preditivo mostra o pipeline completo —
              do sensor na subestação ao alerta na tela.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/projetos"
                className="group inline-flex items-center gap-2 h-12 px-7 font-semibold rounded-none bg-foreground text-background hover:opacity-85 transition-opacity duration-200"
              >
                Ver os projetos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 h-12 px-6 font-medium rounded-none border border-border dark:border-white/15 hover:bg-accent transition-colors duration-200"
              >
                Falar comigo
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
