import { supabase } from "@/lib/supabaseClient";


export async function getLivros() {
  const { data, error } = await supabase
    .from("livros")
    .select("*")
    .order("titulo", { ascending: true });

  if (error) {
    console.error("Erro ao buscar livros:", error.message);
    return [];
  }

  return data;
}

export async function addLivro(livro: any) {
  const { error } = await supabase.from("livros").insert([livro]);
  if (error) {
    console.error("Erro ao adicionar livro:", error.message);
  }
}

export async function deleteLivro(id: string) {
  const { error } = await supabase.from("livros").delete().eq("id", id);
  if (error) {
    console.error("Erro ao excluir livro:", error.message);
  }
}
