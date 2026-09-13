import type { Locale } from "@/i18n/config"

/*
  Árvore ilustrativa da plataforma de ativos — empresa fictícia ENERGIA S.A.

    empresa → ativo (UHE/SE) → classe de equipamento → equipamento → tag

  A classe é o tipo (Gerador, Sistema de Resfriamento, Banco de Capacitores);
  o equipamento é a unidade física (Gerador 01, Banco 02); a tag é o ponto de
  telemetria que o modelo vigia. Nomes são bilíngues; ids e números são os
  mesmos nos dois idiomas.
*/

export type Risk = "low" | "warn" | "critical"
export type Bi = { pt: string; en: string }
export type NodeKind = "company" | "asset" | "class" | "equipment" | "tag"

export type TagNode = {
  kind: "tag"
  id: string
  name: Bi
  unit: string
  real: number
  pred: number
  risk: Risk
}
export type EquipmentNode = { kind: "equipment"; id: string; name: Bi; children: TagNode[] }
export type ClassNode = { kind: "class"; id: string; name: Bi; children: EquipmentNode[] }
export type AssetNode = {
  kind: "asset"
  id: string
  name: Bi
  assetKind: "UHE" | "SE"
  health: number
  children: ClassNode[]
}
export type CompanyNode = { kind: "company"; id: string; name: Bi; children: AssetNode[] }
export type TreeNode = CompanyNode | AssetNode | ClassNode | EquipmentNode | TagNode

const bi = (pt: string, en: string): Bi => ({ pt, en })

const tag = (id: string, name: Bi, unit: string, real: number, pred: number, risk: Risk): TagNode =>
  ({ kind: "tag", id, name, unit, real, pred, risk })
const equipment = (id: string, name: Bi, children: TagNode[]): EquipmentNode =>
  ({ kind: "equipment", id, name, children })
const klass = (id: string, name: Bi, children: EquipmentNode[]): ClassNode =>
  ({ kind: "class", id, name, children })
const asset = (
  id: string, name: Bi, assetKind: "UHE" | "SE", health: number, children: ClassNode[]
): AssetNode => ({ kind: "asset", id, name, assetKind, health, children })

/* ─── Classes de equipamento (o tipo, não a unidade) ────────────────────── */

const CLASS_NAMES = {
  gerador: bi("Gerador", "Generator"),
  turbina: bi("Turbina", "Turbine"),
  mancal: bi("Mancal", "Bearing"),
  trafo: bi("Transformador", "Transformer"),
  resfriamento: bi("Sistema de Resfriamento", "Cooling System"),
  capacitores: bi("Banco de Capacitores", "Capacitor Bank"),
  disjuntor: bi("Disjuntor", "Circuit Breaker"),
  pararaios: bi("Para-raios", "Surge Arrester"),
}

/* ─── A árvore ──────────────────────────────────────────────────────────── */

export const COMPANY_NAME = "ENERGIA S.A."

export const TREE: CompanyNode = {
  kind: "company",
  id: "energia",
  name: bi(COMPANY_NAME, COMPANY_NAME),
  children: [
    asset("uhe-salto", bi("UHE Salto das Pedras", "Salto das Pedras HPP"), "UHE", 96, [
      klass("sp-cl-ger", CLASS_NAMES.gerador, [
        equipment("sp-ger-01", bi("Gerador 01", "Generator 01"), [
          tag("sp-estator", bi("Temp. Estator", "Stator Temp"), "°C", 55.1, 54.2, "low"),
          tag("sp-exc", bi("Corrente Excitação", "Excitation Current"), "A", 118, 116, "low"),
        ]),
        equipment("sp-ger-02", bi("Gerador 02", "Generator 02"), [
          tag("sp-estator2", bi("Temp. Estator", "Stator Temp"), "°C", 54.4, 54.0, "low"),
        ]),
      ]),
      klass("sp-cl-turb", CLASS_NAMES.turbina, [
        equipment("sp-turb-01", bi("Turbina 01", "Turbine 01"), [
          tag("sp-vib", bi("Vibração Eixo", "Shaft Vibration"), "mm/s", 2.2, 2.1, "low"),
          tag("sp-press", bi("Pressão Espiral", "Spiral Case Pressure"), "kPa", 412, 410, "low"),
        ]),
      ]),
      klass("sp-cl-manc", CLASS_NAMES.mancal, [
        equipment("sp-manc-01", bi("Mancal Guia", "Guide Bearing"), [
          tag("sp-mtemp", bi("Temp. Mancal", "Bearing Temp"), "°C", 61.4, 60.8, "low"),
        ]),
      ]),
    ]),

    asset("uhe-rio", bi("UHE Rio Bonito", "Rio Bonito HPP"), "UHE", 71, [
      klass("rb-cl-trafo", CLASS_NAMES.trafo, [
        equipment("rb-trafo-01", bi("Trafo Elevador 01", "Step-up Transformer 01"), [
          tag("t1-oleo", bi("Temp. Óleo", "Oil Temp"), "°C", 74.6, 62.1, "critical"),
          tag("t1-enrol", bi("Temp. Enrolamento", "Winding Temp"), "°C", 68.9, 67.5, "low"),
          tag("t1-corr", bi("Corrente", "Current"), "A", 409, 402, "low"),
        ]),
      ]),
      klass("rb-cl-resf", CLASS_NAMES.resfriamento, [
        equipment("rb-resf-01", bi("Unidade de Resfriamento 01", "Cooling Unit 01"), [
          tag("rb-vazao", bi("Vazão de Óleo", "Oil Flow"), "m³/h", 38.2, 52.0, "critical"),
          tag("rb-tent", bi("Temp. Entrada", "Inlet Temp"), "°C", 44.1, 41.8, "warn"),
        ]),
      ]),
      klass("rb-cl-ger", CLASS_NAMES.gerador, [
        equipment("rb-ger-02", bi("Gerador 02", "Generator 02"), [
          tag("g2-vib", bi("Vibração", "Vibration"), "mm/s", 4.6, 3.4, "warn"),
          tag("g2-estator", bi("Temp. Estator", "Stator Temp"), "°C", 56.3, 55.9, "low"),
        ]),
      ]),
    ]),

    asset("uhe-serra", bi("UHE Serra Azul", "Serra Azul HPP"), "UHE", 93, [
      klass("sa-cl-turb", CLASS_NAMES.turbina, [
        equipment("sa-turb-02", bi("Turbina 02", "Turbine 02"), [
          tag("sa-vib", bi("Vibração Eixo", "Shaft Vibration"), "mm/s", 2.8, 2.6, "low"),
          tag("sa-cav", bi("Índice Cavitação", "Cavitation Index"), "", 0.31, 0.28, "low"),
        ]),
      ]),
      klass("sa-cl-manc", CLASS_NAMES.mancal, [
        equipment("sa-manc-03", bi("Mancal LA 03", "Bearing LA 03"), [
          tag("m3-temp", bi("Temp. Mancal", "Bearing Temp"), "°C", 82.3, 79.6, "warn"),
          tag("m3-vrad", bi("Vib. Radial", "Radial Vibration"), "mm/s", 2.4, 2.3, "low"),
        ]),
      ]),
      klass("sa-cl-resf", CLASS_NAMES.resfriamento, [
        equipment("sa-resf-02", bi("Trocador de Calor 02", "Heat Exchanger 02"), [
          tag("sa-dt", bi("Delta T", "Delta T"), "°C", 11.8, 11.2, "low"),
        ]),
      ]),
    ]),

    asset("se-vale", bi("SE Vale do Ferro", "Vale do Ferro Substation"), "SE", 91, [
      klass("vf-cl-trafo", CLASS_NAMES.trafo, [
        equipment("vf-trafo-02", bi("Trafo 02", "Transformer 02"), [
          tag("t2-oleo", bi("Temp. Óleo", "Oil Temp"), "°C", 58.4, 58.0, "low"),
          tag("t2-corr", bi("Corrente", "Current"), "A", 385, 383, "low"),
        ]),
      ]),
      klass("vf-cl-disj", CLASS_NAMES.disjuntor, [
        equipment("vf-disj-152", bi("Disjuntor 152-8", "Breaker 152-8"), [
          tag("vf-sf6", bi("Pressão SF₆", "SF₆ Pressure"), "bar", 6.1, 6.1, "low"),
          tag("vf-ab", bi("Tempo Abertura", "Opening Time"), "ms", 38, 36, "low"),
        ]),
      ]),
      klass("vf-cl-cap", CLASS_NAMES.capacitores, [
        equipment("vf-cap-01", bi("Banco 01", "Bank 01"), [
          tag("vf-des", bi("Desequilíbrio", "Unbalance"), "A", 1.8, 1.7, "low"),
        ]),
      ]),
    ]),

    asset("se-porto", bi("SE Porto Norte", "Porto Norte Substation"), "SE", 82, [
      klass("pn-cl-trafo", CLASS_NAMES.trafo, [
        equipment("pn-trafo-03", bi("Trafo 03", "Transformer 03"), [
          tag("pn-oleo", bi("Temp. Óleo", "Oil Temp"), "°C", 66.2, 61.9, "warn"),
          tag("pn-corr", bi("Corrente", "Current"), "A", 348, 344, "low"),
        ]),
      ]),
      klass("pn-cl-pr", CLASS_NAMES.pararaios, [
        equipment("pn-pr-04", bi("Para-raios 04", "Surge Arrester 04"), [
          tag("pn-fuga", bi("Corrente de Fuga", "Leakage Current"), "mA", 0.9, 0.6, "warn"),
        ]),
      ]),
      klass("pn-cl-cap", CLASS_NAMES.capacitores, [
        equipment("pn-cap-02", bi("Banco 02", "Bank 02"), [
          tag("pn-des", bi("Desequilíbrio", "Unbalance"), "A", 1.8, 1.7, "low"),
          tag("pn-tcel", bi("Temp. Célula", "Cell Temp"), "°C", 47.5, 45.9, "low"),
        ]),
      ]),
    ]),
  ],
}

export const ROOT_ID = TREE.id

/* ─── Índice: navegação, contagens e risco agregado por nó ──────────────── */

export const RISK_ORDER: Record<Risk, number> = { low: 0, warn: 1, critical: 2 }
const worse = (a: Risk, b: Risk) => (RISK_ORDER[b] > RISK_ORDER[a] ? b : a)

export type NodeEntry = {
  node: TreeNode
  parentId: string | null
  /** ancestrais do mais próximo ao mais distante da raiz */
  ancestors: string[]
  depth: number
  /** folhas (tags) abaixo do nó — define a largura da fatia no sunburst */
  tagCount: number
  /** pior risco do nó ou de qualquer descendente */
  risk: Risk
}

export const INDEX: Map<string, NodeEntry> = new Map()

function indexNode(node: TreeNode, parentId: string | null, ancestors: string[], depth: number): NodeEntry {
  const entry: NodeEntry = { node, parentId, ancestors, depth, tagCount: 0, risk: "low" }
  INDEX.set(node.id, entry)

  if (node.kind === "tag") {
    entry.tagCount = 1
    entry.risk = node.risk
    return entry
  }

  const childAncestors = [node.id, ...ancestors]
  for (const child of node.children as TreeNode[]) {
    const c = indexNode(child, node.id, childAncestors, depth + 1)
    entry.tagCount += c.tagCount
    entry.risk = worse(entry.risk, c.risk)
  }
  return entry
}
indexNode(TREE, null, [], 0)

export const getEntry = (id: string) => INDEX.get(id)
export const getNode = (id: string) => INDEX.get(id)?.node
export const childrenOf = (node: TreeNode): TreeNode[] => (node.kind === "tag" ? [] : node.children)
export const tagCountOf = (id: string) => INDEX.get(id)?.tagCount ?? 0
export const riskOf = (id: string) => INDEX.get(id)?.risk ?? "low"

/** quantos anéis cabem abaixo deste nó (ativo → classe → equipamento → tag) */
export const ringsBelow: Record<NodeKind, number> = {
  company: 4,
  asset: 3,
  class: 2,
  equipment: 1,
  tag: 0,
}

/** caminho raiz → nó, para o breadcrumb */
export function pathTo(id: string): TreeNode[] {
  const entry = INDEX.get(id)
  if (!entry) return [TREE]
  return [...entry.ancestors].reverse().concat(id).map((nid) => INDEX.get(nid)!.node)
}

/* ─── Tags achatadas: usadas pelo gráfico, pelo ensemble e pelas pranchetas */

export type FlatTag = TagNode & {
  assetId: string
  classId: string
  equipmentId: string
  /** "UHE Rio Bonito · Trafo Elevador 01" */
  where: Bi
  /** caminho completo, com a classe no meio */
  fullPath: Bi
}

export const ALL_TAGS: FlatTag[] = TREE.children.flatMap((a) =>
  a.children.flatMap((c) =>
    c.children.flatMap((e) =>
      e.children.map((t) => ({
        ...t,
        assetId: a.id,
        classId: c.id,
        equipmentId: e.id,
        where: bi(`${a.name.pt} · ${e.name.pt}`, `${a.name.en} · ${e.name.en}`),
        fullPath: bi(
          `${a.name.pt} · ${c.name.pt} · ${e.name.pt}`,
          `${a.name.en} · ${c.name.en} · ${e.name.en}`
        ),
      }))
    )
  )
)

export const ASSETS = TREE.children
export const CLASS_COUNT = ASSETS.reduce((s, a) => s + a.children.length, 0)
export const EQUIPMENT_COUNT = ASSETS.reduce(
  (s, a) => s + a.children.reduce((n, c) => n + c.children.length, 0), 0
)
export const TOTAL_TAGS = ALL_TAGS.length
export const DEFAULT_TAG = "t1-oleo"
export const REPLAY_TAG_ID = "t2-oleo"

/** tag mais crítica dentro de uma subárvore — o que o olho deve olhar primeiro */
export function worstTagIn(id: string): FlatTag | undefined {
  const inside = ALL_TAGS.filter((t) => t.id === id || INDEX.get(t.id)?.ancestors.includes(id))
  if (!inside.length) return undefined
  return inside.reduce((m, t) => (RISK_ORDER[t.risk] > RISK_ORDER[m.risk] ? t : m), inside[0])
}

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
export function tagSeries(t: TagNode) {
  const rand = mulberry32(t.id.split("").reduce((s, c) => s + c.charCodeAt(0) * 31, 7))
  const pred: number[] = []
  const real: number[] = []
  const gap = t.real - t.pred
  for (let i = 0; i < SERIES_N; i++) {
    const p = t.pred * (0.985 + 0.015 * Math.sin(i * 0.32 + 1.2) + (rand() - 0.5) * 0.006)
    const ramp = i > 30 ? ((i - 30) / (SERIES_N - 31)) ** 1.7 : 0
    const r = p * (1 + (rand() - 0.5) * 0.012) + gap * ramp
    pred.push(p)
    real.push(r)
  }
  pred[SERIES_N - 1] = t.pred
  real[SERIES_N - 1] = t.real
  return { pred, real }
}

export const DETECTORS = [
  { key: "lstm", name: "LSTM Autoencoder" },
  { key: "knn", name: "KNN" },
  { key: "rf", name: "Random Forest" },
] as const

export function detectorScores(t: TagNode): number[] {
  const rand = mulberry32(t.id.split("").reduce((s, c) => s + c.charCodeAt(0) * 17, 3))
  const base =
    t.risk === "critical" ? [0.91, 0.84, 0.88] : t.risk === "warn" ? [0.58, 0.63, 0.49] : [0.07, 0.12, 0.06]
  return base.map((b) => Math.min(0.99, Math.max(0.02, b + (rand() - 0.5) * 0.08)))
}
