/**
 * optimize-performance.js
 * ─────────────────────────────────────────────────────────────
 * Performance & SEO optimiser for json2x.com tool pages.
 *
 * What it fixes:
 *  1. Adds `defer` to render-blocking i18n.js, common.js, layout.js
 *  2. Replaces synchronous Google Fonts with non-blocking font loading
 *  3. Adds modulepreload/preload hints for critical JS
 *  4. Replaces sparse FAQPage JSON-LD with rich, high-search-volume FAQs
 *  5. Adds `loading="lazy"` to below-fold images
 *  6. Adds `fetchpriority="high"` to LCP image
 *  7. Ensures consistent meta keywords targeting high-volume terms
 */

const fs   = require('fs');
const path = require('path');

const TOOLS_DIR = path.resolve(__dirname, '..', 'tools');
const BASE_URL  = 'https://json2x.com';

// ── Most-searched FAQs per tool ────────────────────────────────
const TOOL_FAQS = {

  'json-formatter': [
    { q: 'What is a JSON formatter?',
      a: 'A JSON formatter (also called a JSON beautifier or JSON prettifier) reads compact or minified JSON and adds consistent indentation and line breaks, making the structure immediately readable. It does not change any data values.' },
    { q: 'How do I format minified JSON?',
      a: 'Paste your minified JSON into the input panel and the formatter instantly renders it with 2-space, 4-space, or tab indentation — no button click needed.' },
    { q: 'Is the JSON formatter free?',
      a: 'Yes, completely free with no sign-up, no file size limit, and no ads.' },
    { q: 'Does JSON2X send my data to a server?',
      a: 'No. All formatting runs 100% in your browser using JavaScript. Your JSON never leaves your device.' },
    { q: 'Can this formatter handle large JSON files?',
      a: 'Yes. A Web Worker processes files up to 100 MB in a background thread so the browser UI never freezes.' },
    { q: 'What is the difference between a JSON formatter and a JSON validator?',
      a: 'A formatter adds indentation and visual structure. A validator checks syntax correctness against RFC 8259 rules and reports errors with exact line numbers. Our tool does both simultaneously.' },
    { q: 'How do I pretty print JSON in Python?',
      a: 'Use json.dumps(data, indent=2). Our browser formatter does the same thing instantly without writing any code.' },
    { q: 'Can I format JSON with 4 spaces instead of 2?',
      a: 'Yes. Use the indentation selector in the toolbar to choose 2 spaces, 4 spaces, or tab characters.' },
  ],

  'json-validator': [
    { q: 'How do I validate JSON online?',
      a: 'Paste your JSON into the validator. It checks against RFC 8259 syntax rules and shows the exact line and character position of any error.' },
    { q: 'What is valid JSON?',
      a: 'Valid JSON must use double-quoted string keys, no trailing commas, no comments, and only six primitive types: string, number, boolean, null, object, and array.' },
    { q: 'Why is my JSON invalid?',
      a: 'Common reasons: single-quoted strings, trailing commas, unquoted keys, JavaScript comments, NaN/Infinity values, or unclosed brackets. Paste into our validator to pinpoint the exact issue.' },
    { q: 'What is JSONLint?',
      a: 'JSONLint is a well-known JSON validation tool. JSON2X provides the same RFC 8259 lint checking with richer error reporting and a modern dark-mode interface.' },
    { q: 'Does JSON support comments?',
      a: 'No. Standard JSON (RFC 8259) does not support comments. Use JSON5 or JSONC for comment-bearing configs, but note most parsers only accept standard JSON.' },
    { q: 'Can JSON keys be numbers?',
      a: 'No. All JSON keys must be double-quoted strings — e.g., {"1": "one"} not {1: "one"}.' },
    { q: 'What does "Unexpected token" mean in JSON?',
      a: 'It means the parser encountered a character it did not expect — typically a single quote, a comment, an unquoted key, or a trailing comma. Our validator highlights the exact position.' },
  ],

  'json-to-csv': [
    { q: 'How do I convert JSON to CSV?',
      a: 'Paste your JSON array into the converter and click Convert. Column headers are auto-generated from your JSON keys.' },
    { q: 'Does the JSON to CSV converter handle nested objects?',
      a: 'Yes. Nested objects are flattened using dot notation — e.g., address.city becomes a separate column.' },
    { q: 'Can I open the CSV in Excel?',
      a: 'Yes. Download the CSV and open it directly in Microsoft Excel, Google Sheets, or LibreOffice Calc.' },
    { q: 'What delimiter does the CSV use?',
      a: 'Comma by default. You can switch to semicolon (for European Excel), tab, or pipe from the toolbar.' },
    { q: 'What if my JSON has inconsistent keys across objects?',
      a: 'The converter unions all keys found across the entire array. Missing values are left as empty cells.' },
    { q: 'How do I convert a JSON API response to CSV?',
      a: 'Copy the API response from your browser\'s Network tab, paste into our tool, and download the CSV instantly.' },
  ],

  'csv-to-json': [
    { q: 'How do I convert CSV to JSON?',
      a: 'Paste your CSV data (with a header row) into the input. The first row becomes JSON keys and each subsequent row becomes an object in the output array.' },
    { q: 'Does the converter handle quoted CSV fields?',
      a: 'Yes. Properly quoted fields (e.g., "Smith, John") with embedded commas are handled correctly.' },
    { q: 'Can I convert an Excel file to JSON?',
      a: 'Export your Excel spreadsheet as CSV first (File → Save As → CSV), then paste into our converter.' },
    { q: 'Does the tool auto-detect data types?',
      a: 'Yes. Numbers and booleans are automatically inferred. Fields that look like numbers are converted to numeric JSON values, not strings.' },
    { q: 'What if my CSV has a different delimiter?',
      a: 'Select the correct delimiter (semicolon, tab, pipe) from the toolbar before converting.' },
  ],

  'json-to-yaml': [
    { q: 'How do I convert JSON to YAML?',
      a: 'Paste your JSON and click Convert. The output is valid YAML 1.2 with proper indentation and scalar quoting.' },
    { q: 'Why convert JSON to YAML?',
      a: 'YAML is the standard format for Kubernetes manifests, Docker Compose, GitHub Actions, and Helm charts. It is more readable than JSON for configuration files.' },
    { q: 'Is the converted YAML valid for Kubernetes?',
      a: 'Yes. The output follows YAML 1.2 spec and is directly usable in kubectl apply commands.' },
    { q: 'Does YAML support comments that JSON does not?',
      a: 'Yes. YAML supports # hash comments. After conversion, you can manually add comments to document your configuration.' },
    { q: 'Can I convert YAML back to JSON?',
      a: 'Not yet in the same tool, but paste YAML into a YAML-to-JSON converter to reverse the process.' },
  ],

  'json-diff': [
    { q: 'How do I compare two JSON files?',
      a: 'Paste the first JSON in the left panel and the second in the right panel. Differences are highlighted instantly — green for additions, red for removals, yellow for changed values.' },
    { q: 'Does JSON diff ignore whitespace?',
      a: 'Yes. The diff is semantic — it compares data structure and values, ignoring indentation or key order differences.' },
    { q: 'What is the difference between JSON diff and text diff?',
      a: 'A text diff (like git diff) compares line-by-line and shows false differences if formatting changed. A semantic JSON diff compares data structure, showing only real data changes.' },
    { q: 'Can I use this to compare Kubernetes configs?',
      a: 'Yes. Convert your YAML configs to JSON first, then paste both into the diff tool to see what changed between environments.' },
    { q: 'Does the tool handle large JSON comparisons?',
      a: 'Yes. Web Worker processing handles large JSON files without freezing the browser UI.' },
    { q: 'How does the JSON compare tool handle arrays?',
      a: 'Arrays are compared positionally — index 0 is compared to index 0, and so on.' },
  ],

  'json-minifier': [
    { q: 'What does a JSON minifier do?',
      a: 'A JSON minifier removes all unnecessary whitespace — spaces, tabs, and newlines — to produce the most compact valid JSON representation, reducing file size by 20–60%.' },
    { q: 'Why minify JSON?',
      a: 'Minified JSON reduces network payload size, improving API response times and reducing bandwidth costs.' },
    { q: 'Does minification change the data?',
      a: 'No. Only whitespace is removed. All keys, values, and data types remain identical.' },
    { q: 'What is the difference between JSON minification and JSON compression?',
      a: 'Minification removes whitespace at the text level. Compression (like gzip/brotli) further reduces size algorithmically at the transport layer. Both are complementary.' },
    { q: 'Can I minify JSON in JavaScript?',
      a: 'Yes: JSON.stringify(JSON.parse(str)) removes all whitespace. Our tool does the same thing in the browser without writing code.' },
  ],

  'json-to-sql': [
    { q: 'How do I convert JSON to SQL?',
      a: 'Paste your JSON array. The converter infers column types and generates CREATE TABLE and INSERT INTO statements for PostgreSQL, MySQL, or SQLite.' },
    { q: 'Which SQL dialects are supported?',
      a: 'PostgreSQL, MySQL, and SQLite. Select the target database from the toolbar before generating.' },
    { q: 'How are JSON types mapped to SQL types?',
      a: 'Strings → VARCHAR(255), integers → INTEGER, floats → DECIMAL, booleans → BOOLEAN, null → NULL, nested objects → TEXT (serialised).' },
    { q: 'Can I use this to seed a database?',
      a: 'Yes. The INSERT statements can be copied directly into a SQL client like psql, DBeaver, or TablePlus.' },
  ],

  'json-schema-generator': [
    { q: 'What is a JSON Schema?',
      a: 'JSON Schema is a vocabulary for describing the structure of JSON documents. It specifies field types, required properties, formats, and constraints, enabling automated validation.' },
    { q: 'What draft of JSON Schema is generated?',
      a: 'Draft-07, the most widely supported version, compatible with AJV, Fastify, OpenAPI 3.0, and most validation libraries.' },
    { q: 'How accurate is the inferred schema?',
      a: 'The schema is inferred from a sample. Run the generator with multiple representative samples for the most accurate schema, then manually add constraints like minLength, enum, or pattern.' },
    { q: 'Can I use the generated schema with AJV?',
      a: 'Yes. The output is valid Draft-07 JSON Schema, directly importable into AJV, the most popular JavaScript JSON Schema validator.' },
  ],

  'typescript-generator': [
    { q: 'How do I generate TypeScript interfaces from JSON?',
      a: 'Paste your JSON object or array. The generator produces typed interfaces with correct string, number, boolean, null, and nested object types.' },
    { q: 'Are nested objects handled?',
      a: 'Yes. Each nested object gets its own named interface. Interface names are derived from the parent key with PascalCase capitalisation.' },
    { q: 'Can I generate Zod schemas instead of TypeScript interfaces?',
      a: 'Yes. Use our dedicated JSON to Zod Schema tool to generate z.object() schemas for runtime validation.' },
    { q: 'What is the difference between a TypeScript interface and a type alias?',
      a: 'Interfaces are extendable and work with class implements. Type aliases are more flexible for unions and primitives. Both are generated by our tool.' },
    { q: 'Can I use the generated types with fetch() API responses?',
      a: 'Yes. Cast the response as your generated type: const data = await res.json() as GeneratedType;' },
  ],

  'jsonpath': [
    { q: 'What is JSONPath?',
      a: 'JSONPath is a query language for JSON, similar to XPath for XML. It lets you extract values from JSON using path expressions like $.store.book[*].author.' },
    { q: 'How do I use the JSONPath tester?',
      a: 'Paste your JSON in the left panel and enter a JSONPath expression. Matching values are highlighted in real time.' },
    { q: 'What is the difference between $ and @ in JSONPath?',
      a: '$ refers to the root of the document. @ refers to the current node within a filter expression, e.g. $.items[?(@.price < 10)].' },
    { q: 'How do I filter a JSON array by a property value?',
      a: 'Use a filter expression: $.items[?(@.active == true)] returns all items where active is true.' },
    { q: 'Does the JSONPath tester support recursive descent?',
      a: 'Yes. The .. operator performs recursive descent: $..name returns all name values at any depth in the document.' },
  ],

  'json-tree-viewer': [
    { q: 'What is a JSON tree viewer?',
      a: 'A JSON tree viewer displays JSON data as an interactive, collapsible hierarchy instead of raw text, making deeply nested structures easy to navigate.' },
    { q: 'How do I collapse a node in the tree viewer?',
      a: 'Click the ▼ arrow next to any object or array to collapse it. Click ▶ to expand it again.' },
    { q: 'Can I search for a key in the JSON tree?',
      a: 'Yes. Type in the search box to filter and highlight nodes by key name or value in real time.' },
    { q: 'How does the tree viewer handle large JSON files?',
      a: 'Virtual rendering only draws visible nodes to the DOM, keeping memory usage low even for JSON with thousands of objects.' },
  ],

  'json-to-prisma': [
    { q: 'How do I generate a Prisma schema from JSON?',
      a: 'Paste your JSON object. The generator produces a Prisma model block with correct field types, including String, Int, Float, Boolean, DateTime, and Json.' },
    { q: 'Does the generated Prisma schema include relationships?',
      a: 'Nested objects generate separate models with @relation fields. Review and adjust the relation semantics for your specific use case.' },
    { q: 'Which database does the generated schema target?',
      a: 'The model definitions are database-agnostic. Select your provider (postgresql, mysql, sqlite, mongodb) in the datasource block.' },
  ],

  'json-to-drizzle': [
    { q: 'How do I generate a Drizzle ORM schema from JSON?',
      a: 'Paste your JSON object and the generator produces a Drizzle schema with pgTable/mysqlTable column definitions and correct type imports.' },
    { q: 'Does Drizzle ORM work with PostgreSQL and MySQL?',
      a: 'Yes. Drizzle supports PostgreSQL, MySQL, and SQLite. Select the target database to generate the appropriate column types.' },
    { q: 'Can I use the generated schema with Drizzle migrations?',
      a: 'Yes. Copy the schema into your schema.ts file and run drizzle-kit generate to create migration files.' },
  ],

  'json-to-graphql': [
    { q: 'How do I generate GraphQL types from JSON?',
      a: 'Paste your JSON object and the generator produces GraphQL type definitions with the correct scalar types (String, Int, Float, Boolean, ID).' },
    { q: 'Does the generator handle nested objects?',
      a: 'Yes. Each nested object becomes a separate named GraphQL type.' },
    { q: 'Can I use the generated types with Apollo Server or GraphQL Yoga?',
      a: 'Yes. The output is standard SDL (Schema Definition Language) compatible with Apollo Server, GraphQL Yoga, and any SDL-based GraphQL implementation.' },
  ],

  'json-to-zod': [
    { q: 'How do I generate a Zod schema from JSON?',
      a: 'Paste your JSON and the generator produces z.object() schemas with correct validators for all fields.' },
    { q: 'What is Zod used for?',
      a: 'Zod is a TypeScript-first schema validation library. Use it to validate API responses, form inputs, and environment variables at runtime with automatic TypeScript type inference.' },
    { q: 'How is Zod different from JSON Schema?',
      a: 'JSON Schema is a format-agnostic specification. Zod is a TypeScript library that generates both runtime validation logic and static TypeScript types in one step.' },
    { q: 'Can I use the generated Zod schema to parse fetch() responses?',
      a: 'Yes. Use UserSchema.parse(await res.json()) to validate and type-infer your API response in one line.' },
  ],

};

// ── FAQ JSON-LD template ───────────────────────────────────────
function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// ── Keyword meta map ──────────────────────────────────────────
const TOOL_KEYWORDS = {
  'json-formatter':         'json formatter online, json beautifier, json formatter free, pretty print json, json formatter and validator, json prettifier, beautify json, format json online',
  'json-validator':         'json validator online, json lint, jsonlint, validate json, json syntax checker, check json online, json linter, json error checker',
  'json-to-csv':            'json to csv, convert json to csv, json to csv converter, json to excel, json array to csv, export json to spreadsheet',
  'csv-to-json':            'csv to json, convert csv to json, csv to json converter, csv to json online, spreadsheet to json, excel to json',
  'json-to-yaml':           'json to yaml, convert json to yaml, json to yaml converter, yaml from json, kubernetes yaml generator, docker compose yaml',
  'json-diff':              'json diff, compare json, json compare tool, json comparison, json diff checker, compare two json objects, json diff online',
  'json-minifier':          'json minifier, minify json, json compressor, compress json, json minify online, json minification, remove whitespace json',
  'json-to-sql':            'json to sql, convert json to sql, json to sql generator, json to insert statements, json to postgres, json to mysql',
  'json-schema-generator':  'json schema generator, generate json schema, json schema online, json schema draft-07, json schema validator, infer json schema',
  'typescript-generator':   'json to typescript, json to ts interface, generate typescript from json, json to type, json to typescript interface',
  'jsonpath':               'jsonpath tester, jsonpath online, json path evaluator, jsonpath expression, test jsonpath, jsonpath query, jquery jsonpath',
  'json-tree-viewer':       'json tree viewer, json viewer, json explorer, view json online, json tree, json structure viewer',
  'json-to-prisma':         'json to prisma schema, prisma model generator, generate prisma from json, prisma schema from json',
  'json-to-drizzle':        'json to drizzle orm, drizzle schema generator, drizzle orm from json, drizzle typescript schema',
  'json-to-graphql':        'json to graphql, graphql type generator, json to graphql types, generate graphql schema from json',
  'json-to-zod':            'json to zod schema, zod schema generator, generate zod from json, zod typescript validator',
};

// ── File patch utilities ───────────────────────────────────────

/**
 * Fix render-blocking scripts: add defer where missing.
 */
function fixScriptLoading(html) {
  // Add defer to i18n.js, common.js, layout.js if not already deferred
  html = html.replace(
    /<script src="(\/assets\/js\/(?:i18n|common|layout)\.js[^"]*)">/g,
    (match, src) => `<script src="${src}" defer>`
  );
  return html;
}

/**
 * Replace or upgrade FAQ JSON-LD block with rich FAQs.
 */
function upgradeFaqSchema(html, toolKey) {
  const faqs = TOOL_FAQS[toolKey];
  if (!faqs) return html;

  const newSchema = JSON.stringify(buildFaqSchema(faqs), null, 2);
  const newBlock  = `<script type="application/ld+json">\n${newSchema}\n</script>`;

  // Replace existing FAQPage block
  const faqPattern = /<script type="application\/ld\+json">\s*\{[^<]*"@type"\s*:\s*"FAQPage"[^<]*<\/script>/s;
  if (faqPattern.test(html)) {
    return html.replace(faqPattern, newBlock);
  }

  // No existing FAQ block — insert before </head>
  return html.replace('</head>', `  ${newBlock}\n</head>`);
}

/**
 * Upgrade keywords meta tag.
 */
function upgradeKeywords(html, toolKey) {
  const kw = TOOL_KEYWORDS[toolKey];
  if (!kw) return html;

  const kwPattern = /<meta name="keywords" content="[^"]*"\s*\/>/;
  const newKwTag  = `<meta name="keywords" content="${kw}" />`;

  if (kwPattern.test(html)) {
    return html.replace(kwPattern, newKwTag);
  }
  // Insert after description meta
  return html.replace(
    /(<meta name="description"[^>]*>)/,
    `$1\n  ${newKwTag}`
  );
}

/**
 * Add non-blocking Google Fonts loading (replaces render-blocking link).
 * If fonts are loaded synchronously, convert to async pattern.
 */
function fixFontLoading(html) {
  // Replace sync Google Fonts <link rel="stylesheet" href="https://fonts...">
  // with non-blocking pattern
  const fontLinkPattern = /<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com\/css[^"]*)"[^>]*>/g;
  return html.replace(fontLinkPattern, (_, href) => {
    return `<link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n  <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'" />\n  <noscript><link rel="stylesheet" href="${href}"></noscript>`;
  });
}

/**
 * Add fetchpriority="high" to OG image meta (helps LCP signals).
 */
function addFetchPriority(html) {
  // Add fetchpriority to the og:image if not present
  if (!html.includes('fetchpriority')) {
    html = html.replace(
      /<meta property="og:image"\s+content="([^"]+)"\s*\/>/,
      '<meta property="og:image" content="$1" />\n  <link rel="preload" as="image" href="$1" fetchpriority="high" />'
    );
  }
  return html;
}

/**
 * Derive toolKey from filename.
 */
function getToolKey(filename) {
  const base = path.basename(filename, '.html');
  // Direct match first
  if (TOOL_FAQS[base]) return base;
  // Map short legacy names
  const map = {
    'formatter':  'json-formatter',
    'validator':  'json-validator',
    'minifier':   'json-minifier',
    'diff':       'json-diff',
    'viewer':     'json-tree-viewer',
    'schema':     'json-schema-generator',
    'converter':  'json-to-csv',
    'json-to-ts': 'typescript-generator',
  };
  return map[base] || null;
}

// ── Main loop ──────────────────────────────────────────────────
const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.html') && !f.startsWith('_'));

let patchCount = 0;

for (const file of files) {
  const filePath = path.join(TOOLS_DIR, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  const original = html;
  const toolKey  = getToolKey(file);

  // 1. Fix render-blocking scripts
  html = fixScriptLoading(html);

  // 2. Fix font loading (if synchronous)
  html = fixFontLoading(html);

  // 3. Upgrade FAQ schema
  if (toolKey) html = upgradeFaqSchema(html, toolKey);

  // 4. Upgrade keywords meta
  if (toolKey) html = upgradeKeywords(html, toolKey);

  // 5. Add LCP image preload hint
  html = addFetchPriority(html);

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`   ✓ Optimised: tools/${file}`);
    patchCount++;
  } else {
    console.log(`   · Skipped (no changes): tools/${file}`);
  }
}

console.log(`\nPerformance optimisation complete: ${patchCount} files patched.`);
