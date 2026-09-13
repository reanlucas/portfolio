"use client"

import { createContext, useContext, type ReactNode } from "react"
import { localizedHref, type Locale, type RouteKey } from "./config"
import { getDictionary } from "./dictionaries"
import type { Dictionary } from "./dictionaries/pt"

type LocaleContextValue = {
  locale: Locale
  t: Dictionary
  href: (key: RouteKey) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value: LocaleContextValue = {
    locale,
    t: getDictionary(locale),
    href: (key) => localizedHref(locale, key),
  }
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale precisa estar dentro de <LocaleProvider>")
  return ctx
}

/** Atalho: só o dicionário. */
export function useT() {
  return useLocale().t
}
