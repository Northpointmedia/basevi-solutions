export type Language = "es" | "en";

export type SeoService = {
  slug: string;
  alternateSlug: string;
  title: string;
  eyebrow: string;
  description: string;
  price: string;
  intro: string;
  includes: string[];
  faqs: { q: string; a: string }[];
};

export const seoServicesEs: SeoService[] = [
  {
    slug: "peticion-familiar-i-130",
    alternateSlug: "family-petition-i-130",
    title: "Preparación de Petición Familiar I-130 en Miami",
    eyebrow: "PETICIONES FAMILIARES",
    description: "Preparación profesional del Formulario I-130 y organización de evidencia para peticiones familiares.",
    price: "Servicio desde $500",
    intro: "Te ayudamos a preparar y organizar tu petición familiar con un proceso claro, atención en español y revisión documental antes de presentar.",
    includes: ["Preparación del Formulario I-130", "Checklist personalizado de documentos", "Organización de evidencia de la relación familiar", "Revisión final del paquete"],
    faqs: [{ q: "¿La tarifa incluye las tasas de USCIS?", a: "No. La tarifa corresponde al servicio de preparación documental; las tasas gubernamentales se pagan por separado." }, { q: "¿Pueden garantizar la aprobación?", a: "No. La decisión corresponde exclusivamente a USCIS y ningún preparador puede garantizar un resultado." }],
  },
  {
    slug: "ajuste-de-estatus-i-485",
    alternateSlug: "adjustment-of-status-i-485",
    title: "Preparación de Ajuste de Estatus I-485 en Miami",
    eyebrow: "AJUSTE DE ESTATUS",
    description: "Preparación documental del Formulario I-485 para solicitantes elegibles en Miami y Florida.",
    price: "Paquetes desde $600",
    intro: "Organizamos los formularios y documentos de respaldo para que puedas presentar un paquete completo y ordenado.",
    includes: ["Preparación del Formulario I-485", "Checklist de evidencia civil y migratoria", "Coordinación de formularios relacionados", "Revisión final del paquete"],
    faqs: [{ q: "¿Toda persona puede ajustar estatus?", a: "No. La elegibilidad depende de la categoría y del historial migratorio. Si necesitas asesoría legal, consulta con un abogado de inmigración." }, { q: "¿Incluye la petición I-130?", a: "Disponemos de paquetes con I-130 e I-485 según el servicio contratado." }],
  },
  {
    slug: "permiso-de-trabajo-i-765",
    alternateSlug: "work-permit-i-765",
    title: "Solicitud o Renovación de Permiso de Trabajo I-765",
    eyebrow: "AUTORIZACIÓN DE EMPLEO",
    description: "Preparación del Formulario I-765 para solicitudes y renovaciones elegibles de permiso de trabajo.",
    price: "Servicio desde $100",
    intro: "Preparamos tu solicitud o renovación y te entregamos una lista clara de los documentos necesarios.",
    includes: ["Preparación del Formulario I-765", "Checklist según la categoría indicada", "Organización de documentos de respaldo", "Revisión final"],
    faqs: [{ q: "¿Cuánto tarda USCIS?", a: "Los tiempos varían por categoría y oficina. Consulta el estimado vigente directamente en USCIS." }, { q: "¿La tarifa incluye USCIS?", a: "No. Las tasas gubernamentales, cuando correspondan, se pagan por separado." }],
  },
  {
    slug: "ciudadania-n-400",
    alternateSlug: "citizenship-n-400",
    title: "Preparación de Ciudadanía N-400 en Miami",
    eyebrow: "NATURALIZACIÓN",
    description: "Preparación profesional del Formulario N-400 y organización de documentos para naturalización.",
    price: "Servicio desde $200",
    intro: "Te acompañamos en la preparación documental de tu solicitud de naturalización con atención bilingüe.",
    includes: ["Preparación del Formulario N-400", "Checklist de documentos", "Revisión de consistencia de la información", "Organización final"],
    faqs: [{ q: "¿Incluye preparación para el examen?", a: "El alcance principal es la preparación documental. Confirma previamente si deseas servicios adicionales." }, { q: "¿Garantizan la ciudadanía?", a: "No. USCIS determina la elegibilidad y toma la decisión final." }],
  },
  {
    slug: "impuestos-itin",
    alternateSlug: "taxes-itin",
    title: "Preparación de Impuestos e ITIN en Miami",
    eyebrow: "IMPUESTOS E ITIN",
    description: "Preparación de impuestos personales, formularios 1099 y solicitudes de ITIN en Miami.",
    price: "Impuestos desde $150",
    intro: "Recibe una lista de documentos, precio claro según la complejidad y atención personalizada en español o inglés.",
    includes: ["Revisión inicial de documentos", "Preparación de la declaración o Formulario W-7", "Explicación de próximos pasos", "Entrega segura"],
    faqs: [{ q: "¿El precio es fijo?", a: "Depende del tipo de declaración, formularios, dependientes, créditos y complejidad." }, { q: "¿Puedo solicitar ITIN sin declarar impuestos?", a: "El IRS exige normalmente adjuntar una declaración, salvo que aplique una excepción específica." }],
  },
  {
    slug: "traducciones-certificadas",
    alternateSlug: "certified-translations",
    title: "Traducciones Certificadas para USCIS en Miami",
    eyebrow: "TRADUCCIONES",
    description: "Traducciones certificadas al inglés para documentos presentados ante USCIS y otros trámites.",
    price: "Cotización según documento",
    intro: "Traducimos documentos civiles y de respaldo con certificación del traductor y entrega digital.",
    includes: ["Traducción completa al inglés", "Certificación del traductor", "Formato claro y profesional", "Entrega digital"],
    faqs: [{ q: "¿Qué documentos traducen?", a: "Entre otros: actas, certificados, sentencias, constancias y documentos de respaldo." }, { q: "¿Cómo recibo una cotización?", a: "Envía una imagen legible del documento por WhatsApp para revisar extensión, idioma y plazo." }],
  },
];

export const seoServicesEn: SeoService[] = [
  { slug: "family-petition-i-130", alternateSlug: "peticion-familiar-i-130", title: "Family Petition I-130 Preparation in Miami", eyebrow: "FAMILY PETITIONS", description: "Professional Form I-130 preparation and supporting-evidence organization for family petitions.", price: "Service from $500", intro: "We help you prepare and organize your family petition through a clear process, bilingual assistance, and a document review before filing.", includes: ["Form I-130 preparation", "Personalized document checklist", "Organization of family-relationship evidence", "Final package review"], faqs: [{ q: "Does the service fee include USCIS filing fees?", a: "No. The service fee covers document preparation; government filing fees are paid separately." }, { q: "Can you guarantee approval?", a: "No. USCIS alone decides each case, and no document preparer can guarantee an outcome." }] },
  { slug: "adjustment-of-status-i-485", alternateSlug: "ajuste-de-estatus-i-485", title: "Adjustment of Status I-485 Preparation in Miami", eyebrow: "ADJUSTMENT OF STATUS", description: "Document preparation for Form I-485 for eligible applicants in Miami and Florida.", price: "Packages from $600", intro: "We organize the forms and supporting documents so you can submit a complete, orderly package.", includes: ["Form I-485 preparation", "Civil and immigration evidence checklist", "Coordination of related forms", "Final package review"], faqs: [{ q: "Can everyone adjust status?", a: "No. Eligibility depends on the category and immigration history. Consult an immigration attorney if you need legal advice." }, { q: "Does this include Form I-130?", a: "Packages that include Forms I-130 and I-485 are available, depending on the service selected." }] },
  { slug: "work-permit-i-765", alternateSlug: "permiso-de-trabajo-i-765", title: "Work Permit I-765 Application or Renewal", eyebrow: "EMPLOYMENT AUTHORIZATION", description: "Form I-765 preparation for eligible work-permit applications and renewals.", price: "Service from $100", intro: "We prepare your application or renewal and provide a clear list of the documents you need.", includes: ["Form I-765 preparation", "Checklist for the category provided", "Organization of supporting documents", "Final review"], faqs: [{ q: "How long does USCIS take?", a: "Processing times vary by category and office. Check current estimates directly with USCIS." }, { q: "Does the fee include USCIS charges?", a: "No. Government filing fees, when applicable, are paid separately." }] },
  { slug: "citizenship-n-400", alternateSlug: "ciudadania-n-400", title: "Citizenship N-400 Preparation in Miami", eyebrow: "NATURALIZATION", description: "Professional Form N-400 preparation and document organization for naturalization.", price: "Service from $200", intro: "We assist with preparing your naturalization application and documents in English or Spanish.", includes: ["Form N-400 preparation", "Document checklist", "Information consistency review", "Final organization"], faqs: [{ q: "Does this include test preparation?", a: "The primary scope is document preparation. Ask in advance if you would like additional services." }, { q: "Do you guarantee citizenship?", a: "No. USCIS determines eligibility and makes the final decision." }] },
  { slug: "taxes-itin", alternateSlug: "impuestos-itin", title: "Tax and ITIN Preparation in Miami", eyebrow: "TAXES AND ITIN", description: "Personal tax return, 1099, and ITIN application preparation in Miami.", price: "Tax preparation from $150", intro: "Receive a document list, transparent pricing based on complexity, and personalized service in English or Spanish.", includes: ["Initial document review", "Tax return or Form W-7 preparation", "Explanation of next steps", "Secure delivery"], faqs: [{ q: "Is the price fixed?", a: "It depends on the type of return, forms, dependents, credits, and complexity." }, { q: "Can I apply for an ITIN without filing a tax return?", a: "The IRS generally requires a tax return unless a specific exception applies." }] },
  { slug: "certified-translations", alternateSlug: "traducciones-certificadas", title: "Certified Translations for USCIS in Miami", eyebrow: "TRANSLATIONS", description: "Certified English translations for documents submitted to USCIS and other institutions.", price: "Quote based on document", intro: "We translate civil and supporting documents with translator certification and digital delivery.", includes: ["Complete English translation", "Translator certification", "Clear, professional format", "Digital delivery"], faqs: [{ q: "What documents do you translate?", a: "Examples include civil records, certificates, court orders, letters, and supporting documents." }, { q: "How do I receive a quote?", a: "Send a readable image of the document through WhatsApp so we can review its length, language, and deadline." }] },
];

const legacySpanishSlugs: Record<string, string> = {
  "peticion-familiar-i-130-miami": "peticion-familiar-i-130",
  "ajuste-de-estatus-i-485-miami": "ajuste-de-estatus-i-485",
  "permiso-de-trabajo-i-765-miami": "permiso-de-trabajo-i-765",
  "ciudadania-n-400-miami": "ciudadania-n-400",
  "impuestos-itin-miami": "impuestos-itin",
  "traducciones-certificadas-uscis-miami": "traducciones-certificadas",
};

export const seoServices = seoServicesEs;
export function findSeoService(slug: string, language: Language = "es") {
  const normalizedSlug = language === "es" ? legacySpanishSlugs[slug] ?? slug : slug;
  return (language === "es" ? seoServicesEs : seoServicesEn).find((service) => service.slug === normalizedSlug);
}
