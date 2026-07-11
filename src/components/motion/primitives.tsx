"use client"

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  wrap,
  type Variants,
} from "motion/react"
import { ReactNode, useRef, useState } from "react"

/* ─── Reveal ──────────────────────────────────────────────────────────────
   Entrada padrão de seção: sobe + desfoca → nítido, disparada pelo scroll.
   Com `stagger`, os filhos diretos entram em cascata.                      */

const revealItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: revealItem.hidden,
        show: {
          ...(revealItem.show as object),
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealItem}>
      {children}
    </motion.div>
  )
}

/* ─── Marquee ─────────────────────────────────────────────────────────────
   Loop infinito 100% Motion: useAnimationFrame move um motion value e
   wrap() o dobra no meio do trilho — duas cópias idênticas, reset
   invisível. Pausa suave no hover e respeita prefers-reduced-motion.      */

export function Marquee({
  children,
  speed = 40,
  direction = 1,
  className,
}: {
  children: ReactNode
  speed?: number // px por segundo
  direction?: 1 | -1
  className?: string
}) {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const velocity = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    // desacelera até parar no hover em vez de congelar de supetão
    velocity.current += ((hovered ? 0 : 1) - velocity.current) * Math.min(1, (delta / 1000) * 6)
    const half = (trackRef.current?.scrollWidth ?? 0) / 2
    if (!half) return
    const next = x.get() - direction * speed * velocity.current * (delta / 1000)
    x.set(wrap(-half, 0, next))
  })

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div ref={trackRef} className="flex w-max will-change-transform" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  )
}

/* ─── NameReveal ──────────────────────────────────────────────────────────
   Letras entram uma a uma: sobem, desembaçam e assentam com mola.         */

export function NameReveal({
  words,
  className,
}: {
  words: { text: string; className?: string }[]
  className?: string
}) {
  return (
    <motion.h1
      className={`flex flex-wrap justify-center gap-x-[0.35em] ${className ?? ""}`}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } }}
      aria-label={words.map((w) => w.text).join(" ")}
    >
      {words.map((word, wi) => (
        <span key={wi} className={`inline-flex ${word.className ?? ""}`} aria-hidden>
          {word.text.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.6em", rotateX: 45, filter: "blur(8px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                  transition: { type: "spring", stiffness: 320, damping: 26 },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

/* ─── ScrollProgress ──────────────────────────────────────────────────────
   Fio de progresso da página, colado no topo, com mola.                   */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-foreground"
      style={{ scaleX }}
      aria-hidden
    />
  )
}

/* ─── ParallaxY ───────────────────────────────────────────────────────────
   Desloca o filho verticalmente conforme ele cruza a viewport.            */

export function ParallaxY({
  children,
  from = 40,
  to = -40,
  className,
}: {
  children: ReactNode
  from?: number
  to?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])
  const reduced = useReducedMotion()
  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </motion.div>
  )
}

/* ─── SectionTitle ────────────────────────────────────────────────────────
   Título padrão das seções: overline mono numerada + display Syne +
   sublinhado que cresce guiado pelo scroll.                               */

export function SectionTitle({
  index,
  overline,
  title,
  className,
}: {
  index: string
  overline: string
  title: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 45%"] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <div ref={ref} className={className}>
      <Reveal>
        <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-2">
          {index} · {overline}
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight uppercase">{title}</h2>
      </Reveal>
      <motion.div className="mt-4 h-[2px] origin-left bg-foreground" style={{ scaleX }} />
    </div>
  )
}
