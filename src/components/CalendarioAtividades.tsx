"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Evento {
  id: string;
  mes: string;
  data: string;
  atividades: string;
}

export function CalendarioAtividades() {
  const [eventosPorMes, setEventosPorMes] = useState<Record<string, Evento[]>>({});
  const [meses, setMeses] = useState<string[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    async function fetchEventos() {
      const { data, error } = await supabase
        .from("calendario")
        .select("*")
        .order("mes", { ascending: true })
        .order("data", { ascending: true });

      if (error) {
        console.error("Erro ao buscar calendário:", error);
        return;
      }

      const agrupado: Record<string, Evento[]> = {};
      for (const evento of data as Evento[]) {
        if (!agrupado[evento.mes]) {
          agrupado[evento.mes] = [];
        }
        agrupado[evento.mes].push(evento);
      }

      setEventosPorMes(agrupado);
      setMeses(Object.keys(agrupado));
    }

    fetchEventos();
  }, []);

  const avancar = () => {
    if (indiceAtual < meses.length - 1) setIndiceAtual(i => i + 1);
  };

  const voltar = () => {
    if (indiceAtual > 0) setIndiceAtual(i => i - 1);
  };

  const mesAtual = meses[indiceAtual];
  const eventos = eventosPorMes[mesAtual] || [];

  return (
    <section className="bg-white rounded-2xl shadow-md py-10 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">Calendário de Atividades – 1º Semestre</h2>

      {mesAtual && (
        <div className="relative">
          <button
            onClick={voltar}
            disabled={indiceAtual === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:scale-105 transition"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="bg-gray-50 rounded-xl py-6 px-4 mx-10 min-h-[160px] flex flex-col items-center justify-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
              {mesAtual}
            </h3>

            {eventos.map((evento) => (
              <div key={evento.id} className="text-sm text-gray-700">
                <p className="font-medium">{evento.data}</p>
                <p className="text-gray-500 whitespace-pre-line">{evento.atividades}</p>
              </div>
            ))}
          </div>

          <button
            onClick={avancar}
            disabled={indiceAtual === meses.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:scale-105 transition"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-4 gap-2">
            {meses.map((_, idx) => (
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
