"use client"

import { BannerSunburst } from "@/components/projetos/assetMonitorDemo"
import { DeepNeural, MidNeuralLeft } from "@/components/neuralDecor"

/*
  Capa do LinkedIn — 1584×396 (proporção oficial). Sempre escura.
  Zona segura: o avatar do perfil cobre o canto inferior esquerdo no
  desktop, então a faixa esquerda fica só com decoração.
*/

const chips = ["PyTorch", "Transformers", "GCP · AlloyDB", "SCADA", "Agentes de IA"]

export default function CoverBoard() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-10">
      <style>{`aside, nav.fixed, .fixed { display: none !important; } main { padding: 0 !important; }`}</style>

      <div
        id="capa"
        className="relative w-[1584px] h-[396px] shrink-0 overflow-hidden bg-[#0c0c0c] text-white"
        style={{ colorScheme: "dark" }}
      >
        {/* decoração neural na zona do avatar */}
        <MidNeuralLeft className="absolute -left-10 -top-6 w-[380px] opacity-[0.22] pointer-events-none" />
        <DeepNeural className="absolute left-24 bottom-0 w-[360px] opacity-[0.14] pointer-events-none" />

        {/* sunburst — protagonista à direita */}
        <BannerSunburst className="absolute -right-16 -top-32 w-[620px] h-[620px]" />

        {/* véu para o texto respirar sobre o giro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/85 to-transparent" />

        {/* texto — centro-direita, acima da zona do avatar */}
        <div className="absolute left-[430px] top-1/2 -translate-y-1/2 max-w-[660px]">
          <p className="font-mono text-[12px] tracking-[0.4em] uppercase text-white/55 mb-3">
            Machine Learning Engineer · Setor Elétrico
          </p>
          <h1 className="font-display text-[58px] leading-[0.95] font-extrabold tracking-tight uppercase mb-4">
            Redes neurais<br />em produção
          </h1>
          <p className="text-[17px] leading-6 text-white/70 mb-5 max-w-[600px]">
            Deep learning que prevê falhas em UHEs e subestações antes da parada
            não planejada — do sensor ao alerta.
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/75"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* hairline + assinatura discreta no rodapé direito */}
        <div className="absolute right-8 bottom-5 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            sensores → modelos → risco → ação
          </span>
        </div>
      </div>
    </div>
  )
}
