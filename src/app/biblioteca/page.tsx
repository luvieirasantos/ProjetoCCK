"use client";

import { useEffect, useState } from "react";
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

export default function BibliotecaPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(9);

  // Atualiza quantidade com base na tela
  useEffect(() => {
    const atualizarItens = () => {
      const largura = window.innerWidth;
      if (largura < 640) setItensPorPagina(6);
      else if (largura < 1024) setItensPorPagina(9);
      else setItensPorPagina(12);
    };
    atualizarItens();
    window.addEventListener("resize", atualizarItens);
    return () => window.removeEventListener("resize", atualizarItens);
  }, []);

  useEffect(() => {
    async function fetchLivros() {
      const { data, error } = await supabase
        .from("livros")
        .select("*")
        .order("titulo", { ascending: true });

      if (error) {
        console.error("Erro ao buscar livros:", error.message);
      } else {
        setLivros(data as Livro[]);
      }
    }

    fetchLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) =>
    `${livro.titulo} ${livro.autor}`.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(livrosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const livrosVisiveis = livrosFiltrados.slice(inicio, inicio + itensPorPagina);

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Biblioteca Comunitária</h1>

      <input
        type="text"
        placeholder="Buscar por título ou autor..."
        value={busca}
        onChange={(e) => {
          setBusca(e.target.value);
          setPaginaAtual(1); // Reinicia para página 1 em nova busca
        }}
        className="w-full sm:max-w-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {livrosVisiveis.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Nenhum livro encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {livrosVisiveis.map((livro) => (
            <Link
              key={livro.id}
              href={`/biblioteca/${livro.id}`}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all"
            >
              {livro.imagem && (
                <img
                  src={livro.imagem}
                  alt={livro.titulo}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-lg font-semibold">{livro.titulo}</h2>
              <p className="text-sm text-gray-600">Autor: {livro.autor}</p>
              <p className="text-xs text-gray-400 mt-1">
                {livro.tema} • {livro.classificacao}
              </p>
              <p className="text-xs text-gray-400">Status: {livro.status}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(p => p - 1)}
            className="text-sm px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-30"
          >
            Página anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(p => p + 1)}
            className="text-sm px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-30"
          >
            Próxima página
          </button>
        </div>
      )}
    </section>
  );
}
