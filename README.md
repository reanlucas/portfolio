<div align="center">

# Rean Lucas — Forward Deployed Engineer

**IA em produção. Dentro da operação. Antes da falha.**

[![Ao vivo](https://img.shields.io/badge/ao%20vivo-portfolio-000?style=flat-square)](https://portfolio-lovat-gamma-35.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-reanlucas-000?style=flat-square&logo=github)](https://github.com/reanlucas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rean%20Lucas-000?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/rean-lucas-415aa2365/)

🇧🇷 **Português** · [🇺🇸 Read in English](./README.en.md)

</div>

---

Eu me instalo onde o problema mora — sala de controle, subestação, sistema legado — e só saio
quando o modelo está rodando, integrado e vigiado. Hoje, redes neurais que coloquei em produção
preveem falhas em usinas hidrelétricas e subestações de uma das maiores companhias de energia do
Brasil, com dias de antecedência.

Este repositório é o portfólio: **uma demonstração funcional**, não uma lista de skills.

![Preview do site — rede neural 3D no hero e sunburst de risco de ativos](marketing/site-preview.gif)

**Ao vivo:** [portfolio-lovat-gamma-35.vercel.app](https://portfolio-lovat-gamma-35.vercel.app/)

## O que é Forward Deployed Engineer

Consultor entrega slide. Cientista de dados entrega notebook. Forward Deployed Engineer entrega
**o sistema rodando na sua infraestrutura**, com o seu time sabendo operar. A diferença está em
quem fica responsável pelo resultado.

| | |
| --- | --- |
| **Embedded, não remoto** | Sento com o engenheiro de manutenção, leio o histórico de OS e entendo por que o sensor mente às 3h. O modelo nasce do chão da usina. |
| **Produção em semanas** | Primeira tag monitorada em produção antes do fim do primeiro mês. Depois escala — sempre com algo real no ar. |
| **Dono do resultado** | Quem treinou o modelo é quem o integrou ao SAP e quem responde quando o alerta dispara. Sem handoff. |

## O que tem aqui

O site demonstra, com dados e animações, o tipo de sistema que eu construo:

- **Sunburst 3D navegável de risco de ativos** — a árvore inteira em cinco níveis: empresa →
  ativo (UHEs e SEs) → classe de equipamento (gerador, sistema de resfriamento, banco de
  capacitores…) → equipamento → tag. Todo nó aparece com o nome gravado na própria fatia, em
  metal escovado com reflexos reais. Clique num anel e ele vira o centro, reabrindo a subárvore;
  clique numa tag e veja a predição do modelo contra o valor real do sensor.
- **Predição × real** — gráficos com envelope de normalidade aprendido por redes neurais
  (RNN/LSTM, CNN, autoencoders), destacando os pontos onde o sensor foge do previsto.
- **Ensemble de detecção** — a anomalia só vira alerta quando ML clássico (Random Forest, KNN)
  concorda com o deep learning: consenso antes de acordar alguém.
- **Agente de IA de ponta a ponta** — replay animado de um incidente: a tag desvia, o risco cresce
  no 3D, o agente investiga e dispara o alerta com contexto via WhatsApp e e-mail.
- **Playbook dos primeiros 90 dias** — imersão, primeiro modelo no ar, integração, operação
  assistida. O que acontece quando eu entro na sala.
- **Rede neural 3D no hero** — pulsando como neurônios de verdade, 100% monocromática, porque o
  tema é preto executivo.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Site | Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 |
| Animações | Motion (scroll-driven) · react-three-fiber · three.js (PBR, PMREM, shaders) |
| Idiomas | Dicionários tipados em `src/i18n` — pt-BR e en, tipo compartilhado |
| O que eu faço no trabalho | PyTorch · Transformers · CNNs · Random Forest · KNN · GCP + AlloyDB · Terraform · Vertex AI · LLMs open source |

## Estrutura

```
src/
  app/[lang]/          rotas por idioma (pt sem prefixo, en em /en)
  i18n/                config de locale + dicionários pt/en
  components/viz/      sunburst 3D, telemetria, agente
  components/home/     hero, risco, proposta de valor FDE, skills
  lib/assetData.ts     árvore ilustrativa bilíngue (5 níveis) da plataforma
```

Rotas públicas:

- `/` e `/en` — apresentação, demo interativa de risco, proposta de valor, skills, projetos, contato
- `/sobre` e `/en/about` — trajetória com vinhetas animadas por era + exemplos práticos
- `/projetos` e `/en/projects` — case completo da Plataforma de Gestão de Ativos e Riscos e do Agente de IA

## Rodando local

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # build de produção
```

---

Feito por [Rean Lucas](https://github.com/reanlucas) · dados dos demos são ilustrativos
(empresa fictícia ENERGIA S.A.) · [reanlucasdev@gmail.com](mailto:reanlucasdev@gmail.com)
