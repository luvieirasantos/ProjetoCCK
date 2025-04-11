"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  classificacao: "adulto" | "infantojuvenil";
  status: "disponível" | "não encontrado" | "emprestado";
  imagem?: string;
}

export default function BibliotecaPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(9);
  const [carregando, setCarregando] = useState(false);

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
      setCarregando(true);
      const { data } = await supabase.from("livros").select("*").order("titulo", { ascending: true });
      if (data) setLivros(data as Livro[]);
      setTimeout(() => setCarregando(false), 500); // efeito visual intencional
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
    <section className="space-y-10 px-4 sm:px-8 md:px-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black">Biblioteca Comunitária</h1>
        <p className="text-gray-500 text-sm mt-2">Pesquise livros disponíveis no nosso acervo.</p>
      </div>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1);
          }}
          className="w-full sm:max-w-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      <AnimatePresence mode="wait">
        {carregando ? (
          <motion.div
            key="loading"
            className="text-center py-10 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Carregando livros...
          </motion.div>
        ) : livrosVisiveis.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 text-center mt-10"
          >
            Nenhum livro encontrado.
          </motion.p>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {livrosVisiveis.map((livro) => (
              <motion.div
                key={livro.id}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={`/biblioteca/${livro.id}`}
                  className="group border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                >
                  {livro.imagem && (
                    <motion.img
                      src={livro.imagem}
                      alt={livro.titulo}
                      className="w-full h-48 object-cover rounded mb-4"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <h2 className="text-lg font-semibold group-hover:text-black">{livro.titulo}</h2>
                  <p className="text-sm text-gray-600">Autor: {livro.autor}</p>
                  <p className="text-xs text-gray-400 mt-1">{livro.tema} • {livro.classificacao}</p>
                  <p className="text-xs text-gray-400">Status: {livro.status}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {totalPaginas > 1 && (
        <motion.div
          className="flex justify-center items-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(p => p - 1)}
            className="text-sm px-4 py-2 border rounded hover:bg-black hover:text-white transition disabled:opacity-30"
          >
            Página anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(p => p + 1)}
            className="text-sm px-4 py-2 border rounded hover:bg-black hover:text-white transition disabled:opacity-30"
          >
            Próxima página
          </button>
        </motion.div>
      )}
    </section>
  );
}