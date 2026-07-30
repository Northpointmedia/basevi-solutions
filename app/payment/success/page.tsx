"use client";

import Link from "next/link";
import { CheckCircle2, CalendarDays, Home } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "en" ? "en" : "es";
  const sessionId = searchParams.get("session_id");
  const isSpanish = language === "es";

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "stripe_payment_return",
      payment_status: "success",
      stripe_session_id: sessionId || undefined,
    });
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-700" />

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          Basevi Solutions
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          {isSpanish ? "¡Pago recibido!" : "Payment received!"}
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
          {isSpanish
            ? "Gracias por confiar en Basevi Solutions. Recibirás una confirmación por email y nos pondremos en contacto contigo para solicitar la documentación necesaria."
            : "Thank you for trusting Basevi Solutions. You will receive an email confirmation, and we will contact you to request the necessary documentation."}
        </p>

        <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-left text-sm leading-6 text-emerald-950">
          <strong>
            {isSpanish ? "Próximos pasos:" : "Next steps:"}
          </strong>

          <p className="mt-2">
            {isSpanish
              ? "Revisa tu email, reúne tus documentos y agenda tu reunión cuando estés listo/a."
              : "Check your email, gather your documents, and schedule your meeting when ready."}
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://calendly.com/mbasevim/30min"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            <CalendarDays className="h-5 w-5" />
            {isSpanish ? "Agendar reunión" : "Schedule meeting"}
          </a>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
          >
            <Home className="h-5 w-5" />
            {isSpanish ? "Volver al inicio" : "Back to home"}
          </Link>
        </div>
      </section>
    </main>
  );
}

function PaymentSuccessLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          Basevi Solutions
        </p>

        <p className="mt-5 text-slate-600">Loading...</p>
      </section>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}