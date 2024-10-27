import React from "react";
import { Navigation } from "../../Navigation";

export function Site({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
