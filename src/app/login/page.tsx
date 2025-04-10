"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Email ou senha inválidos.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Login do Administrador
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {erro && <p className="text-sm text-red-500">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}
