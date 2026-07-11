"use client"

import { Marquee, SectionTitle } from "@/components/motion/primitives"
import { MidNeuralLeft, MidNeuralRight } from "@/components/neuralDecor"
import { Separator } from "@/components/ui/separator"

const rowA = [
  "Redes Neurais", "LSTM", "AutoEncoders", "Transformers", "CNNs",
  "Random Forest", "KNN", "PyTorch", "Risco de Ativos", "KPIs",
  "Data Science", "Python", "Machine Learning", "LLMs", "Vertex AI",
  "Agentes de IA", "NumPy", "Flask", "Plotly",
]

const rowB = [
  "Google Cloud", "AlloyDB", "Terraform", "Infraestrutura", "DevOps",
  "Docker", "Linux", "Keycloak", "Denodo", "Data Lakes", "NEXT.JS",
  "TypeScript", "PostgreSQL", "Oracle SQL", "SAP", "Hitachi NM",
  "Prot. Industriais", "OCP / ICCP", "Web Apis", "Ui / Ux", "C++",
]

function Chip({ text }: { text: string }) {
  return (
    <div
      className="px-5 text-sm dark:bg-white/5 bg-black/5 dark:text-white text-center
        font-semibold leading-[3.4rem] border border-border/40 dark:border-white/10 mx-1.5 shrink-0
        transition-colors duration-200 hover:bg-accent/60 hover:border-foreground/40 tracking-tight"
    >
      {text}
    </div>
  )
}

export default function SkillsMarquee() {
  return (
    <section className="relative py-10 overflow-hidden">
      <MidNeuralLeft className="absolute -left-10 top-0 w-72 md:w-[26rem] dark:opacity-[0.18] opacity-[0.24] pointer-events-none" />
      <MidNeuralRight className="absolute -right-10 top-0 w-72 md:w-[26rem] dark:opacity-[0.18] opacity-[0.24] pointer-events-none" />

      <Separator orientation="horizontal" className="max-w-[90vw] m-auto dark:bg-white/20 bg-black/10 mb-10" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle index="02" overline="Stack" title="Arsenal técnico" className="mb-8" />
      </div>

      {/* Duas esteiras em sentidos opostos — IA numa, engenharia na outra */}
      <div className="flex flex-col gap-3">
        <Marquee speed={42} direction={1} className="py-1">
          {rowA.map((t) => <Chip key={t} text={t} />)}
        </Marquee>
        <Marquee speed={34} direction={-1} className="py-1">
          {rowB.map((t) => <Chip key={t} text={t} />)}
        </Marquee>
      </div>
    </section>
  )
}
