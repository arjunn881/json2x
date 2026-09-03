export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  aliases: string[];
  name: string;
  h1?: string;
  title: string;
  metaDesc: string;
  keywords: string;
  desc: string;
  category: string;
  badge?: string;
  icon: string;
  href: string;
  related: string[];
  faqs: ToolFAQ[];
  features?: string[];
  schemaType?: string;

  /**
   * AEO — a self-contained 40–55 word answer to the page's implicit question.
   * Rendered as `#direct-answer` (referenced by the `speakable` selector in
   * SEO.astro) so answer engines and voice assistants can lift it verbatim.
   */
  answer?: string;

  /** UX — label for the left (input) pane of the tool workspace. */
  inputLabel?: string;

  /** UX — label for the right (output) pane of the tool workspace. */
  outputLabel?: string;

  /**
   * Programmatic SEO — slugs under /kb/tools/ that target long-tail variants
   * of this tool. Linking them from the tool page removes them from being
   * orphaned and passes internal authority down to the pSEO cluster.
   */
  guides?: string[];

  /** Technical SEO — ISO date used for schema `dateModified` and sitemap lastmod. */
  dateModified?: string;

  /** High-CTR keyword cluster surfaced as on-page "searches this tool answers". */
  ctrKeywords?: string[];
}

export const CATEGORIES: ToolCategory[] = [
  {
    id: 'format-validate',
    name: 'Format & Validate',
    desc: 'Prettify, lint, minify & compare',
    icon: `<svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/><rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor"/><rect x="2" y="13" width="12" height="2" rx="1" fill="currentColor"/></svg>`
  },
  {
    id: 'converters',
    name: 'Data Converters',
    desc: 'Transform between structured data formats',
    icon: `<svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 6h10M11 3l3 3-3 3M14 12H4M7 9l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'generators',
    name: 'Code & Schema',
    desc: 'Generate types, schemas & mock payloads',
    icon: `<svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M5 4L1 9l4 5M13 4l4 5-4 5M10 2L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'query-view',
    name: 'Query & Inspection',
    desc: 'Query, search & visualize JSON trees',
    icon: `<svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M9 6v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
  }
];

export const TOOL_ICONS: Record<string, string> = {
  formatter: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/><rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor"/><rect x="2" y="13" width="12" height="2" rx="1" fill="currentColor"/></svg>`,
  validator: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  minifier: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 3v12M4 8l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  diff: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="2" width="6" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="6" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 9h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  converter: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 6h10M11 3l3 3-3 3M14 12H4M7 9l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'json-converter': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 5h14M2 9h10M2 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="14" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'json-to-ts': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 5h14M2 9h8M2 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 10v5M11 10h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  jsonpath: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M9 6v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  schema: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="6" y="1" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="1" y="13" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="13" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M9 5v4M9 9H3v4M9 9h6v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  viewer: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="4" cy="4" r="1.5" fill="currentColor"/><circle cx="4" cy="9" r="1.5" fill="currentColor"/><circle cx="4" cy="14" r="1.5" fill="currentColor"/><path d="M7 4h7M7 9h5M7 14h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'json-to-csv': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="2" width="14" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M2 7h14M2 11h14M7 7v7" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'csv-to-json': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 5h12M3 9h8M3 13h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 11l3 2-3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'json-to-yaml': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 3h12v12H3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'json-to-xml': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M5 4L2 9l3 5M13 4l3 5-3 5M10 3L8 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'json-to-toml': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 6h4M9 6v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'json-to-sql': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="4" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 7v4c0 1.5 3 3 7 3s7-1.5 7-3V7M2 11v4c0 1.5 3 3 7 3s7-1.5 7-3v-4" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'json-to-code': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M5 4L1 9l4 5M13 4l4 5-4 5M10 2L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'json-mock-generator': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="6.5" cy="6.5" r="1" fill="currentColor"/><circle cx="11.5" cy="11.5" r="1" fill="currentColor"/><circle cx="9" cy="9" r="1" fill="currentColor"/></svg>`,
  'json-to-zod': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 4h12M3 8h8l-5 6h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'json-to-prisma': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2L3 14l2 2 4-4 4 4 2-2L9 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  'json-to-drizzle': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="4" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="11" width="14" height="4" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 7v4M10 7v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'json-to-graphql': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="3" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="7" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="13" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="16" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="3" cy="13" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="3" cy="7" r="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M9 4.5L14 7.5M14.5 8.5v5M14 13.5L9 15.5M9 15.5L4 13.5M3.5 13.5v-5M4 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
};

export const TOOLS: ToolItem[] = [
  // ── Format & Validate ───────────────────
  {
    id: 'formatter',
    slug: 'json-formatter',
    aliases: ['formatter', 'json-beautifier', 'json-prettifier', 'json-fixer', 'json-online-formatter', 'format-json'],
    name: 'JSON Formatter',
    h1: 'JSON Formatter, Beautifier & Parser Online',
    title: 'JSON Formatter Online — Free JSON Beautifier & Validator',
    metaDesc: 'Free online JSON formatter, beautifier and validator. Pretty-print minified JSON with 2/4-space or tab indent, live error line numbers, and zero uploads.',
    keywords: 'json formatter, json formatter online, online json formatter, free json formatter, free online json formatter, json formatter online free, json formatter tool, pretty json formatter, format json, json format, json beautifier, beautify json, json beautify, beautify json online, online json beautifier, free json beautifier, pretty print json, json prettify, json prettifier, json parser, parse json, online json parser, json parse online, json parser tool, free json parser, json formatter and validator, online json formatter and validator, best json formatter, text to json formatter, string to json formatter, json formatter example',
    desc: 'Prettify, validate & syntax-highlight JSON',
    category: 'format-validate',
    badge: 'Popular',
    icon: TOOL_ICONS.formatter,
    href: '/tools/json-formatter',
    related: ['validator', 'minifier', 'diff', 'viewer'],
    answer: 'A JSON formatter — also called a JSON beautifier, prettifier, or parser — re-indents compact or minified JSON so its structure becomes readable. Paste JSON into the left pane and the pretty-printed, syntax-highlighted result appears on the right with 2-space, 4-space, or tab indentation.',
    inputLabel: 'JSON Input',
    outputLabel: 'Formatted JSON',
    dateModified: '2026-09-03',
    features: [
      '100% Client-Side Processing',
      'Zero Server Uploads',
      'Syntax Highlighting',
      'Web Worker Offloading Above 200 KB',
      '2-Space, 4-Space and Tab Indentation',
      'Error Line Numbers',
      'Dark Mode Support'
    ],
    guides: ['json-formatter-online', 'json-beautifier', 'json-pretty-print', 'json-formatter-free', 'json-formatter-and-validator', 'text-to-json-formatter', 'json-parser-online', 'json-editor-online', 'json-formatter-python', 'json-formatter-javascript', 'json-formatter-api-response', 'best-json-tool-online', 'secure-private-json-formatter'],
    ctrKeywords: ['json formatter online free', 'free online json formatter', 'online json formatter and validator', 'json formatter and validator', 'best json formatter online', 'beautify json online', 'free json beautifier', 'json pretty print online', 'online json parser', 'text to json formatter', 'format json without uploading', 'json formatter dark mode', 'json formatter large file'],
    faqs: [
      {
        q: 'What is a JSON formatter and beautifier?',
        a: 'A JSON formatter (also called a JSON beautifier or JSON prettifier) parses compact, unformatted, or minified JSON text and applies consistent indentation, line breaks, and whitespace. This makes complex nested structures easy for developers to read, audit, and debug without altering any data values.'
      },
      {
        q: 'How do I format minified or compact JSON in the browser?',
        a: 'Simply paste your raw or minified JSON string into the input panel, or drag and drop a .json file. The formatter immediately renders formatted JSON with syntax highlighting in your chosen spacing (2 spaces, 4 spaces, or tabs) with zero delay.'
      },
      {
        q: 'What is the difference between JSON formatting, beautifying, and pretty printing?',
        a: 'They are identical concepts. "JSON Beautifier" is the most searched consumer term globally, "JSON Formatter" is standard in developer documentation, and "Pretty Print" is standard in command-line tools (such as jq or Python json.tool). Our tool performs all three.'
      },
      {
        q: 'Is my JSON data uploaded or stored on your servers?',
        a: 'No. All parsing, validation, and beautification runs 100% client-side in your browser using JavaScript and Web Workers. Your data, API tokens, passwords, and private records never leave your local machine.'
      },
      {
        q: 'Can this tool format and validate large JSON files?',
        a: 'Yes. Anything above 200 KB is handed to a background Web Worker, so the tab stays responsive while multi-megabyte API dumps are parsed and highlighted. File uploads are capped at 5 MB; pasted text is limited only by your available memory.'
      },
      {
        q: 'How do I pretty print JSON in Python, JavaScript, and Bash?',
        a: 'In Python: json.dumps(data, indent=2). In JavaScript: JSON.stringify(obj, null, 2). In Bash terminal: echo \'{"a":1}\' | jq . or echo \'{"a":1}\' | python3 -m json.tool.'
      },
      {
        q: 'Is this a free online JSON formatter and validator?',
        a: 'Yes. It is a free online JSON formatter and validator in one page — the same paste that pretty-prints your JSON also parses it, so an invalid document is reported with its error line before any output is produced. There is no sign-up, no usage quota, and no paid tier.'
      },
      {
        q: 'How do I convert plain text or a string to formatted JSON?',
        a: 'Paste the text into the input pane. If it is already valid JSON held in a string — for example a payload copied out of a log line or a database column — the formatter parses and re-indents it. Escaped quotes such as \\" are unescaped as part of parsing, so stringified JSON becomes readable JSON.'
      },
      {
        q: 'What indentation options are supported?',
        a: 'You can choose between 2 spaces (standard for JavaScript and Node.js), 4 spaces (standard for Python, Java, and C#), or tab indentation (preferred in Go) using the toolbar dropdown.'
      },
      {
        q: 'How does key sorting work and why is it useful for git diffs?',
        a: 'The Sort Keys toggle alphabetically reorders object properties at all nesting levels. This normalises key order across different API outputs, eliminating false differences when comparing files in Git pull requests.'
      }
    ]
  },
  {
    id: 'validator',
    slug: 'json-validator',
    aliases: ['validator', 'json-checker', 'json-lint', 'json-syntax-checker'],
    name: 'JSON Validator',
    h1: 'JSON Validator, Lint & Syntax Checker Online',
    title: 'JSON Validator Online — Free JSON Lint & Syntax Checker',
    metaDesc: 'Free online JSON validator and lint tool. Catch trailing commas, single quotes and unquoted keys with the exact line and column of every error. No upload.',
    keywords: 'json validator, json validator online, online json validator, json validator tool, online json validator tool, free json validator online, json validator formatter, json validator and formatter, json validator and fixer, json validator with schema, json validator schema, schema json validator, json lint, json lint online, jsonlint, json checker, json checker online, json repair, json fixer, fix json online, validate json, json syntax checker, json linter, json error checker, rfc 8259 validator',
    desc: 'RFC 8259 validation with exact line errors',
    category: 'format-validate',
    icon: TOOL_ICONS.validator,
    href: '/tools/json-validator',
    related: ['formatter', 'schema', 'json-to-zod', 'diff'],
    answer: 'A JSON validator checks text against the RFC 8259 grammar and reports the exact line and column of any syntax error, so invalid JSON can be fixed in seconds. Paste JSON on the left; the right pane shows valid or invalid status, the failing line, and stats such as key count, nesting depth, and byte size.',
    inputLabel: 'JSON Input',
    outputLabel: 'Validation Report',
    dateModified: '2026-09-03',
    guides: ['json-validator-online', 'json-lint', 'json-checker-online', 'json-repair-online', 'json-validator-api', 'json-schema-validator-online'],
    ctrKeywords: ['free json validator online', 'online json validator tool', 'json validator and formatter', 'json validator with schema', 'json lint online', 'json checker online', 'fix json online', 'json repair tool', 'json fixer online', 'validate json file online', 'find json error line number', 'is my json valid', 'rfc 8259 json validator'],
    faqs: [
      {
        q: 'How do I validate JSON syntax online?',
        a: 'Paste your JSON into the editor. The validator instantly checks the payload against official IETF RFC 8259 syntax specifications and highlights any syntax errors with exact line and column numbers.'
      },
      {
        q: 'What is JSONLint and how does this validator compare?',
        a: 'JSONLint is a classic JSON syntax validator. JSON2X provides identical strict RFC 8259 validation, plus modern dark mode, instant keystroke validation, structural statistics (depth, keys, arrays), and zero server uploads.'
      },
      {
        q: 'What are the most common JSON syntax errors?',
        a: 'The most frequent errors include: trailing commas after the last array/object item, using single quotes (\'str\') instead of double quotes ("str"), unquoted property keys, JavaScript comments (// or /* */), and missing closing brackets.'
      },
      {
        q: 'Does standard JSON support comments (// or /* */)?',
        a: 'No. Standard JSON (RFC 8259) does not support comments of any kind. If you need comments in configuration files, consider formats like JSONC, JSON5, YAML, or TOML.'
      },
      {
        q: 'Why are single quotes invalid in JSON?',
        a: 'The JSON specification strictly mandates double quotation marks (") for all string literals and property names. Single quotes are valid in JavaScript object literals, but invalid in JSON strings.'
      },
      {
        q: 'What does "Unexpected token" or "Unexpected end of JSON input" mean?',
        a: '"Unexpected token" means the parser encountered a character where it was not expected (e.g. a misplaced comma or colon). "Unexpected end of input" means brackets or quotation marks were opened but never closed before the end of the file.'
      },
      {
        q: 'Can JSON keys be numbers or unquoted identifiers?',
        a: 'No. In valid JSON, every key must be a double-quoted string (e.g. {"123": "value"}). Unquoted keys like {name: "Alice"} or numeric keys like {1: "val"} will fail validation.'
      },
      {
        q: 'How do I fix or repair invalid JSON?',
        a: 'Work from the reported line and column outward. The four faults behind most failures are a trailing comma before a closing bracket, single quotes instead of double quotes, an unquoted key, and an unclosed bracket or quote. Correct the flagged character, and validation re-runs on the next keystroke — then send the result through the JSON Formatter to re-indent it.'
      },
      {
        q: 'Can I validate JSON against a schema as well as its syntax?',
        a: 'This page enforces RFC 8259 syntax. For contract checks — required fields, types, enums, string formats — use the JSON Schema Generator to derive a Draft-07 or 2020-12 schema from a known-good payload, then validate future payloads against that schema in your own test suite or CI pipeline.'
      },
      {
        q: 'What RFC specification does this JSON validator enforce?',
        a: 'It strictly enforces IETF RFC 8259 (and ECMA-404), which defines the universal grammar for JavaScript Object Notation data exchange.'
      }
    ]
  },
  {
    id: 'minifier',
    slug: 'json-minifier',
    aliases: ['minifier', 'minify-json', 'json-compressor'],
    name: 'JSON Minifier',
    h1: 'JSON Minifier & Compressor Online',
    title: 'JSON Minifier Online — Free JSON Compressor & Size Reducer',
    metaDesc: 'Free online JSON minifier and compressor. Minify JSON to cut payload size up to 60% — every space, tab and newline outside strings stripped, data identical.',
    keywords: 'json minifier, json minifier online, online json minifier, free json minifier, minify json, json minify, json minify tool, json minify online, json compressor, compress json, json compression, reduce json size, strip json whitespace, json one line',
    desc: 'Strip whitespace & compress payload size',
    category: 'format-validate',
    icon: TOOL_ICONS.minifier,
    href: '/tools/json-minifier',
    related: ['formatter', 'validator', 'json-to-csv', 'json-converter'],
    answer: 'JSON minification removes every space, tab, and newline that sits outside a string literal, collapsing the document to a single line. Data, key order, and types stay identical. Typical savings are 20–60% before Gzip. Paste JSON on the left; the minified result and size comparison appear on the right.',
    inputLabel: 'JSON Input',
    outputLabel: 'Minified JSON',
    dateModified: '2026-09-03',
    guides: ['json-minifier-online', 'json-compressor', 'json-minifier-production'],
    ctrKeywords: ['minify json online free', 'free json minifier', 'online json minifier', 'json minify tool', 'json compressor online', 'compress json file', 'reduce json payload size', 'json one line converter', 'remove whitespace from json', 'json minifier no upload'],
    faqs: [
      {
        q: 'What is JSON minification and compression?',
        a: 'JSON minification strips all non-essential whitespace characters (spaces, line feeds, carriage returns, and tabs) outside of string literals. The resulting single-line JSON string retains 100% semantic parity while reducing byte size.'
      },
      {
        q: 'How much bandwidth does JSON minification save?',
        a: 'Minifying human-formatted JSON typically saves 20% to 60% in uncompressed payload size. When paired with Gzip or Brotli compression in HTTP transfer, minification accelerates API throughput and reduces mobile data usage.'
      },
      {
        q: 'Does minifying JSON break data structures or types?',
        a: 'No. Minification only strips extraneous formatting whitespace. It preserves all keys, string values (including intentional whitespace inside strings), numbers, booleans, arrays, and null literals exactly as intended.'
      },
      {
        q: 'How do I minify JSON in Node.js, Python, or command line?',
        a: 'In Node.js: JSON.stringify(JSON.parse(data)). In Python: json.dumps(json.loads(data), separators=(",", ":")). In Linux / macOS terminal: jq -c . file.json.'
      },
      {
        q: 'Is JSON minification safe for production API responses?',
        a: 'Yes. Minified JSON is the universal industry standard for production REST and GraphQL API responses, webhook deliveries, and database JSON columns.'
      },
      {
        q: 'What is the largest JSON file I can minify here?',
        a: 'Uploads are capped at 5 MB per file, which covers the vast majority of API responses, config bundles, and database exports. Pasted text has no hard limit — minification runs locally in your browser, so the practical ceiling is your available memory rather than a server quota.'
      }
    ]
  },
  {
    id: 'diff',
    slug: 'json-diff',
    aliases: ['diff', 'json-compare', 'json-diff-checker', 'compare-json'],
    name: 'JSON Diff',
    h1: 'JSON Compare & JSON Diff Checker Online',
    title: 'JSON Compare Online — Free JSON Diff Checker & Viewer',
    metaDesc: 'Compare two JSON files online with a free JSON diff checker. Semantic compare ignores key order and formatting, highlighting added, removed and modified keys.',
    keywords: 'json compare, json diff, json diff checker, json diff checker online, online json diff checker, compare json, json compare online, online json compare, json compare tool, json comparison tool, json difference checker, json file difference checker, compare two json files, compare json differences, json diff viewer, json diff online, diff json online, semantic json diff, json comparator, json difference',
    desc: 'Compare two JSON objects & highlight diffs',
    category: 'format-validate',
    icon: TOOL_ICONS.diff,
    href: '/tools/json-diff',
    related: ['formatter', 'validator', 'viewer', 'jsonpath'],
    answer: 'A JSON diff checker compares two JSON files by structure rather than by text, so reordered keys and different indentation are not reported as changes. Paste the original and the modified JSON into the two left panes; the right pane lists every added, removed, and modified key path.',
    inputLabel: 'JSON A & JSON B',
    outputLabel: 'Diff Result',
    dateModified: '2026-09-03',
    guides: ['json-diff-checker', 'json-compare-tool', 'compare-two-json-files', 'json-diff-api-versions'],
    ctrKeywords: ['compare two json files online', 'json compare online free', 'online json diff checker', 'json diff checker free', 'json comparison tool', 'json difference checker', 'json file difference checker', 'json diff viewer', 'compare json differences', 'semantic json compare', 'json diff ignore key order', 'diff json api responses'],
    faqs: [
      {
        q: 'How does the JSON Diff Checker work?',
        a: 'The tool parses both Left (Original) and Right (Modified) JSON strings into abstract syntax trees, normalizes keys, and performs a deep recursive structural comparison, highlighting added keys in green, removed keys in red, and mutated values in yellow.'
      },
      {
        q: 'What makes JSON diff different from standard text diff?',
        a: 'Text diffs fail when keys are reordered or formatted with different indentation. A semantic JSON diff evaluates pure data equality regardless of whitespace or key order.'
      },
      {
        q: 'Can I compare large API responses side-by-side?',
        a: 'Yes. You can paste raw responses or upload files directly into the left and right panels.'
      },
      {
        q: 'Is any comparison data stored on external servers?',
        a: 'Never. The diff comparison runs entirely in your local browser JavaScript engine.'
      }
    ]
  },

  // ── Data Converters ─────────────────────
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    aliases: ['json2csv', 'json-csv-converter'],
    name: 'JSON to CSV',
    h1: 'JSON to CSV Converter Online',
    title: 'JSON to CSV Converter Online — Free JSON to Excel Export',
    metaDesc: 'Free JSON to CSV converter online. Flattens nested objects into dot-notation columns, auto-detects headers and exports RFC 4180 CSV, TSV or Excel files.',
    keywords: 'json to csv, convert json to csv, json to csv converter, json to csv online, online json to csv converter, json to csv converter online, convert json to csv online, free json to csv converter, json to csv converter free, convert json to csv format, json to excel, json to tsv, json to spreadsheet, export json to csv, json2csv, convert json array to csv',
    desc: 'Export JSON arrays to downloadable CSV',
    category: 'converters',
    icon: TOOL_ICONS['json-to-csv'],
    href: '/tools/json-to-csv',
    related: ['csv-to-json', 'json-to-sql', 'json-to-yaml', 'json-converter'],
    answer: 'To convert JSON to CSV, paste an array of objects into the left pane. Every unique key across all objects becomes a column header, nested objects flatten to dot-notation columns such as user.name, and the RFC 4180 result appears on the right ready to open in Excel or Google Sheets.',
    inputLabel: 'JSON Input',
    outputLabel: 'CSV Output',
    dateModified: '2026-09-03',
    guides: ['json-to-csv-converter', 'json-to-excel-converter', 'json-to-csv-excel', 'json-to-tsv-converter'],
    ctrKeywords: ['json to csv online free', 'free json to csv converter', 'json to csv converter online', 'convert json to csv online', 'json to excel converter', 'json to tsv converter', 'convert json array to csv', 'flatten nested json to csv', 'json to spreadsheet', 'json to csv no upload'],
    faqs: [
      {
        q: 'How do I convert a JSON array into a CSV file?',
        a: 'Paste your JSON array of objects into the editor. The converter detects all unique column headers across all objects, flattens nested objects if desired, and generates standard RFC 4180 CSV.'
      },
      {
        q: 'How are nested JSON objects and arrays handled in CSV export?',
        a: 'You can enable "Flatten Nested Objects" to turn { user: { name: "Alice" } } into a column named user.name, or stringify sub-arrays as JSON strings within cells.'
      },
      {
        q: 'Can I open the generated CSV in Microsoft Excel or Google Sheets?',
        a: 'Yes. The downloaded .csv file is 100% standard RFC 4180 compliant with UTF-8 encoding, immediately opening into Excel, Numbers, and Google Sheets.'
      },
      {
        q: 'What is the maximum file size for browser CSV conversion?',
        a: 'The converter handles tens of thousands of rows smoothly within client memory.'
      }
    ]
  },
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    aliases: ['csv2json', 'csv-json-converter'],
    name: 'CSV to JSON',
    h1: 'CSV to JSON Converter Online',
    title: 'CSV to JSON Converter Online — Free CSV & TSV to JSON',
    metaDesc: 'Free CSV to JSON converter online. Turn spreadsheet, TSV or Excel-exported rows into a typed JSON array — numbers, booleans and nulls detected for you.',
    keywords: 'csv to json, convert csv to json, csv to json converter, csv to json online, online csv to json converter, free csv to json converter, csv to json converter online, excel to json, excel to json converter, tsv to json, tsv to json converter, spreadsheet to json, csv2json, parse csv to json online, convert csv to json array',
    desc: 'Parse CSV into JSON with type auto-detect',
    category: 'converters',
    icon: TOOL_ICONS['csv-to-json'],
    href: '/tools/csv-to-json',
    related: ['json-to-csv', 'formatter', 'json-to-sql', 'json-to-yaml'],
    answer: 'To convert CSV to JSON, paste your spreadsheet rows into the left pane. The first row is read as the property keys and every following row becomes one object in a JSON array, with numeric, boolean and null values typed automatically in the output on the right.',
    inputLabel: 'CSV Input',
    outputLabel: 'JSON Output',
    dateModified: '2026-09-03',
    guides: ['csv-to-json-converter', 'excel-to-json-converter', 'csv-to-json-python'],
    ctrKeywords: ['csv to json online free', 'free csv to json converter', 'csv to json converter online', 'excel to json converter', 'excel to json online', 'tsv to json converter', 'convert csv to json array', 'spreadsheet to json converter', 'csv to json with types', 'csv to json no upload'],
    faqs: [
      {
        q: 'How does CSV to JSON conversion work?',
        a: 'The parser reads the first row as property keys, then converts each subsequent row into a JSON object, forming an array of structured objects.'
      },
      {
        q: 'Does it automatically parse numeric and boolean types?',
        a: 'Yes. Type auto-detection parses numeric strings (e.g. "42", "3.14") into JSON numbers and "true"/"false" into boolean literals.'
      },
      {
        q: 'Can I convert tab-delimited (TSV) or semicolon-delimited files?',
        a: 'Yes. Select delimiter options: comma (,), tab (\\t), semicolon (;), or pipe (|).'
      },
      {
        q: 'How do I convert an Excel file to JSON?',
        a: 'Excel cannot be read directly, so use File → Save As → CSV (or Google Sheets → Download → CSV) and paste those rows here. The result is the same typed JSON array, and no spreadsheet ever leaves your machine.'
      },
      {
        q: 'Is my CSV data uploaded to a server?',
        a: 'No. Paste rows or drag a .csv file onto the page — either way parsing runs entirely in your browser tab, so customer lists, exports and financial rows never leave your machine.'
      }
    ]
  },
  {
    id: 'json-to-yaml',
    slug: 'json-to-yaml',
    aliases: ['yaml-to-json', 'json2yaml', 'yaml2json'],
    name: 'JSON to YAML',
    h1: 'JSON to YAML & YAML to JSON Converter',
    title: 'JSON to YAML & YAML to JSON Converter — Free Online',
    metaDesc: 'Free online JSON to YAML and YAML to JSON converter. Clean 2-space indentation for Kubernetes manifests, Docker Compose and CI pipelines. No upload.',
    keywords: 'json to yaml, convert json to yaml, json to yaml converter, json to yaml online, yaml to json, convert yaml to json, yaml to json converter, yaml to json online, free json to yaml converter, online yaml to json converter, json yaml converter, json2yaml, yaml2json, convert json to k8s yaml',
    desc: 'Convert JSON to clean YAML and vice versa',
    category: 'converters',
    icon: TOOL_ICONS['json-to-yaml'],
    href: '/tools/json-to-yaml',
    related: ['json-to-xml', 'json-to-toml', 'formatter', 'json-converter'],
    answer: 'JSON to YAML conversion rewrites the same data tree using indentation instead of braces and quotes. Paste JSON on the left and the right pane returns valid YAML with 2-space indentation, ready to drop into a Kubernetes manifest, Docker Compose file or GitHub Actions workflow.',
    inputLabel: 'JSON Input',
    outputLabel: 'YAML Output',
    dateModified: '2026-09-03',
    guides: ['json-to-yaml-converter', 'yaml-to-json-converter'],
    ctrKeywords: ['json to yaml online free', 'free json to yaml converter', 'yaml to json converter online', 'convert yaml to json online', 'json to kubernetes yaml', 'json to docker compose yaml', 'convert json to yaml 2 space indent', 'json yaml converter no upload'],
    faqs: [
      {
        q: 'Why convert JSON to YAML?',
        a: 'YAML offers a human-readable, comment-friendly format ideal for configuration files such as Kubernetes manifests, Docker Compose, GitHub Actions workflows, and Ansible playbooks.'
      },
      {
        q: 'Is bidirectional conversion supported (YAML to JSON)?',
        a: 'Yes. Toggle between JSON → YAML and YAML → JSON with one click.'
      },
      {
        q: 'How do I convert JSON to a Kubernetes YAML manifest?',
        a: 'Paste the JSON form of the manifest and the output is valid YAML with 2-space indentation — the style kubectl, Helm and Kustomize expect. Copy it straight into your manifest file; keys and nesting are preserved exactly.'
      },
      {
        q: 'Does conversion change my data or lose comments?',
        a: 'Values, types and nesting are preserved in both directions. Comments cannot survive a round trip because JSON has no comment syntax, so a YAML → JSON → YAML pass drops them — convert once rather than repeatedly.'
      },
      {
        q: 'Is this JSON to YAML converter free, and is anything uploaded?',
        a: 'It is free with no account, and nothing is uploaded. Conversion runs in your browser, which matters when the file is a manifest containing service names, hostnames or secret references.'
      }
    ]
  },
  {
    id: 'json-to-xml',
    slug: 'json-to-xml',
    aliases: ['xml-to-json', 'json2xml', 'xml2json'],
    name: 'JSON to XML',
    h1: 'JSON to XML & XML to JSON Converter',
    title: 'JSON to XML & XML to JSON Converter — Free Online',
    metaDesc: 'Free online JSON to XML and XML to JSON converter. Custom root tag, indented well-formed output and repeated array siblings for SOAP, RSS and legacy APIs.',
    keywords: 'json to xml, convert json to xml, json to xml converter, json to xml online, xml to json, convert xml to json, xml to json converter, xml to json online, online xml to json converter, free xml to json converter, json xml converter, json2xml, xml2json, json to soap xml, xml parser to json',
    desc: 'Convert JSON objects into valid XML trees',
    category: 'converters',
    icon: TOOL_ICONS['json-to-xml'],
    href: '/tools/json-to-xml',
    related: ['json-to-yaml', 'json-to-toml', 'json-to-csv', 'formatter'],
    answer: 'JSON to XML conversion maps each object key to an element tag, primitive values to tag text, and repeated array items to sibling elements under one root node. Paste JSON on the left, set the root tag name, and the right pane returns indented, well-formed XML.',
    inputLabel: 'JSON Input',
    outputLabel: 'XML Output',
    dateModified: '2026-09-03',
    guides: ['json-to-xml-converter', 'xml-to-json-converter'],
    ctrKeywords: ['json to xml online free', 'free json to xml converter', 'xml to json converter online', 'convert xml to json online', 'free xml to json converter', 'convert json to xml with root tag', 'json to soap xml', 'json to xml formatter', 'json xml converter no upload'],
    faqs: [
      {
        q: 'How does JSON to XML mapping work?',
        a: 'Object keys become XML tags, primitives become tag contents, and array items repeat matching enclosing element tags under a configurable root node.'
      },
      {
        q: 'Can I customize the XML root tag name?',
        a: 'Yes. Specify custom root element tags such as <root>, <data>, or <response> in the toolbar.'
      },
      {
        q: 'How do I convert XML to JSON?',
        a: 'Switch the direction selector to XML → JSON and paste your XML. Element names become object keys, text content is coerced to a number or boolean where it looks like one, and repeated sibling elements collapse into a JSON array.'
      },
      {
        q: 'Are XML attributes preserved in the JSON output?',
        a: 'No. Both directions work on elements and text only, so attributes on incoming XML are dropped and JSON keys always become child elements rather than attributes. For attribute-heavy documents, treat the output as a starting point.'
      },
      {
        q: 'Is this JSON to XML converter free, and is my payload uploaded?',
        a: 'It is free with no signup, and nothing is uploaded. Conversion runs in your browser, so SOAP envelopes and internal API payloads never leave your machine.'
      }
    ]
  },
  {
    id: 'json-to-toml',
    slug: 'json-to-toml',
    aliases: ['json2toml'],
    name: 'JSON to TOML',
    h1: 'JSON to TOML Converter Online',
    title: 'JSON to TOML Converter Online — Free TOML Config Tool',
    metaDesc: 'Free online JSON to TOML converter for Cargo.toml, pyproject.toml and Hugo config. Nested objects become [table] headers and arrays stay inline. No upload.',
    keywords: 'json to toml, convert json to toml, json to toml converter, json to toml online, online json to toml converter, free json to toml converter, json to toml config, json2toml, toml converter online, pyproject.toml generator, cargo.toml json converter',
    desc: 'Convert JSON into TOML configuration files',
    category: 'converters',
    icon: TOOL_ICONS['json-to-toml'],
    href: '/tools/json-to-toml',
    related: ['json-to-yaml', 'json-to-xml', 'formatter', 'json-to-code'],
    answer: 'JSON to TOML conversion turns nested objects into [table] headers and key/value pairs into plain assignments. Paste JSON on the left and the right pane returns TOML you can paste straight into Cargo.toml, pyproject.toml or a Hugo config file.',
    inputLabel: 'JSON Input',
    outputLabel: 'TOML Output',
    dateModified: '2026-09-03',
    guides: ['json-to-toml-converter'],
    ctrKeywords: ['json to toml online free', 'free json to toml converter', 'json to toml converter online', 'convert json to cargo toml', 'json to pyproject toml', 'json to toml config', 'toml converter online', 'json to toml no upload'],
    faqs: [
      {
        q: 'What is TOML used for?',
        a: 'TOML (Tom\'s Obvious Minimal Language) is designed for clean, unambiguous configuration files, widely used in Rust (Cargo.toml), Python (pyproject.toml), and Hugo.'
      },
      {
        q: 'How are nested JSON objects converted to TOML?',
        a: 'Each nested object becomes a [table] header using its dotted path, and its scalar keys are listed underneath as plain assignments. Arrays of primitives are written inline, such as features = ["serde", "tokio"].'
      },
      {
        q: 'Why does it say the TOML root must be an object?',
        a: 'TOML documents are always a table of key/value pairs, so a top-level JSON array has no valid representation. Wrap the array in an object first — for example { "items": [...] } — and it converts cleanly.'
      },
      {
        q: 'Is this JSON to TOML converter free, and does it upload my config?',
        a: 'It is free with no account, and nothing is uploaded. Conversion happens in your browser, so a Cargo.toml or pyproject.toml containing registry tokens or private paths stays local.'
      }
    ]
  },
  {
    id: 'json-to-sql',
    slug: 'json-to-sql',
    aliases: ['json2sql', 'json-sql-converter'],
    name: 'JSON to SQL',
    h1: 'JSON to SQL Table & INSERT Converter',
    title: 'JSON to SQL Online — Free CREATE TABLE & INSERT Generator',
    metaDesc: 'Free online JSON to SQL converter. Infers column types and generates CREATE TABLE plus escaped INSERT statements for PostgreSQL, MySQL and SQLite. No upload.',
    keywords: 'json to sql, convert json to sql, json to sql converter, json to sql online, online json to sql converter, free json to sql converter, json to sql insert, json to insert statement, json to create table, json to postgresql, json to mysql, json to sqlite, json sql generator, json array to sql table',
    desc: 'Generate CREATE TABLE & INSERT statements',
    category: 'converters',
    icon: TOOL_ICONS['json-to-sql'],
    href: '/tools/json-to-sql',
    related: ['json-to-csv', 'json-to-prisma', 'json-to-drizzle', 'json-converter'],
    answer: 'To convert JSON to SQL, paste an array of objects on the left. Every key is scanned across all rows to infer a column type such as INTEGER, BOOLEAN, TIMESTAMP or VARCHAR, and the right pane returns a CREATE TABLE statement followed by escaped INSERT rows.',
    inputLabel: 'JSON Input',
    outputLabel: 'SQL Output',
    dateModified: '2026-09-03',
    guides: ['json-to-sql-generator'],
    ctrKeywords: ['json to sql online free', 'free json to sql converter', 'json to sql converter online', 'json to sql insert statements', 'json to create table', 'json to postgresql converter', 'json to mysql insert', 'json to sqlite converter', 'convert json array to sql'],
    faqs: [
      {
        q: 'How does JSON to SQL conversion work?',
        a: 'The engine inspects all objects in your JSON array to infer column data types (VARCHAR, INTEGER, BOOLEAN, TIMESTAMP) and generates both CREATE TABLE DDL and INSERT statements.'
      },
      {
        q: 'Which SQL dialects are supported?',
        a: 'PostgreSQL, MySQL and SQLite. Pick the dialect in the toolbar and the generated types and quoting follow its conventions; the output is close enough to standard SQL to adapt for other engines by hand.'
      },
      {
        q: 'Can I set the table name for the generated SQL?',
        a: 'Yes. Type it in the table name field and both the CREATE TABLE statement and every INSERT use it, so you can paste the script into a migration without editing.'
      },
      {
        q: 'Are string values escaped safely in the INSERT statements?',
        a: 'Single quotes in string values are escaped so the generated INSERTs parse. Treat the output as a migration or seed script you review, not as a substitute for parameterised queries in application code.'
      },
      {
        q: 'How are nested objects and arrays handled?',
        a: 'SQL columns are flat, so a nested object or array has no direct column type. Flatten or extract those fields first — the JSONPath Tester is useful for pulling out the slice you want — then convert the flat array of objects.'
      }
    ]
  },

  // ── Code & Schema Generators ────────────
  {
    id: 'json-converter',
    slug: 'json-converter',
    aliases: ['multi-converter', 'json-to-all', 'converter'],
    name: 'JSON Multi-Converter',
    h1: 'JSON Multi-Converter: 7-in-1 Code & Schema Generator',
    title: 'JSON Converter Online — 7-in-1 TS, Zod, SQL & Schema',
    metaDesc: 'One JSON in, seven outputs: TypeScript interfaces, Zod schemas, Mongoose models, SQL DDL, JSON Schema, OpenAPI and mock data. Free and fully client-side.',
    keywords: 'json converter, json converter online, online json converter, free json converter, convert json, json multi converter, all in one json converter, json to typescript, json to zod, json to mongoose, json to openapi, json to schema, json to sql, convert json to multiple formats',
    desc: 'TS, Zod, Mongoose, SQL, OpenAPI, Schema & Mock',
    category: 'generators',
    badge: '7-in-1',
    icon: TOOL_ICONS['json-converter'],
    href: '/tools/json-converter',
    related: ['json-to-ts', 'json-to-zod', 'json-to-sql', 'json-to-yaml'],
    answer: 'The JSON multi-converter generates seven outputs from a single payload: TypeScript interfaces, Zod schemas, Mongoose models, SQL DDL, JSON Schema Draft-07, OpenAPI components and mock fixtures. Paste JSON on the left, pick a target format, and the generated code appears on the right.',
    inputLabel: 'JSON Input',
    outputLabel: 'Generated Output',
    dateModified: '2026-09-03',
    guides: ['json-multi-converter-online'],
    ctrKeywords: ['json converter online free', 'free json converter online', 'all in one json converter', 'json to typescript zod sql', 'json to mongoose model', 'json to openapi schema', 'convert json to multiple formats'],
    faqs: [
      {
        q: 'What is the JSON Multi-Converter?',
        a: 'An all-in-one developer workspace that converts a single JSON payload into 7 different targets simultaneously: TypeScript types, Zod schemas, Mongoose models, SQL DDL, JSON Schema Draft-07, OpenAPI schemas, and synthetic mock fixtures.'
      },
      {
        q: 'Do I have to paste my JSON again for each output format?',
        a: 'No. Paste once on the left and switch target tabs on the right — every format is generated from the same payload, which is the point of a multi-converter over seven separate tools.'
      },
      {
        q: 'Can I rename the generated interfaces, models and tables?',
        a: 'Yes. Each target has its own name field: a root name for the TypeScript and Zod output, a model name for Mongoose, a schema name for OpenAPI, and a table name plus dialect (PostgreSQL, MySQL or SQLite) for the SQL output.'
      },
      {
        q: 'Is the JSON multi-converter free, and does it upload my payload?',
        a: 'It is free with no account, and nothing is uploaded. All seven generators run in your browser, so a production API response with real identifiers stays on your machine.'
      }
    ]
  },
  {
    id: 'json-to-ts',
    slug: 'typescript-generator',
    aliases: ['json-to-ts', 'json-to-typescript'],
    name: 'JSON to TypeScript',
    h1: 'JSON to TypeScript Interface & Type Generator',
    title: 'JSON to TypeScript Online — Free Interface & Type Generator',
    metaDesc: 'Generate TypeScript interfaces from JSON in one paste. Infers nested types, unions, optional keys and arrays from any API response. Free, no upload.',
    keywords: 'json to typescript, json to typescript online, online json to typescript converter, free json to typescript converter, json to ts, convert json to typescript, json to interface, json to interface generator, typescript interface generator, typescript interface from json, json to ts type, quicktype online, ts interface generator from json',
    desc: 'Generate TS interfaces, types & Zod schemas',
    category: 'generators',
    icon: TOOL_ICONS['json-to-ts'],
    href: '/tools/typescript-generator',
    related: ['json-to-zod', 'json-to-prisma', 'json-to-drizzle', 'json-to-code'],
    answer: 'To convert JSON to TypeScript, paste an object or API response into the left pane. Each nested object becomes its own named interface, arrays are typed from their members, and keys missing on some objects are marked optional in the generated code on the right.',
    inputLabel: 'JSON Input',
    outputLabel: 'TypeScript Output',
    dateModified: '2026-09-03',
    guides: ['json-to-typescript-interface', 'json-to-typescript-api'],
    ctrKeywords: ['json to typescript online free', 'free json to typescript converter', 'json to interface generator', 'typescript interface from json', 'convert api response to typescript', 'json to ts types', 'quicktype alternative online', 'json to typescript no upload'],
    faqs: [
      {
        q: 'How does JSON to TypeScript generation work?',
        a: 'The generator recursively traverses nested JSON objects and arrays, creating typed interface declarations with accurate property types (string, number, boolean, array, union, any).'
      },
      {
        q: 'Can I generate type aliases (type T =) instead of interfaces (interface T {})?',
        a: 'Yes. Switch between interface and type alias declaration modes in the options toolbar.'
      },
      {
        q: 'How do I turn an API response into a TypeScript interface?',
        a: 'Paste the response body and set the root name to match the endpoint — UserResponse, for example. Nested objects become their own named interfaces, so you can copy the whole block into a types file and import from it immediately.'
      },
      {
        q: 'Can it mark properties as optional?',
        a: 'Yes. Enable the optional-properties toggle and keys are emitted as name?: type, which is the right shape when a field may be absent from some responses. There is also a toggle for adding export to each declaration.'
      },
      {
        q: 'Is this a free quicktype alternative that runs offline?',
        a: 'It is free with no account, and generation happens entirely in your browser — no payload is uploaded. That makes it usable on API responses containing customer data, where a server-side generator would not be.'
      }
    ]
  },
  {
    id: 'json-to-code',
    slug: 'json-to-code',
    aliases: ['json-to-go', 'json-to-rust', 'json-to-python'],
    name: 'JSON to Code',
    h1: 'JSON to Go Structs, Rust Serde & Python Models',
    title: 'JSON to Go, Rust & Python — Free Struct & Model Generator',
    metaDesc: 'Convert JSON to Go structs, Rust Serde structs or Python Pydantic models online. Correct types, json tags and serde attributes included. Free, no upload.',
    keywords: 'json to go, json to go struct, json to golang, json to rust, json to rust struct, json to python, json to pydantic, json to dataclass, json to code, json to struct online, free json to go converter, convert json to golang, serde struct generator',
    desc: 'Generate Go, Rust Serde & Python Pydantic models',
    category: 'generators',
    icon: TOOL_ICONS['json-to-code'],
    href: '/tools/json-to-code',
    related: ['json-to-ts', 'json-to-prisma', 'json-to-graphql', 'schema'],
    answer: 'Paste JSON on the left and pick Go, Rust or Python to generate typed structs on the right. Go output carries `json:"field"` tags, Rust output carries Serde derive attributes and renames, and Python output is a Pydantic BaseModel with annotated fields.',
    inputLabel: 'JSON Input',
    outputLabel: 'Generated Code',
    dateModified: '2026-09-03',
    ctrKeywords: ['json to go struct online', 'free json to go converter', 'json to rust serde struct', 'json to python pydantic model', 'json to golang converter', 'generate struct from json', 'json to dataclass online'],
    faqs: [
      {
        q: 'Which programming languages are supported in JSON to Code?',
        a: 'Go (struct with json tags), Rust (struct with serde derives and #[serde(rename)] attributes), and Python (Pydantic BaseModel).'
      },
      {
        q: 'How do I convert JSON to a Go struct?',
        a: 'Paste the JSON, choose Go Struct, and set the root name. Every key becomes an exported field with an inferred type and a `json:"original_key"` tag, so unmarshalling round-trips without renaming anything by hand.'
      },
      {
        q: 'Can it generate Python dataclasses instead of Pydantic models?',
        a: 'Not currently — Python output is a Pydantic BaseModel with typed fields and Optional where a value was null. Converting the class to a dataclass is a mechanical edit: swap the base class and the import.'
      },
      {
        q: 'Is this JSON to Go and Rust converter free, and is my JSON uploaded?',
        a: 'It is free with no signup, and nothing is uploaded. Struct generation runs in your browser, so internal API payloads stay on your machine.'
      }
    ]
  },
  {
    id: 'schema',
    slug: 'json-schema-generator',
    aliases: ['schema', 'json-schema', 'schema-generator'],
    name: 'JSON Schema Generator',
    h1: 'JSON Schema Generator Online (Draft-07)',
    title: 'JSON Schema Generator Online — Free Draft-07 From JSON',
    metaDesc: 'Free online JSON schema generator. Turn sample JSON into a Draft-07 schema with inferred types, a required array and optional example values. Nothing uploaded.',
    keywords: 'json schema generator, json schema generator online, online json schema generator, free json schema generator, generate json schema, generate json schema from json, json schema generator from json, json to json schema, json schema online, infer json schema, json schema draft-07, json schema draft 07 generator, schema json validator, json validator with schema',
    desc: 'Infer Draft-07 JSON Schema specifications',
    category: 'generators',
    icon: TOOL_ICONS.schema,
    href: '/tools/json-schema-generator',
    related: ['json-to-zod', 'json-to-ts', 'json-mock-generator', 'validator'],
    answer: 'A JSON Schema generator reads sample data and writes the contract it satisfies. Paste JSON on the left and the right pane returns a Draft-07 schema with a type inferred for every key, a required array built from the keys present, and example values when you enable them.',
    inputLabel: 'Sample JSON',
    outputLabel: 'JSON Schema',
    dateModified: '2026-09-03',
    guides: ['json-schema-generator-online', 'json-schema-validator-online'],
    ctrKeywords: ['json schema generator online free', 'free json schema generator', 'generate json schema from json', 'json schema generator from json', 'json schema draft 07 generator', 'infer json schema from sample', 'json validator with schema', 'api contract schema from json', 'json to json schema converter'],
    faqs: [
      {
        q: 'What is JSON Schema?',
        a: 'JSON Schema is an IETF standard specification that validates the structure, constraints, and data types of JSON payloads, essential for automated API contract testing.'
      },
      {
        q: 'How do I generate a JSON Schema from existing JSON?',
        a: 'Paste one representative payload into the left pane. Every key is read to infer its type, nested objects and arrays are described recursively, and the keys present become the required array. Turn off "mark all keys as required" when some fields are optional.'
      },
      {
        q: 'Which JSON Schema draft does the output target?',
        a: 'Draft-07, declared via the $schema keyword. It has the widest library support — Ajv, Python jsonschema and everyday OpenAPI 3.0 work all accept it. To target 2020-12 instead, change the $schema URI and adjust keywords such as items to prefixItems where your validator requires it.'
      },
      {
        q: 'Can it add example values to the schema?',
        a: 'Yes. Enable the examples option and each leaf gets an examples array carrying the value from your sample — useful when the schema doubles as documentation.'
      },
      {
        q: 'Is this JSON schema generator free, and is my sample uploaded?',
        a: 'It is free with no account, and nothing is uploaded. Inference runs in your browser, so a real API response used as the sample stays on your machine.'
      }
    ]
  },
  {
    id: 'json-mock-generator',
    slug: 'json-mock-generator',
    aliases: ['fake-json', 'mock-json'],
    name: 'JSON Mock Generator',
    h1: 'JSON Generator: Free Mock & Example JSON Data',
    title: 'JSON Generator Online — Free Mock & Example JSON Data',
    metaDesc: 'Free online JSON generator for mock and example data. Pick users, products, orders or transactions, set a row count, and get UUIDs, names, dates and geo fields.',
    keywords: 'json generator, json generator online, online json generator, free json generator, json data generator, json example generator, json mock generator, json mock data generator, mock json generator, fake json generator, generate json data, generate mock json, random json generator, dummy json generator, fake api json, mock data generator',
    desc: 'Generate realistic synthetic test datasets',
    category: 'generators',
    icon: TOOL_ICONS['json-mock-generator'],
    href: '/tools/json-mock-generator',
    related: ['schema', 'json-to-zod', 'json-to-ts', 'formatter'],
    answer: 'A JSON generator produces realistic example records for frontend prototyping and API testing. Choose an entity such as users, products or orders on the left, set how many rows you need, and a typed JSON array with UUIDs, names, dates and prices appears on the right.',
    inputLabel: 'Generator Options',
    outputLabel: 'Mock JSON Output',
    dateModified: '2026-09-03',
    guides: ['json-mock-data-generator', 'json-generator-online'],
    ctrKeywords: ['json generator online free', 'free json generator', 'json example generator', 'json data generator online', 'json mock data generator free', 'fake json generator online', 'generate test json data', 'random json data generator', 'mock api response generator', 'dummy json for testing'],
    faqs: [
      {
        q: 'How do I generate mock JSON data for API testing?',
        a: 'Select desired entities (Users, Products, Orders, Invoices), adjust the row count, and generate instant realistic JSON arrays.'
      },
      {
        q: 'Is this JSON generator free, and is there a row limit?',
        a: 'It is free with no account and no quota. Generation runs entirely in your browser, so the only practical ceiling is your available memory — a few thousand rows renders instantly on ordinary hardware.'
      },
      {
        q: 'How is a JSON generator different from a JSON schema generator?',
        a: 'A JSON generator writes example data: concrete records you can feed to a UI or a test. A JSON schema generator works the other way, reading data you already have and writing the contract it satisfies. Use this page for fixtures, and the JSON Schema Generator for validation rules.'
      },
      {
        q: 'Can it generate JSON from a text prompt or a schema I supply?',
        a: 'Not currently. Records are built from the built-in entity templates — users, products, orders, transactions — rather than from free-text instructions or a schema you paste in. If you need a specific shape, generate the closest entity and reshape it with the JSON Multi-Converter or JSONPath Tester.'
      }
    ]
  },
  {
    id: 'json-to-zod',
    slug: 'json-to-zod',
    aliases: ['zod-schema-generator', 'json-zod'],
    name: 'JSON to Zod',
    h1: 'JSON to Zod Schema Generator Online',
    title: 'JSON to Zod Online — Free Zod Schema Generator',
    metaDesc: 'Convert JSON to a Zod schema online. Infers z.string(), z.number(), z.array() and nested z.object() calls with optional keys, ready to paste into TypeScript.',
    keywords: 'json to zod, json to zod online, online json to zod converter, free json to zod converter, zod schema generator, zod schema generator online, zod schema from json, convert json to zod, zod type inference, typescript runtime validation',
    desc: 'Generate Zod runtime validation schemas from JSON',
    category: 'generators',
    icon: TOOL_ICONS['json-to-zod'],
    href: '/tools/json-to-zod',
    related: ['json-to-ts', 'schema', 'json-to-prisma', 'json-mock-generator'],
    answer: 'To convert JSON to Zod, paste a payload into the left pane. Each value is mapped to its Zod validator — strings to z.string(), numbers to z.number(), nested objects to z.object() — and the right pane returns a schema whose inferred type you can reuse with z.infer.',
    inputLabel: 'JSON Input',
    outputLabel: 'Zod Schema',
    dateModified: '2026-09-03',
    guides: ['json-to-zod-schema'],
    ctrKeywords: ['json to zod online free', 'free json to zod converter', 'zod schema generator online', 'zod schema generator from json', 'convert api response to zod', 'json to zod object', 'zod validation from json', 'typescript runtime validation from json'],
    faqs: [
      {
        q: 'Why use Zod with JSON data?',
        a: 'Zod provides full TypeScript static type inference alongside runtime schema validation, guaranteeing incoming API request payloads adhere strictly to expected shapes.'
      },
      {
        q: 'How do I generate a Zod schema from an API response?',
        a: 'Paste the response and set the root name. Strings become z.string(), numbers z.number(), arrays z.array(...) and nested objects z.object({...}), so the result is a schema you can paste into a route handler and call .parse() on.'
      },
      {
        q: 'Can it export the inferred TypeScript type as well?',
        a: 'Yes. The z.infer toggle appends an exported type derived from the schema, so one paste gives you both the runtime validator and the static type without declaring the shape twice.'
      },
      {
        q: 'What do the strict and nullable options do?',
        a: 'Strict wraps objects with .strict() so unknown keys are rejected instead of stripped. Nullable maps values that were null in your sample to .nullable() rather than guessing a concrete type.'
      },
      {
        q: 'Is this Zod schema generator free, and is my payload uploaded?',
        a: 'It is free with no signup, and nothing is uploaded — generation runs entirely in your browser tab.'
      }
    ]
  },
  {
    id: 'json-to-prisma',
    slug: 'json-to-prisma',
    aliases: ['prisma-schema-generator'],
    name: 'JSON to Prisma',
    h1: 'JSON to Prisma Schema Model Generator',
    title: 'JSON to Prisma Online — Free Prisma Schema Generator',
    metaDesc: 'Convert JSON to Prisma schema models online. Infers Int, String, Boolean and DateTime columns, marks @id primary keys and optional fields. Free, no upload.',
    keywords: 'json to prisma, json to prisma online, online json to prisma converter, free json to prisma converter, prisma schema generator, prisma schema generator online, prisma model generator, convert json to prisma, orm schema from json, schema.prisma generator',
    desc: 'Generate Prisma ORM schema models from JSON',
    category: 'generators',
    icon: TOOL_ICONS['json-to-prisma'],
    href: '/tools/json-to-prisma',
    related: ['json-to-drizzle', 'json-to-sql', 'json-to-ts', 'json-to-zod'],
    answer: 'To turn JSON into a Prisma model, paste a representative record on the left. Each property is mapped to a Prisma scalar type such as Int, String, Boolean or DateTime, an id field becomes @id @default, and the right pane returns a block you can paste into schema.prisma.',
    inputLabel: 'JSON Input',
    outputLabel: 'Prisma Schema',
    dateModified: '2026-09-03',
    guides: ['json-to-prisma-schema'],
    ctrKeywords: ['json to prisma schema online', 'free json to prisma converter', 'prisma schema generator online', 'prisma model generator from json', 'generate schema.prisma from json', 'json to prisma orm', 'prisma schema from api response'],
    faqs: [
      {
        q: 'How does JSON to Prisma conversion work?',
        a: 'The generator inspects your JSON entity properties and produces valid Prisma schema.prisma model declarations.'
      },
      {
        q: 'Which Prisma scalar types are inferred?',
        a: 'Int and Float for numbers, String for text, Boolean for true/false, and DateTime for values that parse as timestamps. Nulls in the sample produce optional fields marked with ?.'
      },
      {
        q: 'Does it add an @id primary key?',
        a: 'Yes, when the add-id option is on: an existing id field is annotated as the @id, and if none exists one is added. Turn it off when the model is a relation table you will key differently.'
      },
      {
        q: 'Can it emit the datasource and generator blocks too?',
        a: 'Yes. Enable the datasource option and the output includes the datasource db and generator client blocks, so the result is a schema.prisma file you can run prisma generate against rather than a bare model.'
      },
      {
        q: 'Is this Prisma schema generator free, and is my JSON uploaded?',
        a: 'It is free with no account, and nothing is uploaded — the model is built in your browser from the JSON you paste.'
      }
    ]
  },
  {
    id: 'json-to-drizzle',
    slug: 'json-to-drizzle',
    aliases: ['drizzle-schema-generator'],
    name: 'JSON to Drizzle',
    h1: 'JSON to Drizzle ORM Schema Generator',
    title: 'JSON to Drizzle Online — Free Drizzle ORM Schema Generator',
    metaDesc: 'Convert JSON to Drizzle ORM tables online. Emits pgTable, mysqlTable or sqliteTable definitions with typed columns and primary keys. Free, no upload.',
    keywords: 'json to drizzle, json to drizzle online, online json to drizzle converter, free json to drizzle converter, drizzle orm schema generator, drizzle schema generator online, drizzle table generator, convert json to drizzle, typescript drizzle schema, pgtable generator',
    desc: 'Generate Drizzle ORM TypeScript table definitions',
    category: 'generators',
    icon: TOOL_ICONS['json-to-drizzle'],
    href: '/tools/json-to-drizzle',
    related: ['json-to-prisma', 'json-to-sql', 'json-to-ts', 'json-to-zod'],
    answer: 'To generate a Drizzle ORM table from JSON, paste a record on the left and choose PostgreSQL, MySQL or SQLite. The right pane returns a pgTable, mysqlTable or sqliteTable definition with each key mapped to a typed column helper such as integer, text, boolean or timestamp.',
    inputLabel: 'JSON Input',
    outputLabel: 'Drizzle Schema',
    dateModified: '2026-09-03',
    guides: ['json-to-drizzle-orm-schema'],
    ctrKeywords: ['json to drizzle orm online', 'free json to drizzle converter', 'drizzle schema generator online', 'drizzle schema generator from json', 'json to pgtable', 'drizzle table from json', 'json to drizzle typescript'],
    faqs: [
      {
        q: 'What is Drizzle ORM schema generator?',
        a: 'Generates TypeScript table definitions for Drizzle ORM targeting PostgreSQL (pgTable), MySQL (mysqlTable), or SQLite (sqliteTable).'
      },
      {
        q: 'Which Drizzle column helpers does it use?',
        a: 'Helpers are chosen per dialect: integer and text everywhere, boolean and timestamp on PostgreSQL and MySQL, and their SQLite equivalents where the driver has no native type. Non-integer numbers map to doublePrecision or real depending on the dialect.'
      },
      {
        q: 'Does it add a primary key and an import statement?',
        a: 'Yes. An existing id column is chained with .primaryKey(), and with the auto-id option on a primary key is added when your sample has none. The output also includes the import from the matching drizzle-orm core package.'
      },
      {
        q: 'How are nested objects handled?',
        a: 'A nested object becomes a text column with a comment suggesting a separate table, since Drizzle tables are flat. Split the shape into two tables and generate each one, or store the branch as serialised JSON deliberately.'
      },
      {
        q: 'Is this Drizzle schema generator free, and is my JSON uploaded?',
        a: 'It is free with no signup, and nothing is uploaded — the table definition is generated in your browser.'
      }
    ]
  },
  {
    id: 'json-to-graphql',
    slug: 'json-to-graphql',
    aliases: ['graphql-type-generator'],
    name: 'JSON to GraphQL',
    h1: 'JSON to GraphQL Schema SDL Generator',
    title: 'JSON to GraphQL Online — Free GraphQL Schema SDL Generator',
    metaDesc: 'Convert JSON to a GraphQL schema online. Maps values to String, Int, Float, Boolean and ID scalars and nests composite types. Free, no upload.',
    keywords: 'json to graphql, json to graphql online, online json to graphql converter, free json to graphql converter, graphql schema generator, graphql schema generator online, graphql type generator, convert json to graphql, json to sdl, graphql sdl from json, graphql type definitions from json',
    desc: 'Generate GraphQL SDL type definitions from JSON',
    category: 'generators',
    icon: TOOL_ICONS['json-to-graphql'],
    href: '/tools/json-to-graphql',
    related: ['json-to-ts', 'json-to-code', 'schema', 'json-to-zod'],
    answer: 'To convert JSON to GraphQL, paste a sample payload on the left. Each value is mapped to a GraphQL scalar — String, Int, Float, Boolean or ID — nested objects become their own types, and the right pane returns SDL type definitions you can drop into a schema file.',
    inputLabel: 'JSON Input',
    outputLabel: 'GraphQL SDL',
    dateModified: '2026-09-03',
    guides: ['json-to-graphql-types'],
    ctrKeywords: ['json to graphql online free', 'free json to graphql converter', 'graphql schema generator online', 'graphql schema generator from json', 'json to sdl converter', 'generate graphql types from json', 'graphql type from api response'],
    faqs: [
      {
        q: 'How does JSON to GraphQL conversion work?',
        a: 'The converter creates type declarations with GraphQL scalar types (String, Int, Float, Boolean, ID) and nested composite types.'
      },
      {
        q: 'How are id fields and arrays typed?',
        a: 'Keys named id or _id are mapped to the ID scalar rather than String. An array of objects becomes [Child!] with its own generated type, and an array of primitives becomes a list of the matching scalar.'
      },
      {
        q: 'Can it generate input types and a Query type?',
        a: 'Yes. Both are toggles. The input option emits matching input types for mutations, and the query option adds a Query type with single-record and list fields plus a Mutation type with create, update and delete.'
      },
      {
        q: 'What does the non-null option do?',
        a: 'With it on, fields whose sample value was present are marked non-null with !, while fields that were null stay nullable. Turn it off to emit every field as nullable, which is the safer default for an evolving API.'
      },
      {
        q: 'Is this GraphQL schema generator free, and is my payload uploaded?',
        a: 'It is free with no account, and nothing is uploaded — SDL is generated in your browser from the JSON you paste.'
      }
    ]
  },

  // ── Query & Inspection ──────────────────
  {
    id: 'jsonpath',
    slug: 'jsonpath',
    aliases: ['jsonpath-evaluator', 'jsonpath-tester'],
    name: 'JSONPath Tester',
    h1: 'JSONPath Evaluator & Query Tester Online',
    title: 'JSONPath Tester Online — Free Evaluator & Cheat Sheet',
    metaDesc: 'Test JSONPath expressions online with live results. Supports $, *, recursive descent, array slices and filters, plus a built-in syntax cheat sheet. Free.',
    keywords: 'jsonpath, jsonpath tester, jsonpath tester online, online jsonpath tester, free jsonpath tester, jsonpath evaluator, jsonpath evaluator online, jsonpath online, jsonpath expression tester, test jsonpath online, query json, json path query, json query tool, jsonpath cheat sheet',
    desc: 'Test & debug JSONPath queries interactively',
    category: 'query-view',
    icon: TOOL_ICONS.jsonpath,
    href: '/tools/jsonpath',
    related: ['viewer', 'formatter', 'validator', 'diff'],
    answer: 'JSONPath is a query language for JSON, the equivalent of XPath for XML. Paste a document and an expression such as $.items[?(@.price < 10)].name into the left pane, and every matching node is listed in the right pane as you type.',
    inputLabel: 'JSON & JSONPath Query',
    outputLabel: 'Match Results',
    dateModified: '2026-09-03',
    guides: ['jsonpath-tester-online'],
    ctrKeywords: ['jsonpath tester online free', 'free jsonpath evaluator', 'online jsonpath tester', 'test jsonpath expression', 'jsonpath cheat sheet', 'query json online', 'json query tool online', 'jsonpath filter examples'],
    faqs: [
      {
        q: 'What is JSONPath?',
        a: 'JSONPath is a query expression language for JSON, analogous to XPath for XML. It allows you to filter, select, and extract nodes from deeply nested structures.'
      },
      {
        q: 'What are common JSONPath syntax operators?',
        a: '$ denotes the root object; @ represents the current node; * matches all elements; .. performs recursive descent; [start:end:step] slices arrays; [?(@.price < 10)] filters items.'
      },
      {
        q: 'How do I test a JSONPath expression online?',
        a: 'Paste your document, type the expression, and matches are evaluated as you type — no run button. Preset buttons fill in common patterns such as $, recursive descent and a filter, which is the fastest way to get the syntax right.'
      },
      {
        q: 'How do I filter an array by a field value?',
        a: 'Use a filter expression: $.items[?(@.price < 10)] returns cheap items, and $.users[?(@.active == true)].email returns the emails of active users. @ refers to the item currently being tested.'
      },
      {
        q: 'Is this JSONPath tester free, and is my document uploaded?',
        a: 'It is free with no account, and nothing is uploaded. Evaluation runs in your browser, so you can safely test expressions against a real production response.'
      }
    ]
  },
  {
    id: 'viewer',
    slug: 'json-tree-viewer',
    aliases: ['viewer', 'json-viewer', 'json-tree'],
    name: 'JSON Tree Viewer',
    h1: 'JSON Viewer: Online JSON File & Tree Viewer',
    title: 'JSON Viewer Online — Free JSON File & Tree Viewer',
    metaDesc: 'Free online JSON viewer for large JSON files. Expand or collapse any node in the tree, search keys and values, and read type badges and child counts.',
    keywords: 'json viewer, json viewer online, online json viewer, free json viewer, json file viewer, json tree viewer, json document viewer, large json viewer, json viewer and formatter, json viewer editor, json visualizer, interactive json tree, collapsible json tree, explore json, inspect json online',
    desc: 'Explore JSON as an interactive collapsible tree',
    category: 'query-view',
    icon: TOOL_ICONS.viewer,
    href: '/tools/json-tree-viewer',
    related: ['jsonpath', 'formatter', 'diff', 'validator'],
    answer: 'A JSON viewer renders a JSON file as an expandable outline instead of raw text, so you can read deeply nested data without scrolling through braces. Paste JSON on the left and the right pane shows a collapsible tree with type badges, child counts and key search.',
    inputLabel: 'JSON Input',
    outputLabel: 'Tree View',
    dateModified: '2026-09-03',
    guides: ['json-tree-viewer-online', 'json-viewer', 'json-file-viewer', 'large-json-viewer'],
    ctrKeywords: ['json viewer online free', 'free json viewer', 'json file viewer online', 'json document viewer', 'large json viewer', 'view large json file online', 'json tree viewer online', 'json viewer and formatter', 'json viewer editor', 'collapsible json viewer', 'json visualizer online', 'json viewer no upload'],
    faqs: [
      {
        q: 'How does the JSON Tree Viewer work?',
        a: 'It renders your JSON document as an interactive DOM tree with expandable/collapsible nodes, node type badges, node item counts, and live key/value search.'
      },
      {
        q: 'How do I open and read a JSON file online?',
        a: 'Open the file in any editor, copy its contents, and paste them into the left pane — the tree renders immediately. Expand only the branch you need; type badges and child counts often answer the question without expanding at all.'
      },
      {
        q: 'Can it handle large JSON files?',
        a: 'Yes. Hit Collapse all to reduce a huge document to its top-level keys, then expand only the branch you need; the header also reports total key count and nesting depth. Size is bounded by your device memory rather than a server quota.'
      },
      {
        q: 'Is this JSON viewer free, and is my file uploaded?',
        a: 'It is free with no account, and nothing is uploaded. Parsing and rendering happen in your browser, which is what makes it usable on production exports and customer data.'
      },
      {
        q: 'How do I search for a key or value in the tree?',
        a: 'Type in the search box and rows that do not match are dimmed, so matching keys and values stay visible in their original position instead of being pulled out of context.'
      }
    ]
  }
];

export function getToolBySlugOrId(identifier: string): ToolItem | undefined {
  const clean = identifier.replace(/\.html$/, '');
  return TOOLS.find(
    t => t.id === clean || t.slug === clean || t.aliases.includes(clean)
  );
}

export function getRelatedTools(tool: ToolItem): ToolItem[] {
  return (tool.related || [])
    .map(relId => TOOLS.find(t => t.id === relId || t.slug === relId))
    .filter((t): t is ToolItem => Boolean(t));
}
