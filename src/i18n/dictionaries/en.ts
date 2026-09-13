import type { Dictionary } from "./pt"

export const en: Dictionary = {
  meta: {
    title: "Rean Lucas — Forward Deployed Engineer · AI for Critical Infrastructure",
    description:
      "Forward Deployed Engineer shipping deep learning into production inside power-sector operations: models watching hydro plants and substations 24/7, integrated with SAP and SCADA, alerting days before the failure.",
    keywords: [
      "forward deployed engineer",
      "neural networks",
      "deep learning",
      "machine learning in production",
      "predictive maintenance",
      "power sector",
      "LSTM autoencoder",
      "PyTorch",
      "AI agents",
    ],
    ogDescription:
      "I embed where the problem lives and leave only when the model is running, integrated and monitored. Deep learning predicting failures on the power grid.",
    aboutTitle: "About — Rean Lucas · Forward Deployed Engineer",
    aboutDescription:
      "From taking computers apart as a kid to neural networks in production inside a power company. The story, the domains and the method of an engineer who delivers the running system, not the slide deck.",
    projectsTitle: "Projects — Rean Lucas · AI in production for the power sector",
    projectsDescription:
      "Interactive case study: an asset and risk management platform with neural networks and classic ML in ensemble, GCP + AlloyDB, SAP/SCADA integrations and an AI agent that fires alerts over WhatsApp and e-mail.",
  },

  nav: {
    home: "Home",
    about: "About me",
    projects: "Projects",
    contact: "Contact",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    switchTo: "Ler em português",
    switchShort: "PT",
    logoLabel: "Home",
  },

  hero: {
    role: "Forward Deployed Engineer · AI for critical infrastructure",
    status: "Embedded at COPEL · GET",
    headline: ["AI in production.", "Inside the operation.", "Before the failure."],
    pitch:
      "I embed where the problem lives — control room, substation, legacy system — and leave only when the model is running, integrated and monitored. Today, neural networks I shipped to production predict failures in hydro plants and substations at one of Brazil's largest energy companies, days ahead.",
    facts: [
      { k: "Role", v: "Forward Deployed Engineer" },
      { k: "Field", v: "Energy · Hydro · Substations" },
      { k: "Delivery", v: "From sensor to alert" },
    ],
    ctaPrimary: "Let's talk",
    ctaSecondary: "See what's in production",
    proof: [
      "In production 24/7",
      "3 detectors in consensus",
      "Integrated with SAP · SCADA · Oracle",
      "GCP + AlloyDB via Terraform",
    ],
    avatarAlt: "Photo of Rean Lucas",
  },

  risk: {
    overline: "Operations",
    title: "Asset risk, visible at a glance",
    intro:
      "Hydro plants and substations hold the most expensive assets in the power sector. The platform I built consolidates everything into a navigable hierarchy — company → asset → equipment class → equipment → tag — with health per asset and neural detection validated by classic ML.",
    hook: "One of these tags is days away from becoming an emergency. The model already knows which.",
    hookAction: " Drill down through the slices to the tag and see the prediction against the sensor.",
    cta: "Full case study",
  },

  fde: {
    overline: "Forward Deployed",
    title: "What changes when I walk in",
    lead:
      "Consultants deliver slides. Data scientists deliver notebooks. A Forward Deployed Engineer delivers the system running on your infrastructure, with your team able to operate it. The difference is who owns the outcome.",
    pillars: [
      {
        title: "Embedded, not remote",
        text: "I sit with the maintenance engineer, read the work-order history, learn why the sensor lies at 3 a.m. The model is born on the plant floor, not from a generic dataset.",
      },
      {
        title: "Production in weeks, not on a roadmap",
        text: "The goal is the first tag monitored in production before the end of month one. Then scale: more tags, more assets, more integrations — always with something real live.",
      },
      {
        title: "Owns the outcome",
        text: "The person who trained the model is the one who wired it into SAP and the one who answers when the alert fires. No handoffs, no “that's the other team”.",
      },
    ],
    playbook: {
      overline: "Playbook",
      title: "The first 90 days",
      steps: [
        {
          when: "Week 1",
          title: "Immersion",
          text: "Control room, data historian, conversations with the people who operate. I leave with the ten tags that hurt most and the map of systems the model must respect.",
        },
        {
          when: "Weeks 2–4",
          title: "First model live",
          text: "Normality envelope per tag, ensemble validating, alert landing in the team's WhatsApp. Simple inside, useful outside — and in production.",
        },
        {
          when: "Days 30–60",
          title: "Integration",
          text: "SAP, SCADA, Oracle, corporate auth. The alert becomes a work order; the dashboard becomes the shift routine.",
        },
        {
          when: "Day 90",
          title: "Assisted operation",
          text: "Your team runs it, I watch and calibrate. Runbooks, tuned thresholds, retraining plan. The system stays; the dependency on me doesn't.",
        },
      ],
    },
    objection: {
      q: "“Why not hire a team of five?”",
      a: "Because five specialists create four handoffs, and handoffs are where AI projects die. One FDE covering model, platform and integration reaches production before the team of five aligns calendars.",
    },
    riskReversal: "First conversation: 30 minutes, no slides. You bring the problem, I bring questions.",
    cta: "Book the 30 minutes",
  },

  skills: {
    overline: "Stack",
    title: "Technical arsenal",
    rowA: [
      "Neural Networks", "LSTM", "AutoEncoders", "Transformers", "CNNs",
      "Random Forest", "KNN", "PyTorch", "Asset Risk", "KPIs",
      "Data Science", "Python", "Machine Learning", "LLMs", "Vertex AI",
      "AI Agents", "NumPy", "Flask", "Plotly",
    ],
    rowB: [
      "Google Cloud", "AlloyDB", "Terraform", "Infrastructure", "DevOps",
      "Docker", "Linux", "Keycloak", "Denodo", "Data Lakes", "Next.js",
      "TypeScript", "PostgreSQL", "Oracle SQL", "SAP", "Hitachi NM",
      "Industrial Protocols", "OCP / ICCP", "Web APIs", "UI / UX", "C++",
    ],
  },

  about: {
    overline: "Profile",
    title: "About me",
    bio1:
      "Forward Deployed Engineer in the power sector. I build end to end — and from inside the operation — the predictive maintenance system of one of Brazil's largest energy companies: deep learning over hydro plant and substation telemetry, SCADA/SAP integration and GCP cloud.",
    bio2:
      "The result: failures anticipated with days to spare, maintenance that becomes a schedule instead of an emergency, and indicators executives actually read — availability, avoided cost, risk per asset. From zero to deploy, from deploy to operations.",
    more: "Read the full story",
    whatsappLabel: "WhatsApp — +55 (41) 9 8474-8437",
    skills: [
      { label: "Linux", text: "Home. I switch daily between corporate Windows and Linux, and Linux is where the model runs." },
      { label: "Node.js", text: "The runtime I used for years in APIs and CLIs. Retired in favour of the Python world — but I still read and review it." },
      { label: "TypeScript", text: "Main language for everything that reaches the screen: static types kill whole classes of bugs before they reach an operator." },
      { label: "PostgreSQL", text: "The relational database I pick when I get to pick. JSON, advanced indexes, transactions — and AlloyDB when it's GCP." },
      { label: "Docker", text: "Reproducibility as a prerequisite: what trains in my environment runs identically on the plant's server." },
      { label: "Git", text: "In 100% of my projects. Branching, rebase, cherry-pick and the patience to resolve other people's conflicts." },
      { label: "Python", text: "Primary language: data pipelines, model training, Flask back ends and the automations nobody sees." },
      { label: "Machine Learning", text: "Supervised and unsupervised: LSTM Autoencoder, Random Forest, KNN, regression and clustering — always with a metric the business understands." },
      { label: "React / Next.js", text: "Interfaces that convince the executive and the operator at the same time. This site is a sample." },
      { label: "Data Science", text: "Exploration, feature engineering, visualisation and the art of distrusting your own dataset." },
      { label: "DevOps", text: "CI/CD, infrastructure as code, automated deploys and monitoring — the model only exists if it's live." },
      { label: "C++", text: "Solid base in pointers, memory and the STL. I've played with it, don't use it professionally — but I understand the sensor's firmware." },
      { label: "UI / UX", text: "Design centred on the person operating: visual hierarchy, risk states and nothing that needs a manual." },
      { label: "Web APIs", text: "REST with JWT, versioning, rate limiting and OpenAPI. The door through which the model talks to the company." },
      { label: "Oracle SQL", text: "The corporate database where the history lives. Complex queries and PL/SQL to pull out what the model needs." },
      { label: "AI", text: "From failure prediction to the agent that writes the alert: AI applied where the decision has physical consequences." },
      { label: "Neural Networks", text: "Feedforward, CNN, RNN and variants. Training, regularisation, optimisation and evaluation in PyTorch — with thresholds calibrated per equipment." },
      { label: "AutoEncoders", text: "Encoder-decoder learning what normal looks like for each piece of equipment; reconstruction error exposes the abnormal." },
      { label: "LSTM", text: "Long dependencies in multivariate series — vibration, temperature, current — without forgetting what happened yesterday." },
      { label: "SAP", text: "Integration and operation of SAP modules in industrial environments: orders, master data and the work order the agent opens by itself." },
      { label: "Industrial Protocols", text: "Modbus, DNP3, IEC 61850 and the vocabulary of substation SCADA systems." },
      { label: "HTTP", text: "Methods, headers, caching, CORS, WebSockets. The basics done right are what doesn't fall over at 3 a.m." },
      { label: "OCP / ICCP", text: "ICCP/TASE.2 for interoperability between control centres — the bridge between SCADA and the model." },
      { label: "Google Cloud", text: "Training and serving in the cloud: compute, storage, networking and IAM. Environments born reproducible that scale with the data." },
      { label: "Terraform", text: "Versioned infrastructure, reviewed in PRs and recreatable with one apply. Clicking in a console isn't a process, it's an accident." },
      { label: "Infrastructure", text: "Provisioning, networking, VMs, observability and hardening. The foundation that decides whether the team sleeps or wakes up at night." },
      { label: "Transformers", text: "Attention for long dependencies in multivariate series — where the LSTM saturates, attention keeps seeing." },
      { label: "CNNs", text: "Convolutions for spatial and spectral patterns: vibration signatures become maps the network reads channel by channel." },
      { label: "Asset Risk", text: "Translating model output into actionable risk: score per component, plant → equipment → tag hierarchy and maintenance prioritisation." },
      { label: "KPIs", text: "Metrics executives read: availability, failure lead time, avoided cost. A model is only worth the indicator it moves." },
    ],
  },

  projects: {
    overline: "Work",
    title: "My projects",
    cta: "Full case study",
    privateCode: "Private code",
    items: [
      {
        title: "Asset & Risk Management Platform",
        category: "Deep Learning · Power Sector",
        badge: "In production",
        description:
          "Cloud platform (GCP + AlloyDB) watching hydro plant and substation assets of one of Brazil's largest energy companies, 24/7. AI detection — recurrent and convolutional neural networks — validated by classic models (Random Forest, KNN) in an ensemble that scores risk per telemetry tag, integrated with the corporate ecosystem: SAP, Hitachi NM, Oracle SQL, Keycloak, data lakes and Denodo. The failure is flagged before it happens.",
      },
      {
        title: "AI Agent & LLMs",
        category: "Generative AI · Vertex AI",
        badge: "",
        description:
          "LLM-powered AI agent integrated with Vertex AI and open-source models served on in-house infrastructure — routed by cost, latency and data sensitivity. Answers questions about assets and risk in natural language via function calling and RAG, and is the same agent that fires anomaly alerts over WhatsApp and e-mail to the maintenance team.",
      },
      {
        title: "Other projects",
        category: "Confidential",
        badge: "",
        description:
          "What builds real competitive advantage rarely goes on GitHub. Industrial integrations, data pipelines and automations in critical environments are confidential by ethical and professional duty. Want to know how this kind of system works inside? Reach out and we'll talk as far as confidentiality allows.",
      },
    ],
  },

  contact: {
    overline: "Connection",
    title: "Contact",
    statusPrefix: "Right now: ",
    status: "embedded at COPEL · GET",
    text:
      ". Not available for freelance — but conversations about forward-deployed AI, the power sector and critical systems are always welcome:",
    email: "reanlucasdev@gmail.com",
  },

  footer: {
    tagline: "Forward Deployed Engineer · AI for critical infrastructure",
    rights: "© 2026 — All rights reserved",
  },

  demo: {
    hierarchy: "Company → asset → class → equipment → tag",
    drillHint: "Click to drill down · drag to rotate",
    back: "Back",
    levels: {
      asset: "Assets",
      class: "Classes",
      equipment: "Equipment",
      tag: "Tags",
    },
    counts: (n: number, label: string) => `${n} ${label.toLowerCase()}`,
    panel: { tag: "Tag", pred: "Predicted", real: "Actual", deviation: "Deviation" },
    risk: { low: "Low risk", warn: "Warning", critical: "Critical" },
    legendHealth: "% = asset health",
    chart: {
      real: "Actual",
      pred: "Predicted",
      axis: "← 72h · INFERENCE WINDOWS · NOW →",
      aria: (tag: string, asset: string) =>
        `Illustrative chart: model prediction (dashed) versus actual value of tag ${tag} at ${asset}`,
      windowTitle: (i: number, real: string, pred: string) => `Window ${i}: actual ${real} vs predicted ${pred}`,
      caption:
        "The prediction is what the model expected for the tag; the actual is what the sensor measured. While the lines move together, the asset is healthy — when the actual detaches from the prediction, an anomaly is being born. Click another tag on the sunburst to redraw.",
    },
    ensemble: {
      title: "Multi-model detection",
      scale: "anomaly score 0 → 1",
      detectors: {
        lstm: "window reconstruction error",
        knn: "distance to the k neighbours of the normal regime",
        rf: "anomaly probability (window features)",
      },
      verdict: { anomaly: "Anomaly", warn: "Warning", normal: "Normal" },
      consensus: (n: number) => `${n}/3 models flag an anomaly`,
      consensusRest: " — consensus reached: the AI agent fires the alert with tag context over ",
      channels: "WhatsApp and e-mail",
      consensusEnd: " to the maintenance team.",
      divergence: "Detectors disagree",
      divergenceRest: " — the tag goes under intensive observation; without consensus, no alert is fired.",
      normal: "3/3 models agree: normal regime.",
      normalRest: " No action needed — the ensemble keeps watching.",
    },
    replay: {
      header: "Simulated replay · from deviation to alert · auto loop",
      phases: {
        normal: "Normal regime",
        growing: "Deviation growing",
        critical: "Critical · 3/3 consensus",
        agent: "AI agent triggered",
        sent: "Alert sent",
      },
      step1: "01 · Tag drifts from prediction",
      step2: "02 · Risk grows on the sunburst",
      step3: "03 · AI agent acts",
      chartAria: "Animated replay: the tag's actual value progressively drifting away from the model's prediction",
      chartLabel: "VALE DO FERRO SUBSTATION · TRANSFORMER 02 · OIL TEMP (°C)",
      caption: "The Oil Temp segment of Transformer 02 (Vale do Ferro substation) grows and turns red as the deviation worsens.",
      agentSteps: [
        "Ensemble detects persistent deviation",
        "3/3 consensus — event confirmed",
        "Agent gathers context: history, open work orders, tag",
      ],
      group: "Maintenance Group · Substations",
      agentTag: "agent",
      now: "now",
      message:
        "⚠️ ALERT — Vale do Ferro Substation · Transformer 02 · Oil Temp\n" +
        "Actual 68.5°C vs predicted 58.0°C (+18%) over the last hours. " +
        "Ensemble 3/3 in consensus (LSTM-AE · KNN · RF).\n" +
        "Suggestion: inspect the cooling system and open a preventive work order.\n" +
        "— AI Agent · Asset Platform",
    },
  },

  agent: {
    header: "AI agent · illustrative example",
    online: "online",
    question: "How is Transformer 01 right now?",
    answer: {
      a: "",
      asset: "Transformer 01",
      b: " is running with ",
      alert: "1 active alert",
      c: ": Oil Temp at ",
      value: "74.6°C",
      d: " — 20% above prediction (62.1°C), rising for 6h. Current and winding temperature normal. The ensemble is in 3/3 consensus. I recommend inspecting the cooling and bringing the maintenance window forward.",
    },
    sources: "sources: 3 tags · 30d history · 2 previous work orders in SAP",
    actions: ["Open work order in SAP", "View tag on dashboard", "Notify team"],
    footA: "Function calling gives the agent controlled access to the platform's APIs — it doesn't just answer: it ",
    footB: "executes",
    footC: ".",
  },

  telemetry: {
    channels: [
      { label: "Vibration", value: "2.3 mm/s" },
      { label: "Oil Temp", value: "58.2 °C" },
      { label: "Current", value: "402 A" },
    ],
  },

  aboutPage: {
    overline: "About · The road here",
    h1a: "From disassembled hardware to ",
    h1b: "AI in production inside the operation",
    lead:
      "I'm Rean Lucas — Forward Deployed Engineer. I work on the stretch where most AI projects die: getting the model out of the notebook and into production, inside the customer's operation, watching critical assets 24 hours a day.",
    why: {
      overline: "Two audiences, one profile",
      title: "Why me?",
      techLabel: "For the technical team",
      tech:
        "I architect, not just use: LSTM Autoencoder with thresholds calibrated per equipment, an ensemble with Random Forest and KNN before any alert, features in NumPy, serving in Flask on GCP, front end in TypeScript/Next.js. Code review with me is a conversation between peers — from backprop to back end.",
      execLabel: "For decision makers",
      exec:
        "Unplanned failure is the sector's most expensive cost: emergency, downtime, penalties. My system turns that risk into a warning days in advance — maintenance becomes a schedule, not a crisis. One professional covering model, platform and integration, sitting with your team: fewer handoffs, faster delivery, an outcome with an owner.",
    },
    timeline: {
      overline: "Journey",
      title: "The story",
      items: [
        {
          era: "Early years",
          title: "Hardware apart, curiosity assembled",
          text: "Before writing my first line of code, I was already taking computers apart to see what was inside. The lesson stuck: no system is a black box — you can always open it, understand it and improve it.",
        },
        {
          era: "The foundation",
          title: "Real full-stack",
          text: "TypeScript, React, Next.js, Node, PostgreSQL, Docker, Linux. Years building interfaces, APIs and infrastructure gave me what many data scientists lack: the ability to turn a model into a product that runs, scales and stays up.",
        },
        {
          era: "The industrial world",
          title: "Where software meets the physical",
          text: "SCADA, SAP, Oracle, protocols like Modbus, DNP3, IEC 61850 and ICCP/TASE.2. Environments where a bug doesn't create a ticket — it creates physical consequences. Here I learned that reliability isn't a feature, it's a prerequisite.",
        },
        {
          era: "Deep learning in production",
          title: "The neural network that watches the grid",
          text: "I designed and shipped to production a predictive maintenance system with LSTM Autoencoders in PyTorch for the asset monitoring centre of one of Brazil's largest energy companies. Models that learn each piece of equipment's normal behaviour and expose the anomaly before the failure.",
        },
        {
          era: "Today",
          title: "Forward deployed, by definition",
          text: "Studying Systems Analysis and Development at PUC-Paraná while operating in the most demanding lab there is: real production, inside the customer, where a wrong model doesn't lose points — it loses power.",
        },
      ],
    },
    domains: {
      overline: "Expertise",
      title: "Three domains, one head",
      items: [
        {
          title: "Deep Learning & ML",
          text: "Neural architectures applied to real problems: LSTM, autoencoders, CNN, anomaly detection, multivariate time series. PyTorch as the tool, production as the criterion.",
          chips: ["PyTorch", "LSTM Autoencoder", "Transformers", "CNNs", "Anomaly detection", "Asset risk", "Time series", "Feature engineering"],
        },
        {
          title: "Software Engineering",
          text: "From database to browser: APIs, relational databases, containers, CI/CD and interfaces that convince. The most brilliant model in the world is worth nothing if it doesn't become a reliable system.",
          chips: ["Python / Flask", "TypeScript / Next.js", "Google Cloud", "Terraform", "PostgreSQL", "Docker", "DevOps", "UI/UX"],
        },
        {
          title: "Industrial World",
          text: "The domain almost no developer has: substation protocols, SCADA systems, SAP integration. I speak the language of field engineers and of data scientists — and translate between them.",
          chips: ["SCADA", "ICCP/TASE.2", "IEC 61850", "Modbus / DNP3", "SAP", "Oracle SQL", "Hydro plants & substations", "Maintenance KPIs"],
        },
      ],
    },
    principles: {
      overline: "Method",
      title: "How I work",
      items: [
        {
          title: "From zero to deploy",
          text: "I don't deliver a notebook with a pretty chart. I deliver a running system: model trained, API serving, dashboard live, alert reaching whoever needs to act.",
        },
        {
          title: "Production > proof of concept",
          text: "A POC impresses in a meeting; production creates value every day. Every technical decision — from the model threshold to the API retry — assumes the system will run for years, not weeks.",
        },
        {
          title: "Translation between worlds",
          text: "I explain reconstruction error to the maintenance engineer and predictive-maintenance ROI to the executive — without dumbing it down for either.",
        },
        {
          title: "Reliability as a requirement",
          text: "Trained in environments where failure has physical consequences. That changes how you write software: logging, monitoring, graceful degradation and humility about what the model doesn't know.",
        },
      ],
    },
    practice: {
      overline: "In practice",
      title: "What this becomes day to day",
      eventHeader: "Timeline of an event · illustrative example",
      milestones: [
        { label: "Deviation detected", sub: "model flags it" },
        { label: "Ensemble consensus", sub: "3/3 models" },
        { label: "Planned intervention", sub: "work order + part + window" },
        { label: "Failure avoided", sub: "never happened" },
      ],
      textA: "The value of my work is measured by the gap between the first milestone and the last: ",
      textHighlight: "days of lead time",
      textB:
        " to turn what would be a 3 a.m. emergency into scheduled maintenance. For decision makers, that's avoided cost and availability; for the technical team, it's sleeping in peace.",
    },
    cta: {
      title: "Want to see it applied?",
      text: "The predictive monitoring case study shows the full pipeline — from the sensor in the substation to the alert on the screen.",
      primary: "See the projects",
      secondary: "Talk to me",
    },
  },

  projectsPage: {
    overline: "Projects · Deep learning outside the notebook",
    h1a: "Systems that ",
    h1b: "cannot fail",
    lead:
      "My portfolio isn't a collection of demos — it's the record of what runs in production, inside the operation, creating value every day. Explore the interactive case study below.",
    caseOverline: "Case study",
    caseTitle: "Asset & Risk Management Platform",
    badge: "In production",
    context: "Power sector · Hydro plants and substations · Asset monitoring centre",
    problemLabel: "The problem",
    problem:
      "Hydro plant and substation assets fail — and when they fail without warning, the cost is brutal: power unavailability, emergency maintenance, physical and regulatory risk. The traditional model is reactive (fix after it breaks) or blindly preventive (replace good parts on a calendar). One of Brazil's largest energy companies needed a third way: knowing before — and having it integrated with the corporate ecosystem that already exists.",
    solutionLabel: "The solution",
    solution:
      "A cloud asset and risk management platform (GCP, with AlloyDB at the data core): AI detection with recurrent and convolutional neural networks (LSTM Autoencoders, CNNs) validated by classic ML models — Random Forest and KNN — in an ensemble that assigns a risk score per telemetry tag. The company → asset → equipment class → equipment → tag hierarchy consolidates everything into a single view, with a health KPI per asset, and an AI agent fires the alerts with context over WhatsApp and e-mail.",
    pipelineLabel: "The pipeline — from sensor to alert",
    pipeline: [
      { label: "Sensors", detail: "vibration · temperature · current" },
      { label: "Windowing", detail: "multivariate time series" },
      { label: "AI detection", detail: "RNN/LSTM · CNN · autoencoders" },
      { label: "Classic ML", detail: "Random Forest · KNN validate" },
      { label: "Risk score", detail: "ensemble consensus per tag" },
      { label: "AI agent", detail: "fires WhatsApp and e-mail" },
    ],
    exploreLabel: "Explore — drill down through the sunburst",
    integrationsLabel: "Corporate integrations",
    integrations:
      "A real platform doesn't live on an island: authentication via Keycloak and internal corporate systems, orders and master data from SAP and Hitachi NM, history in Oracle SQL, data served by data lakes and virtualised with Denodo. The model is only the heart — the value shows up when it talks to the whole organism.",
    integrationList: ["SAP", "Hitachi NM", "Oracle SQL", "Keycloak", "Corporate auth", "Data lakes", "Denodo", "SCADA / ICCP"],
    impactLabel: "The impact",
    impact: [
      {
        title: "Crisis becomes a schedule",
        text: "Maintenance stops being a 3 a.m. emergency and becomes a planned intervention — with the part in stock, the team scheduled and a window agreed with operations.",
      },
      {
        title: "24/7 visibility",
        text: "Every monitored tag gets its own normality envelope. The team sees trend and deviation in real time, not only after the damage.",
      },
      {
        title: "Risk anticipated",
        text: "Unplanned failure on a critical asset costs downtime, penalties and physical risk. Detecting the deviation days earlier changes the economics of the entire maintenance operation.",
      },
    ],
    stackLabel: "Stack",
    privateNote: "Private code — internal details under confidentiality",
    privateShort: "Private code",
    agent: {
      overline: "Generative AI",
      title: "AI Agent & LLMs",
      whatLabel: "What it does",
      what:
        "A conversational LLM agent that answers about assets and risk in natural language: the engineer asks “how is Transformer 01?” and the agent queries the platform, cross-references telemetry, history and maintenance orders, and answers with context — citing the tags that support the answer. When the ensemble reaches anomaly consensus, it's the same agent that writes and fires the alert.",
      howLabel: "How it works",
      how:
        "LLM orchestration integrated with Vertex AI and open-source models served on in-house infrastructure — routing picks the model by cost, latency and data sensitivity. Function calling gives the agent controlled access to the platform's APIs; RAG anchors the answers in technical documentation; guardrails and continuous evaluation keep the agent on the rails.",
      routingHeader: "Routing per model · illustrative example",
      routing: [
        { label: "Gemini · Vertex AI", pct: 62, note: "general reasoning and tools" },
        { label: "Llama · self-hosted", pct: 28, note: "sensitive data stays in-house" },
        { label: "Mistral · self-hosted", pct: 10, note: "cheap classification and triage" },
      ],
      routingNote:
        "The router picks the LLM by cost, latency and data sensitivity — Vertex AI for the heavy reasoning, self-hosted open source for what cannot leave the building.",
      integrations: [
        {
          title: "Fires WhatsApp",
          text: "Anomaly consensus in the ensemble → the agent writes the alert with tag, deviation and recommendation, and delivers it to the maintenance team's group.",
        },
        {
          title: "Fires e-mail",
          text: "Structured e-mail report for managers: what deviated, since when, what the risk is and the suggested intervention window.",
        },
        {
          title: "Drives systems",
          text: "Via function calling, the agent queries and feeds corporate systems — from the history in Oracle to the work order in SAP.",
        },
      ],
      stack: ["Vertex AI", "Open-source LLMs", "Function calling", "RAG", "Python", "GCP"],
    },
    confidential: {
      overline: "The rest of the iceberg",
      title: "Confidential projects",
      text:
        "Industrial integrations, data pipelines and automations in critical environments — the work that builds real competitive advantage rarely goes on GitHub. These projects are confidential by ethical and professional duty, and that is exactly why they're worth so much: they run where a mistake has consequences. In a conversation, I explain architecture and decisions as far as confidentiality allows.",
    },
    cta: {
      title: "Curious about the details?",
      text: "Architecture, trade-offs, what worked and what I'd do differently — a good technical conversation is my favourite part of the job.",
      primary: "Let's talk",
      secondary: "Read my story",
    },
  },

  notFound: {
    code: "404",
    title: "This page isn't on the sunburst",
    text: "The path doesn't exist or moved. The model detected no anomaly — just a broken link.",
    back: "Back to home",
  },
}
