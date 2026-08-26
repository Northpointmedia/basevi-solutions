import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { language?: "es" | "en" };
    const language = body.language === "en" ? "en" : "es";
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://basevisolutions.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: 2500,
            product_data: {
              name:
                language === "es"
                  ? "Evaluación inicial virtual — 30 minutos"
                  : "Initial virtual evaluation — 30 minutes",
              description:
                language === "es"
                  ? "El pago se acredita a un servicio contratado dentro de los siguientes 7 días."
                  : "Payment is credited toward a service purchased within the following 7 days.",
            },
          },
        },
      ],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&lang=${language}`,
      cancel_url: `${origin}/evaluacion?lang=${language}`,
      customer_creation: "always",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      metadata: {
        service_id: "initial_evaluation",
        purchase_type: "consultation",
        language,
        source: "basevisolutions_website",
        booking_policy_accepted: "true",
      },
      payment_intent_data: {
        metadata: {
          service_id: "initial_evaluation",
          purchase_type: "consultation",
          source: "basevisolutions_website",
        },
      },
      custom_text: {
        submit: {
          message:
            language === "es"
              ? "Al pagar confirmas que aceptaste la política de reservación publicada en Basevi Solutions."
              : "By paying, you confirm that you accepted the booking policy published by Basevi Solutions.",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Consultation checkout error:", error);
    return NextResponse.json({ error: "Unable to start secure checkout." }, { status: 500 });
  }
}
