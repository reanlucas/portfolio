export const locales = ["pt", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "pt"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Chaves de rota → caminho público em cada idioma.
 *  PT fica sem prefixo (URLs antigas continuam válidas); EN vive em /en. */
export type RouteKey = "home" | "about" | "projects" | "contact"

const routes: Record<Locale, Record<RouteKey, string>> = {
  pt: { home: "/", about: "/sobre", projects: "/projetos", contact: "/#contact" },
  en: { home: "/en", about: "/en/about", projects: "/en/projects", contact: "/en#contact" },
}

export function localizedHref(locale: Locale, key: RouteKey) {
  return routes[locale][key]
}

/** Dado o pathname atual, devolve a chave da rota (para nav ativa e para
 *  trocar de idioma mantendo a página).
 *
 *  Aceita tanto a URL pública (`/sobre`, `/en/about`) quanto a interna do
 *  App Router (`/pt/about`) — no prerender estático o pathname vem com o
 *  prefixo do idioma, e ignorá-lo marcava o item errado no menu. */
export function routeKeyFromPath(pathname: string): RouteKey {
  const clean = pathname.replace(/^\/(en|pt)(?=\/|$)/, "").replace(/\/$/, "") || "/"
  if (clean === "/sobre" || clean === "/about") return "about"
  if (clean === "/projetos" || clean === "/projects") return "projects"
  return "home"
}

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" }
export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" }
