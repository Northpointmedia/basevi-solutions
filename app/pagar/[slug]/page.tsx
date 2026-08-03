import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import {
  getPaymentService,
  paymentServices,
} from "@/lib/payment-services";
import PaymentButton from "./PaymentButton";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

const calendlyUrl = "https://calendly.com/mbasevim/30min";
const whatsappUrl = "https://wa.me/13054823406";

export function generateStaticParams() {
  return paymentServices
    .filter((service) => service.slug !== "i-130")
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getPaymentService(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.nameEs} | Basevi Solutions`,
    description: service.descriptionEs,
    robots: { index: false, follow: false },
  };
}

export default async function ServicePaymentPage({
  params,
  searchParams,
}: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const service = getPaymentService(slug);

  if (!service) {
    notFound();
  }

  const requestedLanguage = Array.isArray(query.lang)
    ? query.lang[0]
    : query.lang;
  const language: "es" | "en" = requestedLanguage === "en" ? "en" : "es";
  const isSpanish = language === "es";
  const isQuote = service.checkoutMode === "quote";
  const name = isSpanish ? service.nameEs : service.nameEn;
  const description = isSpanish
    ? service.descriptionEs
    : service.descriptionEn;
  const priceLabel = isSpanish
    ? service.priceLabelEs
    : service.priceLabelEn;
  const alternateLanguage = isSpanish ? "en" : "es";

  const includedItems = isSpanish
    ? [
        "Preparación profesional basada en la información proporcionada por el cliente.",
        "Organización y revisión administrativa de los documentos de respaldo suministrados.",
        "Acompañamiento durante la preparación y entrega del servicio contratado.",
      ]
    : [
        "Professional preparation based on the information provided by the client.",
        "Administrative organization and review of the supporting documents supplied.",
        "Support throughout the preparation and delivery of the contracted service.",
      ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="border-b border-slate-200 bg-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link aria-label="Basevi Solutions - Inicio" href="/">
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
              href={`/pagar/${service.slug}?lang=${alternateLanguage}`}
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
              {isQuote
                ? isSpanish
                  ? "Enlace oficial de evaluación"
                  : "Official evaluation link"
                : isSpanish
                  ? "Enlace oficial de pago"
                  : "Official payment link"}
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {description}
            </p>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <strong>
                {isSpanish ? "Antes de continuar:" : "Before continuing:"}
              </strong>{" "}
              {isSpanish
                ? "utiliza este enlace únicamente si Basevi Solutions ya confirmó contigo el servicio, su alcance y el precio."
                : "use this link only after Basevi Solutions has confirmed the service, its scope, and the price with you."}
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
              {isQuote
                ? isSpanish
                  ? "Resumen del servicio"
                  : "Service summary"
                : isSpanish
                  ? "Resumen de pago"
                  : "Payment summary"}
            </p>

            <div className="mt-6 flex items-start justify-between gap-5 border-b border-slate-200 pb-6">
              <div>
                <h2 className="font-bold leading-6 text-slate-950">{name}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {isQuote
                    ? isSpanish
                      ? "Precio final sujeto a evaluación"
                      : "Final price subject to evaluation"
                    : service.checkoutMode === "quantity"
                      ? isSpanish
                        ? "Selecciona la cantidad de páginas en Stripe"
                        : "Select the number of pages in Stripe"
                      : isSpanish
                        ? "Pago único"
                        : "One-time payment"}
                </p>
              </div>
              <p className="shrink-0 text-xl font-bold text-slate-950">
                {priceLabel}
              </p>
            </div>

            {isQuote ? (
              <div className="pt-6">
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  {isSpanish
                    ? "Agenda una evaluación gratuita para confirmar el alcance y el precio final antes de pagar."
                    : "Schedule a free evaluation to confirm the scope and final price before paying."}
                </p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  {isSpanish
                    ? "Solicitar evaluación gratuita"
                    : "Request a free evaluation"}
                </a>
              </div>
            ) : (
              <div className="pt-6">
                <PaymentButton
                  serviceId={service.id}
                  priceId={service.stripePriceId}
                  language={language}
                  adjustableQuantity={service.checkoutMode === "quantity"}
                  priceLabel={priceLabel}
                />
              </div>
            )}

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <LockKeyhole
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              <p>
                {isSpanish
                  ? "Los pagos se procesan de forma segura mediante Stripe. Basevi Solutions no almacena los datos de tu tarjeta."
                  : "Payments are processed securely through Stripe. Basevi Solutions does not store your card information."}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {isSpanish
                ? "¿Tienes dudas? Contáctanos"
                : "Questions? Contact us"}
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
