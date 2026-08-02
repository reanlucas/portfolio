"use client"

import { BannerSunburst, TagChart, ALL_TAGS, ASSETS, EQUIPMENT_COUNT, DEFAULT_TAG, detectorScores, DETECTORS } from "@/components/projetos/assetMonitorDemo"

/*
  Prancheta 1200×627 (proporção de post do LinkedIn) — visão completa da
  plataforma numa imagem só. Sempre escura, independente do tema.
*/

const tag = ALL_TAGS.find((t) => t.id === DEFAULT_TAG)!
const scores = detectorScores(tag)
const deviation = ((tag.real - tag.pred) / tag.pred) * 100

const pipeline = ["Sensores", "Janelamento", "Detecção por IA", "ML clássico", "Score de risco", "Agente de IA"]
const bullets = [
  ["Detecção por IA", "RNN/LSTM · CNN · autoencoders — um envelope de normalidade por tag"],
  ["Validação clássica", "Random Forest e KNN votam em ensemble antes de qualquer alerta"],
  ["Nuvem corporativa", "GCP + AlloyDB · Terraform · SAP · Oracle · Keycloak · Denodo"],
  ["Agente de IA", "consenso de anomalia → alerta com contexto via WhatsApp e e-mail"],
]
const stack = ["PyTorch", "GCP · AlloyDB", "Terraform", "Vertex AI", "LLMs open source", "Next.js · three.js"]

export default function BannerBoard() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-10">
      <style>{`aside, nav.fixed, .fixed { display: none !important; } main { padding: 0 !important; }`}</style>

      <div
        id="banner"
        className="relative w-[1200px] h-[627px] shrink-0 overflow-hidden bg-[#0d0d0d] text-white border border-white/10 flex flex-col"
        style={{ colorScheme: "dark" }}
      >
        {/* Cabeçalho */}
        <div className="flex items-end justify-between gap-6 px-8 pt-6 pb-4 border-b border-white/10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/50 mb-1.5">
              Deep learning em produção · Setor elétrico · UHEs e subestações
            </p>
            <h1 className="font-display text-[30px] leading-none font-extrabold tracking-tight uppercase">
              Plataforma de Gestão de Ativos e Riscos
            </h1>
          </div>
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[360px]">
            {stack.map((s) => (
              <span key={s} className="border border-white/15 bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white/75">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Corpo */}
        <div className="flex-1 grid grid-cols-12 gap-0 min-h-0">
          {/* O que é */}
          <div className="col-span-3 border-r border-white/10 px-6 py-4 flex flex-col justify-between">
            {bullets.map(([t, d]) => (
              <div key={t}>
                <p className="font-display text-[13px] font-bold uppercase tracking-tight mb-0.5">{t}</p>
                <p className="text-[11px] leading-4 text-white/55">{d}</p>
              </div>
            ))}
          </div>

          {/* Sunburst menor + legenda */}
          <div className="col-span-4 border-r border-white/10 flex flex-col">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 px-5 pt-3">
              Empresa → ativo → equipamento → tag
            </p>
            <div className="relative flex-1 min-h-0">
              <BannerSunburst className="absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-[10px] font-extrabold tracking-[0.2em]">ENERGIA S.A.</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/50">
                    {ASSETS.length} ativos · {EQUIPMENT_COUNT} equipamentos · {ALL_TAGS.length} tags
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 px-4 pb-2.5">
              {[["Baixo", "#5a5a5a"], ["Atenção", "#f59e0b"], ["Crítico", "#ef4444"]].map(([l, c]) => (
                <span key={l} className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/60">
                  <span className="h-2 w-2 inline-block" style={{ background: c }} />
                  {l}
                </span>
              ))}
            </div>
            {/* Painel da tag */}
            <div className="grid grid-cols-4 border-t border-white/10 divide-x divide-white/10">
              {[
                ["Tag", `${tag.name}`, tag.asset],
                ["Predição", `${tag.pred}${tag.unit}`, "modelo"],
                ["Real", `${tag.real}${tag.unit}`, "sensor"],
                ["Desvio", `+${deviation.toFixed(1)}%`, "crítico"],
              ].map(([k, v, s], i) => (
                <div key={k} className="px-3 py-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">{k}</p>
                  <p className="font-display text-[15px] font-extrabold leading-tight" style={i === 3 ? { color: "#ef4444" } : undefined}>
                    {v}
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-white/40">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico + ensemble */}
          <div className="col-span-5 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-5 pt-3">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50">
                {tag.asset} · {tag.name} — predição × real
              </p>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/60 flex items-center gap-3">
                <span className="flex items-center gap-1"><svg width="14" height="2"><line x1="0" x2="14" y1="1" y2="1" stroke="currentColor" strokeWidth="2" /></svg>real</span>
                <span className="flex items-center gap-1"><svg width="14" height="2"><line x1="0" x2="14" y1="1" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" strokeOpacity="0.6" /></svg>pred</span>
              </span>
            </div>
            <div className="flex-1 flex items-center px-2 min-h-0">
              <TagChart tag={tag} />
            </div>
            {/* Ensemble */}
            <div className="border-t border-white/10 px-5 py-3 flex flex-col gap-1.5">
              {DETECTORS.map(({ key, name }, i) => (
                <div key={key} className="grid grid-cols-[110px_1fr_88px] items-center gap-3">
                  <span className="font-display text-[10px] font-bold uppercase tracking-tight">{name}</span>
                  <div className="h-1.5 bg-white/10">
                    <div className="h-full" style={{ width: `${scores[i] * 100}%`, background: "#ef4444" }} />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-right" style={{ color: "#ef4444" }}>
                    {scores[i].toFixed(2)} anomalia
                  </span>
                </div>
              ))}
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/55 pt-1">
                consenso 3/3 → agente de IA dispara WhatsApp + e-mail
              </p>
            </div>
          </div>
        </div>

        {/* Pipeline + assinatura */}
        <div className="flex items-center justify-between gap-4 px-8 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            {pipeline.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/65">
                  <span className="text-white/35 mr-1">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </span>
                {i < pipeline.length - 1 && <span className="h-1 w-1 rounded-full bg-white/30 inline-block" />}
              </span>
            ))}
          </div>
          <span className="font-display text-[11px] font-extrabold tracking-tight uppercase whitespace-nowrap">
            Rean Lucas · Redes Neurais em Produção
          </span>
        </div>
      </div>
    </div>
  )
}
