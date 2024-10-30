import { Navigation, Footer } from "@/components/site/layout";

export function Site({
  children,
  navigation = true,
  footer = true,
}: {
  children: React.ReactNode;
  navigation?: boolean;
  footer?: boolean;
}) {
  return (
    <>
      {navigation && <Navigation />}
      {children}
      {footer && <Footer />}
    </>
  );
}
