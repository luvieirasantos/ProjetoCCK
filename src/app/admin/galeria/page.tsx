"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Midia {
  id: string;
  titulo: string;
  url: string;
  criado_em: string;
}

export default function GaleriaPage() {
  const [titulo, setTitulo] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [galeria, setGaleria] = useState<Midia[]>([]);

  useEffect(() => {
    async function carregarGaleria() {
      const { data, error } = await supabase
        .from("galeria_midia")
        .select("*")
        .order("criado_em", { ascending: false });

      if (!error && data) {
        setGaleria(data as Midia[]);
      }
    }

    carregarGaleria();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!arquivo) return alert("Selecione uma imagem!");

    const nome = `${Date.now()}-${arquivo.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("galeriamidia")
      .upload(nome, arquivo);

    if (uploadError) {
      alert("Erro no upload!");
      return;
    }

    const url = supabase.storage.from("galeriamidia").getPublicUrl(nome).data.publicUrl;

    const { error: insertError } = await supabase.from("galeria_midia").insert([
      {
        titulo,
        url,
        criado_em: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      alert("Erro ao salvar no banco!");
    } else {
      setTitulo("");
      setArquivo(null);
      window.location.reload();
    }
  }

  return (
    <AuthGuard>
      <section className="max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🖼️ Galeria de Mídia</h1>
          <p className="text-gray-600">Envie imagens para serem usadas no site</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleUpload} className="bg-white p-6 rounded-xl border shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título da imagem</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded hover:opacity-90 transition"
          >
            Enviar imagem
          </button>
        </form>

        {/* Galeria */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galeria.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma imagem enviada ainda.</p>
          ) : (
            galeria.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.url}
                  alt={img.titulo}
                  className="w-full h-44 object-cover rounded shadow"
                />
                <div className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-center px-2 text-sm font-medium rounded transition">
                  {img.titulo}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </AuthGuard>
  );
}
