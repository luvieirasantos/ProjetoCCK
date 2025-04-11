"use client";

import { useState } from "react";

interface Livro {
  titulo: string;
  autor: string;
  tema: string;
  classificacao: "adulto" | "infantojuvenil";
  status: "disponível" | "não encontrado" | "emprestado";
  imagem?: string;
}

interface Props {
  onSubmit: (livro: Livro) => void;
}

export function LivroForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Livro>({
    titulo: "",
    autor: "",
    tema: "",
    classificacao: "adulto",
    status: "disponível",
    imagem: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo || !form.autor || !form.tema) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    onSubmit(form);

    setForm({
      titulo: "",
      autor: "",
      tema: "",
      classificacao: "adulto",
      status: "disponível",
      imagem: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold text-gray-800">➕ Adicionar novo livro</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título *"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="autor"
          value={form.autor}
          onChange={handleChange}
          placeholder="Autor *"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="tema"
          value={form.tema}
          onChange={handleChange}
          placeholder="Tema *"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
          placeholder="URL da imagem (opcional)"
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select name="classificacao" value={form.classificacao} onChange={handleChange} className="p-2 border rounded">
          <option value="adulto">Adulto</option>
          <option value="infantojuvenil">Infantojuvenil</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
          <option value="disponível">Disponível</option>
          <option value="emprestado">Emprestado</option>
          <option value="não encontrado">Não encontrado</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
      >
        Salvar livro
      </button>
    </form>
  );
}
