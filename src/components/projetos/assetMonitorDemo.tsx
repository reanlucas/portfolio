"use client"

import { motion, AnimatePresence, useInView } from "motion/react"
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react"
import { useTheme } from "next-themes"
import { FaWhatsapp } from "react-icons/fa"
import { Bot, Check, CornerLeftUp } from "lucide-react"
import { Reveal } from "@/components/motion/primitives"
import { useLocale } from "@/i18n/context"
import { SunburstCanvas, healthColor, riskColor } from "@/components/viz/sunburst3D"
import {
  ALL_TAGS, ASSETS, COMPANY_NAME, DEFAULT_TAG, DETECTORS, INDEX, REPLAY_TAG_ID, ROOT_ID, SERIES_N, TREE,
  childrenOf, detectorScores, getNode, mulberry32, pathTo, pick, riskOf, tagCountOf, tagSeries, worstTagIn,
  type FlatTag, type NodeKind, type Risk, type TagNode, type TreeNode,
} from "@/lib/assetData"

/*
  Demo interativa do monitoramento — dados ilustrativos.
  O sunburst navega a árvore: empresa → ativo → classe de equipamento →
  equipamento → tag. Clicar num nó com filhos desce um nível; clicar numa
  tag redesenha o gráfico de predição × real e revota o ensemble.
*/

const riskVar: Record<Risk, string> = {
  low: "var(--muted-foreground)",
  warn: "var(--risk-warning)",
  critical: "var(--risk-critical)",
}

const LEVEL_ORDER: Exclude<NodeKind, "company">[] = ["asset", "class", "equipment", "tag"]

function useMotionOK() {
  const [motionOK, setMotionOK] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotionOK(!mq.matches)
    const onChange = () => setMotionOK(!mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return motionOK
}

/* ─── Rótulos do primeiro anel — posicionados pela cena a cada frame ────── */

function RingLabels({
  nodes, dark, labelRefs,
}: {
  nodes: TreeNode[]
  dark: boolean
  labelRefs: RefObject<Map<string, HTMLDivElement | null>>
}) {
  const { locale } = useLocale()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {nodes.map((node) => {
        const risk = riskOf(node.id)
        const badge =
          node.kind === "asset" ? `${node.health}%`
          : node.kind === "tag" ? `${node.real}${node.unit}`
          : String(tagCountOf(node.id))
        const badgeColor =
          node.kind === "asset"
            ? node.health < 90 ? healthColor(node.health, dark) : "var(--foreground)"
            : risk !== "low" ? riskColor(risk, dark) : "var(--foreground)"

        return (
          <div
            key={node.id}
            ref={(el) => { labelRefs.current.set(node.id, el) }}
            className="absolute left-0 top-0 will-change-transform"
            style={{ transform: "translate3d(-999px,-999px,0)", opacity: 0 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-border/70 dark:border-white/15 bg-background/80 backdrop-blur-[2px] px-2 py-1">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-muted-foreground">
                {pick(node.name, locale)}
              </span>
              <span className="font-mono text-[9px] font-bold ml-1.5" style={{ color: badgeColor }}>
                {badge}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Gráfico predição × real da tag selecionada ───────────────────────── */

const W = 640, H = 250, PL = 46, PR = 52, PT = 16, PB = 28

export function TagChart({ tag }: { tag: FlatTag }) {
  const { t, locale } = useLocale()
  const { pred, real } = useMemo(() => tagSeries(tag), [tag])
  const all = [...pred, ...real]
  const vmin = Math.min(...all) * 0.985
  const vmax = Math.max(...all) * 1.015
  const px = (i: number) => PL + (i / (SERIES_N - 1)) * (W - PL - PR)
  const py = (v: number) => PT + (1 - (v - vmin) / (vmax - vmin)) * (H - PT - PB)
  const path = (s: number[]) => s.map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ")
  const ticks = [vmin, (vmin + vmax) / 2, vmax]
  const diverging = real.map((v, i) => ({ v, i })).filter(({ v }, k) => Math.abs(v - pred[k]) / pred[k] > 0.08)
  const realLabel = t.demo.chart.real.toUpperCase()
  const predLabel = t.demo.chart.pred.toUpperCase().slice(0, 4)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label={t.demo.chart.aria(pick(tag.name, locale), pick(tag.where, locale))}>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={PL} x2={W - PR} y1={py(v)} y2={py(v)} stroke="currentColor" strokeOpacity="0.08" />
          <text x={PL - 6} y={py(v) + 3} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
            {v >= 100 ? v.toFixed(0) : v.toFixed(1)}
          </text>
        </g>
      ))}

      <motion.path
        key={`pred-${tag.id}`}
        d={path(pred)}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.path
        key={`real-${tag.id}`}
        d={path(real)}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.15 }}
      />

      {diverging.map(({ v, i }, k) => (
        <motion.circle
          key={`${tag.id}-${i}`}
          cx={px(i)} cy={py(v)} r="3.5"
          fill="var(--risk-critical)"
          stroke="var(--background)" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 + k * 0.08, type: "spring", stiffness: 400, damping: 16 }}
        >
          <title>{t.demo.chart.windowTitle(i, `${v.toFixed(1)}${tag.unit}`, `${pred[i].toFixed(1)}${tag.unit}`)}</title>
        </motion.circle>
      ))}

      <text x={W - PR + 6} y={py(real[SERIES_N - 1]) + 3} fontSize="9" fontWeight="700" fill="currentColor" fontFamily="var(--font-geist-mono)">
        {realLabel}
      </text>
      <text x={W - PR + 6} y={py(pred[SERIES_N - 1]) + (Math.abs(py(pred[SERIES_N - 1]) - py(real[SERIES_N - 1])) < 12 ? 14 : 3)} fontSize="9" fill="currentColor" fillOpacity="0.55" fontFamily="var(--font-geist-mono)">
        {predLabel}
      </text>

      <text x={PL} y={H - 8} fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
        {t.demo.chart.axis}
      </text>
    </svg>
  )
}

/* ─── Ensemble: LSTM-AE + KNN + Random Forest votando na tag ───────────── */

function EnsemblePanel({ tag }: { tag: FlatTag }) {
  const { t, locale } = useLocale()
  const scores = useMemo(() => detectorScores(tag), [tag])
  const positives = scores.filter((s) => s > 0.7).length
  const warned = scores.filter((s) => s > 0.4).length
  const e = t.demo.ensemble

  const verdictOf = (s: number) =>
    s > 0.7 ? { label: e.verdict.anomaly, color: "var(--risk-critical)" }
    : s > 0.4 ? { label: e.verdict.warn, color: "var(--risk-warning)" }
    : { label: e.verdict.normal, color: "var(--muted-foreground)" }

  return (
    <figure className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03]">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {e.title} · {pick(tag.fullPath, locale)} · {pick(tag.name, locale)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {e.scale}
        </span>
      </figcaption>

      <div className="px-5 py-5 flex flex-col gap-4">
        {DETECTORS.map(({ key, name }, i) => {
          const s = scores[i]
          const verdict = verdictOf(s)
          return (
            <div key={key} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr_7rem] items-center gap-x-4 gap-y-1">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-tight leading-tight">{name}</p>
                <p className="text-[11px] text-muted-foreground leading-4">{e.detectors[key]}</p>
              </div>
              <div className="h-2.5 bg-border/60 dark:bg-white/8 relative overflow-hidden">
                <motion.div
                  key={`${tag.id}-${key}`}
                  className="absolute inset-y-0 left-0"
                  style={{ background: verdict.color === "var(--muted-foreground)" ? "color-mix(in oklab, var(--foreground) 45%, var(--background))" : verdict.color }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${s * 100}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-right" style={{ color: verdict.color }}>
                {s.toFixed(2)} · {verdict.label}
              </p>
            </div>
          )
        })}

        <AnimatePresence mode="wait">
          <motion.p
            key={`${tag.id}-verdict`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-border dark:border-white/10 pt-4 text-[12px] leading-6 text-muted-foreground"
          >
            {positives >= 2 ? (
              <>
                <span className="font-semibold" style={{ color: "var(--risk-critical)" }}>{e.consensus(positives)}</span>
                {e.consensusRest}
                <span className="font-semibold text-foreground">{e.channels}</span>
                {e.consensusEnd}
              </>
            ) : warned >= 1 ? (
              <>
                <span className="font-semibold" style={{ color: "var(--risk-warning)" }}>{e.divergence}</span>
                {e.divergenceRest}
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">{e.normal}</span>
                {e.normalRest}
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </figure>
  )
}

/* ─── Replay simulado: do desvio ao alerta no WhatsApp ─────────────────────
   Loop de ~19s dirigido por um relógio único; todos os painéis derivam do
   mesmo t: a tag desvia, o segmento 3D cresce e avermelha, o ensemble
   atinge consenso, o agente de IA acorda e digita o alerta.               */

const CYCLE = 19
const RN = 60

const replaySeries = (() => {
  const rand = mulberry32(777)
  const pred: number[] = []
  const real: number[] = []
  for (let i = 0; i < RN; i++) {
    const p = 58 + Math.sin(i * 0.3) * 0.5 + (rand() - 0.5) * 0.3
    const ramp = i > 32 ? ((i - 32) / (RN - 33)) ** 1.5 : 0
    pred.push(p)
    real.push(p + (rand() - 0.5) * 0.4 + ramp * 10.5)
  }
  return { pred, real }
})()

function ReplayChart({ t }: { t: number }) {
  const { t: d } = useLocale()
  const CW = 560, CH = 250, cPL = 44, cPR = 46, cPT = 16, cPB = 26
  const vmin = 55, vmax = 71
  const px = (i: number) => cPL + (i / (RN - 1)) * (CW - cPL - cPR)
  const py = (v: number) => cPT + (1 - (v - vmin) / (vmax - vmin)) * (CH - cPT - cPB)
  const visible = Math.max(8, Math.min(RN, Math.floor((t / 10) * RN)))
  const path = (s: number[]) =>
    s.slice(0, visible).map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ")
  const dots = replaySeries.real
    .map((v, i) => ({ v, i }))
    .filter(({ v, i }) => i < visible && v - replaySeries.pred[i] > 4)
  const realLabel = d.demo.chart.real.toUpperCase()
  const predLabel = d.demo.chart.pred.toUpperCase().slice(0, 4)

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" role="img" aria-label={d.demo.replay.chartAria}>
      {[56, 60, 64, 68].map((v) => (
        <g key={v}>
          <line x1={cPL} x2={CW - cPR} y1={py(v)} y2={py(v)} stroke="currentColor" strokeOpacity="0.08" />
          <text x={cPL - 6} y={py(v) + 3} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
            {v}
          </text>
        </g>
      ))}
      <path d={path(replaySeries.pred)} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="5 6" strokeLinejoin="round" />
      <path d={path(replaySeries.real)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {dots.map(({ v, i }) => (
        <circle key={i} cx={px(i)} cy={py(v)} r="3.5" fill="var(--risk-critical)" stroke="var(--background)" strokeWidth="1.5" />
      ))}
      {visible > 2 && (
        <>
          <text x={px(visible - 1) + 5} y={py(replaySeries.real[visible - 1]) + 3} fontSize="9" fontWeight="700" fill="currentColor" fontFamily="var(--font-geist-mono)">
            {realLabel}
          </text>
          <text x={px(visible - 1) + 5} y={py(replaySeries.pred[visible - 1]) + (Math.abs(py(replaySeries.pred[visible - 1]) - py(replaySeries.real[visible - 1])) < 12 ? 14 : 3)} fontSize="9" fill="currentColor" fillOpacity="0.55" fontFamily="var(--font-geist-mono)">
            {predLabel}
          </text>
        </>
      )}
      <text x={cPL} y={CH - 8} fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
        {d.demo.replay.chartLabel}
      </text>
    </svg>
  )
}

const AGENT_STEP_TIMES = [8.7, 9.6, 10.6]

function IncidentReplay({ dark, motionOK }: { dark: boolean; motionOK: boolean }) {
  const { t: d } = useLocale()
  const r = d.demo.replay
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-60px" })
  const [t, setT] = useState(0)
  const tRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    if (!motionOK) {
      tRef.current = 17
      setT(17)
      return
    }
    const start = performance.now()
    const id = setInterval(() => {
      const v = ((performance.now() - start) / 1000) % CYCLE
      tRef.current = v
      setT(v)
    }, 100)
    return () => clearInterval(id)
  }, [inView, motionOK])

  const phase =
    t < 3 ? { label: r.phases.normal, color: "var(--muted-foreground)" }
    : t < 8.5 ? { label: r.phases.growing, color: "var(--risk-warning)" }
    : t < 10 ? { label: r.phases.critical, color: "var(--risk-critical)" }
    : t < 12 ? { label: r.phases.agent, color: "var(--risk-critical)" }
    : { label: r.phases.sent, color: "var(--foreground)" }

  const msgChars = Math.floor(r.message.length * Math.min(1, Math.max(0, (t - 12) / 4.5)))
  const msgDone = msgChars >= r.message.length

  return (
    <div ref={ref} className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{r.header}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={phase.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: phase.color }}
          >
            <span className="h-2 w-2 inline-block" style={{ background: phase.color }} />
            {phase.label}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border dark:divide-white/10">
        <div className="p-4 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{r.step1}</p>
          <div className="flex-1 flex items-center">
            <ReplayChart t={t} />
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{r.step2}</p>
          <div className="relative flex-1 min-h-[240px]">
            {inView && (
              <SunburstCanvas
                dark={dark}
                motionOK={motionOK}
                replay={{ tRef, tagId: REPLAY_TAG_ID }}
                dpr={[1, 1.5]}
                frameloop={motionOK ? "always" : "demand"}
                camera={{ position: [0, 0, 7.6], fov: 45 }}
                style={{ pointerEvents: "none" }}
              />
            )}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="font-display text-[10px] font-extrabold tracking-[0.2em]">{COMPANY_NAME}</p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-5 mt-2">{r.caption}</p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">{r.step3}</p>

          <div className="flex flex-col gap-1.5">
            {r.agentSteps.map((label, i) => {
              const at = AGENT_STEP_TIMES[i]
              return (
                <motion.div
                  key={label}
                  animate={{ opacity: t > at ? 1 : 0.25, x: t > at ? 0 : -6 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2 text-[12px]"
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center border shrink-0"
                    style={t > at ? { borderColor: "var(--foreground)", background: "var(--foreground)", color: "var(--background)" } : { borderColor: "var(--border)" }}
                  >
                    {t > at && <Check size={11} strokeWidth={3} />}
                  </span>
                  {label}
                </motion.div>
              )
            })}
          </div>

          <motion.div
            animate={{ opacity: t > 11.8 ? 1 : 0.2, y: t > 11.8 ? 0 : 8 }}
            transition={{ duration: 0.4 }}
            className="flex-1 border border-border dark:border-white/10 bg-background/60 flex flex-col"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border dark:border-white/10">
              <FaWhatsapp size={15} color="#25D366" />
              <span className="text-[11px] font-semibold">{r.group}</span>
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                <Bot size={11} /> {r.agentTag}
              </span>
            </div>
            <div className="p-3">
              <div className="max-w-[95%] border border-border dark:border-white/10 bg-muted/60 dark:bg-white/5 px-3 py-2">
                <p className="text-[11.5px] leading-5 whitespace-pre-line">
                  {r.message.slice(0, msgChars)}
                  {t > 12 && !msgDone && <span className="inline-block w-[6px] h-[12px] bg-foreground align-middle animate-pulse ml-0.5" />}
                </p>
                {msgDone && (
                  <p className="text-right font-mono text-[9px] text-muted-foreground mt-1">
                    {r.now} · <span className="tracking-tighter">✓✓</span>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* Peças avulsas para composições (ex.: banner de divulgação) */

export function BannerSunburst({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const { locale } = useLocale()
  const dark = resolvedTheme !== "light"
  const labelFor = useCallback(
    (id: string, compact: boolean) => {
      const node = getNode(id)
      if (!node) return ""
      return pick(compact && node.short ? node.short : node.name, locale)
    },
    [locale]
  )
  return (
    <div className={className} aria-hidden>
      <SunburstCanvas
        dark={dark}
        motionOK
        selected={DEFAULT_TAG}
        labelFor={labelFor}
        dpr={[1, 2]}
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}

/* Replay avulso — para usar fora do demo (ex.: página Sobre) */
export function IncidentReplayShowcase() {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"
  const motionOK = useMotionOK()
  return <IncidentReplay dark={dark} motionOK={motionOK} />
}

/* ─── Demo completa ────────────────────────────────────────────────────── */

export default function AssetMonitorDemo() {
  const { t, locale } = useLocale()
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"
  const motionOK = useMotionOK()
  const [focusId, setFocusId] = useState<string>(ROOT_ID)
  const [selectedId, setSelectedId] = useState(DEFAULT_TAG)
  const labelRefs = useRef(new Map<string, HTMLDivElement | null>())
  // o sunburst só gira (e se constrói) quando está em tela — nada de GPU à toa
  const stageRef = useRef<HTMLDivElement>(null)
  const stageInView = useInView(stageRef, { margin: "-40px" })

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const labelFor = useCallback(
    (id: string, compact: boolean) => {
      const node = getNode(id)
      if (!node) return ""
      return pick(compact && node.short ? node.short : node.name, locale)
    },
    [locale]
  )
  const focusNode = getNode(focusId) ?? TREE
  const focusChildren = useMemo(() => childrenOf(focusNode), [focusNode])
  const trail = useMemo(() => pathTo(focusId), [focusId])
  const parentId = INDEX.get(focusId)?.parentId ?? null

  // descer um nível mantendo (ou reposicionando) a tag selecionada
  const drill = useCallback((id: string) => {
    setFocusId(id)
    setSelectedId((current) => {
      const inside = current === id || INDEX.get(current)?.ancestors.includes(id)
      if (inside) return current
      return worstTagIn(id)?.id ?? current
    })
  }, [])

  const tag = ALL_TAGS.find((x) => x.id === selectedId) ?? ALL_TAGS[0]
  const deviation = ((tag.real - tag.pred) / tag.pred) * 100
  const d = t.demo

  const hoveredPath = hoveredId
    ? pathTo(hoveredId).slice(1).map((n) => pick(n.name, locale)).join(" · ")
    : null

  const childKind = (focusChildren[0]?.kind ?? "tag") as Exclude<NodeKind, "company">
  const childCount = focusChildren.length
  const tagsInFocus = tagCountOf(focusId)
  const centerCounts =
    childKind === "tag"
      ? d.counts(childCount, d.levels.tag)
      : `${d.counts(childCount, d.levels[childKind])} · ${d.counts(tagsInFocus, d.levels.tag)}`
  const visibleLevels = LEVEL_ORDER.slice(LEVEL_ORDER.length - Math.max(1, (focusNode.kind === "company" ? 4 : focusNode.kind === "asset" ? 3 : focusNode.kind === "class" ? 2 : 1)))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sunburst navegável */}
        <Reveal className="lg:col-span-3">
          <div className="relative border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] h-full flex flex-col">
            {/* breadcrumb + dica */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 border-b border-border dark:border-white/10">
              <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1" aria-label={d.hierarchy}>
                {trail.map((node, i) => {
                  const last = i === trail.length - 1
                  return (
                    <span key={node.id} className="inline-flex items-center gap-1.5">
                      {i > 0 && <span className="font-mono text-[10px] text-muted-foreground/60">›</span>}
                      {last ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground font-bold">
                          {pick(node.name, locale)}
                        </span>
                      ) : (
                        <button
                          onClick={() => drill(node.id)}
                          className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {pick(node.name, locale)}
                        </button>
                      )}
                    </span>
                  )
                })}
              </nav>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] hidden sm:block max-w-[55%] truncate">
                {hoveredPath ? (
                  <span className="text-foreground">{hoveredPath}</span>
                ) : (
                  <span className="text-muted-foreground">{d.drillHint}</span>
                )}
              </p>
            </div>

            <div ref={stageRef} className="relative flex-1 min-h-[360px] md:min-h-[520px] select-none">
              <SunburstCanvas
                dark={dark}
                motionOK={motionOK}
                focusId={focusId}
                onFocus={drill}
                selected={selectedId}
                onSelect={setSelectedId}
                interactive
                labelFor={labelFor}
                onHoverNode={setHoveredId}
                intro
                introPlay={stageInView}
                frameloop={stageInView ? "always" : "demand"}
                labelRefs={labelRefs}
              />
              <RingLabels nodes={focusChildren} dark={dark} labelRefs={labelRefs} />

              {/* centro: nó em foco + voltar um nível */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={focusId}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.06 }}
                    transition={{ duration: 0.22 }}
                    className="text-center bg-background/70 backdrop-blur-[2px] px-3 py-1.5 max-w-[60%]"
                  >
                    <p className="font-display text-[11px] md:text-xs font-extrabold tracking-[0.2em] leading-tight">
                      {pick(focusNode.name, locale).toUpperCase()}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      {centerCounts}
                    </p>
                    {parentId && (
                      <button
                        onClick={() => drill(parentId)}
                        className="pointer-events-auto mt-1.5 inline-flex items-center gap-1.5 border border-border dark:border-white/15 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
                      >
                        <CornerLeftUp size={10} />
                        {d.back}
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* anéis visíveis — a classe de cada nível */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-5 py-2.5 border-t border-border dark:border-white/10">
              {LEVEL_ORDER.map((level, i) => {
                const on = visibleLevels.includes(level)
                return (
                  <span key={level} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="font-mono text-[9px] text-muted-foreground/50">→</span>}
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[0.2em] ${on ? "text-foreground" : "text-muted-foreground/40 line-through"}`}
                    >
                      {d.levels[level]}
                    </span>
                  </span>
                )
              })}
            </div>

            {/* Painel da tag selecionada — predição × real */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border-t border-border dark:border-white/10 px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{d.panel.tag}</p>
                  <p className="text-sm font-bold leading-tight">{pick(tag.name, locale)}</p>
                  <p className="text-[11px] text-muted-foreground">{pick(tag.where, locale)}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{d.panel.pred}</p>
                  <p className="font-display text-lg font-extrabold">{tag.pred}{tag.unit}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{d.panel.real}</p>
                  <p className="font-display text-lg font-extrabold">{tag.real}{tag.unit}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{d.panel.deviation}</p>
                  <p
                    className="font-display text-lg font-extrabold"
                    style={tag.risk !== "low" ? { color: riskVar[tag.risk] } : undefined}
                  >
                    {deviation >= 0 ? "+" : ""}{deviation.toFixed(1)}%
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{d.risk[tag.risk]}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Legenda de risco + saúde */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-3 border-t border-border dark:border-white/10">
              {([["low", riskColor("low", dark)], ["warn", "var(--risk-warning)"], ["critical", "var(--risk-critical)"]] as const).map(([risk, bg]) => (
                <span key={risk} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span className="h-2.5 w-2.5 inline-block" style={{ background: bg }} />
                  {d.risk[risk]}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="h-2.5 w-2.5 inline-block border border-current" />
                {d.legendHealth}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Gráfico predição × real */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <figure className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] h-full flex flex-col">
            <figcaption className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border dark:border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {pick(tag.where, locale)} · {pick(tag.name, locale)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <svg width="18" height="2"><line x1="0" x2="18" y1="1" y2="1" stroke="currentColor" strokeWidth="2" /></svg>
                  {d.chart.real}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="18" height="2"><line x1="0" x2="18" y1="1" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" /></svg>
                  {d.chart.pred}
                </span>
              </span>
            </figcaption>
            <div className="flex-1 flex items-center">
              <TagChart tag={tag} />
            </div>
            <p className="px-5 pb-4 text-[11px] text-muted-foreground leading-5">{d.chart.caption}</p>
          </figure>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <EnsemblePanel tag={tag} />
      </Reveal>

      <Reveal delay={0.1}>
        <IncidentReplay dark={dark} motionOK={motionOK} />
      </Reveal>
    </div>
  )
}

/* reexport para as pranchetas de marketing */
export { ASSETS }
export type { TagNode }
