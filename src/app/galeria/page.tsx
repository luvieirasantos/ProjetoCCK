"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Midia {
  id: string;
  titulo: string;
  url: string;
  criado_em: string;
}

export default function GaleriaPublica() {
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

  return (
    <section className="max-w-6xl mx-auto px-4 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">📸 Galeria de Mídia</h1>
        <p className="text-gray-600 mt-2">Veja os registros das atividades, oficinas e momentos especiais do CCK</p>
      </div>

      {galeria.length === 0 ? (
        <p className="text-center text-gray-400">Nenhuma imagem disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galeria.map((img) => (
            <div key={img.id} className="relative group overflow-hidden rounded-lg shadow">
              <img
                src={img.url}
                alt={img.titulo}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center text-sm text-center px-2 font-medium transition">
                {img.titulo}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
