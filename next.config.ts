import type { NextConfig } from "next";

/*
  Idiomas por rota, sem prefixo para o português (URLs antigas continuam
  valendo) e /en para o inglês. As páginas vivem em app/[lang]/…; os
  rewrites abaixo mapeiam as URLs públicas para elas.
*/
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // pt-BR — raiz sem prefixo
        { source: "/", destination: "/pt" },
        { source: "/sobre", destination: "/pt/about" },
        { source: "/projetos", destination: "/pt/projects" },
        { source: "/capa", destination: "/pt/capa" },
        { source: "/banner", destination: "/pt/banner" },
        // en — slugs em inglês (pastas já são about/projects)
        { source: "/en/sobre", destination: "/en/about" },
        { source: "/en/projetos", destination: "/en/projects" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // /pt/... é interno; a URL canônica em português é sem prefixo
      { source: "/pt", destination: "/", permanent: true },
      { source: "/pt/about", destination: "/sobre", permanent: true },
      { source: "/pt/projects", destination: "/projetos", permanent: true },
    ];
  },
};

export default nextConfig;
