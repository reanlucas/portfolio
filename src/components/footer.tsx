"use client"

import Link from "next/link";
import { githubProfileLink, linkedinProfileLink, whatsappLink } from "@/lib/socialMediaLinks";
import { useLocale } from "@/i18n/context";

export default function Footer() {
  const { t, href } = useLocale()

  const pages = [
    { href: href("home"), label: t.nav.home },
    { href: href("about"), label: t.nav.about },
    { href: href("projects"), label: t.nav.projects },
  ]

  const socials = [
    { href: linkedinProfileLink, label: t.nav.linkedin },
    { href: githubProfileLink, label: t.nav.github },
    { href: whatsappLink, label: t.nav.whatsapp },
  ]

  return (
    <footer className="mt-16 border-t border-border/60 dark:border-white/10 bg-secondary/40 dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground text-center md:text-left">
          <span className="font-display font-bold text-foreground text-base">Rean Lucas</span>
          <span>{t.footer.tagline}</span>
          <span>{t.footer.rights}</span>
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
