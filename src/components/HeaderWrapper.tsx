// src/components/HeaderWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { HeaderHome } from "./HeaderHome";
import { HeaderNav } from "./HeaderNav";

export function HeaderWrapper() {
  const pathname = usePathname();

  return pathname === "/" ? <HeaderHome /> : <HeaderNav />;
}
