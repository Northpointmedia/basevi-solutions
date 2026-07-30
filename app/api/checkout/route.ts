import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutRequest = {
  priceId?: string;
  serviceId?: number;
  language?: "es" | "en";
  adjustableQuantity?: boolean;
};

const ALLOWED_PRICE_IDS = new Set([
  "price_1TyFgARoRO493tQv3revGwzN",
  "price_1TyEwuRoRO493tQv2kxFx7hM",
  "price_1TyFKtRoRO493tQvrXA2k9NR",
  "price_1TyF1qRoRO493tQvHmdpmmhs",
  "price_1TyF8ZRoRO493tQv7nPpNdiq",
  "price_1TyF5GRoRO493tQvgnh1upqp",
  "price_1TyFUaRoRO493tQvGfnXOhSG",
  "price_1TyFABRoRO493tQvahy3H3SV",
  "price_1TyFSKRoRO493tQvhNkmuCh4",
  "price_1TyFNSRoRO493tQvJHyzzaof",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;
    const { priceId, serviceId, language = "es", adjustableQuantity = false } = body;

    if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
      return NextResponse.json(
        { error: "Invalid or unavailable service." },
        { status: 400 },
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://basevisolutions.com";

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price: priceId,
      quantity: 1,
    };

    if (adjustableQuantity) {
      lineItem.adjustable_quantity = {
        enabled: true,
        minimum: 1,
        maximum: 50,
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [lineItem],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&lang=${language}`,
      cancel_url: `${origin}/payment/cancelled?lang=${language}`,
      customer_creation: "always",
      billing_address_collection: "auto",
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: false,
      automatic_tax: {
        enabled: false,
      },
      metadata: {
        service_id: String(serviceId ?? ""),
        language,
        source: "basevisolutions_website",
      },
      payment_intent_data: {
        metadata: {
          service_id: String(serviceId ?? ""),
          language,
          source: "basevisolutions_website",
        },
      },
      custom_text: {
        submit: {
          message:
            language === "es"
              ? "Los honorarios del servicio no incluyen tarifas gubernamentales ni costos de terceros."
              : "Service fees do not include government filing fees or third-party costs.",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Unable to start secure checkout. Please try again." },
      { status: 500 },
    );
  }
}
