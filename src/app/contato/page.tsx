"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false);

  return (
    <section className="max-w-3xl mx-auto px-4 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">📩 Fale com a gente</h1>
        <p className="text-gray-600 text-lg">
          Entre em contato para dúvidas, sugestões ou parcerias com o Centro Cultural Kalunguinha.
        </p>
      </div>

      <motion.form
        action="https://formspree.io/f/xdkeyyyq"
        method="POST"
        onSubmit={() => setEnviado(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl border shadow space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            required
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mensagem</label>
          <textarea
            name="mensagem"
            rows={5}
            required
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition w-full"
        >
          Enviar
        </button>

        {enviado && (
          <p className="text-green-600 text-sm text-center mt-2">
            Mensagem enviada com sucesso! Você receberá uma cópia no seu e-mail.
          </p>
        )}
      </motion.form>
    </section>
  );
}
