import Link from "next/link";

export default function MyRootsFooter({ language = "es" }: { language?: "es" | "en" }) {
  const isSpanish = language === "es";
  const basePath = isSpanish ? "/my-roots" : "/en/my-roots";

  return (
    <footer className="border-t border-[#dcd8cb] bg-[#173f33] text-[#f6f1e7]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-3xl font-bold">My Roots</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#d7ded8]">
            {isSpanish
              ? "Un proyecto editorial de BaseviSolutions para entender los trámites migratorios con claridad, calma y humanidad."
              : "A BaseviSolutions editorial project that explains immigration processes with clarity, calm, and humanity."}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm">
          <p className="mb-1 font-bold uppercase tracking-[0.14em] text-[#d9a98f]">{isSpanish ? "Explorar" : "Explore"}</p>
          <Link href={`${basePath}#articulos`}>{isSpanish ? "Artículos" : "Articles"}</Link>
          <Link href={`${basePath}#experiencias`}>{isSpanish ? "Experiencias" : "Experiences"}</Link>
          <Link href={`${basePath}#newsletter`}>Newsletter</Link>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm">
          <p className="mb-1 font-bold uppercase tracking-[0.14em] text-[#d9a98f]">BaseviSolutions</p>
          <a href="mailto:info@basevisolutions.com">info@basevisolutions.com</a>
          <a href="tel:+13054823406">+1 (305) 482-3406</a>
          <Link href="/">{isSpanish ? "Volver al website principal" : "Return to the main website"}</Link>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs leading-5 text-[#b9c5bd] lg:px-8">
          {isSpanish
            ? "BaseviSolutions presta servicios de preparación documental y asistencia administrativa; no es un bufete de abogados y no ofrece asesoría legal. My Roots tiene fines informativos y no garantiza resultados. Cada caso es diferente."
            : "BaseviSolutions provides document preparation and administrative assistance; it is not a law firm and does not provide legal advice. My Roots is for informational purposes and does not guarantee results. Every case is different."}
        </p>
      </div>
    </footer>
  );
}
