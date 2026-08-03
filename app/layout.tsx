import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.basevisolutions.com"),
  title: {
    default: "Basevi Solutions | Trámites, impuestos y traducciones en Miami",
    template: "%s | Basevi Solutions",
  },
  description:
    "Preparación de documentos migratorios, impuestos, ITIN y traducciones en Miami. Atención personalizada en español e inglés.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    siteName: "Basevi Solutions",
    images: [{ url: "/basevi-logo.webp", alt: "Basevi Solutions" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Basevi Solutions LLC",
              url: "https://www.basevisolutions.com",
              telephone: "+1-305-482-3406",
              areaServed: { "@type": "City", name: "Miami" },
              address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" },
              availableLanguage: ["Spanish", "English"],
              priceRange: "$$",
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>

      <GoogleTagManager gtmId="GTM-MZ5SG59V" />
    </html>
  );
}
