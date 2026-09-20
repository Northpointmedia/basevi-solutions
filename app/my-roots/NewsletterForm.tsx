"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm({ language = "es" }: { language?: "es" | "en" }) {
  const isSpanish = language === "es";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          firstName: formData.get("firstName"),
          website: formData.get("website"),
          language,
        }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || (isSpanish ? "No pudimos completar la suscripción." : "We couldn't complete your subscription."));
      }

      setStatus("success");
      setMessage(payload.message || (isSpanish ? "¡Ya formas parte de My Roots!" : "You're now part of My Roots!"));
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : isSpanish
            ? "No pudimos completar la suscripción. Inténtalo de nuevo."
            : "We couldn't complete your subscription. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 grid gap-3 sm:grid-cols-[0.75fr_1.25fr_auto]">
      <label className="sr-only" htmlFor="newsletter-first-name">
        {isSpanish ? "Nombre" : "Name"}
      </label>
      <input
        id="newsletter-first-name"
        name="firstName"
        type="text"
        autoComplete="given-name"
        placeholder={isSpanish ? "Tu nombre" : "Your name"}
        className="rounded-xl border border-white/25 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/60 focus:border-[#e3b399]"
      />
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="nombre@email.com"
        className="rounded-xl border border-white/25 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/60 focus:border-[#e3b399]"
      />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-[#f6f1e7] px-5 py-3.5 font-bold text-[#173f33] transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
      >
        {status === "loading"
          ? isSpanish ? "Suscribiendo…" : "Subscribing…"
          : isSpanish ? "Quiero recibirlo" : "Subscribe"}
      </button>
      {message && (
        <p
          className={`text-sm sm:col-span-3 ${status === "error" ? "text-[#ffd2c2]" : "text-[#d6eadb]"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
