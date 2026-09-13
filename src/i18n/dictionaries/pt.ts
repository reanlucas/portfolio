/*
  Dicionário pt-BR — fonte da verdade do formato. `en.ts` é tipado a partir
  daqui, então qualquer chave nova precisa existir nos dois.
*/

export const pt = {
  meta: {
    title: "Rean Lucas — Forward Deployed Engineer · IA em Infraestrutura Crítica",
    description:
      "Forward Deployed Engineer que coloca deep learning em produção dentro da operação do setor elétrico: modelos vigiando usinas e subestações 24/7, integrados a SAP e SCADA, com alerta dias antes da falha.",
    keywords: [
      "forward deployed engineer",
      "redes neurais",
      "deep learning",
      "machine learning em produção",
      "manutenção preditiva",
      "setor elétrico",
      "LSTM autoencoder",
      "PyTorch",
      "agentes de IA",
    ],
    ogDescription:
      "Eu me instalo onde o problema mora e só saio quando o modelo está rodando, integrado e vigiado. Deep learning prevendo falhas na rede elétrica.",
    aboutTitle: "Sobre — Rean Lucas · Forward Deployed Engineer",
    aboutDescription:
      "Do hardware desmontado na infância à rede neural em produção dentro de uma companhia de energia. A história, os domínios e o método de um engenheiro que entrega o sistema rodando, não o slide.",
    projectsTitle: "Projetos — Rean Lucas · IA em produção no setor elétrico",
    projectsDescription:
      "Estudo de caso interativo: plataforma de gestão de ativos e riscos com redes neurais e ML clássico em ensemble, GCP + AlloyDB, integrações SAP/SCADA e agente de IA que dispara alertas por WhatsApp e e-mail.",
  },

  nav: {
    home: "Início",
    about: "Sobre mim",
    projects: "Projetos",
    contact: "Contato",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    switchTo: "Read in English",
    switchShort: "EN",
    logoLabel: "Início",
  },

  hero: {
    role: "Forward Deployed Engineer · IA em infraestrutura crítica",
    status: "Embedded na COPEL · GET",
    headline: ["IA em produção.", "Dentro da operação.", "Antes da falha."],
    pitch:
      "Eu me instalo onde o problema mora — sala de controle, subestação, sistema legado — e só saio quando o modelo está rodando, integrado e vigiado. Hoje, redes neurais que coloquei em produção preveem falhas em usinas e subestações de uma das maiores companhias de energia do Brasil, com dias de antecedência.",
    facts: [
      { k: "Função", v: "Forward Deployed Engineer" },
      { k: "Campo", v: "Energia · UHEs · Subestações" },
      { k: "Entrega", v: "Do sensor ao alerta" },
    ],
    ctaPrimary: "Vamos conversar",
    ctaSecondary: "Ver o que roda em produção",
    proof: [
      "Em produção 24/7",
      "3 detectores em consenso",
      "Integrado a SAP · SCADA · Oracle",
      "GCP + AlloyDB via Terraform",
    ],
    avatarAlt: "Foto de Rean Lucas",
  },

  risk: {
    overline: "Operação",
    title: "Risco de ativos, visível de uma vez",
    intro:
      "Usinas e subestações concentram os ativos mais caros do setor elétrico. A plataforma que construí consolida tudo numa hierarquia navegável — empresa → ativo → equipamento → tag — com saúde por ativo e detecção neural validada por ML clássico.",
    hook: "Uma dessas tags está a dias de virar emergência. O modelo já sabe qual.",
    hookAction: " Clique numa fatia e veja a predição contra o sensor.",
    cta: "Estudo de caso completo",
  },

  fde: {
    overline: "Forward Deployed",
    title: "O que muda quando eu entro na sala",
    lead:
      "Consultor entrega slide. Cientista de dados entrega notebook. Forward Deployed Engineer entrega o sistema rodando na sua infraestrutura, com o seu time sabendo operar. A diferença está em quem fica responsável pelo resultado.",
    pillars: [
      {
        title: "Embedded, não remoto",
        text: "Sento com o engenheiro de manutenção, leio o histórico de OS, entendo por que o sensor mente às 3h da manhã. O modelo nasce do chão da usina, não de um dataset genérico.",
      },
      {
        title: "Produção em semanas, não em roadmap",
        text: "A meta é ter a primeira tag monitorada em produção antes do fim do primeiro mês. Depois, escala: mais tags, mais ativos, mais integrações — sempre com algo real no ar.",
      },
      {
        title: "Dono do resultado",
        text: "Quem treinou o modelo é quem o integrou ao SAP e quem responde quando o alerta dispara. Sem handoff, sem “isso é com o outro time”.",
      },
    ],
    playbook: {
      overline: "Playbook",
      title: "Os primeiros 90 dias",
      steps: [
        {
          when: "Semana 1",
          title: "Imersão",
          text: "Sala de controle, historiador de dados, conversa com quem opera. Saio com a lista das dez tags que mais doem e o mapa dos sistemas que o modelo precisa respeitar.",
        },
        {
          when: "Semanas 2–4",
          title: "Primeiro modelo no ar",
          text: "Envelope de normalidade por tag, ensemble validando, alerta chegando no WhatsApp da equipe. Simples por dentro, útil por fora — e em produção.",
        },
        {
          when: "Dias 30–60",
          title: "Integração",
          text: "SAP, SCADA, Oracle, autenticação corporativa. O alerta vira ordem de serviço; o dashboard vira rotina do turno.",
        },
        {
          when: "Dia 90",
          title: "Operação assistida",
          text: "Seu time opera, eu observo e calibro. Runbooks, limiares ajustados, plano de retreino. O sistema fica; a dependência de mim, não.",
        },
      ],
    },
    objection: {
      q: "“Por que não montar um time de cinco?”",
      a: "Porque cinco especialistas geram quatro handoffs, e é no handoff que projeto de IA morre. Um FDE que cobre modelo, plataforma e integração chega em produção antes de o time de cinco alinhar a agenda.",
    },
    riskReversal: "Primeira conversa: 30 minutos, sem slides. Você traz o problema, eu trago perguntas.",
    cta: "Marcar os 30 minutos",
  },

  skills: {
    overline: "Stack",
    title: "Arsenal técnico",
    rowA: [
      "Redes Neurais", "LSTM", "AutoEncoders", "Transformers", "CNNs",
      "Random Forest", "KNN", "PyTorch", "Risco de Ativos", "KPIs",
      "Data Science", "Python", "Machine Learning", "LLMs", "Vertex AI",
      "Agentes de IA", "NumPy", "Flask", "Plotly",
    ],
    rowB: [
      "Google Cloud", "AlloyDB", "Terraform", "Infraestrutura", "DevOps",
      "Docker", "Linux", "Keycloak", "Denodo", "Data Lakes", "Next.js",
      "TypeScript", "PostgreSQL", "Oracle SQL", "SAP", "Hitachi NM",
      "Protocolos Industriais", "OCP / ICCP", "Web APIs", "UI / UX", "C++",
    ],
  },

  about: {
    overline: "Perfil",
    title: "Sobre mim",
    bio1:
      "Forward Deployed Engineer no setor elétrico. Construo de ponta a ponta — e de dentro da operação — o sistema de manutenção preditiva de uma das maiores companhias de energia do Brasil: deep learning sobre telemetria de UHEs e subestações, integração SCADA/SAP e nuvem GCP.",
    bio2:
      "O resultado: falha antecipada com dias de folga, manutenção que vira agenda em vez de emergência e indicadores que executivo lê — disponibilidade, custo evitado, risco por ativo. Do zero ao deploy, do deploy à operação.",
    more: "Ler a história completa",
    whatsappLabel: "WhatsApp — (41) 9 8474-8437",
    skills: [
      { label: "Linux", text: "Casa. Alterno todo dia entre Windows corporativo e Linux, e é no Linux que o modelo roda." },
      { label: "Node.js", text: "Runtime que usei por anos em APIs e CLIs. Hoje aposentado em favor do mundo Python — mas ainda leio e reviso." },
      { label: "TypeScript", text: "Linguagem principal do que aparece na tela: tipos estáticos eliminam classes inteiras de bug antes de chegar ao operador." },
      { label: "PostgreSQL", text: "Banco relacional que escolho quando posso escolher. JSON, índices avançados, transações — e AlloyDB quando é GCP." },
      { label: "Docker", text: "Reprodutibilidade como pré-requisito: o que treina no meu ambiente roda igual no servidor da usina." },
      { label: "Git", text: "Em 100% dos projetos. Branching, rebase, cherry-pick e a paciência de resolver conflito alheio." },
      { label: "Python", text: "Idioma principal: pipelines de dados, treino de modelo, back-end em Flask e as automações que ninguém vê." },
      { label: "Machine Learning", text: "Supervisionado e não supervisionado: LSTM Autoencoder, Random Forest, KNN, regressão e clustering — sempre com métrica que o negócio entende." },
      { label: "React / Next.js", text: "Interfaces que convencem executivo e operador ao mesmo tempo. Este site é uma amostra." },
      { label: "Data Science", text: "Exploração, feature engineering, visualização e a arte de desconfiar do próprio dataset." },
      { label: "DevOps", text: "CI/CD, infraestrutura como código, deploy automatizado e monitoramento — o modelo só existe se estiver no ar." },
      { label: "C++", text: "Base sólida em ponteiros, memória e STL. Já brinquei, não uso profissionalmente — mas entendo o firmware do sensor." },
      { label: "UI / UX", text: "Design centrado em quem opera: hierarquia visual, estados de risco e nada que precise de manual." },
      { label: "Web APIs", text: "REST com JWT, versionamento, rate limiting e OpenAPI. A porta por onde o modelo conversa com a empresa." },
      { label: "Oracle SQL", text: "O banco corporativo onde mora o histórico. Queries complexas e PL/SQL para tirar dele o que o modelo precisa." },
      { label: "I.A", text: "Da previsão de falha ao agente que redige o alerta: IA aplicada onde a decisão tem consequência física." },
      { label: "Redes Neurais", text: "Feedforward, CNN, RNN e variantes. Treino, regularização, otimização e avaliação em PyTorch — com limiar calibrado por equipamento." },
      { label: "AutoEncoders", text: "Encoder-decoder aprendendo o normal de cada equipamento; o erro de reconstrução denuncia o anormal." },
      { label: "LSTM", text: "Dependências longas em séries multivariadas — vibração, temperatura, corrente — sem perder a memória do que aconteceu ontem." },
      { label: "SAP", text: "Integração e operação de módulos SAP em ambiente industrial: ordens, cadastros e a OS que o agente abre sozinho." },
      { label: "Protocolos Industriais", text: "Modbus, DNP3, IEC 61850 e o vocabulário dos sistemas SCADA de subestação." },
      { label: "HTTP", text: "Métodos, headers, cache, CORS, WebSockets. O básico bem feito é o que não cai às 3h." },
      { label: "OCP / ICCP", text: "ICCP/TASE.2 para interoperabilidade entre centros de controle — a ponte entre SCADA e o modelo." },
      { label: "Google Cloud", text: "Treino e serving em nuvem: computação, storage, rede e IAM. Ambientes que nascem reprodutíveis e escalam com o dado." },
      { label: "Terraform", text: "Infraestrutura versionada, revisada em PR e recriável com um apply. Clicar em console não é processo, é acidente." },
      { label: "Infraestrutura", text: "Provisionamento, redes, VMs, observabilidade e hardening. A fundação que decide se a equipe dorme ou acorda de madrugada." },
      { label: "Transformers", text: "Atenção para dependências longas em séries multivariadas — onde a LSTM satura, a atenção continua enxergando." },
      { label: "CNNs", text: "Convoluções para padrões espaciais e espectrais: assinaturas de vibração viram mapas que a rede lê canal por canal." },
      { label: "Risco de Ativos", text: "Tradução da saída do modelo em risco acionável: score por componente, hierarquia usina → equipamento → tag e priorização de manutenção." },
      { label: "KPIs", text: "Métricas que executivo lê: disponibilidade, antecipação de falha, custo evitado. O modelo só vale pelo indicador que ele move." },
    ],
  },

  projects: {
    overline: "Trabalho",
    title: "Meus projetos",
    cta: "Estudo de caso completo",
    privateCode: "Código privado",
    items: [
      {
        title: "Plataforma de Gestão de Ativos e Riscos",
        category: "Deep Learning · Setor Elétrico",
        badge: "Em produção",
        description:
          "Plataforma em nuvem (GCP + AlloyDB) que vigia ativos de UHEs e subestações de uma das maiores companhias de energia do Brasil, 24/7. Detecção por IA — redes neurais recorrentes e convolucionais — validada por modelos clássicos (Random Forest, KNN) num ensemble que dá score de risco por tag de telemetria, integrada ao ecossistema corporativo: SAP, Hitachi NM, Oracle SQL, Keycloak, data lakes e Denodo. A falha é sinalizada antes de acontecer.",
      },
      {
        title: "Agente de IA & LLMs",
        category: "IA Generativa · Vertex AI",
        badge: "",
        description:
          "Agente de IA com LLM integrado ao Vertex AI e a modelos open source servidos em infraestrutura própria — roteamento por custo, latência e sensibilidade do dado. Responde sobre ativos e risco em linguagem natural via function calling e RAG, e é o mesmo agente que dispara alertas de anomalia por WhatsApp e e-mail para a equipe de manutenção.",
      },
      {
        title: "Outros projetos",
        category: "Confidencial",
        badge: "",
        description:
          "O que constrói vantagem competitiva de verdade raramente pode ir para o GitHub. Integrações industriais, pipelines de dados e automações em ambiente crítico são confidenciais por dever ético e profissional. Quer saber como esse tipo de sistema funciona por dentro? Me chama e conversamos até onde a confidencialidade permite.",
      },
    ],
  },

  contact: {
    overline: "Conexão",
    title: "Contato",
    statusPrefix: "No momento: ",
    status: "embedded na COPEL · GET",
    text:
      ". Sem disponibilidade para freelas — mas conversas sobre forward deployment de IA, setor elétrico e sistemas críticos são sempre bem-vindas:",
    email: "reanlucasdev@gmail.com",
  },

  footer: {
    tagline: "Forward Deployed Engineer · IA em infraestrutura crítica",
    rights: "© 2026 — Todos os direitos reservados",
  },

  demo: {
    hierarchy: "Empresa → ativo → equipamento → tag",
    clickTag: "Clique numa tag · arraste para girar",
    assetsTags: (assets: number, tags: number) => `${assets} ativos · ${tags} tags`,
    panel: { tag: "Tag", pred: "Predição", real: "Real", deviation: "Desvio" },
    risk: { low: "Baixo risco", warn: "Atenção", critical: "Crítico" },
    legendHealth: "% = saúde do ativo",
    chart: {
      real: "Real",
      pred: "Predição",
      axis: "← 72h · JANELAS DE INFERÊNCIA · AGORA →",
      aria: (tag: string, asset: string) =>
        `Gráfico ilustrativo: predição do modelo (pontilhada) versus valor real da tag ${tag} de ${asset}`,
      windowTitle: (i: number, real: string, pred: string) => `Janela ${i}: real ${real} vs predição ${pred}`,
      caption:
        "A predição é o que o modelo esperava para a tag; o real é o que o sensor mediu. Enquanto as linhas andam juntas, o ativo está saudável — quando o real descola da predição, a anomalia está nascendo. Clique em outra tag no sunburst para redesenhar.",
    },
    ensemble: {
      title: "Detecção multi-modelo",
      scale: "score de anomalia 0 → 1",
      detectors: {
        lstm: "erro de reconstrução da janela",
        knn: "distância aos k vizinhos do regime normal",
        rf: "probabilidade de anomalia (features da janela)",
      },
      verdict: { anomaly: "Anomalia", warn: "Atenção", normal: "Normal" },
      consensus: (n: number) => `${n}/3 modelos apontam anomalia`,
      consensusRest: " — consenso atingido: o agente de IA dispara o alerta com contexto da tag via ",
      channels: "WhatsApp e e-mail",
      consensusEnd: " para a equipe de manutenção.",
      divergence: "Divergência entre detectores",
      divergenceRest: " — a tag entra em observação intensiva; sem consenso, nenhum alerta é disparado.",
      normal: "3/3 modelos concordam: regime normal.",
      normalRest: " Nenhuma ação necessária — o ensemble segue vigiando.",
    },
    replay: {
      header: "Replay simulado · do desvio ao alerta · loop automático",
      phases: {
        normal: "Regime normal",
        growing: "Desvio crescendo",
        critical: "Crítico · consenso 3/3",
        agent: "Agente de IA acionado",
        sent: "Alerta enviado",
      },
      step1: "01 · Tag desvia da predição",
      step2: "02 · Risco cresce no sunburst",
      step3: "03 · Agente de IA age",
      chartAria: "Replay animado: valor real da tag desviando progressivamente da predição do modelo",
      chartLabel: "SE VALE DO FERRO · TRAFO 02 · TEMP. ÓLEO (°C)",
      caption: "O segmento da Temp. Óleo do Trafo 02 (SE Vale do Ferro) cresce e avermelha conforme o desvio piora.",
      agentSteps: [
        "Ensemble detecta desvio persistente",
        "Consenso 3/3 — evento confirmado",
        "Agente coleta contexto: histórico, OS abertas, tag",
      ],
      group: "Grupo Manutenção · Subestações",
      agentTag: "agente",
      now: "agora",
      message:
        "⚠️ ALERTA — SE Vale do Ferro · Trafo 02 · Temp. Óleo\n" +
        "Real 68.5°C vs predição 58.0°C (+18%) nas últimas horas. " +
        "Ensemble 3/3 em consenso (LSTM-AE · KNN · RF).\n" +
        "Sugestão: inspecionar o sistema de refrigeração e abrir OS preventiva.\n" +
        "— Agente IA · Plataforma de Ativos",
    },
  },

  agent: {
    header: "Agente de IA · exemplo ilustrativo",
    online: "online",
    question: "Como está o Trafo 01 agora?",
    answer: {
      a: "O ",
      asset: "Trafo 01",
      b: " opera com ",
      alert: "1 alerta ativo",
      c: ": Temp. Óleo em ",
      value: "74.6°C",
      d: " — 20% acima da predição (62.1°C), em alta há 6h. Corrente e temperatura de enrolamento normais. O ensemble está em consenso 3/3. Recomendo inspecionar a refrigeração e antecipar a janela de manutenção.",
    },
    sources: "fontes: 3 tags · histórico 30d · 2 OS anteriores no SAP",
    actions: ["Abrir OS no SAP", "Ver tag no dashboard", "Notificar equipe"],
    footA: "Function calling dá ao agente acesso controlado às APIs da plataforma — ele não só responde: ",
    footB: "executa",
    footC: ".",
  },

  telemetry: {
    channels: [
      { label: "Vibração", value: "2.3 mm/s" },
      { label: "Temp. Óleo", value: "58.2 °C" },
      { label: "Corrente", value: "402 A" },
    ],
  },

  aboutPage: {
    overline: "Sobre · O caminho até aqui",
    h1a: "Do hardware desmontado à ",
    h1b: "IA em produção dentro da operação",
    lead:
      "Sou o Rean Lucas — Forward Deployed Engineer. Atuo no trecho onde a maioria dos projetos de IA morre: tirar o modelo do notebook e colocá-lo em produção, dentro da operação do cliente, vigiando ativos críticos 24 horas por dia.",
    why: {
      overline: "Dois públicos, um perfil",
      title: "Por que eu?",
      techLabel: "Para o time técnico",
      tech:
        "Arquiteto, não só uso: LSTM Autoencoder com limiar calibrado por equipamento, ensemble com Random Forest e KNN antes de qualquer alerta, features em NumPy, serving em Flask na GCP, front em TypeScript/Next.js. Code review comigo é conversa entre pares — do backprop ao backend.",
      execLabel: "Para quem decide",
      exec:
        "Falha não planejada é o custo mais caro do setor: emergência, indisponibilidade, multa. Meu sistema converte esse risco em aviso com dias de antecedência — manutenção vira agenda, não crise. Um profissional cobrindo modelo, plataforma e integração, sentado com o seu time: menos handoff, entrega mais rápida, resultado com dono.",
    },
    timeline: {
      overline: "Trajetória",
      title: "A história",
      items: [
        {
          era: "Primeiros anos",
          title: "Hardware desmontado, curiosidade montada",
          text: "Antes de escrever a primeira linha de código, eu já desmontava computadores para entender o que tinha dentro. A lição ficou: nenhum sistema é caixa-preta — sempre dá para abrir, entender e melhorar.",
        },
        {
          era: "A base",
          title: "Full-stack de verdade",
          text: "TypeScript, React, Next.js, Node, PostgreSQL, Docker, Linux. Anos construindo interfaces, APIs e infraestrutura me deram o que falta em muito cientista de dados: a capacidade de transformar um modelo em produto que roda, escala e não cai.",
        },
        {
          era: "O mundo industrial",
          title: "Onde o software encontra o físico",
          text: "SCADA, SAP, Oracle, protocolos como Modbus, DNP3, IEC 61850 e ICCP/TASE.2. Ambientes onde um bug não gera um ticket — gera consequência física. Aqui aprendi que confiabilidade não é feature, é pré-requisito.",
        },
        {
          era: "Deep learning em produção",
          title: "A rede neural que vigia a rede elétrica",
          text: "Projetei e coloquei em produção um sistema de manutenção preditiva com LSTM Autoencoders em PyTorch para o centro de monitoramento de ativos de uma das maiores companhias de energia do Brasil. Modelos que aprendem o comportamento normal de cada equipamento e denunciam a anomalia antes da falha.",
        },
        {
          era: "Hoje",
          title: "Forward deployed, por definição",
          text: "Curso Análise e Desenvolvimento de Sistemas na PUC-Paraná enquanto opero no laboratório mais exigente que existe: a produção real, dentro do cliente, onde modelo errado não perde ponto — perde energia.",
        },
      ],
    },
    domains: {
      overline: "Expertise",
      title: "Três domínios, uma cabeça",
      items: [
        {
          title: "Deep Learning & ML",
          text: "Arquiteturas neurais aplicadas a problemas reais: LSTM, autoencoders, CNN, detecção de anomalias, séries temporais multivariadas. PyTorch como ferramenta, produção como critério.",
          chips: ["PyTorch", "LSTM Autoencoder", "Transformers", "CNNs", "Detecção de anomalias", "Risco de ativos", "Séries temporais", "Feature engineering"],
        },
        {
          title: "Engenharia de Software",
          text: "Do banco ao browser: APIs, bancos relacionais, containers, CI/CD e interfaces que convencem. O modelo mais brilhante do mundo não vale nada se não virar sistema confiável.",
          chips: ["Python / Flask", "TypeScript / Next.js", "Google Cloud", "Terraform", "PostgreSQL", "Docker", "DevOps", "UI/UX"],
        },
        {
          title: "Mundo Industrial",
          text: "O domínio que quase nenhum dev tem: protocolos de subestação, sistemas SCADA, integração SAP. Falo a língua dos engenheiros de campo e a dos cientistas de dados — e traduzo entre elas.",
          chips: ["SCADA", "ICCP/TASE.2", "IEC 61850", "Modbus / DNP3", "SAP", "Oracle SQL", "UHEs & subestações", "KPIs de manutenção"],
        },
      ],
    },
    principles: {
      overline: "Método",
      title: "Como eu trabalho",
      items: [
        {
          title: "Do zero ao deploy",
          text: "Não entrego notebook com gráfico bonito. Entrego sistema rodando: modelo treinado, API servindo, dashboard no ar, alerta chegando em quem precisa agir.",
        },
        {
          title: "Produção > prova de conceito",
          text: "POC impressiona em reunião; produção gera valor todo dia. Cada decisão técnica — do limiar do modelo ao retry da API — assume que o sistema vai rodar anos, não semanas.",
        },
        {
          title: "Tradução entre mundos",
          text: "Explico erro de reconstrução para o engenheiro de manutenção e ROI de manutenção preditiva para o executivo — sem simplificar demais para nenhum dos dois.",
        },
        {
          title: "Confiabilidade como requisito",
          text: "Formado em ambiente onde falha tem consequência física. Isso muda a forma de escrever software: logging, monitoramento, degradação graciosa e humildade com o que o modelo não sabe.",
        },
      ],
    },
    practice: {
      overline: "Na prática",
      title: "O que isso vira no dia a dia",
      eventHeader: "Linha do tempo de um evento · exemplo ilustrativo",
      milestones: [
        { label: "Desvio detectado", sub: "modelo denuncia" },
        { label: "Consenso do ensemble", sub: "3/3 modelos" },
        { label: "Intervenção planejada", sub: "OS + peça + janela" },
        { label: "Falha evitada", sub: "que nunca aconteceu" },
      ],
      textA: "O valor do meu trabalho se mede pelo intervalo entre o primeiro marco e o último: ",
      textHighlight: "dias de antecedência",
      textB:
        " para transformar o que seria uma emergência de madrugada em manutenção de agenda. Para quem decide, isso é custo evitado e disponibilidade; para o time técnico, é dormir em paz.",
    },
    cta: {
      title: "Quer ver isso aplicado?",
      text: "O estudo de caso do sistema de monitoramento preditivo mostra o pipeline completo — do sensor na subestação ao alerta na tela.",
      primary: "Ver os projetos",
      secondary: "Falar comigo",
    },
  },

  projectsPage: {
    overline: "Projetos · Deep learning fora do notebook",
    h1a: "Sistemas que ",
    h1b: "não podem falhar",
    lead:
      "Meu portfólio não é uma coleção de demos — é o registro do que roda em produção, dentro da operação, gerando valor todo dia. Explore o estudo de caso interativo abaixo.",
    caseOverline: "Estudo de caso",
    caseTitle: "Plataforma de Gestão de Ativos e Riscos",
    badge: "Em produção",
    context: "Setor elétrico · UHEs e subestações · Centro de monitoramento de ativos",
    problemLabel: "O problema",
    problem:
      "Ativos de UHEs e subestações falham — e quando falham sem aviso, o custo é brutal: indisponibilidade de energia, manutenção emergencial, risco físico e regulatório. O modelo tradicional é reativo (conserta depois que quebra) ou preventivo cego (troca peça boa por calendário). Uma das maiores companhias de energia do Brasil precisava de uma terceira via: saber antes — e ter isso integrado ao ecossistema corporativo que já existe.",
    solutionLabel: "A solução",
    solution:
      "Uma plataforma de gestão de ativos e riscos em nuvem (GCP, com AlloyDB no núcleo de dados): detecção por IA com redes neurais recorrentes e convolucionais (LSTM Autoencoders, CNNs) validada por modelos clássicos de ML — Random Forest e KNN — num ensemble que atribui score de risco por tag de telemetria. A hierarquia empresa → ativo → equipamento → tag consolida tudo numa visão só, com KPI de saúde por ativo, e um agente de IA dispara os alertas com contexto por WhatsApp e e-mail.",
    pipelineLabel: "O pipeline — do sensor ao alerta",
    pipeline: [
      { label: "Sensores", detail: "vibração · temperatura · corrente" },
      { label: "Janelamento", detail: "séries temporais multivariadas" },
      { label: "Detecção por IA", detail: "RNN/LSTM · CNN · autoencoders" },
      { label: "ML clássico", detail: "Random Forest · KNN validam" },
      { label: "Score de risco", detail: "consenso do ensemble por tag" },
      { label: "Agente de IA", detail: "dispara WhatsApp e e-mail" },
    ],
    exploreLabel: "Explore — clique numa tag do sunburst",
    integrationsLabel: "Integrações corporativas",
    integrations:
      "Plataforma de verdade não vive em ilha: autenticação via Keycloak e sistemas corporativos internos, ordens e cadastros do SAP e do Hitachi NM, históricos em Oracle SQL, dados servidos por data lakes e virtualização com Denodo. O modelo é só o coração — o valor aparece quando ele conversa com o organismo inteiro.",
    integrationList: ["SAP", "Hitachi NM", "Oracle SQL", "Keycloak", "Autenticação corporativa", "Data lakes", "Denodo", "SCADA / ICCP"],
    impactLabel: "O impacto",
    impact: [
      {
        title: "Crise vira agenda",
        text: "Manutenção deixa de ser emergência de madrugada e vira intervenção planejada — com peça em estoque, equipe escalada e janela combinada com a operação.",
      },
      {
        title: "Visibilidade 24/7",
        text: "Cada tag monitorada ganha um envelope de normalidade próprio. O time enxerga tendência e desvio em tempo real, não só depois do estrago.",
      },
      {
        title: "Risco antecipado",
        text: "Falha não planejada em ativo crítico custa indisponibilidade, multa e risco físico. Detectar o desvio dias antes muda a economia da manutenção inteira.",
      },
    ],
    stackLabel: "Stack",
    privateNote: "Código privado — detalhes internos sob confidencialidade",
    privateShort: "Código privado",
    agent: {
      overline: "IA generativa",
      title: "Agente de IA & LLMs",
      whatLabel: "O que faz",
      what:
        "Agente conversacional com LLM que responde sobre os ativos e o risco em linguagem natural: o engenheiro pergunta “como está o Trafo 01?” e o agente consulta a plataforma, cruza telemetria, histórico e ordens de manutenção, e responde com contexto — citando as tags que sustentam a resposta. Quando o ensemble atinge consenso de anomalia, é o mesmo agente que redige e dispara o alerta.",
      howLabel: "Como funciona",
      how:
        "Orquestração de LLMs integrada ao Vertex AI e a modelos open source servidos em infraestrutura própria — o roteamento escolhe o modelo por custo, latência e sensibilidade do dado. Function calling dá ao agente acesso controlado às APIs da plataforma; RAG ancora as respostas na documentação técnica; guardrails e avaliação contínua mantêm o agente no trilho.",
      routingHeader: "Roteamento por modelo · exemplo ilustrativo",
      routing: [
        { label: "Gemini · Vertex AI", pct: 62, note: "raciocínio geral e ferramentas" },
        { label: "Llama · self-hosted", pct: 28, note: "dados sensíveis ficam em casa" },
        { label: "Mistral · self-hosted", pct: 10, note: "classificação e triagem baratas" },
      ],
      routingNote:
        "O roteador escolhe o LLM por custo, latência e sensibilidade do dado — Vertex AI para o raciocínio pesado, open source self-hosted para o que não pode sair de casa.",
      integrations: [
        {
          title: "Dispara WhatsApp",
          text: "Consenso de anomalia no ensemble → o agente redige o alerta com tag, desvio e recomendação, e entrega no grupo da equipe de manutenção.",
        },
        {
          title: "Dispara e-mail",
          text: "Relatório estruturado por e-mail para gestores: o que desviou, desde quando, qual o risco e qual a janela sugerida de intervenção.",
        },
        {
          title: "Aciona sistemas",
          text: "Via function calling, o agente consulta e alimenta os sistemas corporativos — do histórico no Oracle à ordem de serviço no SAP.",
        },
      ],
      stack: ["Vertex AI", "LLMs open source", "Function calling", "RAG", "Python", "GCP"],
    },
    confidential: {
      overline: "O resto do iceberg",
      title: "Projetos confidenciais",
      text:
        "Integrações industriais, pipelines de dados e automações em ambiente crítico — o trabalho que constrói vantagem competitiva de verdade raramente pode ir para o GitHub. Esses projetos são confidenciais por dever ético e profissional, e é exatamente por isso que valem tanto: rodam onde erro tem consequência. Numa conversa, explico arquitetura e decisões até onde a confidencialidade permite.",
    },
    cta: {
      title: "Curioso sobre os detalhes?",
      text: "Arquitetura, trade-offs, o que funcionou e o que eu faria diferente — conversa técnica boa é a minha parte favorita do trabalho.",
      primary: "Vamos conversar",
      secondary: "Conhecer minha história",
    },
  },

  notFound: {
    code: "404",
    title: "Essa página não está no sunburst",
    text: "O caminho não existe ou mudou de lugar. O modelo não detectou anomalia — só um link quebrado.",
    back: "Voltar ao início",
  },
}

export type Dictionary = typeof pt
