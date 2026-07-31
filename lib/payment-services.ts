export type CheckoutMode = "fixed" | "quantity" | "quote";

export type PaymentService = {
  id: number;
  slug: string;
  category: "immigration" | "tax" | "translation";
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  priceLabelEs: string;
  priceLabelEn: string;
  stripePriceId: string;
  checkoutMode: CheckoutMode;
};

export const paymentServices: PaymentService[] = [
  {
    id: 1,
    slug: "i-130",
    category: "immigration",
    nameEs: "Petición familiar (Formulario I-130)",
    nameEn: "Family-Based Petition (Form I-130)",
    descriptionEs:
      "Preparación profesional del Formulario I-130 para establecer una relación familiar elegible con un ciudadano estadounidense o residente permanente legal.",
    descriptionEn:
      "Professional preparation of Form I-130 to establish a qualifying family relationship with a U.S. citizen or lawful permanent resident.",
    priceLabelEs: "$500",
    priceLabelEn: "$500",
    stripePriceId: "price_1TyFgARoRO493tQv3revGwzN",
    checkoutMode: "fixed",
  },
  {
    id: 2,
    slug: "i-130-i-485",
    category: "immigration",
    nameEs: "Petición familiar y ajuste de estatus",
    nameEn: "Family Petition & Adjustment of Status",
    descriptionEs:
      "Preparación profesional de los Formularios I-130 e I-485 para solicitantes elegibles de ajuste de estatus por petición familiar.",
    descriptionEn:
      "Professional preparation of Forms I-130 and I-485 for eligible family-based adjustment of status applicants.",
    priceLabelEs: "$600",
    priceLabelEn: "$600",
    stripePriceId: "price_1TyEwuRoRO493tQv2kxFx7hM",
    checkoutMode: "fixed",
  },
  {
    id: 3,
    slug: "i-130-i-485-i-765",
    category: "immigration",
    nameEs: "Paquete de ajuste de estatus + permiso de trabajo",
    nameEn: "Adjustment of Status Package + Work Permit",
    descriptionEs:
      "Preparación completa de los Formularios I-130, I-485 e I-765 para solicitantes elegibles que presentan los trámites conjuntamente.",
    descriptionEn:
      "Complete preparation of Forms I-130, I-485, and I-765 for eligible applicants filing together.",
    priceLabelEs: "$700",
    priceLabelEn: "$700",
    stripePriceId: "price_1TyFKtRoRO493tQvrXA2k9NR",
    checkoutMode: "fixed",
  },
  {
    id: 4,
    slug: "i-765",
    category: "immigration",
    nameEs: "Permiso de trabajo (Formulario I-765)",
    nameEn: "Employment Authorization (Form I-765)",
    descriptionEs:
      "Preparación profesional del Formulario I-765 para solicitar o renovar la autorización de empleo.",
    descriptionEn:
      "Professional preparation of Form I-765 to request or renew employment authorization.",
    priceLabelEs: "$100",
    priceLabelEn: "$100",
    stripePriceId: "price_1TyF1qRoRO493tQvHmdpmmhs",
    checkoutMode: "fixed",
  },
  {
    id: 5,
    slug: "i-90",
    category: "immigration",
    nameEs: "Renovación o reemplazo de Green Card (Formulario I-90)",
    nameEn: "Green Card Renewal (Form I-90)",
    descriptionEs:
      "Preparación profesional del Formulario I-90 para renovar o reemplazar una tarjeta de residencia permanente.",
    descriptionEn:
      "Professional preparation of Form I-90 to renew or replace a Permanent Resident Card.",
    priceLabelEs: "$125",
    priceLabelEn: "$125",
    stripePriceId: "price_1TyF8ZRoRO493tQv7nPpNdiq",
    checkoutMode: "fixed",
  },
  {
    id: 6,
    slug: "n-400",
    category: "immigration",
    nameEs: "Ciudadanía por naturalización (Formulario N-400)",
    nameEn: "Naturalization (Form N-400)",
    descriptionEs:
      "Preparación profesional del Formulario N-400 para solicitantes elegibles de ciudadanía estadounidense por naturalización.",
    descriptionEn:
      "Professional preparation of Form N-400 for eligible applicants seeking U.S. citizenship through naturalization.",
    priceLabelEs: "$200",
    priceLabelEn: "$200",
    stripePriceId: "price_1TyF5GRoRO493tQvgnh1upqp",
    checkoutMode: "fixed",
  },
  {
    id: 7,
    slug: "i-864",
    category: "immigration",
    nameEs: "Evaluación financiera para patrocinadores (Formulario I-864)",
    nameEn: "Financial Evaluation for Sponsors (Form I-864)",
    descriptionEs:
      "Preparación del Formulario I-864 y revisión de la documentación financiera del patrocinador.",
    descriptionEn:
      "Preparation of Form I-864 and review of the sponsor's supporting financial documentation.",
    priceLabelEs: "$150",
    priceLabelEn: "$150",
    stripePriceId: "price_1TyFUaRoRO493tQvGfnXOhSG",
    checkoutMode: "fixed",
  },
  {
    id: 8,
    slug: "i-131",
    category: "immigration",
    nameEs: "Documento de viaje (Formulario I-131)",
    nameEn: "Travel Document (Form I-131)",
    descriptionEs:
      "Preparación del Formulario I-131 para solicitudes elegibles de documento de viaje, incluido Advance Parole cuando corresponda.",
    descriptionEn:
      "Preparation of Form I-131 for eligible travel document requests, including Advance Parole when applicable.",
    priceLabelEs: "$100",
    priceLabelEn: "$100",
    stripePriceId: "price_1TyFABRoRO493tQvahy3H3SV",
    checkoutMode: "fixed",
  },
  {
    id: 9,
    slug: "tax-1040",
    category: "tax",
    nameEs: "Preparación de impuestos personales (Formulario 1040)",
    nameEn: "Individual Tax Return (Form 1040)",
    descriptionEs:
      "Preparación profesional de la declaración federal de impuestos personales basada en la documentación del contribuyente.",
    descriptionEn:
      "Professional preparation of an individual federal income tax return based on the taxpayer's documentation.",
    priceLabelEs: "Desde $150",
    priceLabelEn: "Starting at $150",
    stripePriceId: "price_1TyFQ3RoRO493tQve3dBX29w",
    checkoutMode: "quote",
  },
  {
    id: 10,
    slug: "tax-dependents-credits",
    category: "tax",
    nameEs: "Impuestos personales con dependientes y créditos",
    nameEn: "Individual Tax Return – Dependents & Credits",
    descriptionEs:
      "Preparación de declaración federal con dependientes y créditos fiscales elegibles según la documentación aportada.",
    descriptionEn:
      "Preparation of an individual federal return involving dependents and eligible tax credits.",
    priceLabelEs: "Desde $220",
    priceLabelEn: "Starting at $220",
    stripePriceId: "price_1TyFQwRoRO493tQvV2v4mpIB",
    checkoutMode: "quote",
  },
  {
    id: 11,
    slug: "business-tax-1099",
    category: "tax",
    nameEs: "Preparación de impuestos de negocio y 1099",
    nameEn: "Business Tax Return (Business & 1099)",
    descriptionEs:
      "Preparación de declaraciones de negocio según el tipo de entidad, ingresos, gastos y documentos de respaldo.",
    descriptionEn:
      "Preparation of business tax filings based on entity type, income, expenses, and supporting documentation.",
    priceLabelEs: "Desde $350",
    priceLabelEn: "Starting at $350",
    stripePriceId: "price_1TyFRiRoRO493tQv2HlxFKA7",
    checkoutMode: "quote",
  },
  {
    id: 12,
    slug: "itin-w-7",
    category: "tax",
    nameEs: "Solicitud de ITIN (Formulario W-7)",
    nameEn: "ITIN Application (Form W-7)",
    descriptionEs:
      "Preparación profesional del Formulario W-7 del IRS para solicitar un Número de Identificación Personal del Contribuyente.",
    descriptionEn:
      "Professional preparation of IRS Form W-7 to request an Individual Taxpayer Identification Number.",
    priceLabelEs: "$150",
    priceLabelEn: "$150",
    stripePriceId: "price_1TyFSKRoRO493tQvhNkmuCh4",
    checkoutMode: "fixed",
  },
  {
    id: 13,
    slug: "certified-civil-translation",
    category: "translation",
    nameEs: "Traducción certificada de documentos civiles",
    nameEn: "Certified Translation – Civil Documents",
    descriptionEs:
      "Traducción certificada para actas de nacimiento, matrimonio, divorcio y otros documentos civiles estándar.",
    descriptionEn:
      "Certified translation for birth, marriage, divorce, and other standard civil documents.",
    priceLabelEs: "$30 por página",
    priceLabelEn: "$30 per page",
    stripePriceId: "price_1TyFNSRoRO493tQvJHyzzaof",
    checkoutMode: "quantity",
  },
  {
    id: 14,
    slug: "complex-legal-translation",
    category: "translation",
    nameEs: "Traducción certificada de documentos legales complejos",
    nameEn: "Certified Translation – Complex Legal Documents",
    descriptionEs:
      "Traducción certificada de expedientes judiciales, contratos, historiales académicos y otros documentos complejos.",
    descriptionEn:
      "Certified translation of court records, contracts, academic transcripts, and other complex documents.",
    priceLabelEs: "Desde $45 por página",
    priceLabelEn: "Starting at $45 per page",
    stripePriceId: "price_1TyFP8RoRO493tQvkqOeaMHq",
    checkoutMode: "quote",
  },
];

export function getPaymentService(slug: string) {
  return paymentServices.find((service) => service.slug === slug);
}
