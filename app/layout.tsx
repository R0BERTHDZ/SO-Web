import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SistemaOS - Aprende Sistemas Operativos | UTM",
  description: "Plataforma interactiva para aprender Sistemas Operativos. Conceptos, ejercicios, crucigramas y código en C. Universidad Tecnológica de la Mixteca.",
  keywords: "sistemas operativos, procesos, memoria, UTM, aprendizaje interactivo, C programación",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
