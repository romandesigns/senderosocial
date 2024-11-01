import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brand, ModeToggle } from "@/components/site/features";
import { Content } from "../Wrapper";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between">
      <Content>
        <Brand width={25} height={25} />
        <ul className="flex items-center justify-end gap-4 text-xs">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/excursiones">Excursiones</Link>
          </li>
          <li>
            <Button asChild size="sm">
              <Link href="/iniciar-session">Iniciar Session</Link>
            </Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </Content>
    </nav>
  );
}
