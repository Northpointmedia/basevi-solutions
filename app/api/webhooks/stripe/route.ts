import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

async function sendPurchaseEmails(session: Stripe.Checkout.Session) {
  const customerEmail =
    session.customer_details?.email || session.customer_email || "";
  const customerName = session.customer_details?.name || "Client";
  const language = session.metadata?.language === "en" ? "en" : "es";
  const businessEmail =
    process.env.BUSINESS_NOTIFICATION_EMAIL || "info@basevisolutions.com";

  if (!resend || !customerEmail) {
    console.info("Purchase completed; email skipped because Resend or email is unavailable.");
    return;
  }

  const expanded = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product"],
  });

  const item = expanded.line_items?.data[0];
  const product = item?.price?.product;
  const serviceName =
    typeof product === "object" && product && "name" in product
      ? String(product.name)
      : "Basevi Solutions service";
  const quantity = item?.quantity ?? 1;
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (session.currency || "usd").toUpperCase(),
  }).format((session.amount_total || 0) / 100);

  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(customerEmail);
  const safeService = escapeHtml(serviceName);

  await Promise.all([
    resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Basevi Solutions <info@basevisolutions.com>",
      to: customerEmail,
      subject:
        language === "es"
          ? "Pago recibido — Basevi Solutions"
          : "Payment received — Basevi Solutions",
      html:
        language === "es"
          ? `<h1>¡Gracias, ${safeName}!</h1>
             <p>Hemos recibido correctamente tu pago por <strong>${safeService}</strong>.</p>
             <p>Cantidad: ${quantity}<br>Total pagado: ${amount}</p>
             <p>Revisaremos la compra y nos pondremos en contacto contigo para solicitar la documentación necesaria y coordinar los próximos pasos.</p>
             <p><strong>Importante:</strong> este pago corresponde a honorarios de preparación documental. No incluye tarifas gubernamentales ni costos de terceros. Basevi Solutions no ofrece asesoría legal ni representación.</p>`
          : `<h1>Thank you, ${safeName}!</h1>
             <p>We successfully received your payment for <strong>${safeService}</strong>.</p>
             <p>Quantity: ${quantity}<br>Total paid: ${amount}</p>
             <p>We will review the purchase and contact you to request the necessary documents and coordinate the next steps.</p>
             <p><strong>Important:</strong> this payment covers document preparation fees. It does not include government filing fees or third-party costs. Basevi Solutions does not provide legal advice or representation.</p>`,
    }),
    resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Basevi Solutions <info@basevisolutions.com>",
      to: businessEmail,
      subject: `New paid order: ${serviceName}`,
      html: `<h1>New Basevi Solutions payment</h1>
             <p><strong>Client:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Service:</strong> ${safeService}</p>
             <p><strong>Quantity:</strong> ${quantity}</p>
             <p><strong>Total:</strong> ${amount}</p>
             <p><strong>Stripe session:</strong> ${escapeHtml(session.id)}</p>`,
    }),
  ]);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Invalid Stripe webhook signature:", error);
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status === "paid") {
        await sendPurchaseEmails(session);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
