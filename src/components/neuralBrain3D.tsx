"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

// Camadas do MLP renderizado: nº de neurônios por camada, distribuídos
// em espiral de ângulo áureo no plano y-z para nunca ficarem colineares.
const LAYERS = [5, 9, 13, 9, 5]
const LAYER_GAP = 2.9
const EDGES_PER_NODE = 3
const PULSE_COUNT = 36

// PRNG determinístico — a topologia da rede é sempre a mesma entre renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildNetwork() {
  const rand = mulberry32(20260711)
  const base: number[] = []
  const layerStart: number[] = []
  let count = 0

  LAYERS.forEach((n, li) => {
    layerStart.push(count)
    const x = (li - (LAYERS.length - 1) / 2) * LAYER_GAP
    for (let k = 0; k < n; k++) {
      const r = 0.62 * Math.sqrt(k + 0.6) * (2.3 / Math.sqrt(n))
      const angle = k * 2.399963 + li * 1.7
      base.push(
        x + (rand() - 0.5) * 0.5,
        Math.cos(angle) * r * 1.55 + (rand() - 0.5) * 0.3,
        Math.sin(angle) * r * 1.55 + (rand() - 0.5) * 0.3,
      )
      count++
    }
  })

  const edges: [number, number][] = []
  for (let li = 0; li < LAYERS.length - 1; li++) {
    for (let k = 0; k < LAYERS[li]; k++) {
      const from = layerStart[li] + k
      for (let e = 0; e < EDGES_PER_NODE; e++) {
        const to = layerStart[li + 1] + Math.floor(rand() * LAYERS[li + 1])
        edges.push([from, to])
      }
    }
  }

  // fase e frequência próprias de cada neurônio — o "drift" orgânico
  const wobble = Array.from({ length: count }, () => ({
    fx: 0.18 + rand() * 0.22,
    fy: 0.15 + rand() * 0.2,
    fz: 0.16 + rand() * 0.2,
    px: rand() * Math.PI * 2,
    py: rand() * Math.PI * 2,
    pz: rand() * Math.PI * 2,
    amp: 0.14 + rand() * 0.16,
  }))

  const pulses = Array.from({ length: PULSE_COUNT }, () => ({
    edge: Math.floor(rand() * edges.length),
    t: rand(),
    speed: 0.1 + rand() * 0.18,
  }))

  return {
    base: new Float32Array(base),
    positions: new Float32Array(base),
    edges,
    edgePositions: new Float32Array(edges.length * 6),
    wobble,
    pulses,
    count,
  }
}

// Sprite radial para os pontos ficarem redondos e com glow, em vez de quadrados.
function makeGlowTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.35, "rgba(255,255,255,0.55)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

type Palette = {
  node: string
  pulse: string
  edge: string
  edgeOpacity: number
  nodeOpacity: number
  blending: THREE.Blending
}

function NetworkScene({ dark, motionOK }: { dark: boolean; motionOK: boolean }) {
  const group = useRef<THREE.Group>(null)
  const nodeGeo = useRef<THREE.BufferGeometry>(null)
  const nodeMat = useRef<THREE.PointsMaterial>(null)
  const pulseGeo = useRef<THREE.BufferGeometry>(null)
  const edgeGeo = useRef<THREE.BufferGeometry>(null)
  const edgeMat = useRef<THREE.LineBasicMaterial>(null)

  const net = useMemo(buildNetwork, [])
  const sprite = useMemo(makeGlowTexture, [])
  useEffect(() => () => sprite.dispose(), [sprite])

  // Monocromático executivo. Aditivo brilha no escuro; no claro vai blending normal.
  const palette: Palette = dark
    ? { node: "#e5e5e5", pulse: "#ffffff", edge: "#9a9a9a", edgeOpacity: 0.14, nodeOpacity: 0.85, blending: THREE.AdditiveBlending }
    : { node: "#262626", pulse: "#0a0a0a", edge: "#525252", edgeOpacity: 0.22, nodeOpacity: 0.75, blending: THREE.NormalBlending }

  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), [])

  // posiciona os vértices das arestas a partir das posições atuais dos nós
  const syncEdges = (positions: Float32Array) => {
    net.edges.forEach(([a, b], i) => {
      net.edgePositions[i * 6] = positions[a * 3]
      net.edgePositions[i * 6 + 1] = positions[a * 3 + 1]
      net.edgePositions[i * 6 + 2] = positions[a * 3 + 2]
      net.edgePositions[i * 6 + 3] = positions[b * 3]
      net.edgePositions[i * 6 + 4] = positions[b * 3 + 1]
      net.edgePositions[i * 6 + 5] = positions[b * 3 + 2]
    })
  }
  // primeira pintura (e modo reduced-motion) já com arestas coerentes
  useMemo(() => syncEdges(net.base), [net]) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state, dt) => {
    if (!group.current || !motionOK) return
    const t = state.clock.elapsedTime

    // ── Rotação contemplativa + parallax de mouse bem amortecido
    const targetY = t * 0.03 + state.pointer.x * 0.18
    const targetX = -state.pointer.y * 0.1 + Math.sin(t * 0.09) * 0.04
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 1.1)
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 1.1)

    // ── Respiração: zoom in/out lento da câmera + leve expansão do grupo
    state.camera.position.z = 10.5 + Math.sin(t * 0.11) * 1.4
    const breathe = 1 + Math.sin(t * 0.35) * 0.025
    group.current.scale.setScalar(breathe)

    // ── Neurônios flutuam organicamente, cada um no seu ritmo
    for (let i = 0; i < net.count; i++) {
      const w = net.wobble[i]
      net.positions[i * 3] = net.base[i * 3] + Math.sin(t * w.fx + w.px) * w.amp
      net.positions[i * 3 + 1] = net.base[i * 3 + 1] + Math.sin(t * w.fy + w.py) * w.amp
      net.positions[i * 3 + 2] = net.base[i * 3 + 2] + Math.sin(t * w.fz + w.pz) * w.amp
    }
    syncEdges(net.positions)
    if (nodeGeo.current) nodeGeo.current.attributes.position.needsUpdate = true
    if (edgeGeo.current) edgeGeo.current.attributes.position.needsUpdate = true

    // ── Corpo celular pulsando — tamanho e brilho respiram juntos
    if (nodeMat.current) {
      nodeMat.current.size = 0.34 + Math.sin(t * 0.7) * 0.05
      nodeMat.current.opacity = palette.nodeOpacity * (0.82 + 0.18 * Math.sin(t * 0.55 + 1.3))
    }
    if (edgeMat.current) {
      edgeMat.current.opacity = palette.edgeOpacity * (0.75 + 0.25 * Math.sin(t * 0.45))
    }

    // ── Potenciais de ação viajando pelas sinapses, sem pressa
    for (let i = 0; i < net.pulses.length; i++) {
      const p = net.pulses[i]
      p.t += p.speed * dt
      if (p.t > 1) {
        p.t = 0
        p.edge = (p.edge + 7 + i) % net.edges.length
      }
      const [a, b] = net.edges[p.edge]
      const e = p.t * p.t * (3 - 2 * p.t)
      pulsePositions[i * 3] = net.positions[a * 3] + (net.positions[b * 3] - net.positions[a * 3]) * e
      pulsePositions[i * 3 + 1] = net.positions[a * 3 + 1] + (net.positions[b * 3 + 1] - net.positions[a * 3 + 1]) * e
      pulsePositions[i * 3 + 2] = net.positions[a * 3 + 2] + (net.positions[b * 3 + 2] - net.positions[a * 3 + 2]) * e
    }
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true
  })

  return (
    <group ref={group} rotation={[0.1, 0.4, 0]}>
      <lineSegments>
        <bufferGeometry ref={edgeGeo}>
          <bufferAttribute attach="attributes-position" args={[net.edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={edgeMat}
          color={palette.edge}
          transparent
          opacity={palette.edgeOpacity}
          blending={palette.blending}
          depthWrite={false}
        />
      </lineSegments>

      <points>
        <bufferGeometry ref={nodeGeo}>
          <bufferAttribute attach="attributes-position" args={[net.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMat}
          color={palette.node}
          size={0.34}
          sizeAttenuation
          map={sprite}
          transparent
          opacity={palette.nodeOpacity}
          blending={palette.blending}
          depthWrite={false}
        />
      </points>

      <points>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={palette.pulse}
          size={0.2}
          sizeAttenuation
          map={sprite}
          transparent
          opacity={motionOK ? 0.85 : 0}
          blending={palette.blending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function NeuralBrain3D() {
  const { resolvedTheme } = useTheme()
  const [motionOK, setMotionOK] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotionOK(!mq.matches)
    const onChange = () => setMotionOK(!mq.matches)
    mq.addEventListener("change", onChange)
    // fade-in só depois de montar, para o hero não "piscar" quando o chunk chega
    const id = requestAnimationFrame(() => setVisible(true))
    return () => {
      mq.removeEventListener("change", onChange)
      cancelAnimationFrame(id)
    }
  }, [])

  const dark = resolvedTheme !== "light"

  return (
    <div
      aria-hidden
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={motionOK ? "always" : "demand"}
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <NetworkScene dark={dark} motionOK={motionOK} />
      </Canvas>
    </div>
  )
}
