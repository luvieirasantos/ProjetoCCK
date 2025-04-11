"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Evento {
  id: string;
  mes: string;
  data: string;
  atividades: string;
}

export default function AdminCalendarioPage() {
  const [mes, setMes] = useState("");
  const [data, setData] = useState("");
  const [atividades, setAtividades] = useState("");
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    const { data, error } = await supabase
      .from("calendario")
      .select("*")
      .order("criado_em", { ascending: true });

    if (!error && data) {
      setEventos(data as Evento[]);
    } else {
      console.error("Erro ao carregar eventos:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mes || !data || !atividades) return;

    const { error } = await supabase.from("calendario").insert([
      {
        mes,
        data,
        atividades,
      },
    ]);

    if (error) {
      alert("Erro ao salvar evento.");
      console.error(error);
    } else {
      setMes("");
      setData("");
      setAtividades("");
      carregarEventos();
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("calendario").delete().eq("id", id);
    if (!error) carregarEventos();
  }

  return (
    <section className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📆 Gerenciar Calendário de Atividades</h1>
        <p className="text-gray-600">Adicione ou remova os eventos que aparecem na Home.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border shadow space-y-4"
      >
        <Input
          placeholder="MÊS (ex: MARÇO)"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
        <Input
          placeholder="DATA (ex: Dia 23)"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Textarea
          placeholder={`ATIVIDADES\n(ex: 14h às 15h - Oficina de Música\n15h às 16h - Contação de Histórias)`}
          value={atividades}
          onChange={(e) => setAtividades(e.target.value)}
          rows={4}
        />
        <Button type="submit">Salvar evento</Button>
      </form>

      <div className="space-y-4">
        {eventos.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum evento adicionado ainda.</p>
        ) : (
          eventos.map((evento) => (
            <div
              key={evento.id}
              className="border rounded-xl p-4 bg-gray-50 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-800 uppercase">{evento.mes}</p>
                <p className="text-sm text-gray-700 font-medium">{evento.data}</p>
                <pre className="text-sm text-gray-500 whitespace-pre-line">
                  {evento.atividades}
                </pre>
              </div>
              <button
                onClick={() => handleDelete(evento.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
