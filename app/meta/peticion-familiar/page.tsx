import type { Metadata } from "next";
import ServicePage from "@/app/servicios/[slug]/ServicePage";
import { findSeoService } from "@/lib/seo-services";
export const metadata: Metadata = { title: "Petición familiar: preparación documental", description: "Conoce nuestro servicio de preparación de peticiones familiares y habla directamente por WhatsApp.", robots: { index: false, follow: true } };
export default function MetaPeticionPage() { return <ServicePage service={findSeoService("peticion-familiar-i-130-miami")!} campaign="meta_peticion_familiar" />; }
