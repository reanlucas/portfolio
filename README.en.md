<div align="center">

# Rean Lucas — Forward Deployed Engineer

**AI in production. Inside the operation. Before the failure.**

[![Live](https://img.shields.io/badge/live-portfolio-000?style=flat-square)](https://portfolio-lovat-gamma-35.vercel.app/en)
[![GitHub](https://img.shields.io/badge/GitHub-reanlucas-000?style=flat-square&logo=github)](https://github.com/reanlucas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rean%20Lucas-000?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/rean-lucas-415aa2365/)

[🇧🇷 Ler em português](./README.md) · 🇺🇸 **English**

</div>

---

I embed where the problem lives — control room, substation, legacy system — and leave only when
the model is running, integrated and monitored. Today, neural networks I shipped to production
predict failures in hydro plants and substations at one of Brazil's largest energy companies,
days ahead.

This repository is the portfolio: **a working demonstration**, not a list of skills.

![Site preview — 3D neural network in the hero and the asset risk sunburst](marketing/site-preview.gif)

**Live:** [portfolio-lovat-gamma-35.vercel.app/en](https://portfolio-lovat-gamma-35.vercel.app/en)

## What a Forward Deployed Engineer is

Consultants deliver slides. Data scientists deliver notebooks. A Forward Deployed Engineer
delivers **the system running on your infrastructure**, with your team able to operate it. The
difference is who owns the outcome.

| | |
| --- | --- |
| **Embedded, not remote** | I sit with the maintenance engineer, read the work-order history and learn why the sensor lies at 3 a.m. The model is born on the plant floor. |
| **Production in weeks** | First tag monitored in production before the end of month one. Then it scales — always with something real live. |
| **Owns the outcome** | Whoever trained the model is the one who wired it into SAP and the one who answers when the alert fires. No handoffs. |

## What's in here

The site demonstrates, with data and animation, the kind of system I build:

- **Navigable 3D asset-risk sunburst** — the whole tree in five levels: company → asset (hydro
  plants and substations) → equipment class (generator, cooling system, capacitor bank…) →
  equipment → tag. Click a ring and it becomes the centre, reopening its subtree; click a tag and
  see the model's prediction against the sensor's actual value. Brushed metal with real
  reflections, a radar sweep and drag with inertia.
- **Predicted × actual** — charts with a normality envelope learned by neural networks
  (RNN/LSTM, CNN, autoencoders), highlighting where the sensor escapes the forecast.
- **Detection ensemble** — an anomaly only becomes an alert when classic ML (Random Forest, KNN)
  agrees with the deep learning: consensus before waking anyone up.
- **End-to-end AI agent** — animated replay of an incident: the tag drifts, risk grows in 3D, the
  agent investigates and fires the alert with context over WhatsApp and e-mail.
- **First 90 days playbook** — immersion, first model live, integration, assisted operation. What
  happens when I walk into the room.
- **3D neural network in the hero** — pulsing like real neurons, fully monochrome, because the
  theme is executive black.

## Stack

| Layer | Technologies |
| --- | --- |
| Site | Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 |
| Animation | Motion (scroll-driven) · react-three-fiber · three.js (PBR, PMREM, shaders) |
| Languages | Typed dictionaries in `src/i18n` — pt-BR and en, sharing one type |
| What I do at work | PyTorch · Transformers · CNNs · Random Forest · KNN · GCP + AlloyDB · Terraform · Vertex AI · open-source LLMs |

## Structure

```
src/
  app/[lang]/          routes per language (pt unprefixed, en under /en)
  i18n/                locale config + pt/en dictionaries
  components/viz/      3D sunburst, telemetry, agent
  components/home/     hero, risk, FDE value proposition, skills
  lib/assetData.ts     bilingual illustrative platform tree (5 levels)
```

Public routes:

- `/` and `/en` — intro, interactive risk demo, value proposition, skills, projects, contact
- `/sobre` and `/en/about` — the journey with animated vignettes per era + practical examples
- `/projetos` and `/en/projects` — full case study of the Asset & Risk Platform and the AI Agent

## Running locally

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # production build
```

---

Built by [Rean Lucas](https://github.com/reanlucas) · demo data is illustrative
(fictional company ENERGIA S.A.) · [reanlucasdev@gmail.com](mailto:reanlucasdev@gmail.com)
