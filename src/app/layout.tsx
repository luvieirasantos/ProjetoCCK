import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { AuthProvider } from "@/context/AuthContext"; // 👈 importe o AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Centro Cultural Kalunguinha",
  description: "Site oficial do CCK",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider> {/* 👈 tudo precisa estar dentro do AuthProvider */}
          <PageLoader />
          <Header />
          <main className="pt-24 pb-16 px-4">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
