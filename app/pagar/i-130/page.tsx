import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import PaymentButton from "./PaymentButton";

export const metadata: Metadata = {
  title: "Pago I-130 | Basevi Solutions",
  description:
    "Enlace seguro de pago para el servicio de preparación del Formulario I-130 de Basevi Solutions.",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function I130PaymentPage({
  searchParams,
}: PaymentPageProps) {
  const params = await searchParams;
  const language = params.lang === "en" ? "en" : "es";
  const isSpanish = language === "es";

  const includedItems = isSpanish
    ? [
        "Preparación profesional del Formulario I-130 con la información proporcionada por el cliente.",
        "Organización y revisión administrativa de los documentos de respaldo suministrados.",
        "Acompañamiento durante la preparación y entrega del servicio contratado.",
      ]
    : [
        "Professional preparation of Form I-130 using the information provided by the client.",
        "Administrative organization and review of the supporting documents provided.",
        "Support throughout the preparation and delivery of the contracted service.",
      ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="border-b border-slate-200 bg-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" aria-label="Basevi Solutions - Inicio">
            <Image
              src="/basevi-logo.webp"
              alt="Basevi Solutions"
              width={180}
              height={64}
              priority
              className="h-auto w-36 sm:w-44"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={isSpanish ? "/pagar/i-130?lang=en" : "/pagar/i-130"}
              className="rounded-full border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              {isSpanish ? "English" : "Español"}
            </Link>
            <Link
              href="/"
              className="hidden items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-800 sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {isSpanish ? "Volver al inicio" : "Back to home"}
            </Link>
          </div>
        </header>
      </div>

      <section className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_right,_rgba(5,150,105,0.14),_transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="pt-2 lg:pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {isSpanish ? "Enlace oficial de pago" : "Official payment link"}
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {isSpanish
                ? "Petición familiar (Formulario I-130)"
                : "Family-Based Petition (Form I-130)"}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {isSpanish
                ? "Preparación profesional del Formulario I-130 para establecer una relación familiar elegible con un ciudadano estadounidense o residente permanente legal."
                : "Professional preparation of Form I-130 to establish a qualifying family relationship with a U.S. citizen or lawful permanent resident."}
            </p>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <strong>
                {isSpanish ? "Antes de continuar:" : "Before continuing:"}
              </strong>{" "}
              {isSpanish
                ? "utiliza este enlace únicamente si Basevi Solutions ya confirmó contigo el servicio, su alcance y el precio."
                : "use this link only after Basevi Solutions has confirmed the service, scope, and price with you."}
            </div>

            <div className="mt-9">
              <h2 className="text-lg font-bold text-slate-950">
                {isSpanish ? "El servicio incluye" : "The service includes"}
              </h2>
              <ul className="mt-5 space-y-4">
                {includedItems.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              {isSpanish ? "Resumen de pago" : "Payment summary"}
            </p>

            <div className="mt-6 flex items-start justify-between gap-5 border-b border-slate-200 pb-6">
              <div>
                <h2 className="font-bold leading-6 text-slate-950">
                  {isSpanish
                    ? "Preparación del Formulario I-130"
                    : "Form I-130 Preparation"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {isSpanish ? "Pago único" : "One-time payment"}
                </p>
              </div>
              <p className="text-2xl font-bold text-slate-950">$500</p>
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="font-bold text-slate-700">
                {isSpanish ? "Total" : "Total"}
              </span>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-800">$500.00</p>
                <p className="mt-1 text-xs font-medium text-slate-500">USD</p>
              </div>
            </div>

            <PaymentButton language={language} />

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <LockKeyhole
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              <p>
                {isSpanish
                  ? "El pago se procesa de forma segura mediante Stripe. Basevi Solutions no almacena los datos de tu tarjeta."
                  : "Payment is securely processed by Stripe. Basevi Solutions does not store your card information."}
              </p>
            </div>

            <a
              href="https://wa.me/17868300438"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {isSpanish ? "¿Tienes dudas? Contáctanos" : "Questions? Contact us"}
            </a>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              {isSpanish
                ? "Los honorarios de Basevi Solutions no incluyen tarifas gubernamentales ni costos de terceros. Basevi Solutions no es un bufete de abogados y no ofrece asesoría legal ni representación."
                : "Basevi Solutions fees do not include government filing fees or third-party costs. Basevi Solutions is not a law firm and does not provide legal advice or representation."}
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
