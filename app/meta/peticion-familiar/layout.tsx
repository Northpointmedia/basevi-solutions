import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Petición familiar I-130 | Basevi Solutions",
  description: "Información y contacto para servicios de preparación documental de peticiones familiares.",
  alternates: { canonical: "/meta/peticion-familiar" },
  robots: { index: false, follow: true },
};

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
