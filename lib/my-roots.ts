export type MyRootsSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
};

export type MyRootsArticle = {
  slug: string;
  category: "Familia" | "Ajuste" | "Documentos" | "Ciudadanía";
  readingTime: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  dek: string;
  formLabel: string;
  officialUrl: string;
  featured?: boolean;
  sections: MyRootsSection[];
};

export const myRootsArticles: MyRootsArticle[] = [
  {
    slug: "peticion-familiar",
    category: "Familia",
    readingTime: "7 min",
    publishedAt: "2026-09-19",
    title: "Una carpeta, tres generaciones y un plan claro",
    excerpt:
      "Cómo una familia transformó documentos dispersos en una petición familiar organizada y fácil de seguir.",
    dek: "Una historia sobre vínculos, nombres y fechas: el orden que permitió presentar una petición familiar con más confianza.",
    formLabel: "Formulario I-130",
    officialUrl: "https://www.uscis.gov/i-130",
    featured: true,
    sections: [
      {
        heading: "Primero, la relación; después, el formulario",
        paragraphs: [
          "Lucía llevaba años guardando documentos de su madre en distintos lugares: fotos en el teléfono, actas en una carpeta, direcciones antiguas en mensajes y una copia del pasaporte que nadie sabía si seguía vigente. Cuando la familia decidió comenzar una petición, el primer impulso fue llenar el formulario de inmediato. El paso más útil fue detenerse y construir una sola historia coherente.",
          "La familia reunió actas civiles legibles, identificaciones y traducciones completas. Después creó una tabla con los nombres exactamente como aparecían en cada documento. Esa comparación reveló una diferencia pequeña en un segundo nombre que convenía entender y documentar antes del envío.",
        ],
        quote:
          "Una petición sólida no es la que tiene más páginas. Es la que permite entender con claridad quién pide, para quién y con qué evidencia.",
      },
      {
        heading: "El expediente que todos podían seguir",
        paragraphs: [
          "BaseviSolutions ayudó a convertir los papeles en secciones: identidad del peticionario, identidad del beneficiario, prueba de ciudadanía o residencia, prueba del vínculo familiar y documentos complementarios. Cada archivo recibió un nombre consistente y cada copia se revisó por legibilidad.",
        ],
        bullets: [
          "Una cronología maestra evitó contradicciones entre fechas.",
          "La revisión de nombres detectó diferencias antes del envío.",
          "Las copias finales quedaron guardadas en formato digital y físico.",
          "La familia anotó el número de recibo y creó recordatorios de seguimiento.",
        ],
      },
      {
        heading: "El resultado que sí puede controlarse",
        paragraphs: [
          "Nadie puede prometer la decisión ni el tiempo de USCIS. Lo que la familia sí pudo controlar fue la calidad de su preparación: un paquete organizado, respuestas consistentes y una copia exacta de lo enviado. Esa claridad redujo la ansiedad y les permitió responder mejor a cada comunicación posterior.",
          "Los nombres y ciertos datos identificativos fueron modificados para proteger la privacidad. La historia está basada en experiencias de preparación documental de BaseviSolutions y no constituye una promesa de aprobación.",
        ],
      },
    ],
  },
  {
    slug: "ajuste-y-permiso",
    category: "Ajuste",
    readingTime: "8 min",
    publishedAt: "2026-09-16",
    title: "Del “tengo muchos papeles” a un expediente que se entiende",
    excerpt:
      "La diferencia entre acumular documentos y construir un ajuste de estatus organizado.",
    dek: "Una experiencia sobre ajuste de estatus y permiso de trabajo, contada desde la consistencia documental.",
    formLabel: "Formulario I-485",
    officialUrl: "https://www.uscis.gov/i-485",
    sections: [
      {
        heading: "Separar cada proceso para ver el conjunto",
        paragraphs: [
          "Camila y Andrés llegaron a la primera revisión con una bolsa llena de sobres. Había estados bancarios, fotografías, recibos y varias versiones de formularios. Tenían evidencia, pero no un sistema. El objetivo fue transformar ese volumen en un expediente que pudiera leerse de principio a fin.",
          "Aunque algunos formularios pueden presentarse dentro de una misma estrategia, cada uno responde preguntas distintas. La pareja creó una hoja de control para comparar domicilio, historial laboral, entradas a Estados Unidos, matrimonios anteriores y datos familiares.",
        ],
      },
      {
        heading: "La evidencia también necesita contexto",
        paragraphs: [
          "Al revisar la información en paralelo aparecieron dos fechas distintas para una mudanza. En vez de escoger la que sonaba mejor, regresaron a contratos, correspondencia y estados de cuenta para reconstruir el dato correcto.",
          "Las fotografías y cuentas compartidas se ordenaron por periodos y se acompañaron de descripciones breves. Los documentos personales se mantuvieron en su sección y las copias sensibles se compartieron únicamente por los canales acordados.",
        ],
        quote:
          "Consistencia no significa memorizar respuestas. Significa que los documentos cuenten la misma historia verdadera.",
      },
      {
        heading: "Después del envío",
        paragraphs: [
          "La pareja conservó una copia final, guardó cada aviso de recibo y activó el seguimiento de sus casos. Entendieron también que un permiso de trabajo pendiente no equivale a autorización para trabajar y que siempre deben verificar el documento vigente y las instrucciones oficiales aplicables.",
          "Los nombres y detalles identificativos fueron cambiados. Cada situación migratoria es distinta y los asuntos complejos deben revisarse con un abogado de inmigración autorizado.",
        ],
      },
    ],
  },
  {
    slug: "foia-historial",
    category: "Documentos",
    readingTime: "6 min",
    publishedAt: "2026-09-12",
    title: "Reconstruir el pasado antes de presentar algo nuevo",
    excerpt:
      "Cuándo una solicitud FOIA puede ayudar a recuperar registros y ordenar un historial migratorio.",
    dek: "La decisión inteligente de solicitar el expediente antes de completar respuestas basadas en recuerdos incompletos.",
    formLabel: "Solicitar registros FOIA",
    officialUrl:
      "https://www.uscis.gov/records/request-records-through-the-freedom-of-information-act-or-privacy-act",
    sections: [
      {
        heading: "Una solicitud con propósito",
        paragraphs: [
          "Samuel recordaba haber presentado una solicitud años atrás, pero no conservaba copia, no conocía el número de recibo y no sabía qué información había quedado registrada. Antes de iniciar otro trámite, la prioridad fue dejar de depender de recuerdos incompletos.",
          "Primero se hizo una lista de lo que sí conocía: nombres usados, A-Number si existía, fechas aproximadas, direcciones anteriores y posibles agencias involucradas. Esa información permitió preparar una solicitud de registros más precisa.",
        ],
      },
      {
        heading: "La espera también se organiza",
        paragraphs: [
          "USCIS, CBP y otras agencias no conservan necesariamente los mismos documentos. Identificar quién pudo generar cada registro evitó tratar una sola solicitud como si fuera la respuesta universal.",
        ],
        bullets: [
          "Se guardó la confirmación de cada solicitud.",
          "Se registró la fecha y la agencia correspondiente.",
          "Se creó una carpeta separada para cada respuesta.",
          "No se preparó un trámite nuevo a partir de suposiciones.",
        ],
        quote:
          "Cuando falta una parte importante del historial, recuperar el documento puede ser más valioso que intentar recordar la respuesta perfecta.",
      },
      {
        heading: "Lo que FOIA no hace",
        paragraphs: [
          "Recibir registros no determina por sí solo qué beneficio migratorio corresponde ni resuelve cuestiones legales complejas. Si el expediente muestra una orden, comparecencias, fraude, falsa ciudadanía u otra señal sensible, la revisión debe pasar a un abogado de inmigración.",
          "El nombre y ciertos detalles fueron modificados para proteger la identidad de la persona atendida.",
        ],
      },
    ],
  },
  {
    slug: "ciudadania-preparacion",
    category: "Ciudadanía",
    readingTime: "7 min",
    publishedAt: "2026-09-08",
    title: "Ciudadanía: preparar la entrevista empieza mucho antes",
    excerpt:
      "Un método para revisar viajes, domicilios, impuestos y antecedentes con suficiente tiempo.",
    dek: "La preparación administrativa que permitió llegar a la entrevista con respuestas verificadas y documentos localizables.",
    formLabel: "Formulario N-400",
    officialUrl: "https://www.uscis.gov/n-400",
    sections: [
      {
        heading: "La línea de tiempo fue el documento principal",
        paragraphs: [
          "Elena había sido residente permanente durante años y pensaba que su solicitud sería cuestión de copiar los datos de su Green Card. Al revisar los requisitos, comprendió que la historia relevante era mucho más amplia: viajes, domicilios, empleos, impuestos, matrimonio y cualquier contacto con autoridades.",
          "Antes de completar la solicitud reunió pasaportes actuales y vencidos, registros de viajes, declaraciones de impuestos y una lista de sus domicilios y trabajos. La cronología mostró un viaje más largo de lo que recordaba. Ese dato merecía una revisión cuidadosa antes de presentar.",
        ],
      },
      {
        heading: "Prepararse no es ensayar una actuación",
        paragraphs: [
          "Elena practicó el vocabulario básico de su solicitud y organizó originales y copias. No memorizó frases para sonar bien; se aseguró de entender cada respuesta que llevaba su nombre.",
        ],
        quote:
          "La confianza el día de la entrevista nace de haber revisado la verdad con tiempo, no de aprender respuestas de memoria.",
      },
      {
        heading: "Un límite importante",
        paragraphs: [
          "Viajes prolongados, antecedentes, problemas fiscales, información incorrecta en trámites anteriores o dudas sobre buen carácter moral pueden requerir asesoría legal. La preparación documental ayuda a identificar esas señales; no reemplaza el análisis de un abogado.",
          "La identidad y algunos detalles de esta experiencia fueron modificados por confidencialidad.",
        ],
      },
    ],
  },
  {
    slug: "renovar-green-card",
    category: "Documentos",
    readingTime: "5 min",
    publishedAt: "2026-09-04",
    title: "Green Card por vencer: el recordatorio que evitó una carrera",
    excerpt:
      "Cómo crear un sistema sencillo para renovación, copias y seguimiento del Formulario I-90.",
    dek: "Una historia práctica sobre fechas, evidencia y el valor de no esperar al último momento.",
    formLabel: "Formulario I-90",
    officialUrl: "https://www.uscis.gov/i-90",
    sections: [
      {
        heading: "El checklist de una página",
        paragraphs: [
          "Marco descubrió la fecha de vencimiento de su Green Card al completar un formulario de trabajo. Faltaban pocos meses y no encontraba una copia clara del frente y reverso. En lugar de improvisar, creó un pequeño expediente de renovación.",
          "La carpeta incluyó copia legible de la tarjeta, identificación, historial de nombres, dirección actual y cualquier evidencia relacionada con un error o cambio que necesitara explicar. También verificó si el Formulario I-90 era el procedimiento correcto para su situación concreta.",
        ],
      },
      {
        heading: "Recibo, extensión y evidencia",
        paragraphs: [
          "Después de presentar, Marco conservó el aviso de recibo junto con la tarjeta. No asumió qué documento extendía su evidencia de estatus: leyó el texto exacto del aviso recibido y las instrucciones oficiales vigentes.",
        ],
        quote:
          "Una fecha de vencimiento no debe descubrirse por accidente. Debe vivir en tu calendario y en tu carpeta.",
      },
      {
        heading: "El hábito que quedó",
        paragraphs: [
          "Además del recordatorio principal, creó alertas para revisar su dirección postal y el estado del caso. El proceso no se volvió instantáneo, pero sí dejó de depender de la memoria.",
          "El nombre y algunos detalles fueron modificados. La información se ofrece con fines educativos y no garantiza un resultado migratorio.",
        ],
      },
    ],
  },
  {
    slug: "recibos-y-seguimiento",
    category: "Documentos",
    readingTime: "6 min",
    publishedAt: "2026-08-30",
    title: "El recibo de USCIS no es solo una carta",
    excerpt:
      "Qué comprobar al recibirlo y cómo mantener varios números de caso bajo control.",
    dek: "Una experiencia para pasar del sobre recién abierto a un sistema de seguimiento confiable.",
    formLabel: "Estatus de caso en línea",
    officialUrl: "https://egov.uscis.gov/",
    sections: [
      {
        heading: "La revisión de cinco minutos",
        paragraphs: [
          "Cuando llegó el primer aviso, Ana solo miró una palabra: received. Guardó la carta y siguió con su día. Semanas después necesitaba consultar el caso y no recordaba dónde estaba. La solución fue convertir cada aviso en una acción concreta.",
        ],
        bullets: [
          "Confirmar que nombre y dirección estuvieran correctos.",
          "Identificar el tipo de formulario y la fecha de recibo.",
          "Guardar el número de recibo sin compartirlo públicamente.",
          "Leer cualquier instrucción o próxima cita.",
          "Escanear el documento completo, por ambos lados si aplica.",
        ],
      },
      {
        heading: "Un tablero simple",
        paragraphs: [
          "Ana creó una tabla con una fila por trámite. No mezcló el número de una petición con el de una solicitud relacionada. Cada actualización recibió fecha y una copia del aviso correspondiente.",
        ],
        quote:
          "El portal ayuda a seguir el caso, pero la carta sigue siendo parte de tu expediente.",
      },
      {
        heading: "Cuando algo no coincide",
        paragraphs: [
          "Un error en el nombre, domicilio o tipo de caso no debe ignorarse. Se deben revisar las instrucciones oficiales para solicitar corrección y conservar evidencia de la gestión. Para preguntas legales o consecuencias migratorias, corresponde consultar a un abogado.",
          "La identidad y varios detalles se modificaron para respetar la privacidad de la persona atendida.",
        ],
      },
    ],
  },
];

export const myRootsCategories = [
  "Todos",
  "Familia",
  "Ajuste",
  "Documentos",
  "Ciudadanía",
] as const;

export function getMyRootsArticle(slug: string) {
  return myRootsArticles.find((article) => article.slug === slug);
}
