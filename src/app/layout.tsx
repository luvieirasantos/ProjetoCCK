// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { HeaderWrapper } from "../components/HeaderWrapper";

export const metadata: Metadata = {
  title: "Centro Cultural Kalunguinha",
  description: "Espaço de cultura, educação e acolhimento.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <HeaderWrapper />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
