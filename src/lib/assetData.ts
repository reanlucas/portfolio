import type { Locale } from "@/i18n/config"

/*
  Dados ilustrativos da plataforma de ativos — empresa fictícia ENERGIA S.A.
  Hierarquia: empresa → ativo (UHE/SE, com KPI de saúde) → equipamento → tag.
  Nomes são bilíngues; ids e números são os mesmos nos dois idiomas.
*/

export type Risk = "low" | "warn" | "critical"
export type Bi = { pt: string; en: string }

export type Tag = { id: string; name: Bi; unit: string; real: number; pred: number; risk: Risk }
export type Equipment = { id: string; name: Bi; tags: Tag[] }
export type Asset = { id: string; name: Bi; kind: "UHE" | "SE"; health: number; equipment: Equipment[] }

export const COMPANY = "ENERGIA S.A."

const bi = (pt: string, en: string): Bi => ({ pt, en })

export const ASSETS: Asset[] = [
  {
    id: "uhe-salto", name: bi("UHE Salto das Pedras", "Salto das Pedras HPP"), kind: "UHE", health: 96,
    equipment: [
      {
        id: "sp-ger", name: bi("Gerador 01", "Generator 01"), tags: [
          { id: "sp-estator", name: bi("Temp. Estator", "Stator Temp"), unit: "°C", real: 55.1, pred: 54.2, risk: "low" },
          { id: "sp-exc", name: bi("Corrente Excitação", "Excitation Current"), unit: "A", real: 118, pred: 116, risk: "low" },
        ],
      },
      {
        id: "sp-turb", name: bi("Turbina 01", "Turbine 01"), tags: [
          { id: "sp-vib", name: bi("Vibração Eixo", "Shaft Vibration"), unit: "mm/s", real: 2.2, pred: 2.1, risk: "low" },
          { id: "sp-press", name: bi("Pressão Espiral", "Spiral Case Pressure"), unit: "kPa", real: 412, pred: 410, risk: "low" },
        ],
      },
      {
        id: "sp-mancal", name: bi("Mancal Guia", "Guide Bearing"), tags: [
          { id: "sp-mtemp", name: bi("Temp. Mancal", "Bearing Temp"), unit: "°C", real: 61.4, pred: 60.8, risk: "low" },
        ],
      },
    ],
  },
  {
    id: "uhe-rio", name: bi("UHE Rio Bonito", "Rio Bonito HPP"), kind: "UHE", health: 71,
    equipment: [
      {
        id: "rb-trafo", name: bi("Trafo Elevador 01", "Step-up Transformer 01"), tags: [
          { id: "t1-oleo", name: bi("Temp. Óleo", "Oil Temp"), unit: "°C", real: 74.6, pred: 62.1, risk: "critical" },
          { id: "t1-enrol", name: bi("Temp. Enrolamento", "Winding Temp"), unit: "°C", real: 68.9, pred: 67.5, risk: "low" },
          { id: "t1-corr", name: bi("Corrente", "Current"), unit: "A", real: 409, pred: 402, risk: "low" },
        ],
      },
      {
        id: "rb-ger", name: bi("Gerador 02", "Generator 02"), tags: [
          { id: "g2-vib", name: bi("Vibração", "Vibration"), unit: "mm/s", real: 4.6, pred: 3.4, risk: "warn" },
          { id: "g2-estator", name: bi("Temp. Estator", "Stator Temp"), unit: "°C", real: 56.3, pred: 55.9, risk: "low" },
        ],
      },
    ],
  },
  {
    id: "uhe-serra", name: bi("UHE Serra Azul", "Serra Azul HPP"), kind: "UHE", health: 93,
    equipment: [
      {
        id: "sa-turb", name: bi("Turbina 02", "Turbine 02"), tags: [
          { id: "sa-vib", name: bi("Vibração Eixo", "Shaft Vibration"), unit: "mm/s", real: 2.8, pred: 2.6, risk: "low" },
          { id: "sa-cav", name: bi("Índice Cavitação", "Cavitation Index"), unit: "", real: 0.31, pred: 0.28, risk: "low" },
        ],
      },
      {
        id: "sa-mancal", name: bi("Mancal LA 03", "Bearing LA 03"), tags: [
          { id: "m3-temp", name: bi("Temp. Mancal", "Bearing Temp"), unit: "°C", real: 82.3, pred: 79.6, risk: "warn" },
          { id: "m3-vrad", name: bi("Vib. Radial", "Radial Vibration"), unit: "mm/s", real: 2.4, pred: 2.3, risk: "low" },
        ],
      },
    ],
  },
  {
    id: "se-vale", name: bi("SE Vale do Ferro", "Vale do Ferro Substation"), kind: "SE", health: 91,
    equipment: [
      {
        id: "vf-trafo", name: bi("Trafo 02", "Transformer 02"), tags: [
          { id: "t2-oleo", name: bi("Temp. Óleo", "Oil Temp"), unit: "°C", real: 58.4, pred: 58.0, risk: "low" },
          { id: "t2-corr", name: bi("Corrente", "Current"), unit: "A", real: 385, pred: 383, risk: "low" },
        ],
      },
      {
        id: "vf-disj", name: bi("Disjuntor 152-8", "Breaker 152-8"), tags: [
          { id: "vf-sf6", name: bi("Pressão SF₆", "SF₆ Pressure"), unit: "bar", real: 6.1, pred: 6.1, risk: "low" },
          { id: "vf-ab", name: bi("Tempo Abertura", "Opening Time"), unit: "ms", real: 38, pred: 36, risk: "low" },
        ],
      },
    ],
  },
  {
    id: "se-porto", name: bi("SE Porto Norte", "Porto Norte Substation"), kind: "SE", health: 82,
    equipment: [
      {
        id: "pn-trafo", name: bi("Trafo 03", "Transformer 03"), tags: [
          { id: "pn-oleo", name: bi("Temp. Óleo", "Oil Temp"), unit: "°C", real: 66.2, pred: 61.9, risk: "warn" },
          { id: "pn-corr", name: bi("Corrente", "Current"), unit: "A", real: 348, pred: 344, risk: "low" },
        ],
      },
      {
        id: "pn-pr", name: bi("Para-raios 04", "Surge Arrester 04"), tags: [
          { id: "pn-fuga", name: bi("Corrente de Fuga", "Leakage Current"), unit: "mA", real: 0.9, pred: 0.6, risk: "warn" },
        ],
      },
      {
        id: "pn-cap", name: bi("Banco Capacitores", "Capacitor Bank"), tags: [
          { id: "pn-des", name: bi("Desequilíbrio", "Unbalance"), unit: "A", real: 1.8, pred: 1.7, risk: "low" },
        ],
      },
    ],
  },
]

export type FlatTag = Tag & { assetId: string; equipmentId: string; asset: Bi }

export const ALL_TAGS: FlatTag[] = ASSETS.flatMap((a) =>
  a.equipment.flatMap((e) =>
    e.tags.map((t) => ({
      ...t,
      assetId: a.id,
      equipmentId: e.id,
      asset: bi(`${a.name.pt} · ${e.name.pt}`, `${a.name.en} · ${e.name.en}`),
    }))
  )
)

export const EQUIPMENT_COUNT = ASSETS.reduce((s, a) => s + a.equipment.length, 0)
export const TOTAL_TAGS = ALL_TAGS.length
export const DEFAULT_TAG = "t1-oleo"
export const REPLAY_TAG_ID = "t2-oleo"

export const RISK_ORDER: Record<Risk, number> = { low: 0, warn: 1, critical: 2 }
export const maxRisk = (tags: Tag[]): Risk =>
  tags.reduce<Risk>((m, t) => (RISK_ORDER[t.risk] > RISK_ORDER[m] ? t.risk : m), "low")

export const pick = (b: Bi, locale: Locale) => b[locale]

/* ─── PRNG determinístico compartilhado pelas séries ilustrativas ────────── */

export function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const SERIES_N = 48

/** predição do modelo × valor real — o real acompanha até começar a divergir */
export function tagSeries(tag: Tag) {
  const rand = mulberry32(tag.id.split("").reduce((s, c) => s + c.charCodeAt(0) * 31, 7))
  const pred: number[] = []
  const real: number[] = []
  const gap = tag.real - tag.pred
  for (let i = 0; i < SERIES_N; i++) {
    const p = tag.pred * (0.985 + 0.015 * Math.sin(i * 0.32 + 1.2) + (rand() - 0.5) * 0.006)
    const ramp = i > 30 ? ((i - 30) / (SERIES_N - 31)) ** 1.7 : 0
    const r = p * (1 + (rand() - 0.5) * 0.012) + gap * ramp
    pred.push(p)
    real.push(r)
  }
  pred[SERIES_N - 1] = tag.pred
  real[SERIES_N - 1] = tag.real
  return { pred, real }
}

export const DETECTORS = [
  { key: "lstm", name: "LSTM Autoencoder" },
  { key: "knn", name: "KNN" },
  { key: "rf", name: "Random Forest" },
] as const

export function detectorScores(tag: Tag): number[] {
  const rand = mulberry32(tag.id.split("").reduce((s, c) => s + c.charCodeAt(0) * 17, 3))
  const base = tag.risk === "critical" ? [0.91, 0.84, 0.88] : tag.risk === "warn" ? [0.58, 0.63, 0.49] : [0.07, 0.12, 0.06]
  return base.map((b) => Math.min(0.99, Math.max(0.02, b + (rand() - 0.5) * 0.08)))
}
