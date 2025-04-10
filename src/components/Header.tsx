"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo_cck.jpg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/oficinas", label: "Oficinas" },
  { href: "/juquinha", label: "Juquinha" },
  { href: "/formacao", label: "Formação" },
  { href: "/galeria", label: "Galeria" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo CCK" width={36} height={36} />
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Centro Cultural Kalunguinha
          </span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative text-sm font-medium transition px-2 py-1 rounded ${
                pathname === href
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {label}
              {pathname === href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-black rounded"
                />
              )}
            </Link>
          ))}

          {/* Botão Admin */}
          <Link
            href="/login"
            className="ml-4 px-4 py-1.5 text-sm border border-black rounded-xl hover:bg-black hover:text-white transition"
          >
            Admin
          </Link>
        </nav>

        {/* Botão Mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Abrir menu"
        >
          <motion.div
            initial={false}
            animate={menuAberto ? "open" : "closed"}
            className="space-y-1"
          >
            <motion.span
              className="block h-0.5 w-6 bg-black"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-black"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-black"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-6 py-4 space-y-2 border-t border-gray-200"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuAberto(false)}
                className={`block py-1 text-sm font-medium transition ${
                  pathname === href
                    ? "text-black font-semibold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Botão Admin no mobile */}
            <Link
              href="/login"
              onClick={() => setMenuAberto(false)}
              className="block py-1 text-sm font-semibold text-black border-t pt-3 mt-2"
            >
              Acesso Admin
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
