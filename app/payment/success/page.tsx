"use client";

import Link from "next/link";
import { CheckCircle2, CalendarDays, Home, ShieldCheck } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type VerificationState = "loading" | "paid" | "unverified";
type PurchaseType = "consultation" | "service";

const CALENDLY_URL = "https://calendly.com/mbasevim/30min";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "en" ? "en" : "es";
  const sessionId = searchParams.get("session_id");
  const isSpanish = language === "es";
  const [verification, setVerification] = useState<VerificationState>("loading");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("service");

  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      if (!sessionId) {
        setVerification("unverified");
        return;
      }

      try {
        const response = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const data = (await response.json()) as {
          paid?: boolean;
          purchaseType?: PurchaseType;
        };

        if (!cancelled) {
          if (data.purchaseType === "consultation") {
            setPurchaseType("consultation");
          }
          setVerification(response.ok && data.paid ? "paid" : "unverified");
        }
      } catch {
        if (!cancelled) setVerification("unverified");
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    if (verification !== "paid") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "stripe_payment_return",
      payment_status: "success",
      stripe_session_id: sessionId || undefined,
    });
  }, [sessionId, verification]);

  if (verification === "loading") {
    return <PaymentSuccessLoading />;
  }

  const isPaid = verification === "paid";

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
        {isPaid ? (
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-700" />
        ) : (
          <ShieldCheck className="mx-auto h-16 w-16 text-slate-500" />
        )}

        <p className={`mt-6 text-sm font-bold uppercase tracking-[0.2em] ${isPaid ? "text-emerald-700" : "text-slate-600"}`}>
          Basevi Solutions
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          {isPaid
            ? isSpanish
              ? "¡Pago recibido!"
              : "Payment received!"
            : isSpanish
              ? "Acceso para clientes"
              : "Client access"}
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
          {isPaid
            ? isSpanish
              ? purchaseType === "consultation"
                ? "Tu pago fue verificado. Ahora selecciona la fecha y hora de tu evaluación para completar la reservación."
                : "Gracias por confiar en Basevi Solutions. Recibirás una confirmación por email y nos pondremos en contacto contigo para solicitar la documentación necesaria."
              : purchaseType === "consultation"
                ? "Your payment was verified. Now select the date and time of your evaluation to complete your booking."
                : "Thank you for trusting Basevi Solutions. You will receive an email confirmation, and we will contact you to request the necessary documentation."
            : isSpanish
              ? "No pudimos verificar un pago completado desde este enlace. Si ya eres cliente de Basevi Solutions, revisa el enlace que recibiste después de tu pago o contáctanos para coordinar tus próximos pasos."
              : "We could not verify a completed payment from this link. If you are already a Basevi Solutions client, use the link provided after payment or contact us to coordinate your next steps."}
        </p>

        {isPaid && (
          <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-left text-sm leading-6 text-emerald-950">
            <strong>{isSpanish ? "Próximos pasos:" : "Next steps:"}</strong>
            <p className="mt-2">
              {isSpanish
                ? purchaseType === "consultation"
                  ? "Pulsa el botón para elegir tu cita en Calendly. La reservación no estará completa hasta seleccionar una fecha y hora."
                  : "Revisa tu email, reúne tus documentos y, si necesitas atención presencial, agenda tu cita exclusiva para clientes activos."
                : purchaseType === "consultation"
                  ? "Use the button to choose your appointment in Calendly. Your booking is not complete until you select a date and time."
                  : "Check your email, gather your documents, and, if you need in-person assistance, book your appointment reserved for active clients."}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {isPaid && purchaseType === "consultation" && (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
            >
              <CalendarDays className="h-5 w-5" />
              {isSpanish ? "Elegir fecha y hora" : "Choose date and time"}
            </a>
          )}

          {isPaid && purchaseType === "service" && (
            <a
              href="https://calendar.app.google/a5gp6utAdqZdi1va9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
            >
              <CalendarDays className="h-5 w-5" />
              {isSpanish ? "Agendar cita presencial" : "Schedule in-person appointment"}
            </a>
          )}

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
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Basevi Solutions</p>
        <p className="mt-5 text-slate-600">Verifying payment...</p>
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
