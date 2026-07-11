"use client"

import { motion } from "motion/react"
import { Bot, Check, UserRound } from "lucide-react"

/*
  Exemplificação do agente de IA em ação — conversa ilustrativa.
  Sequência coreografada no scroll: pergunta → digitando → resposta
  com fontes → ações executáveis via function calling.
*/

const item = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function AgentChatDemo({ className }: { className?: string }) {
  return (
    <div className={`border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] flex flex-col ${className ?? ""}`}>
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-white/10">
        <Bot size={15} />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Agente de IA · exemplo ilustrativo
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
          online
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Pergunta do engenheiro */}
        <motion.div {...item(0)} className="flex items-start gap-2.5 self-end max-w-[85%]">
          <div className="bg-foreground text-background px-3.5 py-2.5">
            <p className="text-[13px] leading-5">Como está o Trafo 01 agora?</p>
          </div>
          <span className="flex h-7 w-7 items-center justify-center border border-border shrink-0 mt-0.5">
            <UserRound size={13} />
          </span>
        </motion.div>

        {/* Digitando... some quando a resposta chega */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, delay: 0.6, times: [0, 0.15, 0.85, 1] }}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-border bg-muted shrink-0">
            <Bot size={13} />
          </span>
          <div className="flex gap-1 px-3.5 py-3 border border-border dark:border-white/10 bg-muted/60 dark:bg-white/5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground inline-block"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Resposta com fontes */}
        <motion.div {...item(2.2)} className="flex items-start gap-2.5 max-w-[92%] -mt-9">
          <span className="flex h-7 w-7 items-center justify-center border border-border bg-muted shrink-0 mt-0.5">
            <Bot size={13} />
          </span>
          <div className="border border-border dark:border-white/10 bg-muted/60 dark:bg-white/5 px-3.5 py-2.5">
            <p className="text-[13px] leading-6">
              O <span className="font-semibold">Trafo 01</span> opera com{" "}
              <span className="font-semibold" style={{ color: "var(--risk-critical)" }}>1 alerta ativo</span>:
              Temp. Óleo em <span className="font-semibold">74.6°C</span> — 20% acima da predição
              (62.1°C), em alta há 6h. Corrente e temperatura de enrolamento normais.
              O ensemble está em consenso 3/3. Recomendo inspecionar a refrigeração
              e antecipar a janela de manutenção.
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-2">
              fontes: 3 tags · histórico 30d · 2 OS anteriores no SAP
            </p>
          </div>
        </motion.div>

        {/* Ações — function calling */}
        <motion.div {...item(2.8)} className="flex flex-wrap gap-2 pl-9">
          {["Abrir OS no SAP", "Ver tag no dashboard", "Notificar equipe"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 border border-foreground/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider hover:border-foreground hover:bg-accent transition-colors cursor-default"
            >
              <Check size={11} /> {label}
            </span>
          ))}
        </motion.div>

        <motion.p {...item(3.2)} className="text-[11px] text-muted-foreground leading-5 pl-9 mt-auto">
          Function calling dá ao agente acesso controlado às APIs da plataforma —
          ele não só responde: <span className="text-foreground font-medium">executa</span>.
        </motion.p>
      </div>
    </div>
  )
}
