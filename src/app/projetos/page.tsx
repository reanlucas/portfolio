import type { Metadata } from "next";
import CaseStudies from "@/components/projetos/caseStudies";

export const metadata: Metadata = {
  title: "Projetos — Rean Lucas · Deep Learning em produção",
  description:
    "Estudo de caso interativo: plataforma de gestão de ativos e riscos no setor elétrico — detecção por redes neurais e ML clássico, GCP + AlloyDB, integrações corporativas e agente de IA que dispara alertas por WhatsApp e e-mail.",
};

export default function ProjetosPage() {
  return <CaseStudies />;
}
