import type { Metadata } from "next";
import CoverBoard from "@/components/marketing/coverBoard";

// Prancheta interna para gerar a capa do LinkedIn (1584×396).
// Não é linkada em lugar nenhum e não deve ser indexada.
export const metadata: Metadata = {
  title: "capa",
  robots: { index: false, follow: false },
};

export default function CapaPage() {
  return <CoverBoard />;
}
