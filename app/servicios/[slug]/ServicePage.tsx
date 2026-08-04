"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Language, SeoService } from "@/lib/seo-services";

const copy = {
  es: { price: "PRECIO DEL SERVICIO", fees: "Las tarifas gubernamentales y costos de terceros no están incluidos.", whatsapp: "Hablar por WhatsApp", book: "Agendar evaluación", consult: "Consultar mi caso", includes: "Qué incluye el servicio", faq: "Preguntas frecuentes", next: "Da el próximo paso con claridad", nextText: "Cuéntanos qué necesitas y te explicaremos el alcance del servicio antes de comenzar.", write: "Escribir por WhatsApp", disclaimer: "Basevi Solutions LLC ofrece servicios de preparación documental. No es un bufete de abogados, no brinda asesoría legal ni representa ante USCIS o tribunales.", message: "Hola María, vi la página de", switchLabel: "EN", switchAria: "View this page in English" },
  en: { price: "SERVICE PRICE", fees: "Government filing fees and third-party costs are not included.", whatsapp: "Chat on WhatsApp", book: "Book an evaluation", consult: "Ask about my case", includes: "What the service includes", faq: "Frequently asked questions", next: "Take the next step with clarity", nextText: "Tell us what you need, and we will explain the scope of the service before you begin.", write: "Message us on WhatsApp", disclaimer: "Basevi Solutions LLC provides document-preparation services. It is not a law firm, does not provide legal advice, and does not represent clients before USCIS or the courts.", message: "Hello Maria, I saw the page for", switchLabel: "ES", switchAria: "Ver esta página en español" },
};

export default function ServicePage({ service, language = "es", campaign = "seo", alternateHref }: { service: SeoService; language?: Language; campaign?: string; alternateHref: string }) {
  const router = useRouter();
  const t = copy[language];
  const text = encodeURIComponent(`${t.message} ${service.title} ${language === "es" ? "y quisiera más información." : "and would like more information."}`);
  const whatsapp = `https://wa.me/13054823406?text=${text}`;
  const track = (name: string) => { const w = window as typeof window & { dataLayer?: Record<string, unknown>[] }; w.dataLayer?.push({ event: name, service: service.slug, campaign, language }); };

  useEffect(() => {
    const saved = window.localStorage.getItem("basevi-language");
    const detected: Language = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
    const preferred = saved === "es" || saved === "en" ? saved : detected;
    document.documentElement.lang = language;
    if (!saved) window.localStorage.setItem("basevi-language", preferred);
    if (preferred !== language) router.replace(alternateHref);
  }, [alternateHref, language, router]);

  const chooseLanguage = () => window.localStorage.setItem("basevi-language", language === "es" ? "en" : "es");

  return <main className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4"><Link href="/"><Image src="/basevi-logo.webp" alt="Basevi Solutions" width={160} height={55} /></Link><div className="flex items-center gap-3"><Link href={alternateHref} onClick={chooseLanguage} aria-label={t.switchAria} className="rounded-full border border-slate-300 px-3 py-2 text-sm font-bold text-blue-900">{t.switchLabel}</Link><a href="tel:+13054823406" onClick={() => track("phone_click")} className="font-semibold text-blue-900">(305) 482-3406</a></div></div></header>
    <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-sky-800 text-white"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_.8fr] md:py-24"><div><p className="mb-4 text-sm font-bold tracking-[.18em] text-amber-300">{service.eyebrow}</p><h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{service.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">{service.intro}</p><div className="mt-8 flex flex-wrap gap-4"><a href={whatsapp} onClick={() => track("whatsapp_click")} className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg">{t.whatsapp}</a><a href="https://calendly.com/mbasevim/30min" onClick={() => track("book_consultation_click")} className="rounded-full border border-white/50 px-6 py-3 font-bold">{t.book}</a></div></div><aside className="rounded-3xl bg-white p-7 text-slate-900 shadow-2xl"><p className="text-sm font-bold text-blue-700">{t.price}</p><p className="mt-2 text-3xl font-bold">{service.price}</p><p className="mt-4 text-sm leading-6 text-slate-600">{t.fees}</p><a href={whatsapp} onClick={() => track("whatsapp_click")} className="mt-6 block rounded-xl bg-blue-900 px-5 py-3 text-center font-bold text-white">{t.consult}</a></aside></div></section>
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2"><div><h2 className="text-3xl font-bold text-blue-950">{t.includes}</h2><ul className="mt-6 space-y-4">{service.includes.map((item) => <li key={item} className="flex gap-3"><span className="font-bold text-emerald-600">✓</span><span>{item}</span></li>)}</ul></div><div><h2 className="text-3xl font-bold text-blue-950">{t.faq}</h2><div className="mt-6 space-y-4">{service.faqs.map((faq) => <details key={faq.q} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-bold">{faq.q}</summary><p className="mt-3 leading-7 text-slate-600">{faq.a}</p></details>)}</div></div></section>
    <section className="bg-blue-950 px-5 py-14 text-center text-white"><h2 className="text-3xl font-bold">{t.next}</h2><p className="mx-auto mt-3 max-w-2xl text-blue-100">{t.nextText}</p><a href={whatsapp} onClick={() => track("whatsapp_click")} className="mt-7 inline-block rounded-full bg-emerald-500 px-7 py-3 font-bold">{t.write}</a></section>
    <footer className="bg-white px-5 py-8 text-center text-sm leading-6 text-slate-500">{t.disclaimer}</footer>
  </main>;
}
