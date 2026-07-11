"use client"
import { motion } from "motion/react"
import { HeroNeuralLeft, MidNeuralRight, LSTMNeural, DeepNeural } from "@/components/neuralDecor"
import { FaLock, FaPython, FaWhatsapp } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { SiPytorch, SiPlotly, SiGooglecloud, SiTerraform } from "react-icons/si";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ComponentType } from "react";
import { RevealGroup, RevealItem, SectionTitle } from "@/components/motion/primitives";

type Project = {
  title: string
  category: string
  description: string
  icons: { Icon: ComponentType<{ size?: number | string; className?: string }>, label: string }[]
  badge?: string
  caseHref?: string
}

const projects: Project[] = [
  {
    title: "Plataforma de Gestão de Ativos e Riscos",
    category: "Deep Learning · Setor Elétrico",
    badge: "Em produção",
    description:
      "Plataforma em nuvem (GCP + AlloyDB) que vigia ativos de UHEs e subestações de uma das maiores companhias de energia do Brasil, 24/7. Detecção por IA — redes neurais recorrentes e convolucionais — validada por modelos clássicos (Random Forest, KNN) num ensemble que dá score de risco por tag de telemetria, tudo integrado ao ecossistema corporativo: SAP, Hitachi NM, Oracle SQL, Keycloak, data lakes e Denodo. A falha é sinalizada antes de acontecer.",
    icons: [
      { Icon: FaPython, label: "Python" },
      { Icon: SiPytorch, label: "PyTorch" },
      { Icon: SiGooglecloud, label: "GCP · AlloyDB" },
      { Icon: SiTerraform, label: "Terraform" },
      { Icon: SiPlotly, label: "Plotly" },
    ],
    caseHref: "/projetos",
  },
  {
    title: "Agente de IA & LLMs",
    category: "IA Generativa · Vertex AI",
    description:
      "Agente de IA com LLM integrado ao Vertex AI e a modelos open source servidos em infraestrutura própria — roteamento por custo, latência e sensibilidade do dado. Responde sobre ativos e risco em linguagem natural via function calling e RAG, e é o mesmo agente que dispara alertas de anomalia por WhatsApp e e-mail para a equipe de manutenção.",
    icons: [
      { Icon: SiGooglecloud, label: "Vertex AI" },
      { Icon: FaPython, label: "Python" },
      { Icon: FaWhatsapp, label: "Alertas WhatsApp" },
    ],
    caseHref: "/projetos",
  },
  {
    title: "Outros Projetos",
    category: "Confidencial",
    description:
      "O que constrói vantagem competitiva de verdade raramente pode ir para o GitHub. Os demais projetos — integrações industriais, pipelines de dados e automações em ambiente crítico — são confidenciais por dever ético e profissional. Quer saber como esse tipo de sistema funciona por dentro? Me chama e conversamos até onde a confidencialidade permite.",
    icons: [{ Icon: VscCode, label: "Código" }],
  },
]

export default function Projects() {
  return (
    <div className="w-full overflow-x-hidden bg-background mx-auto relative">
      <HeroNeuralLeft className="absolute -left-10 top-0 w-72 md:w-[28rem] dark:opacity-[0.20] opacity-[0.25] pointer-events-none" />
      <MidNeuralRight className="absolute -right-10 bottom-0 w-72 md:w-[28rem] dark:opacity-[0.20] opacity-[0.25] pointer-events-none" />
      <LSTMNeural className="absolute left-1/4 top-1/2 w-64 md:w-[26rem] dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />
      <DeepNeural className="absolute right-1/4 -bottom-10 w-72 md:w-[30rem] dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 px-6 py-10 relative">
        <SectionTitle index="04" overline="Trabalho" title="Meus Projetos" />

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
          {projects.map((project) => (
            <RevealItem key={project.title} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative h-full rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-6 flex flex-col gap-4 overflow-hidden"
              >
                {/* Acento no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none pointer-events-none" />

                {/* Cabeçalho */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-widest">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-none border border-border bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold mt-1">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end max-w-[140px]">
                    {project.icons.map(({ Icon, label }, i) => (
                      <div
                        key={i}
                        title={label}
                        className="p-2 rounded-lg dark:bg-white/8 bg-black/5 hover:bg-accent transition-colors cursor-default"
                      >
                        <Icon size={15} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full dark:bg-white/10 bg-black/10" />

                <p className="text-sm text-muted-foreground leading-7 flex-1">
                  {project.description}
                </p>

                {project.caseHref ? (
                  <Link
                    href={project.caseHref}
                    className="group/link inline-flex items-center gap-2 w-fit text-sm font-medium text-foreground hover:underline underline-offset-4 mt-auto"
                  >
                    Estudo de caso completo
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 w-fit text-sm text-muted-foreground mt-auto">
                    <FaLock size={13} />
                    Código privado
                  </div>
                )}
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  )
}
