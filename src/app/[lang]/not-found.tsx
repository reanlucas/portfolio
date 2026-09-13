"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLocale } from "@/i18n/context"

export default function NotFound() {
  const { t, href } = useLocale()
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-8 md:p-12">
        <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-muted-foreground mb-3">{t.notFound.code}</p>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight uppercase mb-4">{t.notFound.title}</h1>
        <p className="text-muted-foreground leading-7 mb-8">{t.notFound.text}</p>
        <Link
          href={href("home")}
          className="group inline-flex items-center gap-2 h-12 px-6 font-semibold text-sm uppercase tracking-widest bg-foreground text-background hover:opacity-85 transition-opacity"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          {t.notFound.back}
        </Link>
      </div>
    </div>
  )
}
