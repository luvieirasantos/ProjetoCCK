// src/app/biblioteca/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

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

export default function DetalheLivroPage() {
  const { id } = useParams();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarLivro() {
      const { data, error } = await supabase
        .from("livros")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErro("Livro não encontrado.");
        console.error(error);
      } else {
        setLivro(data as Livro);
      }
    }

    if (id) buscarLivro();
  }, [id]);

  if (erro) return <p className="text-center text-gray-500 mt-10">{erro}</p>;
  if (!livro) return <p className="text-center text-gray-400 mt-10">Carregando livro...</p>;

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <Link href="/biblioteca" className="text-sm text-gray-600 hover:underline">
        ← Voltar para a biblioteca
      </Link>

      <div className="border rounded-lg p-6 bg-white shadow-md">
        {livro.imagem && (
          <img
            src={livro.imagem}
            alt={livro.titulo}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <h1 className="text-2xl font-bold text-gray-900">{livro.titulo}</h1>
        <p className="text-gray-700">Autor: {livro.autor}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          <p><strong>Tema:</strong> {livro.tema}</p>
          <p><strong>Classificação:</strong> {livro.classificacao}</p>
          <p><strong>Status:</strong> {livro.status}</p>
          <p><strong>Adicionado por:</strong> {livro.criadoPor || "Desconhecido"}</p>
        </div>
      </div>
    </section>
  );
}
