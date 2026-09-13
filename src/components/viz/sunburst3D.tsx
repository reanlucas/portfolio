"use client"

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react"
import {
  INDEX, ROOT_ID, childrenOf, getNode, ringsBelow, tagCountOf,
  type NodeKind, type Risk, type TreeNode,
} from "@/lib/assetData"

/*
  Sunburst 3D navegável — empresa → ativo → classe → equipamento → tag.

  Clicar num nó com filhos desce um nível: ele vira o centro e a subárvore
  reabre ocupando o círculo inteiro. Clicar numa tag seleciona a série.
  Materiais físicos com metal escovado procedural + ambiente PMREM, arestas
  técnicas, varredura de radar, partículas de dado, arrasto com inércia e
  construção animada a cada mudança de foco.
*/

/* ─── Cores semânticas ──────────────────────────────────────────────────── */

export function riskColor(risk: Risk, dark: boolean) {
  if (risk === "critical") return dark ? "#ef4444" : "#dc2626"
  if (risk === "warn") return dark ? "#f59e0b" : "#d97706"
  return dark ? "#5a5a5a" : "#a8a8a8"
}

export function healthColor(health: number, dark: boolean) {
  if (health < 75) return dark ? "#ef4444" : "#dc2626"
  if (health < 90) return dark ? "#f59e0b" : "#d97706"
  return dark ? "#454545" : "#cfcfcf"
}

const TWO_PI = Math.PI * 2

/* ─── Layout: anéis, ângulos e aparência de cada fatia ──────────────────── */

export type Slice = {
  id: string
  kind: NodeKind
  ring: number
  r0: number
  r1: number
  a0: number
  a1: number
  depth: number
  color: string
  risk: Risk
  hasChildren: boolean
}

export type Anchor = { id: string; mid: number }

const OUTER = 2.72
const RING_GAP = 0.07
/** anel nunca mais gordo que isto — sem ele, descer a árvore vira um prato */
const MAX_RING_WIDTH = 0.8
/** folga angular por anel — os de fora são mais finos, precisam de menos */
const ANGLE_GAP = [0.032, 0.024, 0.018, 0.014]
/** raio onde os rótulos do primeiro anel ficam ancorados */
const LABEL_RADIUS = 3.0

/** Peso radial de cada nível: ativo, classe, equipamento, tag. O anel das tags
 *  é o mais largo porque é onde moram os nomes compridos. */
const RING_WEIGHTS = [1, 0.82, 0.95, 1.4]

/** Com menos níveis à mostra o miolo abre: o disco vira mostrador, não prato. */
function ringBands(n: number) {
  const weights = RING_WEIGHTS.slice(RING_WEIGHTS.length - n)
  const sum = weights.reduce((a, b) => a + b, 0)
  const available = OUTER - 0.6 - RING_GAP * (n - 1)
  let widths = weights.map((w) => (available * w) / sum)
  const widest = Math.max(...widths)
  if (widest > MAX_RING_WIDTH) widths = widths.map((w) => (w * MAX_RING_WIDTH) / widest)
  const inner = OUTER - (widths.reduce((a, b) => a + b, 0) + RING_GAP * (n - 1))

  let r0 = inner
  const bands = widths.map((w) => {
    const band = { r0, r1: r0 + w }
    r0 += w + RING_GAP
    return band
  })
  return { bands, inner }
}

function mixHex(a: string, b: string, t: number) {
  return `#${new THREE.Color(a).lerp(new THREE.Color(b), t).getHexString()}`
}

/** altura da extrusão — risco e saúde viram relevo, legível de lado */
function sliceDepth(node: TreeNode, risk: Risk) {
  if (node.kind === "tag") return risk === "critical" ? 0.46 : risk === "warn" ? 0.28 : 0.14
  if (node.kind === "asset") return 0.12 + ((100 - node.health) / 100) * 0.55
  return risk === "low" ? 0.12 : risk === "critical" ? 0.24 : 0.18
}

function sliceColor(node: TreeNode, risk: Risk, dark: boolean) {
  if (node.kind === "tag") return riskColor(risk, dark)
  if (node.kind === "asset") return healthColor(node.health, dark)
  // classe e equipamento herdam um tom do pior risco abaixo — o olho sobe a árvore
  const base = node.kind === "class" ? (dark ? "#414141" : "#d2d2d2") : dark ? "#4e4e4e" : "#c4c4c4"
  return risk === "low" ? base : mixHex(base, riskColor(risk, dark), node.kind === "class" ? 0.38 : 0.48)
}

/** Monta as fatias da subárvore do nó em foco, ocupando o círculo inteiro. */
export function buildLayout(
  focusId: string,
  dark: boolean
): { slices: Slice[]; anchors: Anchor[]; inner: number } {
  const focus = getNode(focusId) ?? getNode(ROOT_ID)!
  const rings = Math.max(1, ringsBelow[focus.kind])
  const { bands, inner } = ringBands(rings)
  // com poucos anéis o relevo some na largura — compensa na altura
  const depthScale = 1 + (4 - rings) * 0.22
  const slices: Slice[] = []
  const anchors: Anchor[] = []

  const walk = (node: TreeNode, ring: number, start: number, arc: number) => {
    const kids = childrenOf(node)
    if (!kids.length || ring >= bands.length) return
    const total = Math.max(1, tagCountOf(node.id))
    let cursor = start

    for (const kid of kids) {
      const share = (Math.max(1, tagCountOf(kid.id)) / total) * arc
      const entry = INDEX.get(kid.id)!
      const gap = Math.min(ANGLE_GAP[ring] ?? 0.014, share * 0.22)
      slices.push({
        id: kid.id,
        kind: kid.kind,
        ring,
        r0: bands[ring].r0,
        r1: bands[ring].r1,
        a0: cursor + gap,
        a1: cursor + share - gap,
        depth: sliceDepth(kid, entry.risk) * depthScale,
        color: sliceColor(kid, entry.risk, dark),
        risk: entry.risk,
        hasChildren: childrenOf(kid).length > 0,
      })
      if (ring === 0) anchors.push({ id: kid.id, mid: cursor + share / 2 })
      walk(kid, ring + 1, cursor, share)
      cursor += share
    }
  }

  walk(focus, 0, 0, TWO_PI)
  return { slices, anchors, inner }
}

function arcShape(s: Slice) {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, s.r1, s.a0, s.a1, false)
  shape.absarc(0, 0, s.r0, s.a1, s.a0, true)
  return shape
}

/** o chanfro cresce para fora dos dois lados: a face de cima fica em
 *  `depth + BEVEL_THICKNESS`, e é aí que a placa de texto precisa pousar */
const BEVEL_THICKNESS = 0.02

function arcGeometry(s: Slice) {
  return new THREE.ExtrudeGeometry(arcShape(s), {
    depth: s.depth,
    curveSegments: 28,
    bevelEnabled: true,
    bevelThickness: BEVEL_THICKNESS,
    bevelSize: 0.012,
    bevelSegments: 3,
  })
}

/* ─── Nomes gravados na face de cima de cada fatia ───────────────────────
   Um canvas só, em coordenadas de mundo, com o nome de todo nó desenhado
   dentro da sua fatia. Cada fatia recebe uma placa plana com esse mesmo
   mapa; a geometria recorta o texto, então nome nenhum vaza para o vizinho.
   O texto acompanha o giro porque a placa é filha da fatia.              */

/** largura do mundo coberta pela textura (o disco vai até 2.72 de raio) */
const LABEL_SPAN = 5.8
/** altura mínima de fonte, em unidades de mundo, para ainda valer a pena */
const MIN_FONT = 0.055
const MAX_FONT = 0.17
/** espaçamento entre letras, como fração do corpo da fonte */
const TRACKING = 0.04
/** corpo usado só para medir a largura do texto uma vez */
const REF_FONT = 100

function monoFamily() {
  if (typeof document === "undefined") return "monospace"
  const v = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim()
  return v ? `${v}, ui-monospace, monospace` : "ui-monospace, monospace"
}

/** encurta até caber, com reticências; devolve "" se nem 3 letras cabem */
function fitText(ctx: CanvasRenderingContext2D, text: string, budgetPx: number) {
  if (ctx.measureText(text).width <= budgetPx) return text
  for (let n = text.length - 1; n >= 3; n--) {
    const candidate = `${text.slice(0, n).trimEnd()}…`
    if (ctx.measureText(candidate).width <= budgetPx) return candidate
  }
  return ""
}

export function drawLabels(
  slices: Slice[],
  labelFor: (id: string, compact: boolean) => string,
  canvas?: HTMLCanvasElement,
  size = 2048
) {
  const c = canvas ?? document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  const k = size / LABEL_SPAN // pixels por unidade de mundo
  const cx = size / 2
  const cy = size / 2
  const family = monoFamily()

  ctx.clearRect(0, 0, size, size)
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // o metal reflete claro nos dois temas, então o nome é entalhado escuro com
  // um fio de luz embaixo — a cor vai na textura, não no material
  const ENGRAVE = "rgba(12,12,12,0.92)"
  const HIGHLIGHT = "rgba(255,255,255,0.5)"
  const emboss = (draw: (dx: number, dy: number) => void, lift: number) => {
    ctx.fillStyle = HIGHLIGHT
    draw(0, lift)
    ctx.fillStyle = ENGRAVE
    draw(0, 0)
  }

  for (const s of slices) {
    if (s.ring === 0) continue // o primeiro anel já tem rótulo em HTML, nítido
    const name = labelFor(s.id, false)
    if (!name) continue

    const am = (s.a0 + s.a1) / 2
    const rm = (s.r0 + s.r1) / 2
    const arcLen = (s.a1 - s.a0) * rm
    const radLen = s.r1 - s.r0

    // qual orientação deixa o nome maior? deitado no arco ou escrito no raio
    const measure = (text: string) => {
      ctx.font = `600 ${REF_FONT}px ${family}`
      try { ctx.letterSpacing = `${REF_FONT * TRACKING}px` } catch { /* navegador antigo */ }
      const perUnit = ctx.measureText(text).width / REF_FONT
      if (!perUnit) return null
      const fontFor = (along: number, across: number) =>
        Math.min(MAX_FONT, across, ((along * 0.88) / perUnit) * 0.97)
      const fTan = fontFor(arcLen, radLen * 0.42)
      const fRad = fontFor(radLen, arcLen * 0.5)
      return { text, tangential: fTan >= fRad, font: Math.max(fTan, fRad) }
    }

    let best = measure(name.toUpperCase())
    if (!best) continue
    // não coube inteiro? tenta o apelido antes de cortar a palavra
    if (best.font < MIN_FONT) {
      const compact = labelFor(s.id, true).toUpperCase()
      if (compact && compact !== best.text) {
        const alt = measure(compact)
        if (alt && alt.font > best.font) best = alt
      }
    }
    const { text: full, tangential, font: fontWorld } = best
    const budget = (tangential ? arcLen : radLen) * 0.88 * k

    const fontPx = Math.max(MIN_FONT * k, fontWorld * k)
    ctx.font = `600 ${fontPx.toFixed(1)}px ${family}`
    try { ctx.letterSpacing = `${(fontPx * TRACKING).toFixed(1)}px` } catch { /* navegador antigo */ }

    // só corta quando nem no corpo mínimo o nome inteiro cabe
    const text = fitText(ctx, full, budget)
    if (!text) continue

    const lift = Math.max(1, fontPx * 0.06)
    ctx.save()
    ctx.translate(cx, cy)
    if (tangential) {
      // texto curvo: cada letra gira junto com o arco
      const width = ctx.measureText(text).width
      const spanAngle = width / (rm * k)
      // no semicírculo de baixo o texto fica de cabeça para baixo; inverte
      const upright = Math.sin(am) >= 0
      const dir = upright ? -1 : 1
      let a = am + (dir * spanAngle) / 2
      for (const ch of text) {
        const chW = ctx.measureText(ch).width
        const chAngle = chW / (rm * k)
        a -= (dir * chAngle) / 2
        ctx.save()
        ctx.rotate(-a)
        ctx.translate(rm * k, 0)
        ctx.rotate(upright ? -Math.PI / 2 : Math.PI / 2)
        emboss((dx, dy) => ctx.fillText(ch, dx, dy), lift)
        ctx.restore()
        a -= (dir * chAngle) / 2
      }
    } else {
      // texto radial, sempre lendo de dentro para fora
      const flip = Math.cos(am) < 0
      ctx.rotate(-am)
      if (flip) ctx.rotate(Math.PI)
      const x = (flip ? -1 : 1) * rm * k
      emboss((dx, dy) => ctx.fillText(text, x + dx, dy), lift)
    }
    ctx.restore()
  }

  return c
}

function makeLabelTexture(slices: Slice[], labelFor: (id: string, compact: boolean) => string) {
  const tex = new THREE.CanvasTexture(drawLabels(slices, labelFor))
  tex.colorSpace = THREE.SRGBColorSpace
  tex.repeat.set(1 / LABEL_SPAN, 1 / LABEL_SPAN)
  tex.offset.set(0.5, 0.5)
  tex.anisotropy = 4
  return tex
}

function circlePoints(r: number, n = 128) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * TWO_PI
    return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)
  })
}

function tickPoints(r0: number, r1: number, n: number) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TWO_PI
    const rr1 = i % 3 === 0 ? r1 + 0.05 : r1
    pts.push(
      new THREE.Vector3(Math.cos(a) * r0, Math.sin(a) * r0, 0),
      new THREE.Vector3(Math.cos(a) * rr1, Math.sin(a) * rr1, 0)
    )
  }
  return pts
}

/* ─── Texturas procedurais (geradas uma vez, no cliente) ────────────────── */

type Textures = { brushed: THREE.CanvasTexture; glow: THREE.CanvasTexture }
let textureCache: Textures | null = null

function makeBrushed(size = 512) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#bdbdbd"
  ctx.fillRect(0, 0, size, size)
  // riscos longos e finos — metal escovado numa direção só
  for (let i = 0; i < 9000; i++) {
    const y = Math.random() * size
    const x = Math.random() * size
    const w = 30 + Math.random() * 220
    const light = Math.random() < 0.5
    ctx.strokeStyle = light
      ? `rgba(255,255,255,${0.05 + Math.random() * 0.2})`
      : `rgba(0,0,0,${0.04 + Math.random() * 0.16})`
    ctx.lineWidth = Math.random() < 0.8 ? 1 : 2
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + w, y)
    ctx.stroke()
  }
  // grão fino
  const img = ctx.getImageData(0, 0, size, size)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 18
    d[i] = Math.max(0, Math.min(255, d[i] + n))
    d[i + 1] = d[i]
    d[i + 2] = d[i]
  }
  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(1.6, 1.6)
  tex.anisotropy = 4
  return tex
}

function makeGlow(size = 256) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.45, "rgba(255,255,255,0.55)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

function getTextures(): Textures | null {
  if (typeof document === "undefined") return null
  if (!textureCache) textureCache = { brushed: makeBrushed(), glow: makeGlow() }
  return textureCache
}

/* ─── Ambiente PMREM — reflexos metálicos sem carregar HDR ──────────────── */

function Environment({ dark }: { dark: boolean }) {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04).texture
    scene.environment = env
    scene.environmentIntensity = dark ? 0.85 : 0.6
    room.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry?.dispose()
        const m = o.material
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose())
        else m?.dispose()
      }
    })
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene, dark])
  return null
}

/* ─── Varredura de radar — shader com cauda que esmaece ─────────────────── */

const SWEEP_ARC = 0.7
const sweepVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const sweepFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float a = atan(p.y, p.x);
    if (a < 0.0) a += 6.28318530718;
    float t = clamp(a / ${SWEEP_ARC.toFixed(3)}, 0.0, 1.0);
    float r = length(p) * 2.0;
    float edge = smoothstep(0.2, 0.3, r) * (1.0 - smoothstep(0.94, 1.0, r));
    float lead = smoothstep(0.985, 1.0, t) * 0.9;
    gl_FragColor = vec4(uColor, (pow(t, 3.0) * 0.75 + lead) * uOpacity * edge);
  }
`

function RadarSweep({
  dark, motionOK, inner, speed = 0.75,
}: { dark: boolean; motionOK: boolean; inner: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(dark ? "#ffffff" : "#1a1a1a") },
      uOpacity: { value: dark ? 0.16 : 0.12 },
    }),
    [dark]
  )
  useFrame((_, dt) => {
    if (ref.current && motionOK) ref.current.rotation.z += Math.min(dt, 0.05) * speed
  })
  return (
    <mesh ref={ref} position={[0, 0, 0.02]} renderOrder={10} raycast={() => null}>
      <ringGeometry args={[inner - 0.05, OUTER + 0.06, 64, 1, 0, SWEEP_ARC]} />
      <shaderMaterial
        vertexShader={sweepVert}
        fragmentShader={sweepFrag}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  )
}

/* ─── Partículas de dado subindo do disco ───────────────────────────────── */

function Motes({
  dark, motionOK, count = 110, glow,
}: { dark: boolean; motionOK: boolean; count?: number; glow: THREE.Texture }) {
  const ref = useRef<THREE.Points>(null)
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * TWO_PI
      const r = 0.8 + Math.random() * 2.5
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = Math.sin(a) * r
      positions[i * 3 + 2] = -0.2 + Math.random() * 1.9
      speeds[i] = 0.08 + Math.random() * 0.16
    }
    return { positions, speeds }
  }, [count])

  useFrame((state, dt) => {
    if (!ref.current || !motionOK) return
    const attr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += speeds[i] * dt
      arr[i * 3] += Math.sin(t * 0.6 + i) * 0.0006
      if (arr[i * 3 + 2] > 1.8) arr[i * 3 + 2] = -0.2
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref} raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={glow}
        size={dark ? 0.09 : 0.07}
        color={dark ? "#ffffff" : "#2a2a2a"}
        transparent
        opacity={dark ? 0.55 : 0.4}
        depthWrite={false}
        sizeAttenuation
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

/* ─── Cena ──────────────────────────────────────────────────────────────── */

export type ReplayDriver = { tRef: RefObject<number>; tagId: string }

export type SunburstSceneProps = {
  dark: boolean
  motionOK: boolean
  /** nó no centro do disco — a subárvore dele é o que aparece */
  focusId?: string
  /** clique num nó com filhos */
  onFocus?: (id: string) => void
  /** tag selecionada (levanta e pulsa) */
  selected?: string | null
  onSelect?: (id: string) => void
  /** hover, clique, arrasto e tilt pelo ponteiro */
  interactive?: boolean
  /** rótulos DOM projetados para o primeiro anel */
  labelRefs?: RefObject<Map<string, HTMLDivElement | null>>
  /** nome de cada nó — grava o texto na face de cima das fatias dos anéis internos.
   *  `compact` pede o apelido curto, usado quando o nome inteiro não cabe. */
  labelFor?: (id: string, compact: boolean) => string
  /** nó sob o ponteiro, para o cabeçalho mostrar o caminho completo */
  onHoverNode?: (id: string | null) => void
  /** replay dirigido por relógio externo: a tag cresce e avermelha */
  replay?: ReplayDriver
  /** construção animada das fatias */
  intro?: boolean
  /** dispara a construção (ex.: quando o bloco entra em tela) */
  introPlay?: boolean
  /** velocidade base do giro (rad/s) */
  spin?: number
}

const easeOutBack = (x: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const clampRange = (v: number, lo: number, hi: number) =>
  hi < lo ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, v))

export function SunburstScene({
  dark, motionOK, focusId = ROOT_ID, onFocus, selected = null, onSelect,
  interactive = false, labelRefs, labelFor, onHoverNode, replay,
  intro = false, introPlay = true, spin = 0.07,
}: SunburstSceneProps) {
  const tiltRef = useRef<THREE.Group>(null)
  const spinRef = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const edges = useRef<(THREE.LineSegments | null)[]>([])
  const [hovered, setHovered] = useState<string | null>(null)
  const { gl } = useThree()

  const { slices, anchors, inner } = useMemo(() => buildLayout(focusId, dark), [focusId, dark])
  const geometries = useMemo(() => slices.map(arcGeometry), [slices])
  const edgeGeometries = useMemo(() => geometries.map((g) => new THREE.EdgesGeometry(g, 24)), [geometries])
  const anchorVectors = useMemo(
    () =>
      anchors.map((a) => ({
        id: a.id,
        pos: new THREE.Vector3(Math.cos(a.mid) * LABEL_RADIUS, Math.sin(a.mid) * LABEL_RADIUS, 0.12),
      })),
    [anchors]
  )
  const textures = useMemo(getTextures, [])
  // nomes gravados nas fatias dos anéis internos (o externo usa rótulo HTML)
  const labelTex = useMemo(
    () => (labelFor && typeof document !== "undefined" ? makeLabelTexture(slices, labelFor) : null),
    [slices, labelFor]
  )
  const plateGeos = useMemo(
    () => slices.map((s) => (labelTex && s.ring > 0 ? new THREE.ShapeGeometry(arcShape(s), 24) : null)),
    [slices, labelTex]
  )
  useEffect(() => () => labelTex?.dispose(), [labelTex])
  useEffect(() => () => plateGeos.forEach((g) => g?.dispose()), [plateGeos])
  // a fonte do site pode chegar depois do primeiro desenho — redesenha quando chegar
  useEffect(() => {
    if (!labelTex || !labelFor || !document.fonts) return
    let alive = true
    document.fonts.ready.then(() => {
      if (!alive) return
      drawLabels(slices, labelFor, labelTex.image as HTMLCanvasElement)
      labelTex.needsUpdate = true
    })
    return () => { alive = false }
  }, [labelTex, labelFor, slices])
  const proj = useMemo(() => new THREE.Vector3(), [])
  const guideGeos = useMemo(
    () => ({
      rings: [inner - 0.03, OUTER + 0.04].map((r) =>
        new THREE.BufferGeometry().setFromPoints(circlePoints(r))
      ),
      ticks: new THREE.BufferGeometry().setFromPoints(tickPoints(OUTER + 0.08, OUTER + 0.16, 72)),
    }),
    [inner]
  )
  // ancestrais da tag selecionada — o caminho inteiro acende junto
  const litPath = useMemo(() => new Set(selected ? INDEX.get(selected)?.ancestors ?? [] : []), [selected])
  const replayColors = useMemo(
    () => ({
      gray: new THREE.Color(riskColor("low", dark)),
      amber: new THREE.Color(riskColor("warn", dark)),
      red: new THREE.Color(riskColor("critical", dark)),
    }),
    [dark]
  )

  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries])
  useEffect(() => () => edgeGeometries.forEach((g) => g.dispose()), [edgeGeometries])
  useEffect(
    () => () => {
      guideGeos.rings.forEach((g) => g.dispose())
      guideGeos.ticks.dispose()
    },
    [guideGeos]
  )

  useEffect(() => {
    if (!interactive) return
    document.body.style.cursor = hovered ? "pointer" : ""
    return () => { document.body.style.cursor = "" }
  }, [hovered, interactive])

  useEffect(() => { onHoverNode?.(hovered) }, [hovered, onHoverNode])

  const clockRef = useRef(0)
  const spawnRef = useRef(-1)
  const drag = useRef({ active: false, lastX: 0, lastT: 0, vel: 0, moved: 0, lastInteraction: -10, inside: false })

  // cada mudança de foco reabre o disco com a construção animada
  useEffect(() => {
    spawnRef.current = -1
    setHovered(null)
  }, [focusId])

  useEffect(() => () => onHoverNode?.(null), [onHoverNode])

  useEffect(() => {
    if (!interactive) return
    const el = gl.domElement
    const d = drag.current
    el.style.touchAction = "pan-y"

    const down = (e: PointerEvent) => {
      d.active = true
      d.lastX = e.clientX
      d.lastT = performance.now()
      d.vel = 0
      d.moved = 0
      d.lastInteraction = clockRef.current
      el.setPointerCapture?.(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!d.active) return
      const now = performance.now()
      const dx = e.clientX - d.lastX
      const dtm = Math.max(1, now - d.lastT)
      d.lastX = e.clientX
      d.lastT = now
      d.moved += Math.abs(dx)
      if (spinRef.current) spinRef.current.rotation.z += dx * 0.006
      d.vel = Math.max(-4, Math.min(4, (dx * 0.006) / (dtm / 1000)))
      d.lastInteraction = clockRef.current
    }
    const up = (e: PointerEvent) => {
      if (!d.active) return
      d.active = false
      d.lastInteraction = clockRef.current
      el.releasePointerCapture?.(e.pointerId)
    }
    const enter = () => { d.inside = true }
    const leave = () => { d.inside = false }

    el.addEventListener("pointerdown", down)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    el.addEventListener("pointerenter", enter)
    el.addEventListener("pointerleave", leave)
    return () => {
      el.removeEventListener("pointerdown", down)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
      el.removeEventListener("pointerenter", enter)
      el.removeEventListener("pointerleave", leave)
    }
  }, [gl, interactive])

  useFrame((state, rawDt) => {
    const t = state.clock.elapsedTime
    const dt = Math.min(rawDt, 0.05)
    clockRef.current = t
    if (intro && introPlay && spawnRef.current < 0) spawnRef.current = t
    const age = t - spawnRef.current
    const d = drag.current

    // giro: automático, com inércia após arrasto e retomada suave
    if (spinRef.current && !d.active) {
      const idle = clamp01((t - d.lastInteraction - 1.2) / 2.5)
      const auto = motionOK ? spin * idle : 0
      spinRef.current.rotation.z += (auto + d.vel) * dt
      d.vel *= Math.exp(-dt * 2.6)
    }

    // tilt: respiração lenta + parallax do ponteiro
    if (tiltRef.current) {
      const usePointer = interactive && d.inside
      const px = usePointer ? state.pointer.x : 0
      const py = usePointer ? state.pointer.y : 0
      const breathe = motionOK ? Math.sin(t * 0.25) * 0.05 : 0
      const targetX = -0.95 + breathe - py * 0.11
      const targetY = px * 0.17
      const k = Math.min(1, dt * 4)
      tiltRef.current.rotation.x += (targetX - tiltRef.current.rotation.x) * k
      tiltRef.current.rotation.y += (targetY - tiltRef.current.rotation.y) * k
    }

    const replayT = replay ? (replay.tRef.current ?? 0) : 0

    slices.forEach((s, i) => {
      const mesh = meshes.current[i]
      if (!mesh) return
      const mat = mesh.material as THREE.MeshPhysicalMaterial
      const isSel = s.id === selected
      const isHov = s.id === hovered
      const onPath = litPath.has(s.id)

      // construção: cada fatia sobe do plano em cascata angular
      let build = 1
      if (intro && motionOK) {
        const delay = (s.a0 / TWO_PI) * 0.7 + s.ring * 0.16
        build = spawnRef.current < 0 ? 0.02 : Math.max(0.02, easeOutBack(clamp01((age - delay) / 0.75)))
      }

      let grow = 0
      if (replay && s.id === replay.tagId) {
        grow = clamp01((replayT - 3) / 5.5)
        if (grow < 0.5) mat.color.copy(replayColors.gray).lerp(replayColors.amber, grow * 2)
        else mat.color.copy(replayColors.amber).lerp(replayColors.red, (grow - 0.5) * 2)
        mat.emissive.copy(mat.color)
        mat.emissiveIntensity = grow * 0.55 + (replayT > 8.5 ? 0.25 + 0.25 * Math.sin(t * 6) : 0)
        mat.opacity = replayT > 8.5 ? 0.8 + 0.2 * Math.sin(t * 3) : 0.96
      } else {
        const base = s.risk === "critical" ? 0.28 : s.risk === "warn" ? 0.2 : 0
        const pulse = motionOK ? 0.5 + 0.5 * Math.sin(t * 2.2 + i * 0.7) : 1
        mat.emissiveIntensity = isSel
          ? 0.45 + 0.45 * pulse
          : onPath
            ? 0.18 + base * 0.5
            : base * (0.65 + 0.35 * pulse)
        mat.opacity = isSel || isHov ? 1 : s.ring >= 2 ? 0.94 : 0.97
      }
      mesh.scale.z = build * (1 + grow * 2.6)

      // levanta do plano quando selecionada / sob o ponteiro
      const rise = isSel ? 0.17 : isHov ? 0.09 : onPath ? 0.04 : 0
      mesh.position.z += (rise - mesh.position.z) * Math.min(1, dt * 8)

      const line = edges.current[i]
      if (line) {
        const lm = line.material as THREE.LineBasicMaterial
        lm.opacity = isSel ? 0.95 : isHov ? 0.6 : onPath ? 0.42 : dark ? 0.14 : 0.2
      }
    })

    // rótulos do primeiro anel acompanham o giro — projeção 3D → tela
    if (labelRefs?.current && spinRef.current) {
      spinRef.current.updateMatrixWorld()
      anchorVectors.forEach(({ id, pos }) => {
        const el = labelRefs.current!.get(id)
        if (!el) return
        proj.copy(pos).applyMatrix4(spinRef.current!.matrixWorld).project(state.camera)
        // mantém o rótulo inteiro dentro do quadro, mesmo quando a âncora sai
        const hw = el.offsetWidth / 2 + 6
        const hh = el.offsetHeight / 2 + 6
        const x = clampRange((proj.x * 0.5 + 0.5) * state.size.width, hw, state.size.width - hw)
        const y = clampRange((-proj.y * 0.5 + 0.5) * state.size.height, hh, state.size.height - hh)
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        el.style.opacity = proj.z < 1 ? "1" : "0"
      })
    }
  })

  const handleClick = (s: Slice) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (drag.current.moved > 6) return // foi arrasto, não clique
    if (s.hasChildren) onFocus?.(s.id)
    else onSelect?.(s.id)
  }

  const fg = dark ? "#ffffff" : "#111111"
  const hubColor = dark ? "#2a2a2a" : "#e2e2e2"
  // o núcleo acompanha a abertura do miolo, mas nunca vira um prato
  const hubR = Math.min(0.5, inner - 0.12)

  return (
    <group ref={tiltRef} rotation={[-0.95, 0, 0]}>
      <ambientLight intensity={dark ? 0.4 : 0.7} />
      <directionalLight position={[4, 6, 8]} intensity={dark ? 1.7 : 1.4} />
      <directionalLight position={[-6, -3, 4]} intensity={0.55} color={dark ? "#c7d2e6" : "#ffffff"} />

      <group ref={spinRef} rotation={[0, 0, 0.4]}>
        {/* brilho de piso / sombra de contato */}
        {textures && (
          <mesh position={[0, 0, -0.1]} raycast={() => null}>
            <planeGeometry args={[7.6, 7.6]} />
            <meshBasicMaterial
              map={textures.glow}
              color={dark ? "#ffffff" : "#000000"}
              transparent
              opacity={dark ? 0.09 : 0.2}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* guias técnicas — anéis e marcações de mostrador */}
        {guideGeos.rings.map((g, i) => (
          <lineLoop key={i} geometry={g} position={[0, 0, 0.004]} raycast={() => null}>
            <lineBasicMaterial color={fg} transparent opacity={dark ? 0.1 : 0.14} />
          </lineLoop>
        ))}
        <lineSegments geometry={guideGeos.ticks} position={[0, 0, 0.004]} raycast={() => null}>
          <lineBasicMaterial color={fg} transparent opacity={dark ? 0.22 : 0.28} />
        </lineSegments>

        {/* fatias */}
        {slices.map((s, i) => (
          <mesh
            key={s.id}
            geometry={geometries[i]}
            ref={(m) => { meshes.current[i] = m }}
            onClick={interactive ? handleClick(s) : undefined}
            onPointerOver={interactive ? (e) => { e.stopPropagation(); setHovered(s.id) } : undefined}
            onPointerOut={interactive ? () => setHovered((h) => (h === s.id ? null : h)) : undefined}
          >
            <meshPhysicalMaterial
              color={s.color}
              emissive={s.risk === "low" ? (dark ? "#bdbdbd" : "#000000") : s.color}
              emissiveIntensity={0}
              metalness={0.62}
              roughness={0.62}
              roughnessMap={textures?.brushed ?? null}
              bumpMap={textures?.brushed ?? null}
              bumpScale={0.012}
              clearcoat={0.55}
              clearcoatRoughness={0.3}
              envMapIntensity={dark ? 1 : 0.7}
              transparent
              opacity={s.ring >= 2 ? 0.94 : 0.97}
              side={THREE.DoubleSide}
            />
            <lineSegments
              geometry={edgeGeometries[i]}
              ref={(l) => { edges.current[i] = l }}
              raycast={() => null}
            >
              <lineBasicMaterial color={fg} transparent opacity={dark ? 0.14 : 0.2} />
            </lineSegments>

            {/* nome gravado na face de cima — acompanha a altura da fatia */}
            {labelTex && plateGeos[i] && (
              <mesh
                geometry={plateGeos[i]!}
                position={[0, 0, s.depth + BEVEL_THICKNESS + 0.008]}
                renderOrder={6}
                raycast={() => null}
              >
                <meshBasicMaterial
                  map={labelTex}
                  transparent
                  opacity={0.95}
                  depthWrite={false}
                  toneMapped={false}
                  polygonOffset
                  polygonOffsetFactor={-2}
                  polygonOffsetUnits={-2}
                />
              </mesh>
            )}
          </mesh>
        ))}

        {/* núcleo usinado — o nó em foco */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.06]} raycast={() => null}>
          <cylinderGeometry args={[hubR, hubR + 0.02, 0.12, 64]} />
          <meshPhysicalMaterial
            color={hubColor}
            metalness={0.85}
            roughness={0.45}
            roughnessMap={textures?.brushed ?? null}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            envMapIntensity={dark ? 1.1 : 0.8}
          />
        </mesh>
        <mesh position={[0, 0, 0.125]} raycast={() => null}>
          <ringGeometry args={[hubR - 0.14, hubR - 0.105, 64]} />
          <meshBasicMaterial color={fg} transparent opacity={dark ? 0.45 : 0.35} />
        </mesh>

        <RadarSweep dark={dark} motionOK={motionOK} inner={inner} />
        {textures && <Motes dark={dark} motionOK={motionOK} glow={textures.glow} />}
      </group>
    </group>
  )
}

/* ─── Canvas pronto para usar ───────────────────────────────────────────── */

export function SunburstCanvas({
  className,
  style,
  dpr = [1, 1.75],
  frameloop = "always",
  camera = { position: [0, 0, 6.6] as [number, number, number], fov: 45 },
  ...scene
}: SunburstSceneProps & {
  className?: string
  style?: CSSProperties
  dpr?: [number, number]
  frameloop?: "always" | "demand" | "never"
  camera?: { position: [number, number, number]; fov: number }
}) {
  return (
    <Canvas
      className={className}
      style={style}
      camera={camera}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, toneMappingExposure: scene.dark ? 1.08 : 1 }}
      frameloop={frameloop}
    >
      <Environment dark={scene.dark} />
      <SunburstScene {...scene} />
    </Canvas>
  )
}
