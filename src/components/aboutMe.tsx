"use client"
import { MidNeuralRight, BottomNeural, DeepNeural, LSTMNeural } from "@/components/neuralDecor"
import { SiTypescript, SiPostgresql, SiReact, SiSap, SiCplusplus, SiGooglecloud, SiTerraform } from "react-icons/si";
import {
  FaDocker, FaPython, FaGit, FaLinux, FaNodeJs,
  FaBrain, FaRobot, FaSitemap, FaLayerGroup, FaHistory,
  FaChartBar, FaCogs, FaPaintBrush, FaGlobe, FaDatabase,
  FaIndustry, FaPlug, FaNetworkWired, FaServer,
  FaProjectDiagram, FaThLarge, FaExclamationTriangle, FaTachometerAlt,
  FaWhatsapp, FaLinkedin, FaGithub,
} from "react-icons/fa";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react"
import { Marquee, Reveal, RevealGroup, RevealItem, SectionTitle } from "@/components/motion/primitives"
import TelemetryStrip from "@/components/viz/telemetryStrip"
import { githubProfileLink, linkedinProfileLink, whatsappLink } from "@/lib/socialMediaLinks";
import { ArrowRight } from "lucide-react";

type SkillItem = {
  icon: ComponentType<{ size?: number | string; className?: string }>
  label: string
  text: string
}

const skills: SkillItem[] = [
  {
    icon: FaLinux,
    label: "Linux",
    text: "Entusiasta de sistemas Linux, mas alterno todo dia entre windows e linux.",
  },
  {
    icon: FaNodeJs,
    label: "Node.js",
    text: "Runtime JavaScript server-side amplamente utilizado para APIs, microsserviços e ferramentas CLI. Aposentei para ficar no Python World.",
  },
  {
    icon: SiTypescript,
    label: "TypeScript",
    text: "Superset tipado de JavaScript que uso como linguagem principal em projetos web. Tipos estáticos eliminam classes inteiras de bugs em runtime.",
  },
  {
    icon: SiPostgresql,
    label: "PostgreSQL",
    text: "Banco de dados relacional open source que eu toco em alguns projetos. Confiável, extensível e com suporte robusto a JSON, índices avançados e transações.",
  },
  {
    icon: FaDocker,
    label: "Docker",
    text: "Containerização de aplicações e bancos de dados para ambientes reprodutíveis em desenvolvimento e produção. Um need to have hoje em dia.",
  },
  {
    icon: FaGit,
    label: "Git",
    text: "Controle de versão distribuído utilizado em 100% dos meus projetos. Branching strategies, rebase, cherry-pick e gestão de conflitos.",
  },
  {
    icon: FaPython,
    label: "Python",
    text: "Linguagem principal para data science, machine learning e automação. Uso em pipelines de dados, treinamento de modelos e back-end com Flask.",
  },
  {
    icon: FaBrain,
    label: "Machine Learning",
    text: "Implementação de modelos supervisionados e não-supervisionados: LSTM Autoencoder, Random Forest, regressão e clustering para análise preditiva.",
  },
  {
    icon: SiReact,
    label: "React / Next.js",
    text: "Ecossistema JS/TS completo: React para interfaces reativas e componentização, Next.js para SSR/SSG, roteamento server-side e API routes integradas. Aposentei para o Python World",
  },
  {
    icon: FaChartBar,
    label: "Data Science",
    text: "Análise exploratória, visualização de dados, feature engineering e modelagem estatística para extração de insights a partir de datasets reais.",
  },
  {
    icon: FaCogs,
    label: "DevOps",
    text: "Pipelines CI/CD, gestão de infraestrutura como código, automação de deploys e monitoramento de sistemas em ambientes de produção.",
  },
  {
    icon: SiCplusplus,
    label: "C++",
    text: "Linguagem para sistemas embarcados, drivers e aplicações com requisitos críticos de performance. Base sólida em ponteiros, memória e STL. Já brinquei mas não uso profissionalmente",
  },
  {
    icon: FaPaintBrush,
    label: "UI / UX",
    text: "Design de interfaces centrado no usuário, prototipagem, sistemas de design e implementação de layouts responsivos e acessíveis.",
  },
  {
    icon: FaGlobe,
    label: "Web APIs",
    text: "Desenvolvimento e consumo de APIs RESTful com autenticação JWT, versionamento de endpoints, rate limiting e documentação OpenAPI.",
  },
  {
    icon: FaDatabase,
    label: "Oracle SQL",
    text: "Banco de dados relacional corporativo amplamente utilizado em ambientes industriais e integrado ao SAP. Experiência com queries complexas e PL/SQL.",
  },
  {
    icon: FaRobot,
    label: "I.A",
    text: "Aplicação de algoritmos de inteligência artificial para automação de decisões, previsão de falhas, reconhecimento de padrões e otimização de processos.",
  },
  {
    icon: FaSitemap,
    label: "Redes Neurais",
    text: "Arquiteturas de deep learning: feedforward, CNN, RNN e suas variantes. Treinamento, regularização, otimização e avaliação de modelos em PyTorch.",
  },
  {
    icon: FaLayerGroup,
    label: "AutoEncoders",
    text: "Redes encoder-decoder para aprendizado não-supervisionado de representações latentes. Aplicadas em compressão de dados e detecção de anomalias por erro de reconstrução.",
  },
  {
    icon: FaHistory,
    label: "LSTM",
    text: "Long Short-Term Memory para modelagem de dependências temporais longas em séries temporais multivariadas — vibração, temperatura e corrente elétrica.",
  },
  {
    icon: SiSap,
    label: "SAP",
    text: "Experiência com integração e operação de módulos SAP em ambientes industriais e corporativos, incluindo consulta e extração de dados.",
  },
  {
    icon: FaIndustry,
    label: "Prot. Industriais",
    text: "Protocolos de comunicação industrial: Modbus, DNP3, IEC 61850 e outros padrões de automação utilizados em sistemas SCADA e subestações.",
  },
  {
    icon: FaNetworkWired,
    label: "HTTP",
    text: "Domínio completo do protocolo HTTP/HTTPS: métodos, headers, status codes, cache, CORS, REST e WebSockets para comunicação em tempo real.",
  },
  {
    icon: FaPlug,
    label: "OCP / ICCP",
    text: "Inter-Control Center Communications Protocol (ICCP/TASE.2) para interoperabilidade entre centros de controle em redes de energia elétrica e sistemas SCADA.",
  },
  {
    icon: SiGooglecloud,
    label: "Google Cloud",
    text: "Cloud para treino e serving de modelos: computação, storage, redes e IAM. Ambientes que nascem reprodutíveis e escalam quando o dado cresce.",
  },
  {
    icon: SiTerraform,
    label: "Terraform",
    text: "Infraestrutura como código: ambientes inteiros versionados, revisáveis em PR e recriáveis com um apply. Clicar em console não é processo, é acidente.",
  },
  {
    icon: FaServer,
    label: "Infraestrutura",
    text: "Provisionamento, redes, VMs, observabilidade e hardening. A fundação que decide se o modelo em produção dorme tranquilo ou acorda a equipe às 3h.",
  },
  {
    icon: FaProjectDiagram,
    label: "Transformers",
    text: "Arquiteturas de atenção para dependências longas em séries temporais multivariadas — onde a LSTM satura, a atenção continua enxergando.",
  },
  {
    icon: FaThLarge,
    label: "CNNs",
    text: "Redes convolucionais para padrões espaciais e espectrais: assinaturas de vibração viram mapas que a rede aprende a ler canal por canal.",
  },
  {
    icon: FaExclamationTriangle,
    label: "Risco de Ativos",
    text: "Tradução da saída do modelo em risco acionável: score por componente, hierarquia usina → equipamento → componente e priorização de manutenção.",
  },
  {
    icon: FaTachometerAlt,
    label: "KPIs",
    text: "Métricas que executivos leem: disponibilidade, antecipação de falha, custo evitado. O modelo só vale pelo indicador que ele move.",
  },
]

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("Redes Neurais")

  const socialLinks = [
    { Icon: FaLinkedin, label: "LinkedIn", href: linkedinProfileLink },
    { Icon: FaGithub, label: "GitHub", href: githubProfileLink },
    { Icon: FaWhatsapp, label: "WhatsApp — (41) 9 8474-8437", href: whatsappLink },
  ]

  const active = skills.find((s) => s.label === activeTab) ?? skills[0]

  return (
    <div className="overflow-hidden relative">
      <MidNeuralRight className="absolute -right-8 top-10 w-72 md:w-[30rem] dark:opacity-[0.20] opacity-[0.25] pointer-events-none" />
      <BottomNeural className="absolute -left-8 bottom-0 w-72 md:w-[34rem] dark:opacity-[0.20] opacity-[0.25] pointer-events-none" />
      <DeepNeural className="absolute right-1/4 bottom-0 w-72 md:w-[32rem] dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />
      <LSTMNeural className="absolute left-1/3 top-1/2 w-56 md:w-80 dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />

      <div className="w-full max-w-7xl p-6 mx-auto flex flex-col gap-8 relative">
        <SectionTitle index="03" overline="Perfil" title="Sobre Mim" />

        {/* Bio + Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal className="md:col-span-2">
            <div className="h-full rounded-none border border-border dark:border-white/10 p-6 bg-muted/40 dark:bg-white/5 leading-8 text-muted-foreground">
              <p className="mb-4">
                Engenheiro de machine learning full-stack no setor elétrico. Construo de ponta a ponta o sistema de manutenção preditiva de uma das maiores companhias de energia do Brasil: deep learning sobre telemetria de UHEs e subestações, integração SCADA/SAP e nuvem GCP.
              </p>
              <p className="mb-5">
                O resultado: falha antecipada com dias de folga, manutenção que vira agenda em vez de emergência e indicadores que executivo lê — disponibilidade, custo evitado, risco por ativo. Do zero ao deploy.
              </p>
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-2 font-medium text-sm text-foreground hover:underline underline-offset-4"
              >
                Ler a história completa
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="flex flex-col gap-3" stagger={0.12}>
            {socialLinks.map(({ Icon, label, href }) => (
              <RevealItem key={label}>
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                  <Link
                    href={href}
                    target="_blank"
                    className="flex items-center gap-3 rounded-none border border-border dark:border-white/10 p-4 bg-muted/40 dark:bg-white/5 hover:bg-accent transition-all duration-200"
                  >
                    <Icon size={22} className="shrink-0" />
                    <span className="font-medium text-sm">{label}</span>
                  </Link>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Telemetria ilustrativa — o dado bruto que alimenta os modelos */}
        <Reveal>
          <TelemetryStrip />
        </Reveal>

        {/* Esteira de skills — Motion Marquee, clicável, pausa no hover */}
        <Reveal>
          <Marquee speed={30} className="py-2">
            {skills.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`
                  shrink-0 w-24 rounded-none cursor-pointer p-3 flex flex-col items-center gap-2 text-center
                  ${label === activeTab
                    ? "bg-accent border border-border dark:border-white/20"
                    : "border border-transparent hover:bg-accent/40"
                  }
                  transition-colors duration-200
                `}
              >
                <Icon size={34} />
                <p className="text-[10px] font-semibold leading-tight">{label}</p>
              </button>
            ))}
          </Marquee>
        </Reveal>

        {/* Painel de descrição — cross-fade entre skills */}
        <Reveal>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full dark:bg-background/50 overflow-x-auto scrollbar-hide h-auto flex-wrap">
              {skills.map(({ label }) => (
                <TabsTrigger
                  key={label}
                  value={label}
                  className={`${label === activeTab ? "bg-accent scale-105" : "hidden md:flex"} transition-all duration-200`}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {skills.map(({ label }) => (
              <TabsContent key={label} value={label} />
            ))}
          </Tabs>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-8 mt-2 text-lg text-center leading-8 rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5"
            >
              {active.text}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </div>
  )
}
