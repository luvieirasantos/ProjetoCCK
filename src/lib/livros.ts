import { supabase } from "@/lib/supabaseClient";
import { Livro } from "@/types/Livro";

export async function getLivros(): Promise<Livro[]> {
  const { data, error } = await supabase
    .from("livros")
    .select("*")
    .order("titulo", { ascending: true });

  if (error) {
    console.error("Erro ao buscar livros:", error.message);
    return [];
  }

  return data as Livro[];
}

export async function addLivro(livro: Omit<Livro, "id">): Promise<void> {
  const { error } = await supabase.from("livros").insert([livro]);
  if (error) {
    console.error("Erro ao adicionar livro:", error.message);
  }
}

export async function deleteLivro(id: string): Promise<void> {
  const { error } = await supabase.from("livros").delete().eq("id", id);
  if (error) {
    console.error("Erro ao excluir livro:", error.message);
  }
}
