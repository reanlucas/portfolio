import Link from "next/link";
import { githubProfileLink, linkedinProfileLink, whatsappLink } from "@/lib/socialMediaLinks";

export default function Footer() {
  const pages = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre mim" },
    { href: "/projetos", label: "Projetos" },
  ]

  const socials = [
    { href: linkedinProfileLink, label: "LinkedIn" },
    { href: githubProfileLink, label: "GitHub" },
    { href: whatsappLink, label: "WhatsApp" },
  ]

  return (
    <footer className="mt-16 border-t border-border/60 dark:border-white/10 bg-secondary/40 dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground text-center md:text-left">
          <span className="font-display font-bold text-foreground text-base">Rean Lucas</span>
          <span>Redes neurais em produção no mundo real</span>
          <span>© 2026 — Todos os direitos reservados</span>
        </div>

        <nav className="flex items-center gap-6">
          {pages.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {socials.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
