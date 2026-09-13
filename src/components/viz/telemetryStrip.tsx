"use client"

import { motion } from "motion/react"
import { mulberry32 } from "@/lib/assetData"
import { useT } from "@/i18n/context"

/*
  Faixa de telemetria ilustrativa — três sparklines que se desenham no
  scroll, uma por canal de sensor. O tipo de dado que alimenta meus modelos.
*/

const SW = 220, SH = 44
function spark(seed: number, wobble: number) {
  const rand = mulberry32(seed)
  const pts = Array.from({ length: 28 }, (_, i) => 0.5 + Math.sin(i * 0.55 + seed) * wobble + (rand() - 0.5) * 0.25)
  return pts.map((v, i) => `${i === 0 ? "M" : "L"}${((i / 27) * SW).toFixed(1)},${(4 + (1 - v) * (SH - 8)).toFixed(1)}`).join(" ")
}

const PATHS = [spark(11, 0.28), spark(29, 0.18), spark(47, 0.22)]

export default function TelemetryStrip() {
  const t = useT()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border dark:bg-white/10 border border-border dark:border-white/10">
      {t.telemetry.channels.map(({ label, value }, i) => (
        <div key={label} className="bg-background px-5 py-4 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
            <span className="font-display text-sm font-extrabold">{value}</span>
          </div>
          <svg viewBox={`0 0 ${SW} ${SH}`} className="w-full" aria-hidden>
            <motion.path
              d={PATHS[i]}
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
