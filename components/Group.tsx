import { cx } from "@/lib/classname";
import React from "react";

export function Group({
  direction = "row",
  children,
  classNames,
}: Readonly<{
  direction?: "row" | "column";
  children: React.ReactNode;
  classNames: string;
}>) {
  return (
    <div
      className={cx(
        `flex items-center justify-center ${classNames ? classNames : ""}`,
        direction === "row" ? "flex-row" : "flex-col"
      )}
    >
      {children}
    </div>
  );
}
