"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UserRound, BrainCircuit, Mail } from "lucide-react"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import ThemeButton from "@/components/changeThemeButton"
import { githubProfileLink, linkedinProfileLink, whatsappLink } from "@/lib/socialMediaLinks"

const pages = [
  { href: "/", label: "Início", Icon: Home },
  { href: "/sobre", label: "Sobre mim", Icon: UserRound },
  { href: "/projetos", label: "Projetos", Icon: BrainCircuit },
]

const socials = [
  { href: githubProfileLink, label: "GitHub", Icon: FaGithub },
  { href: linkedinProfileLink, label: "LinkedIn", Icon: FaLinkedin },
  { href: whatsappLink, label: "WhatsApp", Icon: FaWhatsapp },
]

function NavIcon({
  href,
  label,
  active,
  external,
  layoutGroup = "rail",
  children,
}: {
  href: string
  label: string
  active?: boolean
  external?: boolean
  layoutGroup?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className="group relative flex items-center justify-center"
    >
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative z-10 flex h-10 w-10 items-center justify-center transition-colors duration-200
          ${active
            ? "text-background"
            : "text-muted-foreground hover:text-foreground"
          }`}
      >
        {active && (
          <motion.span
            layoutId={`nav-active-${layoutGroup}`}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute inset-0 bg-foreground"
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.span>

      {/* Tooltip — só no rail desktop */}
      <span
        className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap border border-border
          dark:border-white/10 bg-background/95 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest opacity-0 shadow-lg backdrop-blur
          transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1 md:block"
      >
        {label}
      </span>
    </Link>
  )
}

export default function SideNav() {
  const pathname = usePathname()

  const pageItems = (layoutGroup: string) =>
    pages.map(({ href, label, Icon }) => (
      <NavIcon key={href} href={href} label={label} active={pathname === href} layoutGroup={layoutGroup}>
        <Icon size={19} strokeWidth={2.2} />
      </NavIcon>
    ))

  const socialItems = socials.map(({ href, label, Icon }) => (
    <NavIcon key={label} href={href} label={label} external>
      <Icon size={18} />
    </NavIcon>
  ))

  return (
    <>
      {/* Rail desktop */}
      <motion.aside
        initial={{ x: -72, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.15 }}
        className="fixed left-0 top-0 z-50 hidden h-dvh w-[68px] flex-col items-center border-r
          border-border dark:border-white/10 bg-background/70 py-5 backdrop-blur-xl md:flex"
      >
        <Link href="/" aria-label="Início" className="mb-6">
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-10 w-10 items-center justify-center border border-foreground
              bg-foreground font-display text-sm font-extrabold tracking-tighter text-background"
          >
            RL
          </motion.span>
        </Link>

        <nav className="flex flex-col gap-1.5">{pageItems("rail")}</nav>

        <div className="my-4 h-px w-8 bg-border dark:bg-white/10" />

        <NavIcon href="/#contact" label="Contato">
          <Mail size={19} strokeWidth={2.2} />
        </NavIcon>

        <div className="mt-auto flex flex-col items-center gap-1.5">
          {socialItems}
          <div className="my-2 h-px w-8 bg-border dark:bg-white/10" />
          <ThemeButton />
        </div>
      </motion.aside>

      {/* Dock mobile */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.2 }}
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 border
          border-border dark:border-white/10 bg-background/85 px-2.5 py-2 shadow-xl shadow-black/10
          backdrop-blur-xl md:hidden"
      >
        {pageItems("dock")}
        <div className="mx-1 h-6 w-px bg-border dark:bg-white/10" />
        <NavIcon href={githubProfileLink} label="GitHub" external>
          <FaGithub size={18} />
        </NavIcon>
        <ThemeButton />
      </motion.nav>
    </>
  )
}
