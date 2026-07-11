"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useRef } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { NameReveal } from "@/components/motion/primitives"
import Hero3D from "@/components/hero3D"
import { githubProfileLink } from "@/lib/socialMediaLinks"

const facts = [
  { k: "Especialidade", v: "Redes neurais em produção" },
  { k: "Setor", v: "Energia · UHEs · Subestações" },
  { k: "Stack", v: "Do sensor ao pixel" },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // O hero responde ao scroll: conteúdo sobe e esmaece, a rede 3D
  // fica para trás em parallax e some mais devagar.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const words = [
    {
      text: "REAN",
      className:
        "font-display text-5xl md:text-7xl xl:text-8xl tracking-tight font-extrabold text-foreground",
    },
    {
      text: "LUCAS",
      className:
        "font-display text-5xl md:text-7xl xl:text-8xl tracking-tight font-extrabold text-muted-foreground",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center bg-gradient-to-b dark:from-black from-zinc-50 to-background overflow-hidden"
    >
      {/* Fundo — rede neural 3D monocromática com parallax de scroll */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={reduced ? undefined : { y: canvasY, opacity: canvasOpacity }}
      >
        <Hero3D />
      </motion.div>

      <motion.div
        className="relative w-full max-w-6xl mx-auto px-6 md:px-10 py-24 flex flex-col gap-8"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Identificação — avatar reto, sem ornamento */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5"
        >
          <Link href={githubProfileLink} className="shrink-0">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-none border border-border dark:border-white/15 grayscale">
              <AvatarImage src="https://avatars.githubusercontent.com//luckyluclucas" />
            </Avatar>
          </Link>
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              Engenheiro de Machine Learning · Full-Stack
            </p>
            <div className="flex items-center gap-2.5 text-xs md:text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Working at COPEL · GET
            </div>
          </div>
        </motion.div>

        {/* Nome — letras em cascata, sem glow */}
        <NameReveal words={words} className="!justify-start" />

        {/* Descrição */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed"
        >
          Coloco redes neurais para vigiar ativos críticos da rede de energia:
          modelos que escutam vibração, temperatura e corrente — e enxergam a
          falha antes de ela acontecer. Do sensor ao modelo, do modelo ao pixel.
        </motion.p>

        {/* Fatos — linha executiva */}
        <motion.dl
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border dark:bg-white/10 border border-border dark:border-white/10 max-w-3xl"
        >
          {facts.map(({ k, v }) => (
            <div key={k} className="bg-background/90 backdrop-blur-sm px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{k}</dt>
              <dd className="text-sm font-semibold">{v}</dd>
            </div>
          ))}
        </motion.dl>

        {/* CTA — retos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 h-13 px-8 py-3.5 bg-foreground text-background font-semibold text-sm uppercase tracking-widest hover:opacity-85 transition-opacity duration-200"
          >
            Vamos conversar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 h-13 px-7 py-3.5 font-semibold text-sm uppercase tracking-widest border border-foreground/25 hover:border-foreground hover:bg-accent transition-colors duration-200"
          >
            Ver projetos
          </Link>
        </motion.div>
      </motion.div>

      {/* Seta de scroll */}
      <motion.div
        animate={reduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <svg
          className="dark:text-white/30 text-black/25"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
