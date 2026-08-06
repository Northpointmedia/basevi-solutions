import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactRequest = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  services?: string;
  language?: "es" | "en";
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const services = body.services?.trim() ?? "";
    const language = body.language === "en" ? "en" : "es";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeMessage = escapeHtml(message || "No message provided");
    const safeServices = escapeHtml(services || "No service selected");

    const clientSubject =
      language === "es"
        ? "Hemos recibido tu solicitud | Basevi Solutions"
        : "We've received your request | Basevi Solutions";

    const clientHtml =
      language === "es"
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #0f172a;">
            <div style="background:#001f1a; padding:32px; border-radius:16px 16px 0 0;">
              <h1 style="color:#ffffff; margin:0; font-size:28px;">
                ¡Hemos recibido tu solicitud!
              </h1>
            </div>

            <div style="padding:32px; border:1px solid #e2e8f0; border-top:none;">
              <p style="font-size:17px;">Hola ${safeName},</p>

              <p style="font-size:16px; line-height:1.7;">
                Gracias por contactar con <strong>Basevi Solutions</strong>.
                Hemos recibido correctamente tu solicitud.
              </p>

              <div style="background:#f8fafc; border-radius:12px; padding:20px; margin:24px 0;">
                <p style="margin:0 0 8px; font-size:14px; color:#047857;">
                  SERVICIO SOLICITADO
                </p>
                <p style="margin:0; font-size:17px; font-weight:bold;">
                  ${safeServices}
                </p>
              </div>

              <p style="font-size:16px; line-height:1.7;">
                Revisaremos tu información y nos pondremos en contacto contigo
                dentro de un día hábil.
              </p>

              <p style="font-size:16px; line-height:1.7;">
                <strong>No se requiere ningún pago en esta etapa.</strong>
              </p>

              <p style="margin-top:32px;">
                Atentamente,<br>
                <strong>Basevi Solutions, LLC</strong><br>
                Preparación documental y servicios fiscales
              </p>
            </div>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #0f172a;">
            <div style="background:#001f1a; padding:32px; border-radius:16px 16px 0 0;">
              <h1 style="color:#ffffff; margin:0; font-size:28px;">
                We've received your request!
              </h1>
            </div>

            <div style="padding:32px; border:1px solid #e2e8f0; border-top:none;">
              <p style="font-size:17px;">Hello ${safeName},</p>

              <p style="font-size:16px; line-height:1.7;">
                Thank you for contacting <strong>Basevi Solutions</strong>.
                We have successfully received your request.
              </p>

              <div style="background:#f8fafc; border-radius:12px; padding:20px; margin:24px 0;">
                <p style="margin:0 0 8px; font-size:14px; color:#047857;">
                  REQUESTED SERVICE
                </p>
                <p style="margin:0; font-size:17px; font-weight:bold;">
                  ${safeServices}
                </p>
              </div>

              <p style="font-size:16px; line-height:1.7;">
                We will review your information and contact you within one
                business day.
              </p>

              <p style="font-size:16px; line-height:1.7;">
                <strong>No payment is required at this stage.</strong>
              </p>

              <p style="margin-top:32px;">
                Sincerely,<br>
                <strong>Basevi Solutions, LLC</strong><br>
                Document preparation and tax services
              </p>
            </div>
          </div>
        `;

    const internalHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color:#0f172a;">
        <h1 style="color:#065f46;">Nueva solicitud recibida</h1>

        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e2e8f0;">
              Nombre
            </td>
            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">
              ${safeName}
            </td>
          </tr>

          <tr>
            <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e2e8f0;">
              Email
            </td>
            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">
              ${safeEmail}
            </td>
          </tr>

          <tr>
            <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e2e8f0;">
              Teléfono
            </td>
            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">
              ${safePhone}
            </td>
          </tr>

          <tr>
            <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e2e8f0;">
              Idioma
            </td>
            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">
              ${language === "es" ? "Español" : "English"}
            </td>
          </tr>

          <tr>
            <td style="padding:10px; font-weight:bold; border-bottom:1px solid #e2e8f0;">
              Servicio
            </td>
            <td style="padding:10px; border-bottom:1px solid #e2e8f0;">
              ${safeServices}
            </td>
          </tr>
        </table>

        <div style="margin-top:24px;">
          <p style="font-weight:bold;">Mensaje del cliente:</p>
          <p style="background:#f8fafc; padding:16px; border-radius:10px; line-height:1.6;">
            ${safeMessage}
          </p>
        </div>
      </div>
    `;

    const businessEmail =
      process.env.BUSINESS_NOTIFICATION_EMAIL || "info@basevisolutions.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Basevi Solutions <info@basevisolutions.com>";

    const [internalEmail, clientEmail] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [businessEmail],
        replyTo: email,
        subject: `Nueva solicitud: ${services || "Evaluación gratuita"} — ${name}`,
        html: internalHtml,
      }),

      resend.emails.send({
        from: fromEmail,
        to: [email],
        replyTo: businessEmail,
        subject: clientSubject,
        html: clientHtml,
      }),
    ]);

    if (internalEmail.error || clientEmail.error) {
      console.error("Resend error:", {
        internal: internalEmail.error,
        client: clientEmail.error,
      });

      return NextResponse.json(
        { error: "Unable to send one or more emails." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Unable to send the request." },
      { status: 500 },
    );
  }
}
