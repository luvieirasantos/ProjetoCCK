"use client";

import { motion } from "framer-motion";

const beneficios = [
  {
    emoji: "🗣️",
    titulo: "Rodas de conversa",
    descricao: "Encontros quinzenais com temas sobre cuidado, educação e vida cotidiana.",
  },
  {
    emoji: "🧘",
    titulo: "Oficinas de autocuidado",
    descricao: "Espaço para relaxamento, autoestima e saúde emocional dos responsáveis.",
  },
  {
    emoji: "👶",
    titulo: "Apoio à parentalidade",
    descricao: "Compartilhamento de experiências e aprendizados sobre a criação das crianças.",
  },
  {
    emoji: "📚",
    titulo: "Palestras sociopolíticas",
    descricao: "Reflexões sobre cultura, sociedade e os desafios de hoje.",
  },
];

export default function JuquinhaPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 space-y-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mt-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">Grupo Juquinha</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Um espaço de acolhimento, escuta e transformação para quem cuida.
        </p>
      </motion.div>

      {/* Benefícios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {beneficios.map((item, index) => (
          <motion.div
            key={item.titulo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black">
              {item.titulo}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{item.descricao}</p>
          </motion.div>
        ))}
      </div>

      {/* Frase final */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-black text-white rounded-xl p-8 text-center shadow-md"
      >
        <p className="text-lg italic">
          “Cuidar de quem cuida também é transformar o futuro.”
        </p>
      </motion.div>
    </section>
  );
}
