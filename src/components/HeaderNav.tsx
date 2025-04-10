// src/components/HeaderNav.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/logo_cck.jpg";

const links = [
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/oficinas", label: "Oficinas" },
  { href: "/juquinha", label: "Juquinha" },
  { href: "/formacao", label: "Formação" },
  { href: "/agenda", label: "Agenda" },
  { href: "/apoie", label: "Apoie" },
  { href: "/contato", label: "Contato" },
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src={logo} alt="Logo CCK" width={40} height={40} className="rounded-full" />
        <span className="text-lg font-semibold text-gray-800">Centro Cultural Kalunguinha</span>
      </Link>

      <nav className="hidden md:flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium hover:text-black ${
              pathname === link.href ? "text-black" : "text-gray-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/login"
        className="text-sm px-4 py-2 bg-black text-white rounded hover:opacity-90 transition"
      >
        Admin
      </Link>
    </header>
  );
}
