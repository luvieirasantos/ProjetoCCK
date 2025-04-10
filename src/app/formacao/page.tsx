"use client";

import { motion } from "framer-motion";

const acoes = [
  {
    emoji: "🎓",
    titulo: "Formação continuada",
    descricao: "Encontros periódicos para educadores aprofundarem temas pedagógicos e sociais.",
  },
  {
    emoji: "🤝",
    titulo: "Trocas entre pares",
    descricao: "Espaços de diálogo entre educadores para compartilhar vivências e estratégias.",
  },
  {
    emoji: "🧠",
    titulo: "Palestras temáticas",
    descricao: "Reflexões sobre sociedade, infância, cultura e práticas educativas.",
  },
  {
    emoji: "🛠️",
    titulo: "Oficinas para quem educa",
    descricao: "Formações práticas sobre ludicidade, artes, narrativas e mediação pedagógica.",
  },
];

export default function FormacaoPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 space-y-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mt-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">Formação de Educadores</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Um espaço de aprendizagem, reflexão e fortalecimento para quem constrói o cotidiano com as crianças.
        </p>
      </motion.div>

      {/* Ações formativas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {acoes.map((item, index) => (
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

      {/* Citação final */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-black text-white rounded-xl p-8 text-center shadow-md"
      >
        <p className="text-lg italic">
          “Educar é também formar mundos possíveis.”
        </p>
      </motion.div>
    </section>
  );
}
