import Link from "next/link";
import React from "react";
import { ModeToggle } from "../../features";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between">
      <div>SS</div>
      <ul className="flex items-center justify-end gap-4">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/iniciar-session">Iniciar Session</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
