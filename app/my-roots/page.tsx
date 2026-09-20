import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, FolderCheck, HeartHandshake, Mail } from "lucide-react";
import { myRootsArticles } from "@/lib/my-roots";
import ArticleBrowser from "./ArticleBrowser";
import NewsletterForm from "./NewsletterForm";

export const metadata: Metadata = {
  title: "My Roots | Blog de trámites migratorios",
  description:
    "Historias, guías y experiencias sobre trámites migratorios en Estados Unidos, creadas por BaseviSolutions.",
  alternates: {
    canonical: "/my-roots",
    languages: { "es-US": "/my-roots", "en-US": "/en/my-roots" },
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    title: "My Roots — Historias que orientan",
    description:
      "Un blog de BaseviSolutions para entender los trámites migratorios con claridad, calma y humanidad.",
    url: "/my-roots",
    images: [{ url: "/my-roots-hero.jpg", width: 1800, height: 900, alt: "My Roots de BaseviSolutions" }],
  },
};

export default function MyRootsPage() {
  const featured = myRootsArticles.find((article) => article.featured) ?? myRootsArticles[0];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#dcd8cb] bg-[#fffdf8]">
        <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
          <Image
            src="/my-roots-hero.jpg"
            alt="Cuaderno y elementos naturales que representan raíces e historias"
            fill
            priority
            className="object-cover"
            sizes="56vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf8] via-[#fffdf8]/35 to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[610px] max-w-7xl items-center px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">
              Un blog de BaseviSolutions
            </p>
            <h1 className="mt-5 font-serif text-6xl font-bold leading-[0.98] tracking-tight text-[#173f33] md:text-7xl">
              Historias que ayudan a echar raíces.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f6d65]">
              Trámites migratorios explicados desde la experiencia humana: documentos, decisiones y próximos pasos contados con claridad.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#articulos"
                className="inline-flex items-center gap-2 rounded-full bg-[#173f33] px-6 py-3.5 font-bold text-white transition hover:bg-[#225844]"
              >
                Explorar artículos <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#newsletter"
                className="inline-flex items-center gap-2 rounded-full border border-[#173f33]/25 bg-white px-6 py-3.5 font-bold text-[#173f33] transition hover:border-[#b85f3d] hover:text-[#b85f3d]"
              >
                Recibir My Roots <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e7] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-[34px] bg-[#173f33] text-white shadow-[0_24px_70px_rgba(23,63,51,0.18)]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-72 overflow-hidden lg:min-h-[460px]">
                <Image
                  src="/my-roots-hero.jpg"
                  alt="Historia destacada de My Roots"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-[#173f33]/20" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e3b399]">Historia de la semana</p>
                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight md:text-5xl">{featured.title}</h2>
                <p className="mt-6 max-w-xl leading-7 text-[#d7ded8]">{featured.dek}</p>
                <div className="mt-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#b9c9bf]">
                  <span>{featured.category}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.readingTime} de lectura</span>
                </div>
                <Link
                  href={`/my-roots/${featured.slug}`}
                  className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#f6f1e7] px-6 py-3.5 font-bold text-[#173f33] transition hover:bg-white"
                >
                  Leer historia completa <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArticleBrowser />

      <section id="experiencias" className="scroll-mt-28 bg-[#f6f1e7] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b85f3d]">Experiencias</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#173f33] md:text-5xl">
                No publicamos expedientes. Compartimos aprendizajes.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#66716b]">
                Estas historias nacen de situaciones atendidas por BaseviSolutions. Los nombres y datos identificativos se modifican para proteger la privacidad, pero los retos documentales y las lecciones son reales.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [FolderCheck, "Orden", "Convertimos documentos dispersos en una historia verificable."],
                [BookOpen, "Claridad", "Explicamos cada paso sin convertirlo en una promesa."],
                [HeartHandshake, "Humanidad", "Detrás de cada formulario hay una familia y un propósito."],
              ].map(([Icon, title, text]) => {
                const ExperienceIcon = Icon as typeof FolderCheck;
                return (
                  <div key={String(title)} className="rounded-[26px] border border-[#dcd8cb] bg-[#fffdf8] p-6">
                    <ExperienceIcon className="h-7 w-7 text-[#b85f3d]" />
                    <h3 className="mt-5 font-serif text-2xl font-bold text-[#173f33]">{String(title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#66716b]">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="scroll-mt-28 bg-[#fffdf8] py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[34px] bg-[#b85f3d] p-8 text-white shadow-[0_22px_60px_rgba(100,48,29,0.18)] sm:p-12 lg:p-16">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[38px] border-white/10" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffe1d2]">Newsletter</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">
                Una lectura útil. Sin ruido y sin falsas promesas.
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-[#fff1e9]">
                Recibe nuevas historias, recordatorios documentales y explicaciones prácticas directamente en tu email.
              </p>
              <NewsletterForm />
              <p className="mt-4 text-xs text-[#ffe1d2]">
                Al suscribirte aceptas recibir el newsletter de My Roots. Podrás darte de baja cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
