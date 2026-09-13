"use client"

import { BannerSunburst } from "@/components/projetos/assetMonitorDemo"
import { DeepNeural, MidNeuralLeft } from "@/components/neuralDecor"
import { useLocale } from "@/i18n/context"

/*
  Capa do LinkedIn — 1584×396 (proporção oficial), sempre escura.

  Zonas seguras:
  · o avatar do perfil cobre o canto inferior esquerdo no desktop, então a
    faixa até ~400px só recebe decoração;
  · o celular corta as laterais, então a manchete começa no centro-esquerda
    e nada essencial encosta na borda direita.

  Sai em dois idiomas: /capa (pt) e /en/capa (en).
*/

const copy = {
  pt: {
    overline: "Forward Deployed Engineer · IA em infraestrutura crítica",
    line1: "IA em produção.",
    line2: "Dentro da operação.",
    line3: "Antes da falha.",
    lead: "Redes neurais vigiando UHEs e subestações 24/7 — falha prevista com dias de antecedência.",
    flow: "sensores → modelos → risco → ação",
    chips: ["PyTorch", "GCP · AlloyDB", "SCADA · SAP", "Agentes de IA"],
  },
  en: {
    overline: "Forward Deployed Engineer · AI for critical infrastructure",
    line1: "AI in production.",
    line2: "Inside the operation.",
    line3: "Before the failure.",
    lead: "Neural networks watching hydro plants and substations 24/7 — failures called days ahead.",
    flow: "sensors → models → risk → action",
    chips: ["PyTorch", "GCP · AlloyDB", "SCADA · SAP", "AI Agents"],
  },
}

export default function CoverBoard() {
  const { locale } = useLocale()
  const t = copy[locale]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-10">
      <style>{`aside, nav.fixed, .fixed { display: none !important; } main { padding: 0 !important; }`}</style>

      <div
        id="capa"
        className="relative w-[1584px] h-[396px] shrink-0 overflow-hidden bg-[#0b0b0b] text-white"
        style={{ colorScheme: "dark" }}
      >
        {/* decoração neural na zona do avatar */}
        <MidNeuralLeft className="absolute -left-16 -top-10 w-[420px] opacity-[0.2] pointer-events-none" />
        <DeepNeural className="absolute left-16 -bottom-8 w-[380px] opacity-[0.12] pointer-events-none" />

        {/* sunburst — protagonista à direita, sangrando na borda */}
        <BannerSunburst className="absolute -right-[30px] -top-[118px] w-[600px] h-[600px]" />

        {/* véu para o texto respirar sobre o giro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] from-58% via-[#0b0b0b]/80 via-68% to-transparent to-80%" />

        {/* fio de luz separando decoração e conteúdo */}
        <div className="absolute left-[404px] top-[74px] bottom-[74px] w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />

        {/* conteúdo — centro-esquerda, longe do avatar e da borda */}
        <div className="absolute left-[452px] top-1/2 -translate-y-1/2 w-[700px]">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-white/55 mb-4">
            {t.overline}
          </p>

          <h1 className="font-display text-[43px] leading-[1.06] font-extrabold tracking-tight uppercase mb-4 whitespace-nowrap">
            <span className="text-white/40">{t.line1}</span>
            <br />
            <span className="text-white/40">{t.line2}</span>
            <br />
            <span className="text-white">{t.line3}</span>
          </h1>

          <p className="text-[15px] leading-6 text-white/70 mb-5 max-w-[640px]">{t.lead}</p>

          <div className="flex flex-wrap items-center gap-2">
            {t.chips.map((c) => (
              <span
                key={c}
                className="border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-widest text-white/75"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* assinatura do fluxo, no rodapé do bloco de texto */}
        <p className="absolute left-[452px] bottom-[26px] font-mono text-[10px] uppercase tracking-[0.34em] text-white/35">
          {t.flow}
        </p>
      </div>
    </div>
  )
}
