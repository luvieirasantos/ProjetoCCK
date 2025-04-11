"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (loading) return <p className="text-center mt-10">Carregando painel...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-600 mt-2">
          Acesso como: <span className="font-medium text-black">{currentUser}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AtalhoAdmin
          href="/admin/biblioteca"
          title="📚 Biblioteca"
          description="Gerencie os livros cadastrados"
        />
        <AtalhoAdmin
          href="/admin/documentos"
          title="📄 Documentos"
          description="Suba arquivos internos como horários e relatórios"
        />
        <AtalhoAdmin
          href="/admin/galeria"
          title="🖼️ Galeria de Mídia"
          description="Adicione imagens que serão exibidas no site"
        />
        <AtalhoAdmin
          href="/admin/calendario"
          title="🗓️ Calendário"
          description="Gerencie o calendário de atividades visível na home"
        />
        <button
          onClick={handleLogout}
          className="border border-red-300 rounded-xl p-4 text-left bg-white hover:bg-red-50 transition"
        >
          <h2 className="text-lg font-semibold text-red-600">🚪 Sair</h2>
          <p className="text-sm text-red-400">Encerrar sessão</p>
        </button>
      </div>
    </section>
  );
}

function AtalhoAdmin({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md hover:scale-[1.01] transition-all"
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </Link>
  );
}
