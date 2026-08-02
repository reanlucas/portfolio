"use client"

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import { motion, AnimatePresence, useInView } from "motion/react"
import { useMemo, useRef, useEffect, useState, useCallback, type RefObject } from "react"
import { useTheme } from "next-themes"
import { FaWhatsapp } from "react-icons/fa"
import { Bot, Check } from "lucide-react"
import { Reveal } from "@/components/motion/primitives"

/*
  Demo interativa do monitoramento — dados ilustrativos.
  Sunburst 3D em quatro níveis: empresa (centro) → ativos (UHEs e SEs, com
  KPI de saúde) → equipamentos → tags de telemetria.
  Clique numa tag: o painel mostra predição × valor real e o gráfico
  redesenha a série daquela tag (real contínuo, predição pontilhada).
*/

type Risk = "baixo" | "atencao" | "critico"

type Tag = { id: string; name: string; unit: string; real: number; pred: number; risk: Risk }
type Equipment = { id: string; name: string; tags: Tag[] }
type Asset = { id: string; name: string; kind: "UHE" | "SE"; health: number; equipment: Equipment[] }

const COMPANY = "ENERGIA S.A."

const ASSETS: Asset[] = [
  {
    id: "uhe-salto", name: "UHE Salto das Pedras", kind: "UHE", health: 96,
    equipment: [
      {
        id: "sp-ger", name: "Gerador 01", tags: [
          { id: "sp-estator", name: "Temp. Estator", unit: "°C", real: 55.1, pred: 54.2, risk: "baixo" },
          { id: "sp-exc", name: "Corrente Excitação", unit: "A", real: 118, pred: 116, risk: "baixo" },
        ],
      },
      {
        id: "sp-turb", name: "Turbina 01", tags: [
          { id: "sp-vib", name: "Vibração Eixo", unit: "mm/s", real: 2.2, pred: 2.1, risk: "baixo" },
          { id: "sp-press", name: "Pressão Espiral", unit: "kPa", real: 412, pred: 410, risk: "baixo" },
        ],
      },
      {
        id: "sp-mancal", name: "Mancal Guia", tags: [
          { id: "sp-mtemp", name: "Temp. Mancal", unit: "°C", real: 61.4, pred: 60.8, risk: "baixo" },
        ],
      },
    ],
  },
  {
    id: "uhe-rio", name: "UHE Rio Bonito", kind: "UHE", health: 71,
    equipment: [
      {
        id: "rb-trafo", name: "Trafo Elevador 01", tags: [
          { id: "t1-oleo", name: "Temp. Óleo", unit: "°C", real: 74.6, pred: 62.1, risk: "critico" },
          { id: "t1-enrol", name: "Temp. Enrolamento", unit: "°C", real: 68.9, pred: 67.5, risk: "baixo" },
          { id: "t1-corr", name: "Corrente", unit: "A", real: 409, pred: 402, risk: "baixo" },
        ],
      },
      {
        id: "rb-ger", name: "Gerador 02", tags: [
          { id: "g2-vib", name: "Vibração", unit: "mm/s", real: 4.6, pred: 3.4, risk: "atencao" },
          { id: "g2-estator", name: "Temp. Estator", unit: "°C", real: 56.3, pred: 55.9, risk: "baixo" },
        ],
      },
    ],
  },
  {
    id: "uhe-serra", name: "UHE Serra Azul", kind: "UHE", health: 93,
    equipment: [
      {
        id: "sa-turb", name: "Turbina 02", tags: [
          { id: "sa-vib", name: "Vibração Eixo", unit: "mm/s", real: 2.8, pred: 2.6, risk: "baixo" },
          { id: "sa-cav", name: "Índice Cavitação", unit: "", real: 0.31, pred: 0.28, risk: "baixo" },
        ],
      },
      {
        id: "sa-mancal", name: "Mancal LA 03", tags: [
          { id: "m3-temp", name: "Temp. Mancal", unit: "°C", real: 82.3, pred: 79.6, risk: "atencao" },
          { id: "m3-vrad", name: "Vib. Radial", unit: "mm/s", real: 2.4, pred: 2.3, risk: "baixo" },
        ],
      },
    ],
  },
  {
    id: "se-vale", name: "SE Vale do Ferro", kind: "SE", health: 91,
    equipment: [
      {
        id: "vf-trafo", name: "Trafo 02", tags: [
          { id: "t2-oleo", name: "Temp. Óleo", unit: "°C", real: 58.4, pred: 58.0, risk: "baixo" },
          { id: "t2-corr", name: "Corrente", unit: "A", real: 385, pred: 383, risk: "baixo" },
        ],
      },
      {
        id: "vf-disj", name: "Disjuntor 152-8", tags: [
          { id: "vf-sf6", name: "Pressão SF₆", unit: "bar", real: 6.1, pred: 6.1, risk: "baixo" },
          { id: "vf-ab", name: "Tempo Abertura", unit: "ms", real: 38, pred: 36, risk: "baixo" },
        ],
      },
    ],
  },
  {
    id: "se-porto", name: "SE Porto Norte", kind: "SE", health: 82,
    equipment: [
      {
        id: "pn-trafo", name: "Trafo 03", tags: [
          { id: "pn-oleo", name: "Temp. Óleo", unit: "°C", real: 66.2, pred: 61.9, risk: "atencao" },
          { id: "pn-corr", name: "Corrente", unit: "A", real: 348, pred: 344, risk: "baixo" },
        ],
      },
      {
        id: "pn-pr", name: "Para-raios 04", tags: [
          { id: "pn-fuga", name: "Corrente de Fuga", unit: "mA", real: 0.9, pred: 0.6, risk: "atencao" },
        ],
      },
      {
        id: "pn-cap", name: "Banco Capacitores", tags: [
          { id: "pn-des", name: "Desequilíbrio", unit: "A", real: 1.8, pred: 1.7, risk: "baixo" },
        ],
      },
    ],
  },
]

const ALL_TAGS = ASSETS.flatMap((a) =>
  a.equipment.flatMap((e) => e.tags.map((t) => ({ ...t, asset: `${a.name} · ${e.name}` })))
)
const EQUIPMENT_COUNT = ASSETS.reduce((s, a) => s + a.equipment.length, 0)
const DEFAULT_TAG = "t1-oleo"

function riskColor(risk: Risk, dark: boolean) {
  if (risk === "critico") return dark ? "#ef4444" : "#dc2626"
  if (risk === "atencao") return dark ? "#f59e0b" : "#d97706"
  return dark ? "#525252" : "#a3a3a3"
}

/** saúde do ativo → mesma semântica de cor do risco */
function healthColor(health: number, dark: boolean) {
  if (health < 75) return dark ? "#ef4444" : "#dc2626"
  if (health < 90) return dark ? "#f59e0b" : "#d97706"
  return dark ? "#3f3f3f" : "#d4d4d4"
}

const riskLabel: Record<Risk, string> = { baixo: "Baixo risco", atencao: "Atenção", critico: "Crítico" }

const RISK_ORDER: Record<Risk, number> = { baixo: 0, atencao: 1, critico: 2 }
const maxRisk = (tags: Tag[]): Risk =>
  tags.reduce<Risk>((m, t) => (RISK_ORDER[t.risk] > RISK_ORDER[m] ? t.risk : m), "baixo")

/* ─── Séries determinísticas por tag: predição do modelo × valor real ──── */

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const N = 48

function tagSeries(tag: Tag) {
  const rand = mulberry32(tag.id.split("").reduce((s, c) => s + c.charCodeAt(0) * 31, 7))
  const pred: number[] = []
  const real: number[] = []
  const gap = tag.real - tag.pred
  for (let i = 0; i < N; i++) {
    const p = tag.pred * (0.985 + 0.015 * Math.sin(i * 0.32 + 1.2) + (rand() - 0.5) * 0.006)
    // o real acompanha a predição até começar a divergir — é aí que o modelo denuncia
    const ramp = i > 30 ? ((i - 30) / (N - 31)) ** 1.7 : 0
    const r = p * (1 + (rand() - 0.5) * 0.012) + gap * ramp
    pred.push(p)
    real.push(r)
  }
  pred[N - 1] = tag.pred
  real[N - 1] = tag.real
  return { pred, real }
}

/* ─── Sunburst 3D em quatro níveis, clicável ───────────────────────────── */

type Segment = {
  r0: number
  r1: number
  a0: number
  a1: number
  depth: number
  color: string
  level: 0 | 1 | 2
  tagId?: string
}

const TWO_PI = Math.PI * 2
const TOTAL_TAGS = ALL_TAGS.length

// raios dos anéis: ativo (com saúde) → equipamento → tag
const RING = {
  asset: { r0: 0.62, r1: 1.14, gap: 0.03 },
  equip: { r0: 1.22, r1: 1.8, gap: 0.022 },
  tag: { r0: 1.88, r1: 2.62, gap: 0.018 },
}

function mixHex(a: string, b: string, t: number) {
  return `#${new THREE.Color(a).lerp(new THREE.Color(b), t).getHexString()}`
}

/** ângulos proporcionais à contagem de tags — fatias de tag com largura uniforme */
function buildSegments(dark: boolean): Segment[] {
  const segs: Segment[] = []
  const grayEq = dark ? "#4a4a4a" : "#c6c6c6"
  let cursor = 0

  ASSETS.forEach((asset) => {
    const assetTags = asset.equipment.reduce((s, e) => s + e.tags.length, 0)
    const assetArc = (TWO_PI * assetTags) / TOTAL_TAGS

    segs.push({
      ...RING.asset,
      a0: cursor + RING.asset.gap,
      a1: cursor + assetArc - RING.asset.gap,
      depth: 0.12 + ((100 - asset.health) / 100) * 0.55,
      color: healthColor(asset.health, dark),
      level: 0,
    })

    let eqCursor = cursor
    asset.equipment.forEach((eq) => {
      const eqArc = (assetArc * eq.tags.length) / assetTags
      const worst = maxRisk(eq.tags)
      segs.push({
        ...RING.equip,
        a0: eqCursor + RING.equip.gap,
        a1: eqCursor + eqArc - RING.equip.gap,
        depth: worst === "baixo" ? 0.12 : 0.18,
        // equipamento herda um tom do pior risco dos filhos — o olho sobe a hierarquia
        color: worst === "baixo" ? grayEq : mixHex(grayEq, riskColor(worst, dark), 0.45),
        level: 1,
      })

      const tagArc = eqArc / eq.tags.length
      eq.tags.forEach((tag, ti) => {
        const t0 = eqCursor + ti * tagArc
        segs.push({
          ...RING.tag,
          a0: t0 + RING.tag.gap,
          a1: t0 + tagArc - RING.tag.gap,
          depth: tag.risk === "critico" ? 0.46 : tag.risk === "atencao" ? 0.28 : 0.14,
          color: riskColor(tag.risk, dark),
          level: 2,
          tagId: tag.id,
        })
      })
      eqCursor += eqArc
    })
    cursor += assetArc
  })

  return segs
}

/** âncora do rótulo de saúde de cada ativo — logo além do anel de tags */
function assetAnchors() {
  let cursor = 0
  return ASSETS.map((asset) => {
    const assetTags = asset.equipment.reduce((s, e) => s + e.tags.length, 0)
    const arc = (TWO_PI * assetTags) / TOTAL_TAGS
    const mid = cursor + arc / 2
    cursor += arc
    return { id: asset.id, pos: new THREE.Vector3(Math.cos(mid) * 3.2, Math.sin(mid) * 3.2, 0.12) }
  })
}

function arcGeometry(seg: Segment) {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, seg.r1, seg.a0, seg.a1, false)
  shape.absarc(0, 0, seg.r0, seg.a1, seg.a0, true)
  return new THREE.ExtrudeGeometry(shape, {
    depth: seg.depth,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.012,
    bevelSegments: 2,
  })
}

function SunburstLights({ dark }: { dark: boolean }) {
  return (
    <>
      <ambientLight intensity={dark ? 1.15 : 1.3} />
      <directionalLight position={[4, 6, 8]} intensity={dark ? 1.3 : 1.1} />
      <directionalLight position={[-5, -4, 5]} intensity={0.45} />
    </>
  )
}

function SunburstScene({
  dark, motionOK, selected, onSelect, labelRefs,
}: {
  dark: boolean
  motionOK: boolean
  selected: string
  onSelect: (id: string) => void
  labelRefs?: RefObject<Map<string, HTMLDivElement | null>>
}) {
  const group = useRef<THREE.Group>(null)
  const meshes = useRef(new Map<string, THREE.Mesh>())
  const [hovered, setHovered] = useState<string | null>(null)

  const segments = useMemo(() => buildSegments(dark), [dark])
  const geometries = useMemo(() => segments.map(arcGeometry), [segments])
  const anchors = useMemo(assetAnchors, [])
  const proj = useMemo(() => new THREE.Vector3(), [])
  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries])

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : ""
    return () => { document.body.style.cursor = "" }
  }, [hovered])

  useFrame((state, dt) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    if (motionOK) {
      group.current.rotation.z += dt * 0.07
      group.current.rotation.x = -0.95 + Math.sin(t * 0.25) * 0.05
    }
    // tag selecionada levanta do plano; as demais assentam
    meshes.current.forEach((mesh, id) => {
      const target = id === selected ? 0.3 : id === hovered ? 0.14 : 0
      mesh.position.z += (target - mesh.position.z) * Math.min(1, dt * 8)
      const mat = mesh.material as THREE.MeshStandardMaterial
      const pulse = id === selected && motionOK ? 0.75 + 0.25 * Math.sin(t * 2.4) : 1
      mat.opacity = (id === selected || id === hovered ? 1 : 0.9) * pulse
    })
    // rótulos de saúde acompanham o giro — projeção 3D → tela
    if (labelRefs?.current) {
      group.current.updateMatrixWorld()
      anchors.forEach(({ id, pos }) => {
        const el = labelRefs.current!.get(id)
        if (!el) return
        proj.copy(pos).applyMatrix4(group.current!.matrixWorld).project(state.camera)
        const x = (proj.x * 0.5 + 0.5) * state.size.width
        const y = (-proj.y * 0.5 + 0.5) * state.size.height
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        el.style.opacity = proj.z < 1 ? "1" : "0"
      })
    }
  })

  const handleClick = useCallback((tagId: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(tagId)
  }, [onSelect])

  return (
    <group ref={group} rotation={[-0.95, 0, 0.4]}>
      <SunburstLights dark={dark} />
      {segments.map((seg, i) => (
        <mesh
          key={i}
          geometry={geometries[i]}
          ref={(m) => {
            if (seg.tagId) {
              if (m) meshes.current.set(seg.tagId, m)
              else meshes.current.delete(seg.tagId)
            }
          }}
          onClick={seg.tagId ? handleClick(seg.tagId) : undefined}
          onPointerOver={seg.tagId ? (e) => { e.stopPropagation(); setHovered(seg.tagId!) } : undefined}
          onPointerOut={seg.tagId ? () => setHovered((h) => (h === seg.tagId ? null : h)) : undefined}
        >
          <meshStandardMaterial
            color={seg.color}
            roughness={0.48}
            metalness={0.22}
            transparent
            opacity={seg.level === 2 ? 0.92 : 0.96}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* núcleo — a empresa */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 48]} />
        <meshStandardMaterial color={dark ? "#242424" : "#e6e6e6"} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

/** rótulos DOM dos ativos (nome + saúde) — posicionados pela cena a cada frame */
function AssetHealthLabels({ dark, labelRefs }: { dark: boolean; labelRefs: RefObject<Map<string, HTMLDivElement | null>> }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {ASSETS.map((a) => (
        <div
          key={a.id}
          ref={(el) => { labelRefs.current.set(a.id, el) }}
          className="absolute left-0 top-0 will-change-transform"
          style={{ transform: "translate3d(-999px,-999px,0)", opacity: 0 }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-border/70 dark:border-white/15 bg-background/80 backdrop-blur-[2px] px-2 py-1">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-muted-foreground">
              {a.name}
            </span>
            <span
              className="font-mono text-[9px] font-bold ml-1.5"
              style={{ color: a.health < 90 ? healthColor(a.health, dark) : "var(--foreground)" }}
            >
              {a.health}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Gráfico predição × real da tag selecionada ───────────────────────── */

const W = 640, H = 250, PL = 46, PR = 52, PT = 16, PB = 28

function TagChart({ tag }: { tag: Tag & { asset: string } }) {
  const { pred, real } = useMemo(() => tagSeries(tag), [tag])
  const all = [...pred, ...real]
  const vmin = Math.min(...all) * 0.985
  const vmax = Math.max(...all) * 1.015
  const px = (i: number) => PL + (i / (N - 1)) * (W - PL - PR)
  const py = (v: number) => PT + (1 - (v - vmin) / (vmax - vmin)) * (H - PT - PB)
  const path = (s: number[]) => s.map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ")
  const ticks = [vmin, (vmin + vmax) / 2, vmax]
  const diverging = real.map((v, i) => ({ v, i })).filter(({ v }, k) => Math.abs(v - pred[k]) / pred[k] > 0.08)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label={`Gráfico ilustrativo: predição do modelo (pontilhada) versus valor real da tag ${tag.name} de ${tag.asset}`}>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={PL} x2={W - PR} y1={py(v)} y2={py(v)} stroke="currentColor" strokeOpacity="0.08" />
          <text x={PL - 6} y={py(v) + 3} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
            {v >= 100 ? v.toFixed(0) : v.toFixed(1)}
          </text>
        </g>
      ))}

      {/* predição do modelo — pontilhada */}
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
      {/* valor real — contínua */}
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

      {/* divergência relevante — o modelo denunciando */}
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
          <title>{`Janela ${i}: real ${v.toFixed(1)}${tag.unit} vs predição ${pred[i].toFixed(1)}${tag.unit}`}</title>
        </motion.circle>
      ))}

      {/* rótulos diretos no fim das linhas */}
      <text x={W - PR + 6} y={py(real[N - 1]) + 3} fontSize="9" fontWeight="700" fill="currentColor" fontFamily="var(--font-geist-mono)">
        REAL
      </text>
      <text x={W - PR + 6} y={py(pred[N - 1]) + (Math.abs(py(pred[N - 1]) - py(real[N - 1])) < 12 ? 14 : 3)} fontSize="9" fill="currentColor" fillOpacity="0.55" fontFamily="var(--font-geist-mono)">
        PRED
      </text>

      <text x={PL} y={H - 8} fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
        ← 72h · JANELAS DE INFERÊNCIA · AGORA →
      </text>
    </svg>
  )
}

/* ─── Ensemble: LSTM-AE + KNN + Random Forest votando na tag ───────────── */

const DETECTORS = [
  { key: "lstm", name: "LSTM Autoencoder", how: "erro de reconstrução da janela" },
  { key: "knn", name: "KNN", how: "distância aos k vizinhos do regime normal" },
  { key: "rf", name: "Random Forest", how: "probabilidade de anomalia (features da janela)" },
] as const

function detectorScores(tag: Tag): number[] {
  const rand = mulberry32(tag.id.split("").reduce((s, c) => s + c.charCodeAt(0) * 17, 3))
  const base = tag.risk === "critico" ? [0.91, 0.84, 0.88] : tag.risk === "atencao" ? [0.58, 0.63, 0.49] : [0.07, 0.12, 0.06]
  return base.map((b) => Math.min(0.99, Math.max(0.02, b + (rand() - 0.5) * 0.08)))
}

function scoreVerdict(s: number) {
  if (s > 0.7) return { label: "Anomalia", color: "var(--risk-critical)" }
  if (s > 0.4) return { label: "Atenção", color: "var(--risk-warning)" }
  return { label: "Normal", color: "var(--muted-foreground)" }
}

function EnsemblePanel({ tag }: { tag: Tag & { asset: string } }) {
  const scores = useMemo(() => detectorScores(tag), [tag])
  const positives = scores.filter((s) => s > 0.7).length
  const warned = scores.filter((s) => s > 0.4).length

  return (
    <figure className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03]">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Detecção multi-modelo · {tag.asset} · {tag.name}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          score de anomalia 0 → 1
        </span>
      </figcaption>

      <div className="px-5 py-5 flex flex-col gap-4">
        {DETECTORS.map(({ key, name, how }, i) => {
          const s = scores[i]
          const verdict = scoreVerdict(s)
          return (
            <div key={key} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr_7rem] items-center gap-x-4 gap-y-1">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-tight leading-tight">{name}</p>
                <p className="text-[11px] text-muted-foreground leading-4">{how}</p>
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
                <span className="font-semibold" style={{ color: "var(--risk-critical)" }}>
                  {positives}/3 modelos apontam anomalia
                </span>
                {" — consenso atingido: o agente de IA dispara o alerta com contexto da tag via "}
                <span className="font-semibold text-foreground">WhatsApp e e-mail</span>
                {" para a equipe de manutenção."}
              </>
            ) : warned >= 1 ? (
              <>
                <span className="font-semibold" style={{ color: "var(--risk-warning)" }}>
                  Divergência entre detectores
                </span>
                {" — a tag entra em observação intensiva; sem consenso, nenhum alerta é disparado."}
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">3/3 modelos concordam: regime normal.</span>
                {" Nenhuma ação necessária — o ensemble segue vigiando."}
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
   mesmo t: a tag desvia do predict, o segmento 3D cresce e avermelha, o
   ensemble atinge consenso, o agente de IA acorda e digita o alerta.      */

const CYCLE = 19
const RN = 60
const REPLAY_TAG_ID = "t2-oleo"

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

const WPP_MESSAGE =
  "⚠️ ALERTA — SE Vale do Ferro · Trafo 02 · Temp. Óleo\n" +
  "Real 68.5°C vs predição 58.0°C (+18%) nas últimas horas. " +
  "Ensemble 3/3 em consenso (LSTM-AE · KNN · RF).\n" +
  "Sugestão: inspecionar o sistema de refrigeração e abrir OS preventiva.\n" +
  "— Agente IA · Plataforma de Ativos"

function ReplayScene({ dark, tRef }: { dark: boolean; tRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef<THREE.Mesh>(null)

  const segments = useMemo(() => buildSegments(dark), [dark])
  const geometries = useMemo(() => segments.map(arcGeometry), [segments])
  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries])

  const gray = useMemo(() => new THREE.Color(dark ? "#525252" : "#a3a3a3"), [dark])
  const amber = useMemo(() => new THREE.Color(dark ? "#f59e0b" : "#d97706"), [dark])
  const red = useMemo(() => new THREE.Color(dark ? "#ef4444" : "#dc2626"), [dark])

  useFrame((state, dt) => {
    const t = tRef.current ?? 0
    if (group.current) {
      group.current.rotation.z += dt * 0.07
      group.current.rotation.x = -0.95 + Math.sin(state.clock.elapsedTime * 0.25) * 0.05
    }
    if (target.current) {
      // o segmento da tag cresce e muda de cor conforme o desvio piora
      const grow = Math.min(1, Math.max(0, (t - 3) / 5.5))
      target.current.scale.z = 1 + grow * 2.6
      const mat = target.current.material as THREE.MeshStandardMaterial
      if (grow < 0.5) mat.color.copy(gray).lerp(amber, grow * 2)
      else mat.color.copy(amber).lerp(red, (grow - 0.5) * 2)
      mat.opacity = t > 8.5 ? 0.7 + 0.3 * Math.sin(state.clock.elapsedTime * 3) : 0.95
    }
  })

  return (
    <group ref={group} rotation={[-0.95, 0, 0.4]}>
      <SunburstLights dark={dark} />
      {segments.map((seg, i) => (
        <mesh
          key={i}
          geometry={geometries[i]}
          ref={seg.tagId === REPLAY_TAG_ID ? target : undefined}
        >
          <meshStandardMaterial
            color={seg.color}
            roughness={0.48}
            metalness={0.22}
            transparent
            opacity={seg.level === 2 ? 0.92 : 0.96}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 48]} />
        <meshStandardMaterial color={dark ? "#242424" : "#e6e6e6"} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

function ReplayChart({ t }: { t: number }) {
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

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" role="img"
      aria-label="Replay animado: valor real da tag desviando progressivamente da predição do modelo">
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
            REAL
          </text>
          <text x={px(visible - 1) + 5} y={py(replaySeries.pred[visible - 1]) + (Math.abs(py(replaySeries.pred[visible - 1]) - py(replaySeries.real[visible - 1])) < 12 ? 14 : 3)} fontSize="9" fill="currentColor" fillOpacity="0.55" fontFamily="var(--font-geist-mono)">
            PRED
          </text>
        </>
      )}
      <text x={cPL} y={CH - 8} fontSize="9" fill="currentColor" fillOpacity="0.45" fontFamily="var(--font-geist-mono)">
        SE VALE DO FERRO · TRAFO 02 · TEMP. ÓLEO (°C)
      </text>
    </svg>
  )
}

const AGENT_STEPS = [
  { at: 8.7, label: "Ensemble detecta desvio persistente" },
  { at: 9.6, label: "Consenso 3/3 — evento confirmado" },
  { at: 10.6, label: "Agente coleta contexto: histórico, OS abertas, tag" },
]

function IncidentReplay({ dark, motionOK }: { dark: boolean; motionOK: boolean }) {
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
    t < 3 ? { label: "Regime normal", color: "var(--muted-foreground)" }
    : t < 8.5 ? { label: "Desvio crescendo", color: "var(--risk-warning)" }
    : t < 10 ? { label: "Crítico · consenso 3/3", color: "var(--risk-critical)" }
    : t < 12 ? { label: "Agente de IA acionado", color: "var(--risk-critical)" }
    : { label: "Alerta enviado", color: "var(--foreground)" }

  const msgChars = Math.floor(WPP_MESSAGE.length * Math.min(1, Math.max(0, (t - 12) / 4.5)))
  const msgDone = msgChars >= WPP_MESSAGE.length

  return (
    <div ref={ref} className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Replay simulado · do desvio ao alerta · loop automático
        </span>
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
        {/* 1 — a tag desviando do predict */}
        <div className="p-4 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
            01 · Tag desvia da predição
          </p>
          <div className="flex-1 flex items-center">
            <ReplayChart t={t} />
          </div>
        </div>

        {/* 2 — o segmento 3D crescendo no sunburst */}
        <div className="p-4 flex flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
            02 · Risco cresce no sunburst
          </p>
          <div className="relative flex-1 min-h-[240px]">
            {inView && (
              <Canvas
                camera={{ position: [0, 0, 7.6], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                frameloop={motionOK ? "always" : "demand"}
                style={{ pointerEvents: "none" }}
              >
                <ReplayScene dark={dark} tRef={tRef} />
              </Canvas>
            )}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="font-display text-[10px] font-extrabold tracking-[0.2em]">{COMPANY}</p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-5 mt-2">
            O segmento da Temp. Óleo do Trafo 02 (SE Vale do Ferro) cresce e avermelha conforme o desvio piora.
          </p>
        </div>

        {/* 3 — a IA alertada + WhatsApp */}
        <div className="p-4 flex flex-col gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            03 · Agente de IA age
          </p>

          <div className="flex flex-col gap-1.5">
            {AGENT_STEPS.map(({ at, label }) => (
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
            ))}
          </div>

          <motion.div
            animate={{ opacity: t > 11.8 ? 1 : 0.2, y: t > 11.8 ? 0 : 8 }}
            transition={{ duration: 0.4 }}
            className="flex-1 border border-border dark:border-white/10 bg-background/60 flex flex-col"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border dark:border-white/10">
              <FaWhatsapp size={15} color="#25D366" />
              <span className="text-[11px] font-semibold">Grupo Manutenção · Subestações</span>
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                <Bot size={11} /> agente
              </span>
            </div>
            <div className="p-3">
              <div className="max-w-[95%] border border-border dark:border-white/10 bg-muted/60 dark:bg-white/5 px-3 py-2">
                <p className="text-[11.5px] leading-5 whitespace-pre-line">
                  {WPP_MESSAGE.slice(0, msgChars)}
                  {t > 12 && !msgDone && <span className="inline-block w-[6px] h-[12px] bg-foreground align-middle animate-pulse ml-0.5" />}
                </p>
                {msgDone && (
                  <p className="text-right font-mono text-[9px] text-muted-foreground mt-1">
                    agora · <span className="tracking-tighter">✓✓</span>
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
export { TagChart, ALL_TAGS, ASSETS, EQUIPMENT_COUNT, DEFAULT_TAG, detectorScores, DETECTORS }

export function BannerSunburst({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
        style={{ pointerEvents: "none" }}
      >
        <SunburstScene dark={dark} motionOK={true} selected={DEFAULT_TAG} onSelect={() => {}} />
      </Canvas>
    </div>
  )
}

/* Replay avulso — para usar fora do demo (ex.: página Sobre) */
export function IncidentReplayShowcase() {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"
  const [motionOK, setMotionOK] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotionOK(!mq.matches)
    const onChange = () => setMotionOK(!mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return <IncidentReplay dark={dark} motionOK={motionOK} />
}

/* ─── Demo completa ────────────────────────────────────────────────────── */

export default function AssetMonitorDemo() {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"
  const [motionOK, setMotionOK] = useState(true)
  const [selectedId, setSelectedId] = useState(DEFAULT_TAG)
  const labelRefs = useRef(new Map<string, HTMLDivElement | null>())

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotionOK(!mq.matches)
    const onChange = () => setMotionOK(!mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const tag = ALL_TAGS.find((t) => t.id === selectedId) ?? ALL_TAGS[0]
  const deviation = ((tag.real - tag.pred) / tag.pred) * 100

  return (
    <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sunburst */}
      <Reveal>
        <div className="relative border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] h-full flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border dark:border-white/10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Empresa → ativo → equipamento → tag
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">
              Clique numa tag
            </p>
          </div>

          <div className="relative flex-1 min-h-[360px] md:min-h-[430px]">
            <Canvas
              camera={{ position: [0, 0, 7.4], fov: 45 }}
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true }}
              frameloop="always"
            >
              <SunburstScene
                dark={dark}
                motionOK={motionOK}
                selected={selectedId}
                onSelect={setSelectedId}
                labelRefs={labelRefs}
              />
            </Canvas>
            {/* rótulos de saúde por ativo — seguem o giro */}
            <AssetHealthLabels dark={dark} labelRefs={labelRefs} />
            {/* empresa no centro — HTML fixo sobre o giro */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-background/60 backdrop-blur-[2px] px-3 py-1.5">
                <p className="font-display text-[11px] md:text-xs font-extrabold tracking-[0.2em]">{COMPANY}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  {ASSETS.length} ativos · {ALL_TAGS.length} tags
                </p>
              </div>
            </div>
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
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Tag</p>
                <p className="text-sm font-bold leading-tight">{tag.name}</p>
                <p className="text-[11px] text-muted-foreground">{tag.asset}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Predição</p>
                <p className="font-display text-lg font-extrabold">{tag.pred}{tag.unit}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Real</p>
                <p className="font-display text-lg font-extrabold">{tag.real}{tag.unit}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Desvio</p>
                <p
                  className="font-display text-lg font-extrabold"
                  style={tag.risk !== "baixo" ? { color: tag.risk === "critico" ? "var(--risk-critical)" : "var(--risk-warning)" } : undefined}
                >
                  {deviation >= 0 ? "+" : ""}{deviation.toFixed(1)}%
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{riskLabel[tag.risk]}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Legenda de risco + saúde */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-3 border-t border-border dark:border-white/10">
            {([["Baixo risco", dark ? "#525252" : "#a3a3a3"], ["Atenção", "var(--risk-warning)"], ["Crítico", "var(--risk-critical)"]] as const).map(([label, bg]) => (
              <span key={label} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="h-2.5 w-2.5 inline-block" style={{ background: bg }} />
                {label}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="h-2.5 w-2.5 inline-block border border-current" />
              % = saúde do ativo
            </span>
          </div>
        </div>
      </Reveal>

      {/* Gráfico predição × real */}
      <Reveal delay={0.1}>
        <figure className="border border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] h-full flex flex-col">
          <figcaption className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border dark:border-white/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {tag.asset} · {tag.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <svg width="18" height="2"><line x1="0" x2="18" y1="1" y2="1" stroke="currentColor" strokeWidth="2" /></svg>
                Real
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="18" height="2"><line x1="0" x2="18" y1="1" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" /></svg>
                Predição
              </span>
            </span>
          </figcaption>
          <div className="flex-1 flex items-center">
            <TagChart tag={tag} />
          </div>
          <p className="px-5 pb-4 text-[11px] text-muted-foreground leading-5">
            A predição é o que o modelo esperava para a tag; o real é o que o sensor mediu.
            Enquanto as linhas andam juntas, o ativo está saudável — quando o real
            descola da predição, a anomalia está nascendo. Clique em outra tag no
            sunburst para redesenhar.
          </p>
        </figure>
      </Reveal>
    </div>

    {/* Ensemble KNN + Random Forest + LSTM-AE */}
    <Reveal delay={0.15}>
      <EnsemblePanel tag={tag} />
    </Reveal>

    {/* Replay: tag desvia → sunburst cresce → agente alerta no WhatsApp */}
    <Reveal delay={0.1}>
      <IncidentReplay dark={dark} motionOK={motionOK} />
    </Reveal>
    </div>
  )
}
