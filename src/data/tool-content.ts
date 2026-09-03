/**
 * Long-form, per-tool page content.
 *
 * Kept separate from `tools.ts` (the navigation/metadata registry) so the
 * registry stays cheap to import from nav components, while this module is only
 * pulled in by the tool page layout.
 *
 * Each field maps to a specific search surface:
 *  - `intro`     GEO: a self-contained, citable opening paragraph.
 *  - `howTo`     AEO: rendered as an ordered list *and* as HowTo JSON-LD.
 *  - `useCases`  pSEO: covers "for <audience>" / "for <task>" intent variants.
 *  - `sections`  On-page SEO: question-shaped H2s with substantive prose.
 *  - `entities`  GEO: grounds the page against known entities via `sameAs`.
 */

export interface ToolHowToStep {
  name: string;
  text: string;
}

export interface ToolSection {
  h2: string;
  /** Trusted, hand-authored HTML. Rendered with `set:html`. */
  html: string;
}

export interface ToolEntity {
  name: string;
  sameAs: string;
}

export interface ToolContent {
  intro: string;
  howTo: ToolHowToStep[];
  useCases: string[];
  sections: ToolSection[];
  entities?: ToolEntity[];
}

const E = {
  json: { name: 'JSON', sameAs: 'https://en.wikipedia.org/wiki/JSON' },
  rfc8259: { name: 'RFC 8259', sameAs: 'https://www.rfc-editor.org/rfc/rfc8259' },
  jsonSchema: { name: 'JSON Schema', sameAs: 'https://json-schema.org/' },
  typescript: { name: 'TypeScript', sameAs: 'https://www.typescriptlang.org/' },
  yaml: { name: 'YAML', sameAs: 'https://yaml.org/' },
  xml: { name: 'XML', sameAs: 'https://en.wikipedia.org/wiki/XML' },
  toml: { name: 'TOML', sameAs: 'https://toml.io/' },
  csv: { name: 'Comma-separated values', sameAs: 'https://en.wikipedia.org/wiki/Comma-separated_values' },
  rfc4180: { name: 'RFC 4180', sameAs: 'https://www.rfc-editor.org/rfc/rfc4180' },
  sql: { name: 'SQL', sameAs: 'https://en.wikipedia.org/wiki/SQL' },
  graphql: { name: 'GraphQL', sameAs: 'https://graphql.org/' },
  zod: { name: 'Zod', sameAs: 'https://zod.dev/' },
  prisma: { name: 'Prisma ORM', sameAs: 'https://www.prisma.io/' },
  drizzle: { name: 'Drizzle ORM', sameAs: 'https://orm.drizzle.team/' },
  jsonpath: { name: 'JSONPath', sameAs: 'https://en.wikipedia.org/wiki/JSONPath' },
  go: { name: 'Go', sameAs: 'https://go.dev/' },
  rust: { name: 'Rust', sameAs: 'https://www.rust-lang.org/' },
  pydantic: { name: 'Pydantic', sameAs: 'https://docs.pydantic.dev/' },
  kubernetes: { name: 'Kubernetes', sameAs: 'https://kubernetes.io/' },
  openapi: { name: 'OpenAPI Specification', sameAs: 'https://www.openapis.org/' }
} satisfies Record<string, ToolEntity>;

export const TOOL_CONTENT: Record<string, ToolContent> = {
  formatter: {
    intro:
      'JSON2X formats JSON entirely inside your browser tab. The document you paste is parsed by the browser’s own JSON engine and re-serialised with the indentation you choose, so nothing is uploaded, queued, or logged on a server. That makes it safe to pretty-print payloads that contain access tokens, customer records, or anything else you would not paste into a hosted formatter.',
    howTo: [
      { name: 'Paste your JSON', text: 'Drop a minified or malformed JSON document into the left-hand input pane. Files can also be opened from disk — they are read locally with the File API.' },
      { name: 'Pick an indent style', text: 'Choose 2 spaces, 4 spaces, or tabs. Two spaces is the default because it matches Prettier and most repository style guides.' },
      { name: 'Read the formatted output', text: 'The right-hand pane shows the beautified, syntax-highlighted result. If the input cannot be parsed, the exact line and column of the first syntax error is reported instead.' },
      { name: 'Copy or download', text: 'Copy the result to the clipboard in one click, or download it as a .json file.' }
    ],
    useCases: [
      'Making a single-line API response from curl, Postman, or a browser network tab readable',
      'Cleaning up hand-edited config files before committing them to Git',
      'Finding the unbalanced bracket in a JSON document a linter rejected',
      'Normalising indentation across files so diffs stay small',
      'Inspecting a webhook body that contains credentials you cannot send to a third-party site'
    ],
    sections: [
      {
        h2: 'What does formatting JSON actually change?',
        html: '<p>Only the insignificant whitespace. A JSON formatter parses the document into an in-memory value and serialises it again with newlines and indentation between tokens. Keys, values, ordering, and numeric precision are untouched, so the formatted output is byte-for-byte equivalent to the original as far as any JSON parser is concerned. That is why formatting is always safe to run on production data — it cannot change what the document means.</p>'
      },
      {
        h2: 'Why does a formatter double as a validator?',
        html: '<p>Formatting requires a successful parse. A document that cannot be parsed cannot be re-serialised, so any formatter is implicitly a syntax checker. JSON2X surfaces that: when the parse fails, the error message carries the line and column of the offending token instead of a generic "invalid JSON". The four faults that account for most failures are a trailing comma after the final element, single quotes instead of double quotes, unquoted object keys, and an unescaped newline inside a string.</p>'
      },
      {
        h2: 'How large a file can it handle?',
        html: '<p>Parsing and highlighting run on the main thread for small documents and move to a Web Worker for larger ones, which keeps the tab responsive. In practice, multi-megabyte documents format without freezing the UI. Because everything is local, throughput is bounded by your CPU rather than by an upload, so a 20&nbsp;MB file is often faster here than on a server-side formatter.</p>'
      }
    ],
    entities: [E.json, E.rfc8259]
  },

  validator: {
    intro:
      'JSON2X validates documents against RFC 8259, the specification that defines JSON, and reports the line and column of the first token that violates it. Validation runs in the browser, so a payload containing bearer tokens or personal data never leaves the machine. Structural validation against a JSON Schema is a separate step — this tool answers the narrower question of whether the bytes are legal JSON at all.',
    howTo: [
      { name: 'Paste the document', text: 'Put the suspect JSON into the left-hand input pane. Validation is live: results update as you type, debounced so large documents stay responsive.' },
      { name: 'Read the verdict', text: 'The right-hand report pane shows either a pass, with node and key counts and byte size, or a fail with the exact line, column, and offending token.' },
      { name: 'Fix and re-check', text: 'Correct the reported position and the report updates immediately. Only the first error is reported, because a parser cannot reliably continue past a structural fault.' }
    ],
    useCases: [
      'Confirming a config file is parseable before a deployment reads it',
      'Locating the line a CI job meant when it logged “Unexpected token”',
      'Checking a hand-written fixture before committing it to a test suite',
      'Verifying a third-party webhook body is legal JSON and not, say, JSON5',
      'Teaching the difference between valid JSON and valid JavaScript object literals'
    ],
    sections: [
      {
        h2: 'What makes JSON invalid?',
        html: '<p>RFC 8259 is deliberately small, and almost all real failures come from a handful of habits carried over from JavaScript. Trailing commas after the last array element or object member are illegal. Strings must use double quotes — <code>\'a\'</code> is not a JSON string. Object keys must be quoted, so <code>{name: 1}</code> fails while <code>{"name": 1}</code> passes. Comments do not exist in JSON. <code>NaN</code>, <code>Infinity</code>, and <code>undefined</code> are not JSON values. Literal control characters, including raw newlines and tabs, must be escaped inside strings.</p>'
      },
      {
        h2: 'Is valid JSON the same as correct data?',
        html: '<p>No, and conflating the two causes real outages. Syntax validation proves a parser will accept the bytes. It says nothing about whether <code>email</code> is present, whether <code>age</code> is a number rather than a string, or whether <code>status</code> is one of your allowed values. Those are schema concerns. Validate syntax first to rule out transport and encoding problems, then generate a <a href="/tools/json-schema-generator">JSON Schema</a> or a <a href="/tools/json-to-zod">Zod schema</a> to assert the shape.</p>'
      },
      {
        h2: 'Why does the error position matter more than the message?',
        html: '<p>Parser messages are notoriously vague — “Unexpected token } in JSON at position 4471” tells you nothing on a single-line file. Reporting line and column lets you jump straight to the fault, and because the input pane is the same pane you edit in, the fix and the re-check happen in one place. For deeply nested documents it is often faster to <a href="/tools/json-formatter">format first</a>, so the reported line number corresponds to something you can see.</p>'
      }
    ],
    entities: [E.json, E.rfc8259, E.jsonSchema]
  },

  minifier: {
    intro:
      'Minifying JSON removes every space, tab, and newline that sits between tokens, leaving the shortest byte sequence that still parses to the identical value. On typical formatted API payloads that saves 20–60% of the bytes. JSON2X performs the round trip locally, so you can compress request bodies and build artefacts without sending them anywhere.',
    howTo: [
      { name: 'Paste formatted JSON', text: 'Put the indented document into the left-hand input pane.' },
      { name: 'Read the compressed result', text: 'The right-hand pane shows the single-line output together with the original size, the minified size, and the percentage saved.' },
      { name: 'Copy into your payload', text: 'Copy the minified string, or download it as a .json file to commit as a build artefact.' }
    ],
    useCases: [
      'Shrinking a JSON request body before pasting it into a curl command or a shell script',
      'Reducing the size of a bundled config or i18n file shipped to the browser',
      'Fitting a payload inside a size-limited field such as an environment variable or a queue message',
      'Comparing before/after byte counts when tuning an API response',
      'Producing a canonical single-line form for a checksum or cache key'
    ],
    sections: [
      {
        h2: 'Is minified JSON lossless?',
        html: '<p>Yes. Whitespace outside of string literals carries no meaning in JSON, so removing it cannot change the parsed value. Whitespace <em>inside</em> a string is data and is preserved exactly. Key order is preserved as well. Minifying and then <a href="/tools/json-formatter">re-formatting</a> returns you to a document semantically identical to the one you started with — the only thing you cannot recover is your original indentation choice.</p>'
      },
      {
        h2: 'How much smaller does JSON get?',
        html: '<p>It depends almost entirely on nesting depth, because indentation cost grows with depth. A flat array of short objects might shrink 20%. A deeply nested configuration file formatted with four spaces frequently drops by more than half. Note that minification is a smaller win once gzip or Brotli is in play: compression already handles repeated indentation well, so the marginal saving over the wire is usually a few percent. Minify for payload limits and for storage, not as a substitute for content encoding.</p>'
      },
      {
        h2: 'Should production APIs return minified JSON?',
        html: '<p>For machine-to-machine responses, yes — there is no reader to please, and every byte is paid for on every request. For endpoints humans debug by hand, many teams minify by default and re-format on demand behind a query flag such as <code>?pretty=1</code>. Either way, keep the checked-in source formatted so diffs stay reviewable, and minify as a build step rather than editing minified files directly.</p>'
      }
    ],
    entities: [E.json]
  },

  diff: {
    intro:
      'A JSON diff compares two documents by structure rather than by line, so a reordered key or a change of indentation is not reported as a difference. JSON2X walks both trees in parallel and reports every key path that was added, removed, or changed in value, along with the old and new values. Both documents stay in the browser, which matters when you are comparing production and staging payloads.',
    howTo: [
      { name: 'Paste the original', text: 'Put the baseline document into the JSON A pane on the left — for example last week’s API response.' },
      { name: 'Paste the comparison', text: 'Put the new document into the JSON B pane directly below it.' },
      { name: 'Read the diff', text: 'The right-hand pane lists every difference grouped as added, removed, and modified, each with its full dot/bracket key path so you can find it in the source.' },
      { name: 'Act on the changes', text: 'Copy the report into a pull request comment or an incident note, or fix the drift and re-run the comparison.' }
    ],
    useCases: [
      'Spotting a breaking change between two versions of an API response',
      'Finding which key differs between a working and a failing configuration',
      'Reviewing what a migration script actually changed in an exported record',
      'Comparing a snapshot test fixture against live output',
      'Auditing environment config drift between staging and production'
    ],
    sections: [
      {
        h2: 'How is a JSON diff different from a text diff?',
        html: '<p>A text diff such as <code>git diff</code> works on lines. Re-indent a file, sort its keys, or move an object to a different position and every affected line is reported as changed, even though the data is identical. A structural diff parses both sides first and compares values at matching key paths, so formatting and object key order are ignored entirely. What you get back is a list of semantic changes: <code>user.address.city</code> changed from <code>"Berlin"</code> to <code>"Munich"</code>, rather than two changed lines.</p>'
      },
      {
        h2: 'How are arrays compared?',
        html: '<p>Arrays are ordered in JSON, so they are compared by index: <code>items[2].price</code> is matched against <code>items[2].price</code>. That is the correct reading of the specification, but it means inserting one element at the front of a long array reports every subsequent index as modified. When your arrays are really unordered sets of records, compare them by sorting on a stable key first, or diff the individual records that matter.</p>'
      },
      {
        h2: 'What counts as a change?',
        html: '<p>Three things. A key present in B but not A is an addition. A key present in A but not B is a removal. A key in both whose value differs — including a change of type, such as <code>"42"</code> becoming <code>42</code> — is a modification. Type changes are worth watching closely, because they are the category most likely to break a strongly typed client even when the value looks the same. If you need to enforce the shape rather than just observe it, generate a <a href="/tools/json-schema-generator">JSON Schema</a> from the version you consider correct.</p>'
      }
    ],
    entities: [E.json]
  },

  'json-to-csv': {
    intro:
      'Converting JSON to CSV means flattening a tree into a grid. JSON2X scans every object in your array to build the full column set, flattens nested objects into dot-notation headers such as <code>address.city</code>, and quotes and escapes fields according to RFC 4180 so the result opens cleanly in Excel, Numbers, and Google Sheets. The file is generated in the browser and downloaded directly from it.',
    howTo: [
      { name: 'Paste a JSON array', text: 'Put an array of objects into the left-hand input pane. A single object is treated as a one-row table.' },
      { name: 'Check the detected columns', text: 'The header row is the union of every key seen across all objects, so records with missing keys still line up. Nested objects are flattened to dot notation.' },
      { name: 'Review the CSV', text: 'The right-hand pane shows the delimited result, with fields containing commas, quotes, or newlines quoted and escaped.' },
      { name: 'Download for Excel', text: 'Download the .csv file and open it in a spreadsheet, or copy the text straight into an existing sheet.' }
    ],
    useCases: [
      'Handing an API export to a colleague who works in Excel or Google Sheets',
      'Loading JSON records into a BI tool or a database importer that only accepts CSV',
      'Building a pivot table over data that arrived as an API response',
      'Producing an attachment for a finance or ops report from a JSON extract',
      'Turning a JSON log export into something you can filter and sort by hand'
    ],
    sections: [
      {
        h2: 'How are nested objects handled?',
        html: '<p>By flattening. CSV has exactly two dimensions, so a nested object has to become additional columns: <code>{"user":{"name":"Ada"}}</code> becomes a column named <code>user.name</code>. Dot notation keeps the original path recoverable, which means the conversion is reversible — feed the CSV back through <a href="/tools/csv-to-json">CSV to JSON</a> and the nesting can be rebuilt. Arrays nested inside a row have no natural column representation and are serialised as a JSON string in a single cell.</p>'
      },
      {
        h2: 'What happens when objects have different keys?',
        html: '<p>The header row is the union of all keys, not the keys of the first object. A record that lacks a column simply gets an empty field there. This matters for real API data, where optional fields are common — a converter that samples only the first row silently drops columns. If you want to know which records are missing which fields before you convert, open the document in the <a href="/tools/json-tree-viewer">tree viewer</a> first.</p>'
      },
      {
        h2: 'Will the CSV open correctly in Excel?',
        html: '<p>The output follows RFC 4180: fields containing a comma, a double quote, or a line break are wrapped in double quotes, and embedded quotes are doubled. Output is UTF-8. Two Excel-specific caveats are worth knowing. Some Excel builds need a byte-order mark to detect UTF-8, so non-ASCII text can appear mangled on double-click — importing via Data → From Text/CSV and choosing UTF-8 avoids it. And Excel eagerly reformats values that look like dates or long numbers, which is why identifiers such as <code>00123</code> are best imported as text.</p>'
      }
    ],
    entities: [E.json, E.csv, E.rfc4180]
  },

  'csv-to-json': {
    intro:
      'CSV to JSON conversion reads the first row as property names and turns every following row into an object, producing an array you can feed to an API or a test fixture. JSON2X also infers types, so <code>42</code> becomes a number and <code>true</code> becomes a boolean rather than staying a quoted string. Parsing happens in the browser, so spreadsheets containing customer data never get uploaded.',
    howTo: [
      { name: 'Paste CSV or open a file', text: 'Put your delimited text into the left-hand input pane, including the header row. Tab- and semicolon-separated files work too.' },
      { name: 'Pick the delimiter', text: 'Choose comma, tab, semicolon, or pipe. Quoted fields containing the delimiter are handled correctly.' },
      { name: 'Read the JSON array', text: 'The right-hand pane shows one object per data row, with numeric, boolean, and empty values typed automatically.' },
      { name: 'Copy or download', text: 'Copy the array into your code, or download it as a .json file.' }
    ],
    useCases: [
      'Turning a spreadsheet a stakeholder sent you into a seed file or test fixture',
      'Preparing bulk data for an API that accepts a JSON array',
      'Loading exported analytics or CRM data into a JavaScript application',
      'Converting a CSV database export into documents for a NoSQL store',
      'Getting a quick, readable view of a wide CSV by inspecting one record as JSON'
    ],
    sections: [
      {
        h2: 'How does type detection work?',
        html: '<p>CSV has no type system — every field is text. The parser therefore inspects each value: a field that parses cleanly as a number becomes a JSON number, <code>true</code> and <code>false</code> become booleans, and an empty field becomes <code>null</code> or an empty string depending on your setting. Everything else stays a string. The one case to watch is identifiers made of digits, such as zip codes or order numbers with leading zeros: as numbers they lose the leading zeros, so keep those columns as text if the zeros are significant.</p>'
      },
      {
        h2: 'Are quoted fields and embedded commas handled?',
        html: '<p>Yes. The parser implements RFC 4180 quoting rather than splitting naively on the delimiter, so <code>"Smith, Ada"</code> stays a single value, a doubled quote inside a quoted field (<code>""</code>) decodes to one quote character, and a line break inside quotes does not end the row. Files exported from Excel and Google Sheets follow these rules, which is why a naive split so often produces silently misaligned columns.</p>'
      },
      {
        h2: 'Can I rebuild nested objects from CSV?',
        html: '<p>If your headers use dot notation — <code>user.name</code>, <code>user.email</code> — the path structure is recoverable, which makes a round trip through <a href="/tools/json-to-csv">JSON to CSV</a> and back lossless for nested objects. A flat header set produces flat objects, which is usually what you want for a seed file. Once you have the JSON, generating a <a href="/tools/typescript-generator">TypeScript interface</a> from it gives you compile-time checking over data that started life in a spreadsheet.</p>'
      }
    ],
    entities: [E.csv, E.rfc4180, E.json]
  },

  'json-to-yaml': {
    intro:
      'YAML is a superset of JSON, so every JSON document has a direct YAML equivalent. Converting replaces braces and brackets with indentation, drops the quotes from keys and from strings that are unambiguous, and removes the commas. JSON2X converts in both directions locally, which is the reason it is safe to paste a Kubernetes secret manifest or a CI configuration into it.',
    howTo: [
      { name: 'Paste JSON', text: 'Put your document into the left-hand input pane. To go the other way, switch the direction toggle to YAML → JSON.' },
      { name: 'Read the YAML', text: 'The right-hand pane shows 2-space-indented YAML, with list items as dashes and nested maps as further indentation.' },
      { name: 'Copy into your manifest', text: 'Copy the block into a Kubernetes manifest, a docker-compose.yml, a GitHub Actions workflow, or an Ansible playbook.' }
    ],
    useCases: [
      'Turning a JSON config into a Kubernetes manifest or Helm values file',
      'Porting a docker-compose or CI configuration between formats',
      'Making a long JSON config reviewable by adding comments — which YAML allows and JSON does not',
      'Reading an OpenAPI document that a tool emitted as JSON',
      'Converting a YAML config back to JSON so a program that only speaks JSON can consume it'
    ],
    sections: [
      {
        h2: 'Why prefer YAML for configuration?',
        html: '<p>Three reasons, all about humans rather than machines. YAML supports comments, so you can explain why a value is what it is — the single most requested JSON feature that will never exist. Indentation instead of punctuation means fewer bracket-matching errors in long files and cleaner Git diffs, because adding a key touches one line rather than also editing the previous line’s comma. And multi-line strings can be written literally with <code>|</code>, which matters for embedded scripts and certificates.</p>'
      },
      {
        h2: 'What can go wrong in the conversion?',
        html: '<p>YAML is more permissive, so the risk lives in the YAML → JSON direction and in hand-editing afterwards. Unquoted <code>yes</code>, <code>no</code>, <code>on</code>, and <code>off</code> are read as booleans by YAML 1.1 parsers — the classic bug where a country code <code>NO</code> becomes <code>false</code>. Version strings like <code>1.10</code> become the number 1.1, losing the trailing zero. Tabs are not valid indentation. Quote any value whose type you care about, and the round trip stays faithful.</p>'
      },
      {
        h2: 'Is the conversion lossless?',
        html: '<p>JSON → YAML is lossless, because YAML can express everything JSON can. YAML → JSON is lossy in one direction that matters: comments are discarded, since JSON has nowhere to put them. YAML anchors and aliases are expanded into duplicated values, and features with no JSON equivalent — multiple documents in one stream, explicit type tags — do not survive. Keep the YAML as your source of truth and treat the JSON as generated output.</p>'
      }
    ],
    entities: [E.yaml, E.json, E.kubernetes]
  },

  'json-to-xml': {
    intro:
      'Converting JSON to XML wraps each object key in an element tag, writes primitive values as tag text, and repeats a tag for each array element, all beneath a single configurable root. JSON2X converts in both directions in the browser. It exists mostly to bridge modern JSON clients to SOAP endpoints, RSS feeds, and enterprise systems that still speak XML.',
    howTo: [
      { name: 'Paste JSON', text: 'Put your document into the left-hand input pane, or switch the toggle to XML → JSON to convert the other way.' },
      { name: 'Set the root element', text: 'XML requires exactly one root element while JSON does not, so choose a wrapper name such as root, data, or response.' },
      { name: 'Read the XML', text: 'The right-hand pane shows indented, well-formed XML with reserved characters escaped as entities.' },
      { name: 'Copy into your request', text: 'Copy the document into a SOAP body, a feed template, or a legacy integration payload.' }
    ],
    useCases: [
      'Calling a SOAP or legacy enterprise endpoint from a service that works in JSON',
      'Generating an RSS or sitemap fragment from JSON data',
      'Producing XML for a banking, healthcare, or government interchange format',
      'Converting an XML API response into JSON your frontend can use directly',
      'Inspecting an XML configuration file as JSON because the nesting is easier to read'
    ],
    sections: [
      {
        h2: 'Why is a root element required?',
        html: '<p>Because the two data models differ. A JSON document may be an array, a string, or a number at the top level; a well-formed XML document must have exactly one root element containing everything else. So <code>[1,2,3]</code> cannot be expressed as XML without inventing a wrapper — hence the configurable root name. The same asymmetry means XML → JSON conversion normally discards that wrapper, which is why round trips need the root name supplied again.</p>'
      },
      {
        h2: 'How are arrays represented?',
        html: '<p>As repeated sibling elements. <code>{"item":[1,2]}</code> becomes <code>&lt;item&gt;1&lt;/item&gt;&lt;item&gt;2&lt;/item&gt;</code>, because XML has no bracket syntax for sequences. That representation is idiomatic but ambiguous in reverse: a single <code>&lt;item&gt;</code> element is indistinguishable from a one-element array, so XML → JSON conversion cannot know whether to emit a value or an array of one. If a downstream consumer requires an array, normalise it explicitly after conversion.</p>'
      },
      {
        h2: 'What about attributes and types?',
        html: '<p>JSON has no concept of an attribute, so keys map to child elements by default; attribute mapping is available for keys you nominate. Types are the other loss: XML text content is untyped, so the number <code>42</code>, the boolean <code>true</code>, and the strings <code>"42"</code> and <code>"true"</code> all serialise identically. Converting back therefore relies on inference. Where types must survive, pair the XML with an XSD, or keep JSON as the canonical format and treat XML as a transport skin.</p>'
      }
    ],
    entities: [E.xml, E.json]
  },

  'json-to-toml': {
    intro:
      'TOML is a configuration format designed to map unambiguously onto a hash table while staying obvious to read. Converting from JSON turns nested objects into <code>[table]</code> headers, arrays of objects into <code>[[array.of.tables]]</code> blocks, and leaf values into plain <code>key = value</code> assignments. JSON2X does the conversion locally, which suits secrets that live in Cargo, Poetry, or Hugo configuration.',
    howTo: [
      { name: 'Paste JSON', text: 'Put your configuration object into the left-hand input pane. Objects convert most cleanly; a top-level array has no direct TOML equivalent.' },
      { name: 'Read the TOML', text: 'The right-hand pane shows table headers for nested objects, inline arrays for primitive lists, and typed scalars for numbers, booleans, and dates.' },
      { name: 'Paste into your config', text: 'Drop the result into Cargo.toml, pyproject.toml, netlify.toml, or a Hugo config file.' }
    ],
    useCases: [
      'Adding a JSON-shaped block of settings to a Rust Cargo.toml',
      'Moving Python project metadata into pyproject.toml for Poetry, Hatch, or Ruff',
      'Writing a Hugo, Netlify, or Zola configuration from JSON you already have',
      'Migrating a JSON config to TOML so it can carry comments',
      'Documenting a settings schema in a format non-programmers can edit safely'
    ],
    sections: [
      {
        h2: 'How do nested objects become tables?',
        html: '<p>Each level of nesting becomes a dotted table header. <code>{"tool":{"ruff":{"line-length":100}}}</code> converts to <code>[tool.ruff]</code> followed by <code>line-length = 100</code>. Arrays of objects use the double-bracket form, so <code>{"bin":[{"name":"a"},{"name":"b"}]}</code> becomes two <code>[[bin]]</code> blocks. This is why TOML reads well for configuration and poorly for data: it is optimised for a handful of named sections, not for a thousand uniform records.</p>'
      },
      {
        h2: 'Where does TOML differ from JSON?',
        html: '<p>TOML has a richer scalar set — first-class dates, times, and offset date-times, plus integers and floats as distinct types — and it allows comments, which JSON does not. It is also stricter in one respect: a table may not be defined twice, so duplicate keys that a lenient JSON parser would silently overwrite become an error. And ordering carries no meaning, so tools are free to reorder sections when they rewrite a file.</p>'
      },
      {
        h2: 'What does not convert cleanly?',
        html: '<p>Two things. <code>null</code> has no TOML representation at all — the convention is to omit the key entirely, so a JSON document that relies on explicit nulls loses that distinction. And a top-level JSON array cannot be a TOML document, because a TOML document is always a table; wrap it in a named key first. Deeply nested or heterogeneous structures technically convert but produce header-heavy output, which is a signal that <a href="/tools/json-to-yaml">YAML</a> may be the better target.</p>'
      }
    ],
    entities: [E.toml, E.json, E.rust]
  },

  'json-to-sql': {
    intro:
      'Converting JSON to SQL means two separate jobs: inferring a table definition, and writing the rows. JSON2X scans every object in your array so the inferred column types cover all the data rather than just the first record, emits a <code>CREATE TABLE</code> statement, and follows it with properly escaped <code>INSERT</code> rows for PostgreSQL, MySQL, SQLite, or SQL Server.',
    howTo: [
      { name: 'Paste a JSON array', text: 'Put an array of uniform objects into the left-hand input pane — one object per intended row.' },
      { name: 'Pick a dialect and table name', text: 'Choose PostgreSQL, MySQL, SQLite, or SQL Server so identifier quoting and type names match, and name the target table.' },
      { name: 'Review the DDL and inserts', text: 'The right-hand pane shows the CREATE TABLE statement with inferred column types, followed by INSERT statements with string literals escaped.' },
      { name: 'Run it against a scratch database', text: 'Copy the script and run it somewhere disposable first — inferred types are a starting point, not a schema review.' }
    ],
    useCases: [
      'Loading an API export into Postgres for ad-hoc analysis',
      'Seeding a development or test database from a JSON fixture',
      'Drafting a first-pass table definition from a sample payload',
      'Migrating documents out of a NoSQL store into a relational one',
      'Producing a reproducible SQL script from data a colleague sent as JSON'
    ],
    sections: [
      {
        h2: 'How are column types inferred?',
        html: '<p>By scanning every row, not just the first. Values that are always integers become <code>INTEGER</code>, values with a fractional part become a numeric or double type, booleans become <code>BOOLEAN</code> (or <code>TINYINT(1)</code> in MySQL), and strings matching an ISO 8601 pattern become <code>TIMESTAMP</code>. Everything else becomes <code>TEXT</code> or <code>VARCHAR</code>. A key that holds a number in some rows and a string in others widens to text, which is deliberate — it is the only choice that will not reject data on insert.</p>'
      },
      {
        h2: 'What happens to nested objects and arrays?',
        html: '<p>They have no scalar column type, so they are serialised as JSON text in a single column. On PostgreSQL that column is a good candidate to change to <code>jsonb</code>, which gives you indexing and operators over the nested data; MySQL 5.7+ and SQLite have comparable JSON support. If the nested array is really a relationship, the right answer is a second table with a foreign key — in which case <a href="/tools/json-to-prisma">Prisma</a> or <a href="/tools/json-to-drizzle">Drizzle</a> output will model it better than flat DDL.</p>'
      },
      {
        h2: 'Is the generated SQL safe to run as-is?',
        html: '<p>String literals are escaped, so the script itself is not an injection vector for the data you pasted. But treat the DDL as a draft. Inferred types carry no length limits, no <code>NOT NULL</code> constraints, no indexes, and no primary key beyond an obvious <code>id</code>; a column inferred as <code>INTEGER</code> from a thousand-row sample may need <code>BIGINT</code> in production. Review it, then run it against a scratch database before it goes anywhere that matters.</p>'
      }
    ],
    entities: [E.sql, E.json]
  },

  'json-converter': {
    intro:
      'The multi-converter runs one JSON payload through seven generators without making you visit seven pages: TypeScript interfaces, Zod schemas, Mongoose models, SQL DDL, JSON Schema Draft-07, OpenAPI components, and mock fixtures. All of it is generated in the browser, so an API response containing real customer data can be turned into types without being uploaded anywhere.',
    howTo: [
      { name: 'Paste one JSON payload', text: 'Put a representative object or API response into the left-hand input pane. Use a record with all optional fields populated so inference has the most to work with.' },
      { name: 'Choose a target', text: 'Switch between TypeScript, Zod, Mongoose, SQL, JSON Schema, OpenAPI, and mock data. The input stays put, so you can compare outputs without re-pasting.' },
      { name: 'Read the generated code', text: 'The right-hand pane updates as you switch targets, showing the generated artefact for the current selection.' },
      { name: 'Copy what you need', text: 'Copy each output in turn — a typical use is taking the TypeScript interface and the Zod schema together.' }
    ],
    useCases: [
      'Bootstrapping a typed API client from a single sample response',
      'Producing types and a runtime validator for the same payload in one sitting',
      'Drafting an OpenAPI component schema from an endpoint that has no documentation',
      'Comparing how the same data models as a JSON Schema, a Zod schema, and SQL DDL',
      'Generating mock fixtures shaped exactly like the real response for tests'
    ],
    sections: [
      {
        h2: 'Which output should I use for what?',
        html: '<p>They answer different questions. <strong>TypeScript</strong> gives you compile-time safety and editor autocomplete but disappears at runtime. <strong>Zod</strong> checks the data at the boundary and derives the TypeScript type from the same declaration, so it is the better default for anything crossing a network. <strong>JSON Schema</strong> is the portable, language-neutral contract to publish or share. <strong>OpenAPI</strong> is that contract embedded in API documentation. <strong>Mongoose</strong> and <strong>SQL</strong> are persistence models. <strong>Mock data</strong> closes the loop for tests.</p>'
      },
      {
        h2: 'How good is inference from a single sample?',
        html: '<p>It is a strong first draft and a weak final answer, because one sample cannot show you what varies. A field that is <code>null</code> in your example has an unknowable type. A field absent from your example will be absent from the output. An array that happens to hold one element looks homogeneous even when the real data is a union. And a numeric string looks like a string even when the API sometimes sends a number. Paste the messiest realistic record you can find, then widen the generated types by hand where you know the API is looser.</p>'
      },
      {
        h2: 'Why generate rather than hand-write?',
        html: '<p>Because transcription is where the bugs live. Hand-typing a forty-key response into an interface reliably produces a typo, a wrong optional marker, or a field silently typed <code>any</code> — and the compiler cannot catch a type that merely disagrees with reality. Generating from the actual payload makes the types match the data by construction. Treat the output as a starting point you review, not as something to commit unread.</p>'
      }
    ],
    entities: [E.json, E.typescript, E.zod, E.jsonSchema, E.openapi]
  },

  'json-to-ts': {
    intro:
      'Generating TypeScript from JSON removes the most error-prone step in consuming an API: transcribing its response shape by hand. JSON2X walks the payload, gives every nested object its own named interface, types arrays from their members, and marks keys that are missing from some objects as optional. Generation is local, so you can paste a real authenticated response rather than a sanitised one.',
    howTo: [
      { name: 'Paste an API response', text: 'Put the object or array into the left-hand input pane. Prefer a record where optional fields are populated — inference can only see what is present.' },
      { name: 'Choose interface or type alias', text: 'Switch between `interface Foo {}` and `type Foo = {}` declarations, and name the root type.' },
      { name: 'Read the generated types', text: 'The right-hand pane shows the root interface plus one named interface per nested object, in dependency order so the file compiles as pasted.' },
      { name: 'Paste into your project', text: 'Drop the block into a .d.ts or types file, then widen any type you know the API can vary.' }
    ],
    useCases: [
      'Typing a third-party API that ships no TypeScript definitions',
      'Creating types for a webhook payload you only have one example of',
      'Replacing `any` in an existing codebase with a shape derived from real data',
      'Generating props types from a JSON fixture used in tests',
      'Documenting an internal endpoint’s response by checking its type into the repo'
    ],
    sections: [
      {
        h2: 'How are nested objects and arrays typed?',
        html: '<p>Each nested object becomes its own named interface rather than an inline literal, so the output stays readable and the sub-types are reusable. Arrays are typed from their elements: an array of numbers becomes <code>number[]</code>, an array of objects becomes <code>Item[]</code> with <code>Item</code> declared separately, and an array whose elements disagree becomes a union. An empty array cannot be inferred and falls back to <code>unknown[]</code>, which is the honest answer — <code>any[]</code> would silently disable checking.</p>'
      },
      {
        h2: 'How does it decide a field is optional?',
        html: '<p>By comparing objects at the same position. If you paste an array of records and a key appears in some but not all of them, that key is emitted with a <code>?</code>. From a single object nothing can be inferred as optional, because every key present is present. This is the main reason to paste a list rather than one record: the variation in your sample is the only evidence the generator has about which fields the API actually guarantees.</p>'
      },
      {
        h2: 'What are the limits of generated types?',
        html: '<p>TypeScript types vanish at compile time, so a generated interface is a claim about the data, not a check on it. If the API changes, your code keeps compiling and fails at runtime instead. Nullable fields are the common gap — a field that is <code>null</code> in your sample types as <code>null</code>, and one that is never null in the sample types as non-nullable even when the API disagrees. For anything crossing a network boundary, generate a <a href="/tools/json-to-zod">Zod schema</a> as well and derive the type from it, so the check and the type cannot drift apart.</p>'
      }
    ],
    entities: [E.typescript, E.json]
  },

  'json-to-code': {
    intro:
      'The same JSON payload can be turned into idiomatic types for statically typed languages. JSON2X generates Go structs with <code>json:"…"</code> tags, Rust structs with Serde derives and rename attributes, and Python Pydantic models with annotated fields — each following the naming conventions of its own language rather than copying the JSON keys verbatim.',
    howTo: [
      { name: 'Paste JSON', text: 'Put an object or API response into the left-hand input pane.' },
      { name: 'Pick a language', text: 'Choose Go, Rust, or Python. The naming convention, type names, and serialisation attributes change with the target.' },
      { name: 'Read the generated types', text: 'The right-hand pane shows the root type plus one named type per nested object, ready to paste into a source file.' },
      { name: 'Adjust nullability', text: 'Widen fields the API can omit — a Go pointer, a Rust `Option<T>`, or a Python `| None` — since one sample cannot prove a field is always present.' }
    ],
    useCases: [
      'Unmarshalling a third-party API response in a Go service',
      'Deserialising a config or payload with Serde in a Rust binary',
      'Validating an incoming request body with Pydantic in a FastAPI route',
      'Porting a TypeScript client’s types to a backend in another language',
      'Generating fixtures types for integration tests against an external API'
    ],
    sections: [
      {
        h2: 'How are JSON keys mapped to language conventions?',
        html: '<p>Names are converted, and the original key is preserved in an attribute. A JSON key <code>created_at</code> becomes the exported Go field <code>CreatedAt</code> with the tag <code>json:"created_at"</code>, the Rust field <code>created_at</code> under <code>#[serde(rename = "created_at")]</code> when needed, and the Python field <code>created_at</code> directly. This matters because Go only serialises exported (capitalised) fields, so a struct without tags silently produces <code>CreatedAt</code> in its output and fails to match the API.</p>'
      },
      {
        h2: 'How is nullability handled per language?',
        html: '<p>Each language expresses "maybe absent" differently, and getting it wrong is the usual source of runtime panics. Go has no optional type, so a nullable field needs a pointer (<code>*string</code>) to distinguish absent from empty — otherwise a missing string silently becomes <code>""</code>. Rust makes it explicit with <code>Option&lt;T&gt;</code>, and Serde will error on a missing field that is not optional. Pydantic uses <code>str | None = None</code>. The generator marks what it can see; anything the API can omit but your sample includes has to be widened by hand.</p>'
      },
      {
        h2: 'What about numbers and dates?',
        html: '<p>JSON has one numeric type, so inference guesses from the sample: a whole number becomes <code>int64</code>/<code>i64</code>/<code>int</code> and a fractional one becomes <code>float64</code>/<code>f64</code>/<code>float</code>. A field that is integral in your example but occasionally fractional in production will fail to deserialise, so widen it deliberately. Dates arrive as ISO 8601 strings with no type marker; Go can decode them into <code>time.Time</code>, Rust needs <code>chrono</code> with a Serde feature, and Pydantic will coerce a string into <code>datetime</code> automatically.</p>'
      }
    ],
    entities: [E.go, E.rust, E.pydantic, E.json]
  },

  schema: {
    intro:
      'A JSON Schema is a machine-readable contract describing which documents are acceptable. JSON2X infers one from a sample: types from the values, a <code>required</code> array from the keys present, <code>properties</code> for each object, <code>items</code> for each array, and string <code>format</code> hints such as <code>email</code>, <code>uri</code>, <code>uuid</code>, and <code>date-time</code> where a value matches a recognised pattern.',
    howTo: [
      { name: 'Paste sample JSON', text: 'Put a representative document into the left-hand input pane. An array of several records yields a better schema than one object, because variation reveals which fields are truly required.' },
      { name: 'Choose a draft', text: 'Select Draft-07 for the widest tooling support, or 2020-12 for the current specification.' },
      { name: 'Read the schema', text: 'The right-hand pane shows the generated schema with types, required arrays, nested property definitions, and detected string formats.' },
      { name: 'Tighten it by hand', text: 'Add the constraints inference cannot see — enums, minimum and maximum, pattern, and additionalProperties: false.' }
    ],
    useCases: [
      'Publishing a contract for an API endpoint that currently has none',
      'Validating configuration files in CI before a deploy reads them',
      'Adding request-body validation to an Express, Fastify, or FastAPI route',
      'Driving editor autocomplete and inline errors for a config file in VS Code',
      'Generating a schema to hand to a client team as documentation'
    ],
    sections: [
      {
        h2: 'What can be inferred, and what cannot?',
        html: '<p>Inference sees structure, not intent. It can tell that <code>status</code> is a string; it cannot know the only legal values are <code>active</code> and <code>archived</code> — that needs an <code>enum</code>. It can tell <code>age</code> is an integer; it cannot know it must be between 0 and 130. It can tell <code>tags</code> is an array of strings; it cannot know it must be non-empty and unique. Treat the generated schema as the structural skeleton and add the business rules yourself. The single highest-value manual addition is usually <code>"additionalProperties": false</code>, which turns silent typos in config keys into errors.</p>'
      },
      {
        h2: 'How is `required` determined?',
        html: '<p>From presence across your sample. With one object, every key is present and therefore required — which is almost always too strict. With an array of records, only the keys appearing in all of them are marked required, which is usually right. This is the single biggest reason to paste multiple records: it is the only evidence the generator has about optionality, and an over-strict <code>required</code> array will reject valid production traffic.</p>'
      },
      {
        h2: 'Which draft should I target?',
        html: '<p>Draft-07 if you want the broadest library and tooling support — most validators, editors, and API frameworks handle it without configuration. 2020-12 is the current specification and the right choice for new work, particularly if you need <code>prefixItems</code> for tuple validation or the reworked <code>$dynamicRef</code> mechanism. The practical difference for a straightforward object schema is small; the difference in whether your validator supports it is not, so check the library before switching.</p>'
      }
    ],
    entities: [E.jsonSchema, E.json]
  },

  'json-mock-generator': {
    intro:
      'Mock data lets you build and test against a shape before the real endpoint exists. JSON2X generates plausible records — names, emails, UUIDs, ISO timestamps, prices, addresses — in the entity shapes teams need most often, so the fixtures look like production data rather than <code>test1</code>, <code>test2</code>, <code>test3</code>. Generation runs in the browser, and no account or API key is involved.',
    howTo: [
      { name: 'Pick an entity', text: 'Choose users, products, orders, transactions, or another preset in the left-hand options pane.' },
      { name: 'Set the row count', text: 'Generate a handful for a unit test or a few hundred to see how a table or list behaves under load.' },
      { name: 'Read the generated array', text: 'The right-hand pane shows a typed JSON array with realistic values — valid-looking emails, UUID v4 identifiers, and ISO 8601 dates.' },
      { name: 'Save as a fixture', text: 'Copy or download the array into your test fixtures, a mock server, or a seeding script.' }
    ],
    useCases: [
      'Building a frontend list, table, or dashboard before the backend endpoint exists',
      'Filling a UI with enough rows to expose pagination and layout problems',
      'Seeding a local database for development',
      'Producing fixtures for unit and integration tests without touching production data',
      'Creating a demo dataset for a screenshot or a sales walkthrough'
    ],
    sections: [
      {
        h2: 'Why not just write the fixtures by hand?',
        html: '<p>Because hand-written fixtures are unrealistically tidy, and tidy data hides bugs. Three records named "Test User" will never reveal that your layout breaks on a long name, that your sort is unstable on equal values, or that your table needs pagination. Generated data varies in length, ordering, and distribution, which surfaces those problems while you are still building. It also removes the temptation to copy a real record — and with it a real customer’s details — into a repository.</p>'
      },
      {
        h2: 'Is generated data safe to commit?',
        html: '<p>Yes, and that is much of the point. Every value is synthetic, so there is no personal data to leak through a public repository, a CI log, or a bug report. The usual anti-pattern is the opposite: sanitising a production export by hand, missing a field, and committing a real email address. Starting from generated data removes that risk entirely. Keep the fixture files small enough to review, and regenerate rather than edit them when the shape changes.</p>'
      },
      {
        h2: 'How do I mock a shape the presets do not cover?',
        html: '<p>Work backwards from the real payload. Take an actual response, generate a <a href="/tools/json-schema-generator">JSON Schema</a> or a <a href="/tools/json-to-zod">Zod schema</a> from it, and use that as the definition of the shape you need; then generate records against the closest preset and reshape them, or hand-write one exemplar and multiply it. The reason to anchor on a generated schema is that it stays in sync with the API — a hand-written mock quietly diverges the moment a field is added.</p>'
      }
    ],
    entities: [E.json, E.jsonSchema]
  },

  'json-to-zod': {
    intro:
      'Zod schemas validate data at runtime and produce a TypeScript type from the same declaration, so the check and the type cannot drift apart. JSON2X maps each value in your payload to its validator — strings to <code>z.string()</code>, numbers to <code>z.number()</code>, nested objects to <code>z.object()</code>, arrays to <code>z.array()</code> — and marks keys missing from some records as <code>.optional()</code>.',
    howTo: [
      { name: 'Paste an API payload', text: 'Put the object or array into the left-hand input pane. An array of records lets the generator infer which keys are optional.' },
      { name: 'Name the schema', text: 'Set the exported constant name — the convention is a PascalCase noun such as `UserSchema`.' },
      { name: 'Read the generated schema', text: 'The right-hand pane shows the Zod schema with nested objects expanded inline and optional keys marked.' },
      { name: 'Derive the type', text: 'Add `type User = z.infer<typeof UserSchema>` so the static type comes from the validator rather than being written twice.' }
    ],
    useCases: [
      'Validating a third-party API response at the fetch boundary instead of trusting it',
      'Checking request bodies in a tRPC, Next.js route handler, or Express endpoint',
      'Parsing and typing environment variables at application startup',
      'Validating form input with React Hook Form or a similar resolver',
      'Replacing a hand-written interface with a schema that also checks at runtime'
    ],
    sections: [
      {
        h2: 'Why use Zod instead of a TypeScript interface?',
        html: '<p>Because an interface is a compile-time claim and nothing more. If an API changes a field from a number to a string, your code still compiles and then fails somewhere far from the cause. A Zod schema checks the actual bytes at the boundary and fails immediately with a path to the offending field. Crucially, <code>z.infer</code> derives the static type from the schema, so there is exactly one declaration — you cannot update the validator and forget the type. See the <a href="/tools/typescript-generator">TypeScript generator</a> when you only need the type.</p>'
      },
      {
        h2: 'Should I use `parse` or `safeParse`?',
        html: '<p><code>parse</code> throws a <code>ZodError</code> on failure, which suits application startup and anywhere a bad value should stop everything — validating environment variables, for instance. <code>safeParse</code> returns a discriminated result (<code>{ success, data | error }</code>) and never throws, which is the better fit for request handlers and fetch wrappers where you want to return a 400 rather than crash. Both give you the same field-level error paths; only the control flow differs.</p>'
      },
      {
        h2: 'What should I tighten after generating?',
        html: '<p>Inference gives you types, not rules. Turn <code>z.string()</code> into <code>z.string().email()</code>, <code>.uuid()</code>, or <code>.datetime()</code> where the field is one of those. Add <code>.min()</code> and <code>.max()</code> to numbers and strings. Replace a plain string with <code>z.enum([...])</code> where the value set is closed. Add <code>.nullable()</code> where the API can send <code>null</code> — that is distinct from <code>.optional()</code>, which means the key may be absent, and conflating the two is the most common bug in hand-tightened schemas.</p>'
      }
    ],
    entities: [E.zod, E.typescript, E.json]
  },

  'json-to-prisma': {
    intro:
      'A Prisma model declares a table in <code>schema.prisma</code>, and Prisma generates a typed client and migrations from it. JSON2X infers a model from a sample record: each key becomes a field with a Prisma scalar type such as <code>Int</code>, <code>String</code>, <code>Boolean</code>, <code>Float</code>, or <code>DateTime</code>, an <code>id</code> key is annotated <code>@id</code>, and keys absent from some records become optional with <code>?</code>.',
    howTo: [
      { name: 'Paste a representative record', text: 'Put one object — or an array of them — into the left-hand input pane. An array lets the generator work out which fields are optional.' },
      { name: 'Name the model', text: 'Set the model name in PascalCase singular, which is the Prisma convention: `User`, not `users`.' },
      { name: 'Read the generated model', text: 'The right-hand pane shows a model block with typed fields, an @id on the primary key, and @default(now()) on timestamp-looking fields.' },
      { name: 'Add relations, then migrate', text: 'Wire up relation fields by hand, then run `prisma migrate dev` against a development database.' }
    ],
    useCases: [
      'Bootstrapping a Prisma schema from an existing API response or JSON export',
      'Migrating documents out of MongoDB or Firestore into Postgres with Prisma',
      'Drafting a model for a new feature from a sample payload',
      'Turning a JSON seed file into a schema plus a typed seed script',
      'Getting a typed database client over data that arrived as JSON'
    ],
    sections: [
      {
        h2: 'How are Prisma scalar types inferred?',
        html: '<p>From the JSON values, with one wrinkle: JSON has a single numeric type, so a whole number becomes <code>Int</code> and a fractional one becomes <code>Float</code>. That is a guess, and it is the field most often wrong — an amount that happens to be <code>100</code> in your sample will reject <code>100.5</code> later, and money is better modelled as <code>Decimal</code> than <code>Float</code> in any case. Strings matching ISO 8601 become <code>DateTime</code>; everything else is <code>String</code>. Review the numeric fields before you migrate.</p>'
      },
      {
        h2: 'What about relations and nested objects?',
        html: '<p>Prisma models are relational, so a nested object is really a hint that a second model and a relation belong there. Inference cannot make that call — it does not know whether <code>author</code> is an embedded value or a foreign key — so nested structures are emitted as <code>Json</code> fields, which PostgreSQL and MySQL both support. Where the nesting is genuinely a relationship, split it into a second model and add matching <code>@relation</code> fields on both sides; Prisma will then generate the join for you.</p>'
      },
      {
        h2: 'Is the generated schema ready to migrate?',
        html: '<p>It will migrate, but review it first, because <code>prisma migrate</code> is how the schema reaches a real database. Inference produces no <code>@unique</code> constraints, no indexes on foreign keys, no explicit <code>@db</code> length annotations, and no cascade rules. It also cannot know your primary key strategy — whether <code>@default(autoincrement())</code>, <code>@default(cuid())</code>, or <code>@default(uuid())</code> is right for you. Run the first migration against a development database, never production.</p>'
      }
    ],
    entities: [E.prisma, E.json]
  },

  'json-to-drizzle': {
    intro:
      'Drizzle ORM declares tables as ordinary TypeScript, so the schema is code your editor can check rather than a separate DSL. JSON2X infers a table definition from a sample record and emits it as <code>pgTable</code>, <code>mysqlTable</code>, or <code>sqliteTable</code>, mapping each key to a typed column helper such as <code>integer</code>, <code>text</code>, <code>boolean</code>, <code>numeric</code>, or <code>timestamp</code>.',
    howTo: [
      { name: 'Paste a record', text: 'Put one representative object, or an array of them, into the left-hand input pane.' },
      { name: 'Pick your database', text: 'Choose PostgreSQL, MySQL, or SQLite so the correct table builder and column helpers are used — they are not interchangeable.' },
      { name: 'Read the table definition', text: 'The right-hand pane shows an exported table constant with typed columns, a primary key on any id field, and notNull where the sample is consistent.' },
      { name: 'Add it to your schema file', text: 'Paste it into your Drizzle schema, then generate a migration with drizzle-kit.' }
    ],
    useCases: [
      'Standing up a Drizzle schema quickly from an existing JSON API or export',
      'Adding a table for a new feature from a sample payload',
      'Moving a project from an untyped query builder to Drizzle',
      'Generating a table to hold webhook events you receive as JSON',
      'Producing a schema for an edge or serverless runtime where Drizzle is a good fit'
    ],
    sections: [
      {
        h2: 'Why does the dialect matter?',
        html: '<p>Because Drizzle’s column helpers are dialect-specific by design, and mixing them will not compile. PostgreSQL uses <code>pgTable</code> with <code>serial</code>, <code>text</code>, and <code>timestamp</code>; MySQL uses <code>mysqlTable</code> with <code>int</code>, <code>varchar</code> (which requires an explicit length), and <code>datetime</code>; SQLite uses <code>sqliteTable</code> with <code>integer</code> and <code>text</code>, and has no native boolean or date type, so those are stored as integers. Pick the dialect up front rather than converting output later.</p>'
      },
      {
        h2: 'How does this compare to Prisma?',
        html: '<p>They solve the same problem with opposite philosophies. <a href="/tools/json-to-prisma">Prisma</a> uses its own schema language and a generated client, which gives a very clean declarative model and excellent migrations at the cost of a build step and a heavier runtime. Drizzle is plain TypeScript with a thin SQL-like query builder, which means no codegen step, a small bundle suitable for edge runtimes, and queries that read like the SQL they become. Choose Drizzle when you want to stay close to SQL, Prisma when you want the abstraction.</p>'
      },
      {
        h2: 'What has to be added by hand?',
        html: '<p>Everything relational, plus the constraints. Inference emits columns but no <code>references()</code> foreign keys, no <code>unique()</code> constraints, no composite indexes, and no <code>relations()</code> declarations — which are what make Drizzle’s relational queries work. It also cannot pick your id strategy between <code>serial</code>, <code>uuid</code>, and an application-generated key. On MySQL, check every <code>varchar</code> length: the inferred default is rarely the right one for production.</p>'
      }
    ],
    entities: [E.drizzle, E.typescript, E.json]
  },

  'json-to-graphql': {
    intro:
      'GraphQL’s Schema Definition Language describes the types a server exposes. JSON2X infers SDL from a sample payload: values map to the built-in scalars <code>String</code>, <code>Int</code>, <code>Float</code>, <code>Boolean</code>, and <code>ID</code>, nested objects become their own named types, and arrays become list types — giving you a draft schema for data you already have.',
    howTo: [
      { name: 'Paste a sample payload', text: 'Put a representative response into the left-hand input pane. An array of records helps the generator judge which fields are always present.' },
      { name: 'Name the root type', text: 'Set the top-level type name in PascalCase, as GraphQL convention requires.' },
      { name: 'Read the SDL', text: 'The right-hand pane shows type definitions with scalar fields, nested types declared separately, and list types for arrays.' },
      { name: 'Add nullability and queries', text: 'Mark guaranteed fields with `!`, then write the Query and Mutation fields that expose these types.' }
    ],
    useCases: [
      'Drafting a GraphQL schema that wraps an existing REST endpoint',
      'Designing types for a new resolver from a sample response',
      'Migrating a REST API to GraphQL incrementally, one payload at a time',
      'Producing SDL to share with a frontend team as a contract',
      'Sketching types for a mock GraphQL server used in tests'
    ],
    sections: [
      {
        h2: 'How do JSON values map to GraphQL scalars?',
        html: '<p>Strings become <code>String</code>, booleans <code>Boolean</code>, whole numbers <code>Int</code>, and fractional numbers <code>Float</code>. A field named <code>id</code> becomes <code>ID</code>, the scalar GraphQL reserves for identifiers and serialises as a string. Two limits are worth knowing: GraphQL’s <code>Int</code> is a signed 32-bit integer, so large identifiers and timestamps in milliseconds overflow it and should be <code>ID</code> or a custom scalar. And there is no built-in date type — ISO 8601 strings arrive as <code>String</code> unless you define a <code>DateTime</code> custom scalar.</p>'
      },
      {
        h2: 'Why is nullability inverted from what you expect?',
        html: '<p>In GraphQL every field is nullable by default, and <code>!</code> marks it non-null — the opposite of TypeScript, where you opt into optionality. Inference therefore starts permissive, which is the safe direction: a nullable field can always be tightened later, whereas removing a <code>!</code> from a published schema is a breaking change for every client that relied on it. Add <code>!</code> only where the server genuinely guarantees a value, and remember that a non-null field which errors nullifies its parent.</p>'
      },
      {
        h2: 'What does inference not give you?',
        html: '<p>The parts of a schema that are design decisions rather than shape. There are no <code>Query</code> or <code>Mutation</code> root fields, no arguments or pagination, no interfaces or unions for polymorphic data, no <code>enum</code> types for closed value sets, and no <code>input</code> types for mutation arguments — GraphQL requires separate input types and will not accept an output type there. Inference also cannot see relationships between types, which is where most of the value of a GraphQL schema actually lives.</p>'
      }
    ],
    entities: [E.graphql, E.json]
  },

  jsonpath: {
    intro:
      'JSONPath is a query language for JSON, filling the role XPath fills for XML. An expression selects nodes by path, wildcard, recursive descent, array slice, or filter predicate. JSON2X evaluates the expression against your document as you type and lists every match, which makes it a fast way to work out the right selector before committing it to code or a CI configuration.',
    howTo: [
      { name: 'Paste your document', text: 'Put the JSON you want to query into the left-hand input pane.' },
      { name: 'Write an expression', text: 'Enter a JSONPath expression beginning with `$`, the root. Start broad — `$..name` — then narrow it.' },
      { name: 'Read the matches', text: 'The right-hand pane lists every matching node with its resolved path, updating live as you edit the query.' },
      { name: 'Copy the working selector', text: 'Once the match set is right, copy the expression into your code, your jq-adjacent tooling, or a CI assertion.' }
    ],
    useCases: [
      'Finding the exact path to a value buried deep in an API response',
      'Extracting one field from every element of a large array',
      'Writing an assertion for a contract or integration test',
      'Configuring a log pipeline or monitoring rule that selects JSON fields',
      'Exploring an unfamiliar payload faster than by scrolling through it'
    ],
    sections: [
      {
        h2: 'What are the core JSONPath operators?',
        html: '<p><code>$</code> is the root of the document and every expression starts there. <code>.key</code> or <code>[\'key\']</code> selects a child — use the bracket form when the key contains a space or a dash. <code>*</code> matches every child at that level. <code>..</code> is recursive descent, so <code>$..price</code> finds every <code>price</code> at any depth. <code>[0]</code> indexes an array, <code>[-1]</code> counts from the end, and <code>[1:4]</code> takes a slice. <code>[?(@.stock &gt; 0)]</code> filters, where <code>@</code> is the element being tested.</p>'
      },
      {
        h2: 'How do filter expressions work?',
        html: '<p>A filter keeps the elements for which a predicate is true, with <code>@</code> bound to the current element: <code>$.products[?(@.price &lt; 20)]</code> returns the cheap products, and <code>$.users[?(@.role == \'admin\')].email</code> returns just the admin emails. Predicates combine with <code>&amp;&amp;</code> and <code>||</code>, and existence is testable by naming the field alone — <code>$.items[?(@.discount)]</code> matches items that have a discount at all. Support for the more exotic filter syntax varies between implementations, so keep predicates simple if the expression has to run somewhere else.</p>'
      },
      {
        h2: 'JSONPath, jq, or JMESPath?',
        html: '<p>They overlap but are not interchangeable. JSONPath is the most widely embedded — it appears in Kubernetes, Spring, Postman, and many log pipelines — and is best at selection. <a href="https://jqlang.github.io/jq/" rel="nofollow">jq</a> is a full transformation language for the command line: it can reshape, aggregate, and construct new documents, which JSONPath cannot. JMESPath, used by the AWS CLI, sits between the two with a stricter specification. Use JSONPath when your target platform already speaks it; reach for jq when you need to transform rather than just extract.</p>'
      }
    ],
    entities: [E.jsonpath, E.json]
  },

  viewer: {
    intro:
      'A tree viewer renders JSON as an expandable outline instead of raw text, so structure is something you navigate rather than something you count brackets to find. JSON2X shows each node with a type badge and a child count, collapses branches you are not reading, and searches keys and values across the whole document — all locally, which is what makes it usable on payloads containing credentials.',
    howTo: [
      { name: 'Paste or open your JSON', text: 'Put the document into the left-hand input pane. Large files are parsed off the main thread so the tab stays responsive.' },
      { name: 'Expand what you need', text: 'The right-hand pane shows the tree collapsed to the top level. Click a node to expand it, or expand and collapse everything at once.' },
      { name: 'Search for a key or value', text: 'Filter the tree to matching nodes, with their ancestors kept visible so you can see where each match sits.' },
      { name: 'Copy a subtree or its path', text: 'Copy any node’s value as JSON, or copy its path to reuse in code or in a JSONPath expression.' }
    ],
    useCases: [
      'Understanding the shape of an unfamiliar API response before writing code against it',
      'Finding one field inside a large, deeply nested configuration file',
      'Checking how many elements an array actually contains',
      'Reading a JSON log entry or webhook body that arrived as a single line',
      'Explaining a payload’s structure to someone during a review or a debugging session'
    ],
    sections: [
      {
        h2: 'When is a tree better than formatted text?',
        html: '<p>Once nesting or size passes the point where indentation stops helping. A formatted 5,000-line document is technically readable and practically not: you cannot see a top-level key and a leaf value at the same time, and scrolling loses your place. Collapsing branches keeps the parts you care about adjacent on screen. Child counts answer questions the text cannot — whether an array holds three elements or three thousand is visible at a glance rather than after a scroll.</p>'
      },
      {
        h2: 'How does search differ from Ctrl+F?',
        html: '<p>Browser find works on rendered text, so it only matches inside branches that happen to be expanded and gives you no structural context. Tree search filters the whole parsed document, including collapsed branches, and keeps each match’s ancestor chain visible so you can see the path that leads to it. On a document with thousands of nodes that difference is decisive: Ctrl+F finds a string, tree search finds where the string lives.</p>'
      },
      {
        h2: 'What do the type badges tell you?',
        html: '<p>They surface the distinctions that cause the most bugs, because JSON’s types are invisible in formatted text until you look closely at the quotes. A badge makes it obvious that <code>"42"</code> is a string and <code>42</code> is a number, that <code>null</code> is a value rather than a missing key, and that an empty array and an empty object are different things. Those are exactly the mismatches that break a strongly typed client, and spotting them here is faster than debugging a failed <a href="/tools/json-to-zod">Zod</a> parse later.</p>'
      }
    ],
    entities: [E.json]
  }
};
