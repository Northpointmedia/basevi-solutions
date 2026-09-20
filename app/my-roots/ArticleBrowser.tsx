"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { MyRootsArticle } from "@/lib/my-roots";
import { myRootsArticles, myRootsCategories } from "@/lib/my-roots";

export default function ArticleBrowser({
  language = "es",
  articles = myRootsArticles,
  categories = myRootsCategories,
}: {
  language?: "es" | "en";
  articles?: MyRootsArticle[];
  categories?: readonly string[];
}) {
  const isSpanish = language === "es";
  const [category, setCategory] = useState<string>(categories[0]);
  const [query, setQuery] = useState("");

  const visibleArticles = useMemo(() => {
    const locale = isSpanish ? "es" : "en";
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return articles.filter((article) => {
      const matchesCategory = category === categories[0] || article.category === category;
      const searchable = `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase(locale);
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [articles, categories, category, isSpanish, query]);

  const basePath = isSpanish ? "/my-roots" : "/en/my-roots";

  return (
    <section id="articulos" className="scroll-mt-28 bg-[#fffdf8] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b85f3d]">{isSpanish ? "Lecturas recientes" : "Recent stories"}</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#173f33] md:text-5xl">
              {isSpanish ? "Información que se siente cercana" : "Information that feels close to home"}
            </h2>
          </div>
          <label className="flex w-full items-center gap-3 rounded-full border border-[#dcd8cb] bg-white px-5 py-3 text-[#526159] shadow-sm lg:max-w-sm">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{isSpanish ? "Buscar artículos" : "Search articles"}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isSpanish ? "Buscar por tema…" : "Search by topic…"}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#879189]"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label={isSpanish ? "Categorías" : "Categories"}>
          {categories.map((item) => (
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
                    <span className="text-[#7b857f]">{article.readingTime} {isSpanish ? "de lectura" : "read"}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-[#173f33]">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#66716b]">{article.excerpt}</p>
                  <Link
                    href={`${basePath}/${article.slug}`}
                    className="mt-auto pt-7 text-sm font-bold text-[#173f33] transition group-hover:text-[#b85f3d]"
                  >
                    {isSpanish ? "Leer artículo completo →" : "Read full article →"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-[#cfc9ba] bg-[#f6f1e7] p-10 text-center text-[#66716b]">
            {isSpanish
              ? "No encontramos artículos con esa búsqueda. Prueba con “familia”, “FOIA” o “Green Card”."
              : "We couldn't find articles for that search. Try “family,” “FOIA,” or “Green Card.”"}
          </div>
        )}
      </div>
    </section>
  );
}
