import Image from "next/image";
import Link from "next/link";

export default function MyRootsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dcd8cb] bg-[#f6f1e7]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-5 px-5 py-3 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Volver a Basevi Solutions">
          <Image
            src="/basevi-logo.webp"
            alt="Basevi Solutions LLC"
            width={240}
            height={98}
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <div className="h-9 w-px bg-[#173f33]/20" />

        <Link href="/my-roots" className="mr-auto leading-none">
          <span className="font-serif text-2xl font-bold text-[#173f33]">My Roots</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#b85f3d]">
            Historias que orientan
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#39463f] md:flex" aria-label="Navegación del blog">
          <Link className="transition hover:text-[#b85f3d]" href="/my-roots#articulos">
            Artículos
          </Link>
          <Link className="transition hover:text-[#b85f3d]" href="/my-roots#experiencias">
            Experiencias
          </Link>
          <Link className="transition hover:text-[#b85f3d]" href="/my-roots#newsletter">
            Newsletter
          </Link>
        </nav>

        <Link
          href="/#contacto"
          className="rounded-full bg-[#173f33] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#225844] sm:px-5 sm:text-sm"
        >
          Hablar con Basevi
        </Link>
      </div>
    </header>
  );
}

