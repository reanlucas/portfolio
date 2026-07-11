"use client"
import * as motion from "motion/react-client"

type NodeDef = { x: number; y: number }
type EdgeDef = [number, number]

interface Props {
  nodes: NodeDef[]
  edges: EdgeDef[]
  className?: string
  nodeColor?: string
  edgeColor?: string
  size?: number
  driftX?: number
  driftY?: number
  driftDuration?: number
}

export function NeuralCluster({
  nodes,
  edges,
  className = "",
  nodeColor = "#8f8f8f",
  edgeColor = "#ababab",
  size = 200,
  driftX = 6,
  driftY = 5,
  driftDuration = 18,
}: Props) {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      {/* Whole cluster drifts laterally — edges + nodes stay consistent */}
      <motion.g
        animate={{
          x: [0, driftX, -driftX * 0.5, driftX * 0.3, 0],
          y: [0, -driftY * 0.6, driftY, -driftY * 0.3, 0],
        }}
        transition={{ duration: driftDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Edges — draw/undraw loop */}
        {edges.map(([from, to], i) => (
          <motion.path
            key={i}
            d={`M ${nodes[from].x} ${nodes[from].y} L ${nodes[to].x} ${nodes[to].y}`}
            stroke={edgeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 2.8 + i * 0.3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.55, 1],
            }}
          />
        ))}

        {/* Nodes — pulse */}
        {nodes.map(({ x, y }, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            fill={nodeColor}
            initial={{ r: 3.5 }}
            animate={{ r: [3.5, 5.5, 3.5] }}
            transition={{
              duration: 2.2,
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.g>
    </svg>
  )
}

// ─── Pre-built clusters ──────────────────────────────────────────────────────

export function HeroNeuralLeft({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={260}
      nodeColor="#8f8f8f"
      edgeColor="#ababab"
      driftX={8} driftY={6} driftDuration={16}
      nodes={[
        { x: 20, y: 40 }, { x: 60, y: 20 }, { x: 100, y: 60 },
        { x: 50, y: 90 }, { x: 130, y: 30 }, { x: 150, y: 100 },
      ]}
      edges={[[0,1],[0,3],[1,2],[1,4],[2,3],[2,5],[4,5]]}
    />
  )
}

export function HeroNeuralRight({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={220}
      nodeColor="#9a9a9a"
      edgeColor="#b5b5b5"
      driftX={10} driftY={7} driftDuration={13}
      nodes={[
        { x: 180, y: 30 }, { x: 140, y: 70 }, { x: 190, y: 100 },
        { x: 110, y: 40 }, { x: 160, y: 160 },
      ]}
      edges={[[0,1],[0,2],[1,2],[1,3],[2,4],[1,4]]}
    />
  )
}

export function MidNeuralLeft({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={300}
      nodeColor="#7a7a7a"
      edgeColor="#8f8f8f"
      driftX={7} driftY={9} driftDuration={20}
      nodes={[
        { x: 30, y: 50 }, { x: 80, y: 20 }, { x: 140, y: 60 },
        { x: 90, y: 110 }, { x: 170, y: 130 }, { x: 40, y: 150 }, { x: 220, y: 80 },
      ]}
      edges={[[0,1],[0,3],[1,2],[2,3],[2,6],[3,4],[3,5],[4,6]]}
    />
  )
}

export function MidNeuralRight({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={280}
      nodeColor="#8f8f8f"
      edgeColor="#b0b0b0"
      driftX={11} driftY={8} driftDuration={15}
      nodes={[
        { x: 250, y: 40 }, { x: 200, y: 90 }, { x: 260, y: 130 },
        { x: 170, y: 50 }, { x: 220, y: 200 }, { x: 130, y: 140 },
      ]}
      edges={[[0,1],[0,3],[1,2],[1,5],[2,4],[3,5],[4,5]]}
    />
  )
}

export function BottomNeural({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={340}
      nodeColor="#8f8f8f"
      edgeColor="#ababab"
      driftX={6} driftY={11} driftDuration={22}
      nodes={[
        { x: 30, y: 80 }, { x: 100, y: 30 }, { x: 170, y: 90 },
        { x: 240, y: 40 }, { x: 300, y: 120 }, { x: 130, y: 160 },
        { x: 210, y: 200 }, { x: 60, y: 200 },
      ]}
      edges={[[0,1],[0,7],[1,2],[1,5],[2,3],[2,5],[3,4],[4,6],[5,6],[6,7]]}
    />
  )
}

export function DeepNeural({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={420}
      nodeColor="#8f8f8f"
      edgeColor="#ababab"
      driftX={12} driftY={8} driftDuration={24}
      nodes={[
        { x: 30, y: 80 }, { x: 30, y: 160 }, { x: 30, y: 240 }, { x: 30, y: 320 },
        { x: 140, y: 50 }, { x: 140, y: 140 }, { x: 140, y: 230 }, { x: 140, y: 320 }, { x: 140, y: 380 },
        { x: 260, y: 90 }, { x: 260, y: 185 }, { x: 260, y: 280 }, { x: 260, y: 370 },
        { x: 380, y: 140 }, { x: 380, y: 240 }, { x: 380, y: 340 },
      ]}
      edges={[
        [0,4],[0,5],[0,6],[1,4],[1,5],[1,6],[1,7],
        [2,5],[2,6],[2,7],[2,8],[3,6],[3,7],[3,8],
        [4,9],[4,10],[5,9],[5,10],[5,11],[6,10],[6,11],[6,12],
        [7,11],[7,12],[8,11],[8,12],
        [9,13],[9,14],[10,13],[10,14],[10,15],[11,14],[11,15],[12,15],
      ]}
    />
  )
}

export function LSTMNeural({ className = "" }: { className?: string }) {
  return (
    <NeuralCluster
      className={className}
      size={360}
      nodeColor="#999999"
      edgeColor="#b0b0b0"
      driftX={9} driftY={12} driftDuration={19}
      nodes={[
        { x: 40, y: 60 }, { x: 120, y: 30 }, { x: 200, y: 70 },
        { x: 280, y: 40 }, { x: 320, y: 130 },
        { x: 250, y: 180 }, { x: 160, y: 200 }, { x: 70, y: 170 },
        { x: 100, y: 280 }, { x: 210, y: 310 }, { x: 320, y: 260 },
      ]}
      edges={[
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
        [1,6],[2,5],[3,6],[0,6],
        [7,8],[6,8],[5,9],[4,10],[9,10],[8,9],
      ]}
    />
  )
}
