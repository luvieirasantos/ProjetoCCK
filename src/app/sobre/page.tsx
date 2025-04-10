"use client";

import { motion } from "framer-motion";

export default function SobrePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 space-y-16">
      {/* Hero */}
      <motion.div
        className="text-center space-y-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">Sobre o CCK</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Conheça o Centro Cultural Kalunguinha, suas raízes, sua missão e sua atuação transformadora na comunidade.
        </p>
      </motion.div>

      {/* História */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800">🌱 Nossa história</h2>
        <p className="text-gray-700 leading-relaxed">
          O Centro Cultural Kalunguinha nasceu do desejo de oferecer um espaço de acolhimento,
          aprendizado e cultura para crianças, famílias e educadores de nossa comunidade.
          Ao longo dos anos, nos tornamos um espaço vivo de troca, convivência e afeto.
        </p>
      </motion.div>

      {/* Missão e valores */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="bg-white border p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900">🎯 Missão</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Fortalecer os vínculos familiares e comunitários através de ações culturais, educativas e sociais.
          </p>
        </div>
        <div className="bg-white border p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900">🌍 Valores</h3>
          <ul className="text-gray-600 mt-2 text-sm space-y-1 list-disc list-inside">
            <li>Acolhimento</li>
            <li>Respeito à infância</li>
            <li>Autonomia e escuta</li>
            <li>Educação como transformação</li>
          </ul>
        </div>
      </motion.div>

      {/* Citação final */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-black text-white rounded-xl p-8 text-center shadow-md"
      >
        <p className="text-lg italic">
          “O CCK é um território de afetos, de luta e de construção coletiva.”
        </p>
      </motion.div>
    </section>
  );
}
