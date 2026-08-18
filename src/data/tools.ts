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
    h1: 'JSON Formatter & Beautifier Online',
    title: 'JSON Formatter & Beautifier Online — Pretty Print JSON Free | JSON2X',
    metaDesc: 'Free online JSON formatter, beautifier & validator. Pretty print minified JSON with custom indentation, dark mode, syntax highlighting, and 100% client-side privacy.',
    keywords: 'json formatter online, json beautifier, pretty print json, json prettifier, beautify json, json formatter and validator, format json online free, online json beautifier, json pretty printer, format json',
    desc: 'Prettify, validate & syntax-highlight JSON',
    category: 'format-validate',
    badge: 'Popular',
    icon: TOOL_ICONS.formatter,
    href: '/tools/json-formatter',
    related: ['validator', 'minifier', 'diff', 'viewer'],
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
        q: 'Can this tool format and validate large JSON files (up to 100 MB)?',
        a: 'Yes. Our engine offloads heavy JSON processing to asynchronous background Web Workers. This ensures your browser tab remains completely responsive without freezing or crashing, even when inspecting multi-megabyte API dumps.'
      },
      {
        q: 'How do I pretty print JSON in Python, JavaScript, and Bash?',
        a: 'In Python: json.dumps(data, indent=2). In JavaScript: JSON.stringify(obj, null, 2). In Bash terminal: echo \'{"a":1}\' | jq . or echo \'{"a":1}\' | python3 -m json.tool.'
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
    h1: 'JSON Validator & Syntax Linter',
    title: 'JSON Validator & Linter Online — Check JSON Syntax (RFC 8259) | JSON2X',
    metaDesc: 'Validate JSON online with strict RFC 8259 syntax checking. Catches trailing commas, single quotes, unquoted keys, and syntax errors with exact line numbers.',
    keywords: 'json validator online, json lint, jsonlint, validate json, json syntax checker, check json online, json linter, json error checker, rfc 8259 validator, json checker online',
    desc: 'RFC 8259 validation with exact line errors',
    category: 'format-validate',
    icon: TOOL_ICONS.validator,
    href: '/tools/json-validator',
    related: ['formatter', 'schema', 'json-to-zod', 'diff'],
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
    title: 'JSON Minifier & Compressor Online — Compress JSON Free | JSON2X',
    metaDesc: 'Compress and minify JSON online. Strip unnecessary whitespace, tabs, and newlines to reduce payload size by up to 60%. Free, client-side, instant.',
    keywords: 'json minifier online, minify json, compress json, json compressor, reduce json size, json minify online, online json minifier, strip json whitespace',
    desc: 'Strip whitespace & compress payload size',
    category: 'format-validate',
    icon: TOOL_ICONS.minifier,
    href: '/tools/json-minifier',
    related: ['formatter', 'validator', 'json-to-csv', 'json-converter'],
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
        q: 'How do I minify JSON files up to 50MB?',
        a: 'Our browser minifier processes data asynchronously via Web Workers, ensuring fast compression for multi-megabyte payloads without hanging your browser tab.'
      }
    ]
  },
  {
    id: 'diff',
    slug: 'json-diff',
    aliases: ['diff', 'json-compare', 'json-diff-checker', 'compare-json'],
    name: 'JSON Diff',
    h1: 'JSON Diff & Comparison Online',
    title: 'JSON Diff & Compare Online — Semantic Diff Checker | JSON2X',
    metaDesc: 'Compare two JSON objects or files online. Semantic, structural JSON diff checker highlights added, removed, and modified keys. 100% client-side privacy.',
    keywords: 'json diff online, compare json, json diff checker, json comparator, diff json online, compare two json files, semantic json diff, json difference',
    desc: 'Compare two JSON objects & highlight diffs',
    category: 'format-validate',
    icon: TOOL_ICONS.diff,
    href: '/tools/json-diff',
    related: ['formatter', 'validator', 'viewer', 'jsonpath'],
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
    title: 'JSON to CSV Converter Online — Convert JSON to Excel Free | JSON2X',
    metaDesc: 'Convert JSON arrays and nested objects to CSV or Excel format online. Flatten nested keys, customize delimiters, export spreadsheets instantly and privately.',
    keywords: 'json to csv, convert json to csv, json2csv, json to excel, json to spreadsheet, export json to csv, json to csv online free, convert json array to csv',
    desc: 'Export JSON arrays to downloadable CSV',
    category: 'converters',
    icon: TOOL_ICONS['json-to-csv'],
    href: '/tools/json-to-csv',
    related: ['csv-to-json', 'json-to-sql', 'json-to-yaml', 'json-converter'],
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
    title: 'CSV to JSON Converter Online — Convert CSV & TSV to JSON | JSON2X',
    metaDesc: 'Convert CSV spreadsheets to structured JSON arrays online. Auto-detect numbers, booleans, and nulls. Custom delimiter support (comma, tab, semicolon).',
    keywords: 'csv to json, convert csv to json, csv2json, csv to json converter, convert spreadsheet to json, tsv to json, parse csv to json online',
    desc: 'Parse CSV into JSON with type auto-detect',
    category: 'converters',
    icon: TOOL_ICONS['csv-to-json'],
    href: '/tools/csv-to-json',
    related: ['json-to-csv', 'formatter', 'json-to-sql', 'json-to-yaml'],
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
      }
    ]
  },
  {
    id: 'json-to-yaml',
    slug: 'json-to-yaml',
    aliases: ['yaml-to-json', 'json2yaml', 'yaml2json'],
    name: 'JSON to YAML',
    h1: 'JSON to YAML & YAML to JSON Converter',
    title: 'JSON to YAML Converter Online — Convert JSON & YAML Free | JSON2X',
    metaDesc: 'Convert JSON to YAML and YAML to JSON online. Clean indentation, support for Kubernetes, Docker Compose, CI/CD pipelines. 100% private.',
    keywords: 'json to yaml, convert json to yaml, json2yaml, yaml to json, yaml2json, json yaml converter online, convert json to k8s yaml',
    desc: 'Convert JSON to clean YAML and vice versa',
    category: 'converters',
    icon: TOOL_ICONS['json-to-yaml'],
    href: '/tools/json-to-yaml',
    related: ['json-to-xml', 'json-to-toml', 'formatter', 'json-converter'],
    faqs: [
      {
        q: 'Why convert JSON to YAML?',
        a: 'YAML offers a human-readable, comment-friendly format ideal for configuration files such as Kubernetes manifests, Docker Compose, GitHub Actions workflows, and Ansible playbooks.'
      },
      {
        q: 'Is bidirectional conversion supported (YAML to JSON)?',
        a: 'Yes. Toggle between JSON → YAML and YAML → JSON with one click.'
      }
    ]
  },
  {
    id: 'json-to-xml',
    slug: 'json-to-xml',
    aliases: ['xml-to-json', 'json2xml', 'xml2json'],
    name: 'JSON to XML',
    h1: 'JSON to XML & XML to JSON Converter',
    title: 'JSON to XML Converter Online — Convert JSON to XML Free | JSON2X',
    metaDesc: 'Convert JSON to XML and XML to JSON online. Customizable root tags, attribute mapping, and clean XML indentation. Free and 100% client-side.',
    keywords: 'json to xml, convert json to xml, json2xml, xml to json, xml2json, json xml converter, soap json converter, xml generator from json',
    desc: 'Convert JSON objects into valid XML trees',
    category: 'converters',
    icon: TOOL_ICONS['json-to-xml'],
    href: '/tools/json-to-xml',
    related: ['json-to-yaml', 'json-to-toml', 'json-to-csv', 'formatter'],
    faqs: [
      {
        q: 'How does JSON to XML mapping work?',
        a: 'Object keys become XML tags, primitives become tag contents, and array items repeat matching enclosing element tags under a configurable root node.'
      },
      {
        q: 'Can I customize the XML root tag name?',
        a: 'Yes. Specify custom root element tags such as <root>, <data>, or <response> in the toolbar.'
      }
    ]
  },
  {
    id: 'json-to-toml',
    slug: 'json-to-toml',
    aliases: ['json2toml'],
    name: 'JSON to TOML',
    h1: 'JSON to TOML Converter Online',
    title: 'JSON to TOML Converter Online — Convert JSON to TOML Free | JSON2X',
    metaDesc: 'Convert JSON configurations to TOML format for Rust Cargo.toml, Python pyproject.toml, and Go config files. Fast, private, browser-based.',
    keywords: 'json to toml, convert json to toml, json2toml, toml converter, pyproject.toml generator, cargo.toml json converter',
    desc: 'Convert JSON into TOML configuration files',
    category: 'converters',
    icon: TOOL_ICONS['json-to-toml'],
    href: '/tools/json-to-toml',
    related: ['json-to-yaml', 'json-to-xml', 'formatter', 'json-to-code'],
    faqs: [
      {
        q: 'What is TOML used for?',
        a: 'TOML (Tom\'s Obvious Minimal Language) is designed for clean, unambiguous configuration files, widely used in Rust (Cargo.toml), Python (pyproject.toml), and Hugo.'
      }
    ]
  },
  {
    id: 'json-to-sql',
    slug: 'json-to-sql',
    aliases: ['json2sql', 'json-sql-converter'],
    name: 'JSON to SQL',
    h1: 'JSON to SQL Table & INSERT Converter',
    title: 'JSON to SQL Converter Online — Generate CREATE TABLE & INSERT | JSON2X',
    metaDesc: 'Convert JSON datasets into SQL CREATE TABLE schema definitions and INSERT statements for PostgreSQL, MySQL, SQLite, and SQL Server.',
    keywords: 'json to sql, convert json to sql, json to sql insert, json to create table, json to postgresql, json to mysql, json sql generator',
    desc: 'Generate CREATE TABLE & INSERT statements',
    category: 'converters',
    icon: TOOL_ICONS['json-to-sql'],
    href: '/tools/json-to-sql',
    related: ['json-to-csv', 'json-to-prisma', 'json-to-drizzle', 'json-converter'],
    faqs: [
      {
        q: 'How does JSON to SQL conversion work?',
        a: 'The engine inspects all objects in your JSON array to infer column data types (VARCHAR, INTEGER, BOOLEAN, TIMESTAMP) and generates both CREATE TABLE DDL and INSERT statements.'
      },
      {
        q: 'Which SQL dialects are supported?',
        a: 'Standard ANSI SQL, PostgreSQL, MySQL/MariaDB, SQLite, and Microsoft SQL Server.'
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
    title: 'JSON Multi-Converter Online — TS, Zod, SQL, Schema & Mock | JSON2X',
    metaDesc: 'All-in-one developer converter. Transform JSON into TypeScript interfaces, Zod schemas, Mongoose models, SQL tables, JSON Schema, OpenAPI, and Mock data.',
    keywords: 'json converter, json multi converter, convert json, json to typescript, json to zod, json to mongoose, json to openapi, json to schema',
    desc: 'TS, Zod, Mongoose, SQL, OpenAPI, Schema & Mock',
    category: 'generators',
    badge: '7-in-1',
    icon: TOOL_ICONS['json-converter'],
    href: '/tools/json-converter',
    related: ['json-to-ts', 'json-to-zod', 'json-to-sql', 'json-to-yaml'],
    faqs: [
      {
        q: 'What is the JSON Multi-Converter?',
        a: 'An all-in-one developer workspace that converts a single JSON payload into 7 different targets simultaneously: TypeScript types, Zod schemas, Mongoose models, SQL DDL, JSON Schema Draft-07, OpenAPI schemas, and synthetic mock fixtures.'
      }
    ]
  },
  {
    id: 'json-to-ts',
    slug: 'typescript-generator',
    aliases: ['json-to-ts', 'json-to-typescript'],
    name: 'JSON to TypeScript',
    h1: 'JSON to TypeScript Interface & Type Generator',
    title: 'JSON to TypeScript Converter Online — Generate TS Interfaces Free | JSON2X',
    metaDesc: 'Generate clean TypeScript interfaces, type aliases, and optional types from JSON objects or API payloads. Free, fast, with deep nesting support.',
    keywords: 'json to typescript, json to ts, convert json to typescript, json to interface, json to ts type, quicktype online, ts interface generator from json',
    desc: 'Generate TS interfaces, types & Zod schemas',
    category: 'generators',
    icon: TOOL_ICONS['json-to-ts'],
    href: '/tools/typescript-generator',
    related: ['json-to-zod', 'json-to-prisma', 'json-to-drizzle', 'json-to-code'],
    faqs: [
      {
        q: 'How does JSON to TypeScript generation work?',
        a: 'The generator recursively traverses nested JSON objects and arrays, creating typed interface declarations with accurate property types (string, number, boolean, array, union, any).'
      },
      {
        q: 'Can I generate type aliases (type T =) instead of interfaces (interface T {})?',
        a: 'Yes. Switch between interface and type alias declaration modes in the options toolbar.'
      }
    ]
  },
  {
    id: 'json-to-code',
    slug: 'json-to-code',
    aliases: ['json-to-go', 'json-to-rust', 'json-to-python'],
    name: 'JSON to Code',
    h1: 'JSON to Go Structs, Rust Serde & Python Models',
    title: 'JSON to Code Generator Online — Go, Rust, Python Pydantic | JSON2X',
    metaDesc: 'Convert JSON payloads into Go structs, Rust Serde structs, and Python Pydantic models with accurate data typing and serialization tags.',
    keywords: 'json to go struct, json to rust struct, json to python pydantic, json to code, convert json to golang, serde struct generator',
    desc: 'Generate Go, Rust Serde & Python Pydantic models',
    category: 'generators',
    icon: TOOL_ICONS['json-to-code'],
    href: '/tools/json-to-code',
    related: ['json-to-ts', 'json-to-prisma', 'json-to-graphql', 'schema'],
    faqs: [
      {
        q: 'Which programming languages are supported in JSON to Code?',
        a: 'Golang (struct with json tags), Rust (struct with serde attributes), and Python (Pydantic BaseModel & dataclasses).'
      }
    ]
  },
  {
    id: 'schema',
    slug: 'json-schema-generator',
    aliases: ['schema', 'json-schema', 'schema-generator'],
    name: 'JSON Schema Generator',
    h1: 'JSON Schema Generator Online (Draft-07 & 2020-12)',
    title: 'JSON Schema Generator Online — Infer JSON Schema from Data | JSON2X',
    metaDesc: 'Generate standard Draft-07 & 2020-12 JSON Schema specifications from sample JSON objects. Auto-detect required fields, formats (email, uri, date-time), and types.',
    keywords: 'json schema generator, json schema online, infer json schema, json to json schema, json schema draft-07, generate schema from json',
    desc: 'Infer Draft-07 JSON Schema specifications',
    category: 'generators',
    icon: TOOL_ICONS.schema,
    href: '/tools/json-schema-generator',
    related: ['json-to-zod', 'json-to-ts', 'json-mock-generator', 'validator'],
    faqs: [
      {
        q: 'What is JSON Schema?',
        a: 'JSON Schema is an IETF standard specification that validates the structure, constraints, and data types of JSON payloads, essential for automated API contract testing.'
      }
    ]
  },
  {
    id: 'json-mock-generator',
    slug: 'json-mock-generator',
    aliases: ['fake-json', 'mock-json'],
    name: 'JSON Mock Generator',
    h1: 'JSON Mock Data Generator Online',
    title: 'JSON Mock Data Generator Online — Generate Fake JSON Datasets | JSON2X',
    metaDesc: 'Generate realistic mock JSON datasets for frontend prototyping and API testing. Generate users, products, transactions, UUIDs, dates, and geographic data.',
    keywords: 'json mock generator, fake json generator, mock data generator, generate mock json, fake api json, random json generator',
    desc: 'Generate realistic synthetic test datasets',
    category: 'generators',
    icon: TOOL_ICONS['json-mock-generator'],
    href: '/tools/json-mock-generator',
    related: ['schema', 'json-to-zod', 'json-to-ts', 'formatter'],
    faqs: [
      {
        q: 'How do I generate mock JSON data for API testing?',
        a: 'Select desired entities (Users, Products, Orders, Invoices), adjust the row count, and generate instant realistic JSON arrays.'
      }
    ]
  },
  {
    id: 'json-to-zod',
    slug: 'json-to-zod',
    aliases: ['zod-schema-generator', 'json-zod'],
    name: 'JSON to Zod',
    h1: 'JSON to Zod Schema Generator Online',
    title: 'JSON to Zod Schema Generator Online — Infer Zod Types from JSON | JSON2X',
    metaDesc: 'Convert JSON objects into TypeScript Zod runtime validation schemas with automatic type inference (z.string(), z.number(), z.array()). Free & instant.',
    keywords: 'json to zod, zod schema generator, convert json to zod, json to zod online, zod type inference, typescript runtime validation',
    desc: 'Generate Zod runtime validation schemas from JSON',
    category: 'generators',
    icon: TOOL_ICONS['json-to-zod'],
    href: '/tools/json-to-zod',
    related: ['json-to-ts', 'schema', 'json-to-prisma', 'json-mock-generator'],
    faqs: [
      {
        q: 'Why use Zod with JSON data?',
        a: 'Zod provides full TypeScript static type inference alongside runtime schema validation, guaranteeing incoming API request payloads adhere strictly to expected shapes.'
      }
    ]
  },
  {
    id: 'json-to-prisma',
    slug: 'json-to-prisma',
    aliases: ['prisma-schema-generator'],
    name: 'JSON to Prisma',
    h1: 'JSON to Prisma Schema Model Generator',
    title: 'JSON to Prisma Schema Generator Online — Generate ORM Models | JSON2X',
    metaDesc: 'Generate Prisma ORM schema models from JSON data. Automatically detects primary keys (@id), relations, data types (Int, String, Boolean, DateTime).',
    keywords: 'json to prisma, prisma schema generator, convert json to prisma, prisma model generator, orm schema from json',
    desc: 'Generate Prisma ORM schema models from JSON',
    category: 'generators',
    icon: TOOL_ICONS['json-to-prisma'],
    href: '/tools/json-to-prisma',
    related: ['json-to-drizzle', 'json-to-sql', 'json-to-ts', 'json-to-zod'],
    faqs: [
      {
        q: 'How does JSON to Prisma conversion work?',
        a: 'The generator inspects your JSON entity properties and produces valid Prisma schema.prisma model declarations.'
      }
    ]
  },
  {
    id: 'json-to-drizzle',
    slug: 'json-to-drizzle',
    aliases: ['drizzle-schema-generator'],
    name: 'JSON to Drizzle',
    h1: 'JSON to Drizzle ORM Schema Generator',
    title: 'JSON to Drizzle ORM Schema Generator Online — Generate Tables | JSON2X',
    metaDesc: 'Convert JSON payloads into Drizzle ORM TypeScript schema tables (pgTable, mysqlTable, sqliteTable) with typed columns and primary keys.',
    keywords: 'json to drizzle, drizzle orm schema generator, convert json to drizzle, drizzle table generator, typescript drizzle schema',
    desc: 'Generate Drizzle ORM TypeScript table definitions',
    category: 'generators',
    icon: TOOL_ICONS['json-to-drizzle'],
    href: '/tools/json-to-drizzle',
    related: ['json-to-prisma', 'json-to-sql', 'json-to-ts', 'json-to-zod'],
    faqs: [
      {
        q: 'What is Drizzle ORM schema generator?',
        a: 'Generates TypeScript table definitions for Drizzle ORM targeting PostgreSQL (pgTable), MySQL (mysqlTable), or SQLite (sqliteTable).'
      }
    ]
  },
  {
    id: 'json-to-graphql',
    slug: 'json-to-graphql',
    aliases: ['graphql-type-generator'],
    name: 'JSON to GraphQL',
    h1: 'JSON to GraphQL Schema SDL Generator',
    title: 'JSON to GraphQL Schema Generator Online — Generate SDL Types | JSON2X',
    metaDesc: 'Generate GraphQL SDL (Schema Definition Language) type definitions and queries from JSON sample data. Free, instant, browser-based.',
    keywords: 'json to graphql, graphql schema generator, convert json to graphql, json to sdl, graphql type definitions from json',
    desc: 'Generate GraphQL SDL type definitions from JSON',
    category: 'generators',
    icon: TOOL_ICONS['json-to-graphql'],
    href: '/tools/json-to-graphql',
    related: ['json-to-ts', 'json-to-code', 'schema', 'json-to-zod'],
    faqs: [
      {
        q: 'How does JSON to GraphQL conversion work?',
        a: 'The converter creates type declarations with GraphQL scalar types (String, Int, Float, Boolean, ID) and nested composite types.'
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
    title: 'JSONPath Evaluator & Tester Online — Query JSON Instantly | JSON2X',
    metaDesc: 'Evaluate and test JSONPath expressions interactively online. Live query results, syntax cheat sheet ($, *, .., filters, slices). 100% private.',
    keywords: 'jsonpath evaluator, jsonpath tester online, query json, jsonpath expression, test jsonpath online, json path query, jsonpath cheat sheet',
    desc: 'Test & debug JSONPath queries interactively',
    category: 'query-view',
    icon: TOOL_ICONS.jsonpath,
    href: '/tools/jsonpath',
    related: ['viewer', 'formatter', 'validator', 'diff'],
    faqs: [
      {
        q: 'What is JSONPath?',
        a: 'JSONPath is a query expression language for JSON, analogous to XPath for XML. It allows you to filter, select, and extract nodes from deeply nested structures.'
      },
      {
        q: 'What are common JSONPath syntax operators?',
        a: '$ denotes the root object; @ represents the current node; * matches all elements; .. performs recursive descent; [start:end:step] slices arrays; [?(@.price < 10)] filters items.'
      }
    ]
  },
  {
    id: 'viewer',
    slug: 'json-tree-viewer',
    aliases: ['viewer', 'json-viewer', 'json-tree'],
    name: 'JSON Tree Viewer',
    h1: 'JSON Tree Viewer & Interactive Visualizer',
    title: 'JSON Tree Viewer Online — Interactive Collapsible JSON Viewer | JSON2X',
    metaDesc: 'Explore and visualize complex JSON documents with an interactive, collapsible tree viewer. Search keys, expand/collapse nodes, inspect types. Free & private.',
    keywords: 'json tree viewer, json visualizer, json viewer online, interactive json tree, explore json, inspect json online, collapsible json tree',
    desc: 'Explore JSON as an interactive collapsible tree',
    category: 'query-view',
    icon: TOOL_ICONS.viewer,
    href: '/tools/json-tree-viewer',
    related: ['jsonpath', 'formatter', 'diff', 'validator'],
    faqs: [
      {
        q: 'How does the JSON Tree Viewer work?',
        a: 'It renders your JSON document as an interactive DOM tree with expandable/collapsible nodes, node type badges, node item counts, and live key/value search.'
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
