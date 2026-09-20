import { NextResponse } from "next/server";
import { Resend } from "resend";

type NewsletterRequest = {
  email?: string;
  firstName?: string;
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsletterRequest;
    const email = body.email?.trim().toLowerCase() ?? "";
    const firstName = body.firstName?.trim().slice(0, 80) ?? "";

    // Honeypot: bots usually complete this hidden field.
    if (body.website) {
      return NextResponse.json({ message: "Suscripción recibida." });
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Introduce un email válido." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured for the newsletter endpoint.");
      return NextResponse.json(
        { error: "El newsletter no está disponible temporalmente. Inténtalo más tarde." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
    const contactResult = await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
      segments: segmentId ? [{ id: segmentId }] : undefined,
    });

    const isExistingContact = contactResult.error?.statusCode === 409;

    if (isExistingContact) {
      const updateResult = await resend.contacts.update({
        email,
        firstName: firstName || undefined,
        unsubscribed: false,
      });

      if (!updateResult.error && segmentId) {
        const segmentResult = await resend.contacts.segments.add({
          email,
          segmentId,
        });
        if (segmentResult.error && segmentResult.error.statusCode !== 409) {
          console.error("Unable to add existing contact to newsletter segment", segmentResult.error);
        }
      }

      if (updateResult.error) {
        console.error("Unable to update newsletter contact", updateResult.error);
        return NextResponse.json(
          { error: "No pudimos actualizar tu suscripción. Inténtalo de nuevo." },
          { status: 502 },
        );
      }

      return NextResponse.json({ message: "Tu email ya estaba registrado. Hemos confirmado tu suscripción." });
    }

    if (contactResult.error) {
      console.error("Unable to create newsletter contact", contactResult.error);
      return NextResponse.json(
        { error: "No pudimos completar tu suscripción. Inténtalo de nuevo." },
        { status: 502 },
      );
    }

    const safeName = escapeHtml(firstName);
    const greeting = safeName ? `Hola ${safeName},` : "Hola,";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Basevi Solutions <info@basevisolutions.com>";

    const confirmation = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Ya formas parte de My Roots",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#1f2a25">
          <div style="background:#173f33;padding:34px;border-radius:18px 18px 0 0;color:#fff">
            <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:2px;font-size:12px;color:#e3b399">BaseviSolutions presenta</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:34px">My Roots</h1>
          </div>
          <div style="padding:34px;border:1px solid #dcd8cb;border-top:0;background:#fffdf8">
            <p style="font-size:17px">${greeting}</p>
            <p style="font-size:16px;line-height:1.7">Tu suscripción está confirmada. Recibirás historias y explicaciones prácticas para entender mejor los trámites migratorios en Estados Unidos.</p>
            <a href="https://www.basevisolutions.com/my-roots" style="display:inline-block;margin-top:16px;background:#b85f3d;color:#fff;text-decoration:none;padding:13px 20px;border-radius:999px;font-weight:bold">Leer My Roots</a>
            <p style="margin-top:28px;font-size:12px;line-height:1.6;color:#66716b">Recibes este mensaje porque te suscribiste en My Roots. Los contenidos son informativos y no constituyen asesoría legal.</p>
          </div>
        </div>
      `,
    });

    if (confirmation.error) {
      console.error("Newsletter contact created, but confirmation email failed", confirmation.error);
    }

    return NextResponse.json({ message: "¡Bienvenida a My Roots! Revisa tu email para confirmar que todo llegó correctamente." });
  } catch (error) {
    console.error("Newsletter endpoint failed", error);
    return NextResponse.json(
      { error: "No pudimos completar tu suscripción. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
