import { Brand } from "@/components/site/features";
import { Content } from "../Wrapper";

export function Footer() {
  return (
    <footer className="flex items-center justify-between">
      <Content>
        <Brand width={25} height={25} />
        <section>Footer</section>
      </Content>
    </footer>
  );
}
