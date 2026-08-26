"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function EvaluationPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSpanish = language === "es";

  const startCheckout = async () => {
    if (!accepted || loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/consultation-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || "Checkout unavailable");
      window.location.assign(payload.url);
    } catch {
      setError(
        isSpanish
          ? "No pudimos abrir el pago seguro. Inténtalo nuevamente o contáctanos."
          : "We could not open secure checkout. Please try again or contact us.",
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950 sm:py-16">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        <div className="bg-slate-950 px-7 py-9 text-white sm:px-12">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="font-bold text-emerald-300">BASEVI SOLUTIONS</Link>
            <button
              type="button"
              onClick={() => setLanguage(isSpanish ? "en" : "es")}
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold"
            >
              {isSpanish ? "EN" : "ES"}
            </button>
          </div>
          <p className="mt-9 text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
            {isSpanish ? "Evaluación virtual" : "Virtual evaluation"}
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            {isSpanish ? "Evaluación inicial — US$25" : "Initial evaluation — US$25"}
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            {isSpanish
              ? "Una reunión privada de 30 minutos para conocer tu situación, identificar la asistencia documental que necesitas y determinar si podemos ayudarte."
              : "A private 30-minute meeting to understand your situation, identify the document assistance you need, and determine whether we can help."}
          </p>
        </div>

        <div className="space-y-8 px-7 py-9 sm:px-12 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [Clock3, isSpanish ? "30 minutos" : "30 minutes"],
              [CreditCard, isSpanish ? "Pago seguro" : "Secure payment"],
              [CalendarDays, isSpanish ? "Tú eliges la hora" : "Choose your time"],
            ].map(([Icon, label]) => {
              const ItemIcon = Icon as typeof Clock3;
              return (
                <div key={String(label)} className="rounded-2xl bg-slate-50 p-5 text-center">
                  <ItemIcon className="mx-auto h-6 w-6 text-emerald-700" />
                  <p className="mt-3 text-sm font-bold">{String(label)}</p>
                </div>
              );
            })}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {isSpanish ? "Política de reservación" : "Booking policy"}
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />{isSpanish ? "Los US$25 se acreditan completamente al servicio que contrates dentro de los 7 días siguientes a la evaluación." : "The US$25 is fully credited toward a service purchased within 7 days after the evaluation."}</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />{isSpanish ? "Puedes reprogramar una sola vez avisando con un mínimo de 24 horas de anticipación." : "You may reschedule once with at least 24 hours' notice."}</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />{isSpanish ? "Las cancelaciones con menos de 24 horas y las inasistencias no son reembolsables." : "Cancellations with less than 24 hours' notice and no-shows are nonrefundable."}</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />{isSpanish ? "Se concede un periodo máximo de espera de 10 minutos; después se considera inasistencia." : "A maximum 10-minute grace period is provided; afterward, the appointment is considered a no-show."}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{isSpanish ? "BASEVISOLUTIONS LLC no es un bufete de abogados y no brinda asesoría legal ni representación jurídica. La evaluación se limita a identificar necesidades de preparación documental y asistencia administrativa." : "BASEVISOLUTIONS LLC is not a law firm and does not provide legal advice or legal representation. The evaluation is limited to identifying document-preparation and administrative-assistance needs."}</p>
            </div>
          </div>

          <label className="flex cursor-pointer gap-3 rounded-2xl border-2 border-slate-200 p-5 transition has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-emerald-700"
            />
            <span className="font-semibold leading-6">
              {isSpanish ? "He leído y acepto la política de reservación, reprogramación, cancelación y no reembolso por inasistencia." : "I have read and accept the booking, rescheduling, cancellation, and no-show refund policy."}
            </span>
          </label>

          <button
            type="button"
            disabled={!accepted || loading}
            onClick={startCheckout}
            className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-lg font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading
              ? isSpanish ? "Abriendo pago seguro…" : "Opening secure checkout…"
              : isSpanish ? "Pagar US$25 y elegir cita" : "Pay US$25 and choose a time"}
          </button>

          {error && <p className="text-center text-sm font-semibold text-red-700">{error}</p>}

          <p className="text-center text-xs leading-5 text-slate-500">
            {isSpanish
              ? "Después del pago verificado, podrás seleccionar la fecha y hora disponibles en Calendly."
              : "After your payment is verified, you can select an available date and time in Calendly."}
          </p>
        </div>
      </section>
    </main>
  );
}
