import Image from "next/image";
import React from "react";
import Link from "next/link";

export function Brand({
  width = 25,
  height = 25,
}: {
  width: number;
  height: number;
}) {
  return (
    <Link href="/" className="flex items-center justify-start gap-1">
      <Image
        src="/site-logo.svg"
        height={width}
        width={height}
        alt="Site Logo"
      />
      <p>SenderoSocial</p>
    </Link>
  );
}
