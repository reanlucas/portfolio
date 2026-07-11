"use client"

import dynamic from "next/dynamic"

// three.js + r3f só chegam depois do first paint — o hero renderiza
// instantaneamente e a rede 3D faz fade-in quando o chunk carrega.
const NeuralBrain3D = dynamic(() => import("@/components/neuralBrain3D"), {
  ssr: false,
})

export default function Hero3D() {
  return <NeuralBrain3D />
}
