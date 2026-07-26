import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();
    const services = String(body.services || "No especificado").trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Basevi Solutions <info@basevisolutions.com>",
      to: ["mbasevim@gmail.com"],
      replyTo: email,
      subject: `Nueva solicitud de ${name}`,
      html: `
        <h2>Nueva solicitud desde BaseviSolutions.com</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Servicios:</strong> ${services}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    await resend.emails.send({
      from: "Basevi Solutions <info@basevisolutions.com>",
      to: [email],
      subject: "Hemos recibido tu solicitud",
      html: `
        <h2>Gracias por contactar con Basevi Solutions</h2>
        <p>Hola ${name},</p>
        <p>Hemos recibido correctamente tu solicitud.</p>
        <p>Revisaremos la información y nos pondremos en contacto contigo dentro de un día hábil para explicarte los siguientes pasos.</p>
        <p>No se requiere ningún pago en esta etapa.</p>
        <p>Atentamente,<br><strong>Basevi Solutions LLC</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Unable to send the request" },
      { status: 500 },
    );
  }
}