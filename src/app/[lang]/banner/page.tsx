import type { Metadata } from "next";
import BannerBoard from "@/components/marketing/bannerBoard";

// Prancheta interna para gerar a imagem de divulgação (LinkedIn).
// Não é linkada em lugar nenhum e não deve ser indexada.
export const metadata: Metadata = {
  title: "banner",
  robots: { index: false, follow: false },
};

export default function BannerPage() {
  return <BannerBoard />;
}
