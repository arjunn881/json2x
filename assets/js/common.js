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

  /* ── Expose on global ───────────────────────────────────── */
  global.JT = JT;

})(typeof globalThis !== 'undefined' ? globalThis : window);
