/**
 * JSON Toolkit — Formatter Web Worker
 * =====================================
 * Handles heavy JSON operations off the main thread:
 *   - JSON.parse  (with enriched error location)
 *   - JSON.stringify with indent
 *   - Key sorting
 *   - Syntax highlighting (character-by-character tokeniser)
 *   - Structural statistics
 *
 * Messages IN  → { id, raw, indent, sortKeys }
 * Messages OUT → { id, ok, formatted, highlighted, stats, error, line, column }
 */

'use strict';

/* ── HTML Escape ──────────────────────────────────────────── */
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Syntax Highlighter ───────────────────────────────────── */
/**
 * Character-level tokeniser for pretty-printed JSON.
 * Returns an HTML string with <span class="hl-*"> wrappers.
 *
 * Token classes:
 *   hl-key    JSON object keys           → indigo-blue
 *   hl-str    String values              → emerald-green
 *   hl-num    Number values              → amber
 *   hl-bool   true / false               → violet
 *   hl-null   null                       → muted gray
 *   (structural chars are plain escaped HTML)
 */
function highlightJSON(str) {
  let result = '';
  let i = 0;
  const len = str.length;

  while (i < len) {
    const ch = str[i];

    /* ── String token (key or value) ───────────────────────── */
    if (ch === '"') {
      let raw = '"';
      i++;
      while (i < len) {
        const c = str[i];
        raw += c;
        if (c === '\\') {
          // consume the escaped character
          i++;
          if (i < len) { raw += str[i]; }
        } else if (c === '"') {
          break;
        }
        i++;
      }
      i++; // advance past closing quote

      // Look ahead past optional whitespace to find ':'
      let j = i;
      while (j < len && (str[j] === ' ' || str[j] === '\r' || str[j] === '\n')) j++;
      const isKey = str[j] === ':';

      result += `<span class="${isKey ? 'hl-key' : 'hl-str'}">${escHtml(raw)}</span>`;
      continue;
    }

    /* ── true ──────────────────────────────────────────────── */
    if (ch === 't' && str.slice(i, i + 4) === 'true') {
      result += '<span class="hl-bool">true</span>';
      i += 4;
      continue;
    }

    /* ── false ─────────────────────────────────────────────── */
    if (ch === 'f' && str.slice(i, i + 5) === 'false') {
      result += '<span class="hl-bool">false</span>';
      i += 5;
      continue;
    }

    /* ── null ──────────────────────────────────────────────── */
    if (ch === 'n' && str.slice(i, i + 4) === 'null') {
      result += '<span class="hl-null">null</span>';
      i += 4;
      continue;
    }

    /* ── Number ────────────────────────────────────────────── */
    if (ch === '-' || (ch >= '0' && ch <= '9')) {
      let num = '';
      while (i < len && /[-\d.eE+]/.test(str[i])) {
        num += str[i++];
      }
      result += `<span class="hl-num">${num}</span>`;
      continue;
    }

    /* ── Structural / whitespace ───────────────────────────── */
    result += escHtml(ch);
    i++;
  }

  return result;
}

/* ── Sort keys (recursive) ────────────────────────────────── */
function sortKeysDeep(val, dir) {
  if (Array.isArray(val)) return val.map(item => sortKeysDeep(item, dir));
  if (val === null || typeof val !== 'object') return val;
  const keys = Object.keys(val).sort((a, b) =>
    dir === 'desc' ? b.localeCompare(a) : a.localeCompare(b)
  );
  const out = {};
  keys.forEach(k => { out[k] = sortKeysDeep(val[k], dir); });
  return out;
}

/* ── Count structural nodes ───────────────────────────────── */
function countNodes(val) {
  let keys = 0, arrays = 0, objects = 0, primitives = 0, maxDepth = 0;

  function walk(node, depth) {
    if (depth > maxDepth) maxDepth = depth;
    if (Array.isArray(node)) {
      arrays++;
      node.forEach(item => walk(item, depth + 1));
    } else if (node !== null && typeof node === 'object') {
      objects++;
      Object.keys(node).forEach(k => { keys++; walk(node[k], depth + 1); });
    } else {
      primitives++;
    }
  }

  walk(val, 0);
  return { keys, depth: maxDepth, arrays, objects, primitives };
}

/* ── JSON error location extractor ───────────────────────── */
function getErrorLocation(err, source) {
  const msg = err.message || String(err);
  let line = null;
  let column = null;

  // Firefox: "JSON.parse: ... at line 3 column 8 of the JSON data"
  const ffMatch = msg.match(/at line (\d+) column (\d+)/i);
  if (ffMatch) {
    line   = parseInt(ffMatch[1], 10);
    column = parseInt(ffMatch[2], 10);
    return { line, column, message: msg };
  }

  // V8 direct line ref
  const lineMatch = msg.match(/line[:\s]+(\d+)/i);
  if (lineMatch) {
    line = parseInt(lineMatch[1], 10);
    const colMatch = msg.match(/column[:\s]+(\d+)/i);
    if (colMatch) column = parseInt(colMatch[1], 10);
    return { line, column, message: msg };
  }

  // V8 position-based: "Unexpected token ... at position 42"
  const posMatch = msg.match(/position[:\s]+(\d+)/i) || msg.match(/offset[:\s]+(\d+)/i);
  if (posMatch && source) {
    const pos  = parseInt(posMatch[1], 10);
    const before = source.substring(0, pos);
    const lines  = before.split('\n');
    line   = lines.length;
    column = lines[lines.length - 1].length + 1;
    return { line, column, message: msg };
  }

  return { line: null, column: null, message: msg };
}

/* ── Human-readable error messages ───────────────────────── */
/**
 * Map raw JS engine error messages to developer-friendly explanations.
 * @param {string} rawMsg  - SyntaxError.message
 * @param {string} source  - Original JSON source
 * @param {number|null} line
 * @param {number|null} col
 * @returns {string}
 */
function humanizeError(rawMsg, source, line, col) {
  const m = rawMsg.toLowerCase();
  const lines = source.split('\n');
  const offendingLine = (line && lines[line - 1]) || '';
  const char = col ? offendingLine[col - 1] : '';
  const ctx  = offendingLine.trim();

  // Trailing comma before ] or }
  if (/unexpected (token|non-whitespace)/i.test(rawMsg) && (char === ']' || char === '}')) {
    const prevLine = line && lines[line - 2] ? lines[line - 2].trim() : '';
    if (prevLine.endsWith(',')) {
      return `Trailing comma on the previous line — JSON doesn't allow a comma after the last item in an array or object.`;
    }
    return `Unexpected "${char}" — check for a trailing comma before this closing bracket.`;
  }

  // Single quotes
  if (offendingLine.includes("'")) {
    return `JSON requires double quotes, not single quotes. Replace \u2018${ctx.slice(0, 30)}\u2019 with double-quoted strings.`;
  }

  // Unquoted key
  if (/expected property name or '}'/i.test(rawMsg) || /property name must be/i.test(rawMsg)) {
    return `Object key must be a double-quoted string. Found unquoted identifier or unexpected character at line ${line}.`;
  }

  // Unexpected end / truncated
  if (/unexpected end|end of json/i.test(rawMsg)) {
    return `Unexpected end of input — the JSON is incomplete. Check for a missing closing ${source.split('{').length > source.split('}').length ? '"}"' : '"]"'}.`;
  }

  // Control character
  if (/control character|invalid character/i.test(rawMsg)) {
    return `Invalid control character in string at line ${line}. Remove or escape any special/invisible characters.`;
  }

  // Duplicate key (not a parse error, but worth noting)
  if (/duplicate key/i.test(rawMsg)) {
    return `Duplicate key detected — JSON allows it, but many parsers will silently overwrite the earlier value.`;
  }

  // Generic unexpected token
  if (/unexpected token/i.test(rawMsg)) {
    if (char) {
      return `Unexpected character "${char}" at line ${line}, column ${col}. Common causes: missing comma, unquoted key, or mismatched bracket.`;
    }
    return `Unexpected character at line ${line}. Common causes: missing comma between items or an unquoted key.`;
  }

  // Fallback
  return rawMsg;
}

/* ── Worker message handler ───────────────────────────────── */
self.addEventListener('message', function (e) {
  const { id, raw, indent, sortKeysDir } = e.data;

  try {
    const data = JSON.parse(raw);

    const processed = sortKeysDir ? sortKeysDeep(data, sortKeysDir) : data;

    // Determine actual indent argument for JSON.stringify
    const indentArg = indent === 'tab' ? '\t' : (Number(indent) || 2);
    const formatted = JSON.stringify(processed, null, indentArg);

    // Syntax-highlight output
    const highlighted = highlightJSON(formatted);

    // Structural stats
    const stats = countNodes(data);

    self.postMessage({
      id,
      ok:          true,
      formatted,
      highlighted,
      stats,
      rootType:    Array.isArray(data) ? 'array' : (data === null ? 'null' : typeof data),
    });

  } catch (err) {
    const { line, column, message } = getErrorLocation(err, raw);
    const friendly = humanizeError(message, raw, line, column);

    self.postMessage({
      id,
      ok:      false,
      error:   friendly,
      rawError: message,
      line,
      column,
    });
  }
});
