"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function AdminPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setEmail(session?.user.email || "");
    }

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <AuthGuard>
      <section className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">
            {email ? `Acesso como ${email}` : "Área de gestão do site"}
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
            description="Suba arquivos internos como horários, relatórios, etc."
          />
          <AtalhoAdmin
            href="/admin/galeria"
            title="🖼️ Galeria de Mídia"
            description="Adicione imagens para o site"
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
    </AuthGuard>
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
