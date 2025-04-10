// src/components/HeaderHome.tsx
"use client";

import Image from "next/image";
import logo from "../assets/logo_cck.jpg";
import { useRouter } from "next/navigation";

export function HeaderHome() {
  const router = useRouter();

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-center border-b border-gray-200">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src={logo}
          alt="Logo do CCK"
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
          Centro Cultural Kalunguinha
        </h1>
      </div>
    </header>
  );
}
