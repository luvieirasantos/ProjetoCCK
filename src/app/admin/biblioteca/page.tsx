"use client";

import { useEffect, useState } from "react";
import { getLivros, deleteLivro, addLivro } from "@/lib/livros";
import { LivroCardAdmin } from "@/components/LivroCardAdmin";
import { LivroForm } from "@/components/LivroForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminBiblioteca() {
  const [livros, setLivros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    } else {
      carregarLivros();
    }
  }, [currentUser]);

  async function carregarLivros() {
    setLoading(true);
    const lista = await getLivros();
    setLivros(lista);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await deleteLivro(id);
    carregarLivros();
  }

  async function handleAdd(livro: any) {
    await addLivro({ ...livro, criadoPor: currentUser || "admin" });
    carregarLivros();
  }

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900 text-center">📚 Gerenciar Biblioteca</h1>

      <LivroForm onSubmit={handleAdd} />

      {loading ? (
        <p className="text-center text-gray-600">Carregando livros...</p>
      ) : livros.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum livro cadastrado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {livros.map((livro) => (
            <LivroCardAdmin key={livro.id} livro={livro} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
