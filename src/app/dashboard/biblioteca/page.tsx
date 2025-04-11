"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  classificacao: "adulto" | "infantojuvenil";
  status: "disponível" | "não encontrado" | "emprestado";
  imagem?: string;
  criadoPor?: string;
}

export default function CrudBibliotecaPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    async function buscarLivros() {
      const { data } = await supabase.from("livros").select("*").order("titulo", { ascending: true });
      if (data) setLivros(data as Livro[]);
      setCarregando(false);
    }

    buscarLivros();
  }, [currentUser, router]);

  if (carregando) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">📚 Painel de Biblioteca (CRUD)</h1>

      {livros.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum livro encontrado.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {livros.map((livro) => (
            <div key={livro.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold">{livro.titulo}</h2>
              <p className="text-sm text-gray-500">Autor: {livro.autor}</p>
              <p className="text-xs text-gray-400">Tema: {livro.tema}</p>
              <p className="text-xs text-gray-400">Classificação: {livro.classificacao}</p>
              <p className="text-xs text-gray-400">Status: {livro.status}</p>
              <div className="mt-3 flex gap-2">
                <button className="text-sm text-blue-600 hover:underline">✏️ Editar</button>
                <button className="text-sm text-red-500 hover:underline">🗑️ Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
