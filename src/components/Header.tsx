import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Blog
        </Link>
        <Link href="/login" className="text-lg font-medium tracking-tight">
          Login
        </Link>
      </nav>
    </header>
  );
}
