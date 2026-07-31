"use client";

import { CreditCard, LoaderCircle } from "lucide-react";
import { useState } from "react";

const I130_PRICE_ID = "price_1TyFgARoRO493tQv3revGwzN";

type PaymentButtonProps = {
  language: "es" | "en";
};

export default function PaymentButton({ language }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isSpanish = language === "es";

  const startCheckout = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: I130_PRICE_ID,
          serviceId: 1,
          language,
          adjustableQuantity: false,
        }),
      });

      const payload = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to create checkout session.");
      }

      window.location.assign(payload.url);
    } catch {
      setErrorMessage(
        isSpanish
          ? "No pudimos abrir el pago seguro. Inténtalo nuevamente o comunícate con Basevi Solutions."
          : "We could not open secure checkout. Please try again or contact Basevi Solutions.",
      );
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-emerald-600 enabled:hover:shadow-xl disabled:cursor-wait disabled:bg-emerald-500"
      >
        {isLoading ? (
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <CreditCard className="h-5 w-5" aria-hidden="true" />
        )}
        {isLoading
          ? isSpanish
            ? "Abriendo pago seguro..."
            : "Opening secure checkout..."
          : isSpanish
            ? "Pagar $500 de forma segura"
            : "Pay $500 securely"}
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        {isSpanish
          ? "Serás redirigido a la página segura de Stripe para completar el pago."
          : "You will be redirected to Stripe's secure page to complete payment."}
      </p>

      {errorMessage && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
