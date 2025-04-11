"use client";

import { motion } from "framer-motion";

export default function ApoioPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 space-y-16 text-center">
      {/* Hero */}
      <motion.div
        className="space-y-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">🌿 Apoie o Kalunguinha</h1>
        <p className="text-gray-600 text-lg">
          Sua contribuição fortalece a resistência, a educação e o acolhimento ancestral que florescem em nosso terreiro.
        </p>
      </motion.div>

      {/* Bloco Pix */}
      <motion.div
        className="bg-white border border-dashed rounded-xl p-8 shadow-sm max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">💸 Apoie via PIX</h2>

        <p className="text-sm text-gray-600 mb-1">Chave PIX (e-mail):</p>
        <p className="text-lg font-mono text-gray-800 break-all">
          apoio@cckalunguinha.org.br
        </p>

        <p className="text-sm text-gray-500 mt-4 italic">
          Toda ajuda é bem-vinda e faz diferença na continuidade das nossas ações culturais e sociais.
        </p>
      </motion.div>

      {/* Frase final */}
      <motion.div
        className="text-center bg-black text-white rounded-xl p-6 shadow mt-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-lg italic">
          “Quando você apoia o CCK, você rega uma semente de transformação.”
        </p>
      </motion.div>
    </section>
  );
}
