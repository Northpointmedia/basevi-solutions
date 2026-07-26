"use client";

import Image from "next/image";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CreditCard,
  FileText,
  Flag,
  Languages,
  Landmark,
  Users,
} from "lucide-react";
import {
  FormEvent,
  type ElementType,
  useMemo,
  useState,
} from "react";

type Language = "es" | "en";

type Service = {
  id: number;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  priceLabelEs: string;
  priceLabelEn: string;
  icon: ElementType;
};

const services: Service[] = [
  {
    id: 1,
    nameEs: "Paquete I-130 + I-485",
    nameEn: "I-130 + I-485 Package",
    descriptionEs:
      "Preparación documental para petición familiar y ajuste de estatus.",
    descriptionEn:
      "Document preparation for a family petition and adjustment of status.",
    priceLabelEs: "Desde $600",
    priceLabelEn: "Starting at $600",
    icon: Users,
  },
  {
    id: 2,
    nameEs: "Paquete I-130 + I-485 + I-765",
    nameEn: "I-130 + I-485 + I-765 Package",
    descriptionEs:
      "Paquete documental para petición familiar, ajuste de estatus y permiso de trabajo.",
    descriptionEn:
      "Document package for a family petition, adjustment of status, and work permit.",
    priceLabelEs: "Desde $800",
    priceLabelEn: "Starting at $800",
    icon: Landmark,
  },
  {
    id: 3,
    nameEs: "Renovación de Green Card I-90",
    nameEn: "Green Card Renewal I-90",
    descriptionEs:
      "Preparación documental para renovar o reemplazar una tarjeta de residencia.",
    descriptionEn:
      "Document preparation to renew or replace a permanent resident card.",
    priceLabelEs: "Desde $125",
    priceLabelEn: "Starting at $125",
    icon: CreditCard,
  },
  {
    id: 4,
    nameEs: "Permiso de trabajo I-765",
    nameEn: "Work Permit I-765",
    descriptionEs:
      "Preparación de solicitud inicial o renovación del permiso de trabajo.",
    descriptionEn:
      "Preparation of an initial or renewal employment authorization application.",
    priceLabelEs: "Desde $100",
    priceLabelEn: "Starting at $100",
    icon: BriefcaseBusiness,
  },
  {
    id: 5,
    nameEs: "Ciudadanía N-400",
    nameEn: "Citizenship N-400",
    descriptionEs:
      "Preparación documental para el proceso de naturalización.",
    descriptionEn:
      "Document preparation for the naturalization process.",
    priceLabelEs: "Desde $200",
    priceLabelEn: "Starting at $200",
    icon: Flag,
  },
  {
    id: 6,
    nameEs: "Evaluación financiera I-864",
    nameEn: "Financial Evaluation I-864",
    descriptionEs:
      "Revisión documental para el affidavit of support y evidencia financiera.",
    descriptionEn:
      "Document review for the affidavit of support and financial evidence.",
    priceLabelEs: "Desde $150",
    priceLabelEn: "Starting at $150",
    icon: BadgeDollarSign,
  },
  {
    id: 7,
    nameEs: "Traducción certificada",
    nameEn: "Certified Translation",
    descriptionEs:
      "Traducciones certificadas de documentos personales y migratorios.",
    descriptionEn:
      "Certified translations of personal and immigration documents.",
    priceLabelEs: "Desde $30 por página",
    priceLabelEn: "Starting at $30 per page",
    icon: Languages,
  },
  {
    id: 8,
    nameEs: "Preparación de impuestos personales",
    nameEn: "Personal Tax Preparation",
    descriptionEs:
      "Preparación de impuestos personales según la complejidad del caso.",
    descriptionEn:
      "Personal tax preparation based on the complexity of the return.",
    priceLabelEs: "Desde $150",
    priceLabelEn: "Starting at $150",
    icon: FileText,
  },
  {
    id: 9,
    nameEs: "Solicitud de ITIN W-7",
    nameEn: "ITIN Application W-7",
    descriptionEs:
      "Preparación documental para solicitar un número ITIN.",
    descriptionEn:
      "Document preparation to apply for an ITIN.",
    priceLabelEs: "Desde $150",
    priceLabelEn: "Starting at $150",
    icon: ChartNoAxesCombined,
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isSpanish = language === "es";

  const navigation = isSpanish
    ? [
        ["Inicio", "#inicio"],
        ["Servicios", "#servicios"],
        ["Proceso", "#proceso"],
        ["Nosotros", "#nosotros"],
        ["Contacto", "#contacto"],
      ]
    : [
        ["Home", "#inicio"],
        ["Services", "#servicios"],
        ["Process", "#proceso"],
        ["About", "#nosotros"],
        ["Contact", "#contacto"],
      ];

  const selectedNames = useMemo(
    () =>
      selectedServices
        .map((service) => (isSpanish ? service.nameEs : service.nameEn))
        .join(", "),
    [selectedServices, isSpanish],
  );

  const addService = (service: Service) => {
    setSelectedServices((current) => {
      if (current.some((item) => item.id === service.id)) return current;
      return [...current, service];
    });
    setDrawerOpen(true);
  };

  const removeService = (serviceId: number) => {
    setSelectedServices((current) =>
      current.filter((service) => service.id !== serviceId),
    );
  };

  const goToEvaluation = () => {
    setDrawerOpen(false);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        language: isSpanish ? "es" : "en",
        services:
          selectedServices.length > 0
            ? selectedServices
                .map((service) =>
                  isSpanish ? service.nameEs : service.nameEn,
                )
                .join(", ")
            : isSpanish
              ? "Ningún servicio seleccionado"
              : "No service selected",
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to send request");
    }

    setSubmitted(true);
    form.reset();
  } catch (error) {
    console.error(error);

    alert(
      isSpanish
        ? "No pudimos enviar tu solicitud. Inténtalo nuevamente."
        : "We could not send your request. Please try again.",
    );
  }
};

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center">
            <Image
              src="/basevi-logo.webp"
              alt="Basevi Solutions LLC"
              width={270}
              height={110}
              priority
              className="h-14 w-auto object-contain sm:h-16"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-slate-700 transition hover:text-emerald-800"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(isSpanish ? "en" : "es")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-emerald-800 hover:text-emerald-800"
            >
              {isSpanish ? "EN" : "ES"}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              📋 {isSpanish ? "Servicios de interés" : "Selected services"}
              {selectedServices.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                  {selectedServices.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-slate-300 px-3 py-2 lg:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navigation.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium text-slate-700"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.28),transparent_40%)]" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              {isSpanish
                ? "Evaluación inicial gratuita"
                : "Free initial evaluation"}
            </span>

            <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              {isSpanish
                ? "Soluciones migratorias claras y confiables para ti y tu familia."
                : "Clear and reliable immigration solutions for you and your family."}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {isSpanish
                ? "Primero evaluamos tu necesidad sin costo. Después confirmamos el servicio adecuado, el alcance y el precio final antes de solicitar cualquier pago."
                : "We first evaluate your needs at no cost. We then confirm the appropriate service, scope, and final price before requesting any payment."}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#servicios"
                className="rounded-full bg-emerald-600 px-7 py-4 text-center font-semibold text-white transition hover:bg-emerald-500"
              >
                {isSpanish ? "Explorar servicios" : "Explore services"}
              </a>
              <a
                href="#contacto"
                className="rounded-full border border-white/30 px-7 py-4 text-center font-semibold transition hover:border-white hover:bg-white hover:text-slate-950"
              >
                {isSpanish ? "Solicitar evaluación gratuita" : "Request free evaluation"}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-2xl">
              <Image
                src="/maria-basevi.webp"
                alt="María Basevi, fundadora de Basevi Solutions LLC"
                width={1200}
                height={1400}
                priority
                className="h-[620px] w-full object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-emerald-300/30 bg-slate-950/95 px-5 py-4 shadow-2xl backdrop-blur sm:left-8 sm:right-8 sm:px-6 sm:py-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300 sm:text-sm">
                María Basevi
              </p>
              <p className="mt-2 text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7">
                {isSpanish
                  ? "Fundadora • Especialista en preparación de documentos migratorios y servicios fiscales"
                  : "Founder • Specialist in immigration document preparation and tax services"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {isSpanish
                  ? "Atención virtual y presencial desde Miami, Florida."
                  : "Virtual and in-person assistance from Miami, Florida."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-800">
              {isSpanish ? "Nuestros servicios" : "Our services"}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {isSpanish
                ? "Selecciona los servicios que deseas evaluar."
                : "Select the services you would like us to evaluate."}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {isSpanish
                ? "Los precios mostrados son orientativos. El precio final se confirma después de revisar el alcance, la documentación y la complejidad del servicio. Las tarifas gubernamentales no están incluidas."
                : "Displayed prices are estimates. Final pricing is confirmed after reviewing scope, documents, and service complexity. Government filing fees are not included."}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const selected = selectedServices.some((item) => item.id === service.id);

              return (
                <article
                  key={service.id}
                  className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {(() => {
                    const ServiceIcon = service.icon;

                    return (
                      <div className="mb-6 flex justify-center">
  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
    <ServiceIcon
      className="h-8 w-8"
      strokeWidth={2}
      aria-hidden="true"
    />
  </div>
</div>
                    );
                  })()}
                  <h3 className="mt-6 text-2xl font-bold">
                    {isSpanish ? service.nameEs : service.nameEn}
                  </h3>
                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {isSpanish ? service.descriptionEs : service.descriptionEn}
                  </p>

                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <p className="text-xl font-bold">
                      {isSpanish ? service.priceLabelEs : service.priceLabelEn}
                    </p>
                    <button
                      type="button"
                      onClick={() => addService(service)}
                      disabled={selected}
                      className="mt-5 w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition enabled:hover:bg-emerald-600 disabled:cursor-default disabled:bg-slate-300"
                    >
                      {selected
                        ? isSpanish
                          ? "Seleccionado"
                          : "Selected"
                        : isSpanish
                          ? "Solicitar evaluación"
                          : "Request evaluation"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="proceso" className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-800">
              {isSpanish ? "Nuestro proceso" : "Our process"}
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              {isSpanish
                ? "Claro desde el primer contacto."
                : "Clear from the first contact."}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⌕",
                esTitle: "Evaluación gratuita",
                enTitle: "Free evaluation",
                esText: "Revisamos tu necesidad inicial sin compromiso.",
                enText: "We review your initial needs with no obligation.",
              },
              {
                icon: "▣",
                esTitle: "Asesoría personalizada",
                enTitle: "Personalized consultation",
                esText: "Coordinamos una reunión y definimos el camino adecuado.",
                enText: "We schedule a meeting and define the appropriate path.",
              },
              {
                icon: "▤",
                esTitle: "Preparación documental",
                enTitle: "Document preparation",
                esText: "Organizamos y revisamos cuidadosamente cada documento.",
                enText: "We carefully organize and review each document.",
              },
              {
                icon: "✓",
                esTitle: "Seguimiento del proceso",
                enTitle: "Process follow-up",
                esText: "Te acompañamos durante la preparación y entrega del servicio.",
                enText: "We support you throughout preparation and service delivery.",
              },
            ].map((step) => (
              <div
                key={step.esTitle}
                className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl font-bold text-emerald-700">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold">
                  {isSpanish ? step.esTitle : step.enTitle}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  {isSpanish ? step.esText : step.enText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="bg-emerald-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-300">
              Basevi Solutions
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100/70">
              {isSpanish
                ? "Inmigración • Impuestos • Traducciones"
                : "Immigration • Tax • Translations"}
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              {isSpanish
                ? "Preparación documental con transparencia y atención al detalle."
                : "Document preparation with transparency and attention to detail."}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-emerald-50/80">
              {isSpanish
                ? "La evaluación inicial es gratuita y no establece una relación profesional entre el cliente y Basevi Solutions. Después de revisar la información, confirmaremos si podemos ayudarte, el alcance del servicio y el presupuesto correspondiente."
                : "The initial evaluation is free and does not establish a professional relationship between the client and Basevi Solutions. After reviewing the information, we will confirm whether we can assist, the scope of service, and the applicable quote."}
            </p>
            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-white/5 p-6 text-sm leading-7 text-emerald-50/80">
              <strong className="text-white">
                {isSpanish ? "Aviso importante: " : "Important notice: "}
              </strong>
              {isSpanish
                ? "Basevi Solutions no es un bufete de abogados y no presta asesoramiento legal ni representación jurídica. Nuestros servicios consisten exclusivamente en preparación documental, asistencia administrativa y gestión de trámites basada en la información proporcionada por el cliente."
                : "Basevi Solutions is not a law firm and does not provide legal advice or legal representation. Our services are limited exclusively to document preparation, administrative assistance, and process support based on information provided by the client."}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-14">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {isSpanish ? "Evaluación gratuita" : "Free evaluation"}
                </p>
                <h2 className="mt-5 text-4xl font-bold">
                  {isSpanish
                    ? "Cuéntanos qué necesitas."
                    : "Tell us what you need."}
                </h2>
                <p className="mt-5 leading-7 text-slate-300">
                  {isSpanish
                    ? "Revisaremos tu solicitud antes de confirmar cualquier servicio o solicitar un pago."
                    : "We will review your request before confirming any service or requesting payment."}
                </p>

                {selectedServices.length > 0 && (
                  <div className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-emerald-300">
                      {isSpanish ? "Servicios seleccionados" : "Selected services"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {selectedNames}
                    </p>
                  </div>
                )}
              </div>

              {submitted ? (
                <div className="flex min-h-[360px] items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-8">
                  <div>
                    <p className="text-3xl">✓</p>
                    <h3 className="mt-4 text-2xl font-bold">
                      {isSpanish
                        ? "¡Hemos recibido tu solicitud!"
                        : "We've received your request!"}
                    </h3>
                    <p className="mt-4 leading-7 text-slate-300">
                      {isSpanish
                        ? "Gracias por contactar con Basevi Solutions. Revisaremos tu información y nos pondremos en contacto contigo dentro de un día hábil. No se requiere ningún pago en esta etapa."
                        : "Thank you for contacting Basevi Solutions. We will review your information and contact you within one business day. No payment is required at this stage."}
                    </p>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder={isSpanish ? "Nombre completo" : "Full name"}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder={isSpanish ? "Correo electrónico" : "Email address"}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder={isSpanish ? "Teléfono" : "Phone number"}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder={
                      isSpanish
                        ? "Describe brevemente tu situación y el servicio que buscas"
                        : "Briefly describe your situation and the service you need"
                    }
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-semibold transition hover:bg-emerald-500"
                  >
                    {isSpanish
                      ? "Enviar evaluación gratuita"
                      : "Submit free evaluation"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Basevi Solutions. All rights reserved.</p>
          <p>
            {isSpanish
              ? "Servicio de preparación documental. No somos un bufete de abogados."
              : "Document preparation service. We are not a law firm."}
          </p>
        </div>
      </footer>

      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-2xl font-bold">
                  {isSpanish ? "Servicios de interés" : "Selected services"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedServices.length}{" "}
                  {isSpanish ? "seleccionado(s)" : "selected"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full border border-slate-300 px-4 py-2"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto py-6">
              {selectedServices.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="text-lg font-semibold">
                    {isSpanish
                      ? "Aún no has seleccionado servicios."
                      : "You have not selected any services yet."}
                  </p>
                </div>
              ) : (
                selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <p className="font-bold">
                      {isSpanish ? service.nameEs : service.nameEn}
                    </p>
                    <p className="mt-2 font-semibold text-emerald-800">
                      {isSpanish ? service.priceLabelEs : service.priceLabelEn}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      className="mt-4 text-sm font-semibold text-red-600"
                    >
                      {isSpanish ? "Eliminar" : "Remove"}
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-xs leading-5 text-slate-500">
                {isSpanish
                  ? "No se solicitará ningún pago hasta finalizar la evaluación gratuita y confirmar por escrito el servicio, alcance y precio."
                  : "No payment will be requested until the free evaluation is completed and the service, scope, and price are confirmed in writing."}
              </p>
              <button
                type="button"
                onClick={goToEvaluation}
                className="mt-5 w-full rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-emerald-800"
              >
                {isSpanish
                  ? "Continuar a evaluación gratuita"
                  : "Continue to free evaluation"}
              </button>
            </div>
          </aside>
        </div>
      )}

      <a
        href={
  isSpanish
    ? "https://wa.me/17868300438?text=Hola%20Mar%C3%ADa%2C%20he%20visitado%20la%20web%20de%20Basevi%20Solutions%20y%20me%20gustar%C3%ADa%20solicitar%20una%20evaluaci%C3%B3n%20gratuita."
    : "https://wa.me/17868300438?text=Hello%20Maria%2C%20I%20visited%20the%20Basevi%20Solutions%20website%20and%20would%20like%20to%20request%20a%20free%20evaluation."
}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white shadow-xl transition hover:scale-105 hover:bg-emerald-500"
        aria-label="WhatsApp"
      >
        <svg
  viewBox="0 0 32 32"
  aria-hidden="true"
  className="h-7 w-7 fill-current"
>
  <path d="M16.04 3C8.86 3 3.02 8.74 3.02 15.8c0 2.26.6 4.47 1.74 6.4L3 29l7.02-1.81a13.17 13.17 0 0 0 6.01 1.46h.01c7.18 0 13.02-5.74 13.02-12.8S23.22 3 16.04 3Zm0 23.49h-.01a10.94 10.94 0 0 1-5.58-1.51l-.4-.24-4.17 1.08 1.11-4.01-.26-.41a10.47 10.47 0 0 1-1.69-5.6c0-5.87 4.94-10.64 11-10.64 2.94 0 5.7 1.12 7.77 3.14a10.45 10.45 0 0 1 3.23 7.51c0 5.87-4.94 10.65-11 10.65Zm6.03-7.97c-.33-.16-1.95-.95-2.25-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.21-.38.24-.71.08-.33-.16-1.4-.5-2.66-1.61-.98-.86-1.65-1.92-1.84-2.24-.19-.32-.02-.49.14-.65.15-.14.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.75-1.01-2.4-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.1-1.14 2.67s1.17 3.09 1.33 3.3c.16.22 2.3 3.45 5.58 4.84.78.33 1.39.52 1.87.67.78.24 1.49.21 2.05.13.63-.09 1.95-.78 2.22-1.54.27-.76.27-1.4.19-1.54-.08-.13-.3-.21-.63-.37Z" />
</svg>
      </a>
    </main>
  );
}
