import Link from "next/link";

export default function MyRootsFooter() {
  return (
    <footer className="border-t border-[#dcd8cb] bg-[#173f33] text-[#f6f1e7]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-3xl font-bold">My Roots</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#d7ded8]">
            Un proyecto editorial de BaseviSolutions para entender los trámites migratorios con claridad, calma y humanidad.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm">
          <p className="mb-1 font-bold uppercase tracking-[0.14em] text-[#d9a98f]">Explorar</p>
          <Link href="/my-roots#articulos">Artículos</Link>
          <Link href="/my-roots#experiencias">Experiencias</Link>
          <Link href="/my-roots#newsletter">Newsletter</Link>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm">
          <p className="mb-1 font-bold uppercase tracking-[0.14em] text-[#d9a98f]">BaseviSolutions</p>
          <a href="mailto:info@basevisolutions.com">info@basevisolutions.com</a>
          <a href="tel:+13054823406">+1 (305) 482-3406</a>
          <Link href="/">Volver al website principal</Link>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs leading-5 text-[#b9c5bd] lg:px-8">
          BaseviSolutions presta servicios de preparación documental y asistencia administrativa; no es un bufete de abogados y no ofrece asesoría legal. My Roots tiene fines informativos y no garantiza resultados. Cada caso es diferente.
        </p>
      </div>
    </footer>
  );
}

