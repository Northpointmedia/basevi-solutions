import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id")?.trim();

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const isWebsiteSession = session.metadata?.source === "basevisolutions_website";
    const paid =
      session.mode === "payment" &&
      session.status === "complete" &&
      session.payment_status === "paid" &&
      isWebsiteSession;

    return NextResponse.json(
      {
        paid,
        purchaseType:
          paid && session.metadata?.purchase_type === "consultation"
            ? "consultation"
            : "service",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Stripe session verification error:", error);
    return NextResponse.json({ paid: false }, { status: 404 });
  }
}
