"use client"

import { motion } from "motion/react"

/*
  Faixa de telemetria ilustrativa — três sparklines que se desenham no
  scroll, uma por canal de sensor. O tipo de dado que alimenta meus modelos.
*/

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SW = 220, SH = 44
function spark(seed: number, wobble: number) {
  const rand = mulberry32(seed)
  const pts = Array.from({ length: 28 }, (_, i) => 0.5 + Math.sin(i * 0.55 + seed) * wobble + (rand() - 0.5) * 0.25)
  return pts.map((v, i) => `${i === 0 ? "M" : "L"}${((i / 27) * SW).toFixed(1)},${(4 + (1 - v) * (SH - 8)).toFixed(1)}`).join(" ")
}

const channels = [
  { label: "Vibração", value: "2.3 mm/s", path: spark(11, 0.28) },
  { label: "Temp. Óleo", value: "58.2 °C", path: spark(29, 0.18) },
  { label: "Corrente", value: "402 A", path: spark(47, 0.22) },
]

export default function TelemetryStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border dark:bg-white/10 border border-border dark:border-white/10">
      {channels.map(({ label, value, path }, i) => (
        <div key={label} className="bg-background px-5 py-4 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
            <span className="font-display text-sm font-extrabold">{value}</span>
          </div>
          <svg viewBox={`0 0 ${SW} ${SH}`} className="w-full" aria-hidden>
            <motion.path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.6, delay: i * 0.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
