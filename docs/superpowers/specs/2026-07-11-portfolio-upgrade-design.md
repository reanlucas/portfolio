# Portfolio Upgrade — Design

Data: 2026-07-11

## Objetivo

Elevar o portfólio ao nível "especialista em redes neurais": atualizar stack, copy de marketing mantendo o tom natural em pt-BR, e animações 2D/3D de alto impacto.

## Decisões (aprovadas pelo usuário)

1. **3D**: cena WebGL real com react-three-fiber — rede neural 3D no hero (nós em camadas, sinapses com pulsos viajando, parallax de mouse). Lazy-loaded via `next/dynamic` (ssr: false) para não afetar o first paint. Respeita `prefers-reduced-motion` e tema claro/escuro.
2. **Disponibilidade (meio-termo)**: indisponível para freelas/contratação, mas aberto a networking, trocas técnicas e conexões. CTA e seção de contato refletem isso.
3. **Copy do projeto CMA**: citar contexto — "centro de monitoramento de ativos de uma grande companhia do setor elétrico", subestações, produção real — sem citar Copel nem detalhes internos.

## Escopo

- **Deps**: Next 16.1.6 → 16.2.10, React → 19.2.7, adicionar `three`, `@react-three/fiber`.
- **Novo componente** `src/components/neuralBrain3D.tsx`: cena 3D do hero (client-only, lazy).
- **Copy** (hero, sobre mim, projetos, contato): reescrita com viés de marketing, tom natural existente preservado (pessoal, direto, bem-humorado onde já era).
- **Projeto CMA**: vira case principal com contexto de setor elétrico e escala real.
- **SEO/metadata**: `lang="pt-BR"`, title/description de marketing.
- **2D extra**: refinamentos nas animações existentes (pulsos nas decorações neurais, micro-interações), sem poluir.

## Fora de escopo

- Novas páginas/rotas, CMS, blog, i18n.
- Trocar o design system (Tailwind 4 + shadcn permanecem).

## Critérios de sucesso

- `pnpm build` passa.
- 3D carrega lazy, hero continua renderizando instantaneamente sem ele.
- Tom do texto continua soando como o autor, não como release corporativo.
