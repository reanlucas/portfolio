"use client"

import { motion } from "motion/react"
import { Bot, Check, UserRound } from "lucide-react"
import { useT } from "@/i18n/context"

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
  const t = useT()
  const a = t.agent
  return (
    <div className={`border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] flex flex-col ${className ?? ""}`}>
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border dark:border-white/10">
        <Bot size={15} />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{a.header}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
          {a.online}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <motion.div {...item(0)} className="flex items-start gap-2.5 self-end max-w-[85%]">
          <div className="bg-foreground text-background px-3.5 py-2.5">
            <p className="text-[13px] leading-5">{a.question}</p>
          </div>
          <span className="flex h-7 w-7 items-center justify-center border border-border shrink-0 mt-0.5">
            <UserRound size={13} />
          </span>
        </motion.div>

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

        <motion.div {...item(2.2)} className="flex items-start gap-2.5 max-w-[92%] -mt-9">
          <span className="flex h-7 w-7 items-center justify-center border border-border bg-muted shrink-0 mt-0.5">
            <Bot size={13} />
          </span>
          <div className="border border-border dark:border-white/10 bg-muted/60 dark:bg-white/5 px-3.5 py-2.5">
            <p className="text-[13px] leading-6">
              {a.answer.a}<span className="font-semibold">{a.answer.asset}</span>{a.answer.b}
              <span className="font-semibold" style={{ color: "var(--risk-critical)" }}>{a.answer.alert}</span>
              {a.answer.c}<span className="font-semibold">{a.answer.value}</span>{a.answer.d}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-2">{a.sources}</p>
          </div>
        </motion.div>

        <motion.div {...item(2.8)} className="flex flex-wrap gap-2 pl-9">
          {a.actions.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 border border-foreground/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider hover:border-foreground hover:bg-accent transition-colors cursor-default"
            >
              <Check size={11} /> {label}
            </span>
          ))}
        </motion.div>

        <motion.p {...item(3.2)} className="text-[11px] text-muted-foreground leading-5 pl-9 mt-auto">
          {a.footA}<span className="text-foreground font-medium">{a.footB}</span>{a.footC}
        </motion.p>
      </div>
    </div>
  )
}
