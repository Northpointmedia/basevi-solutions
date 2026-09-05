"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Heart, MessageCircle, ShieldCheck, Star } from "lucide-react";

const WHATSAPP = "https://wa.me/13054823406?text=Hola%20Basevi%20Solutions%2C%20vi%20su%20anuncio%20sobre%20petici%C3%B3n%20familiar%20y%20quisiera%20informaci%C3%B3n.";

type WindowWithDataLayer = Window & { dataLayer?: Record<string, unknown>[] };

function track(event: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithDataLayer;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, campaign: "meta_peticion_familiar_es", ...extra });
}

export default function MetaPeticionFamiliarPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    track("meta_landing_view");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          services: "Petición familiar (Formulario I-130) — Lead Meta",
          language: "es",
          message: [
            `Familiar: ${data.get("relative")}`,
            `Ubicación del familiar: ${data.get("location")}`,
            `Estatus del peticionario: ${data.get("petitionerStatus")}`,
            `Comentario: ${data.get("message") || "Sin comentario"}`,
            `UTM source: ${params.get("utm_source") || "meta"}`,
            `UTM campaign: ${params.get("utm_campaign") || "peticion_familiar"}`,
            `UTM content: ${params.get("utm_content") || "no indicado"}`,
          ].join("\n"),
        }),
      });
      if (!response.ok) throw new Error("send_failed");
      track("lead_form_submit", { service: "i130", lead_source: "meta" });
      setSubmitted(true);
      form.reset();
    } catch {
      setError("No pudimos enviar tus datos. Inténtalo de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" aria-label="Basevi Solutions"><Image src="/basevi-logo.webp" alt="Basevi Solutions" width={155} height={54} priority /></Link>
          <a href={WHATSAPP} onClick={() => track("whatsapp_click", { placement: "header" })} className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-300">Petición familiar · Formulario I-130</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Tu familia es demasiado importante para seguir esperando.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">Si eres ciudadano estadounidense o residente permanente, cuéntanos tu situación y conoce cómo Basevi Solutions puede ayudarte con la preparación y organización documental de una petición familiar.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-100">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Atención en español</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Proceso claro y personalizado</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Servicio virtual en EE. UU.</span>
            </div>
          </div>

          <div id="lead-form" className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl sm:p-8">
            {!submitted ? <>
              <p className="text-sm font-bold uppercase tracking-[.15em] text-emerald-700">Primer paso gratuito</p>
              <h2 className="mt-2 text-3xl font-bold">Cuéntanos brevemente tu caso</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Déjanos tus datos. Revisaremos la información inicial y te contactaremos para indicarte el próximo paso.</p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <input required name="name" placeholder="Nombre y apellido" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required type="tel" name="phone" placeholder="Teléfono" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600" />
                  <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600" />
                </div>
                <select required name="petitionerStatus" defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600">
                  <option value="" disabled>¿Eres ciudadano o residente permanente?</option>
                  <option>Ciudadano/a estadounidense</option><option>Residente permanente</option><option>No estoy seguro/a</option>
                </select>
                <select required name="relative" defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600">
                  <option value="" disabled>¿A qué familiar deseas pedir?</option>
                  <option>Esposo/a</option><option>Hijo/a</option><option>Padre o madre</option><option>Hermano/a</option><option>Otro / No estoy seguro/a</option>
                </select>
                <select required name="location" defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600">
                  <option value="" disabled>¿Dónde se encuentra tu familiar?</option><option>Dentro de Estados Unidos</option><option>Fuera de Estados Unidos</option><option>No estoy seguro/a</option>
                </select>
                <textarea name="message" rows={3} placeholder="¿Hay algo importante que quieras contarnos? (opcional)" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600" />
                <button disabled={submitting} className="w-full rounded-xl bg-emerald-700 px-5 py-4 text-lg font-bold text-white transition hover:bg-emerald-600 disabled:bg-slate-400">{submitting ? "Enviando…" : "QUIERO SABER MI PRÓXIMO PASO"}</button>
                <p className="text-center text-xs leading-5 text-slate-500">Enviar este formulario es gratuito y no te obliga a contratar ningún servicio.</p>
                {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
              </form>
            </> : <div className="py-5 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-700" />
              <h2 className="mt-4 text-3xl font-bold">¡Recibimos tu solicitud!</h2>
              <p className="mt-3 leading-7 text-slate-600">Ya tenemos tus datos. Si quieres acelerar el contacto, puedes escribirnos ahora mismo por WhatsApp.</p>
              <a href={WHATSAPP} onClick={() => track("whatsapp_click", { placement: "lead_success" })} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white"><MessageCircle className="h-5 w-5" /> Escribir por WhatsApp</a>
            </div>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[[Heart,"Atención humana","Te acompañamos con comunicación clara y cercana durante la preparación documental."],[ShieldCheck,"Información organizada","Revisamos contigo la información y los documentos necesarios para preparar el trámite."],[Star,"Experiencia de clientes","Basevi Solutions cuenta con clientes que destacan la atención, responsabilidad y profesionalismo del servicio."]].map(([Icon,title,text]) => { const I = Icon as typeof Heart; return <div key={String(title)} className="rounded-2xl border border-slate-200 p-6"><I className="h-7 w-7 text-emerald-700"/><h3 className="mt-4 text-xl font-bold">{String(title)}</h3><p className="mt-2 leading-7 text-slate-600">{String(text)}</p></div>; })}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">No necesitas saber qué formulario corresponde antes de contactarnos.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">Cuéntanos tu objetivo. Primero identificaremos si la asistencia documental de Basevi Solutions puede ayudarte y te explicaremos el alcance del servicio.</p><a href="#lead-form" onClick={() => track("lead_cta_click", { placement: "bottom" })} className="mt-7 inline-block rounded-full bg-blue-950 px-7 py-3 font-bold text-white">Comenzar ahora</a></div>
      </section>

      <footer className="bg-white px-5 py-8 text-center text-xs leading-6 text-slate-500">Basevi Solutions LLC ofrece servicios de preparación documental y asistencia administrativa. No es un bufete de abogados, no brinda asesoría legal ni representación jurídica. La presentación del Formulario I-130 no otorga por sí sola un estatus migratorio ni garantiza la aprobación de ningún beneficio.</footer>
    </main>
  );
}
