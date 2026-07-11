import type { Metadata } from "next";
import AboutStory from "@/components/sobre/aboutStory";

export const metadata: Metadata = {
  title: "Sobre mim — Rean Lucas · Redes Neurais & Deep Learning",
  description:
    "Do hardware desmontado na infância à rede neural em produção no setor elétrico. A história, os domínios e a forma de trabalhar de um engenheiro que constrói do sensor ao pixel.",
};

export default function SobrePage() {
  return <AboutStory />;
}
