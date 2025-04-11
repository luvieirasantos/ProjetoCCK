"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarioItem {
  id: string;
  mes: string;
  data: string;
  atividades: string;
}

export function CalendarioAtividades() {
  const [calendario, setCalendario] = useState<CalendarioItem[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("calendario")
        .select("*")
        .order("criado_em", { ascending: true });

      if (!error && data) {
        setCalendario(data);
      } else {
        console.error("Erro ao buscar calendário:", error);
      }
    }

    fetchData();
  }, []);

  const avancar = () => {
    if (indiceAtual < calendario.length - 1) setIndiceAtual((i) => i + 1);
  };

  const voltar = () => {
    if (indiceAtual > 0) setIndiceAtual((i) => i - 1);
  };

  const ativo = calendario[indiceAtual];

  return (
    <section className="bg-white rounded-2xl shadow-md py-10 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">
        Calendário de Atividades – 1º Semestre
      </h2>

      {ativo && (
        <div className="relative max-w-3xl mx-auto">
          {/* Botão voltar */}
          <button
            onClick={voltar}
            disabled={indiceAtual === 0}
            className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-gray-100 transition disabled:opacity-30"
            aria-label="Voltar"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Card do mês */}
          <div className="bg-gray-50 rounded-xl py-6 px-6 min-h-[180px] flex flex-col items-center justify-center border">
            <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
              {ativo.mes}
            </h3>
            <p className="text-sm text-gray-600 font-medium mt-2">{ativo.data}</p>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
              {ativo.atividades}
            </p>
          </div>

          {/* Botão avançar */}
          <button
            onClick={avancar}
            disabled={indiceAtual === calendario.length - 1}
            className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-gray-100 transition disabled:opacity-30"
            aria-label="Avançar"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 gap-2">
            {calendario.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === indiceAtual ? "bg-black" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
