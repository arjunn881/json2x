/**
 * JSON2X — Shared Parsing & Utility Module
 * ================================================
 * Central library imported by all 7 tools.
 * No duplication of logic across tool pages.
 *
 * Exports (as properties of window.JT or via ES modules):
 *   JT.parseJSON(str)          → { data, error, lineNumber }
 *   JT.stringifyJSON(val, ind) → { text, error }
 *   JT.csvToJson(str, opts)    → { data, headers, error }
 *   JT.jsonToCsv(arr, opts)    → { csv, headers, error }
 *   JT.flattenObject(obj, sep) → flat object
 *   JT.unflattenObject(obj)    → nested object
 *   JT.deepClone(val)          → deep copy
 *   JT.getType(val)            → type string
 *   JT.countNodes(val)         → { keys, depth, arrays, objects, primitives }
 *   JT.sortKeys(obj, dir)      → sorted object/array
 *   JT.copyToClipboard(text)   → Promise<void>
 *   JT.debounce(fn, ms)        → debounced fn
 *   JT.formatBytes(n)          → "4.2 KB"
 *   JT.extractLineNumber(msg)  → number | null
 */

(function (global) {
  'use strict';

  /* ── Internal helpers ───────────────────────────────────── */

  /**
   * Attempt to extract a 1-based line number from a JSON SyntaxError message.
   * Works across V8 (Chrome/Node), SpiderMonkey (Firefox), and JavaScriptCore (Safari).
   *
   * @param {string} message - The SyntaxError.message string
   * @returns {number|null}
   */
  function extractLineNumber(message) {
    if (typeof message !== 'string') return null;

    // V8: "Unexpected token ... at line 4"  / "at position 42"
    const lineMatch = message.match(/line[:\s]+(\d+)/i);
    if (lineMatch) return parseInt(lineMatch[1], 10);

    // Firefox: "JSON.parse: ... at line 3 column 8"
    const ffMatch = message.match(/at line (\d+)/i);
    if (ffMatch) return parseInt(ffMatch[1], 10);

    // Position-based: derive line by counting newlines up to the offset
    const posMatch = message.match(/position[:\s]+(\d+)/i);
    if (posMatch) return null; // caller must resolve via source string

    return null;
  }

  /**
   * Derive the line number from a character position within a JSON string.
   * Useful when the error message only provides a char offset (V8/Chrome).
   *
   * @param {string} source  - Raw JSON source
   * @param {number} charPos - 0-based character position
   * @returns {number} 1-based line number
   */
  function lineFromPosition(source, charPos) {
    const slice = source.substring(0, charPos);
    return (slice.match(/\n/g) || []).length + 1;
  }

  /**
   * Best-effort extraction of both line and column from a SyntaxError.
   * Returns { line, column, message }.
   *
   * @param {SyntaxError} err
   * @param {string} source - original JSON source
   * @returns {{ line: number|null, column: number|null, message: string }}
   */
  function parseJSONError(err, source) {
    const msg = err.message || String(err);

    // Try direct line match
    let line = extractLineNumber(msg);
    let column = null;

    const colMatch = msg.match(/column[:\s]+(\d+)/i);
    if (colMatch) column = parseInt(colMatch[1], 10);

    // V8 position-based fallback
    const posMatch = msg.match(/position[:\s]+(\d+)/i);
    if (posMatch && source && line === null) {
      const pos = parseInt(posMatch[1], 10);
      line = lineFromPosition(source, pos);
      // compute column within that line
      const lineStart = source.lastIndexOf('\n', pos - 1) + 1;
      column = pos - lineStart + 1;
    }

    return { line, column, message: msg };
  }


  /* ── Public API ─────────────────────────────────────────── */

  const JT = {};

  /**
   * Safe JSON.parse with enriched error information.
   *
   * @param {string} str - Raw JSON string
   * @returns {{ data: any, error: string|null, line: number|null, column: number|null }}
   */
  JT.parseJSON = function parseJSON(str) {
    if (typeof str !== 'string') {
      return { data: null, error: 'Input must be a string.', line: null, column: null };
    }

    const trimmed = str.trim();
    if (trimmed === '') {
      return { data: null, error: 'Input is empty.', line: null, column: null };
    }

    try {
      const data = JSON.parse(trimmed);
      return { data, error: null, line: null, column: null };
    } catch (err) {
      const { line, column, message } = parseJSONError(err, trimmed);
      return { data: null, error: message, line, column };
    }
  };

  /**
   * Safe JSON.stringify with indentation control.
   *
   * @param {any}    value   - Value to serialize
   * @param {number} [indent=2] - Indent spaces (0 = compact)
   * @param {Function} [replacer]
   * @returns {{ text: string, error: string|null }}
   */
  JT.stringifyJSON = function stringifyJSON(value, indent = 2, replacer = null) {
    try {
      const text = JSON.stringify(value, replacer, indent);
      if (text === undefined) {
        return { text: '', error: 'Value cannot be serialized to JSON (undefined, function, or symbol).' };
      }
      return { text, error: null };
    } catch (err) {
      return { text: '', error: err.message || 'Serialization failed.' };
    }
  };

  /**
   * Parse CSV text → JSON array of objects.
   *
   * Features:
   *  - RFC 4180 quoted fields (including embedded newlines & commas)
   *  - Configurable delimiter (default: auto-detect , vs ;  vs \t)
   *  - Optional type coercion (numbers, booleans, null)
   *  - Handles Windows (\r\n) and Unix (\n) line endings
   *
   * @param {string} str
   * @param {{ delimiter?: string, coerce?: boolean, skipEmpty?: boolean }} opts
   * @returns {{ data: object[], headers: string[], error: string|null }}
   */
  JT.csvToJson = function csvToJson(str, opts = {}) {
    if (typeof str !== 'string' || str.trim() === '') {
      return { data: [], headers: [], error: 'Input is empty.' };
    }

    try {
      // Normalise line endings
      const normalised = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

      // Auto-detect delimiter if not supplied
      let delim = opts.delimiter;
      if (!delim) {
        const firstLine = normalised.split('\n')[0];
        const counts = {
          ',': (firstLine.match(/,/g) || []).length,
          ';': (firstLine.match(/;/g) || []).length,
          '\t': (firstLine.match(/\t/g) || []).length,
        };
        delim = Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b, ',');
      }

      const coerce  = opts.coerce  !== false; // default true
      const skipEmpty = opts.skipEmpty !== false; // default true

      // RFC 4180 tokenizer
      function tokenize(line) {
        const fields = [];
        let i = 0;
        while (i < line.length) {
          if (line[i] === '"') {
            // Quoted field
            let field = '';
            i++; // skip opening quote
            while (i < line.length) {
              if (line[i] === '"' && line[i + 1] === '"') {
                field += '"';
                i += 2;
              } else if (line[i] === '"') {
                i++; // skip closing quote
                break;
              } else {
                field += line[i++];
              }
            }
            fields.push(field);
            if (line[i] === delim) i++;
          } else {
            // Unquoted field
            const end = line.indexOf(delim, i);
            if (end === -1) {
              fields.push(line.slice(i));
              break;
            } else {
              fields.push(line.slice(i, end));
              i = end + delim.length;
            }
          }
        }
        return fields;
      }

      // Handle quoted fields that span multiple lines
      const rows = [];
      let current = '';
      let inQuotes = false;
      for (const ch of normalised) {
        if (ch === '"') inQuotes = !inQuotes;
        if (ch === '\n' && !inQuotes) {
          rows.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      if (current) rows.push(current);

      if (rows.length === 0) return { data: [], headers: [], error: 'No data rows found.' };

      const headers = tokenize(rows[0]).map(h => h.trim());

      /**
       * Coerce a string value to number, boolean, or null if appropriate.
       */
      function coerceValue(val) {
        if (!coerce) return val;
        const trimmed = val.trim();
        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'n/a') return null;
        if (trimmed.toLowerCase() === 'true')  return true;
        if (trimmed.toLowerCase() === 'false') return false;
        const num = Number(trimmed);
        if (!isNaN(num) && trimmed !== '') return num;
        return trimmed;
      }

      const data = [];
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r].trim();
        if (skipEmpty && row === '') continue;
        const fields = tokenize(rows[r]);
        const obj = {};
        headers.forEach((h, idx) => {
          obj[h] = coerceValue(fields[idx] !== undefined ? fields[idx] : '');
        });
        data.push(obj);
      }

      return { data, headers, error: null };
    } catch (err) {
      return { data: [], headers: [], error: err.message };
    }
  };

  /**
   * Convert a JSON array of objects → CSV string.
   *
   * @param {object[]} arr
   * @param {{ delimiter?: string, headers?: string[], includeHeaders?: boolean }} opts
   * @returns {{ csv: string, headers: string[], error: string|null }}
   */
  JT.jsonToCsv = function jsonToCsv(arr, opts = {}) {
    if (!Array.isArray(arr)) {
      return { csv: '', headers: [], error: 'Input must be a JSON array.' };
    }
    if (arr.length === 0) {
      return { csv: '', headers: [], error: 'Array is empty.' };
    }

    try {
      const delim = opts.delimiter || ',';
      const includeHeaders = opts.includeHeaders !== false;

      // Collect all keys from every object to handle sparse rows
      const headerSet = new Set();
      arr.forEach(row => {
        if (row && typeof row === 'object' && !Array.isArray(row)) {
          Object.keys(row).forEach(k => headerSet.add(k));
        }
      });
      const headers = opts.headers && opts.headers.length > 0
        ? opts.headers
        : Array.from(headerSet);

      if (headers.length === 0) return { csv: '', headers: [], error: 'No keys found in objects.' };

      /**
       * Escape a field value per RFC 4180:
       * wrap in quotes if it contains delimiter, quote, or newline.
       */
      function escapeField(val) {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(delim) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
          return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      }

      const lines = [];
      if (includeHeaders) lines.push(headers.map(escapeField).join(delim));

      arr.forEach(row => {
        const isObj = row && typeof row === 'object' && !Array.isArray(row);
        const fields = headers.map(h => escapeField(isObj ? row[h] : ''));
        lines.push(fields.join(delim));
      });

      return { csv: lines.join('\n'), headers, error: null };
    } catch (err) {
      return { csv: '', headers: [], error: err.message };
    }
  };

  /**
   * Flatten a nested object into dot-notation keys.
   *
   * @param {object} obj
   * @param {string} [separator='.']
   * @param {string} [prefix='']
   * @returns {object}
   */
  JT.flattenObject = function flattenObject(obj, separator = '.', prefix = '') {
    const result = {};

    function recurse(current, path) {
      if (current === null || typeof current !== 'object') {
        result[path] = current;
        return;
      }
      if (Array.isArray(current)) {
        current.forEach((item, idx) => {
          recurse(item, path ? `${path}${separator}${idx}` : String(idx));
        });
        return;
      }
      const keys = Object.keys(current);
      if (keys.length === 0) {
        if (path) result[path] = {};
        return;
      }
      keys.forEach(key => {
        const newPath = path ? `${path}${separator}${key}` : key;
        recurse(current[key], newPath);
      });
    }

    recurse(obj, prefix);
    return result;
  };

  /**
   * Unflatten a dot-notation object back to nested.
   *
   * @param {object} obj
   * @param {string} [separator='.']
   * @returns {object}
   */
  JT.unflattenObject = function unflattenObject(obj, separator = '.') {
    const result = {};
    Object.keys(obj).forEach(key => {
      const parts = key.split(separator);
      let current = result;
      parts.forEach((part, idx) => {
        if (idx === parts.length - 1) {
          current[part] = obj[key];
        } else {
          const next = parts[idx + 1];
          if (current[part] === undefined || typeof current[part] !== 'object') {
            // Use array if next key is numeric
            current[part] = /^\d+$/.test(next) ? [] : {};
          }
          current = current[part];
        }
      });
    });
    return result;
  };

  /**
   * Deep clone any JSON-serializable value.
   *
   * @param {any} val
   * @returns {any}
   */
  JT.deepClone = function deepClone(val) {
    // structuredClone is available in modern browsers, fallback to JSON round-trip
    if (typeof structuredClone === 'function') return structuredClone(val);
    return JSON.parse(JSON.stringify(val));
  };

  /**
   * Return a human-friendly type label for any JSON value.
   *
   * @param {any} val
   * @returns {'null'|'boolean'|'number'|'string'|'array'|'object'}
   */
  JT.getType = function getType(val) {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val; // 'boolean', 'number', 'string', 'object'
  };

  /**
   * Count structural metrics in a JSON value.
   *
   * @param {any} val
   * @returns {{ keys: number, depth: number, arrays: number, objects: number, primitives: number }}
   */
  JT.countNodes = function countNodes(val) {
    let keys = 0, arrays = 0, objects = 0, primitives = 0;

    function walk(node, d) {
      if (Array.isArray(node)) {
        arrays++;
        node.forEach(item => walk(item, d + 1));
      } else if (node !== null && typeof node === 'object') {
        objects++;
        Object.keys(node).forEach(k => {
          keys++;
          walk(node[k], d + 1);
        });
      } else {
        primitives++;
      }
    }

    let maxDepth = 0;
    function walkDepth(node, d) {
      if (d > maxDepth) maxDepth = d;
      if (Array.isArray(node)) node.forEach(i => walkDepth(i, d + 1));
      else if (node !== null && typeof node === 'object') Object.values(node).forEach(v => walkDepth(v, d + 1));
    }

    walk(val, 0);
    walkDepth(val, 0);
    return { keys, depth: maxDepth, arrays, objects, primitives };
  };

  /**
   * Return a new object/array with keys sorted alphabetically.
   *
   * @param {any}    val
   * @param {'asc'|'desc'} [dir='asc']
   * @returns {any}
   */
  JT.sortKeys = function sortKeys(val, dir = 'asc') {
    if (Array.isArray(val)) return val.map(item => JT.sortKeys(item, dir));
    if (val === null || typeof val !== 'object') return val;

    const sorted = Object.keys(val).sort((a, b) =>
      dir === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
    const result = {};
    sorted.forEach(k => { result[k] = JT.sortKeys(val[k], dir); });
    return result;
  };

  /**
   * Copy text to clipboard, returns a Promise.
   * Falls back to execCommand for older browsers.
   *
   * @param {string} text
   * @returns {Promise<void>}
   */
  JT.copyToClipboard = function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Legacy fallback
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('execCommand copy failed'));
      } catch (e) {
        reject(e);
      }
    });
  };

  /**
   * Debounce a function call.
   *
   * @param {Function} fn
   * @param {number}   ms
   * @returns {Function}
   */
  JT.debounce = function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  /**
   * Format a byte count into a human-readable string.
   *
   * @param {number} bytes
   * @returns {string}  e.g. "4.2 KB"
   */
  JT.formatBytes = function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const val = bytes / Math.pow(1024, i);
    return `${val % 1 === 0 ? val : val.toFixed(1)} ${units[i]}`;
  };

  /**
   * Re-export the error utility for direct use in tools.
   */
  JT.extractLineNumber = extractLineNumber;

  /* ── YAML Conversion Engine ───────────────────────────── */

  /**
   * Convert JSON/JS object to YAML string.
   * @param {any} obj
   * @param {number} [indent=2]
   * @returns {{ yaml: string, error: string|null }}
   */
  JT.jsonToYaml = function jsonToYaml(obj, indent = 2) {
    try {
      function stringify(val, depth = 0) {
        const ind = ' '.repeat(depth * indent);
        const type = JT.getType(val);

        if (type === 'null') return 'null';
        if (type === 'boolean') return val ? 'true' : 'false';
        if (type === 'number') return String(val);
        if (type === 'string') {
          if (val === '') return '""';
          if (val.includes('\n') || /[^\w\s\.-]/.test(val) || val === 'true' || val === 'false' || val === 'null' || !isNaN(Number(val))) {
            return JSON.stringify(val);
          }
          return val;
        }

        if (type === 'array') {
          if (val.length === 0) return '[]';
          let lines = [];
          val.forEach(item => {
            const itemType = JT.getType(item);
            if (itemType === 'object') {
              const objStr = stringify(item, depth + 1);
              const trimmed = objStr.trimStart();
              lines.push(`${ind}- ${trimmed}`);
            } else {
              lines.push(`${ind}- ${stringify(item, depth + 1)}`);
            }
          });
          return lines.join('\n');
        }

        if (type === 'object') {
          const keys = Object.keys(val);
          if (keys.length === 0) return '{}';
          let lines = [];
          keys.forEach(k => {
            const v = val[k];
            const vType = JT.getType(v);
            const keyStr = /^\w+$/.test(k) ? k : JSON.stringify(k);
            if (vType === 'object' || vType === 'array') {
              if ((vType === 'object' && Object.keys(v).length === 0) || (vType === 'array' && v.length === 0)) {
                lines.push(`${ind}${keyStr}: ${stringify(v, depth)}`);
              } else {
                lines.push(`${ind}${keyStr}:\n${stringify(v, depth + 1)}`);
              }
            } else {
              lines.push(`${ind}${keyStr}: ${stringify(v, depth)}`);
            }
          });
          return lines.join('\n');
        }

        return '';
      }

      return { yaml: stringify(obj), error: null };
    } catch (e) {
      return { yaml: '', error: e.message || 'YAML serialization failed' };
    }
  };

  /**
   * Lightweight YAML parser to JSON/JS object.
   * @param {string} yamlStr
   * @returns {{ data: any, error: string|null }}
   */
  JT.yamlToJson = function yamlToJson(yamlStr) {
    if (typeof yamlStr !== 'string' || yamlStr.trim() === '') {
      return { data: null, error: 'Input is empty.' };
    }
    try {
      const lines = yamlStr.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
      
      function parseScalar(val) {
        const t = val.trim();
        if (t === 'null' || t === '~' || t === '') return null;
        if (t === 'true') return true;
        if (t === 'false') return false;
        if (!isNaN(Number(t)) && t !== '') return Number(t);
        if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
          return t.slice(1, -1);
        }
        return t;
      }

      function parseLines(startIdx, minIndent) {
        let obj = {};
        let arr = [];
        let mode = null;
        let idx = startIdx;

        while (idx < lines.length) {
          const line = lines[idx];
          const trimmed = line.trim();
          if (trimmed === '' || trimmed.startsWith('#')) { idx++; continue; }

          const indent = line.search(/\S/);
          if (indent < minIndent) break;

          if (trimmed.startsWith('- ')) {
            if (mode === null) mode = 'array';
            const valStr = trimmed.slice(2).trim();
            if (valStr.includes(': ')) {
              const colonIdx = valStr.indexOf(':');
              const k = valStr.slice(0, colonIdx).trim();
              const v = parseScalar(valStr.slice(colonIdx + 1).trim());
              arr.push({ [k]: v });
            } else {
              arr.push(parseScalar(valStr));
            }
            idx++;
          } else if (trimmed.includes(':')) {
            if (mode === null) mode = 'object';
            const colonIdx = trimmed.indexOf(':');
            const key = trimmed.slice(0, colonIdx).trim();
            const valStr = trimmed.slice(colonIdx + 1).trim();

            if (valStr !== '') {
              obj[key] = parseScalar(valStr);
              idx++;
            } else {
              let nextIdx = idx + 1;
              while (nextIdx < lines.length && (lines[nextIdx].trim() === '' || lines[nextIdx].trim().startsWith('#'))) nextIdx++;
              if (nextIdx < lines.length) {
                const subIndent = lines[nextIdx].search(/\S/);
                if (subIndent > indent) {
                  const { data: subVal, newIdx } = parseLines(nextIdx, subIndent);
                  obj[key] = subVal;
                  idx = newIdx;
                } else {
                  obj[key] = null;
                  idx++;
                }
              } else {
                obj[key] = null;
                idx++;
              }
            }
          } else {
            idx++;
          }
        }
        return { data: mode === 'array' ? arr : obj, newIdx: idx };
      }

      const { data } = parseLines(0, 0);
      return { data: data || {}, error: null };
    } catch (e) {
      return { data: null, error: e.message || 'YAML parse error' };
    }
  };

  /* ── XML Conversion Engine ────────────────────────────── */

  /**
   * Convert JSON/JS object to XML string.
   * @param {any} obj
   * @param {string} [rootName='root']
   * @returns {{ xml: string, error: string|null }}
   */
  JT.jsonToXml = function jsonToXml(obj, rootName = 'root') {
    try {
      function escXml(str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      }

      function buildXml(val, name, depth = 1) {
        const ind = '  '.repeat(depth);
        const type = JT.getType(val);

        if (type === 'null') return `${ind}<${name} xsi:nil="true"/>`;
        if (type === 'boolean' || type === 'number' || type === 'string') {
          return `${ind}<${name}>${escXml(val)}</${name}>`;
        }

        if (type === 'array') {
          return val.map(item => buildXml(item, name, depth)).join('\n');
        }

        if (type === 'object') {
          const keys = Object.keys(val);
          if (keys.length === 0) return `${ind}<${name}/>`;
          const children = keys.map(k => {
            const cleanKey = k.replace(/[^\w-]/g, '_');
            return buildXml(val[k], cleanKey, depth + 1);
          }).join('\n');
          return `${ind}<${name}>\n${children}\n${ind}</${name}>`;
        }

        return `${ind}<${name}/>`;
      }

      const cleanRoot = (rootName || 'root').replace(/[^\w-]/g, '_');
      const inner = buildXml(obj, cleanRoot, 0);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${inner}`;
      return { xml, error: null };
    } catch (e) {
      return { xml: '', error: e.message || 'XML serialization failed' };
    }
  };

  /**
   * Convert XML string to JSON/JS object.
   * @param {string} xmlStr
   * @returns {{ data: any, error: string|null }}
   */
  JT.xmlToJson = function xmlToJson(xmlStr) {
    if (typeof xmlStr !== 'string' || xmlStr.trim() === '') {
      return { data: null, error: 'Input is empty.' };
    }
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlStr, 'text/xml');

      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        return { data: null, error: parserError.textContent.split('\n')[0] || 'XML syntax error' };
      }

      function nodeToObj(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          if (!text) return null;
          if (text === 'true') return true;
          if (text === 'false') return false;
          if (!isNaN(Number(text)) && text !== '') return Number(text);
          return text;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const result = {};
          let hasChildElements = false;

          Array.from(node.children).forEach(child => {
            hasChildElements = true;
            const key = child.nodeName;
            const val = nodeToObj(child);
            if (result[key] !== undefined) {
              if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
              }
              result[key].push(val);
            } else {
              result[key] = val;
            }
          });

          if (!hasChildElements) {
            const text = node.textContent.trim();
            if (text === 'true') return true;
            if (text === 'false') return false;
            if (!isNaN(Number(text)) && text !== '') return Number(text);
            return text;
          }

          return result;
        }

        return null;
      }

      const rootNode = doc.documentElement;
      const data = { [rootNode.nodeName]: nodeToObj(rootNode) };
      return { data, error: null };
    } catch (e) {
      return { data: null, error: e.message || 'XML parse error' };
    }
  };

  /* ── TOML Conversion Engine ───────────────────────────── */

  /**
   * Convert JSON/JS object to TOML configuration string.
   * @param {any} obj
   * @returns {{ toml: string, error: string|null }}
   */
  JT.jsonToToml = function jsonToToml(obj) {
    try {
      if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return { toml: '', error: 'TOML root must be a JSON object.' };
      }

      function formatVal(val) {
        const type = JT.getType(val);
        if (type === 'null') return '""';
        if (type === 'boolean') return val ? 'true' : 'false';
        if (type === 'number') return String(val);
        if (type === 'string') return JSON.stringify(val);
        if (type === 'array') return `[${val.map(formatVal).join(', ')}]`;
        return JSON.stringify(val);
      }

      let tomlLines = [];
      let tableBlocks = [];

      function processObject(o, prefix = '') {
        const keys = Object.keys(o);
        keys.forEach(k => {
          const v = o[k];
          const type = JT.getType(v);
          const keyStr = /^[A-Za-z0-9_-]+$/.test(k) ? k : JSON.stringify(k);

          if (type === 'object') {
            const tableHeader = prefix ? `${prefix}.${keyStr}` : keyStr;
            tableBlocks.push({ header: tableHeader, obj: v });
          } else {
            if (!prefix) {
              tomlLines.push(`${keyStr} = ${formatVal(v)}`);
            }
          }
        });
      }

      processObject(obj, '');

      tableBlocks.forEach(block => {
        tomlLines.push(`\n[${block.header}]`);
        const keys = Object.keys(block.obj);
        keys.forEach(k => {
          const v = block.obj[k];
          const type = JT.getType(v);
          const keyStr = /^[A-Za-z0-9_-]+$/.test(k) ? k : JSON.stringify(k);
          if (type !== 'object') {
            tomlLines.push(`${keyStr} = ${formatVal(v)}`);
          } else {
            processObject({ [k]: v }, block.header);
          }
        });
      });

      return { toml: tomlLines.join('\n').trim(), error: null };
    } catch (e) {
      return { toml: '', error: e.message || 'TOML serialization failed' };
    }
  };

  /* ── Expose on global ───────────────────────────────────── */
  global.JT = JT;

})(typeof globalThis !== 'undefined' ? globalThis : window);
