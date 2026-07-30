"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function PaymentCancelledPage() {
  const searchParams = useSearchParams();
  const isSpanish = searchParams.get("lang") !== "en";

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          Basevi Solutions
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">
          {isSpanish ? "El pago no se completó" : "Payment was not completed"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
          {isSpanish
            ? "No se realizó ningún cargo. Puedes volver al servicio e intentarlo de nuevo o agendar una evaluación gratuita."
            : "No charge was made. You can return to the service and try again or book a free evaluation."}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/#servicios"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-600"
          >
            <ArrowLeft className="h-5 w-5" />
            {isSpanish ? "Volver a los servicios" : "Return to services"}
          </Link>
          <a
            href="https://calendly.com/mbasevim/30min"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-700 hover:border-emerald-700 hover:text-emerald-800"
          >
            <CalendarDays className="h-5 w-5" />
            {isSpanish ? "Agendar evaluación" : "Book an evaluation"}
          </a>
        </div>
      </section>
    </main>
  );
}
