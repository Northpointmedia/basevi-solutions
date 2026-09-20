"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { myRootsArticles, myRootsCategories } from "@/lib/my-roots";

export default function ArticleBrowser() {
  const [category, setCategory] = useState<(typeof myRootsCategories)[number]>("Todos");
  const [query, setQuery] = useState("");

  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");

    return myRootsArticles.filter((article) => {
      const matchesCategory = category === "Todos" || article.category === category;
      const searchable = `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase("es");
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <section id="articulos" className="scroll-mt-28 bg-[#fffdf8] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b85f3d]">Lecturas recientes</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#173f33] md:text-5xl">
              Información que se siente cercana
            </h2>
          </div>
          <label className="flex w-full items-center gap-3 rounded-full border border-[#dcd8cb] bg-white px-5 py-3 text-[#526159] shadow-sm lg:max-w-sm">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Buscar artículos</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por tema…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#879189]"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Categorías">
          {myRootsCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                category === item
                  ? "border-[#173f33] bg-[#173f33] text-white"
                  : "border-[#dcd8cb] bg-white text-[#536159] hover:border-[#b85f3d] hover:text-[#b85f3d]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {visibleArticles.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleArticles.map((article, index) => (
              <article
                key={article.slug}
                className="group flex min-h-[330px] flex-col overflow-hidden rounded-[28px] border border-[#ded9cc] bg-white shadow-[0_16px_45px_rgba(28,54,44,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(28,54,44,0.13)]"
              >
                <div
                  className={`h-2 ${
                    index % 3 === 0 ? "bg-[#b85f3d]" : index % 3 === 1 ? "bg-[#7f8f67]" : "bg-[#d0a67b]"
                  }`}
                />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em]">
                    <span className="text-[#b85f3d]">{article.category}</span>
                    <span className="text-[#7b857f]">{article.readingTime} de lectura</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-[#173f33]">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#66716b]">{article.excerpt}</p>
                  <Link
                    href={`/my-roots/${article.slug}`}
                    className="mt-auto pt-7 text-sm font-bold text-[#173f33] transition group-hover:text-[#b85f3d]"
                  >
                    Leer artículo completo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-[#cfc9ba] bg-[#f6f1e7] p-10 text-center text-[#66716b]">
            No encontramos artículos con esa búsqueda. Prueba con “familia”, “FOIA” o “Green Card”.
          </div>
        )}
      </div>
    </section>
  );
}

