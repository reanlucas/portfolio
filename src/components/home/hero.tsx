"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NameReveal } from "@/components/motion/primitives"
import Hero3D from "@/components/hero3D"
import { githubAvatar, githubProfileLink } from "@/lib/socialMediaLinks"
import { useLocale } from "@/i18n/context"

export default function Hero() {
  const { t, href } = useLocale()
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
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={reduced ? undefined : { y: canvasY, opacity: canvasOpacity }}
      >
        <Hero3D />
      </motion.div>

      <motion.div
        className="relative w-full max-w-6xl mx-auto px-6 md:px-10 py-24 flex flex-col gap-7"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Identificação */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5"
        >
          <Link href={githubProfileLink} target="_blank" className="shrink-0" aria-label="GitHub">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-none border border-border dark:border-white/15 grayscale hover:grayscale-0 transition-all duration-500">
              <AvatarImage src={githubAvatar} alt={t.hero.avatarAlt} />
              <AvatarFallback className="rounded-none font-display font-extrabold">RL</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              {t.hero.role}
            </p>
            <div className="flex items-center gap-2.5 text-xs md:text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t.hero.status}
            </div>
          </div>
        </motion.div>

        <NameReveal words={words} className="!justify-start" />

        {/* Manchete em três tempos */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-display text-xl md:text-3xl font-bold tracking-tight leading-tight max-w-3xl"
        >
          {t.hero.headline.map((beat, i) => (
            <span key={beat} className={i === t.hero.headline.length - 1 ? "text-foreground" : "text-muted-foreground"}>
              {beat}{" "}
            </span>
          ))}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          {t.hero.pitch}
        </motion.p>

        {/* Fatos — linha executiva */}
        <motion.dl
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border dark:bg-white/10 border border-border dark:border-white/10 max-w-3xl"
        >
          {t.hero.facts.map(({ k, v }) => (
            <div key={k} className="bg-background/90 backdrop-blur-sm px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{k}</dt>
              <dd className="text-sm font-semibold">{v}</dd>
            </div>
          ))}
        </motion.dl>

        {/* CTA */}
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
            {t.hero.ctaPrimary}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <Link
            href={href("projects")}
            className="inline-flex items-center gap-2 h-13 px-7 py-3.5 font-semibold text-sm uppercase tracking-widest border border-foreground/25 hover:border-foreground hover:bg-accent transition-colors duration-200"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Prova — o que já está no ar */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          {t.hero.proof.map((p) => (
            <li key={p} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 bg-foreground/60 inline-block" />
              {p}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        animate={reduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <svg className="dark:text-white/30 text-black/25" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
