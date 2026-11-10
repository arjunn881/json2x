import type { Lang } from './ui';

export interface HomePageBundle {
  title: string;
  description: string;
  keywords: string;
  itemListName: string;
  heroSectionAria: string;
  heroPromptCmd: string;
  heroTitleBefore: string;
  heroTitleAccent: string;
  heroTitleAfter: string;
  heroSub: string;
  heroBtnFormatter: string;
  heroBtnAllTools: string;
  trustClientSide: string;
  trustZeroLatency: string;
  trustNoTracking: string;
  terminalTitle: string;
  terminalComment: string;
  terminalStatus: string;
  credibilityAria: string;
  credibilityCards: [
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string }
  ];
  toolsSectionAria: string;
  toolsSectionTag: string;
  toolsSectionTitle: string;
  cardSnippets: Record<string, string>;
  editorialAria: string;
  editorialEyebrow: string;
  editorialTitle: string;
  editorialIntro: string;
  editorialSec1Title: string;
  editorialSec1P1: string;
  editorialSec1P2: string;
  editorialSec2Title: string;
  editorialSec2Intro: string;
  editorialSec2Rules: { bold: string; text: string }[];
  editorialSec3Title: string;
  editorialSec3Intro: string;
  tableHeaders: [string, string, string, string, string];
  tableRows: [string, string, string, string, string][];
  editorialSec4Title: string;
  editorialFaqs: { q: string; a: string }[];
  hubAria: string;
  hubTitle: string;
  hubLead: string;
  hubLangBadge: string;
  hubItems: [
    { href: string; title: string; desc: string },
    { href: string; title: string; desc: string },
    { href: string; title: string; desc: string }
  ];
}

export interface ToolsCatalogBundle {
  title: string;
  description: string;
  keywords: string;
  schemaName: string;
  badgeTemplate: string;
  h1: string;
  lead: string;
  filterAria: string;
  allToolsLabel: string;
  utilitiesUnit: string;
}

export interface FaqCategoryBundle {
  id: 'privacy' | 'tools' | 'performance' | 'standards' | 'legal';
  pillLabel: string;
  title: string;
  items: { q: string; a: string; keywords: string }[];
}

export interface FaqPageBundle {
  title: string;
  description: string;
  keywords: string;
  badge: string;
  h1: string;
  desc: string;
  lastUpdated: string;
  verifiedTrust: string;
  searchPlaceholder: string;
  searchAria: string;
  pillsAria: string;
  allTopicsLabel: string;
  noResultsTitle: string;
  noResultsHint: string;
  categories: FaqCategoryBundle[];
}

export interface AboutPageBundle {
  title: string;
  description: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  lead: string;
  whyTitle: string;
  whyParagraphs: [string, string, string];
  principlesTitle: string;
  principles: [
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string }
  ];
  allToolsTitle: string;
  contactTitle: string;
  contactDesc: string;
}

export interface HubPageMetaBundle {
  title: string;
  description: string;
  keywords: string;
  schemaName: string;
  badge: string;
  h1: string;
  desc: string;
  englishNotice: string;
  categoryLabels?: Record<string, string>;
}

export interface LocalizedPagesBundle {
  home: HomePageBundle;
  toolsCatalog: ToolsCatalogBundle;
  faq: FaqPageBundle;
  about: AboutPageBundle;
  docsHub: HubPageMetaBundle;
  kbHub: HubPageMetaBundle;
  blogHub: HubPageMetaBundle;
}

const esPages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — Herramientas JSON y CSV Online Gratis para Desarrolladores (100% Privado)',
    description: '21 herramientas JSON y CSV gratis y sin subir datos: formateador, validador RFC 8259, minificador, comparador diff, visor de árbol y conversor a CSV, YAML, XML, SQL, TypeScript y Zod.',
    keywords: 'herramientas json online gratis, formateador json sin subir datos, validador json rfc 8259 online, convertir json a csv excel gratis, json a typescript zod online, comparar dos json diff, visor arbol json online, suite utilidades json para programadores, limpiar validar json en el navegador privado, json a yaml xml toml sql gratis, herramientas json offline sin registro, depurar errores respuesta api json rapido, abrir archivos json pesados con web worker, generador prisma drizzle graphql desde json, convertir payloads json a modelos backend',
    itemListName: 'JSON2X — Todas las Herramientas JSON y CSV',
    heroSectionAria: 'Presentación de JSON2X',
    heroPromptCmd: 'json2x --rapido --privado',
    heroTitleBefore: 'Herramientas ',
    heroTitleAccent: 'JSON y CSV',
    heroTitleAfter: ' 100% en tu Navegador para Desarrolladores',
    heroSub: 'Veintiuna utilidades ultrarrápidas y locales. Formatea, valida, minifica, compara diffs, consulta con JSONPath y convierte a CSV, YAML, XML, SQL o modelos TypeScript y Zod sin enviar ni un byte a servidores externos.',
    heroBtnFormatter: 'abrir_formateador()',
    heroBtnAllTools: '// ver_todas_las_herramientas (21)',
    trustClientSide: '100% en tu Navegador',
    trustZeroLatency: 'Cero Latencia de Servidor',
    trustNoTracking: 'Sin Registro ni Rastreo',
    terminalTitle: 'motor_json2x.ts — 0 KB en red',
    terminalComment: '// Demostración en vivo de análisis local en cliente',
    terminalStatus: 'local',
    credibilityAria: 'Garantías Técnicas de Privacidad y Rendimiento',
    credibilityCards: [
      {
        title: 'Privacidad con Web Worker',
        desc: 'Todo el análisis, validación y formateo se ejecuta estrictamente en memoria del navegador. Tokens JWT, claves API y datos PII nunca salen de tu equipo.'
      },
      {
        title: 'Cero Latencia de Red',
        desc: 'Sin viajes de ida y vuelta a servidores remotos. Payloads JSON de varios megabytes se procesan al instante a velocidad nativa de V8.'
      },
      {
        title: 'Conforme a IETF RFC 8259',
        desc: 'Validación estricta con línea y columna exactas, detección de comas finales, claves sin comillas y escapes Unicode inválidos.'
      },
      {
        title: 'Listo para Offline y PWA',
        desc: 'Almacenado en caché automáticamente en tu navegador. Funciona sin conexión en vuelos, trenes o entornos corporativos aislados.'
      }
    ],
    toolsSectionAria: 'Todas las herramientas JSON',
    toolsSectionTag: '$ ls ./herramientas/',
    toolsSectionTitle: 'Utilidades para Desarrolladores (21)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': 'Línea 4, Col 12: Coma final prohibida',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "estado": 200  + "estado": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (CSV Excel BOM)',
      'csv-to-json': 'nombre,edad → [{"nombre":"Ana","edad":28}]',
      'json-to-yaml': '{"app":"api"} → app: api',
      'json-to-xml': '{"id":1} → <root><id>1</id></root>',
      'json-to-toml': '{"titulo":"App"} → titulo = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → type Auto struct / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"nombre":"Lucía"}]',
      'jsonpath': '$.tienda.libro[*].autor',
      'json-tree-viewer': 'objeto [3 claves] → usuario'
    },
    editorialAria: 'Guía de Arquitectura e Ingeniería JSON',
    editorialEyebrow: 'Arquitectura de Ingeniería',
    editorialTitle: 'Mecánica Técnica del Intercambio de Datos JSON y Estructurados',
    editorialIntro: 'JavaScript Object Notation (JSON) es el estándar universal para el intercambio de datos en la web. Definido en IETF RFC 8259 y ECMA-404, ofrece un formato ligero e independiente del lenguaje para APIs REST, microservicios, bases de datos NoSQL y configuraciones modernas.',
    editorialSec1Title: '1. Análisis Local en Cliente vs. Riesgos de Seguridad en Servidor',
    editorialSec1P1: 'Cuando un desarrollador pega payloads con tokens Bearer, cadenas de conexión SQL o registros de clientes en formateadores tradicionales basados en servidor, esa información viaja por internet y puede quedar registrada en logs o servidores externos, generando riesgos críticos frente al RGPD/GDPR y normativas de seguridad.',
    editorialSec1P2: 'JSON2X elimina ese riesgo de raíz: cada formateador, validador, conversor y generador de código se ejecuta 100 % en el motor JavaScript de tu navegador (V8 / SpiderMonkey / JavaScriptCore). Ni un solo byte sale de tu dispositivo.',
    editorialSec2Title: '2. Cumplimiento Estricto RFC 8259 y Reglas de Sintaxis',
    editorialSec2Intro: 'Un analizador conforme a IETF RFC 8259 aplica reglas estrictas que diferencian un JSON válido de un literal de objeto JavaScript:',
    editorialSec2Rules: [
      { bold: 'Comillas dobles obligatorias:', text: 'Todas las claves y valores de texto deben ir entre comillas dobles ("clave"). Las comillas simples provocan error de sintaxis.' },
      { bold: 'Sin comas finales:', text: 'Las comas después del último elemento de un objeto o array (trailing commas) están prohibidas en JSON estándar.' },
      { bold: 'Escape de caracteres de control:', text: 'Saltos de línea o tabulaciones dentro de cadenas deben escaparse como \\n, \\t o secuencias Unicode \\uXXXX.' },
      { bold: 'Formato numérico válido:', text: 'No se permiten ceros a la izquierda (0123) ni constantes como NaN o Infinity.' }
    ],
    editorialSec3Title: '3. Matriz Comparativa de Formatos: JSON vs CSV vs YAML vs XML vs SQL',
    editorialSec3Intro: 'Cada capa de software exige el formato de serialización adecuado según su caso de uso:',
    tableHeaders: ['Formato', 'Caso de Uso Principal', 'Legibilidad Humana', 'Soporte Anidado', 'Velocidad de Parseo'],
    tableRows: [
      ['JSON', 'APIs REST, NoSQL, Configs', 'Alta', 'Nativo (Objetos/Arrays)', 'Ultrarrápida (Nativa JS)'],
      ['CSV', 'Excel, Hojas de Cálculo, BI', 'Media', 'Plano (requiere notación de puntos)', 'Rápida (Flujo tabular)'],
      ['YAML', 'Kubernetes, CI/CD, Docker', 'Muy Alta', 'Nativo (por indentación)', 'Moderada'],
      ['XML', 'SOAP, Facturación, Enterprise', 'Media', 'Nativo (Etiquetas)', 'Moderada (Parser DOM)'],
      ['SQL', 'Bases Relacionales DDL/DML', 'Alta', 'Relacional (FK / JSONB)', 'Rápida (Motor DB)']
    ],
    editorialSec4Title: '4. Preguntas Frecuentes (FAQ)',
    editorialFaqs: [
      {
        q: '¿JSON2X es 100% gratis para uso comercial y empresarial?',
        a: 'Sí. Todas las 21 utilidades, generadores de esquemas y herramientas de conversión son completamente gratuitas, sin límites diarios ni necesidad de crear cuenta.'
      },
      {
        q: '¿Qué tamaño máximo de archivo JSON puedo procesar?',
        a: 'Al procesarse en la memoria local de tu equipo con apoyo de Web Workers, puedes formatear, validar y consultar archivos de 50 MB a 100 MB+ según la RAM disponible sin saturar el navegador.'
      },
      {
        q: '¿JSON2X guarda o registra el código JSON que pego?',
        a: 'Nunca. No tenemos servidor backend ni base de datos que reciba tu contenido. Puedes comprobar en la pestaña Red (Network) de DevTools que se realizan 0 peticiones al procesar datos.'
      }
    ],
    hubAria: 'Documentación Técnica y Guías',
    hubTitle: 'Documentación y Guías de Ingeniería',
    hubLead: 'Especificaciones detalladas, optimizaciones de rendimiento con Web Workers y patrones de validación para ingenieros.',
    hubLangBadge: 'Artículos técnicos completos disponibles en inglés (EN)',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Procesar Archivos JSON Grandes con Web Workers (EN)',
        desc: 'Evita bloqueos del hilo principal de la interfaz al analizar archivos JSON de decenas de megabytes de forma asíncrona.'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'Guía de Interfaces TypeScript y Esquemas Zod (EN)',
        desc: 'Cómo generar tipos estáticos estrictos en TypeScript y validación en tiempo de ejecución con Zod a partir de respuestas API.'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'Referencia Oficial IETF RFC 8259 JSON (EN)',
        desc: 'Desglose completo de reglas de gramática, tipos de datos, caracteres de escape y restricciones estrictas.'
      }
    ]
  },
  toolsCatalog: {
    title: 'Catálogo de 21 Herramientas JSON y CSV Gratis Online — JSON2X',
    description: 'Directorio completo con 21 utilidades gratuitas para JSON y CSV en el navegador: formateador, validador, minificador, comparador diff, conversores YAML/XML/TOML/SQL y generadores TypeScript, Zod, Prisma y GraphQL.',
    keywords: 'catalogo herramientas json gratis, herramientas json online desarrolladores, conversor json multiple gratis, generador esquemas typescript zod prisma online, utilidades csv json navegador, todas las herramientas json2x sin registro, directorio formateador validador minificador diff json, convertir json a go rust python graphql gratis, generador datos mock y jsonpath online, suite completa desarrolladores api cliente seguro, utilidades datos locales sin enviar servidores, formatear validar json gratis navegador, abrir json grande vista arbol, herramientas json offline pwa españa latinoamerica',
    schemaName: 'Suite de Herramientas de Desarrollo JSON2X',
    badgeTemplate: 'Catálogo ({count} Utilidades)',
    h1: 'Catálogo Completo de Herramientas JSON y CSV',
    lead: 'Las 21 herramientas funcionan al 100 % localmente en tu navegador sin latencia ni fuga de datos, organizadas por categoría técnica.',
    filterAria: 'Filtrar herramientas por categoría',
    allToolsLabel: 'Todas',
    utilitiesUnit: 'Herramientas'
  },
  faq: {
    title: 'Preguntas Frecuentes (FAQ) sobre Privacidad y Herramientas JSON | JSON2X',
    description: 'Respuestas detalladas sobre la seguridad local en el navegador, rendimiento con Web Workers, cumplimiento IETF RFC 8259, límites de tamaño y licencia MIT de JSON2X.',
    keywords: 'preguntas frecuentes json2x, formateador json seguro privado sin servidor, limite tamano archivo json navegador, errores sintaxis json rfc 8259 como solucionar, privacidad rgpd herramientas json locales, como procesar json 100mb en navegador, csv excel tildes utf-8 bom preguntas frecuentes, ayuda coma final y comillas simples json, uso comercial gratuito herramientas json2x, soporte offline vpn corporativo json, diferencia minificar y formatear json, json2x licencia open source mit, enviar feedback o reportar bug json2x, seguridad cliente cero retencion memoria',
    badge: 'Confianza y Transparencia',
    h1: 'Preguntas Frecuentes (FAQ)',
    desc: 'Respuestas claras sobre el procesamiento 100 % en el cliente, seguridad de tus claves API, Web Workers y estándares RFC 8259 en JSON2X.',
    lastUpdated: 'Última actualización: Septiembre 2026',
    verifiedTrust: 'Arquitectura Verificada Sin Servidor',
    searchPlaceholder: 'Buscar pregunta (ej: privacidad, Web Worker, CSV, límites)...',
    searchAria: 'Buscar en preguntas frecuentes',
    pillsAria: 'Categorías de preguntas frecuentes',
    allTopicsLabel: 'Todos los temas',
    noResultsTitle: 'No se encontraron preguntas coincidentes',
    noResultsHint: 'Prueba términos como privacidad, CSV, TypeScript, RFC o Web Worker.',
    categories: [
      {
        id: 'privacy',
        pillLabel: 'Privacidad y Seguridad',
        title: '1. Privacidad de Datos y Seguridad en Cliente',
        items: [
          {
            q: '¿Mis datos son 100% privados al usar JSON2X?',
            a: 'Sí. Todo el formateo, validación, minificación y conversión ocurre exclusivamente en la memoria de tu navegador. Nunca se suben archivos JSON, tokens API ni datos CSV a servidores externos. Puedes verificarlo con la pestaña Red (Network) de DevTools.',
            keywords: 'privacidad seguridad local cliente servidor red devtools'
          },
          {
            q: '¿JSON2X almacena o registra el JSON que pego?',
            a: 'Jamás. Operamos bajo una arquitectura estricta de cero retención y cero backend. Todo permanece en la memoria volátil de JavaScript y se borra al cerrar o recargar la pestaña.',
            keywords: 'guardar registrar logs retencion memoria pestana'
          },
          {
            q: '¿Puedo usar JSON2X sin internet o tras una VPN corporativa?',
            a: 'Sí. Al no depender de APIs externas ni peticiones en segundo plano para procesar datos, una vez cargada la página puedes trabajar tras firewalls corporativos o sin conexión.',
            keywords: 'offline sin internet vpn firewall corporativo empresa'
          },
          {
            q: '¿Es gratuito para proyectos comerciales y empresas?',
            a: 'Sí, las 21 utilidades son completamente gratuitas para uso personal, comercial y empresarial sin registro ni límites artificiales.',
            keywords: 'gratis comercial empresa licencia precio'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: 'Herramientas',
        title: '2. Utilidades y Conversores Disponibles',
        items: [
          {
            q: '¿Qué herramientas incluye la plataforma JSON2X?',
            a: 'Incluye 21 utilidades especializadas: Formateador JSON, Validador RFC 8259, Minificador, Comparador Diff, Conversores JSON ↔ CSV, YAML, XML, TOML y SQL, además de generadores de TypeScript, Zod, Prisma, Drizzle, GraphQL, Go/Rust/Python, JSON Schema, Mock Data, JSONPath y Visor de Árbol.',
            keywords: 'lista herramientas formateador validador minificador diff csv yaml xml sql zod prisma'
          },
          {
            q: '¿Cómo maneja el conversor JSON a CSV los objetos anidados?',
            a: 'Aplana automáticamente las estructuras jerárquicas usando notación de puntos (por ejemplo usuario.direccion.ciudad), añade soporte opcional de UTF-8 BOM para abrir tildes y eñes correctamente en Excel en español y cumple RFC 4180.',
            keywords: 'csv excel bom tildes enes notacion puntos objetos anidados'
          },
          {
            q: '¿Puedo generar esquemas Zod, Prisma, Drizzle y TypeScript desde un JSON?',
            a: 'Sí. Cada generador analiza tu JSON de muestra, detecta tipos opcionales en arrays, objetos anidados y tipos primitivos, y genera al instante interfaces TypeScript, esquemas Zod, modelos Prisma, tablas Drizzle PostgreSQL/MySQL o tipos GraphQL.',
            keywords: 'typescript zod prisma drizzle graphql generar interfaces'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: 'Rendimiento y Límites',
        title: '3. Rendimiento y Tamaño Máximo',
        items: [
          {
            q: '¿Qué tamaño máximo de JSON soporta sin colgar el navegador?',
            a: 'Gracias a los Web Workers en segundo plano, las operaciones pesadas no bloquean el hilo de la interfaz. Puedes formatear y consultar archivos de 50 MB a 100 MB+ según la RAM disponible en tu dispositivo.',
            keywords: 'tamano maximo limite megabytes 100mb web worker rendimiento'
          },
          {
            q: '¿Por qué es más rápido que otros formateadores online?',
            a: 'Porque ahorra por completo el tiempo de subida y bajada HTTP hacia servidores remotos: tu payload se analiza directamente en el motor JavaScript local V8 a milisegundos de latencia.',
            keywords: 'velocidad rapido latencia v8 cliente servidor'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'Estándares RFC',
        title: '4. Estándares RFC 8259 y Errores de Sintaxis',
        items: [
          {
            q: '¿Por qué el estándar JSON no permite comas finales ni comillas simples?',
            a: 'La especificación oficial IETF RFC 8259 exige comillas dobles en claves y cadenas y prohíbe comas tras el último elemento para garantizar compatibilidad exacta entre todos los lenguajes (Python, Go, Rust, Java, JS). Nuestro validador señala línea y columna exactas.',
            keywords: 'rfc 8259 coma final comillas simples error sintaxis linea columna'
          },
          {
            q: '¿Cómo corrijo el error Unexpected token en JSON.parse?',
            a: 'Pega el archivo en nuestro Validador JSON: identificará de inmediato si falta una llave de cierre, hay una clave sin comillas, un salto de línea sin escapar o un prefijo HTML de error de servidor.',
            keywords: 'unexpected token invalid character solucionar error json parse'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: 'Licencia y Soporte',
        title: '5. Código Abierto y Soporte Técnico',
        items: [
          {
            q: '¿JSON2X es de código abierto?',
            a: 'Sí, la arquitectura, algoritmos y documentación son públicos bajo licencia abierta para auditoría comunitaria.',
            keywords: 'codigo abierto open source github licencia mit'
          },
          {
            q: '¿Cómo reporto un error o solicito un nuevo conversor?',
            a: 'Puedes abrir un issue en nuestro repositorio de GitHub (arjunn881/json2x) o escribirnos directamente a support@json2x.com.',
            keywords: 'reportar error contacto soporte github'
          }
        ]
      }
    ]
  },
  about: {
    title: 'Sobre JSON2X — Suite Privada y Gratuita de Herramientas JSON y CSV en tu Navegador',
    description: 'Conoce la arquitectura 100 % client-side de JSON2X: 21 herramientas de desarrollo JSON y CSV sin backend, sin cookies de rastreo y listas para usar offline.',
    keywords: 'sobre json2x, herramientas json seguras privacidad navegador, arquitectura sin servidor desarrolladores, suite herramientas json open source, por que usar formateador json sin backend, herramienta json codigo abierto licencia mit, procesar claves api y tokens jwt sin riesgo, rendimiento web worker archivos json grandes, alternativa segura a formateadores con publicidad, filosofia privacidad desarrolladores json2x, utilidades json sin cookies de rastreo, suite gratuita offline pwa desarrolladores, diseño veloz cdn global para programar, compromiso cero almacenamiento datos json',
    eyebrow: 'Sobre este proyecto',
    h1: 'Diseñado para desarrolladores que necesitan herramientas rápidas y privadas',
    lead: 'JSON2X es una colección gratuita y de código abierto con 21 utilidades JSON y CSV ejecutadas al 100 % en el navegador: sin cuentas, sin envíos al servidor y sin rastreo.',
    whyTitle: '¿Por qué existe JSON2X?',
    whyParagraphs: [
      'Todo desarrollador necesita formatear respuestas JSON minificadas, depurar errores de sintaxis antes de un despliegue o exportar arrays de una API a Excel o SQL. El problema de muchos sitios web es que envían tus datos a un servidor remoto, exigen registro o llenan la pantalla de ventanas emergentes.',
      'JSON2X sigue el principio opuesto: cada herramienta es estática y ejecuta su lógica íntegramente en el motor JavaScript local de tu equipo. No existe servidor de backend ni registro de consultas: tus claves de API, tokens JWT y registros de clientes jamás salen de tu máquina.',
      'Cuidamos el rendimiento real: páginas ligeras servidas desde red CDN global y apoyadas por Web Workers para procesar archivos grandes en milisegundos sin bloquear la interfaz.'
    ],
    principlesTitle: 'Principios de Ingeniería',
    principles: [
      { title: 'Privacidad por arquitectura', text: 'Cero transmisión de datos. Puedes abrir la pestaña Network en DevTools y verificar que no sale ninguna petición mientras formateas o conviertes archivos.' },
      { title: 'Cero registros obligatorios', text: 'Sin paywalls, sin límites artificiales de caracteres ni barreras de suscripción para usar las 21 herramientas.' },
      { title: 'Ligero y ultrarrápido', text: 'Sin sobrecarga innecesaria en cliente; archivos pesados (>200 KB) se procesan con Web Workers sin congelar tu navegador.' },
      { title: 'Disponible incluso sin conexión', text: 'Una vez cargados los recursos en caché, puedes validar, convertir y consultar JSON incluso sin acceso a internet.' }
    ],
    allToolsTitle: 'Todas las Herramientas para Desarrolladores (21)',
    contactTitle: '¿Dudas, fallos o sugerencias?',
    contactDesc: 'Si encontraste un caso límite o deseas proponer una nueva utilidad, nuestro equipo responde encantado.'
  },
  docsHub: {
    title: 'Documentación Técnica y Especificaciones IETF JSON — JSON2X',
    description: 'Manuales de arquitectura, especificación oficial RFC 8259, algoritmos de formateo y guías de generación de código para las 21 utilidades de JSON2X.',
    keywords: 'documentacion json rfc 8259, guia tecnica formateador json web workers, arquitectura generacion esquemas zod sql, especificaciones desarrollador json, referencia gramatica json ietf oficial, algoritmos aplanamiento csv notacion de puntos, guia inferencia interfaces typescript opcionales, documentacion tecnica herramientas json2x, estandares validacion payload rest api, manual rendimiento parseo json cliente, especificacion parser csv rfc 4180, arquitectura comparador diff semantico json, documentacion generadores prisma drizzle graphql, notas ingenieria velocidad v8 json',
    schemaName: 'Centro de Documentación Técnica JSON2X',
    badge: 'Centro de Documentación',
    h1: 'Documentación Técnica y Especificaciones',
    desc: 'Referencias de arquitectura, estándares IETF RFC 8259, mecánica de parsers y guías de tipado para nuestra suite de herramientas en navegador.',
    englishNotice: 'Nota: Cada manual técnico individual está redactado en inglés técnico original (EN) para mantener máxima precisión de especificación.',
    categoryLabels: {
      'Format & Validate': 'Formato y Validación',
      'Data Converters': 'Conversores de Datos',
      'Code & Schema': 'Código y Esquemas',
      'Query & Inspection': 'Consulta e Inspección',
      'Performance Notes': 'Rendimiento'
    }
  },
  kbHub: {
    title: 'Base de Conocimiento JSON: Errores, Tutoriales y Referencias | JSON2X',
    description: 'Índice técnico con más de 50 guías prácticas sobre errores JSON frecuentes, sintaxis de objetos y arrays, validación estricta, escape Unicode y consultas JSONPath.',
    keywords: 'base conocimiento errores json, solucionar unexpected token json, tutoriales json arreglos objetos, guia jsonpath y esquemas json, como arreglar coma final trailing comma json, errores escape unicode y saltos de linea json, ejemplos consulta filtro jsonpath listados, guia validacion json schema draft 07, respuestas rapidas sintaxis json desarrolladores, referencia errores comunes parsing api, guia tipos primitivos null boolean json, evitar comillas simples claves json, depurar json mal formado en segundos, tutorial convertir api json a sql typescript',
    schemaName: 'Base de Conocimiento Técnico JSON2X',
    badge: 'Base de Conocimiento',
    h1: 'Base de Conocimiento JSON y Solución de Errores',
    desc: 'Guías prácticas de diagnóstico de errores, referencias de sintaxis RFC 8259, ejemplos listos para copiar y tutoriales paso a paso.',
    englishNotice: 'Nota: Los artículos detallados de esta base de conocimiento se abren en su versión técnica original en inglés (EN).',
    categoryLabels: {
      'Troubleshooting': 'Solución de Errores',
      'Tutorials': 'Tutoriales',
      'Examples': 'Ejemplos',
      'Reference': 'Referencia',
      'Structures': 'Estructuras',
      'Validation': 'Validación',
      'Formatting': 'Formateo',
      'Databases': 'Bases de Datos',
      'Backend': 'Backend',
      'Testing': 'Pruebas',
      'Performance': 'Rendimiento',
      'APIs': 'APIs',
      'Schemas': 'Esquemas',
      'Querying': 'Consultas',
      'Comparison': 'Comparación',
      'Conversion': 'Conversión',
      'Fixing': 'Corrección',
      'Editors & Plugins': 'Editores',
      'Languages': 'Lenguajes',
      'Converters': 'Conversores',
      'Generators': 'Generadores',
      'Frameworks': 'Frameworks'
    }
  },
  blogHub: {
    title: 'Blog de Ingeniería y Tutoriales de Datos JSON — JSON2X',
    description: 'Artículos técnicos en profundidad sobre benchmarks de minificación JSON, migraciones de YAML/XML/SQL, validación RFC 8259 y arquitectura zero-server.',
    keywords: 'blog ingenieria json, tutoriales typescript zod json, benchmarks minificacion json api, migrar xml soap a json, guias devops yaml json, seguridad api privacidad herramientas cliente, optimizar payloads rest json ahorro ancho banda, diseno esquemas runtime con zod y typescript, comparar json vs yaml vs toml vs xml, articulos tecnicos procesamiento datos web, buenas practicas manejo archivos json gigantes, guias conversion kubernetes docker yaml json, patrones validacion contratos api rest, arquitectura web workers sin bloquear ui',
    schemaName: 'Blog de Ingeniería JSON2X',
    badge: 'Blog de Ingeniería',
    h1: 'Blog de Ingeniería y Tutoriales Prácticos',
    desc: 'Guías en profundidad sobre procesamiento de datos en navegador, benchmarks, inferencia de tipos y mejores prácticas de privacidad sin servidor.',
    englishNotice: 'Nota: Los artículos completos del blog de ingeniería se abren en inglés técnico original (EN).',
    categoryLabels: {
      'Architecture': 'Arquitectura',
      'Validation': 'Validación',
      'Performance': 'Rendimiento',
      'DevOps': 'DevOps',
      'Data Engineering': 'Ingeniería de Datos',
      'Enterprise': 'Empresa / Legacy',
      'Tooling': 'Herramientas',
      'Databases': 'Bases de Datos',
      'Productivity': 'Productividad',
      'TypeScript': 'TypeScript',
      'Backend': 'Backend',
      'API Design': 'Diseño de APIs',
      'Security': 'Seguridad',
      'Querying': 'Consultas',
      'Visualization': 'Visualización'
    }
  }
};

const jaPages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — 無料オンライン JSON 整形・検証・変換開発者ツール（完全ローカル処理）',
    description: '【登録不要・完全無料】全21種類のブラウザ完結型JSON/CSVツール。JSON整形、RFC 8259検証、圧縮、Diff比較、CSV(Excel文字化け対策BOM対応)・YAML・XML・TOML・SQL・TypeScript・Zod変換に対応。サーバー送信ゼロ。',
    keywords: 'json 整形 オンライン 無料, json バリデーション チェック, json csv 変換 エクセル 文字化け防止, json typescript 自動生成, json 差分比較 diff, ブラウザ完結 json ツール 安全, json yaml xml sql 変換 登録不要, 大容量 json ファイル 解析 web worker, prisma drizzle graphql スキーマ json 生成, go rust python 構造体 json 自動変換, オフライン対応 json 開発者ツール, api レスポンス デバッグ 時短 ユーティリティ, サーバー送信なし 機密 json 処理, 無料 jsonpath クエリ テスト',
    itemListName: 'JSON2X — 全JSON・CSV開発者ツール一覧',
    heroSectionAria: 'JSON2X 概要',
    heroPromptCmd: 'json2x --fast --private',
    heroTitleBefore: '100% ブラウザ完結の ',
    heroTitleAccent: 'JSON ＆ CSV',
    heroTitleAfter: ' 開発者ツールスイート',
    heroSub: '全21種類の高速・プライバシー重視ユーティリティ。JSONの整形・検証・圧縮・Diff比較・JSONPath抽出から、CSV・YAML・XML・SQL・TypeScript・Zod・Prisma変換まで、データを一切外部送信せずローカルで完結します。',
    heroBtnFormatter: '整形ツールを開く()',
    heroBtnAllTools: '// 全21ツールを見る (21)',
    trustClientSide: '100% ローカル処理',
    trustZeroLatency: 'サーバー遅延ゼロ',
    trustNoTracking: '登録・トラッキングなし',
    terminalTitle: 'json2x_engine.ts — 通信量 0 KB',
    terminalComment: '// ブラウザ内リアルタイム解析デモンストレーション',
    terminalStatus: 'ローカル',
    credibilityAria: 'セキュリティと技術的保証',
    credibilityCards: [
      {
        title: 'Web Worker プライバシー隔離',
        desc: 'すべての解析・整形処理はブラウザメモリ内で完結します。APIキー、JWTトークン、個人情報が外部サーバーへ送信されることは一切ありません。'
      },
      {
        title: 'ネットワーク遅延ゼロ',
        desc: 'リモートAPIへの通信待ちがないため、数MB〜数十MBの大容量JSONペイロードもV8エンジンのネイティブ速度で即座に整形されます。'
      },
      {
        title: 'IETF RFC 8259 完全準拠',
        desc: '行番号・列番号の正確な特定に加え、末尾カンマ（ケツカンマ）、クォート漏れキー、制御文字のエスケープ違反を厳密に検出します。'
      },
      {
        title: 'オフライン ＆ PWA 対応',
        desc: 'Service Workerによりブラウザにキャッシュ。新幹線や機内、閉域網（VPN・社内ファイアウォール内）の開発環境でも安全に動作します。'
      }
    ],
    toolsSectionAria: '全21種類の開発者ツール',
    toolsSectionTag: '$ ls ./tools/',
    toolsSectionTitle: '開発者ユーティリティ一覧 (全21種)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': '4行目 12列: 末尾カンマは許可されていません',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "status": 200  + "status": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (UTF-8 BOM対応)',
      'csv-to-json': 'name,age → [{"name":"田中","age":28}]',
      'json-to-yaml': '{"a":1} → a: 1 (Kubernetes YAML)',
      'json-to-xml': '{"a":1} → <root><a>1</a></root>',
      'json-to-toml': '{"title":"App"} → title = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → Go構造体 / Rust Serde / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"name":"佐藤"}]',
      'jsonpath': '$.store.book[*].author',
      'json-tree-viewer': 'object [3キー] → user'
    },
    editorialAria: 'JSON設計・データ交換アーキテクチャ解説',
    editorialEyebrow: 'エンジニアリング設計',
    editorialTitle: 'モダンJSONデータ交換の仕組みとセキュリティ設計',
    editorialIntro: 'JSON（JavaScript Object Notation）は、IETF RFC 8259およびECMA-404で規定された世界標準のデータ交換フォーマットです。REST API、マイクロサービス、NoSQLデータベース、クラウド設定ファイルの標準形式として幅広く使われています。',
    editorialSec1Title: '1. クライアント側解析 vs サーバー送信型ツールのセキュリティリスク',
    editorialSec1P1: 'API認証トークンや顧客データ、社内設定ファイルを含むJSONを従来のサーバー処理型オンラインツールに貼り付けると、データが外部サーバーへ送信・保存される恐れがあり、GDPRや個人情報保護法、企業のセキュリティポリシー違反につながります。',
    editorialSec1P2: 'JSON2Xは全21ツール（整形、検証、圧縮、Diff、各種変換・コード生成）をブラウザ内のJavaScriptエンジン（V8 / SpiderMonkey / JavaScriptCore）のみで実行します。通信ゼロのため、機密データも安心して扱えます。',
    editorialSec2Title: '2. IETF RFC 8259 厳格準拠と構文ルール',
    editorialSec2Intro: 'RFC 8259準拠のパーサーは、JavaScriptのオブジェクトリテラルとは異なる以下の厳格な制約を適用します。',
    editorialSec2Rules: [
      { bold: 'ダブルクォート必須:', text: 'キー名と文字列値はすべて二重引用符（"key"）で囲む必要があります。シングルクォートやクォートなしキーは構文エラーとなります。' },
      { bold: '末尾カンマ（ケツカンマ）禁止:', text: '配列やオブジェクトの最終要素の後ろにカンマを置くことはRFC 8259で認められていません。' },
      { bold: '制御文字のエスケープ:', text: '文字列内の生改行やタブ文字は、必ず \\n、\\t、または \\uXXXX でエスケープする必要があります。' },
      { bold: '厳密な数値表記:', text: '0123のような先頭ゼロ付き整数や、NaN・Infinityなどの非標準リテラルは不正です。' }
    ],
    editorialSec3Title: '3. データ形式比較マトリックス：JSON vs CSV vs YAML vs XML vs SQL',
    editorialSec3Intro: 'システム要件に応じて最適なシリアライズ形式を選択することが重要です。',
    tableHeaders: ['形式', '主な用途', '可読性', 'ネスト構造の扱い', '解析速度'],
    tableRows: [
      ['JSON', 'REST API、NoSQL、設定', '高い', 'ネイティブ対応 (オブジェクト/配列)', '超高速 (ブラウザ標準)'],
      ['CSV', 'Excel表計算、データ分析', '普通', '非対応（ドット記法フラット化が必要）', '高速 (表形式ストリーム)'],
      ['YAML', 'Kubernetes、Docker、CI/CD', '非常に高い', 'ネイティブ対応（インデント階層）', '標準'],
      ['XML', 'SOAP通信、エンタープライズ', '普通', 'ネイティブ対応（タグ階層）', '標準 (DOMパーサー)'],
      ['SQL', 'RDBテーブル定義・一括投入', '高い', 'リレーショナル (外部キー / JSONB)', '高速 (DBエンジン)']
    ],
    editorialSec4Title: '4. よくある質問（FAQ）',
    editorialFaqs: [
      {
        q: 'JSON2Xは商用利用や業務でも完全無料で使えますか？',
        a: 'はい。全21ツールとすべてのコード生成・スキーマ推論機能は完全無料で、アカウント登録や利用回数制限もありません。'
      },
      {
        q: 'どのくらい大きなJSONファイルまで処理できますか？',
        a: 'Web Workerでバックグラウンド処理を行うため、お使いのPCのメモリに応じて数十MB〜100MB超のJSONファイルもブラウザを固まらせず高速に処理できます。'
      },
      {
        q: '入力したJSONデータがサーバーに保存・記録されることはありますか？',
        a: '一切ありません。バックエンドサーバーへの送信自体を行わない設計です。ブラウザの開発者ツール（Networkタブ）で通信ゼロを確認できます。'
      }
    ],
    hubAria: '技術ドキュメント・ガイド',
    hubTitle: 'ドキュメント ＆ 技術ガイド',
    hubLead: 'IETF RFC 8259仕様解説、Web Worker高速化、型定義自動生成に関するリファレンス記事。',
    hubLangBadge: '各技術解説記事の本文は英語（EN）で提供されています',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Web Worker による大容量JSONの非同期パース設計 (英語)',
        desc: '数十MB規模のJSONファイルを処理する際にUIスレッドのフリーズを防ぐWeb Worker実装パターン。'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'TypeScript型定義 ＆ Zodスキーマ自動生成ガイド (英語)',
        desc: 'APIレスポンスJSONから厳密なTypeScriptインターフェースとZodランタイム検証スキーマを導出する方法。'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'IETF RFC 8259 JSON 完全仕様リファレンス (英語)',
        desc: '厳密なJSON構文ルール、6つのデータ型、文字列エスケープ規定の体系的な解説。'
      }
    ]
  },
  toolsCatalog: {
    title: '全21種 JSON・CSV開発者ツール一覧（無料・登録不要） — JSON2X',
    description: 'ブラウザで即座に使える全21種類のJSON/CSV開発者ツールカタログ。整形、検証、圧縮、Diff比較、CSV/YAML/XML/TOML/SQL変換、TypeScript/Zod/Prisma/Drizzle/GraphQL生成を網羅。',
    keywords: 'json ツール 一覧 無料, json 変換 ツール まとめ, typescript zod スキーマ 生成ツール, csv json 変換 オンライン, jsonpath テスト ツール, json2x 全21種 開発者ツール カタログ, json 整形 検証 圧縮 diff 比較 まとめ, json go rust python コード 生成 一覧, モック json データ 作成 ツール 無料, json yaml xml toml sql 相互変換, ローカル実行 安全 エンジニア向けツール集, drizzle prisma graphql モデル生成 json, ブラウザ完結 無料 登録なし jsonツール, 日本語 excel csv utf8 bom 対応',
    schemaName: 'JSON2X 開発者ツールカタログ',
    badgeTemplate: 'ツール一覧（全 {count} 種）',
    h1: 'JSON ＆ CSV 開発者ツールスイート',
    lead: '全21種類のツールがブラウザ内で100%ローカル実行。用途別カテゴリから目的のツールへすぐアクセスできます。',
    filterAria: 'カテゴリでツールを絞り込む',
    allToolsLabel: 'すべて',
    utilitiesUnit: 'ツール'
  },
  faq: {
    title: 'よくある質問（FAQ）セキュリティ・RFC8259・容量上限 | JSON2X',
    description: 'JSON2Xの完全ローカル動作、Web Workerによる大容量ファイル処理、IETF RFC 8259準拠ルール、Excel向けCSV BOM出力、MITライセンスに関するよくある質問と回答。',
    keywords: 'json2x よくある質問 faq, オンライン json 整形 安全性, json ケツカンマ エラー 原因, web worker json 大容量 処理, json csv 日本語 文字化け 対策, ブラウザ json ツール 最大サイズ 100mb, unexpected token エラー 解決方法, api キー 貼り付け セキュリティ リスク 回避, 法人 商用利用 無料 json ツール faq, オフライン vpn 閉域網 動作確認, json 整形 と 圧縮 の 違い, json2x mit ライセンス オープンソース, データ 保存 なし ネットワーク 0 確認, json バリデーション エラー 行番号 特定',
    badge: '信頼性・仕様 FAQ',
    h1: 'よくある質問（FAQ）',
    desc: 'ブラウザ完結型アーキテクチャの安全性、最大ファイルサイズ、Web Workerの高速化、RFC 8259構文仕様に関する詳細回答です。',
    lastUpdated: '最終更新日: 2026年9月',
    verifiedTrust: 'サーバー送信ゼロ検証済み',
    searchPlaceholder: 'FAQを検索（例：安全性、Web Worker、BOM、TypeScript、上限）...',
    searchAria: 'よくある質問を検索',
    pillsAria: 'FAQカテゴリ',
    allTopicsLabel: 'すべて表示',
    noResultsTitle: '一致する質問が見つかりませんでした',
    noResultsHint: '「プライバシー」「CSV」「TypeScript」「RFC」などのキーワードでお試しください。',
    categories: [
      {
        id: 'privacy',
        pillLabel: 'プライバシー・安全性',
        title: '1. データプライバシーとローカルセキュリティ',
        items: [
          {
            q: 'JSON2Xに入力したJSONやAPIキーは本当に外部へ送信されませんか？',
            a: 'はい、一切送信されません。整形、検証、変換、スキーマ生成のすべてがお使いのブラウザのメモリ内で完結します。ブラウザの検証ツール（DevToolsのNetworkタブ）を開いて通信が発生しないことを直接ご確認いただけます。',
            keywords: 'プライバシー 安全性 外部送信 apiキー トークン 漏洩'
          },
          {
            q: '入力内容の保存・ログ収集は行われますか？',
            a: '一切行いません。サーバー側でデータを受信する機能自体を持たないゼロ保持設計です。タブを閉じるかリロードするとメモリから即座に消去されます。',
            keywords: '保存 ログ データ保持 メモリ 消去'
          },
          {
            q: 'VPN環境や社内ファイアウォール内・オフラインでも使えますか？',
            a: 'はい。処理に外部API通信を一切使わないため、ページ読み込み後はインターネット接続がない環境や厳格な企業ネットワーク内でもそのまま動作します。',
            keywords: 'オフライン 閉域網 vpn 社内ネットワーク ファイアウォール'
          },
          {
            q: '企業の業務プロジェクトや商用利用も無料ですか？',
            a: 'はい。個人・法人・商用を問わず完全無料で、回数制限や会員登録なしでご利用いただけます。',
            keywords: '無料 商用利用 業務 法人'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: 'ツール機能',
        title: '2. 提供ツールと変換機能について',
        items: [
          {
            q: 'どのようなJSON・CSV開発者ツールが利用できますか？',
            a: '整形ツール、RFC 8259バリデータ、圧縮ツール、Diff差分比較、JSON⇔CSV(Excel BOM対応)、YAML、XML、TOML、SQL変換、TypeScript/Zod/Prisma/Drizzle/GraphQL/Go・Rust・Pythonコード生成、JSON Schema推論、モック生成、JSONPathテスター、ツリービューアの21ツールを備えています。',
            keywords: '機能 一覧 21種類 変換 コード生成'
          },
          {
            q: 'Excelで開いたときに日本語が文字化けしないCSVを出力できますか？',
            a: 'はい。「JSON → CSV」ツールでは「Excel文字化け対策（UTF-8 BOM）」モードをワンクリックで選択でき、日本語を含む配列データも文字化けせずにExcelで直接開けます。',
            keywords: 'excel 文字化け bom utf-8 csv 日本語'
          },
          {
            q: 'TypeScript、Zod、Prisma、Drizzleスキーマも自動生成できますか？',
            a: 'はい。サンプルJSONを貼り付けるだけで、ネストしたオブジェクトや配列内の省略可能プロパティ（?）まで推論し、実務ですぐ使えるコードを生成します。',
            keywords: 'typescript zod prisma drizzle graphql コード生成'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: 'パフォーマンス・上限',
        title: '3. 処理速度とファイルサイズ上限',
        items: [
          {
            q: '最大何MBのJSONファイルまで処理できますか？',
            a: 'Web Workerによるバックグラウンド処理によりUIスレッドをブロックしないため、PCの搭載メモリに応じて数MB〜100MB超の大規模JSONも快適に解析できます。',
            keywords: 'ファイルサイズ 上限 大容量 100mb web worker'
          },
          {
            q: '整形（Format）と圧縮（Minify）の違いは何ですか？',
            a: '整形は改行とインデント（2/4スペース・タブ）を付与して人間が読みやすくする処理、圧縮は余計な空白・改行をすべて取り除いてAPI転送量やストレージ容量を削減する処理です。',
            keywords: '整形 圧縮 minify format 違い ペイロード削減'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'RFC 8259 仕様',
        title: '4. 構文検証とIETF RFC 8259規格',
        items: [
          {
            q: '末尾カンマ（ケツカンマ）やシングルクォートがエラーになるのはなぜですか？',
            a: 'IETF RFC 8259では言語間の完全互換性を保つため、キーと文字列はダブルクォート限定・最終要素の後ろのカンマ禁止と厳密に定められています。JSON2Xバリデータはエラー行と列番号を正確に示します。',
            keywords: 'rfc 8259 ケツカンマ 末尾カンマ シングルクォート エラー'
          },
          {
            q: 'Unexpected token エラーの原因を特定できますか？',
            a: 'はい。JSONバリデータに貼り付けると、閉じ括弧の不足・クォート漏れ・不正なエスケープ文字などの正確な位置（行・列）と原因を即座に特定できます。',
            keywords: 'unexpected token エラー 原因 特定 行番号'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: 'ライセンス・問い合わせ',
        title: '5. オープンソースとサポート',
        items: [
          {
            q: 'JSON2Xはオープンソースですか？',
            a: 'はい。変換ロジック、UI、ドキュメントはオープンソースとして公開されており、コミュニティによる監査・検証が可能です。',
            keywords: 'オープンソース github ライセンス'
          },
          {
            q: '不具合報告や機能リクエストはどこから送れますか？',
            a: 'GitHubリポジトリ（arjunn881/json2x）のIssue、または support@json2x.com までお気軽にご連絡ください。',
            keywords: '不具合 バグ報告 問い合わせ サポート'
          }
        ]
      }
    ]
  },
  about: {
    title: 'JSON2Xについて — 完全ブラウザ完結・安全な開発者ツール群',
    description: 'JSON2Xの設計思想、サーバー送信ゼロのプライバシーアーキテクチャ、Web Workerによる高速処理、搭載されている全21種類のJSON/CSVツールをご紹介します。',
    keywords: 'json2x とは, ブラウザ完結 json ツール 安全性, プライバシー重視 開発者ツール, オフライン json フォーマッタ, サーバー送信ゼロ json 変換 アーキテクチャ, オープンソース mit ライセンス json2x, web worker 高速 json 解析 仕組み, jwt トークン 機密データ 安全処理, ログイン不要 無料 エンジニア ユーティリティ, 高速 cdn 静的ホスティング json ツール, 広告 トラッキング なし json エディタ, 開発者 生産性 向上 無料 ツール群, クライアントサイド json 処理 理念, pwa オフライン 動作 保証',
    eyebrow: 'JSON2Xについて',
    h1: 'シンプルに速く、安全に使える開発者のためのツール',
    lead: 'JSON2Xはアカウント不要・サーバーアップロード不要・広告トラッキングゼロで動作する全21種類のブラウザネイティブJSON＆CSV開発者ツールです。',
    whyTitle: 'なぜJSON2Xを作ったのか',
    whyParagraphs: [
      '開発現場では毎日のように、一行に圧縮されたAPIレスポンスを整形したり、デプロイ前にJSON設定ファイルを検証したり、スプレッドシートやSQL向けに変換したりする作業が発生します。しかし従来のオンラインツールの多くは、入力データをサーバーに送信したり、会員登録を迫ったり、動作が重かったりしました。',
      'JSON2Xはその逆を目指しています。すべてのツールが静的ページとクライアントJavaScriptのみで動作し、バックエンドもデータベースも持ちません。APIトークンや顧客データを貼り付けても、マシンから外部へ送信されることは構造上あり得ません。',
      '速度にも徹底的にこだわっています。CDNから瞬時に読み込まれ、スプラッシュ画面や待ち時間なしにすぐ作業を始められます。'
    ],
    principlesTitle: '4つの設計原則',
    principles: [
      { title: 'アーキテクチャによる完全なプライバシー', text: '処理はすべてブラウザのJavaScriptエンジン内で完結。Networkタブで通信が発生しないことをいつでも確認できます。' },
      { title: 'アカウント登録・課金壁ゼロ', text: 'JSONを整形するためだけにログインする必要はありません。全21ツール・全機能が最初から最後まで無料で使えます。' },
      { title: '軽量・Web Worker高速処理', text: '200KB以上の大きなデータでもWeb Workerを活用し、ブラウザの操作感を損なわずに高速処理します。' },
      { title: 'オフライン環境でも利用可能', text: '一度ページとアセットがキャッシュされれば、インターネット接続のない隔離環境や移動中でもそのまま使えます。' }
    ],
    allToolsTitle: '搭載開発者ツール一覧（全21種）',
    contactTitle: 'ご質問・フィードバックはこちら',
    contactDesc: 'バグのご報告や新機能のご要望など、開発者の皆さまからのご連絡をお待ちしています。'
  },
  docsHub: {
    title: '技術ドキュメント・IETF RFC 8259仕様解説ハブ — JSON2X',
    description: 'JSON2X全ツールの技術仕様書、IETF RFC 8259文法解説、Web Worker解析アーキテクチャ、TypeScript・Zod・SQL生成アルゴリズムの解説ハブ。',
    keywords: 'json rfc8259 仕様書, web worker json 解析, typescript zod 自動生成 アルゴリズム, json2x ドキュメント, ietf json 文法 エスケープ 正規仕様, csv ドット記法 フラット化 アルゴリズム, オプショナル プロパティ 推論 型定義 設計, 大規模 json フリーズ防止 非同期パース, 開発者向け json 技術リファレンス, api スキーマ 検証 パターン 解説, sql ddl 型推論 仕組み 解説, prisma drizzle zod 生成 技術 仕様, diff 構造 比較 アルゴリズム 解説, jsonpath クエリ 評価 エンジン 仕様',
    schemaName: 'JSON2X 開発者ドキュメント＆仕様ハブ',
    badge: 'ドキュメントハブ',
    h1: '開発者ドキュメント ＆ 技術仕様書',
    desc: 'ブラウザネイティブな21の開発者ツールを支えるIETF RFC規格、パーサー設計、型推論および高速化アルゴリズムの技術リファレンス。',
    englishNotice: '注記：各ドキュメント詳細記事の本文は正確な技術仕様を保つため英語（EN）で公開されています。',
    categoryLabels: {
      'Format & Validate': '整形・検証',
      'Data Converters': 'データ変換',
      'Code & Schema': 'コード＆スキーマ',
      'Query & Inspection': 'クエリ＆可視化',
      'Performance Notes': 'パフォーマンス解説'
    }
  },
  kbHub: {
    title: 'JSONナレッジベース：エラー解決・構文ガイド・実例集 | JSON2X',
    description: 'Unexpected tokenエラーの原因と修正方法、JSON配列・ネストオブジェクトの扱い、バリデーション、エスケープ、JSONPathクエリを網羅した技術ナレッジ集。',
    keywords: 'json エラー 解決方法, json unexpected token 原因, json 配列 オブジェクト チュートリアル, jsonpath 書き方 例, json ケツカンマ シングルクォート 修正, 制御文字 改行 エスケープ エラー 対処, json schema draft-07 バリデーション 例, 配列 フィルター クエリ jsonpath サンプル, json 構文 トラブルシューティング 集, エンジニア向け json 逆引き ナレッジベース, unexpected end of json input 対処法, 日付 null 配列 json 基本 ルール, excel csv 変換 時 文字化け 解決, rest api デバッグ 用 json リファレンス',
    schemaName: 'JSON ナレッジベース ＆ トラブルシューティング集',
    badge: 'ナレッジハブ',
    h1: 'JSON ナレッジベース ＆ 技術リファレンス',
    desc: 'JSONパースエラーのトラブルシューティング、構文仕様、実践コード例、開発者向けリファレンスをまとめた総合技術索引です。',
    englishNotice: '注記：各詳細ナレッジ記事ページはオリジナルの英語技術ガイド（EN）が開きます。',
    categoryLabels: {
      'Troubleshooting': 'トラブルシューティング',
      'Tutorials': 'チュートリアル',
      'Examples': '実例・サンプル',
      'Reference': 'リファレンス',
      'Structures': 'データ構造',
      'Validation': '構文検証',
      'Formatting': '整形',
      'Databases': 'データベース',
      'Backend': 'バックエンド',
      'Testing': 'テスト・検証',
      'Performance': 'パフォーマンス',
      'APIs': 'API設計',
      'Schemas': 'スキーマ',
      'Querying': 'クエリ抽出',
      'Comparison': '差分比較',
      'Conversion': '形式変換',
      'Fixing': 'エラー修復',
      'Editors & Plugins': 'エディタ連携',
      'Languages': 'プログラミング言語',
      'Converters': 'コンバータ',
      'Generators': 'ジェネレータ',
      'Frameworks': 'フレームワーク'
    }
  },
  blogHub: {
    title: 'エンジニアリングブログ ＆ JSON・API設計チュートリアル — JSON2X',
    description: '大規模JSONの高速パース、Kubernetes向けYAML移行、レガシーXMLモダナイズ、TypeScript/Zodスキーマ実践、ゼロサーバー設計に関する技術ブログ。',
    keywords: 'json エンジニアリング ブログ, json 圧縮 ベンチマーク, kubernetes yaml 変換, typescript zod api設計, xml soap から json モダナイゼーション, ゼロサーバー ツール セキュリティ 設計, rest api ペイロード 削減 gzip minify, json 比較 アルゴリズム 実装 解説, orm スキーマ prisma drizzle 自動化 記事, フロントエンド データ処理 最適化 ブログ, json vs yaml vs toml vs xml 徹底比較, web worker で 大容量 json 高速 処理, ajv json schema 実務 活用 ガイド, セキュア な 開発者 ツール の 選び方',
    schemaName: 'JSON2X エンジニアリングブログ',
    badge: 'エンジニアリングブログ',
    h1: 'エンジニアリングブログ ＆ 実践チュートリアル',
    desc: 'クライアント側データ処理のベンチマーク、RFC規格、型推論設計、プライバシー重視アーキテクチャに関する技術記事集です。',
    englishNotice: '注記：各技術ブログ記事の全文ページは英語（EN）で提供されています。',
    categoryLabels: {
      'Architecture': 'アーキテクチャ',
      'Validation': 'バリデーション',
      'Performance': 'パフォーマンス',
      'DevOps': 'DevOps',
      'Data Engineering': 'データエンジニアリング',
      'Enterprise': 'エンタープライズ',
      'Tooling': '開発ツール',
      'Databases': 'データベース',
      'Productivity': '開発生産性',
      'TypeScript': 'TypeScript',
      'Backend': 'バックエンド',
      'API Design': 'API設計',
      'Security': 'セキュリティ',
      'Querying': 'クエリ',
      'Visualization': '可視化'
    }
  }
};

const frPages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — Outils JSON & CSV Gratuits en Ligne pour Développeurs (100% Local)',
    description: '21 outils JSON et CSV gratuits exécutés 100% dans votre navigateur : formateur, validateur RFC 8259, minificateur, comparateur diff, arbre JSON et convertisseurs CSV, YAML, XML, TOML, SQL, TypeScript et Zod.',
    keywords: 'outil json en ligne gratuit, formateur json sans serveur, validateur json rfc 8259, convertir json en csv excel, json vers typescript zod en ligne, comparateur json diff, visualiseur arbre json, suite utilitaires json developpeur prive, nettoyer valider json navigateur sans inscription, json vers yaml xml toml sql gratuit, generer modeles prisma drizzle graphql json, exporter go rust python depuis json, ouvrir gros fichiers json web worker, tester requetes jsonpath en ligne gratuit',
    itemListName: 'JSON2X — Tous les Outils Développeur',
    heroSectionAria: 'Présentation JSON2X',
    heroPromptCmd: 'json2x --rapide --prive',
    heroTitleBefore: 'Outils ',
    heroTitleAccent: 'JSON & CSV',
    heroTitleAfter: ' 100% Côté Client pour Développeurs',
    heroSub: 'Vingt-et-un utilitaires ultra-rapides exécutés localement. Formatez, validez, minifiez, comparez, interrogez avec JSONPath et générez CSV, YAML, XML, SQL, TypeScript ou Zod sans jamais envoyer un octet vers un serveur.',
    heroBtnFormatter: 'ouvrir_formateur()',
    heroBtnAllTools: '// voir_tous_les_outils (21)',
    trustClientSide: '100% Côté Client',
    trustZeroLatency: 'Zéro Latence Serveur',
    trustNoTracking: 'Sans Inscription ni Pistage',
    terminalTitle: 'moteur_json2x.ts — 0 Ko réseau',
    terminalComment: '// Démonstration en direct d’analyse côté client',
    terminalStatus: 'local',
    credibilityAria: 'Garanties Techniques',
    credibilityCards: [
      {
        title: 'Confidentialité Web Worker',
        desc: 'Toute l’analyse et le formatage s’exécutent strictement dans la mémoire du navigateur. Clés API, jetons JWT et données clients restent chez vous.'
      },
      {
        title: 'Zéro Latence Réseau',
        desc: 'Aucun aller-retour HTTP vers des serveurs distants. Des fichiers JSON de plusieurs mégaoctets sont traités instantanément.'
      },
      {
        title: 'Conforme IETF RFC 8259',
        desc: 'Validation stricte avec ligne et colonne exactes, détection des virgules finales, clés sans guillemets et caractères mal échappés.'
      },
      {
        title: 'Prêt Hors-Ligne & PWA',
        desc: 'Mis en cache automatiquement par Service Worker. Fonctionne sans connexion dans le train, l’avion ou sur réseau d’entreprise isolé.'
      }
    ],
    toolsSectionAria: 'Tous les outils JSON et CSV',
    toolsSectionTag: '$ ls ./outils/',
    toolsSectionTitle: 'Utilitaires Développeur (21)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': 'Ligne 4, Col 12 : Virgule finale interdite',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "statut": 200  + "statut": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (CSV Excel BOM)',
      'csv-to-json': 'nom,age → [{"nom":"Claire","age":29}]',
      'json-to-yaml': '{"a":1} → a: 1 (Config YAML)',
      'json-to-xml': '{"a":1} → <root><a>1</a></root>',
      'json-to-toml': '{"titre":"App"} → titre = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → Go struct / Rust / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"nom":"Camille"}]',
      'jsonpath': '$.boutique.livre[*].auteur',
      'json-tree-viewer': 'objet [3 clés] → utilisateur'
    },
    editorialAria: 'Guide d’Architecture Technique JSON',
    editorialEyebrow: 'Architecture Logicielle',
    editorialTitle: 'Mécanique Technique de l’Échange de Données JSON',
    editorialIntro: 'JSON (JavaScript Object Notation) s’est imposé comme le standard universel pour l’échange de données sur le Web. Spécifié par IETF RFC 8259 et ECMA-404, ce format léger alimente APIs REST, microservices, bases NoSQL et pipelines cloud.',
    editorialSec1Title: '1. Analyse Côté Client vs Risques de Sécurité Côté Serveur',
    editorialSec1P1: 'Coller un payload contenant des jetons OAuth, chaînes de connexion ou données PII dans un outil en ligne classique transmet vos secrets vers des serveurs tiers, exposant votre organisation à des fuites et infractions RGPD.',
    editorialSec1P2: 'JSON2X supprime ce risque : nos 21 utilitaires s’exécutent intégralement dans le moteur JavaScript local de votre navigateur (V8 / SpiderMonkey / JavaScriptCore). Aucun octet ne quitte votre ordinateur.',
    editorialSec2Title: '2. Conformité Stricte RFC 8259 et Règles Syntaxiques',
    editorialSec2Intro: 'Un parseur JSON strict conforme à IETF RFC 8259 impose des règles rigides qui le distinguent d’un objet JavaScript :',
    editorialSec2Rules: [
      { bold: 'Guillemets doubles obligatoires :', text: 'Les clés et chaînes doivent être entourées de guillemets doubles ("cle"). Les guillemets simples sont invalides.' },
      { bold: 'Pas de virgule finale :', text: 'Une virgule après le dernier élément d’un tableau ou objet déclenche une erreur RFC 8259.' },
      { bold: 'Échappement des caractères de contrôle :', text: 'Les retours à la ligne ou tabulations bruts dans une chaîne doivent être échappés en \\n, \\t ou \\uXXXX.' },
      { bold: 'Nombres stricts :', text: 'Les zéros initiaux (0123) et littéraux NaN / Infinity sont proscrits.' }
    ],
    editorialSec3Title: '3. Matrice Comparative : JSON vs CSV vs YAML vs XML vs SQL',
    editorialSec3Intro: 'Chaque domaine d’ingénierie impose son format de sérialisation adapté :',
    tableHeaders: ['Format', 'Cas d’Usage Principal', 'Lisibilité', 'Données Imbriquées', 'Vitesse d’Analyse'],
    tableRows: [
      ['JSON', 'APIs REST, NoSQL, Configs', 'Élevée', 'Natif (Objets / Tableaux)', 'Ultra-rapide (Natif JS)'],
      ['CSV', 'Excel, Analyse Tabulaire', 'Moyenne', 'Plat uniquement (notation pointée)', 'Rapide (Flux tabulaire)'],
      ['YAML', 'Kubernetes, CI/CD, Docker', 'Très Élevée', 'Natif (Indentation)', 'Modérée'],
      ['XML', 'SOAP, Facturation, Legacy', 'Moyenne', 'Natif (Arbre de balises)', 'Modérée (Parseur DOM)'],
      ['SQL', 'Bases Relationnelles DDL/DML', 'Élevée', 'Relationnel (Clés étrangères / JSONB)', 'Rapide (Moteur SGBD)']
    ],
    editorialSec4Title: '4. Foire Aux Questions (FAQ)',
    editorialFaqs: [
      {
        q: 'JSON2X est-il 100% gratuit pour les projets commerciaux ?',
        a: 'Oui. L’ensemble des 21 outils et générateurs est gratuit à vie, sans compte ni plafond d’utilisation.'
      },
      {
        q: 'Quelle taille maximale de fichier JSON puis-je traiter ?',
        a: 'Grâce au traitement local en mémoire et aux Web Workers, des fichiers de 50 à 100 Mo+ peuvent être analysés et formatés sans geler votre navigateur.'
      },
      {
        q: 'JSON2X enregistre-t-il ou journalise-t-il mes données JSON ?',
        a: 'Jamais. Vérifiez l’onglet Réseau (Network) de vos outils développeur : zéro requête sortante n’est émise lors du traitement.'
      }
    ],
    hubAria: 'Documentation et Guides Techniques',
    hubTitle: 'Documentation & Guides Techniques',
    hubLead: 'Spécifications complètes, benchmarks Web Workers et guides pratiques pour l’ingénierie JSON moderne.',
    hubLangBadge: 'Les articles détaillés ci-dessous sont publiés en anglais technique (EN)',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Analyser de Gros JSON avec les Web Workers (EN)',
        desc: 'Évitez le blocage du thread UI principal lors du traitement de fichiers JSON volumineux grâce au traitement asynchrone.'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'Guide de Génération TypeScript & Schémas Zod (EN)',
        desc: 'Générez des interfaces TypeScript strictes et des validateurs Zod runtime directement depuis des exemples d’API.'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'Référence Complète IETF RFC 8259 JSON (EN)',
        desc: 'Détail des règles syntaxiques, types primitifs, échappement Unicode et exigences strictes.'
      }
    ]
  },
  toolsCatalog: {
    title: 'Catalogue des 21 Outils JSON & CSV Gratuits en Ligne — JSON2X',
    description: 'Répertoire complet de 21 utilitaires JSON et CSV locaux : formateur, validateur, minificateur, comparateur diff, convertisseurs YAML/XML/TOML/SQL et générateurs TypeScript, Zod, Prisma, Drizzle et GraphQL.',
    keywords: 'catalogue outils json gratuit, suite outils developpeur json csv, generateur typescript zod prisma en ligne, convertisseur json yaml xml sql gratuit, repertoire 21 outils json2x gratuits, formateur validateur minificateur comparateur diff, convertisseur go rust python graphql schema, generer donnees mock test api json, utilitaires csv excel bom navigateur, outils json locaux rgpd sans upload, testeur jsonpath temps reel gratuit, visionneuse arbre json gros fichiers, convertisseur json toml drizzle gratuit, boite outils developpeur web hors ligne',
    schemaName: 'Suite d’Outils Développeur JSON2X',
    badgeTemplate: 'Catalogue ({count} Utilitaires)',
    h1: 'Suite Complète d’Outils Développeur',
    lead: 'Les 21 outils s’exécutent 100 % localement dans votre navigateur avec zéro latence et zéro transfert de données.',
    filterAria: 'Filtrer par catégorie',
    allToolsLabel: 'Tous',
    utilitiesUnit: 'Outils'
  },
  faq: {
    title: 'Foire Aux Questions (FAQ) Confidentialité & Outils JSON | JSON2X',
    description: 'Réponses complètes sur le traitement 100% côté client, la confidentialité RGPD, les Web Workers, les limites de fichiers, le CSV compatible Excel et la norme RFC 8259.',
    keywords: 'faq json2x confidentialite, outil json securise rgpd sans serveur, limite taille json navigateur, corriger erreur json rfc 8259, securite cles api jetons jwt navigateur, csv excel accents utf-8 bom explication, traiter fichiers json 100mo web worker, pourquoi virgule finale interdite json, usage commercial entreprise gratuit json2x, utiliser outil json hors ligne vpn, difference minifier et formater json, corriger erreur unexpected token json, licence open source mit json2x, aucune conservation donnees memoire',
    badge: 'Confiance & Gouvernance',
    h1: 'Foire Aux Questions (FAQ)',
    desc: 'Tout savoir sur la confidentialité côté client, la performance Web Worker et la conformité RFC 8259 des outils JSON2X.',
    lastUpdated: 'Dernière mise à jour : Septembre 2026',
    verifiedTrust: 'Architecture Zéro Serveur Vérifiée',
    searchPlaceholder: 'Rechercher une question (ex : confidentialité, Web Worker, CSV, Zod)...',
    searchAria: 'Rechercher dans la FAQ',
    pillsAria: 'Catégories de FAQ',
    allTopicsLabel: 'Tous les sujets',
    noResultsTitle: 'Aucune question correspondante trouvée',
    noResultsHint: 'Essayez des termes comme confidentialité, CSV, TypeScript ou RFC.',
    categories: [
      {
        id: 'privacy',
        pillLabel: 'Confidentialité & Sécurité',
        title: '1. Confidentialité des Données & Sécurité Client',
        items: [
          {
            q: 'Mes données JSON sont-elles 100% privées sur JSON2X ?',
            a: 'Oui. Le formatage, la validation, la minification et la conversion s’effectuent entièrement dans la mémoire de votre navigateur. Aucune donnée ni clé API n’est transmise sur le réseau.',
            keywords: 'confidentialite securite prive local serveur rgpd'
          },
          {
            q: 'JSON2X stocke-t-il ou journalise-t-il mes contenus ?',
            a: 'Jamais. Nous appliquons une architecture sans backend ni rétention. Fermer ou rafraîchir l’onglet vide immédiatement la mémoire locale.',
            keywords: 'stocker logs retention memoire'
          },
          {
            q: 'Puis-je utiliser JSON2X hors-ligne ou derrière un pare-feu d’entreprise ?',
            a: 'Oui. Comme aucune API distante n’est sollicitée pendant le traitement, l’outil fonctionne derrière VPN ou sans accès Internet.',
            keywords: 'hors ligne offline vpn pare-feu entreprise'
          },
          {
            q: 'Est-ce gratuit pour un usage commercial en entreprise ?',
            a: 'Oui, toutes les fonctionnalités sont gratuites sans limite ni inscription pour un usage personnel ou professionnel.',
            keywords: 'gratuit commercial entreprise licence'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: 'Outils Développeur',
        title: '2. Outils et Convertisseurs Disponibles',
        items: [
          {
            q: 'Quels utilitaires sont disponibles sur JSON2X ?',
            a: '21 outils : Formateur, Validateur RFC 8259, Minificateur, Diff, JSON ↔ CSV, YAML, XML, TOML, SQL, TypeScript, Zod, Prisma, Drizzle, GraphQL, Go/Rust/Python, JSON Schema, Données Mock, JSONPath et Visualiseur d’Arbre.',
            keywords: 'outils liste formateur validateur minificateur csv yaml xml sql zod prisma'
          },
          {
            q: 'Comment JSON vers CSV gère-t-il les accents Excel et objets imbriqués ?',
            a: 'Il aplatit automatiquement les objets via la notation pointée (user.address.city) et inclut un mode Excel UTF-8 BOM garantissant l’affichage parfait des accents français sous Microsoft Excel.',
            keywords: 'csv excel bom accents notation pointee imbrique'
          },
          {
            q: 'Puis-je générer des schémas Zod, Prisma et TypeScript automatiquement ?',
            a: 'Oui, collez un JSON d’exemple pour inférer instantanément des interfaces TypeScript, schémas Zod, modèles Prisma, tables Drizzle et types GraphQL.',
            keywords: 'typescript zod prisma drizzle graphql generer'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: 'Performance & Limites',
        title: '3. Performance et Taille Maximale',
        items: [
          {
            q: 'Quelle est la taille maximale d’un fichier JSON ?',
            a: 'L’utilisation de Web Workers permet de traiter des fichiers volumineux jusqu’à 100 Mo+ sans figer l’interface du navigateur, selon la RAM disponible.',
            keywords: 'taille maximale limite 100mo web worker'
          },
          {
            q: 'Quelle différence entre minifier et formater du JSON ?',
            a: 'Le formatage ajoute l’indentation pour la lecture humaine ; la minification supprime espaces et retours ligne pour réduire la bande passante des API.',
            keywords: 'minification formatage difference taille'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'Normes RFC 8259',
        title: '4. Syntaxe & Standards RFC',
        items: [
          {
            q: 'Pourquoi les virgules finales et guillemets simples sont-ils rejetés ?',
            a: 'IETF RFC 8259 impose des guillemets doubles et interdit toute virgule après le dernier élément pour assurer l’interopérabilité stricte entre langages.',
            keywords: 'rfc 8259 virgule finale guillemets simples erreur'
          },
          {
            q: 'Comment corriger une erreur « Unexpected token » ?',
            a: 'Notre Validateur JSON pointe exactement la ligne et la colonne fautives (accolade manquante, clé non citée, caractère non échappé).',
            keywords: 'unexpected token corriger erreur ligne colonne'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: 'Licence & Support',
        title: '5. Open Source & Contact',
        items: [
          {
            q: 'JSON2X est-il open source ?',
            a: 'Oui, le code source et les algorithmes sont ouverts sous licence MIT pour inspection communautaire.',
            keywords: 'open source github mit licence'
          },
          {
            q: 'Comment signaler un bug ou demander un nouvel outil ?',
            a: 'Ouvrez une issue sur GitHub (arjunn881/json2x) ou écrivez à support@json2x.com.',
            keywords: 'bug support contact github'
          }
        ]
      }
    ]
  },
  about: {
    title: 'À Propos de JSON2X — Outils JSON & CSV Côté Client Gratuits',
    description: 'Découvrez JSON2X : 21 utilitaires JSON et CSV sans serveur, sans inscription ni suivi publicitaire, propulsés par Web Workers directement dans votre navigateur.',
    keywords: 'a propos json2x, outils json prives navigateur, architecture sans serveur, utilitaires developpeur open source, pourquoi choisir formateur json local client, projet json open source licence mit, protection secrets api tokens entreprise, performance web worker fichiers json lourds, alternatif propre sans publicite ni compte, manifeste ingenieurie confidentialite json2x, outils developpeur sans cookie traceur, utilisation pwa hors connexion garantie, vitesse execution v8 locale instantanee, engagement confidentialite zero backend',
    eyebrow: 'À propos du projet',
    h1: 'Conçu pour les développeurs qui veulent un outil fiable et immédiat',
    lead: 'JSON2X réunit 21 utilitaires JSON et CSV gratuits, open-source et exécutés à 100 % côté navigateur. Zéro compte requis, zéro upload, zéro traçage.',
    whyTitle: 'Pourquoi JSON2X ?',
    whyParagraphs: [
      'Tout développeur doit régulièrement formater un JSON minifié, valider une configuration ou convertir une réponse API vers CSV, SQL ou TypeScript. Malheureusement, la plupart des outils en ligne envoient vos données vers leurs serveurs ou imposent des écrans lents.',
      'JSON2X prend le contrepied : chaque outil fonctionne statiquement en JavaScript pur côté client. Pas de backend, pas de base de données, pas de script de collecte. Vos secrets restent sur votre poste.',
      'Conçu pour la rapidité : chargement instantané via CDN et exécution des gros fichiers via Web Workers sans latence perceptible.'
    ],
    principlesTitle: 'Nos Principes',
    principles: [
      { title: 'Confidentialité par architecture', text: 'Aucune requête réseau lors de l’analyse ou conversion ; vérifiable à tout moment dans DevTools.' },
      { title: 'Zéro inscription forcée', text: 'Aucun paywall, aucune limite cachée ni capture d’e-mail sur nos 21 utilitaires.' },
      { title: 'Léger et rapide', text: 'Traitement asynchrone en Web Worker pour les payloads lourds sans figer l’onglet.' },
      { title: 'Utilisable hors-ligne', text: 'Une fois mis en cache par votre navigateur, les outils fonctionnent sans connexion réseau.' }
    ],
    allToolsTitle: 'Tous les Outils Développeur (21)',
    contactTitle: 'Questions ou retours ?',
    contactDesc: 'Vous avez trouvé un bug ou souhaitez suggérer une amélioration ? Écrivez-nous directement.'
  },
  docsHub: {
    title: 'Documentation Technique & Spécifications IETF JSON — JSON2X',
    description: 'Références d’architecture, spécification officielle RFC 8259, algorithmes d’aplatissement CSV, Web Workers et guides de génération de types.',
    keywords: 'documentation json rfc 8259, guide web worker json, architecture generateur typescript zod, reference grammaire officielle ietf json, algorithme aplatissement csv notation pointee, inference types optionnels typescript api, manuel technique suite outils json2x, validation stricte payloads rest microservices, optimisation memoire parsing json navigateur, guides generation schema sql prisma drizzle, algorithme diff semantique arbre json, specification parseur csv rfc 4180, reference moteur requete jsonpath, bonnes pratiques validation schema draft 07',
    schemaName: 'Hub de Documentation Technique JSON2X',
    badge: 'Documentation',
    h1: 'Documentation Technique & Spécifications',
    desc: 'Références d’ingénierie, normes IETF RFC 8259, mécanique des parseurs et guides de génération de schémas pour nos outils navigateur.',
    englishNotice: 'Remarque : Les spécifications et manuels détaillés ci-dessous s’ouvrent dans leur langue technique d’origine (anglais).',
    categoryLabels: {
      'Format & Validate': 'Formatage & Validation',
      'Data Converters': 'Convertisseurs de Données',
      'Code & Schema': 'Code & Schémas',
      'Query & Inspection': 'Requête & Visualisation',
      'Performance Notes': 'Performance'
    }
  },
  kbHub: {
    title: 'Base de Connaissances JSON : Erreurs, Tutoriels & Exemples | JSON2X',
    description: 'Plus de 50 guides techniques pour corriger les erreurs de parsing JSON, maîtriser JSONPath, valider des schémas et convertir efficacement vos données.',
    keywords: 'base connaissances json, corriger erreur unexpected token json, tutoriels tableaux objets json, guide jsonpath, resoudre virgule finale guillemets simples json, echappement caracteres controle unicode json, exemples filtres requetes jsonpath api, guide validation json schema draft 07, fiches pratiques syntaxe json developpeur, diagnostic rapide erreurs parsing json, erreur unexpected end of json input solution, syntaxe nombres chaines nulles json, eviter problemes accents csv excel bom, guide conversion api rest vers sql typescript',
    schemaName: 'Base de Connaissances Technique JSON2X',
    badge: 'Base de Connaissances',
    h1: 'Base de Connaissances & Références JSON',
    desc: 'Guides de dépannage d’erreurs JSON, spécifications syntaxiques et tutoriels pratiques pour développeurs.',
    englishNotice: 'Remarque : Les fiches techniques détaillées de la base de connaissances sont publiées en anglais (EN).',
    categoryLabels: {
      'Troubleshooting': 'Dépannage',
      'Tutorials': 'Tutoriels',
      'Examples': 'Exemples',
      'Reference': 'Référence',
      'Structures': 'Structures',
      'Validation': 'Validation',
      'Formatting': 'Formatage',
      'Databases': 'Bases de Données',
      'Backend': 'Backend',
      'Testing': 'Tests',
      'Performance': 'Performance',
      'APIs': 'APIs',
      'Schemas': 'Schémas',
      'Querying': 'Requêtes',
      'Comparison': 'Comparaison',
      'Conversion': 'Conversion',
      'Fixing': 'Correction',
      'Editors & Plugins': 'Éditeurs',
      'Languages': 'Langages',
      'Converters': 'Convertisseurs',
      'Generators': 'Générateurs',
      'Frameworks': 'Frameworks'
    }
  },
  blogHub: {
    title: 'Blog Ingénierie & Tutoriels JSON / API — JSON2X',
    description: 'Articles approfondis sur les benchmarks JSON, la migration XML/YAML/SQL, les schémas TypeScript/Zod et les architectures Web Worker sécurisées.',
    keywords: 'blog ingenierie json, tutoriel typescript zod api, benchmark minification json, kubernetes yaml vers json, migrer xml soap vers rest json, architecture zero serveur confidentialite rgpd, reduire taille reponses api minification, validation runtime zod vs interfaces typescript, comparatif json yaml toml xml sql, retours ingenieurie donnees navigateur, gerer fichiers json 50mo web workers, automatiser schemas prisma drizzle depuis json, securiser flux devops kubernetes yaml, astuces productivite developpeur api json',
    schemaName: 'Blog d’Ingénierie JSON2X',
    badge: 'Blog d’Ingénierie',
    h1: 'Blog Technique & Tutoriels',
    desc: 'Articles détaillés sur l’ingénierie de données côté client, les standards RFC, l’inférence de types et la confidentialité sans serveur.',
    englishNotice: 'Remarque : Chaque article complet du blog s’ouvre dans sa version originale en anglais (EN).',
    categoryLabels: {
      'Architecture': 'Architecture',
      'Validation': 'Validation',
      'Performance': 'Performance',
      'DevOps': 'DevOps',
      'Data Engineering': 'Data Engineering',
      'Enterprise': 'Entreprise / Legacy',
      'Tooling': 'Outillage',
      'Databases': 'Bases de Données',
      'Productivity': 'Productivité',
      'TypeScript': 'TypeScript',
      'Backend': 'Backend',
      'API Design': 'Design d’API',
      'Security': 'Sécurité',
      'Querying': 'Requêtes',
      'Visualization': 'Visualisation'
    }
  }
};

const dePages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — Kostenlose JSON & CSV Entwickler-Tools Online (100% Lokal im Browser)',
    description: '21 kostenlose JSON- & CSV-Tools komplett ohne Server-Upload: Formatter, RFC-8259-Validator, Minifier, Diff-Vergleich, Tree Viewer sowie Konverter für CSV, YAML, XML, TOML, SQL, TypeScript & Zod.',
    keywords: 'json formatter online kostenlos dsgvo, json validator pruefen rfc 8259, json in csv excel konvertieren, json zu typescript zod generator, json vergleichen diff online, json baumansicht viewer, entwickler werkzeug sammlung json online, json ohne upload im browser pruefen, json zu yaml xml toml sql umwandeln, prisma drizzle graphql modelle aus json, go rust python structs aus json generieren, grosse json dateien mit web worker oeffnen, jsonpath abfragen kostenlos live testen, datenschutz konforme json tools offline',
    itemListName: 'JSON2X — Alle JSON & CSV Werkzeuge',
    heroSectionAria: 'JSON2X Übersicht',
    heroPromptCmd: 'json2x --schnell --privat',
    heroTitleBefore: '100 % Clientseitige ',
    heroTitleAccent: 'JSON & CSV',
    heroTitleAfter: ' Entwickler-Tools direkt im Browser',
    heroSub: 'Einundzwanzig blitzschnelle Werkzeuge mit lokalem Web-Worker-Antrieb. JSON formatieren, prüfen, minifizieren, vergleichen, abfragen und in CSV, YAML, XML, SQL, TypeScript oder Zod umwandeln – ohne ein einziges Byte an einen Server zu senden.',
    heroBtnFormatter: 'formatter_oeffnen()',
    heroBtnAllTools: '// alle_tools_ansehen (21)',
    trustClientSide: '100 % Clientseitig',
    trustZeroLatency: 'Null Server-Latenz',
    trustNoTracking: 'Ohne Login & Tracking',
    terminalTitle: 'json2x_engine.ts — 0 KB Netzwerk',
    terminalComment: '// Live-Demonstration der lokalen Browser-Analyse',
    terminalStatus: 'lokal',
    credibilityAria: 'Technische Sicherheitsgarantien',
    credibilityCards: [
      {
        title: 'Web-Worker Datenschutz',
        desc: 'Sämtliche Parsing- und Formatierungslogik läuft ausschließlich im Arbeitsspeicher Ihres Browsers. API-Keys, Token und Kundendaten verlassen nie Ihren Rechner.'
      },
      {
        title: 'Null Netzwerk-Latenz',
        desc: 'Keine Wartezeiten auf entfernte APIs. Selbst mehrere Megabyte große JSON-Payloads werden sofort mit nativer V8-Geschwindigkeit formatiert.'
      },
      {
        title: 'Konform mit IETF RFC 8259',
        desc: 'Strikte Syntaxprüfung mit exakter Zeilen- und Spaltenangabe, Erkennung nachgestellter Kommas und nicht maskierter Steuerzeichen.'
      },
      {
        title: 'Offline- & PWA-fähig',
        desc: 'Automatisch per Service Worker zwischengespeichert. Läuft zuverlässig auf Reisen, im ICE oder in abgeschotteten Firmennetzen.'
      }
    ],
    toolsSectionAria: 'Alle 21 Entwickler-Tools',
    toolsSectionTag: '$ ls ./werkzeuge/',
    toolsSectionTitle: 'Entwickler-Werkzeuge (21)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': 'Zeile 4, Spalte 12: Nachgestelltes Komma',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "status": 200  + "status": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (Excel UTF-8 BOM)',
      'csv-to-json': 'name,alter → [{"name":"Anna","alter":28}]',
      'json-to-yaml': '{"a":1} → a: 1 (Kubernetes YAML)',
      'json-to-xml': '{"a":1} → <root><a>1</a></root>',
      'json-to-toml': '{"titel":"App"} → titel = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → Go Struct / Rust Serde / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"name":"Lukas"}]',
      'jsonpath': '$.shop.buch[*].autor',
      'json-tree-viewer': 'Objekt [3 Keys] → benutzer'
    },
    editorialAria: 'Technischer Leitfaden zur JSON-Architektur',
    editorialEyebrow: 'Software-Architektur',
    editorialTitle: 'Technische Grundlagen moderner JSON-Datenverarbeitung',
    editorialIntro: 'JavaScript Object Notation (JSON) bildet nach IETF RFC 8259 und ECMA-404 das Fundament des modernen Web-Datenaustauschs für REST-APIs, Microservices, NoSQL-Datenbanken und Konfigurationssysteme.',
    editorialSec1Title: '1. Clientseitiges Parsing vs. DSGVO-Risiken durch Server-Tools',
    editorialSec1P1: 'Werden sensible JSON-Payloads mit Bearer-Tokens, Datenbank-Credentials oder personenbezogenen Daten in serverbasierte Online-Formatter eingefügt, verlassen vertrauliche Daten Ihr Unternehmen – ein klares Risiko für DSGVO-Konformität und IT-Sicherheit.',
    editorialSec1P2: 'JSON2X löst dieses Problem architektonisch: Alle 21 Tools arbeiten vollständig lokal in der JavaScript-Engine Ihres Browsers. Es findet keinerlei Serverübertragung statt.',
    editorialSec2Title: '2. Strikte RFC-8259-Regeln & Validierungskriterien',
    editorialSec2Intro: 'Im Gegensatz zu JavaScript-Objektliteralen schreibt RFC 8259 strenge syntaktische Regeln vor:',
    editorialSec2Rules: [
      { bold: 'Doppelte Anführungszeichen Pflicht:', text: 'Schlüssel und Strings müssen in "doppelten Anführungszeichen" stehen – einfache Anführungszeichen erzeugen Parse-Fehler.' },
      { bold: 'Keine nachgestellten Kommas:', text: 'Trailing Commas nach dem letzten Element eines Objekts oder Arrays sind in standardkonformem JSON unzulässig.' },
      { bold: 'Steuerzeichen-Maskierung:', text: 'Zeilenumbrüche oder Tabs in Strings müssen als \\n, \\t oder \\uXXXX kodiert werden.' },
      { bold: 'Saubere Zahlenformate:', text: 'Führende Nullen wie 0123 sowie NaN oder Infinity sind verboten.' }
    ],
    editorialSec3Title: '3. Format-Vergleichsmatrix: JSON vs. CSV vs. YAML vs. XML vs. SQL',
    editorialSec3Intro: 'Je nach Zielplattform eignet sich ein anderes Serialisierungsformat:',
    tableHeaders: ['Format', 'Haupteinsatzzweck', 'Lesbarkeit', 'Verschachtelung', 'Parse-Tempo'],
    tableRows: [
      ['JSON', 'REST-APIs, NoSQL, Configs', 'Hoch', 'Nativ (Objekte/Arrays)', 'Ultraschnell (Nativ JS)'],
      ['CSV', 'Excel, Datenanalyse, BI', 'Mittel', 'Flach (Dot-Notation nötig)', 'Schnell (Tabellarisch)'],
      ['YAML', 'Kubernetes, CI/CD, Docker', 'Sehr hoch', 'Nativ (Einrückung)', 'Mittel'],
      ['XML', 'SOAP, Schnittstellen, Enterprise', 'Mittel', 'Nativ (Tag-Hierarchie)', 'Mittel (DOM-Parser)'],
      ['SQL', 'Relationale Datenbanken', 'Hoch', 'Relational (FK / JSONB)', 'Schnell (DB-Engine)']
    ],
    editorialSec4Title: '4. Häufig gestellte Fragen (FAQ)',
    editorialFaqs: [
      {
        q: 'Ist JSON2X zu 100 % kostenlos für kommerzielle Projekte?',
        a: 'Ja. Alle 21 Werkzeuge, Code-Generatoren und Schemaprüfungen sind ohne Registrierung, Abo oder Nutzungsgrenze kostenfrei nutzbar.'
      },
      {
        q: 'Wie große JSON-Dateien können verarbeitet werden?',
        a: 'Durch die lokale Verarbeitung im Arbeitsspeicher und Web-Worker-Auslagerung lassen sich Dateien bis über 100 MB je nach System-RAM flüssig formatieren.'
      },
      {
        q: 'Speichert oder protokolliert JSON2X meine eingefügten Daten?',
        a: 'Niemals. Im Netzwerk-Tab Ihrer Browser-DevTools sehen Sie, dass beim Arbeiten 0 Anfragen nach außen gesendet werden.'
      }
    ],
    hubAria: 'Dokumentation & Anleitungen',
    hubTitle: 'Dokumentation & Technische Leitfäden',
    hubLead: 'IETF-Spezifikationen, Web-Worker-Performance und Code-Generierungs-Handbücher für Entwickler.',
    hubLangBadge: 'Vollständige technische Fachartikel liegen im englischen Original (EN) vor',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Große JSON-Dateien mit Web Workern parsen (EN)',
        desc: 'Verhindern Sie UI-Blockaden beim Verarbeiten zweistelliger Megabyte-Dateien durch asynchrone Worker-Threads.'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'TypeScript-Interfaces & Zod-Schemas generieren (EN)',
        desc: 'Wie aus Beispiel-JSONs strikte statische Typen und Zod-Laufzeitprüfungen entstehen.'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'Vollständige IETF RFC 8259 JSON-Referenz (EN)',
        desc: 'Alle Datentypen, Unicode-Escape-Sequenzen und Validierungsregeln im Detail.'
      }
    ]
  },
  toolsCatalog: {
    title: 'Katalog aller 21 kostenlosen JSON & CSV Entwickler-Tools — JSON2X',
    description: 'Vollständiges Verzeichnis der 21 lokalen JSON- und CSV-Tools: Formatter, Validator, Minifier, Diff-Checker, CSV/YAML/XML/TOML/SQL-Konverter sowie TypeScript, Zod, Prisma & GraphQL Generatoren.',
    keywords: 'json tools katalog kostenlos, json werkzeugsammlung entwickler, typescript zod prisma generator online, json yaml xml csv konverter, alle 21 json2x tools uebersicht, formatter validator minifier diff checker kostenlos, go rust python graphql schema generator, mock testdaten json und jsonpath tester, csv excel utf-8 bom konvertierung browser, lokale api tools ohne registrierung, json zu drizzle toml schema online, grosser json baum viewer browser, offline entwickler werkzeuge pwa dsgvo, kostenloser api payload konverter',
    schemaName: 'JSON2X Entwickler-Tool-Suite',
    badgeTemplate: 'Katalog ({count} Werkzeuge)',
    h1: 'JSON & CSV Entwickler-Tool-Suite',
    lead: 'Alle 21 Werkzeuge laufen zu 100 % lokal in Ihrem Browser – ohne Latenz und ohne Datenübertragung, nach Kategorien sortiert.',
    filterAria: 'Werkzeuge nach Kategorie filtern',
    allToolsLabel: 'Alle Tools',
    utilitiesUnit: 'Tools'
  },
  faq: {
    title: 'Häufige Fragen (FAQ) Datenschutz, DSGVO & JSON-Tools | JSON2X',
    description: 'Antworten zur clientseitigen Verarbeitung ohne Server, Web-Worker-Leistung, IETF-RFC-8259-Validierung, Excel-BOM-Export und Open-Source-Lizenz von JSON2X.',
    keywords: 'json2x faq fragen, json formatter dsgvo sicher ohne server, maximale dateigroesse json browser, trailing comma rfc 8259 fehler, api schluessel jwt token sicher formatieren, umlaute excel csv utf-8 bom loesung, json 100mb verarbeiten web worker hilfe, unexpected token syntaxfehler beheben, gewerbliche nutzung kostenlos ohne login, offline einsatz im firmennetz vpn, unterschied minifizieren und formatieren json, open source mit lizenz json2x, null datenspeicherung browser arbeitsspeicher, verschachtelte json csv punkt notation',
    badge: 'Sicherheit & Transparenz',
    h1: 'Häufig gestellte Fragen (FAQ)',
    desc: 'Umfassende Antworten zu Datenschutz ohne Server, Web-Worker-Performance, Dateigrößen und RFC-8259-Standards.',
    lastUpdated: 'Stand: September 2026',
    verifiedTrust: 'Geprüfte Zero-Server-Architektur',
    searchPlaceholder: 'FAQ durchsuchen (z. B. DSGVO, Web Worker, CSV, Zod)...',
    searchAria: 'FAQ durchsuchen',
    pillsAria: 'FAQ-Themenkategorien',
    allTopicsLabel: 'Alle Themen',
    noResultsTitle: 'Keine passenden Fragen gefunden',
    noResultsHint: 'Versuchen Sie Begriffe wie Datenschutz, CSV, TypeScript oder RFC.',
    categories: [
      {
        id: 'privacy',
        pillLabel: 'Datenschutz & Sicherheit',
        title: '1. Datenschutz & Clientseitige Sicherheit',
        items: [
          {
            q: 'Bleiben meine JSON-Daten bei JSON2X wirklich zu 100 % privat?',
            a: 'Ja. Alle Aktionen laufen lokal im Browser-Speicher ab. Weder JSON-Payloads noch API-Keys verlassen Ihr Gerät – überprüfbar über den Network-Tab der DevTools.',
            keywords: 'datenschutz sicherheit lokal dsgvo server netzwerk'
          },
          {
            q: 'Speichert oder protokolliert JSON2X eingefügte Eingaben?',
            a: 'Niemals. Es gibt keinen Backend-Server. Nach dem Schließen des Browser-Tabs wird der Arbeitsspeicher sofort freigegeben.',
            keywords: 'speichern log datenspeicherung arbeitsspeicher'
          },
          {
            q: 'Funktioniert JSON2X offline oder im Firmennetz hinter einem Proxy?',
            a: 'Ja. Da keine externen Verarbeitungs-APIs benötigt werden, laufen alle Tools zuverlässig im VPN oder offline.',
            keywords: 'offline vpn firmennetz proxy firewall'
          },
          {
            q: 'Ist die Nutzung auch für Unternehmen kostenlos?',
            a: 'Ja, alle 21 Tools sind für private, gewerbliche und Enterprise-Projekte kostenlos.',
            keywords: 'kostenlos gewerblich unternehmen lizenz'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: 'Entwickler-Tools',
        title: '2. Werkzeuge & Funktionsumfang',
        items: [
          {
            q: 'Welche Werkzeuge stehen auf JSON2X bereit?',
            a: '21 Utilities: JSON Formatter, Validator, Minifier, Diff-Checker, JSON ↔ CSV, YAML, XML, TOML, SQL, TypeScript, Zod, Prisma, Drizzle, GraphQL, Go/Rust/Python-Generator, JSON Schema, Mock-Daten, JSONPath und Tree Viewer.',
            keywords: 'werkzeuge liste formatter validator minifier csv yaml xml sql zod prisma'
          },
          {
            q: 'Wie verhindert JSON-zu-CSV Umlaut-Fehler in Microsoft Excel?',
            a: 'Unser Konverter unterstützt den Modus „Excel-Dialekt (BOM)“ mit UTF-8 BOM, damit deutsche Umlaute (ä, ö, ü, ß) direkt richtig in Excel erscheinen, und flacht verschachtelte Keys automatisch per Punkt-Notation ab.',
            keywords: 'csv excel bom umlaute dot notation'
          },
          {
            q: 'Kann ich TypeScript-Interfaces, Zod und Prisma direkt erzeugen?',
            a: 'Ja. Aus jedem JSON-Beispiel werden automatisch Typen, optionale Felder, z.object()-Schemas, Prisma-Modelle oder Drizzle-Tabellen abgeleitet.',
            keywords: 'typescript zod prisma drizzle graphql generieren'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: 'Leistung & Limits',
        title: '3. Performance & Dateigrößen',
        items: [
          {
            q: 'Wie groß dürfen JSON-Dateien maximal sein?',
            a: 'Durch Web Worker blockiert die Oberfläche nicht. Dateien bis 100 MB+ lassen sich je nach lokalem RAM reibungslos verarbeiten.',
            keywords: 'dateigroesse limit maximum 100mb web worker'
          },
          {
            q: 'Was unterscheidet Minifizieren vom Formatieren?',
            a: 'Formatieren ergänzt Einrückungen für Lesbarkeit; Minifizieren entfernt unnötige Leerzeichen zur Traffic-Ersparnis in APIs.',
            keywords: 'minifizieren formatieren unterschied payload'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'RFC-Standards',
        title: '4. Syntax & IETF RFC 8259',
        items: [
          {
            q: 'Warum verbietet JSON nachgestellte Kommas und einfache Anführungszeichen?',
            a: 'IETF RFC 8259 erzwingt doppelte Anführungszeichen und verbietet Trailing Commas für 100 % eindeutige Parser über alle Programmiersprachen hinweg.',
            keywords: 'rfc 8259 trailing comma nachgestelltes komma'
          },
          {
            q: 'Wie behebe ich einen „Unexpected token“-Syntaxfehler?',
            a: 'Fügen Sie den Payload in den JSON-Validator ein: Zeilen- und Spaltennummer zeigen sofort die exakte Fehlerstelle.',
            keywords: 'unexpected token syntaxfehler zeile spalte'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: 'Lizenz & Kontakt',
        title: '5. Open Source & Support',
        items: [
          {
            q: 'Ist JSON2X Open Source?',
            a: 'Ja, Algorithmen und Dokumentation sind unter MIT-Lizenz offen einsehbar.',
            keywords: 'open source github mit lizenz'
          },
          {
            q: 'Wo melde ich Fehler oder Feature-Wünsche?',
            a: 'Per GitHub-Issue im Repository arjunn881/json2x oder per E-Mail an support@json2x.com.',
            keywords: 'bug melden kontakt support'
          }
        ]
      }
    ]
  },
  about: {
    title: 'Über JSON2X — Datenschutzfreundliche JSON & CSV Entwickler-Tools',
    description: 'Erfahren Sie mehr über JSON2X: 21 kostenlose JSON- und CSV-Tools, 100 % lokal im Browser ohne Backend, ohne Cookies und mit Web-Worker-Unterstützung.',
    keywords: 'ueber json2x, lokale json tools dsgvo, clientseitige entwicklerwerkzeuge, open source json suite, warum json ohne backend server verarbeiten, open source entwicklungstools mit mit lizenz, schutz vertraulicher firmendaten im browser, asynchrone leistung durch web worker threads, werbefreie schnelle entwickler plattform, architektur prinzipien zero server json2x, json tools ohne tracking cookies, schnelle cdn auslieferung pwa offline, entwickler produkte ohne paywall login, transparenz clientseitige datenverarbeitung',
    eyebrow: 'Über diese Plattform',
    h1: 'Gebaut für Entwickler, die zuverlässige Tools ohne Ballast brauchen',
    lead: 'JSON2X ist eine kostenlose Open-Source-Sammlung von 21 JSON- und CSV-Werkzeugen direkt im Browser – ohne Login, ohne Server-Upload und ohne Tracking.',
    whyTitle: 'Warum JSON2X?',
    whyParagraphs: [
      'Jeder Entwickler formatiert täglich API-Antworten, prüft Konfigurationsdateien vor dem Deployment oder exportiert Daten in CSV oder SQL. Leider übertragen viele Online-Dienste vertrauliche Daten an fremde Server oder überladen die Oberfläche.',
      'JSON2X geht den konsequenten Gegenweg: Alles läuft rein statisch in Ihrem Browser. Kein Backend, keine Datenbank, keine Analytics-Übermittlung – Ihre Token und Produktivdaten verlassen nie Ihr Gerät.',
      'Hohe Geschwindigkeit durch globale CDN-Auslieferung und flüssige Verarbeitung großer Payloads über Web Worker.'
    ],
    principlesTitle: 'Unsere Architektur-Prinzipien',
    principles: [
      { title: 'Datenschutz durch Architektur', text: 'Kein Datenversand ins Internet – jederzeit im Network-Tab der DevTools nachprüfbar.' },
      { title: 'Keine Registrierungspflicht', text: 'Alle 21 Tools ohne Paywall, Zeichenlimit oder E-Mail-Zwang.' },
      { title: 'Schlank und reaktionsschnell', text: 'Große Dateien ab 200 KB laufen asynchron im Web Worker ohne UI-Hänger.' },
      { title: 'Offline einsatzbereit', text: 'Einmal geladen und gecacht, funktionieren die Tools auch komplett ohne Internetverbindung.' }
    ],
    allToolsTitle: 'Alle Entwickler-Werkzeuge (21)',
    contactTitle: 'Fragen oder Feedback?',
    contactDesc: 'Fehler entdeckt oder Ideen für ein neues Werkzeug? Wir freuen uns auf Ihre Nachricht.'
  },
  docsHub: {
    title: 'Entwickler-Dokumentation & IETF RFC 8259 Spezifikationen — JSON2X',
    description: 'Technische Dokumentation, RFC-8259-Grammatik, Web-Worker-Architektur und Code-Generierungs-Anleitungen für alle Tools von JSON2X.',
    keywords: 'json rfc 8259 dokumentation, web worker json anleitung, schema inferenz doku, offizielle ietf json grammatik referenz, csv punkt notation abflachung erklaert, typescript zod typinferenz algorithmus, technische spezifikationen json2x werkzeuge, rest api payload validierung leitfaden, performantes json parsing grosse dateien, handbuch datenkonverter und schema builder, semantischer json diff baum vergleich, csv parser spezifikation rfc 4180, jsonpath evaluator syntax architektur, orm modell generierung prisma drizzle',
    schemaName: 'JSON2X Dokumentations-Hub',
    badge: 'Dokumentations-Hub',
    h1: 'Entwickler-Dokumentation & Spezifikationen',
    desc: 'Architektur-Referenzen, IETF-RFC-Standards, Parser-Mechaniken und Typsicherheits-Guides für unsere 21 browsernativen Tools.',
    englishNotice: 'Hinweis: Die einzelnen technischen Fachartikel öffnen im englischen Original (EN) für konsistente Spezifikationsterminologie.',
    categoryLabels: {
      'Format & Validate': 'Formatieren & Prüfen',
      'Data Converters': 'Datenkonverter',
      'Code & Schema': 'Code & Schemas',
      'Query & Inspection': 'Abfrage & Inspektion',
      'Performance Notes': 'Performance-Hinweise'
    }
  },
  kbHub: {
    title: 'JSON Wissensdatenbank: Fehlerhilfe, Beispiele & Tutorials | JSON2X',
    description: 'Technisches Nachschlagewerk mit über 50 Anleitungen zu JSON-Fehlern, Arrays, Objekten, Validierung, Escaping und JSONPath.',
    keywords: 'json fehlerhilfe wissensdatenbank, unexpected token json loesen, json tutorials beispiele, nachgestelltes komma einfache anfuehrungszeichen fix, zeilenumbruch unicode escaping in json korrigieren, jsonpath filterausdruecke beispiele praxis, json schema draft 07 validierung anleitung, entwickler spickzettel arrays objekte json, schnelle fehlerdiagnose api json antworten, referenz haeufige json parse fehler, unexpected end of json input beheben, gueltige datentypen zahlen null in json, umlaute excel csv problem vermeiden, leitfaden api json nach sql typescript',
    schemaName: 'JSON2X Wissensdatenbank',
    badge: 'Wissensdatenbank',
    h1: 'JSON Wissensdatenbank & Technische Referenz',
    desc: 'Kompakte Fehleranalysen, Syntax-Referenzen und praxisnahe Entwickler-Anleitungen.',
    englishNotice: 'Hinweis: Detaillierte Artikel dieser Wissensdatenbank werden auf Englisch (EN) bereitgestellt.',
    categoryLabels: {
      'Troubleshooting': 'Fehlerbehebung',
      'Tutorials': 'Anleitungen',
      'Examples': 'Beispiele',
      'Reference': 'Referenz',
      'Structures': 'Strukturen',
      'Validation': 'Validierung',
      'Formatting': 'Formatierung',
      'Databases': 'Datenbanken',
      'Backend': 'Backend',
      'Testing': 'Testing',
      'Performance': 'Performance',
      'APIs': 'APIs',
      'Schemas': 'Schemas',
      'Querying': 'Abfragen',
      'Comparison': 'Vergleich',
      'Conversion': 'Konvertierung',
      'Fixing': 'Reparatur',
      'Editors & Plugins': 'Editoren',
      'Languages': 'Sprachen',
      'Converters': 'Konverter',
      'Generators': 'Generatoren',
      'Frameworks': 'Frameworks'
    }
  },
  blogHub: {
    title: 'Entwickler-Blog & JSON-Tutorials — JSON2X',
    description: 'Vertiefende Fachartikel zu JSON-Performance-Benchmarks, YAML/XML/SQL-Migration, TypeScript & Zod und Zero-Server-Datenschutz.',
    keywords: 'json entwickler blog deutsch, typescript zod tutorials deutsch, json minifizierung benchmarks, yaml xml sql anleitungen, xml soap migration auf modernes json, zero server datenschutz architektur dsgvo, api traffic reduzieren json minifizieren, laufzeitpruefung mit zod schema best practices, datenformate vergleich json yaml toml sql, praxisberichte client data engineering, grosse json logs ohne ui blockierung parsen, prisma drizzle schemas aus api antworten, kubernetes docker yaml konvertierung tipps, sichere entwickler workflows im browser',
    schemaName: 'JSON2X Entwickler-Blog & Tutorials',
    badge: 'Entwickler-Blog',
    h1: 'Entwickler-Blog & Praxis-Tutorials',
    desc: 'Praxisnahe Artikel über clientseitiges Data Engineering, RFC-Standards, Typinferenz und Serverlos-Privatsphäre.',
    englishNotice: 'Hinweis: Die vollständigen Fachartikel des Blogs sind auf Englisch (EN) verfasst.',
    categoryLabels: {
      'Architecture': 'Architektur',
      'Validation': 'Validierung',
      'Performance': 'Performance',
      'DevOps': 'DevOps',
      'Data Engineering': 'Data Engineering',
      'Enterprise': 'Enterprise / Legacy',
      'Tooling': 'Tooling',
      'Databases': 'Datenbanken',
      'Productivity': 'Produktivität',
      'TypeScript': 'TypeScript',
      'Backend': 'Backend',
      'API Design': 'API-Design',
      'Security': 'Sicherheit',
      'Querying': 'Abfragen',
      'Visualization': 'Visualisierung'
    }
  }
};

const ptPages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — Ferramentas JSON e CSV Online Grátis para Desenvolvedores (100% Local)',
    description: '21 ferramentas JSON e CSV gratuitas no navegador sem enviar dados: formatador, validador RFC 8259, minificador, comparador diff, visualizador de árvore e conversores CSV, YAML, XML, TOML, SQL, TypeScript e Zod.',
    keywords: 'ferramentas json online gratis, formatador json seguro navegador, validador json rfc 8259, converter json para csv excel, json para typescript zod online, comparar dois json diff, visualizador arvore json, suite utilitarios json para programadores, corrigir validar json sem enviar servidor, converter json yaml xml toml sql gratis, gerador prisma drizzle graphql a partir json, exportar go rust python de json online, abrir arquivo json grande com web worker, testar consultas jsonpath gratis navegador',
    itemListName: 'JSON2X — Todas as Ferramentas JSON e CSV',
    heroSectionAria: 'Apresentação JSON2X',
    heroPromptCmd: 'json2x --rapido --privado',
    heroTitleBefore: 'Ferramentas ',
    heroTitleAccent: 'JSON e CSV',
    heroTitleAfter: ' 100% no Navegador para Desenvolvedores',
    heroSub: 'Vinte e um utilitários ultrarrápidos executados localmente. Formate, valide, minifique, compare diffs, consulte com JSONPath e converta para CSV, YAML, XML, SQL, TypeScript ou Zod sem enviar nenhum byte ao servidor.',
    heroBtnFormatter: 'abrir_formatador()',
    heroBtnAllTools: '// ver_todas_ferramentas (21)',
    trustClientSide: '100% no Navegador',
    trustZeroLatency: 'Zero Latência de Servidor',
    trustNoTracking: 'Sem Cadastro nem Rastreamento',
    terminalTitle: 'motor_json2x.ts — 0 KB de rede',
    terminalComment: '// Demonstração ao vivo de processamento local no cliente',
    terminalStatus: 'local',
    credibilityAria: 'Garantias Técnicas de Privacidade',
    credibilityCards: [
      {
        title: 'Privacidade com Web Worker',
        desc: 'Toda a análise e formatação roda exclusivamente na memória do navegador. Chaves de API, tokens e dados LGPD nunca saem da sua máquina.'
      },
      {
        title: 'Zero Latência de Rede',
        desc: 'Sem idas e vindas a servidores remotos. Payloads JSON de vários megabytes são formatados na hora com velocidade nativa JS.'
      },
      {
        title: 'Conforme IETF RFC 8259',
        desc: 'Validação rigorosa apontando linha e coluna exatas, vírgulas sobrando no fim, chaves sem aspas e caracteres inválidos.'
      },
      {
        title: 'Pronto para Offline e PWA',
        desc: 'Em cache automático por Service Workers. Funciona perfeitamente sem internet em viagens ou redes corporativas restritas.'
      }
    ],
    toolsSectionAria: 'Todas as 21 ferramentas de desenvolvimento',
    toolsSectionTag: '$ ls ./ferramentas/',
    toolsSectionTitle: 'Utilitários para Desenvolvedores (21)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': 'Linha 4, Col 12: Vírgula final inválida',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "status": 200  + "status": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (CSV Excel BOM)',
      'csv-to-json': 'nome,idade → [{"nome":"Lucas","idade":28}]',
      'json-to-yaml': '{"a":1} → a: 1 (YAML limpo)',
      'json-to-xml': '{"a":1} → <root><a>1</a></root>',
      'json-to-toml': '{"titulo":"App"} → titulo = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → Go struct / Rust / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"nome":"Mariana"}]',
      'jsonpath': '$.loja.livro[*].autor',
      'json-tree-viewer': 'objeto [3 chaves] → usuario'
    },
    editorialAria: 'Guia Técnico de Engenharia JSON',
    editorialEyebrow: 'Arquitetura de Software',
    editorialTitle: 'Mecânica Técnica do Intercâmbio Moderno de Dados JSON',
    editorialIntro: 'JavaScript Object Notation (JSON) tornou-se o padrão universal da web. Especificado pela IETF RFC 8259 e ECMA-404, oferece leveza e compatibilidade entre linguagens para APIs REST, microsserviços e bancos NoSQL.',
    editorialSec1Title: '1. Parsing no Cliente vs. Riscos de Segurança em Servidor',
    editorialSec1P1: 'Colar tokens de autorização, strings de banco de dados ou registros de clientes em formatadores tradicionais baseados em servidor envia seus dados pela rede, criando riscos críticos de vazamento e violações da LGPD e GDPR.',
    editorialSec1P2: 'O JSON2X elimina esse risco: todas as 21 ferramentas executam 100 % localmente no motor JavaScript do navegador (V8 / SpiderMonkey / JavaScriptCore). Zero bytes são enviados pela internet.',
    editorialSec2Title: '2. Conformidade Estrita RFC 8259 e Regras de Sintaxe',
    editorialSec2Intro: 'Parsers estritos seguem regras rígidas que diferenciam JSON válido de objetos literais JavaScript:',
    editorialSec2Rules: [
      { bold: 'Aspas duplas obrigatórias:', text: 'Chaves e strings precisam de aspas duplas ("chave"). Aspas simples disparam erro de sintaxe.' },
      { bold: 'Sem vírgula no final:', text: 'Trailing commas após o último item de um objeto ou array são proibidas pela RFC 8259.' },
      { bold: 'Escape de caracteres:', text: 'Quebras de linha ou tabs dentro de strings exigem \\n, \\t ou \\uXXXX.' },
      { bold: 'Números válidos:', text: 'Zeros à esquerda (0123) e valores NaN ou Infinity não existem em JSON padrão.' }
    ],
    editorialSec3Title: '3. Matriz Comparativa: JSON vs CSV vs YAML vs XML vs SQL',
    editorialSec3Intro: 'Cada camada da arquitetura pede o formato de serialização ideal:',
    tableHeaders: ['Formato', 'Principal Caso de Uso', 'Legibilidade', 'Dados Aninhados', 'Velocidade'],
    tableRows: [
      ['JSON', 'APIs REST, NoSQL, Configs', 'Alta', 'Nativo (Objetos/Arrays)', 'Ultrarrápida (Nativa JS)'],
      ['CSV', 'Excel, Planilhas, BI', 'Média', 'Plano (requer notação de ponto)', 'Rápida (Fluxo tabular)'],
      ['YAML', 'Kubernetes, CI/CD, Docker', 'Muito Alta', 'Nativo (Indentação)', 'Moderada'],
      ['XML', 'SOAP, Notas Fiscais, Legado', 'Média', 'Nativo (Tags)', 'Moderada (Parser DOM)'],
      ['SQL', 'Bancos Relacionais DDL/DML', 'Alta', 'Relacional (FK / JSONB)', 'Rápida (Motor DB)']
    ],
    editorialSec4Title: '4. Perguntas Frequentes (FAQ)',
    editorialFaqs: [
      {
        q: 'O JSON2X é 100% gratuito para projetos comerciais e empresas?',
        a: 'Sim. Todas as 21 ferramentas e geradores são totalmente gratuitos, sem cadastro e sem limite de uso.'
      },
      {
        q: 'Qual o tamanho máximo de arquivo JSON suportado?',
        a: 'Por rodar em memória local com apoio de Web Workers, arquivos de 50 MB a 100 MB+ são formatados e validados sem travar o navegador.'
      },
      {
        q: 'O JSON2X armazena ou registra o conteúdo que eu colo?',
        a: 'Nunca. Você pode abrir a aba Rede (Network) do DevTools e confirmar zero requisições externas durante o uso.'
      }
    ],
    hubAria: 'Documentação Técnica e Guias',
    hubTitle: 'Documentação e Guias Técnicos',
    hubLead: 'Especificações IETF, otimização com Web Workers e guias práticos para engenharia JSON moderna.',
    hubLangBadge: 'Os manuais técnicos completos abaixo estão em inglês original (EN)',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Processando JSONs Grandes com Web Workers (EN)',
        desc: 'Evite travamentos na interface principal ao analisar arquivos JSON de dezenas de megabytes.'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'Guia de Interfaces TypeScript e Schemas Zod (EN)',
        desc: 'Como gerar tipos estáticos estritos e validação runtime em TypeScript direto de APIs.'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'Referência Oficial IETF RFC 8259 JSON (EN)',
        desc: 'Detalhamento completo de regras sintáticas, tipos de dados e escapes obrigatórios.'
      }
    ]
  },
  toolsCatalog: {
    title: 'Catálogo das 21 Ferramentas JSON e CSV Online Grátis — JSON2X',
    description: 'Diretório completo com 21 ferramentas locais para JSON e CSV: formatador, validador, minificador, diff checker, conversores YAML/XML/TOML/SQL e geradores TypeScript, Zod, Prisma e GraphQL.',
    keywords: 'catalogo ferramentas json gratis, utilitarios desenvolvedor json csv, gerador typescript zod prisma online, conversor json yaml xml sql, diretorio completo 21 ferramentas json2x, formatador validador minificador comparador diff, gerador modelos go rust python graphql, massa dados mock json e testador jsonpath, exportacao csv excel utf-8 bom acentos, ferramentas dev privadas sem cadastro, json para drizzle toml schema gratis, leitor visualizador arvore json grande, ferramentas json offline pwa brasil portugal, suite completa api payload navegador',
    schemaName: 'Suíte de Ferramentas JSON2X',
    badgeTemplate: 'Catálogo ({count} Utilitários)',
    h1: 'Suíte Completa de Ferramentas JSON e CSV',
    lead: 'Todas as 21 ferramentas rodam 100 % no seu navegador com zero latência e privacidade total.',
    filterAria: 'Filtrar ferramentas por categoria',
    allToolsLabel: 'Todas',
    utilitiesUnit: 'Ferramentas'
  },
  faq: {
    title: 'Perguntas Frequentes (FAQ) Privacidade, LGPD & JSON | JSON2X',
    description: 'Respostas detalhadas sobre segurança no navegador, Web Workers, conformidade RFC 8259, suporte a Excel UTF-8 BOM e licença MIT no JSON2X.',
    keywords: 'faq json2x privacidade, formatador json seguro lgpd, limite arquivo json navegador, erro sintaxe json rfc 8259, seguranca chaves api tokens jwt cliente, evitar erro acentos csv excel bom portugues, processar json 100mb com web workers, resolver erro unexpected token virgula final, uso comercial corporativo gratuito json2x, usar ferramentas json offline em vpn, diferenca minificar e formatar json, licenca codigo aberto mit json2x, zero retencao servidor memoria navegador, objetos aninhados notacao ponto csv',
    badge: 'Confiança e Transparência',
    h1: 'Perguntas Frequentes (FAQ)',
    desc: 'Respostas objetivas sobre execução local sem servidor, desempenho com Web Workers e regras oficiais RFC 8259.',
    lastUpdated: 'Última atualização: Setembro de 2026',
    verifiedTrust: 'Arquitetura Sem Servidor Verificada',
    searchPlaceholder: 'Buscar no FAQ (ex: privacidade, Web Worker, CSV, Zod)...',
    searchAria: 'Pesquisar perguntas frequentes',
    pillsAria: 'Categorias de perguntas',
    allTopicsLabel: 'Todos os tópicos',
    noResultsTitle: 'Nenhuma pergunta correspondente encontrada',
    noResultsHint: 'Tente termos como privacidade, CSV, TypeScript ou RFC.',
    categories: [
      {
        id: 'privacy',
        pillLabel: 'Privacidade e Segurança',
        title: '1. Privacidade de Dados e Segurança Local',
        items: [
          {
            q: 'Meus dados ficam 100% privados no JSON2X?',
            a: 'Sim. Todo o processamento ocorre na memória do seu navegador. Nenhum payload, token ou dado sensível sai do seu computador.',
            keywords: 'privacidade seguranca local navegador lgpd servidor'
          },
          {
            q: 'O JSON2X guarda ou registra o JSON colado?',
            a: 'Nunca. Não há backend nem banco de dados. Ao fechar ou atualizar a aba, tudo desaparece da memória.',
            keywords: 'armazenar logs retencao memoria aba'
          },
          {
            q: 'Posso usar offline ou atrás de VPN corporativa?',
            a: 'Sim. Como não fazemos chamadas externas de processamento, você trabalha tranquilamente atrás de firewalls ou sem conexão.',
            keywords: 'offline vpn firewall corporativo empresa'
          },
          {
            q: 'É gratuito para empresas e uso comercial?',
            a: 'Sim, todas as 21 ferramentas são 100 % gratuitas sem cadastro nem limites.',
            keywords: 'gratis comercial empresa licenca'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: 'Ferramentas',
        title: '2. Ferramentas e Conversores Disponíveis',
        items: [
          {
            q: 'Quais ferramentas estão disponíveis no JSON2X?',
            a: '21 utilitários: Formatador, Validador, Minificador, Diff Checker, JSON ↔ CSV, YAML, XML, TOML, SQL, TypeScript, Zod, Prisma, Drizzle, GraphQL, Go/Rust/Python, JSON Schema, Mock Data, JSONPath e Tree Viewer.',
            keywords: 'lista ferramentas formatador validador minificador csv yaml xml sql zod prisma'
          },
          {
            q: 'Como o conversor JSON para CSV evita erros de acento no Excel?',
            a: 'Ele oferece o modo Excel (UTF-8 BOM) com um clique, preservando acentos e cedilha em português, além de achatar objetos aninhados em notação de ponto.',
            keywords: 'csv excel bom acentos cedilha notacao ponto'
          },
          {
            q: 'Consigo gerar interfaces TypeScript, schemas Zod e modelos Prisma?',
            a: 'Sim. Basta colar um exemplo JSON para inferir automaticamente tipos estáticos, campos opcionais, schemas Zod, Prisma ORM e Drizzle.',
            keywords: 'typescript zod prisma drizzle graphql gerar'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: 'Desempenho e Limites',
        title: '3. Desempenho e Tamanho Máximo',
        items: [
          {
            q: 'Qual o tamanho máximo de arquivo JSON processado?',
            a: 'Com Web Workers em segundo plano, arquivos de até 100 MB+ são analisados conforme a RAM do seu dispositivo sem travar a tela.',
            keywords: 'tamanho maximo limite 100mb web worker'
          },
          {
            q: 'Qual a diferença entre Minificar e Formatar JSON?',
            a: 'Formatar organiza com indentação para leitura; minificar remove espaços para reduzir o tráfego em APIs de produção.',
            keywords: 'minificar formatar diferenca tamanho'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'Padrões RFC',
        title: '4. Sintaxe e Padrões RFC 8259',
        items: [
          {
            q: 'Por que JSON não aceita vírgula no final ou aspas simples?',
            a: 'A especificação IETF RFC 8259 exige aspas duplas e proíbe trailing commas para manter compatibilidade idêntica em todas as linguagens.',
            keywords: 'rfc 8259 virgula final aspas simples erro'
          },
          {
            q: 'Como corrigir o erro "Unexpected token"?',
            a: 'Cole o JSON no nosso Validador para localizar linha e coluna exatas do caractere inválido ou chave mal formada.',
            keywords: 'unexpected token corrigir erro linha coluna'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: 'Licença e Suporte',
        title: '5. Código Aberto e Suporte',
        items: [
          {
            q: 'O JSON2X é open source?',
            a: 'Sim, todo o código e algoritmos estão disponíveis para auditoria sob licença MIT.',
            keywords: 'open source github mit licenca'
          },
          {
            q: 'Como reporto um bug ou peço uma nova função?',
            a: 'Abra uma issue no GitHub (arjunn881/json2x) ou escreva para support@json2x.com.',
            keywords: 'bug suporte contato github'
          }
        ]
      }
    ]
  },
  about: {
    title: 'Sobre o JSON2X — Ferramentas JSON e CSV 100% no Navegador',
    description: 'Conheça o JSON2X: 21 ferramentas gratuitas e open-source de JSON e CSV executadas totalmente no navegador, com zero latência e foco absoluto em privacidade.',
    keywords: 'sobre json2x, ferramentas json seguras navegador, privacidade desenvolvedor zero servidor, suite codigo aberto ferramentas json mit, por que evitar enviar json para servidor terceiro, protecao dados lgpd ao formatar payloads api, velocidade web workers arquivos json grandes, plataforma limpa sem anuncios nem login, arquitetura estatica client side desenvolvedores, historia e principios engenharia json2x, utilitarios dev sem cookies rastreadores, suporte offline pwa apos primeiro acesso, execucao instantanea motor v8 cliente, transparencia total processamento local',
    eyebrow: 'Sobre o projeto',
    h1: 'Feito para desenvolvedores que precisam que a ferramenta apenas funcione',
    lead: 'O JSON2X reúne 21 utilitários gratuitos e open-source de JSON e CSV que rodam inteiramente no seu navegador. Sem conta, sem envio para servidor e sem rastreamento.',
    whyTitle: 'Por que criamos o JSON2X?',
    whyParagraphs: [
      'Todo programador precisa formatar JSON minificado, validar configurações antes do deploy ou exportar dados de APIs para CSV ou SQL. Infelizmente, muitos serviços online enviam seus dados para servidores terceiros ou atrasam o trabalho com anúncios invasivos.',
      'O JSON2X segue o caminho oposto: cada utilitário é estático e roda em JavaScript puro no cliente. Sem backend, sem banco de dados e sem envio de chaves de API para fora do seu computador.',
      'Priorizamos velocidade instantânea com CDN global e Web Workers para manter o navegador fluido mesmo com payloads grandes.'
    ],
    principlesTitle: 'Princípios de Engenharia',
    principles: [
      { title: 'Privacidade por arquitetura', text: 'Zero requisições de saída durante o uso — confirmável na aba Network do DevTools.' },
      { title: 'Zero cadastro obrigatório', text: 'Sem paywalls, sem limites artificiais e sem barreiras de e-mail para usar todas as 21 ferramentas.' },
      { title: 'Leve e veloz', text: 'Arquivos pesados (>200 KB) são delegados para Web Workers em segundo plano.' },
      { title: 'Pronto para trabalhar offline', text: 'Após o cache inicial, funciona perfeitamente sem conexão com a internet.' }
    ],
    allToolsTitle: 'Todas as Ferramentas de Desenvolvimento (21)',
    contactTitle: 'Dúvidas ou sugestões?',
    contactDesc: 'Encontrou algum bug ou quer sugerir uma nova ferramenta? Fale diretamente conosco.'
  },
  docsHub: {
    title: 'Documentação Técnica e Especificações IETF JSON — JSON2X',
    description: 'Referências de arquitetura, especificação RFC 8259, processamento paralelo com Web Workers e guias de geração de código para as 21 ferramentas.',
    keywords: 'documentacao json rfc 8259, guia web workers json, especificacoes json2x, referencia gramatica oficial json ietf, algoritmo achatamento objetos csv notacao ponto, inferencia interfaces opcionais typescript zod, manual tecnico geradores sql prisma drizzle, validacao estrita contratos rest api, otimizacao memoria parser json cliente, documentacao arquitetura 21 utilitarios, algoritmo diff semantico arvore json, especificacao parser csv rfc 4180, referencia motor avaliacao jsonpath, padroes schema draft 07 e openapi',
    schemaName: 'Central de Documentação JSON2X',
    badge: 'Central de Documentação',
    h1: 'Documentação Técnica e Especificações',
    desc: 'Guias de arquitetura, padrões IETF RFC 8259, mecânica de parsers e inferência de tipos das nossas ferramentas locais.',
    englishNotice: 'Nota: Cada artigo de especificação técnica individual é exibido em inglês original (EN).',
    categoryLabels: {
      'Format & Validate': 'Formatação e Validação',
      'Data Converters': 'Conversores de Dados',
      'Code & Schema': 'Código e Esquemas',
      'Query & Inspection': 'Consulta e Inspeção',
      'Performance Notes': 'Desempenho'
    }
  },
  kbHub: {
    title: 'Base de Conhecimento JSON: Erros, Tutoriais e Exemplos | JSON2X',
    description: 'Central de referência com mais de 50 guias sobre correção de erros JSON, arrays, objetos, validação, escape de strings e expressões JSONPath.',
    keywords: 'base conhecimento erros json, resolver unexpected token json, tutoriais jsonpath e schemas, corrigir virgula final e aspas simples json, escapar quebras linha unicode strings json, exemplos filtros consultas jsonpath arrays, guia pratico json schema draft 07 ajv, referencia rapida estruturas arrays objetos json, solucao problemas comuns respostas api, dicas depuracao sintaxe json programadores, resolver erro unexpected end of json input, tipos primitivos null booleano numero json, evitar acentos quebrados excel csv bom, converter api json para sql typescript',
    schemaName: 'Base de Conhecimento JSON2X',
    badge: 'Base de Conhecimento',
    h1: 'Base de Conhecimento JSON e Referências Técnicas',
    desc: 'Guias práticos de diagnóstico de erros, sintaxe RFC 8259 e tutoriais para desenvolvedores.',
    englishNotice: 'Nota: Os guias técnicos individuais abrem em sua versão original em inglês (EN).',
    categoryLabels: {
      'Troubleshooting': 'Resolução de Erros',
      'Tutorials': 'Tutoriais',
      'Examples': 'Exemplos',
      'Reference': 'Referência',
      'Structures': 'Estruturas',
      'Validation': 'Validação',
      'Formatting': 'Formatação',
      'Databases': 'Bancos de Dados',
      'Backend': 'Backend',
      'Testing': 'Testes',
      'Performance': 'Desempenho',
      'APIs': 'APIs',
      'Schemas': 'Schemas',
      'Querying': 'Consultas',
      'Comparison': 'Comparação',
      'Conversion': 'Conversão',
      'Fixing': 'Correção',
      'Editors & Plugins': 'Editores',
      'Languages': 'Linguagens',
      'Converters': 'Conversores',
      'Generators': 'Geradores',
      'Frameworks': 'Frameworks'
    }
  },
  blogHub: {
    title: 'Blog de Engenharia e Tutoriais JSON / API — JSON2X',
    description: 'Artigos aprofundados sobre benchmarks de minificação JSON, migração YAML/XML/SQL, TypeScript & Zod e arquitetura zero-server.',
    keywords: 'blog engenharia json, tutoriais typescript zod, benchmark minificacao json, migrar xml soap legado para json rest, guias kubernetes yaml e docker compose json, seguranca privacidade ferramentas cliente zero server, otimizar largura banda apis json minificado, validacao runtime zod com inferencia estatica, comparativo json yaml toml xml sql, artigos praticos engenharia dados web, processar payloads 100mb sem travar navegador, gerar modelos prisma drizzle via json api, fluxos devops kubernetes yaml para json, produtividade testes api com dados mock',
    schemaName: 'Blog de Engenharia JSON2X',
    badge: 'Blog de Engenharia',
    h1: 'Blog de Engenharia e Tutoriais',
    desc: 'Artigos práticos sobre engenharia de dados no navegador, padrões RFC, inferência de tipos e privacidade local.',
    englishNotice: 'Nota: Cada artigo completo do blog é publicado em inglês técnico original (EN).',
    categoryLabels: {
      'Architecture': 'Arquitetura',
      'Validation': 'Validação',
      'Performance': 'Desempenho',
      'DevOps': 'DevOps',
      'Data Engineering': 'Engenharia de Dados',
      'Enterprise': 'Corporativo / Legado',
      'Tooling': 'Ferramentas',
      'Databases': 'Bancos de Dados',
      'Productivity': 'Produtividade',
      'TypeScript': 'TypeScript',
      'Backend': 'Backend',
      'API Design': 'Design de APIs',
      'Security': 'Segurança',
      'Querying': 'Consultas',
      'Visualization': 'Visualização'
    }
  }
};

const koPages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — 무료 온라인 JSON 포맷터 · 검증기 · 변환기 (100% 브라우저 로컬 처리)',
    description: '서버 전송 없는 완전 무료 개발자 JSON·CSV 도구 21종! JSON 정렬·RFC 8259 검증·압축·Diff 비교·트리 뷰어와 CSV(엑셀 한글 호환 BOM)·YAML·XML·TOML·SQL·TypeScript·Zod 변환을 즉시 실행하세요.',
    keywords: 'json 포맷터 온라인 무료, json 유효성 검사, json csv 변환 엑셀 한글 깨짐 방지, json typescript 변환, json 비교 diff, json 트리 뷰어, 서버 전송 없는 json 도구, 개발자용 json 유틸리티 모음 무료, 로그인 없는 브라우저 json 변환기, json yaml xml toml sql 무료 변환, prisma drizzle graphql 스키마 json 생성, go rust python 구조체 json 자동 변환, 대용량 json web worker 빠른 처리, 실시간 jsonpath 쿼리 테스트 도구',
    itemListName: 'JSON2X — 전체 JSON 및 CSV 개발자 도구',
    heroSectionAria: 'JSON2X 소개',
    heroPromptCmd: 'json2x --fast --private',
    heroTitleBefore: '100% 브라우저 로컬 ',
    heroTitleAccent: 'JSON & CSV',
    heroTitleAfter: ' 개발자 유틸리티 스위트',
    heroSub: '서버로 단 1바이트도 보내지 않는 21가지 초고속 로컬 도구. JSON 정렬, 문법 검증, 압축, Diff 비교, JSONPath 쿼리는 물론 CSV·YAML·XML·SQL·TypeScript·Zod·Prisma 코드 변환까지 안전하게 처리하세요.',
    heroBtnFormatter: '포맷터_열기()',
    heroBtnAllTools: '// 전체_도구_보기 (21)',
    trustClientSide: '100% 브라우저 처리',
    trustZeroLatency: '서버 지연 제로',
    trustNoTracking: '가입 및 추적 없음',
    terminalTitle: 'json2x_engine.ts — 네트워크 전송 0 KB',
    terminalComment: '// 클라이언트 사이드 실시간 파싱 데모',
    terminalStatus: '로컬',
    credibilityAria: '기술적 보안 및 성능 보장',
    credibilityCards: [
      {
        title: 'Web Worker 프라이버시',
        desc: '모든 파싱과 변환 로직이 브라우저 메모리 내에서만 실행됩니다. API 키, JWT 토큰, 고객 데이터는 절대 외부로 유출되지 않습니다.'
      },
      {
        title: '네트워크 지연 시간 제로',
        desc: '원격 서버 왕복 없이 로컬 JavaScript V8 엔진 속도로 수 메가바이트 규모의 JSON을 즉시 정렬·변환합니다.'
      },
      {
        title: 'IETF RFC 8259 완벽 준수',
        desc: '정확한 오류 줄과 열 번호를 짚어내며 후행 쉼표(trailing comma), 따옴표 누락 키, 잘못된 이스케이프를 즉시 검출합니다.'
      },
      {
        title: '오프라인 & PWA 지원',
        desc: '서비스 워커 캐싱으로 기차, 비행기 또는 폐쇄망(VPN) 개발 환경에서도 인터넷 없이 완벽하게 동작합니다.'
      }
    ],
    toolsSectionAria: '전체 21가지 개발자 도구',
    toolsSectionTag: '$ ls ./tools/',
    toolsSectionTitle: '개발자 유틸리티 (21종)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': '4번째 줄 12열: 허용되지 않은 후행 쉼표',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "status": 200  + "status": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (엑셀 UTF-8 BOM)',
      'csv-to-json': 'name,age → [{"name":"김철수","age":28}]',
      'json-to-yaml': '{"a":1} → a: 1 (Kubernetes YAML)',
      'json-to-xml': '{"a":1} → <root><a>1</a></root>',
      'json-to-toml': '{"title":"App"} → title = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → Go struct / Rust / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"name":"이영희"}]',
      'jsonpath': '$.store.book[*].author',
      'json-tree-viewer': '객체 [3개 키] → user'
    },
    editorialAria: 'JSON 아키텍처 및 기술 가이드',
    editorialEyebrow: '엔지니어링 아키텍처',
    editorialTitle: '현대적인 JSON 데이터 교환 메커니즘과 보안 설계',
    editorialIntro: 'JSON(JavaScript Object Notation)은 IETF RFC 8259 및 ECMA-404 표준을 기반으로 웹 API, 마이크로서비스, NoSQL 데이터베이스에서 가장 널리 쓰이는 경량 데이터 포맷입니다.',
    editorialSec1Title: '1. 브라우저 로컬 파싱 vs 서버 전송 기반 도구의 보안 위험',
    editorialSec1P1: '인증 토큰, DB 접속 정보, 개인정보가 포함된 JSON을 일반 서버 처리형 온라인 사이트에 붙여넣으면 데이터가 외부 서버로 전송·저장되어 심각한 보안 사고 및 개인정보보호법 위반 위험이 발생합니다.',
    editorialSec1P2: 'JSON2X는 모든 포맷터, 검증기, 변환기를 브라우저의 로컬 JavaScript 엔진에서 100% 실행하여 외부 전송을 원천 차단합니다.',
    editorialSec2Title: '2. RFC 8259 엄격 준수 및 핵심 문법 규칙',
    editorialSec2Intro: '표준 JSON 파서는 JavaScript 객체 리터럴과 달리 다음 규칙을 엄격하게 강제합니다.',
    editorialSec2Rules: [
      { bold: '큰따옴표 필수:', text: '모든 키와 문자열 값은 반드시 큰따옴표("key")로 감싸야 합니다. 작은따옴표는 문법 오류를 일으킵니다.' },
      { bold: '후행 쉼표 금지:', text: '배열이나 객체의 마지막 요소 뒤에 붙는 쉼표(trailing comma)는 표준 JSON에서 허용되지 않습니다.' },
      { bold: '제어 문자 이스케이프:', text: '문자열 내부의 줄바꿈이나 탭은 반드시 \\n, \\t 또는 \\uXXXX로 표기해야 합니다.' },
      { bold: '엄격한 숫자 표기:', text: '0123과 같이 0으로 시작하는 정수나 NaN, Infinity 리터럴은 유효하지 않습니다.' }
    ],
    editorialSec3Title: '3. 데이터 포맷 비교 매트릭스: JSON vs CSV vs YAML vs XML vs SQL',
    editorialSec3Intro: '소프트웨어 아키텍처 요구 사항에 맞는 직렬화 포맷 비교입니다.',
    tableHeaders: ['포맷', '주요 활용 분야', '가독성', '중첩 구조 지원', '파싱 속도'],
    tableRows: [
      ['JSON', 'REST API, NoSQL, 설정', '높음', '네이티브 (객체/배열)', '초고속 (브라우저 기본)'],
      ['CSV', 'Excel, 데이터 분석, 통계', '보통', '평면 전용 (점 표기 평탄화)', '빠름 (표 스트림)'],
      ['YAML', 'Kubernetes, CI/CD, Docker', '매우 높음', '네이티브 (들여쓰기 기반)', '보통'],
      ['XML', 'SOAP 서비스, 엔터프라이즈', '보통', '네이티브 (태그 계층)', '보통 (DOM 파서)'],
      ['SQL', '관계형 DB 적재 DDL/DML', '높음', '관계형 (외래키 / JSONB)', '빠름 (DB 엔진)']
    ],
    editorialSec4Title: '4. 자주 묻는 질문 (FAQ)',
    editorialFaqs: [
      {
        q: 'JSON2X는 상업용 프로젝트나 기업 업무에도 100% 무료인가요?',
        a: '네. 회원가입, 유료 결제, 일일 횟수 제한 없이 모든 21가지 도구와 코드 생성기를 무료로 이용하실 수 있습니다.'
      },
      {
        q: '얼마나 큰 JSON 파일까지 처리할 수 있나요?',
        a: '네트워크 업로드 없이 로컬 메모리와 Web Worker로 동작하므로 기기의 RAM 여유에 따라 수십 MB~100MB 이상 파일도 끊김 없이 정렬할 수 있습니다.'
      },
      {
        q: '입력한 JSON 데이터를 서버에 저장하거나 로그로 남기나요?',
        a: '절대 아닙니다. 개발자 도구(Network 탭)를 열어보시면 변환·검증 중 단 한 건의 네트워크 요청도 발생하지 않음을 확인하실 수 있습니다.'
      }
    ],
    hubAria: '개발자 문서 및 가이드',
    hubTitle: '기술 문서 & 가이드 허브',
    hubLead: '대용량 Web Worker 처리, IETF RFC 8259 명세, TypeScript/Zod 타입 생성 기술 문서를 확인하세요.',
    hubLangBadge: '개별 심층 기술 문서는 원문 영어(EN)로 제공됩니다',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Web Worker로 대용량 JSON 비동기 파싱하기 (EN)',
        desc: '수십 메가바이트 JSON 파일 처리 시 브라우저 UI 프리징을 방지하는 백그라운드 스레드 설계.'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'TypeScript 인터페이스 및 Zod 스키마 자동 생성 가이드 (EN)',
        desc: 'API 샘플 JSON에서 엄격한 정적 타입과 런타임 Zod 검증기를 도출하는 방법.'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'IETF RFC 8259 JSON 공식 규격 레퍼런스 (EN)',
        desc: 'JSON 문법 규칙, 데이터 타입, 문자열 이스케이프 및 유효성 제약 조건 총정리.'
      }
    ]
  },
  toolsCatalog: {
    title: '전체 21종 무료 온라인 JSON & CSV 개발자 도구 모음 — JSON2X',
    description: '브라우저에서 바로 쓰는 21가지 JSON/CSV 도구 디렉터리: 정렬기, 검증기, 압축기, Diff 비교기, CSV/YAML/XML/TOML/SQL 변환기, TypeScript/Zod/Prisma/Drizzle/GraphQL 생성기.',
    keywords: 'json 도구 모음, 무료 json 변환기 카탈로그, typescript zod prisma 생성기, json csv yaml xml sql 변환, json2x 21종 전체 개발 도구 디렉터리, json 정렬 검사 압축 diff 비교 유틸리티, go rust python graphql 모델 생성기, 테스트용 목 데이터 json 및 jsonpath 테스터, 엑셀 bom 한글 호환 json csv 내보내기, 서버 업로드 없는 보안 개발 도구 모음, json drizzle toml 스키마 변환기, 대용량 json 접이식 트리 뷰어, 오프라인 pwa 지원 무료 개발 도구, 로그인 없는 브라우저 api 도우미',
    schemaName: 'JSON2X 개발자 도구 카탈로그',
    badgeTemplate: '도구 카탈로그 ({count}종)',
    h1: 'JSON & CSV 개발자 도구 스위트',
    lead: '21개 모든 도구가 서버 전송 없이 브라우저 내에서 100% 로컬 실행됩니다. 목적별 카테고리로 빠르게 찾아보세요.',
    filterAria: '카테고리별 도구 필터',
    allToolsLabel: '전체 보기',
    utilitiesUnit: '개 도구'
  },
  faq: {
    title: '자주 묻는 질문 (FAQ) 보안 · 성능 · RFC 8259 | JSON2X',
    description: 'JSON2X의 브라우저 로컬 프라이버시, Web Worker 대용량 처리, 엑셀 한글 깨짐 없는 CSV BOM 내보내기, RFC 8259 오류 해결에 대한 상세 답변.',
    keywords: 'json2x faq, 안전한 json 포맷터, json 후행 쉼표 오류 해결, 엑셀 csv 한글 깨짐 방지 bom, web worker json 용량, 브라우저 json 최대 100mb 처리 방법, unexpected token 구문 오류 원인 찾기, api 키 jwt 토큰 붙여넣기 보안 안전성, 기업 상업적 프로젝트 무료 사용 안내, 오프라인 폐쇄망 vpn 환경 지원 여부, json 정렬과 압축의 차이점 설명, json2x mit 오픈 소스 라이선스, 서버 저장 제로 메모리 즉시 삭제, 중첩 객체 csv 점 표기 평탄화',
    badge: '신뢰성 & 기술 FAQ',
    h1: '자주 묻는 질문 (FAQ)',
    desc: '서버 없는 클라이언트 전용 보안 구조, Web Worker 성능, 최대 처리 용량 및 RFC 8259 표준 규격에 대한 FAQ입니다.',
    lastUpdated: '최종 업데이트: 2026년 9월',
    verifiedTrust: '제로 서버 보안 아키텍처 검증 완료',
    searchPlaceholder: '질문 검색 (예: 보안, Web Worker, 엑셀, TypeScript, 용량)...',
    searchAria: 'FAQ 검색',
    pillsAria: 'FAQ 카테고리',
    allTopicsLabel: '전체 주제',
    noResultsTitle: '일치하는 질문을 찾을 수 없습니다',
    noResultsHint: '보안, CSV, TypeScript, RFC 등의 키워드로 다시 검색해 보세요.',
    categories: [
      {
        id: 'privacy',
        pillLabel: '개인정보 및 보안',
        title: '1. 데이터 프라이버시 및 클라이언트 보안',
        items: [
          {
            q: 'JSON2X에 붙여넣은 JSON 데이터는 100% 안전한가요?',
            a: '네. 모든 정렬, 검증, 변환 작업이 사용자 브라우저 메모리 안에서만 실행되며 외부 서버로 전송되지 않습니다. 개발자 도구 Network 탭에서 직접 확인 가능합니다.',
            keywords: '보안 프라이버시 안전 서버 전송 없음 네트워크'
          },
          {
            q: '입력한 JSON이나 API 키를 저장하거나 기록하나요?',
            a: '전혀 저장하지 않습니다. 백엔드 서버나 데이터베이스 자체가 없으며 탭을 닫으면 메모리에서 즉시 소멸됩니다.',
            keywords: '저장 로그 기록 메모리'
          },
          {
            q: '오프라인이나 사내 폐쇄망 · VPN 환경에서도 사용할 수 있나요?',
            a: '네. 외부 API 요청 없이 브라우저 표준 엔진으로만 동작하므로 사내 보안망이나 인터넷이 끊긴 환경에서도 안전하게 사용할 수 있습니다.',
            keywords: '오프라인 폐쇄망 vpn 사내망 방화벽'
          },
          {
            q: '상업적 목적이나 회사 업무에도 무료인가요?',
            a: '네. 개인, 기업, 상업용 프로젝트 모두 회원가입이나 제한 없이 완전 무료입니다.',
            keywords: '무료 상업용 기업 라이선스'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: '도구 기능',
        title: '2. 지원 유틸리티 및 변환 기능',
        items: [
          {
            q: 'JSON2X에는 어떤 개발자 도구들이 있나요?',
            a: '포맷터, RFC 8259 검증기, 압축기, Diff 비교기, JSON ↔ CSV(엑셀 BOM), YAML, XML, TOML, SQL 변환기와 TypeScript, Zod, Prisma, Drizzle, GraphQL, Go/Rust/Python, JSON Schema, 모의 데이터, JSONPath, 트리 뷰어 등 총 21종을 제공합니다.',
            keywords: '도구 목록 21종 포맷터 검증기 변환기 코드생성'
          },
          {
            q: 'CSV 다운로드 시 엑셀에서 한글이 깨지지 않게 할 수 있나요?',
            a: '네. JSON → CSV 변환기에서 "Excel 한글 호환 (BOM)" 모드를 선택하면 UTF-8 BOM이 포함되어 Microsoft Excel에서 한글이 깨지지 않고 열립니다.',
            keywords: '엑셀 한글 깨짐 방지 bom utf-8 csv'
          },
          {
            q: 'TypeScript, Zod, Prisma, Drizzle 스키마 생성도 가능한가요?',
            a: '네. JSON 샘플만 입력하면 중첩 구조와 선택적 필드(?)까지 자동 추론해 실무용 TypeScript 인터페이스와 ORM 스키마를 즉시 생성합니다.',
            keywords: 'typescript zod prisma drizzle graphql 생성'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: '성능 및 용량',
        title: '3. 성능과 최대 처리 파일 크기',
        items: [
          {
            q: '최대 몇 MB의 JSON 파일까지 처리할 수 있나요?',
            a: 'Web Worker 백그라운드 처리를 통해 UI 멈춤 없이 PC 메모리에 따라 최대 100MB 이상 파일도 원활히 처리할 수 있습니다.',
            keywords: '최대 용량 크기 100mb web worker 성능'
          },
          {
            q: '정렬(Format)과 압축(Minify)의 차이는 무엇인가요?',
            a: '정렬은 들여쓰기와 줄바꿈을 넣어 가독성을 높이고, 압축은 모든 공백을 제거해 API 페이로드 크기와 트래픽을 최소화합니다.',
            keywords: '정렬 압축 minify format 차이'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'RFC 8259 표준',
        title: '4. 문법 검증 및 IETF RFC 표준',
        items: [
          {
            q: '왜 표준 JSON에서는 후행 쉼표와 작은따옴표가 오류인가요?',
            a: 'IETF RFC 8259 표준은 모든 언어 간 일관된 파싱을 위해 큰따옴표만 허용하며 마지막 항목 뒤의 쉼표를 금지합니다.',
            keywords: 'rfc 8259 후행 쉼표 작은따옴표 문법 오류'
          },
          {
            q: 'Unexpected token 파싱 오류는 어떻게 찾나요?',
            a: 'JSON 검증기에 붙여넣으면 오류가 발생한 정확한 줄(Line)과 열(Column) 위치를 즉시 하이라이트해 드립니다.',
            keywords: 'unexpected token 오류 줄 번호 열 번호'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: '라이선스 및 문의',
        title: '5. 오픈 소스 및 지원',
        items: [
          {
            q: 'JSON2X는 오픈 소스인가요?',
            a: '네. 핵심 알고리즘과 문서는 MIT 라이선스 기반으로 투명하게 공개되어 있습니다.',
            keywords: '오픈소스 github mit 라이선스'
          },
          {
            q: '버그 제보나 신규 기능 제안은 어떻게 하나요?',
            a: 'GitHub 저장소(arjunn881/json2x) 이슈 또는 support@json2x.com 으로 연락하실 수 있습니다.',
            keywords: '버그 제보 문의 지원 github'
          }
        ]
      }
    ]
  },
  about: {
    title: 'JSON2X 소개 — 서버 전송 없는 100% 브라우저 개발자 도구',
    description: 'JSON2X의 철학과 제로 서버 보안 아키텍처, Web Worker 성능 최적화, 그리고 무료로 제공되는 21종의 JSON·CSV 도구를 확인하세요.',
    keywords: 'json2x 소개, 보안 json 포맷터, 클라이언트 사이드 개발 도구, 오픈소스 json 툴킷, 제로 서버 json 아키텍처 설계 철학, mit 라이선스 오픈 소스 개발 유틸리티, api 비밀 키 유출 막는 로컬 브라우저 실행, 대용량 json 프리징 없는 web worker 엔진, 광고 추적 없는 쾌적한 개발 도구 플랫폼, 오프라인 pwa 지원 json2x 서비스, 추적 쿠키 없는 깔끔한 개발자 도구, 글로벌 cdn 초고속 정적 로딩, 가입 장벽 무제한 무료 사용 보장, 클라이언트 보안 투명성 network 0건',
    eyebrow: 'JSON2X 소개',
    h1: '군더더기 없이 빠르고 안전하게 일하는 개발자를 위한 도구',
    lead: 'JSON2X는 계정 가입, 서버 업로드, 추적 스크립트 없이 브라우저에서만 동작하는 21가지 무료 오픈 소스 JSON & CSV 유틸리티 모음입니다.',
    whyTitle: '왜 JSON2X를 만들었나요?',
    whyParagraphs: [
      '모든 개발자는 압축된 JSON을 보기 좋게 정렬하거나, 배포 전 설정 파일을 검증하고, API 데이터를 CSV나 SQL로 변환해야 하는 순간을 겪습니다. 하지만 많은 기존 사이트는 입력 데이터를 원격 서버로 전송하거나 불필요한 회원가입과 무거운 광고로 작업 흐름을 방해합니다.',
      'JSON2X는 정반대로 설계되었습니다. 백엔드도, 데이터베이스도, 외부 로깅도 없습니다. API 키나 고객 데이터를 붙여넣어도 단 1바이트도 사용자 PC 밖으로 나가지 않도록 구조적으로 보장합니다.',
      '글로벌 CDN을 통해 즉시 로드되며 대용량 작업은 Web Worker로 분리해 지체 없이 바로 결과를 확인할 수 있습니다.'
    ],
    principlesTitle: '4가지 설계 원칙',
    principles: [
      { title: '아키텍처 기반의 완전한 프라이버시', text: '네트워크 요청 제로. 브라우저 DevTools의 Network 탭으로 언제든 직접 확인 가능합니다.' },
      { title: '가입 및 결제 장벽 없음', text: '21개 모든 도구를 로그인이나 일일 제한 없이 온전하게 바로 사용할 수 있습니다.' },
      { title: '초경량 · 고속 Web Worker 처리', text: '200KB 이상의 대용량 페이로드도 Web Worker로 처리해 화면 끊김이 없습니다.' },
      { title: '오프라인 환경 지원', text: '브라우저 캐시 이후에는 인터넷 연결이 없는 환경에서도 동일하게 동작합니다.' }
    ],
    allToolsTitle: '전체 개발자 도구 목록 (21종)',
    contactTitle: '질문이나 피드백이 있으신가요?',
    contactDesc: '버그 제보나 새로운 도구 아이디어가 있다면 언제든 편하게 연락해 주세요.'
  },
  docsHub: {
    title: '개발자 기술 문서 및 IETF RFC 8259 명세 허브 — JSON2X',
    description: 'JSON2X 21개 도구의 아키텍처 레퍼런스, RFC 8259 문법 규격, Web Worker 비동기 처리 및 코드 생성 알고리즘 문서 모음.',
    keywords: 'json rfc 8259 기술 문서, web worker json 파싱 가이드, typescript zod 생성 원리, ietf 공식 json 문법 규칙 레퍼런스, 중첩 객체 csv 점 표기 평탄화 알고리즘, 선택적 속성 추론 typescript 인터페이스 설계, prisma drizzle sql ddl 스키마 변환 사양, rest api 페이로드 엄격 검증 아키텍처, 대용량 데이터 메모리 최적화 json 파서, json2x 개발자 공식 기술 명세 허브, json 트리 구조 diff 비교 알고리즘, rfc 4180 csv 파싱 및 따옴표 처리, jsonpath 재귀 필터 평가 엔진 사양, draft-07 json schema 추론 명세',
    schemaName: 'JSON2X 개발자 문서 및 명세 허브',
    badge: '문서 허브',
    h1: '개발자 문서 & 기술 명세서',
    desc: '21종 브라우저 네이티브 유틸리티의 아키텍처 설계, IETF RFC 규격 및 타입 추론 엔진 상세 레퍼런스입니다.',
    englishNotice: '안내: 각 세부 기술 문서 본문은 정확한 표준 규격 전달을 위해 영문(EN) 원문으로 제공됩니다.',
    categoryLabels: {
      'Format & Validate': '정렬 및 검증',
      'Data Converters': '데이터 변환',
      'Code & Schema': '코드 및 스키마',
      'Query & Inspection': '쿼리 및 시각화',
      'Performance Notes': '성능 노트'
    }
  },
  kbHub: {
    title: 'JSON 지식 베이스: 오류 해결, 튜토리얼 및 레퍼런스 | JSON2X',
    description: 'JSON 파싱 오류 해결법, 배열/객체 문법, 유효성 검사, 문자열 이스케이프, JSONPath 활용법을 정리한 50편 이상의 개발자 레퍼런스 허브.',
    keywords: 'json 오류 해결 가이드, unexpected token json 수정, jsonpath 튜토리얼, json 지식 베이스, json 마지막 쉼표 작은따옴표 오류 고치기, 줄바꿈 문자 유니코드 이스케이프 해결법, jsonpath 조건 필터 예제 모음, json schema draft-07 검증 활용 가이드, json 배열 객체 문법 예제 총정리, 개발자 api 파싱 오류 트러블슈팅, unexpected end of json input 해결법, 숫자 불리언 null json 기본 데이터 타입, 엑셀 csv 한글 깨짐 해결 팁, api json 에서 sql typescript 변환 가이드',
    schemaName: 'JSON2X 기술 지식 베이스',
    badge: '지식 허브',
    h1: 'JSON 지식 베이스 & 기술 레퍼런스',
    desc: '자주 발생하는 JSON 구문 오류 해결 가이드, 문법 사양 및 실전 개발자 레퍼런스 색인입니다.',
    englishNotice: '안내: 각 상세 지식 베이스 아티클 페이지는 영문(EN) 원문으로 열립니다.',
    categoryLabels: {
      'Troubleshooting': '오류 해결',
      'Tutorials': '튜토리얼',
      'Examples': '예제',
      'Reference': '레퍼런스',
      'Structures': '데이터 구조',
      'Validation': '검증',
      'Formatting': '포맷팅',
      'Databases': '데이터베이스',
      'Backend': '백엔드',
      'Testing': '테스팅',
      'Performance': '성능',
      'APIs': 'APIs',
      'Schemas': '스키마',
      'Querying': '쿼리',
      'Comparison': '비교',
      'Conversion': '변환',
      'Fixing': '오류 수정',
      'Editors & Plugins': '에디터',
      'Languages': '언어별 가이드',
      'Converters': '변환기',
      'Generators': '생성기',
      'Frameworks': '프레임워크'
    }
  },
  blogHub: {
    title: '엔지니어링 블로그 및 JSON · API 튜토리얼 — JSON2X',
    description: 'JSON 압축 벤치마크, YAML·XML·SQL 데이터 마이그레이션, TypeScript/Zod 타입 설계 및 제로 서버 보안 아키텍처 기술 아티클.',
    keywords: 'json 엔지니어링 블로그, json 압축 성능 벤치마크, typescript zod 가이드, 쿠버네티스 yaml json 변환 devops 실전, 레거시 xml soap api json 마이그레이션, 제로 서버 웹 앱 보안 프라이버시 설계, api 트래픽 절감 json 압축 gzip 비교, 런타임 검증 zod 와 정적 타입 병행 전략, json vs yaml vs toml vs xml 비교 분석, 클라이언트 데이터 엔지니어링 기술 아티클, 100mb 대용량 json 브라우저 프리징 방지, prisma drizzle orm 모델 자동화 팁, 개인정보 없는 mock json 테스트 전략, 효율적인 json diff ci 파이프라인 활용',
    schemaName: 'JSON2X 엔지니어링 블로그',
    badge: '엔지니어링 허브',
    h1: '엔지니어링 블로그 & 실전 튜토리얼',
    desc: '클라이언트 기반 데이터 처리, RFC 규격, 타입 추론 및 서버리스 프라이버시 아키텍처 심층 아티클입니다.',
    englishNotice: '안내: 각 블로그 전문 아티클은 영문(EN) 원문 페이지로 연결됩니다.',
    categoryLabels: {
      'Architecture': '아키텍처',
      'Validation': '유효성 검증',
      'Performance': '성능',
      'DevOps': 'DevOps',
      'Data Engineering': '데이터 엔지니어링',
      'Enterprise': '엔터프라이즈',
      'Tooling': '개발 도구',
      'Databases': '데이터베이스',
      'Productivity': '개발 생산성',
      'TypeScript': 'TypeScript',
      'Backend': '백엔드',
      'API Design': 'API 설계',
      'Security': '보안',
      'Querying': '쿼리',
      'Visualization': '시각화'
    }
  }
};

const itPages: LocalizedPagesBundle = {
  home: {
    title: 'JSON2X — Strumenti JSON e CSV Online Gratis per Sviluppatori (100% Locale)',
    description: '21 strumenti JSON e CSV gratuiti eseguiti interamente nel browser senza inviare dati: formattatore, validatore RFC 8259, minificatore, confronto diff, albero JSON e convertitori CSV, YAML, XML, TOML, SQL, TypeScript e Zod.',
    keywords: 'strumenti json online gratis, formattatore json sicuro nel browser, validatore json rfc 8259, convertire json in csv excel, json a typescript zod online, confronto json diff, visualizzatore albero json, suite utility json sviluppatori senza upload, formattare validare json locale senza login, convertitore json yaml xml toml sql gratis, generatore prisma drizzle graphql da json, esportare go rust python struct da json, aprire file json grandi con web worker, testare espressioni jsonpath online gratis',
    itemListName: 'JSON2X — Tutti gli Strumenti JSON e CSV',
    heroSectionAria: 'Introduzione JSON2X',
    heroPromptCmd: 'json2x --veloce --privato',
    heroTitleBefore: 'Strumenti ',
    heroTitleAccent: 'JSON e CSV',
    heroTitleAfter: ' 100% Lato Client per Sviluppatori',
    heroSub: 'Ventuno utility veloci ed eseguite in locale. Formatta, valida, minifica, confronta diff, interroga con JSONPath e converti in CSV, YAML, XML, SQL, TypeScript o Zod senza inviare un singolo byte a server esterni.',
    heroBtnFormatter: 'apri_formattatore()',
    heroBtnAllTools: '// vedi_tutti_gli_strumenti (21)',
    trustClientSide: '100% Lato Client',
    trustZeroLatency: 'Zero Latenza Server',
    trustNoTracking: 'Nessuna Registrazione o Tracciamento',
    terminalTitle: 'motore_json2x.ts — 0 KB rete',
    terminalComment: '// Dimostrazione live di analisi lato client',
    terminalStatus: 'locale',
    credibilityAria: 'Garanzie Tecniche',
    credibilityCards: [
      {
        title: 'Privacy con Web Worker',
        desc: 'Tutta la logica di parsing e formattazione gira esclusivamente nella memoria del browser. Token API, chiavi e dati PII non lasciano mai il tuo computer.'
      },
      {
        title: 'Zero Latenza di Rete',
        desc: 'Nessuna richiesta a server remoti. Payload JSON di diversi megabyte vengono formattati istantaneamente alla velocità nativa di V8.'
      },
      {
        title: 'Conforme a IETF RFC 8259',
        desc: 'Validazione rigorosa con riga e colonna esatte, rilevamento di virgole finali, chiavi senza doppi apici e sequenze non valide.'
      },
      {
        title: 'Pronto Offline e PWA',
        desc: 'Memorizzato nella cache tramite Service Worker. Funziona senza rete in treno, in aereo o in ambienti aziendali isolati.'
      }
    ],
    toolsSectionAria: 'Tutti gli strumenti JSON e CSV',
    toolsSectionTag: '$ ls ./strumenti/',
    toolsSectionTitle: 'Utility per Sviluppatori (21)',
    cardSnippets: {
      'json-converter': 'JSON → TS, Zod, Mongoose, SQL, OpenAPI...',
      'json-formatter': '{"a":1} → { "a": 1 }',
      'json-validator': 'Riga 4, Col 12: Virgola finale vietata',
      'json-minifier': '{ "a": 1 } → {"a":1} (-34%)',
      'json-diff': '- "stato": 200  + "stato": 404',
      'json-to-csv': '[{"id":1}] → id\\n1 (CSV Excel BOM)',
      'csv-to-json': 'nome,eta → [{"nome":"Marco","eta":29}]',
      'json-to-yaml': '{"a":1} → a: 1 (YAML pulito)',
      'json-to-xml': '{"a":1} → <root><a>1</a></root>',
      'json-to-toml': '{"titolo":"App"} → titolo = "App"',
      'typescript-generator': '{"id":1} → interface User { id: number }',
      'json-to-zod': '{"id":1} → z.object({ id: z.number() })',
      'json-to-prisma': '{"id":1} → model User { id Int @id }',
      'json-to-drizzle': '{"id":1} → pgTable("users", { id: ... })',
      'json-to-graphql': '{"id":1} → type User { id: Int! }',
      'json-to-code': '{"id":1} → Struct Go / Rust / Pydantic',
      'json-schema-generator': '{"x":1} → "$schema": "draft-07"',
      'json-to-sql': '{"id":1} → CREATE TABLE users (...)',
      'json-mock-generator': '[{"id":1001,"nome":"Giulia"}]',
      'jsonpath': '$.negozio.libro[*].autore',
      'json-tree-viewer': 'oggetto [3 chiavi] → utente'
    },
    editorialAria: 'Guida Tecnica all’Architettura JSON',
    editorialEyebrow: 'Architettura Software',
    editorialTitle: 'Meccanica Tecnica dello Scambio Dati JSON Moderno',
    editorialIntro: 'JavaScript Object Notation (JSON) è lo standard universale per lo scambio di dati sul web. Definito da IETF RFC 8259 e ECMA-404, alimenta API REST, microservizi, database NoSQL e configurazioni cloud.',
    editorialSec1Title: '1. Parsing Lato Client vs Rischi di Sicurezza Lato Server',
    editorialSec1P1: 'Incollare token di autorizzazione, stringhe di connessione o dati personali in strumenti tradizionali basati su server invia informazioni sensibili in rete, esponendo l’azienda a fughe di dati e violazioni GDPR.',
    editorialSec1P2: 'JSON2X elimina questo rischio alla radice: tutti i 21 strumenti lavorano al 100 % nel motore JavaScript locale del tuo browser senza inviare alcun dato all’esterno.',
    editorialSec2Title: '2. Conformità Rigorosa RFC 8259 e Regole Sintattiche',
    editorialSec2Intro: 'Un parser conforme a IETF RFC 8259 applica regole rigorose che distinguono JSON valido dai letterali JavaScript:',
    editorialSec2Rules: [
      { bold: 'Doppi apici obbligatori:', text: 'Tutte le chiavi e stringhe vanno racchiuse tra doppi apici ("chiave"). Gli apici singoli generano errori.' },
      { bold: 'Niente virgole finali:', text: 'Le trailing commas dopo l’ultimo elemento di un oggetto o array sono vietate da RFC 8259.' },
      { bold: 'Escape dei caratteri di controllo:', text: 'A capo e tabulazioni nelle stringhe vanno codificati come \\n, \\t o \\uXXXX.' },
      { bold: 'Formattazione numerica rigorosa:', text: 'Zeri iniziali come 0123 e costanti NaN o Infinity non sono ammessi.' }
    ],
    editorialSec3Title: '3. Matrice Comparativa: JSON vs CSV vs YAML vs XML vs SQL',
    editorialSec3Intro: 'Ogni livello applicativo richiede il formato di serializzazione ottimale:',
    tableHeaders: ['Formato', 'Caso d’Uso Principale', 'Leggibilità', 'Dati Annidati', 'Velocità Parsing'],
    tableRows: [
      ['JSON', 'API REST, NoSQL, Configs', 'Alta', 'Nativo (Oggetti/Array)', 'Ultrarapida (Nativa JS)'],
      ['CSV', 'Excel, Analisi Tabellari', 'Media', 'Piatto (notazione con punto)', 'Veloce (Flusso tabellare)'],
      ['YAML', 'Kubernetes, CI/CD, Docker', 'Molto Alta', 'Nativo (Indentazione)', 'Moderata'],
      ['XML', 'SOAP, Fatturazione, Enterprise', 'Media', 'Nativo (Tag)', 'Moderata (Parser DOM)'],
      ['SQL', 'Database Relazionali DDL/DML', 'Alta', 'Relazionale (FK / JSONB)', 'Veloce (Motore DB)']
    ],
    editorialSec4Title: '4. Domande Frequenti (FAQ)',
    editorialFaqs: [
      {
        q: 'JSON2X è gratuito al 100% anche per uso commerciale?',
        a: 'Sì. Tutti i 21 strumenti e generatori sono gratuiti senza account, limiti d’uso o abbonamenti.'
      },
      {
        q: 'Qual è la dimensione massima di file JSON supportata?',
        a: 'Elaborando tutto nella memoria locale con Web Worker, file da 50 MB fino a 100 MB+ scorrono in modo fluido in base alla RAM del dispositivo.'
      },
      {
        q: 'JSON2X salva o registra i dati JSON inseriti?',
        a: 'Mai. Puoi aprire la scheda Network degli strumenti sviluppatore per verificare zero richieste verso l’esterno.'
      }
    ],
    hubAria: 'Documentazione e Guide Tecniche',
    hubTitle: 'Documentazione e Guide Tecniche',
    hubLead: 'Specifiche IETF, ottimizzazioni con Web Worker e manuali di generazione tipi per sviluppatori.',
    hubLangBadge: 'Gli articoli tecnici completi qui sotto sono disponibili in inglese originale (EN)',
    hubItems: [
      {
        href: '/docs/parsing-large-json-web-workers',
        title: 'Analizzare File JSON Grandi con i Web Worker (EN)',
        desc: 'Evita blocchi del thread principale quando gestisci file JSON multi-megabyte.'
      },
      {
        href: '/docs/typescript-zod-generation-guide',
        title: 'Guida Interfacce TypeScript e Schemi Zod (EN)',
        desc: 'Come generare tipi statici rigorosi e validazione runtime Zod dalle risposte API.'
      },
      {
        href: '/docs/rfc8259-json-specification',
        title: 'Riferimento Completo IETF RFC 8259 JSON (EN)',
        desc: 'Panoramica dettagliata su regole grammaticali, tipi di dati e caratteri di escape.'
      }
    ]
  },
  toolsCatalog: {
    title: 'Catalogo dei 21 Strumenti JSON e CSV Online Gratis — JSON2X',
    description: 'Elenco completo di 21 strumenti locali per JSON e CSV: formattatore, validatore, minificatore, diff checker, convertitori YAML/XML/TOML/SQL e generatori TypeScript, Zod, Prisma e GraphQL.',
    keywords: 'catalogo strumenti json gratis, utility sviluppatore json csv, generatore typescript zod prisma online, convertitore json yaml xml sql, elenco completo 21 strumenti json2x gratuiti, formattatore validatore minificatore diff checker, generatore modelli go rust python graphql, generatore dati mock json e tester jsonpath, esportazione csv excel utf-8 bom accenti, strumenti api locali conformi gdpr, convertitore json drizzle toml schema, visualizzatore albero json file pesanti, strumenti json offline pwa italia, suite completa payload api browser',
    schemaName: 'Suite di Strumenti JSON2X',
    badgeTemplate: 'Catalogo ({count} Utility)',
    h1: 'Suite Completa per Sviluppatori JSON e CSV',
    lead: 'Tutti i 21 strumenti vengono eseguiti al 100 % localmente nel browser con latenza zero e massima privacy.',
    filterAria: 'Filtra strumenti per categoria',
    allToolsLabel: 'Tutti',
    utilitiesUnit: 'Strumenti'
  },
  faq: {
    title: 'Domande Frequenti (FAQ) Privacy, GDPR e Strumenti JSON | JSON2X',
    description: 'Risposte complete su elaborazione lato client, sicurezza GDPR, Web Worker, esportazione CSV con BOM per Excel e standard IETF RFC 8259.',
    keywords: 'faq json2x privacy, formattatore json sicuro gdpr senza server, limite file json browser, errore sintassi json rfc 8259, sicurezza chiavi api token jwt nel browser, csv excel lettere accentate utf-8 bom guida, elaborare file json 100mb con web worker, risolvere errore unexpected token virgola finale, uso commerciale aziendale gratuito json2x, usare strumenti json offline dietro vpn, differenza tra minificare e formattare json, licenza open source mit json2x, zero salvataggio dati memoria browser, appiattimento oggetti notazione a punto csv',
    badge: 'Affidabilità e Trasparenza',
    h1: 'Domande Frequenti (FAQ)',
    desc: 'Tutto quello che devi sapere su esecuzione locale senza server, prestazioni Web Worker e regole RFC 8259.',
    lastUpdated: 'Ultimo aggiornamento: Settembre 2026',
    verifiedTrust: 'Architettura Zero-Server Verificata',
    searchPlaceholder: 'Cerca nelle FAQ (es. privacy, Web Worker, CSV, Zod)...',
    searchAria: 'Cerca nelle domande frequenti',
    pillsAria: 'Categorie FAQ',
    allTopicsLabel: 'Tutti gli argomenti',
    noResultsTitle: 'Nessuna domanda trovata',
    noResultsHint: 'Prova parole chiave come privacy, CSV, TypeScript o RFC.',
    categories: [
      {
        id: 'privacy',
        pillLabel: 'Privacy e Sicurezza',
        title: '1. Privacy dei Dati e Sicurezza Lato Client',
        items: [
          {
            q: 'I miei dati JSON sono davvero privati al 100% su JSON2X?',
            a: 'Sì. Formattazione, validazione e conversione avvengono interamente nella memoria locale del browser senza alcun invio su internet.',
            keywords: 'privacy sicurezza locale browser gdpr server'
          },
          {
            q: 'JSON2X salva o registra ciò che incollo?',
            a: 'Mai. Non esiste alcun backend. Chiudendo o aggiornando la scheda la memoria locale viene svuotata istantaneamente.',
            keywords: 'salvare log ritenzione memoria scheda'
          },
          {
            q: 'Posso usarlo offline o dietro VPN aziendale?',
            a: 'Sì. Non effettuando chiamate di elaborazione verso API esterne, funziona anche dietro firewall o senza connessione.',
            keywords: 'offline vpn firewall aziendale'
          },
          {
            q: 'È gratuito per uso aziendale e commerciale?',
            a: 'Sì, tutti i 21 strumenti sono gratuiti per progetti personali e commerciali senza registrazione.',
            keywords: 'gratis commerciale azienda licenza'
          }
        ]
      },
      {
        id: 'tools',
        pillLabel: 'Strumenti',
        title: '2. Utility e Convertitori Disponibili',
        items: [
          {
            q: 'Quali utility sono disponibili su JSON2X?',
            a: '21 strumenti: Formattatore, Validatore RFC 8259, Minificatore, Diff Checker, JSON ↔ CSV, YAML, XML, TOML, SQL, TypeScript, Zod, Prisma, Drizzle, GraphQL, Go/Rust/Python, JSON Schema, Dati Mock, JSONPath e Albero JSON.',
            keywords: 'strumenti elenco formattatore validatore minificatore csv yaml xml sql zod prisma'
          },
          {
            q: 'Come gestisce gli accenti in Excel il convertitore JSON in CSV?',
            a: 'Offre la modalità Excel (UTF-8 BOM) per visualizzare correttamente le lettere accentate italiane in Microsoft Excel e appiattisce automaticamente gli oggetti annidati.',
            keywords: 'csv excel bom accenti notazione punto'
          },
          {
            q: 'Posso generare interfacce TypeScript, schemi Zod e modelli Prisma?',
            a: 'Sì. Incollando un JSON di esempio vengono dedotti tipi, proprietà opzionali e schemi pronti per la produzione.',
            keywords: 'typescript zod prisma drizzle graphql generare'
          }
        ]
      },
      {
        id: 'performance',
        pillLabel: 'Prestazioni e Limiti',
        title: '3. Prestazioni e Limiti di Dimensione',
        items: [
          {
            q: 'Qual è la dimensione massima di file JSON supportata?',
            a: 'Grazie ai Web Worker in background puoi gestire payload da 50 MB fino a 100 MB+ in base alla RAM disponibile senza bloccare il browser.',
            keywords: 'dimensione massima limite 100mb web worker'
          },
          {
            q: 'Qual è la differenza tra Minificare e Formattare JSON?',
            a: 'Formattare aggiunge indentazione per la lettura umana; minificare elimina spazi e ritorni a capo per ridurre il peso nelle API.',
            keywords: 'minificare format differenza dimensione'
          }
        ]
      },
      {
        id: 'standards',
        pillLabel: 'Standard RFC',
        title: '4. Sintassi e Standard IETF RFC 8259',
        items: [
          {
            q: 'Perché JSON rifiuta le virgole finali e gli apici singoli?',
            a: 'IETF RFC 8259 impone doppi apici e vieta virgole dopo l’ultimo elemento per garantire compatibilità identica tra linguaggi.',
            keywords: 'rfc 8259 virgola finale apici singoli errore'
          },
          {
            q: 'Come risolvo un errore "Unexpected token"?',
            a: 'Incolla il testo nel Validatore JSON per individuare esattamente riga e colonna del carattere non valido.',
            keywords: 'unexpected token risolvere errore riga colonna'
          }
        ]
      },
      {
        id: 'legal',
        pillLabel: 'Licenza e Supporto',
        title: '5. Open Source e Contatti',
        items: [
          {
            q: 'JSON2X è open source?',
            a: 'Sì, codice sorgente, algoritmi e documentazione sono aperti sotto licenza MIT.',
            keywords: 'open source github mit licenza'
          },
          {
            q: 'Come posso segnalare un bug o proporre una funzione?',
            a: 'Apri una issue su GitHub (arjunn881/json2x) o scrivi a support@json2x.com.',
            keywords: 'bug supporto contatto github'
          }
        ]
      }
    ]
  },
  about: {
    title: 'Chi Siamo — JSON2X Strumenti JSON e CSV Lato Client Gratuiti',
    description: 'Scopri JSON2X: 21 strumenti gratuiti e open-source per JSON e CSV eseguiti al 100% nel browser con Web Worker, zero server e zero tracciamento.',
    keywords: 'chi siamo json2x, strumenti json sicuri browser, zero server sviluppatori, open source json, piattaforma gratuita senza tracciamento ne account, architettura client side protezione dati gdpr, codice aperto licenza mit audit comunitario, prestazioni web worker file json pesanti, alternativa pulita senza banner invasivi, principi ingegneria software progetto json2x, strumenti dev senza cookie di profilazione, supporto offline pwa dopo primo caricamento, velocita esecuzione locale motore v8, trasparenza zero chiamate di rete',
    eyebrow: 'Informazioni su JSON2X',
    h1: 'Progettato per sviluppatori che vogliono strumenti veloci e privati',
    lead: 'JSON2X è una raccolta gratuita e open-source di 21 utility JSON e CSV che funzionano interamente nel tuo browser. Nessun account, nessun upload, nessun tracciamento.',
    whyTitle: 'Perché nasce JSON2X?',
    whyParagraphs: [
      'Ogni sviluppatore si trova a dover formattare JSON minificati, validare configurazioni o convertire payload API in CSV o SQL. Troppi siti inviano questi dati su server remoti o rallentano il flusso con banner invasivi.',
      'JSON2X fa l’esatto opposto: ogni strumento è una pagina statica con JavaScript nativo lato client. Nessun backend, nessun database: le tue chiavi API e i dati aziendali restano sul tuo dispositivo.',
      'Ottimizzato per partire subito via CDN globale e gestire payload corposi con i Web Worker senza bloccare la pagina.'
    ],
    principlesTitle: 'Principi di Ingegneria',
    principles: [
      { title: 'Privacy per architettura', text: 'Zero richieste verso l’esterno durante l’elaborazione, verificabile nel pannello Network.' },
      { title: 'Zero registrazione forzata', text: 'Nessun paywall, nessun limite nascosto su tutti i 21 strumenti.' },
      { title: 'Leggero e rapido', text: 'I file oltre 200 KB girano in Web Worker asincroni senza bloccare l’interfaccia.' },
      { title: 'Usabile anche offline', text: 'Una volta memorizzato nella cache dal browser, funziona senza connessione Internet.' }
    ],
    allToolsTitle: 'Tutti gli Strumenti per Sviluppatori (21)',
    contactTitle: 'Domande o feedback?',
    contactDesc: 'Hai trovato un bug o vuoi proporre un nuovo strumento? Scrivici direttamente.'
  },
  docsHub: {
    title: 'Documentazione Tecnica e Specifiche IETF JSON — JSON2X',
    description: 'Riferimenti di architettura, specifica ufficiale RFC 8259, gestione Web Worker e guide di generazione codice per tutti gli strumenti JSON2X.',
    keywords: 'documentazione json rfc 8259, guida web worker json, specifiche json2x, riferimento grammatica ufficiale ietf json, algoritmo appiattimento csv notazione a punto, inferenza tipi opzionali typescript zod, manuale tecnico generatori sql prisma drizzle, validazione rigorosa payload api rest, ottimizzazione memoria parsing json client, guide architettura suite sviluppatori, algoritmo diff semantico albero json, specifica parser csv rfc 4180 accenti, motore valutazione query filtri jsonpath, inferenza schemi draft 07 e openapi',
    schemaName: 'Centro Documentazione JSON2X',
    badge: 'Centro Documentazione',
    h1: 'Documentazione Tecnica e Specifiche',
    desc: 'Guide architetturali, standard IETF RFC 8259, funzionamento dei parser e inferenza tipi per i nostri strumenti nel browser.',
    englishNotice: 'Nota: I singoli manuali tecnici dettagliati si aprono nella lingua originale inglese (EN).',
    categoryLabels: {
      'Format & Validate': 'Formattazione e Validazione',
      'Data Converters': 'Convertitori di Dati',
      'Code & Schema': 'Codice e Schemi',
      'Query & Inspection': 'Query e Ispezione',
      'Performance Notes': 'Prestazioni'
    }
  },
  kbHub: {
    title: 'Knowledge Base JSON: Errori, Tutorial ed Esempi | JSON2X',
    description: 'Indice tecnico con oltre 50 guide su risoluzione errori JSON, array, oggetti, validazione, escape e query JSONPath.',
    keywords: 'knowledge base errori json, risolvere unexpected token json, tutorial jsonpath e schemi, correggere virgola finale apici singoli json, escape a capo caratteri unicode stringhe json, esempi filtri query jsonpath array oggetti, guida pratica json schema draft 07 ajv, riferimento rapido sintassi oggetti array json, diagnosi veloce errori parsing risposte api, raccolta guide pratiche json sviluppatori, errore unexpected end of json input soluzione, tipi primitivi numeri booleani null json, evitare accenti errati excel csv bom, guida conversione api json in sql typescript',
    schemaName: 'Knowledge Base Tecnica JSON2X',
    badge: 'Knowledge Base',
    h1: 'Knowledge Base JSON e Riferimenti Tecnici',
    desc: 'Guide pratiche alla risoluzione errori, specifiche di sintassi ed esempi per sviluppatori.',
    englishNotice: 'Nota: Gli articoli di approfondimento della Knowledge Base sono pubblicati in inglese (EN).',
    categoryLabels: {
      'Troubleshooting': 'Risoluzione Errori',
      'Tutorials': 'Tutorial',
      'Examples': 'Esempi',
      'Reference': 'Riferimento',
      'Structures': 'Strutture',
      'Validation': 'Validazione',
      'Formatting': 'Formattazione',
      'Databases': 'Database',
      'Backend': 'Backend',
      'Testing': 'Testing',
      'Performance': 'Prestazioni',
      'APIs': 'API',
      'Schemas': 'Schemi',
      'Querying': 'Query',
      'Comparison': 'Confronto',
      'Conversion': 'Conversione',
      'Fixing': 'Correzione',
      'Editors & Plugins': 'Editor',
      'Languages': 'Linguaggi',
      'Converters': 'Convertitori',
      'Generators': 'Generatori',
      'Frameworks': 'Framework'
    }
  },
  blogHub: {
    title: 'Blog di Ingegneria e Tutorial JSON / API — JSON2X',
    description: 'Articoli approfonditi su benchmark di minificazione JSON, migrazioni YAML/XML/SQL, TypeScript & Zod e architetture zero-server.',
    keywords: 'blog ingegneria json, tutorial typescript zod, benchmark minificazione json, migrazione xml soap verso json rest api, guide kubernetes yaml docker compose json, sicurezza privacy architetture zero server gdpr, ottimizzare payload api con minificazione json, validazione runtime zod tipi typescript insieme, confronto formati json yaml toml xml sql, articoli tecnici ingegneria dati client, gestire json grandi 100mb senza blocchi ui, generare modelli prisma drizzle da api json, test api senza dati reali con mock json, workflow devops sicuri nel browser',
    schemaName: 'Blog di Ingegneria JSON2X',
    badge: 'Blog Tecnico',
    h1: 'Blog di Ingegneria e Tutorial',
    desc: 'Approfondimenti su ingegneria dati lato client, standard RFC, inferenza tipi e privacy senza server.',
    englishNotice: 'Nota: Ogni articolo completo del blog è pubblicato in inglese tecnico originale (EN).',
    categoryLabels: {
      'Architecture': 'Architettura',
      'Validation': 'Validazione',
      'Performance': 'Prestazioni',
      'DevOps': 'DevOps',
      'Data Engineering': 'Data Engineering',
      'Enterprise': 'Enterprise / Legacy',
      'Tooling': 'Strumenti',
      'Databases': 'Database',
      'Productivity': 'Produttività',
      'TypeScript': 'TypeScript',
      'Backend': 'Backend',
      'API Design': 'Design API',
      'Security': 'Sicurezza',
      'Querying': 'Query',
      'Visualization': 'Visualizzazione'
    }
  }
};

export const PAGES_BUNDLES: Partial<Record<Exclude<Lang, 'en'>, LocalizedPagesBundle>> = {
  es: esPages,
  ja: jaPages,
  fr: frPages,
  de: dePages,
  pt: ptPages,
  ko: koPages,
  it: itPages,
};

export function getPageBundle(lang: Lang): LocalizedPagesBundle | undefined {
  if (lang === 'en') return undefined;
  return PAGES_BUNDLES[lang];
}

