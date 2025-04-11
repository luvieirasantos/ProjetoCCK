"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { motion } from "framer-motion";

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
  if (!livro) return <p className="text-center text-gray-400 mt-10 animate-pulse">Carregando livro...</p>;

  return (
    <motion.section
      className="max-w-3xl mx-auto space-y-6 px-4 sm:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div whileHover={{ x: -3 }} className="inline-block">
        <Link href="/biblioteca" className="text-sm text-gray-600 hover:underline">
          ← Voltar para a biblioteca
        </Link>
      </motion.div>

      <motion.div
        className="border rounded-lg p-6 bg-white shadow-md"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {livro.imagem && (
          <motion.img
            src={livro.imagem}
            alt={livro.titulo}
            className="w-full h-64 object-cover rounded mb-6"
            initial={{ opacity: 0.8 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{livro.titulo}</h1>
        <p className="text-gray-700 text-base mb-4">Autor: {livro.autor}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <p><strong>Tema:</strong> {livro.tema}</p>
          <p><strong>Classificação:</strong> {livro.classificacao}</p>
          <p><strong>Status:</strong> {livro.status}</p>
          <p><strong>Adicionado por:</strong> {livro.criadoPor || "Desconhecido"}</p>
        </div>
      </motion.div>
    </motion.section>
  );
}