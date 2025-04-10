"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AuthGuard } from "@/components/AuthGuard";

interface Documento {
  id: string;
  titulo: string;
  categoria: string;
  arquivo_url: string;
  criado_em: string;
}

const categorias = ["Horários", "Planejamento", "Relatórios", "Outros"];

export default function DocumentosPage() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Horários");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  useEffect(() => {
    async function carregarDocumentos() {
      const { data, error } = await supabase.from("documentos").select("*").order("criado_em", { ascending: false });
      if (!error && data) {
        setDocumentos(data as Documento[]);
      }
    }

    carregarDocumentos();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!arquivo) return alert("Selecione um arquivo!");

    const nomeArquivo = `${Date.now()}-${arquivo.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documentos")
      .upload(nomeArquivo, arquivo);

    if (uploadError) {
      alert("Erro no upload!");
      console.error(uploadError);
      return;
    }

    const url = supabase.storage.from("documentos").getPublicUrl(nomeArquivo).data.publicUrl;

    const { error: insertError } = await supabase.from("documentos").insert([
      {
        titulo,
        categoria,
        arquivo_url: url,
        criado_em: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      alert("Erro ao salvar no banco!");
      console.error(insertError);
    } else {
      setTitulo("");
      setArquivo(null);
      window.location.reload();
    }
  }

  return (
    <AuthGuard>
      <section className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">📄 Gerenciar Documentos</h1>

        {/* Formulário */}
        <form onSubmit={handleUpload} className="bg-white p-6 rounded-xl border shadow space-y-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium">Título do documento</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium">Arquivo</label>
            <input
              type="file"
              onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              className="mt-1"
              required
            />
          </div>

          <button type="submit" className="bg-black text-white px-5 py-2 rounded hover:opacity-90 transition">
            Enviar documento
          </button>
        </form>

        {/* Lista */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Documentos enviados</h2>
          {documentos.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum documento encontrado.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {documentos.map((doc) => (
                <li key={doc.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{doc.titulo}</p>
                    <p className="text-sm text-gray-500">{doc.categoria}</p>
                  </div>
                  <a
                    href={doc.arquivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Baixar
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </AuthGuard>
  );
}
