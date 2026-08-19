"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    const trimmed = value.trim();
    if (trimmed) params.set("q", trimmed);
    router.push(
      params.toString() ? `/catalogo?${params.toString()}` : "/catalogo",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        className="w-full h-10 rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:border-accent transition-colors"
      />
    </form>
  );
}
