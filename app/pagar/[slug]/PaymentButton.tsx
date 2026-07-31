"use client";

import { CreditCard, LoaderCircle } from "lucide-react";
import { useState } from "react";

type PaymentButtonProps = {
  serviceId: number;
  priceId: string;
  language: "es" | "en";
  adjustableQuantity: boolean;
  priceLabel: string;
};

export default function PaymentButton({
  serviceId,
  priceId,
  language,
  adjustableQuantity,
  priceLabel,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSpanish = language === "es";

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          serviceId,
          language,
          adjustableQuantity,
        }),
      });

      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Unable to create checkout session.");
      }

      window.location.assign(result.url);
    } catch {
      setError(
        isSpanish
          ? "No pudimos iniciar el pago. Inténtalo de nuevo o contáctanos."
          : "We could not start the payment. Please try again or contact us.",
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-emerald-600 enabled:hover:shadow-xl disabled:cursor-wait disabled:bg-emerald-500"
      >
        {loading ? (
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <CreditCard className="h-5 w-5" aria-hidden="true" />
        )}
        {loading
          ? isSpanish
            ? "Abriendo pago seguro..."
            : "Opening secure payment..."
          : isSpanish
            ? `Pagar ${priceLabel} de forma segura`
            : `Pay ${priceLabel} securely`}
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        {isSpanish
          ? "Serás redirigido a la página segura de Stripe para completar el pago."
          : "You will be redirected to Stripe's secure page to complete payment."}
      </p>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
