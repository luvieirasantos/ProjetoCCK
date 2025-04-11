"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Informações institucionais */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Centro Cultural Kalunguinha</h3>
          <p className="text-sm text-gray-600 mt-1">Rua Belgrado, 255 – São Paulo, SP</p>
          <p className="text-sm text-gray-600">contato@cckalunguinha.org.br</p>
        </div>

        {/* Redes sociais */}
        <div className="flex gap-4 items-center">
          <motion.a
            href="https://instagram.com/centroculturalkalunguinha"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-gray-600 hover:text-black text-xl transition"
          >
            <FaInstagram />
          </motion.a>

          <motion.a
            href="mailto:contato@cckalunguinha.org.br"
            whileHover={{ scale: 1.1 }}
            className="text-gray-600 hover:text-black text-xl transition"
          >
            <FaEnvelope />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/henrique3"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-gray-600 hover:text-black text-xl transition"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </div>

      {/* Créditos */}
      <div className="bg-black text-white text-sm text-center py-3">
        Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/henrique3"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-200"
        >
          Lu Vieira
        </a>
      </div>
    </footer>
  );
}
