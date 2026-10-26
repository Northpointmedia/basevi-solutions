export type MyRootsSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
};

export type MyRootsArticle = {
  slug: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  verifiedAt?: string;
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
    slug: "carta-uscis-pasos",
    category: "Documentos",
    readingTime: "7 min",
    publishedAt: "2026-10-26",
    verifiedAt: "2026-10-26",
    title: "Llegó una carta de USCIS: 7 pasos antes de archivarla",
    excerpt:
      "Cómo identificar el aviso, proteger los plazos y mantener cada número de recibo bajo control.",
    dek: "Una carta de USCIS puede ser un recibo, una cita, una solicitud de evidencia o una decisión. Este checklist te ayuda a revisar lo importante antes de guardarla.",
    formLabel: "Consultas por avisos no recibidos",
    officialUrl: "https://egov.uscis.gov/e-request/ndn",
    featured: true,
    sections: [
      {
        heading: "Primero: identifica qué recibiste",
        paragraphs: [
          "Lee el encabezado y todas las páginas. USCIS puede enviar avisos de recibo, citas biométricas o entrevistas, solicitudes de evidencia —como un RFE— y decisiones. Cada aviso exige una respuesta distinta, y algunos incluyen una fecha límite o una dirección específica.",
          "Comprueba el nombre, la dirección, el A-Number cuando aparezca, el formulario relacionado y la fecha del aviso. Si hay un error o una consecuencia legal importante, no adivines la respuesta: sigue las instrucciones del documento y busca asesoría jurídica autorizada cuando corresponda.",
        ],
      },
      {
        heading: "El checklist de siete pasos",
        paragraphs: [
          "USCIS identifica cada solicitud o petición mediante un número de recibo único de 13 caracteres: tres letras seguidas de diez números. Formularios relacionados —por ejemplo, I-130, I-485 e I-765— pueden tener números distintos y deben controlarse por separado.",
        ],
        bullets: [
          "Identifica el tipo de aviso y el formulario al que corresponde.",
          "Revisa nombre, dirección, A-Number y demás datos personales.",
          "Registra el número de recibo sin publicarlo en redes sociales.",
          "Anota la fecha del aviso, cualquier cita y el plazo exacto de respuesta.",
          "Escanea todas las páginas y conserva el original y el sobre.",
          "Consulta cada número por separado en Case Status Online o en tu cuenta de USCIS.",
          "Responde siguiendo la dirección, el formato y las instrucciones del propio aviso.",
        ],
        quote:
          "Una carta de USCIS no es solo correspondencia: puede contener el número, la fecha o la instrucción que protege tu trámite.",
      },
      {
        heading: "Si el portal muestra un aviso que nunca llegó",
        paragraphs: [
          "USCIS ofrece una consulta electrónica por falta de entrega. Antes de enviarla, comprueba Case Status Online y tu cuenta digital. La herramienta oficial indica que un aviso de recibo normalmente debe llegar dentro de 30 días después de presentar ante un Service Center o Lockbox, pero también pide no consultar una presentación reciente hasta que hayan transcurrido al menos 60 días.",
          "Un RFE, NOID, aviso de comparecencia o decisión con posibles consecuencias migratorias merece revisión cuidadosa. BaseviSolutions puede apoyar con organización documental, pero no sustituye a un abogado de inmigración.",
        ],
      },
    ],
  },
  {
    slug: "examen-medico-i-693",
    category: "Ajuste",
    readingTime: "8 min",
    publishedAt: "2026-10-26",
    verifiedAt: "2026-10-26",
    title: "Examen médico I-693: 7 cosas que debes saber antes de reservar",
    excerpt:
      "Qué verificar sobre el médico, el precio, los documentos y el sobre sellado antes de tu cita.",
    dek: "Una guía práctica para comparar clínicas y preparar correctamente el examen médico migratorio requerido en muchos ajustes de estatus.",
    formLabel: "Formulario I-693 y médicos autorizados",
    officialUrl: "https://www.uscis.gov/i-693",
    sections: [
      {
        heading: "No cualquier médico puede completarlo",
        paragraphs: [
          "Para la mayoría de los ajustes de estatus realizados dentro de Estados Unidos, el examen debe hacerlo un civil surgeon designado por USCIS. Verifica al profesional en el buscador oficial cerca de la fecha de la cita; la lista se actualiza y un médico de cabecera no queda autorizado por el simple hecho de tener licencia.",
          "Llama a varias clínicas. USCIS advierte que los precios pueden variar por cientos de dólares. Pregunta si la tarifa incluye examen, análisis de laboratorio, vacunas necesarias, visitas de seguimiento, copia para tu archivo y cualquier cargo adicional.",
        ],
      },
      {
        heading: "Qué llevar y qué debes recibir",
        paragraphs: [
          "Lleva la edición vigente del Formulario I-693, una identificación oficial con fotografía, tu historial de vacunación, información médica relevante y la forma de pago aceptada. Confirma con la clínica si acepta seguro, porque muchos planes no cubren todas las partes del examen migratorio.",
        ],
        bullets: [
          "Comprueba que el médico figure como civil surgeon autorizado.",
          "Pregunta exactamente qué está incluido en el precio anunciado.",
          "Lleva registros de vacunas legibles y completos.",
          "Solicita una copia del I-693 terminado para tu archivo personal.",
          "No abras ni alteres el sobre sellado que entregarás a USCIS.",
        ],
        quote:
          "El precio más bajo no siempre incluye vacunas, análisis y visitas adicionales: pregunta antes de pagar.",
      },
      {
        heading: "Presentación y vigencia actual",
        paragraphs: [
          "USCIS exige que ciertos solicitantes presenten el I-693 junto con el I-485 o la solicitud puede ser rechazada. Sigue siempre las instrucciones vigentes para tu categoría concreta. El civil surgeon entrega el original dentro de un sobre sellado; USCIS no acepta el formulario si el sobre fue abierto o alterado.",
          "Desde el 11 de junio de 2025, un I-693 correctamente completado y firmado por un civil surgeon el 1 de noviembre de 2023 o después generalmente solo es válido mientras permanece pendiente la solicitud migratoria con la que fue presentado. Si esa solicitud se retira o es denegada, se necesita un nuevo I-693 para una solicitud futura que lo requiera.",
        ],
      },
    ],
  },
  {
    slug: "nombres-diferentes-documentos",
    category: "Familia",
    readingTime: "7 min",
    publishedAt: "2026-10-26",
    verifiedAt: "2026-10-26",
    title: "El segundo nombre que no aparecía: ordenar la identidad antes de presentar",
    excerpt:
      "Cómo comparar actas, pasaportes y documentos migratorios cuando los nombres no coinciden exactamente.",
    dek: "Una diferencia de nombre no debe ocultarse ni explicarse con suposiciones. La clave es identificar qué documento muestra cada versión y si existe evidencia legal del cambio.",
    formLabel: "Instrucciones oficiales del Formulario I-130",
    officialUrl: "https://www.uscis.gov/sites/default/files/document/forms/i-130instr.pdf",
    sections: [
      {
        heading: "Una diferencia pequeña puede necesitar contexto",
        paragraphs: [
          "En esta historia anonimizada, “Teresa” quería presentar una petición para su hijo adulto. Su acta de nacimiento mostraba dos nombres, mientras que la Green Card y el pasaporte utilizaban una versión más corta. El objetivo no fue hacer que todos los documentos parecieran iguales, sino comprender y documentar la diferencia.",
          "Se creó una tabla con el nombre exacto en cada documento, la fecha y el país de expedición, los nombres utilizados en trámites anteriores y la existencia —o no— de un cambio legal.",
        ],
      },
      {
        heading: "Qué indican las instrucciones del I-130",
        paragraphs: [
          "Las instrucciones oficiales señalan que, si el peticionario o el beneficiario usa un nombre distinto al mostrado en los documentos relevantes, deben presentarse copias de la evidencia legal del cambio, como un certificado de matrimonio, decreto de adopción u orden judicial.",
          "Eso no significa que toda diferencia sea necesariamente un cambio legal. Un nombre omitido, una transliteración o un error puede tener otra explicación. No inventes una causa: reúne los documentos y determina cuál es la explicación verdadera antes de presentar.",
        ],
        quote:
          "La consistencia no consiste en hacer que todos los documentos parezcan iguales, sino en explicar correctamente por qué son diferentes.",
      },
      {
        heading: "Una revisión útil antes del envío",
        paragraphs: [
          "Compara actas civiles, pasaportes, Green Cards, visas, avisos anteriores y traducciones. Registra también otros nombres utilizados cuando el formulario los solicite. Las traducciones deben ser completas y certificadas conforme a las instrucciones aplicables.",
          "Si existe una identidad dudosa, un antecedente de fraude, documentos contradictorios o una corrección civil compleja, consulta a un abogado de inmigración autorizado. BaseviSolutions puede ayudar a organizar la documentación, no a emitir una conclusión jurídica.",
        ],
      },
    ],
  },
  {
    slug: "tarifa-anual-asilo",
    category: "Actualidad",
    readingTime: "7 min",
    publishedAt: "2026-10-26",
    verifiedAt: "2026-10-26",
    title: "Tarifa anual de asilo: qué deben revisar los solicitantes",
    excerpt:
      "Quién puede recibir el aviso, cómo funciona el portal reabierto y qué comprobantes conviene conservar.",
    dek: "USCIS mantiene disponible el pago para ciertos casos con una tarifa anual pendiente mientras continúa el litigio federal. Antes de pagar, revisa tu aviso y utiliza únicamente el portal oficial.",
    formLabel: "Portal oficial de la tarifa anual de asilo",
    officialUrl: "https://my.uscis.gov/accounts/annual-asylum-fee/start/overview",
    sections: [
      {
        heading: "La situación vigente",
        paragraphs: [
          "El portal oficial de USCIS informa que, el 5 de agosto de 2026, un tribunal federal de Massachusetts suspendió la aplicación de consecuencias por no pagar la Annual Asylum Fee bajo la regla provisional del 29 de abril de 2026. Mientras el tribunal emite una decisión final, USCIS permite que ciertos solicitantes que no pagaron dentro del plazo indicado completen el pago pendiente.",
          "Esta situación puede cambiar con el litigio. Revisa la alerta oficial y la fecha de tu propio aviso inmediatamente antes de tomar una decisión.",
        ],
      },
      {
        heading: "Quién debe revisar sus avisos",
        paragraphs: [
          "Según USCIS, debe pagar la tarifa quien mantuvo una solicitud de asilo pendiente durante todo el periodo del 1 de octubre de 2024 al 30 de septiembre de 2025. También puede corresponder a quien presentó un I-589 después del 1 de octubre de 2024 y lo mantuvo pendiente durante 365 días, en el aniversario de presentación y en años posteriores mientras siga pendiente.",
          "USCIS indica que enviará avisos individuales la primera vez que corresponda el pago, con el importe, la fecha límite, la forma de pago y las consecuencias aplicables. No pagues basándote únicamente en un mensaje, una publicación o un enlace reenviado.",
        ],
        bullets: [
          "Confirma que el aviso pertenezca a tu caso y revisa la fecha límite.",
          "Utiliza únicamente el portal oficial de USCIS y Pay.gov.",
          "Ten disponibles el A-Number y el número de recibo indicados.",
          "Guarda el aviso, la confirmación y el recibo del pago.",
          "Vuelve a comprobar la alerta oficial porque el litigio continúa.",
        ],
        quote:
          "Una tarifa pendiente no debe resolverse desde un enlace recibido por mensaje: confirma primero el aviso y paga únicamente en un sitio oficial.",
      },
      {
        heading: "Lo que el pago no significa",
        paragraphs: [
          "Pagar la tarifa no aprueba ni acelera la solicitud de asilo. El portal advierte además que las tarifas no son reembolsables, con independencia de la decisión o del tiempo de procesamiento.",
          "Si dudas de que la tarifa corresponda a tu caso, recibiste comunicaciones contradictorias o tu expediente tiene consecuencias legales sensibles, busca asesoría de un abogado de inmigración autorizado antes de actuar.",
        ],
      },
    ],
  },
  {
    slug: "cambio-direccion-uscis",
    category: "Documentos",
    readingTime: "7 min",
    publishedAt: "2026-10-26",
    verifiedAt: "2026-10-26",
    title: "¿Te mudaste? Cambiar tu dirección con USPS no actualiza USCIS",
    excerpt:
      "Los pasos para actualizar tus casos, proteger tus avisos y conservar la confirmación del cambio.",
    dek: "El reenvío postal no modifica la dirección registrada en USCIS y USPS no reenvía el correo de USCIS. Ambos sistemas deben actualizarse por separado.",
    formLabel: "Cambio de dirección en USCIS",
    officialUrl: "https://www.uscis.gov/addresschange",
    sections: [
      {
        heading: "Dos actualizaciones distintas",
        paragraphs: [
          "USCIS indica que cambiar la dirección con USPS no cambia la dirección registrada en USCIS y que USPS no reenvía el correo de USCIS. Actualiza ambos sistemas por separado para reducir el riesgo de perder avisos o documentos.",
          "En general, las personas extranjeras que se encuentran en Estados Unidos deben comunicar el cambio a USCIS dentro de los 10 días siguientes a la mudanza. La página oficial identifica excepciones para titulares de visas A y G y visitantes bajo el Visa Waiver Program.",
        ],
      },
      {
        heading: "Cómo proteger todos los casos pendientes",
        paragraphs: [
          "USCIS recomienda utilizar la herramienta Enterprise Change of Address dentro de la cuenta online. Si tienes solicitudes pendientes, introduce el número de recibo de cada una para aplicar correctamente el cambio. Un I-130, I-485 e I-765 relacionados pueden tener números distintos.",
        ],
        bullets: [
          "Actualiza USCIS y USPS por separado.",
          "Incluye cada número de recibo pendiente.",
          "Guarda la confirmación y una captura o copia de la gestión.",
          "Revisa después tu perfil y cada caso vinculado.",
          "Si el beneficiario está en proceso consular, revisa también las instrucciones del Departamento de Estado o NVC.",
        ],
        quote:
          "Cambiar tu dirección no termina en USPS: USCIS necesita recibir la actualización directamente.",
      },
      {
        heading: "Situaciones con instrucciones especiales",
        paragraphs: [
          "Quienes presentaron o tienen casos VAWA, T, U, determinadas solicitudes relacionadas o una exención por abuso en el I-751 deben seguir procedimientos especiales de protección de dirección. No utilices el proceso general sin revisar esa sección oficial.",
          "Además, un patrocinador que presentó el Formulario I-864 y cuya obligación continúa debe presentar el Formulario I-865 dentro de los 30 días posteriores a su mudanza. Si un aviso o documento ya fue enviado a la dirección anterior, utiliza las herramientas oficiales de no entrega o contacta a USCIS según las instrucciones aplicables.",
        ],
      },
    ],
  },
  {
    slug: "despues-huellas-uscis",
    category: "Proceso",
    readingTime: "7 min",
    publishedAt: "2026-10-26",
    verifiedAt: "2026-10-26",
    title: "Ya hice mis huellas con USCIS: ¿qué sucede ahora?",
    excerpt:
      "Para qué utiliza USCIS los biométricos, qué puede ocurrir después y qué documentos debes conservar.",
    dek: "Completar las huellas es un paso importante, pero no equivale a una aprobación ni permite predecir la fecha de la decisión.",
    formLabel: "Preparación para una cita biométrica",
    officialUrl: "https://www.uscis.gov/forms/filing-guidance/preparing-for-your-biometric-services-appointment",
    sections: [
      {
        heading: "Qué hace USCIS con los biométricos",
        paragraphs: [
          "Según el tipo de solicitud, USCIS puede tomar huellas, fotografía y firma para verificar identidad y realizar controles de antecedentes y seguridad. USCIS también puede usar los biométricos para determinar elegibilidad o producir documentos migratorios.",
          "En algunos procesos, las huellas se envían al FBI para una comprobación de antecedentes. Si la calidad no es suficiente, USCIS puede emitir otra cita. Sigue siempre el aviso que recibas; los requisitos varían según el formulario y el caso.",
        ],
        quote:
          "Las huellas ayudan a confirmar tu identidad; no deciden por sí solas el resultado de tu caso.",
      },
      {
        heading: "Qué puede venir después",
        paragraphs: [
          "Después de la cita, el caso puede continuar en revisión, recibir una solicitud de evidencia, pasar a entrevista, generar otra comunicación o llegar a una decisión. Dos personas con trámites parecidos pueden recibir actualizaciones distintas porque la secuencia depende del formulario, la oficina y las circunstancias del expediente.",
          "Un mensaje como “Case Is Being Actively Reviewed” es una actualización de estado, no una aprobación ni una promesa de plazo. Consulta cada número de recibo individualmente en Case Status Online o en tu cuenta de USCIS.",
        ],
      },
      {
        heading: "Lo que sí puedes controlar",
        paragraphs: [
          "Conserva el aviso de cita y cualquier sello o constancia recibida, revisa que USCIS tenga tu dirección actual y guarda cada aviso posterior. No publiques números de recibo completos ni A-Numbers en redes sociales.",
        ],
        bullets: [
          "Archiva el aviso biométrico con el expediente correspondiente.",
          "Revisa el estado de cada solicitud por separado.",
          "Mantén actualizada tu dirección con USCIS.",
          "Responde dentro del plazo si llega un RFE u otro aviso.",
          "Consulta a un abogado si aparece una cuestión legal o de elegibilidad.",
        ],
      },
    ],
  },
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
  "Proceso",
  "Actualidad",
] as const;

export function getMyRootsArticle(slug: string) {
  return myRootsArticles.find((article) => article.slug === slug);
}
