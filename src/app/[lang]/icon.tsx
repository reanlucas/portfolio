import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Símbolo solto, sem fundo — como o favicon da Google.
// Dois tons garantem leitura nos dois temas de aba: o preenchimento
// branco aparece no escuro, o contorno grafite aparece no claro.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          background: "transparent",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64">
          <path d="M16 16 L48 32 M16 48 L48 32 M16 16 L16 48" stroke="#8a8a8a" strokeWidth="4" fill="none" />
          <circle cx="16" cy="16" r="9" fill="#ffffff" stroke="#3d3d3d" strokeWidth="3.5" />
          <circle cx="16" cy="48" r="9" fill="#ffffff" stroke="#3d3d3d" strokeWidth="3.5" />
          <circle cx="48" cy="32" r="10" fill="#ffffff" stroke="#3d3d3d" strokeWidth="3.5" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
