import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import SideNav from "@/components/nav/sideNav";
import { ScrollProgress } from "@/components/motion/primitives";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Grotesca reta e sóbria para títulos — tom corporativo, sem floreio.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Rean Lucas — Redes Neurais & Deep Learning no Setor Elétrico",
  description:
    "Engenheiro de software e especialista em redes neurais. Sistemas de manutenção preditiva com LSTM Autoencoders monitorando ativos críticos do setor elétrico — do sensor ao modelo, do modelo ao pixel.",
  keywords: [
    "redes neurais",
    "deep learning",
    "machine learning",
    "LSTM autoencoder",
    "manutenção preditiva",
    "setor elétrico",
    "PyTorch",
    "engenheiro de software",
  ],
  openGraph: {
    title: "Rean Lucas — Redes Neurais & Deep Learning no Setor Elétrico",
    description:
      "Deep learning vigiando ativos críticos da rede de energia: modelos que enxergam a falha antes de ela acontecer.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
      >
        <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
          <ScrollProgress />
          <SideNav />
          <main className="md:pl-[68px] pb-24 md:pb-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
