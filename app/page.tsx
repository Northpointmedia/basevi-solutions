"use client";

import Image from "next/image";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChartNoAxesCombined,
  CreditCard,
  FileText,
  Flag,
  Languages,
  Landmark,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import {
  FormEvent,
  type ElementType,
  useEffect,
  useMemo,
  useState,
} from "react";

type Language = "es" | "en";

type TrackingEventName =
  | "book_consultation_click"
  | "whatsapp_click"
  | "contact_form_submit"
  | "service_evaluation_request"
  | "language_switch";

const CALENDLY_URL_ES = "https://calendly.com/mbasevim/30min";
const CALENDLY_URL_EN = "https://calendly.com/mbasevim/30min";

const WHATSAPP_URL_ES =
  "https://wa.me/17868300438?text=Hola%20Mar%C3%ADa%2C%20he%20visitado%20la%20web%20de%20Basevi%20Solutions%20y%20me%20gustar%C3%ADa%20solicitar%20una%20evaluaci%C3%B3n%20gratuita.";

const WHATSAPP_URL_EN =
  "https://wa.me/17868300438?text=Hello%20Maria%2C%20I%20visited%20the%20Basevi%20Solutions%20website%20and%20would%20like%20to%20request%20a%20free%20evaluation.";


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

const trackEvent = (
  eventName: TrackingEventName,
  parameters: Record<string, string | number | boolean> = {},
) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters,
  });
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("inicio");

  const isSpanish = language === "es";
  const calendlyUrl = isSpanish ? CALENDLY_URL_ES : CALENDLY_URL_EN;

  const handleLanguageSwitch = () => {
    const nextLanguage = isSpanish ? "en" : "es";

    trackEvent("language_switch", {
      current_language: language,
      selected_language: nextLanguage,
    });

    setLanguage(nextLanguage);
  };

  const trackBookingClick = (placement: string) => {
    trackEvent("book_consultation_click", {
      placement,
      language,
      destination_url: calendlyUrl,
    });

    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  const trackWhatsAppClick = (placement: string) => {
    trackEvent("whatsapp_click", {
      placement,
      language,
      destination: "whatsapp",
    });
  };

  useEffect(() => {
    const sectionIds = [
      "inicio",
      "servicios",
      "proceso",
      "nosotros",
      "testimonios",
      "preguntas",
      "contacto",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    updateFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-150px 0px -55% 0px",
        threshold: [0.01, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

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
    const alreadySelected = selectedServices.some(
      (item) => item.id === service.id,
    );

    if (!alreadySelected) {
      trackEvent("service_evaluation_request", {
        service_id: service.id,
        service_name: isSpanish ? service.nameEs : service.nameEn,
        language,
        estimated_price: isSpanish
          ? service.priceLabelEs
          : service.priceLabelEn,
      });
    }

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

    trackEvent("contact_form_submit", {
      language,
      selected_services_count: selectedServices.length,
      form_name: "free_evaluation_form",
    });

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
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
        <div className="hidden border-b border-slate-200/70 bg-slate-950 text-white lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-xs">
            <div className="flex items-center gap-6 text-slate-300">
              <span className="font-medium">
                {isSpanish
                  ? "Atención virtual en todo Estados Unidos"
                  : "Nationwide virtual assistance"}
              </span>
              <span className="h-4 w-px bg-white/20" />
              <span className="font-medium">
                {isSpanish
                  ? "Citas presenciales en Miami"
                  : "In-person appointments in Miami"}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="tel:+17868300438"
                className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-emerald-300"
              >
                <Phone className="h-3.5 w-3.5" />
                +1 (786) 830-0438
              </a>

              <a
                href={isSpanish ? WHATSAPP_URL_ES : WHATSAPP_URL_EN}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick("top_bar")}
                className="inline-flex items-center gap-2 font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex min-h-[96px] max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex shrink-0 items-center">
            <Image
              src="/basevi-logo.webp"
              alt="Basevi Solutions LLC"
              width={320}
              height={130}
              priority
              className="h-16 w-auto object-contain sm:h-[72px] lg:h-20"
            />
          </a>

          <nav className="hidden items-center gap-9 xl:flex">
            {navigation.map(([label, href]) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setActiveSection(sectionId)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-3 text-sm font-semibold transition ${
                    isActive
                      ? "text-emerald-800 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-emerald-700"
                      : "text-slate-600 hover:text-emerald-800"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={handleLanguageSwitch}
              className="hidden rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-700 hover:text-emerald-800 sm:inline-flex"
              aria-label={
                isSpanish ? "Switch website to English" : "Cambiar sitio a español"
              }
            >
              {isSpanish ? "ES | EN" : "EN | ES"}
            </button>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault();
                trackBookingClick("desktop_header");
              }}
              className="hidden items-center gap-2 rounded-full bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-600 lg:inline-flex"
            >
              <CalendarDays className="h-4.5 w-4.5" />
              {isSpanish
                ? "Agendar evaluación gratuita"
                : "Book a free evaluation"}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-lg font-bold text-slate-800 transition hover:border-emerald-700 hover:text-emerald-800 xl:hidden"
              aria-label={isSpanish ? "Abrir menú" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              ☰
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-5 shadow-xl xl:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navigation.map(([label, href]) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => {
                      setActiveSection(sectionId);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-lg px-2 py-2 font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                    }`}
                  >
                    {label}
                  </a>
                );
              })}

              <a
                href="tel:+17868300438"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700"
              >
                <Phone className="h-4 w-4 text-emerald-700" />
                +1 (786) 830-0438
              </a>

              <button
                type="button"
                onClick={handleLanguageSwitch}
                className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-800"
              >
                {isSpanish ? "View in English" : "Ver en español"}
              </button>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                event.preventDefault();
                trackBookingClick("mobile_menu");
              }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-center font-bold text-white"
              >
                <CalendarDays className="h-5 w-5" />
                {isSpanish
                  ? "Agendar evaluación gratuita"
                  : "Book a free evaluation"}
              </a>
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="scroll-mt-[150px] relative overflow-hidden bg-slate-950 text-white">
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
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                event.preventDefault();
                trackBookingClick("hero");
              }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-4 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                <CalendarDays className="h-5 w-5" />
                {isSpanish
                  ? "Agendar evaluación gratuita"
                  : "Book a free evaluation"}
              </a>
              <a
                href="#servicios"
                className="rounded-full border border-white/30 px-7 py-4 text-center font-semibold transition hover:border-white hover:bg-white hover:text-slate-950"
              >
                {isSpanish ? "Explorar servicios" : "Explore services"}
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

            <div className="absolute -bottom-7 left-4 right-4 rounded-2xl border border-emerald-300/30 bg-slate-950/95 p-5 shadow-2xl backdrop-blur sm:left-8 sm:right-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                María Basevi
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {isSpanish
                  ? "Fundadora · Preparación documental y servicios fiscales"
                  : "Founder · Document preparation and tax services"}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {isSpanish
                  ? "Atención virtual y presencial desde Miami, Florida."
                  : "Virtual and in-person assistance from Miami, Florida."}
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: ShieldCheck,
              es: "Información tratada con confidencialidad",
              en: "Information handled confidentially",
            },
            {
              icon: Languages,
              es: "Atención en español e inglés",
              en: "English and Spanish assistance",
            },
            {
              icon: CalendarDays,
              es: "Evaluación virtual gratuita",
              en: "Free virtual evaluation",
            },
            {
              icon: MessageCircle,
              es: "Respuesta en un día hábil",
              en: "Response within one business day",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.en}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-slate-700">
                  {isSpanish ? item.es : item.en}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="servicios" className="scroll-mt-[150px] bg-slate-50 py-24">
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
                  className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
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

      <section id="proceso" className="scroll-mt-[150px] py-24">
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
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex justify-center">
  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl font-bold text-emerald-700">
    {step.icon}
  </div>
</div>
                <h3 className="mt-6 text-xl font-bold">
                  {isSpanish ? step.esTitle : step.enTitle}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {isSpanish ? step.esText : step.enText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-[150px] bg-emerald-950 py-24 text-white">
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


      <section id="testimonios" className="scroll-mt-[150px] bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-800">
              {isSpanish ? "Experiencias reales" : "Real client experiences"}
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              {isSpanish
                ? "Confianza construida con atención y detalle."
                : "Trust built through care and attention to detail."}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Betty C.",
                esService: "Preparación de ajuste de estatus",
                enService: "Adjustment of status preparation",
                esQuote:
                  "Desde el primer momento recibí una atención muy cercana y profesional. María explicó cada paso, revisó nuestra documentación con muchísimo detalle y respondió nuestras dudas con rapidez.",
                enQuote:
                  "From the beginning, I received close and professional attention. Maria explained each step, reviewed our documents in great detail, and responded quickly to our questions.",
              },
              {
                name: "Roberto M.",
                esService: "Preparación de ajuste de estatus",
                enService: "Adjustment of status preparation",
                esQuote:
                  "El proceso fue mucho más sencillo gracias a la organización y dedicación de María. Nos dio tranquilidad saber que todo estaba revisado antes de enviarlo.",
                enQuote:
                  "The process felt much easier thanks to Maria's organization and dedication. It gave us peace of mind knowing everything had been reviewed before submission.",
              },
            ].map((review) => (
              <figure
                key={review.name}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex gap-1 text-amber-500" aria-label="5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-6 text-lg leading-8 text-slate-700">
                  “{isSpanish ? review.esQuote : review.enQuote}”
                </blockquote>

                <figcaption className="mt-7 border-t border-slate-200 pt-5">
                  <p className="font-bold">{review.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {isSpanish ? review.esService : review.enService}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isSpanish
              ? "Testimonios reales sobre la experiencia de servicio. Los resultados dependen de cada caso."
              : "Real testimonials about the service experience. Results depend on each individual case."}
          </p>
        </div>
      </section>

      <section id="preguntas" className="scroll-mt-[150px] bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-800">
              {isSpanish ? "Preguntas frecuentes" : "Frequently asked questions"}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              {isSpanish
                ? "Información clara antes de comenzar."
                : "Clear information before you begin."}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {isSpanish
                ? "Durante la evaluación confirmaremos el alcance específico de tu servicio."
                : "During the evaluation, we will confirm the specific scope of your service."}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                esQ: "¿La evaluación inicial tiene costo?",
                enQ: "Is the initial evaluation free?",
                esA: "La evaluación virtual inicial de 30 minutos es completamente gratuita y sin compromiso. Durante la reunión conoceremos tu situación, responderemos tus preguntas y te explicaremos con claridad las opciones disponibles, el proceso recomendado y el costo del servicio si decides continuar.",
                enA: "The initial 30-minute virtual evaluation is completely free and comes with no obligation. During the meeting, we will learn about your situation, answer your questions, explain the available options, and provide clear information about the recommended process and service fees if you decide to move forward.",
              },
              {
                esQ: "¿Pueden atenderme si vivo fuera de Florida?",
                enQ: "Can you assist me if I live outside Florida?",
                esA: "Atendemos clientes en distintos estados de Estados Unidos para servicios de preparación documental, traducciones certificadas e impuestos. Si tu caso requiere la intervención de un abogado o tiene requisitos específicos según el estado, te informaremos desde el principio.",
                enA: "We assist clients throughout the United States with document preparation, certified translations, and tax preparation services. If your matter requires an attorney or involves state-specific requirements, we will let you know from the beginning.",
              },
              {
                esQ: "¿Basevi Solutions es un bufete de abogados?",
                enQ: "Is Basevi Solutions a law firm?",
                esA: "Basevi Solutions es una empresa de preparación documental y servicios administrativos. No ofrecemos representación legal ni asesoría jurídica. Cuando un caso requiere la intervención de un abogado de inmigración, orientamos al cliente para que obtenga la asistencia legal adecuada.",
                enA: "Basevi Solutions provides professional document preparation and administrative support services. We do not provide legal advice or legal representation. When a matter requires an immigration attorney, we guide the client toward the appropriate legal assistance.",
              },
              {
                esQ: "¿Qué documentos debo llevar a la consulta?",
                enQ: "What documents should I bring to my consultation?",
                esA: "La documentación necesaria depende del servicio solicitado. Después de reservar tu cita recibirás indicaciones sobre los documentos recomendados. Si todavía no los tienes todos, igualmente podemos evaluar tu situación y explicarte los próximos pasos.",
                enA: "The required documents depend on the service you need. After scheduling your appointment, you will receive guidance on the documents that may be helpful. If you do not have everything yet, we can still evaluate your situation and explain the next steps.",
              },
              {
                esQ: "¿Cuánto tarda el proceso?",
                enQ: "How long does the process take?",
                esA: "Cada trámite tiene tiempos diferentes. La duración depende del tipo de servicio solicitado y, en los casos migratorios, de los tiempos oficiales de USCIS u otras agencias gubernamentales. Durante la evaluación te ofreceremos una orientación general basada en tu situación.",
                enA: "Processing times vary depending on the type of service. For immigration matters, timelines are determined by USCIS or the appropriate government agency. During the evaluation, we will provide general guidance based on your situation.",
              },
              {
                esQ: "¿Las traducciones son certificadas?",
                enQ: "Are your translations certified?",
                esA: "Realizamos traducciones certificadas para trámites migratorios, legales, educativos y administrativos en Estados Unidos. Antes de iniciar, confirmaremos el tipo de documento, el idioma y los requisitos de la institución receptora.",
                enA: "We provide certified translations for immigration, legal, educational, and administrative purposes in the United States. Before beginning, we confirm the document type, language, and the receiving institution's requirements.",
              },
              {
                esQ: "¿Puedo realizar todo el proceso de forma virtual?",
                enQ: "Can everything be completed remotely?",
                esA: "La mayoría de nuestros servicios pueden gestionarse de forma virtual mediante videollamada, correo electrónico y envío electrónico de documentos. Si se requiere una cita presencial, la coordinaremos previamente en Miami.",
                enA: "Most of our services can be completed remotely through video meetings, email, and electronic document exchange. If an in-person appointment is needed, we will coordinate it in advance in Miami.",
              },
              {
                esQ: "¿Qué formas de pago aceptan?",
                enQ: "What payment methods do you accept?",
                esA: "Aceptamos las principales tarjetas de crédito y débito, además de otros métodos de pago electrónicos disponibles al momento de contratar el servicio. El precio y las condiciones de pago se confirman por escrito antes de comenzar.",
                enA: "We accept major credit and debit cards, along with other electronic payment methods available when the service is retained. Pricing and payment terms are confirmed in writing before work begins.",
              },
              {
                esQ: "¿Cuándo se confirma el precio final?",
                enQ: "When is the final price confirmed?",
                esA: "El precio final se confirma después de revisar el alcance, la documentación y la complejidad del servicio. Las tarifas gubernamentales, costos de terceros y gastos adicionales no están incluidos, salvo que se indique expresamente por escrito.",
                enA: "The final price is confirmed after reviewing the scope, documents, and complexity of the service. Government filing fees, third-party costs, and additional expenses are not included unless expressly stated in writing.",
              },
              {
                esQ: "¿Cómo reservo una cita?",
                enQ: "How do I book an appointment?",
                esA: "Utiliza el botón de agenda para reservar la evaluación virtual gratuita. Los clientes activos reciben directamente el enlace privado para citas presenciales de revisión documental e inicio del proceso.",
                enA: "Use the scheduling button to book the free virtual evaluation. Existing clients receive a private link for in-person document review and case-intake appointments.",
              },
            ].map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.enQ}
                  className="overflow-hidden rounded-2xl border border-slate-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-bold">
                      {isSpanish ? item.esQ : item.enQ}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="border-t border-slate-200 px-6 py-5 leading-7 text-slate-600">
                      {isSpanish ? item.esA : item.enA}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <h2 className="text-4xl font-bold md:text-5xl">
            {isSpanish
              ? "¿Todo listo para dar el siguiente paso?"
              : "Ready to take the next step?"}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            {isSpanish
              ? "Agenda tu evaluación virtual inicial gratuita y recibe una orientación clara sobre tu caso, los próximos pasos y el servicio más adecuado para ti."
              : "Book your free initial virtual evaluation and receive clear guidance about your situation, the next steps, and the service that best fits your needs."}
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => {
                event.preventDefault();
                trackBookingClick("final_cta");
              }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-4 font-bold transition hover:bg-emerald-500"
          >
            <CalendarDays className="h-5 w-5" />
            {isSpanish ? "Agendar ahora" : "Book now"}
          </a>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-[150px] py-24">
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

                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                event.preventDefault();
                trackBookingClick("contact_section");
              }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                  <CalendarDays className="h-5 w-5" />
                  {isSpanish
                    ? "Agendar evaluación virtual"
                    : "Book virtual evaluation"}
                </a>

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
        href={isSpanish ? WHATSAPP_URL_ES : WHATSAPP_URL_EN}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackWhatsAppClick("floating_button")}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition hover:scale-105 hover:bg-emerald-500"
        aria-label={
          isSpanish ? "Contactar por WhatsApp" : "Contact through WhatsApp"
        }
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
