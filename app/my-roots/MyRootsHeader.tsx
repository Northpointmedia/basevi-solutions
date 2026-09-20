"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { myRootsArticles } from "@/lib/my-roots";
import { myRootsArticlesEn } from "@/lib/my-roots-en";

export default function MyRootsHeader({ language = "es" }: { language?: "es" | "en" }) {
  const isSpanish = language === "es";
  const basePath = isSpanish ? "/my-roots" : "/en/my-roots";
  const pathname = usePathname();
  const currentSlug = pathname.split("/").filter(Boolean).at(-1);
  const articleIndex = isSpanish
    ? myRootsArticles.findIndex((article) => article.slug === currentSlug)
    : myRootsArticlesEn.findIndex((article) => article.slug === currentSlug);
  const languageHref = articleIndex >= 0
    ? isSpanish
      ? `/en/my-roots/${myRootsArticlesEn[articleIndex].slug}`
      : `/my-roots/${myRootsArticles[articleIndex].slug}`
    : isSpanish ? "/en/my-roots" : "/my-roots";

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("basevi-language", language);
  }, [language]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#dcd8cb] bg-[#f6f1e7]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-5 px-5 py-3 lg:px-8">
        <Link href="/" className="shrink-0" aria-label={isSpanish ? "Volver a Basevi Solutions" : "Return to Basevi Solutions"}>
          <Image
            src="/basevi-logo.webp"
            alt="Basevi Solutions LLC"
            width={240}
            height={98}
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <div className="h-9 w-px bg-[#173f33]/20" />

        <Link href={basePath} className="mr-auto leading-none">
          <span className="font-serif text-2xl font-bold text-[#173f33]">My Roots</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#b85f3d]">
            {isSpanish ? "Historias que orientan" : "Stories that guide"}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#39463f] md:flex" aria-label={isSpanish ? "Navegación del blog" : "Blog navigation"}>
          <Link className="transition hover:text-[#b85f3d]" href={`${basePath}#articulos`}>
            {isSpanish ? "Artículos" : "Articles"}
          </Link>
          <Link className="transition hover:text-[#b85f3d]" href={`${basePath}#experiencias`}>
            {isSpanish ? "Experiencias" : "Experiences"}
          </Link>
          <Link className="transition hover:text-[#b85f3d]" href={`${basePath}#newsletter`}>
            Newsletter
          </Link>
        </nav>

        <Link
          href={languageHref}
          className="hidden rounded-full border border-[#173f33]/25 px-3 py-2 text-xs font-bold text-[#173f33] transition hover:border-[#b85f3d] hover:text-[#b85f3d] sm:inline-flex"
          aria-label={isSpanish ? "View My Roots in English" : "Ver My Roots en español"}
        >
          {isSpanish ? "EN" : "ES"}
        </Link>

        <Link
          href="/#contacto"
          className="rounded-full bg-[#173f33] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#225844] sm:px-5 sm:text-sm"
        >
          {isSpanish ? "Hablar con Basevi" : "Talk to Basevi"}
        </Link>
      </div>
    </header>
  );
}
