"use client"

import { motion } from "motion/react"

/*
  Vinhetas animadas da timeline — line-art monocromático, uma cena por era.
  Tudo em currentColor para herdar o tema; loops sutis e contínuos.
*/

const stroke = { stroke: "currentColor", strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

/* 01 — boneco curioso desmontando um PC e se deslumbrando */
export function HardwareScene() {
  return (
    <svg viewBox="0 0 200 140" className="w-full" aria-hidden>
      {/* chão */}
      <line x1="10" y1="122" x2="190" y2="122" {...stroke} opacity="0.25" />

      {/* boneco: cabeça, corpo, braço apontando para o gabinete */}
      <circle cx="48" cy="62" r="10" {...stroke} />
      <path d="M48 72 L48 98 M48 80 L32 90 M48 80 L70 70 M48 98 L38 120 M48 98 L58 120" {...stroke} />

      {/* deslumbre: ! e faíscas piscando */}
      <motion.text
        x="60" y="42" fontSize="18" fontWeight="bold" fill="currentColor" fontFamily="var(--font-geist-mono)"
        animate={{ opacity: [0, 1, 1, 0], y: [46, 40, 40, 38] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.2, 0.8, 1] }}
      >
        !
      </motion.text>
      {[
        { x: 30, y: 40, d: 0 },
        { x: 72, y: 28, d: 0.7 },
        { x: 88, y: 52, d: 1.3 },
      ].map(({ x, y, d }) => (
        <motion.path
          key={`${x}-${y}`}
          d={`M${x} ${y - 4} L${x} ${y + 4} M${x - 4} ${y} L${x + 4} ${y}`}
          {...stroke}
          strokeWidth={1.3}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: d }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {/* gabinete aberto */}
      <rect x="120" y="46" width="46" height="72" {...stroke} />
      <line x1="120" y1="58" x2="166" y2="58" {...stroke} opacity="0.5" />
      <circle cx="127" cy="52" r="1.6" fill="currentColor" />
      {/* tampa lateral encostada, torta */}
      <path d="M172 118 L192 110 L188 62 L170 70" {...stroke} opacity="0.6" />

      {/* cooler flutuando e girando */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "143px 26px" }}
        >
          <circle cx="143" cy="26" r="11" {...stroke} />
          <path d="M143 15 L143 26 M133.5 31.5 L143 26 M152.5 31.5 L143 26" {...stroke} strokeWidth={1.3} />
        </motion.g>
      </motion.g>

      {/* pente de RAM flutuando */}
      <motion.g
        animate={{ y: [0, -5, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ transformOrigin: "100px 96px" }}
      >
        <rect x="88" y="92" width="26" height="8" {...stroke} />
        <path d="M91 100 L91 103 M96 100 L96 103 M101 100 L101 103 M106 100 L106 103 M111 100 L111 103" {...stroke} strokeWidth={1.2} />
      </motion.g>

      {/* parafusos soltos quicando */}
      {[
        { x: 106, y: 116, d: 0 },
        { x: 96, y: 118, d: 0.9 },
      ].map(({ x, y, d }) => (
        <motion.circle
          key={x}
          cx={x} cy={y} r="2.2" {...stroke} strokeWidth={1.2}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: d }}
        />
      ))}
    </svg>
  )
}

/* 02 — full-stack: janela de browser com código se escrevendo */
export function FullstackScene() {
  const lines = [
    { y: 52, w: 74, d: 0 },
    { y: 66, w: 96, d: 0.4 },
    { y: 80, w: 58, d: 0.8 },
    { y: 94, w: 84, d: 1.2 },
  ]
  return (
    <svg viewBox="0 0 200 140" className="w-full" aria-hidden>
      <rect x="30" y="24" width="140" height="96" {...stroke} />
      <line x1="30" y1="38" x2="170" y2="38" {...stroke} opacity="0.5" />
      <circle cx="38" cy="31" r="1.6" fill="currentColor" />
      <circle cx="45" cy="31" r="1.6" fill="currentColor" />
      <circle cx="52" cy="31" r="1.6" fill="currentColor" />

      {lines.map(({ y, w, d }) => (
        <motion.line
          key={y}
          x1="42" y1={y} x2={42 + w} y2={y}
          {...stroke}
          strokeWidth={3}
          opacity={0.55}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: d, times: [0, 0.35, 1], repeatDelay: 0.4 }}
        />
      ))}
      {/* caret piscando */}
      <motion.rect
        x="42" y="103" width="7" height="9" fill="currentColor"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  )
}

/* 03 — mundo industrial: torre de transmissão emitindo sinal */
export function IndustrialScene() {
  return (
    <svg viewBox="0 0 200 140" className="w-full" aria-hidden>
      <line x1="10" y1="124" x2="190" y2="124" {...stroke} opacity="0.25" />
      {/* torre treliçada */}
      <path d="M85 124 L100 34 L115 124 M88 106 L112 106 M91 88 L109 88 M94 70 L106 70 M96 52 L104 52" {...stroke} />
      <path d="M88 106 L109 88 M112 106 L91 88 M91 88 L106 70 M109 88 L94 70" {...stroke} strokeWidth={1} opacity="0.5" />
      {/* travessa com cabos */}
      <path d="M70 52 L130 52 M70 52 L74 60 M130 52 L126 60" {...stroke} />

      {/* ondas de sinal pulsando */}
      {[16, 26, 36].map((r, i) => (
        <motion.path
          key={r}
          d={`M ${100 - r} ${30 - r * 0.2} A ${r} ${r} 0 0 1 ${100 + r} ${30 - r * 0.2}`}
          {...stroke}
          strokeWidth={1.4}
          animate={{ opacity: [0, 0.9, 0], scale: [0.9, 1.05, 1.1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
          style={{ transformOrigin: "100px 34px" }}
        />
      ))}
      {/* raio */}
      <motion.path
        d="M100 34 L96 44 L102 44 L97 56"
        {...stroke}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </svg>
  )
}

/* 04 — deep learning em produção: rede com pulso viajando */
export function DeepLearningScene() {
  const L1 = [{ x: 45, y: 40 }, { x: 45, y: 70 }, { x: 45, y: 100 }]
  const L2 = [{ x: 100, y: 32 }, { x: 100, y: 58 }, { x: 100, y: 84 }, { x: 100, y: 110 }]
  const L3 = [{ x: 155, y: 55 }, { x: 155, y: 88 }]
  const edges: [{ x: number; y: number }, { x: number; y: number }][] = []
  L1.forEach((a) => L2.forEach((b) => edges.push([a, b])))
  L2.forEach((a) => L3.forEach((b) => edges.push([a, b])))

  return (
    <svg viewBox="0 0 200 140" className="w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} {...stroke} strokeWidth={0.8} opacity={0.3} />
      ))}
      {[...L1, ...L2, ...L3].map(({ x, y }, i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r="5" {...stroke}
          animate={{ r: [5, 6.5, 5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      {/* pulso viajando entrada → saída */}
      <motion.circle
        r="3.5" fill="currentColor"
        animate={{ cx: [45, 100, 155], cy: [70, 58, 55], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        r="3.5" fill="currentColor"
        animate={{ cx: [45, 100, 155], cy: [100, 84, 88], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  )
}

/* 05 — hoje: laptop com batimento vivo + capelo */
export function TodayScene() {
  return (
    <svg viewBox="0 0 200 140" className="w-full" aria-hidden>
      {/* laptop */}
      <rect x="55" y="52" width="90" height="56" {...stroke} />
      <path d="M45 108 L155 108 L163 118 L37 118 Z" {...stroke} />
      {/* batimento — o sistema vivo em produção */}
      <motion.path
        d="M62 82 L82 82 L90 66 L100 96 L108 74 L114 82 L138 82"
        {...stroke}
        strokeWidth={1.8}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1], opacity: [0.4, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      />
      {/* capelo flutuando */}
      <motion.g
        animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 30px" }}
      >
        <path d="M72 30 L100 20 L128 30 L100 40 Z" {...stroke} />
        <path d="M100 40 L100 46 M124 32 L124 42" {...stroke} strokeWidth={1.3} />
        <circle cx="124" cy="44" r="2" {...stroke} strokeWidth={1.2} />
      </motion.g>
    </svg>
  )
}
