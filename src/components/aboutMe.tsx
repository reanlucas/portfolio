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
import { useLocale } from "@/i18n/context";

type IconType = ComponentType<{ size?: number | string; className?: string }>

// Ícones na mesma ordem das skills do dicionário.
const SKILL_ICONS: IconType[] = [
  FaLinux, FaNodeJs, SiTypescript, SiPostgresql, FaDocker, FaGit, FaPython, FaBrain, SiReact, FaChartBar,
  FaCogs, SiCplusplus, FaPaintBrush, FaGlobe, FaDatabase, FaRobot, FaSitemap, FaLayerGroup, FaHistory, SiSap,
  FaIndustry, FaNetworkWired, FaPlug, SiGooglecloud, SiTerraform, FaServer, FaProjectDiagram, FaThLarge,
  FaExclamationTriangle, FaTachometerAlt,
]

const DEFAULT_SKILL_INDEX = 16 // Redes Neurais / Neural Networks

export default function AboutMe() {
  const { t, href } = useLocale()
  const skills = t.about.skills.map((s, i) => ({ ...s, icon: SKILL_ICONS[i] ?? FaBrain }))
  const [activeTab, setActiveTab] = useState(skills[DEFAULT_SKILL_INDEX].label)

  const socialLinks = [
    { Icon: FaLinkedin, label: t.nav.linkedin, href: linkedinProfileLink },
    { Icon: FaGithub, label: t.nav.github, href: githubProfileLink },
    { Icon: FaWhatsapp, label: t.about.whatsappLabel, href: whatsappLink },
  ]

  const active = skills.find((s) => s.label === activeTab) ?? skills[DEFAULT_SKILL_INDEX]

  return (
    <div className="overflow-hidden relative">
      <MidNeuralRight className="absolute -right-8 top-10 w-72 md:w-[30rem] dark:opacity-[0.20] opacity-[0.25] pointer-events-none" />
      <BottomNeural className="absolute -left-8 bottom-0 w-72 md:w-[34rem] dark:opacity-[0.20] opacity-[0.25] pointer-events-none" />
      <DeepNeural className="absolute right-1/4 bottom-0 w-72 md:w-[32rem] dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />
      <LSTMNeural className="absolute left-1/3 top-1/2 w-56 md:w-80 dark:opacity-[0.14] opacity-[0.18] pointer-events-none" />

      <div className="w-full max-w-7xl p-6 mx-auto flex flex-col gap-8 relative">
        <SectionTitle index="04" overline={t.about.overline} title={t.about.title} />

        {/* Bio + Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal className="md:col-span-2">
            <div className="h-full rounded-none border border-border dark:border-white/10 p-6 bg-muted/40 dark:bg-white/5 leading-8 text-muted-foreground">
              <p className="mb-4">{t.about.bio1}</p>
              <p className="mb-5">{t.about.bio2}</p>
              <Link
                href={href("about")}
                className="group inline-flex items-center gap-2 font-medium text-sm text-foreground hover:underline underline-offset-4"
              >
                {t.about.more}
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

        <Reveal>
          <TelemetryStrip />
        </Reveal>

        {/* Esteira de skills — clicável, pausa no hover */}
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
