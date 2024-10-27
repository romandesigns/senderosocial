import React from "react";

export function Content({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-4xl">{children}</div>;
}
