import type { Metadata } from "next";
import ServicePage from "@/app/servicios/[slug]/ServicePage";
import { findSeoService } from "@/lib/seo-services";
export const metadata: Metadata = { title: "Petición familiar: preparación documental", description: "Conoce nuestro servicio de preparación de peticiones familiares y habla directamente por WhatsApp.", alternates: { canonical: "/meta/peticion-familiar", languages: { "es-US": "/meta/peticion-familiar", "en-US": "/en/meta/family-petition" } }, robots: { index: false, follow: true } };
export default function MetaPeticionPage() { const service = findSeoService("peticion-familiar-i-130")!; return <ServicePage service={service} language="es" campaign="meta_peticion_familiar_es" alternateHref="/en/meta/family-petition" />; }
