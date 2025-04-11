"use client";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  classificacao: string;
  status: string;
  imagem?: string;
  criadoPor?: string;
}

interface Props {
  livro: Livro;
  onDelete: (id: string) => void;
}

export function LivroCardAdmin({ livro, onDelete }: Props) {
  return (
    <div className="bg-white border p-4 rounded-xl shadow-sm flex flex-col justify-between">
      {livro.imagem && (
        <img
          src={livro.imagem}
          alt={livro.titulo}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{livro.titulo}</h3>
        <p className="text-sm text-gray-600">Autor: {livro.autor}</p>
        <p className="text-sm text-gray-600">Tema: {livro.tema}</p>
        <p className="text-sm text-gray-600">Classificação: {livro.classificacao}</p>
        <p className="text-sm text-gray-600">Status: {livro.status}</p>
        {livro.criadoPor && (
          <p className="text-xs text-gray-400">Criado por: {livro.criadoPor}</p>
        )}
      </div>

      <button
        onClick={() => onDelete(livro.id)}
        className="mt-4 text-sm text-red-500 hover:underline"
      >
        Excluir livro
      </button>
    </div>
  );
}
