/**
 * JSON2X — Shared Layout / UI Module
 * =========================================
 * Renders the site header (with active-link detection),
 * the mobile nav drawer, the footer, ad slots, and the
 * related-tools grid on every page.
 *
 * Usage: include this script in every tool page AFTER
 * the <body> has its placeholder elements:
 *
 *   <div id="site-header-placeholder"></div>
 *   ...page content...
 *   <div id="related-tools-placeholder" data-current="formatter"></div>
 *   <div id="ad-slot-rectangle-placeholder"></div>
 *   <div id="site-footer-placeholder"></div>
 */

(function () {
  'use strict';

  /* ── Tool registry ────────────────────────────────────────
     Single source of truth for all 17 tools categorized.
     Add / rename tools here — all pages update automatically.
  ────────────────────────────────────────────────────────── */
  const CATEGORIES = [
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

  /* SVG icon strings used in tool cards, mega menu, and related-tools grid */
  const ICON = {
    formatter: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/><rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor"/><rect x="2" y="13" width="12" height="2" rx="1" fill="currentColor"/></svg>`,
    validator:  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    minifier:   `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 3v12M4 8l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    diff:       `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="2" width="6" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="6" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 9h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    converter:  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 6h10M11 3l3 3-3 3M14 12H4M7 9l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'json-converter': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 5h14M2 9h10M2 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="14" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'json-to-ts': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 5h14M2 9h8M2 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 10v5M11 10h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    jsonpath:   `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M9 6v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    schema:     `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="6" y="1" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="1" y="13" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="13" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M9 5v4M9 9H3v4M9 9h6v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    viewer:     `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="4" cy="4" r="1.5" fill="currentColor"/><circle cx="4" cy="9" r="1.5" fill="currentColor"/><circle cx="4" cy="14" r="1.5" fill="currentColor"/><path d="M7 4h7M7 9h5M7 14h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'json-to-csv': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="2" width="14" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M2 7h14M2 11h14M7 7v7" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'csv-to-json': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 5h12M3 9h8M3 13h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 11l3 2-3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'json-to-yaml': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 3h12v12H3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'json-to-xml': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M5 4L2 9l3 5M13 4l3 5-3 5M10 3L8 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'json-to-toml': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 6h4M9 6v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'json-to-sql': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="4" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 7v4c0 1.5 3 3 7 3s7-1.5 7-3V7M2 11v4c0 1.5 3 3 7 3s7-1.5 7-3v-4" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'json-to-code': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M5 4L1 9l4 5M13 4l4 5-4 5M10 2L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'json-mock-generator': `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="6.5" cy="6.5" r="1" fill="currentColor"/><circle cx="11.5" cy="11.5" r="1" fill="currentColor"/><circle cx="9" cy="9" r="1" fill="currentColor"/></svg>`,
  };

  const TOOLS = [
    // ── Format & Validate ───────────────────
    {
      id:    'formatter',
      aliases: ['json-formatter', 'json-beautifier', 'json-prettifier', 'json-fixer', 'json-online-formatter', 'format-json'],
      name:  'JSON Formatter',
      desc:  'Prettify, validate & syntax-highlight JSON',
      category: 'format-validate',
      badge: 'Popular',
      icon:  ICON.formatter,
      href:  '/tools/json-formatter.html',
    },
    {
      id:    'validator',
      aliases: ['json-validator', 'json-checker', 'json-lint', 'json-syntax-checker'],
      name:  'JSON Validator',
      desc:  'RFC 8259 validation with exact line errors',
      category: 'format-validate',
      icon:  ICON.validator,
      href:  '/tools/json-validator.html',
    },
    {
      id:    'minifier',
      aliases: ['json-minifier', 'minify-json', 'json-compressor'],
      name:  'JSON Minifier',
      desc:  'Strip whitespace & compress payload size',
      category: 'format-validate',
      icon:  ICON.minifier,
      href:  '/tools/json-minifier.html',
    },
    {
      id:    'diff',
      aliases: ['json-diff', 'json-compare', 'json-diff-checker', 'compare-json'],
      name:  'JSON Diff',
      desc:  'Compare two JSON objects & highlight diffs',
      category: 'format-validate',
      icon:  ICON.diff,
      href:  '/tools/json-diff.html',
    },

    // ── Data Converters ─────────────────────
    {
      id:    'json-to-csv',
      aliases: ['json-to-csv', 'json2csv', 'json-csv-converter'],
      name:  'JSON to CSV',
      desc:  'Export JSON arrays to downloadable CSV',
      category: 'converters',
      icon:  ICON['json-to-csv'],
      href:  '/tools/json-to-csv.html',
    },
    {
      id:    'csv-to-json',
      aliases: ['csv-to-json', 'csv2json', 'csv-json-converter'],
      name:  'CSV to JSON',
      desc:  'Parse CSV into JSON with type auto-detect',
      category: 'converters',
      icon:  ICON['csv-to-json'],
      href:  '/tools/csv-to-json.html',
    },
    {
      id:    'json-to-yaml',
      aliases: ['json-to-yaml', 'yaml-to-json', 'json2yaml', 'yaml2json'],
      name:  'JSON to YAML',
      desc:  'Convert JSON to clean YAML and vice versa',
      category: 'converters',
      icon:  ICON['json-to-yaml'],
      href:  '/tools/json-to-yaml.html',
    },
    {
      id:    'json-to-xml',
      aliases: ['json-to-xml', 'xml-to-json', 'json2xml', 'xml2json'],
      name:  'JSON to XML',
      desc:  'Convert JSON objects into valid XML trees',
      category: 'converters',
      icon:  ICON['json-to-xml'],
      href:  '/tools/json-to-xml.html',
    },
    {
      id:    'json-to-toml',
      aliases: ['json-to-toml', 'json2toml'],
      name:  'JSON to TOML',
      desc:  'Convert JSON into TOML configuration files',
      category: 'converters',
      icon:  ICON['json-to-toml'],
      href:  '/tools/json-to-toml.html',
    },
    {
      id:    'json-to-sql',
      aliases: ['json-to-sql', 'json2sql', 'json-sql-converter'],
      name:  'JSON to SQL',
      desc:  'Generate CREATE TABLE & INSERT statements',
      category: 'converters',
      icon:  ICON['json-to-sql'],
      href:  '/tools/json-to-sql.html',
    },

    // ── Code & Schema Generators ────────────
    {
      id:    'json-converter',
      aliases: ['json-converter', 'multi-converter', 'json-to-all'],
      name:  'JSON Multi-Converter',
      desc:  'TS, Zod, Mongoose, SQL, OpenAPI, Schema & Mock',
      category: 'generators',
      badge: '7-in-1',
      icon:  ICON['json-converter'],
      href:  '/tools/json-converter.html',
    },
    {
      id:    'json-to-ts',
      aliases: ['typescript-generator', 'json-to-typescript', 'json-to-zod'],
      name:  'JSON to TypeScript',
      desc:  'Generate TS interfaces, types & Zod schemas',
      category: 'generators',
      icon:  ICON['json-to-ts'],
      href:  '/tools/typescript-generator.html',
    },
    {
      id:    'json-to-code',
      aliases: ['json-to-code', 'json-to-go', 'json-to-rust', 'json-to-python'],
      name:  'JSON to Code',
      desc:  'Generate Go, Rust Serde & Python Pydantic models',
      category: 'generators',
      icon:  ICON['json-to-code'],
      href:  '/tools/json-to-code.html',
    },
    {
      id:    'schema',
      aliases: ['json-schema-generator', 'json-schema', 'schema-generator'],
      name:  'JSON Schema Generator',
      desc:  'Infer Draft-07 JSON Schema specifications',
      category: 'generators',
      icon:  ICON.schema,
      href:  '/tools/json-schema-generator.html',
    },
    {
      id:    'json-mock-generator',
      aliases: ['json-mock-generator', 'fake-json', 'mock-json'],
      name:  'JSON Mock Generator',
      desc:  'Generate realistic synthetic test datasets',
      category: 'generators',
      icon:  ICON['json-mock-generator'],
      href:  '/tools/json-mock-generator.html',
    },

    // ── Query & Inspection ──────────────────
    {
      id:    'jsonpath',
      aliases: ['jsonpath', 'jsonpath-evaluator', 'jsonpath-tester'],
      name:  'JSONPath Tester',
      desc:  'Test & debug JSONPath queries interactively',
      category: 'query-view',
      icon:  ICON.jsonpath,
      href:  '/tools/jsonpath.html',
    },
    {
      id:    'viewer',
      aliases: ['json-tree-viewer', 'json-viewer', 'json-tree'],
      name:  'JSON Tree Viewer',
      desc:  'Explore JSON as an interactive collapsible tree',
      category: 'query-view',
      icon:  ICON.viewer,
      href:  '/tools/json-tree-viewer.html',
    },
  ];


  /* ── Detect current page ──────────────────────────────────
     Match the page's <main data-tool="id"> attribute or the
     related-tools placeholder's data-current attribute.
  ────────────────────────────────────────────────────────── */
  function getCurrentToolId() {
    const main = document.querySelector('main[data-tool]');
    if (main) {
      const dt = main.dataset.tool;
      const found = TOOLS.find(t => t.id === dt || (t.aliases && t.aliases.includes(dt)));
      if (found) return found.id;
      return dt;
    }
    const placeholder = document.getElementById('related-tools-placeholder');
    if (placeholder) return placeholder.dataset.current || '';
    return '';
  }

  function resolveHref(path) {
    if (!path) return '/';
    return path.startsWith('/') ? path : '/' + path;
  }

  /* SVG Icons for Trust & Navigation */
  const SVG = {
    about: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 14V3a1 1 0 011-1h6a1 1 0 011 1v11M2 14h12M10 6h4a1 1 0 011 1v7M5 5h2M5 8h2M5 11h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    contact: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 5l6 4 6-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    privacy: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    terms: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h6l4 4v8a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 013 14V3.5A1.5 1.5 0 014.5 2z" stroke="currentColor" stroke-width="1.3"/><path d="M6 7h4M6 10h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    disclaimer: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2l6 11H2L8 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    license: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    faq: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  };

  /* Theme icons */
  const SUN_ICON = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.34 3.34l1.42 1.42M13.24 13.24l1.42 1.42M3.34 14.66l1.42-1.42M13.24 4.76l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  const MOON_ICON = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M15.5 10.5A7 7 0 1 1 7.5 2.5a5.5 5.5 0 0 0 8 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ── Theme Management ───────────────────────────────────── */
  function getStoredTheme() {
    try { return localStorage.getItem('jsontoolkit_theme'); } catch (e) { return null; }
  }

  function getEffectiveTheme() {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme, isManual) {
    document.documentElement.setAttribute('data-theme', theme);
    if (isManual) {
      try { localStorage.setItem('jsontoolkit_theme', theme); } catch (e) {}
    }
    updateThemeToggleUI(theme);
  }

  function updateThemeToggleUI(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    btn.setAttribute('title', `Switch to ${nextTheme} theme`);
    btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
  }

  /* ── Multi-Language (i18n) Helper ────────────────────────*/
  function getI18nLanguages() {
    const i18n = window.JSON2X_I18N;
    return (i18n && i18n.LANGUAGES) ? i18n.LANGUAGES : [
      { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
      { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
      { code: 'zh', name: '简体中文', flag: '🇨🇳', dir: 'ltr' },
      { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
      { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
      { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
      { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
    ];
  }

  function renderLanguagePicker() {
    const languages = getI18nLanguages();
    const i18n = window.JSON2X_I18N;
    const currentCode = (i18n && typeof i18n.getLanguage === 'function') ? i18n.getLanguage() : (document.documentElement.getAttribute('lang') || 'en');
    const currentLang = languages.find(l => l.code === currentCode) || languages[0];

    const menuItemsHtml = languages.map(l => {
      const active = l.code === currentCode ? ' active' : '';
      return `
        <button class="lang-picker__item${active}" data-lang="${l.code}" role="menuitem" aria-label="${l.name}">
          <span class="lang-picker__flag" aria-hidden="true">${l.flag}</span>
          <span class="lang-picker__item-name">${l.name}</span>
        </button>`;
    }).join('');

    return `
    <div class="lang-picker" id="lang-picker-wrapper">
      <button class="lang-picker__btn" id="lang-picker-btn" aria-label="Language: ${currentLang.name}" aria-haspopup="true" aria-expanded="false" title="Change Language / 语言 / Idioma">
        <span class="lang-picker__flag" id="lang-current-flag" aria-hidden="true">${currentLang.flag}</span>
        <span class="lang-picker__code" id="lang-current-code">${currentLang.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="lang-picker__menu" id="lang-picker-menu" role="menu" aria-label="Select Language">
        ${menuItemsHtml}
      </div>
    </div>`;
  }

  /* ── Render: Site Header ──────────────────────────────────*/
  function renderHeader(currentId) {
    const currentTheme = getEffectiveTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const toggleIcon = currentTheme === 'dark' ? SUN_ICON : MOON_ICON;

    const languages = getI18nLanguages();
    const i18n = window.JSON2X_I18N;
    const currentLangCode = (i18n && typeof i18n.getLanguage === 'function') ? i18n.getLanguage() : (document.documentElement.getAttribute('lang') || 'en');

    const COMPANY_LINKS = [
      { id: 'about',      name: 'About Us',          href: '/about.html',      icon: SVG.about },
      { id: 'faq',        name: 'FAQ',               href: '/faq.html',        icon: SVG.faq },
      { id: 'contact',    name: 'Contact',           href: '/contact.html',    icon: SVG.contact },
      { id: 'privacy',    name: 'Privacy Policy',     href: '/privacy.html',    icon: SVG.privacy },
      { id: 'terms',      name: 'Terms & Conditions', href: '/terms.html',      icon: SVG.terms },
      { id: 'disclaimer', name: 'Disclaimer',        href: '/disclaimer.html', icon: SVG.disclaimer },
      { id: 'license',    name: 'License',           href: '/license.html',    icon: SVG.license },
    ];

    const isAnyToolActive = TOOLS.some(t => t.id === currentId || (t.aliases && t.aliases.includes(currentId)));

    // Categorized Columns for Mega-Menu
    const megaMenuColsHtml = CATEGORIES.map(cat => {
      const catTools = TOOLS.filter(t => t.category === cat.id);
      const toolsHtml = catTools.map(t => {
        const active = (t.id === currentId || (t.aliases && t.aliases.includes(currentId))) ? ' active' : '';
        const badgeHtml = t.badge ? `<span class="mega-menu__item-badge">${t.badge}</span>` : '';
        return `
          <a class="mega-menu__item${active}" href="${resolveHref(t.href)}" role="menuitem">
            <span class="mega-menu__item-icon" aria-hidden="true">${t.icon}</span>
            <span class="mega-menu__item-info">
              <span class="mega-menu__item-name">${t.name} ${badgeHtml}</span>
              <span class="mega-menu__item-desc">${t.desc}</span>
            </span>
          </a>`;
      }).join('');

      return `
        <div class="mega-menu__col">
          <div class="mega-menu__cat-head">
            <span class="mega-menu__cat-icon" aria-hidden="true">${cat.icon}</span>
            <span class="mega-menu__cat-title">${cat.name}</span>
          </div>
          ${toolsHtml}
        </div>`;
    }).join('');

    // Categorized Mobile Drawer Navigation
    const mobileCategoriesHtml = CATEGORIES.map(cat => {
      const catTools = TOOLS.filter(t => t.category === cat.id);
      const linksHtml = catTools.map(t => {
        const active = (t.id === currentId || (t.aliases && t.aliases.includes(currentId))) ? ' active' : '';
        const badgeText = t.badge ? ` <span style="font-size:9px;background:var(--accent);color:#fff;padding:1px 4px;border-radius:3px;margin-left:4px;">${t.badge}</span>` : '';
        return `<a class="mobile-nav__link${active}" href="${resolveHref(t.href)}">${t.icon} ${t.name}${badgeText}</a>`;
      }).join('\n          ');

      return `
      <div class="mobile-nav__cat">
        <div class="mobile-nav__cat-head">
          <span>${cat.name}</span>
          <span style="font-size:10px;opacity:0.7;">${catTools.length} tools</span>
        </div>
        <div class="mobile-nav__cat-links">
          ${linksHtml}
        </div>
      </div>`;
    }).join('\n      ');

    const companyMobileLinks = COMPANY_LINKS.map(c => {
      const active = c.id === currentId ? ' active' : '';
      return `<a class="mobile-nav__link${active}" href="${resolveHref(c.href)}">${c.icon} ${c.name}</a>`;
    }).join('\n        ');

    const mobileLangButtons = languages.map(l => {
      const active = l.code === currentLangCode ? ' active' : '';
      return `<button class="mobile-nav__lang-btn${active}" data-lang="${l.code}"><span>${l.flag}</span><span>${l.name}</span></button>`;
    }).join('\n        ');

    return `
<div class="top-bar" role="navigation" aria-label="Utility navigation">
  <div class="container top-bar__inner">
    <div id="live-user-clock" class="top-bar__clock" title="Live Local Time" aria-label="Live local time"></div>
    <div class="top-bar__links">
      <a href="${resolveHref('/about.html')}" class="top-bar__link${currentId === 'about' ? ' active' : ''}">${SVG.about} About Us</a>
      <a href="${resolveHref('/faq.html')}" class="top-bar__link${currentId === 'faq' ? ' active' : ''}">${SVG.faq} FAQ</a>
      <a href="${resolveHref('/contact.html')}" class="top-bar__link${currentId === 'contact' ? ' active' : ''}">${SVG.contact} Contact</a>
      <a href="${resolveHref('/privacy.html')}" class="top-bar__link${currentId === 'privacy' ? ' active' : ''}">${SVG.privacy} Privacy Policy</a>
      <a href="${resolveHref('/terms.html')}" class="top-bar__link${currentId === 'terms' ? ' active' : ''}">${SVG.terms} Terms &amp; Conditions</a>
      <a href="${resolveHref('/disclaimer.html')}" class="top-bar__link${currentId === 'disclaimer' ? ' active' : ''}">${SVG.disclaimer} Disclaimer</a>
      <a href="${resolveHref('/license.html')}" class="top-bar__link${currentId === 'license' ? ' active' : ''}">${SVG.license} License</a>
    </div>
    ${renderLanguagePicker()}
  </div>
</div>
<header class="site-header" role="banner">
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <div class="container site-header__inner">
    <a href="${resolveHref('/index.html')}" class="site-header__logo" aria-label="JSON2X Home">
      <span class="logo-icon" aria-hidden="true">{2X}</span>
      JSON<span style="color:var(--accent)">2X</span>
    </a>

    <nav class="site-nav" aria-label="Primary navigation">
      <a class="site-nav__link${currentId === 'tools-index' ? ' active' : ''}" href="${resolveHref('/tools/index.html')}">Catalog</a>
      <a class="site-nav__link${currentId === 'docs' ? ' active' : ''}" href="${resolveHref('/docs/index.html')}">Docs</a>
      <a class="site-nav__link${currentId === 'kb' ? ' active' : ''}" href="${resolveHref('/kb/index.html')}">Knowledge Base</a>
      <a class="site-nav__link${currentId === 'blog' ? ' active' : ''}" href="${resolveHref('/blog/index.html')}">Blog</a>
    </nav>

    <button class="header-search-btn" id="header-search-btn" aria-label="Search tools and guides (Ctrl+K)" title="Quick Search (Ctrl+K)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span class="header-search-text">Search tools...</span>
      <kbd class="header-search-kbd">Ctrl K</kbd>
    </button>
    <button class="theme-toggle" id="theme-toggle" aria-label="Switch to ${nextTheme} theme" title="Switch to ${nextTheme} theme">
      ${toggleIcon}
    </button>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-nav">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="5"  width="16" height="2" rx="1" fill="currentColor"/>
        <rect x="2" y="9"  width="16" height="2" rx="1" fill="currentColor"/>
        <rect x="2" y="13" width="16" height="2" rx="1" fill="currentColor"/>
      </svg>
    </button>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
  <div style="padding:var(--space-2) var(--space-3);margin-bottom:var(--space-2);background:var(--bg-raised);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:space-between;">
    <a href="${resolveHref('/tools/index.html')}" style="font-weight:var(--font-bold);color:var(--accent);text-decoration:none;font-size:var(--text-sm);">Browse All 17 Tools Catalog →</a>
  </div>
  <div class="mobile-nav__cat">
    <div class="mobile-nav__cat-head"><span>Language / 语言 / Idioma</span></div>
    <div class="mobile-nav__lang">
      ${mobileLangButtons}
    </div>
  </div>
  ${mobileCategoriesHtml}
  <span class="mobile-nav__sep" aria-hidden="true"></span>
  <div class="mobile-nav__cat">
    <div class="mobile-nav__cat-head"><span>Resources &amp; Guides</span></div>
    <div class="mobile-nav__cat-links">
      <a class="mobile-nav__link${currentId === 'docs' ? ' active' : ''}" href="${resolveHref('/docs/index.html')}">Documentation Hub</a>
      <a class="mobile-nav__link${currentId === 'kb' ? ' active' : ''}" href="${resolveHref('/kb/index.html')}">Knowledge Base Hub</a>
      <a class="mobile-nav__link${currentId === 'blog' ? ' active' : ''}" href="${resolveHref('/blog/index.html')}">Blog &amp; Tutorials</a>
    </div>
  </div>
  <span class="mobile-nav__sep" aria-hidden="true"></span>
  <div class="mobile-nav__cat">
    <div class="mobile-nav__cat-head"><span>Company &amp; Legal</span></div>
    <div class="mobile-nav__cat-links">
      ${companyMobileLinks}
    </div>
  </div>
</nav>`;
  }

  /* ── Render: Footer ───────────────────────────────────────*/
  function renderFooter() {
    const year = new Date().getFullYear();
    const toolLinks = TOOLS.map(t =>
      `<a href="${resolveHref(t.href)}" class="footer-col__link">${t.name}</a>`
    ).join('\n          ');

    return `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="site-footer__grid">
      <div class="footer-col">
        <a href="${resolveHref('/index.html')}" class="site-header__logo" style="margin-bottom: var(--space-3)">
          <span class="logo-icon" aria-hidden="true">{2X}</span>
          JSON<span style="color:var(--accent)">2X</span>
        </a>
        <p class="footer-brand__tagline">Fast, free, browser-only JSON &amp; CSV utilities. No data leaves your machine.</p>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Developer Tools</h2>
        <div class="footer-col__links">
          ${toolLinks}
          <a href="${resolveHref('/tools/index.html')}" class="footer-col__link" style="color:var(--accent)">All Tools Index →</a>
        </div>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Error Troubleshooting</h2>
        <div class="footer-col__links">
          <a href="${resolveHref('/errors/unexpected-token.html')}" class="footer-col__link">Unexpected Token Fix</a>
          <a href="${resolveHref('/errors/trailing-comma.html')}" class="footer-col__link">Trailing Comma Fix</a>
          <a href="${resolveHref('/errors/invalid-character.html')}" class="footer-col__link">Invalid Character Fix</a>
          <a href="${resolveHref('/errors/unexpected-end.html')}" class="footer-col__link">Unexpected End Fix</a>
          <a href="${resolveHref('/errors/index.html')}" class="footer-col__link" style="color:var(--accent)">Error Knowledge Base →</a>
        </div>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Guides &amp; Reference</h2>
        <div class="footer-col__links">
          <a href="${resolveHref('/blog/json-guides.html')}" class="footer-col__link">JSON RFC 8259 Specs</a>
          <a href="${resolveHref('/blog/tutorials.html')}" class="footer-col__link">TypeScript Schema Tutorial</a>
          <a href="${resolveHref('/docs/index.html')}" class="footer-col__link">Documentation Hub</a>
          <a href="${resolveHref('/kb/index.html')}" class="footer-col__link">Knowledge Base Hub</a>
          <a href="${resolveHref('/blog/index.html')}" class="footer-col__link" style="color:var(--accent)">Blog &amp; Tutorials →</a>
        </div>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Trust &amp; Governance</h2>
        <div class="footer-col__links">
          <a href="${resolveHref('/faq.html')}" class="footer-col__link">Frequently Asked Questions</a>
          <a href="${resolveHref('/contact.html')}" class="footer-col__link">Contact &amp; Support</a>
          <a href="${resolveHref('/security.html')}" class="footer-col__link">Security Architecture</a>
          <a href="${resolveHref('/editorial-policy.html')}" class="footer-col__link">Editorial Policy</a>
          <a href="${resolveHref('/changelog.html')}" class="footer-col__link">Version History</a>
          <a href="${resolveHref('/roadmap.html')}" class="footer-col__link">Feature Roadmap</a>
          <a href="${resolveHref('/open-source.html')}" class="footer-col__link">Open Source</a>
        </div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p class="site-footer__copy">© ${year} JSON2X. All processing happens locally in your browser.</p>
      <div class="site-footer__legal">
        <a href="${resolveHref('/about.html')}">About Us</a>
        <a href="${resolveHref('/faq.html')}">FAQ</a>
        <a href="${resolveHref('/contact.html')}">Contact</a>
        <a href="${resolveHref('/privacy.html')}">Privacy Policy</a>
        <a href="${resolveHref('/terms.html')}">Terms</a>
        <a href="${resolveHref('/disclaimer.html')}">Disclaimer</a>
        <a href="${resolveHref('/license.html')}">License</a>
      </div>
    </div>
  </div>
</footer>`;
  }

  /* ── Contextual Inline Internal Linking Engine ──────────── */
  function autoLinkProse() {
    const proseEls = document.querySelectorAll('.faq-prose, .tool-section p, .faq-card__a');
    if (!proseEls || proseEls.length === 0) return;

    const linkRules = [
      { phrase: 'JSON Formatter', url: '/tools/json-formatter.html' },
      { phrase: 'JSON Validator', url: '/tools/json-validator.html' },
      { phrase: 'JSON Minifier', url: '/tools/json-minifier.html' },
      { phrase: 'JSON Diff', url: '/tools/json-diff.html' },
      { phrase: 'JSON to CSV', url: '/tools/json-to-csv.html' },
      { phrase: 'CSV to JSON', url: '/tools/csv-to-json.html' },
      { phrase: 'JSON to TypeScript', url: '/tools/typescript-generator.html' },
      { phrase: 'JSONPath', url: '/tools/jsonpath.html' },
      { phrase: 'JSON Schema', url: '/tools/json-schema-generator.html' },
      { phrase: 'Tree Viewer', url: '/tools/json-tree-viewer.html' },
      { phrase: 'Unexpected token', url: '/errors/unexpected-token.html' },
      { phrase: 'trailing comma', url: '/errors/trailing-comma.html' }
    ];

    proseEls.forEach(el => {
      if (el.querySelector('a') && el.children.length > 2) return; // avoid over-linking linked blocks
      let html = el.innerHTML;
      linkRules.forEach(rule => {
        const regex = new RegExp(`(?<!<[^>]*)\\b(${rule.phrase})\\b(?![^<]*?>)`, 'i');
        if (regex.test(html) && !html.includes(`href="${resolveHref(rule.url)}"`)) {
          html = html.replace(regex, `<a href="${resolveHref(rule.url)}" style="color:var(--accent);text-decoration:underline;">$1</a>`);
        }
      });
      el.innerHTML = html;
    });
  }

  /* ── Render: Ad Slot ──────────────────────────────────────*/
  /**
   * Build an ad slot placeholder element.
   * In production, replace the inner content with your AdSense
   * <ins class="adsbygoogle"> tag.
   *
   * @param {'leaderboard'|'rectangle'} type
   * @param {string} slotId  - AdSense data-ad-slot value
   * @returns {string} HTML
   */
  function renderAdSlot(type, slotId) {
    return '';
  }

  /* ── Render: Related Tools Grid ───────────────────────────*/
  function renderRelatedTools(currentId) {
    const isCatalogPage = !currentId || currentId === 'tools-index';
    const list = isCatalogPage ? TOOLS : TOOLS.filter(t => t.id !== currentId);
    const titleText = isCatalogPage ? 'All JSON & CSV Developer Tools' : 'More JSON & CSV Tools';
    const cards = list.map(t => `
    <a class="tool-card" href="${resolveHref(t.href)}" aria-label="${t.name}: ${t.desc}">
      <div class="tool-card__icon" aria-hidden="true">${t.icon}</div>
      <div>
        <div class="tool-card__name">${t.name}</div>
        <div class="tool-card__desc">${t.desc}</div>
      </div>
    </a>`).join('');

    return `
<section class="related-tools" aria-label="${titleText}">
  <h2 class="related-tools__title">${titleText}</h2>
  <div class="related-tools__grid">
    ${cards}
  </div>
</section>`;
  }


  /* ── Dynamic Tool Deep Dive 15-Section Component Engine ────
     Generates Benefits, Features, Examples, Use Cases, Best Practices,
     Common Mistakes, Performance Notes, FAQ, Related Guides, and CTAs.
  ────────────────────────────────────────────────────────── */
  function renderToolDeepDiveSections(currentId) {
    if (!currentId) return '';

    const tool = TOOLS.find(t => t.id === currentId || (t.aliases && t.aliases.includes(currentId)));
    if (!tool) return '';

    return `
<article class="tool-deep-dive">
  <!-- 1. Benefits -->
  <section class="tool-section">
    <h2 class="tool-section__title">Why Developers Trust ${tool.name}</h2>
    <p class="tool-section__desc">Engineered for high-performance engineering teams, API architects, and data engineers requiring instant, reliable, and zero-compromise client-side processing.</p>
    <div class="tool-grid--3col">
      <div class="tool-box">
        <h3 class="tool-box__title"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>100% Client-Side Privacy</h3>
        <p class="tool-box__desc">Your data never leaves your browser. Zero API calls, zero server logs, and zero third-party tracking guarantee absolute confidentiality for sensitive payloads.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M9 1L2 9h6l-1 6 7-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>Web Worker Execution</h3>
        <p class="tool-box__desc">Large payloads up to 100MB are offloaded to dedicated background threads, ensuring main UI responsiveness without browser freeze or input latency.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>RFC 8259 Precision</h3>
        <p class="tool-box__desc">Strict compliance with official JSON standards. Receive exact line and column numbers for syntax errors with actionable resolution hints.</p>
      </div>
    </div>
  </section>

  <!-- 2. Features -->
  <section class="tool-section">
    <h2 class="tool-section__title">Key Technical Capabilities</h2>
    <div class="tool-grid--2col">
      <div class="tool-box">
        <h3 class="tool-box__title">Customizable Formatting &amp; Indentation</h3>
        <p class="tool-box__desc">Switch seamlessly between 2-space, 4-space, tab indentation, or compact minification mode to fit your team's code style conventions.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title">Line-by-Line Error Pinpointing</h3>
        <p class="tool-box__desc">Never guess where a syntax error occurred. Automatically highlight broken quotes, missing commas, or invalid brackets with precise line markers.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title">One-Click Export &amp; Clipboard Sync</h3>
        <p class="tool-box__desc">Instantly copy formatted results to your system clipboard or export clean .json/.csv files directly to disk with zero network roundtrips.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title">Drag &amp; Drop File Loader</h3>
        <p class="tool-box__desc">Drag heavy JSON or CSV files directly into the editor. Files are read locally using the HTML5 File API for maximum efficiency.</p>
      </div>
    </div>
  </section>

  <!-- 3. Examples -->
  <section class="tool-section">
    <h2 class="tool-section__title">Input &amp; Output Transformation Examples</h2>
    <p class="tool-section__desc">See how ${tool.name} cleanses and transforms unformatted raw data into clean, structured output.</p>
    <div class="tool-grid--2col">
      <div>
        <h3 class="tool-box__title">Raw Input Sample</h3>
        <div class="tool-code-example">{"user":{"id":101,"name":"Alice","roles":["admin","dev"]},"status":"active"}</div>
      </div>
      <div>
        <h3 class="tool-box__title">Formatted Output Result</h3>
        <div class="tool-code-example">{
  "user": {
    "id": 101,
    "name": "Alice",
    "roles": [
      "admin",
      "dev"
    ]
  },
  "status": "active"
}</div>
      </div>
    </div>
  </section>

  <!-- 4. Use Cases -->
  <section class="tool-section">
    <h2 class="tool-section__title">Common Developer Use Cases</h2>
    <div class="tool-grid--3col">
      <div class="tool-box">
        <h3 class="tool-box__title">REST API Debugging</h3>
        <p class="tool-box__desc">Inspect minified API responses from Postman, cURL, or browser network devtools with clean, syntax-highlighted indentation.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title">Configuration Audit</h3>
        <p class="tool-box__desc">Validate package.json, tsconfig.json, or application config files prior to deployment to catch syntax errors early.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title">Data Pipeline Migration</h3>
        <p class="tool-box__desc">Prepare clean structured datasets for database ingestion, analytics pipelines, or frontend state hydration.</p>
      </div>
    </div>
  </section>

  <!-- 5. Best Practices -->
  <section class="tool-section">
    <h2 class="tool-section__title">Best Practices for Clean Data Pipelines</h2>
    <div class="faq-prose">
      <ul>
        <li><strong>Enforce Double Quotes:</strong> JSON keys and string values strictly require standard double quotes (<code>"key": "value"</code>).</li>
        <li><strong>Eliminate Trailing Commas:</strong> Ensure array and object terminations do not end with a trailing comma.</li>
        <li><strong>Escape Special Characters:</strong> Control characters, newlines, and quotes inside strings must be escaped properly (e.g. <code>\\n</code>, <code>\\"</code>).</li>
        <li><strong>Validate Before Deployment:</strong> Run payload schemas through validation checks to avoid runtime <code>SyntaxError</code> crashes in production APIs.</li>
      </ul>
    </div>
  </section>

  <!-- 6. Common Mistakes & Troubleshooting -->
  <section class="tool-section">
    <h2 class="tool-section__title">Common Mistakes &amp; Troubleshooting</h2>
    <div class="tool-grid--2col">
      <div class="tool-box">
        <h3 class="tool-box__title">Unexpected Token Errors</h3>
        <p class="tool-box__desc">Caused by single quotes or unquoted keys. Read our full guide on <a href="${resolveHref('/errors/unexpected-token.html')}" style="color:var(--accent)">fixing Unexpected Token JSON errors</a>.</p>
      </div>
      <div class="tool-box">
        <h3 class="tool-box__title">Trailing Comma Violations</h3>
        <p class="tool-box__desc">Strict JSON parsers reject trailing commas. Learn how to resolve <a href="${resolveHref('/errors/trailing-comma.html')}" style="color:var(--accent)">trailing comma errors</a>.</p>
      </div>
    </div>
  </section>

  <!-- 7. Performance Notes -->
  <section class="tool-section">
    <h2 class="tool-section__title">Performance &amp; Architecture Notes</h2>
    <p class="tool-section__desc">Our parser utilizes single-pass O(N) streaming tokenizer algorithms running inside dedicated Web Workers. Memory footprint is strictly bounded to O(1) overhead above input size, guaranteeing smooth performance on low-spec mobile devices and enterprise workstations alike.</p>
  </section>

  <!-- 8. Tool Specific FAQs (Auto-harvested for JSON-LD FAQPage Schema) -->
  <section class="tool-section">
    <h2 class="tool-section__title">Frequently Asked Questions &amp; Keyword Solutions</h2>
    <div class="faq-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-6);">
      ${(function() {
        const TOOL_FAQS = {
          formatter: [
            { q: "How to format JSON online free?", a: "Paste your raw, unformatted, or minified JSON text into JSON2X's Formatter. The tool instantly tokenizes the payload using a single-pass streaming parser and applies 2-space, 4-space, or tab indentation with full syntax highlighting. Real-time linter integration flags structural issues immediately in your browser with zero network transmission." },
            { q: "What is the best online JSON formatter?", a: "JSON2X is engineered as the premier online JSON formatter for professional developers because it executes 100% client-side inside your browser's V8 JavaScript engine. By leveraging dedicated Web Worker threads, JSON2X can format and syntax-highlight multi-megabyte payloads up to 100MB+ without causing UI lag, page freezing, or telemetry tracking." },
            { q: "How to format JSON in VSCode and Notepad++?", a: "In Visual Studio Code, open your JSON document and press `Shift + Alt + F` on Windows/Linux or `Shift + Option + F` on macOS (or right-click and select 'Format Document'). In Notepad++, install the 'JSTool' or 'JSON Viewer' plugin from Plugins Admin, then press `Ctrl + Alt + M` to format the active buffer." },
            { q: "How to format JSON in Python and JavaScript?", a: "In Python, use `json.dumps(data, indent=2, sort_keys=True)` from the standard `json` library to produce clean indented strings. In JavaScript or Node.js, use `JSON.stringify(data, null, 2)` where the third argument specifies the indentation level or a custom tab string." },
            { q: "Why is my JSON formatting failing with a syntax error?", a: "The most common causes of JSON parsing failures are: (1) using single quotes `'key'` instead of double quotes `\"key\"` as mandated by RFC 8259, (2) trailing commas after the final object property or array item, (3) unescaped control characters such as raw newlines inside string literals, or (4) missing colons between keys and values. JSON2X highlights the precise line and column index of any syntax deviation." },
            { q: "How to format large 100MB+ JSON files without crashing the browser?", a: "JSON2X offloads parsing to a background Web Worker thread using chunked streaming tokenization. This decouples CPU-heavy parsing from the DOM render loop, preventing browser tab freezes and 'Out of Memory' crashes when handling massive log files or database dumps." },
            { q: "Is client-side JSON formatting secure for sensitive API keys and tokens?", a: "Yes, JSON2X offers 100% air-gapped security. No network requests, API calls, or analytics beacons are sent with your data. All JSON parsing, linting, and AST manipulations occur solely within your local browser's volatile RAM memory." },
            { q: "How to sort JSON keys alphabetically while formatting?", a: "Click the 'Sort Keys' toggle button in the toolbar. The formatter performs a recursive traversal across the JSON Abstract Syntax Tree (AST), sorting object keys in ascending lexicographical (A→Z) order while strictly preserving array element sequences." }
          ],
          validator: [
            { q: "How to validate JSON syntax online against RFC 8259?", a: "Paste your JSON payload into our JSON Validator. The engine executes a strict RFC 8259 compliant single-pass parser that inspects every token, verifying double-quoted keys, valid numeric representations, unescaped characters, and balanced braces with line and column accuracy." },
            { q: "Why are single quotes invalid in JSON?", a: "IETF RFC 8259 Section 7 strictly mandates double quotes (`\"`) for both object keys and string values. While single quotes (`'`) are valid in JavaScript object literals, JSON is a strict data interchange format designed for cross-language compatibility where single quotes are rejected." },
            { q: "How to fix 'SyntaxError: Unexpected token' in JSON?", a: "An 'Unexpected token' error indicates that the parser encountered a character where a structural delimiter was expected. Check for unquoted keys (`{ name: \"John\" }`), single-quoted strings, unescaped quotes inside values (`\"He said \"hello\"\"` should be `\"He said \\\"hello\\\"\"`), or missing commas between properties." },
            { q: "How to fix trailing commas in JSON arrays and objects?", a: "Remove the trailing comma following the last element in your array (`[1, 2, 3,]` → `[1, 2, 3]`) or object (`{ \"a\": 1, }` → `{ \"a\": 1 }`). Unlike ECMAScript 5+ and JSON5, standard JSON grammar forbids trailing commas." },
            { q: "How to validate JSON in Node.js, Python, and Go?", a: "In Node.js, wrap `JSON.parse(str)` in a `try/catch` block. In Python, use `try: json.loads(str) except json.JSONDecodeError as e: ...`. In Go, use `err := json.Unmarshal([]byte(str), &target)` and inspect `err` for syntax or type mismatch errors." },
            { q: "What is the difference between JSON validation and JSON Schema validation?", a: "JSON validation checks whether a document is well-formed according to RFC 8259 syntax rules. In contrast, JSON Schema validation (Draft-07/2020-12) checks whether the data adheres to domain rules—such as required fields, numeric ranges, regex patterns, and string formats like email or URI." },
            { q: "How to fix invalid escape sequences in JSON strings?", a: "JSON strings allow only eight valid escape sequences: `\\\"`, `\\\\`, `\\/`, `\\b`, `\\f`, `\\n`, `\\r`, `\\t`, and unicode escapes `\\uXXXX`. Any other raw backslash (e.g. in Windows file paths like `C:\\Users\\...`) must be escaped as double backslashes `C:\\\\Users\\\\...`." }
          ],
          minifier: [
            { q: "How to minify JSON online free?", a: "Paste your formatted JSON payload into our JSON Minifier and click Minify JSON. The engine strips all non-structural whitespace, line breaks, indentation tabs, and carriage returns, generating a single-line compact payload while calculating byte savings in real time." },
            { q: "How much network bandwidth does JSON minification save?", a: "Minification typically eliminates 25% to 45% of raw payload size by removing whitespace. When served over HTTP with gzip or Brotli compression enabled, minified JSON payloads compress even more efficiently, reducing bandwidth costs and API response latency." },
            { q: "How to minify JSON in Linux terminal with jq?", a: "Run `jq -c . input.json > output.min.json` in your bash or zsh terminal. The `-c` flag instructs jq to output compact JSON with all indentation and line breaks stripped." },
            { q: "Does minifying JSON alter data values or numeric precision?", a: "No. The minifier preserves every string literal, 64-bit floating-point number, boolean flag, and null value byte-for-byte without truncating decimal digits or modifying string encodings." },
            { q: "How to minify JSON in Python with json.dumps?", a: "In Python, pass `separators=(',', ':')` to `json.dumps()`: `minified_str = json.dumps(data, separators=(',', ':'))`. This suppresses the default whitespace after commas and colons." },
            { q: "What is the difference between JSON minification and Gzip compression?", a: "Minification is a compile/application-time syntactic optimization that removes structural whitespace. Gzip and Brotli are transport-layer byte stream compression algorithms. Combining both ensures minimum HTTP transfer size." },
            { q: "How to unminify or beautify a minified JSON file?", a: "Paste the minified single-line string into JSON2X Formatter. The tool parses the AST and automatically formats it with 2-space or 4-space indentation and syntax highlighting in milliseconds." }
          ],
          diff: [
            { q: "How to compare two JSON files online with visual diff?", a: "Paste your Left (Original) JSON into the first editor pane and Right (Modified) JSON into the second editor pane. JSON2X Diff performs a line-by-line and AST-aware semantic diff, highlighting additions in green, deletions in red, and value mutations in amber side-by-side." },
            { q: "Does JSON diff ignore unordered key differences (semantic diff)?", a: "Yes. Our semantic diff mode parses both payloads into Abstract Syntax Trees and normalizes property ordering before comparison. This ensures that `{ \"a\": 1, \"b\": 2 }` and `{ \"b\": 2, \"a\": 1 }` are recognized as equivalent." },
            { q: "How to find differences between two API responses in staging vs prod?", a: "Paste the staging API JSON payload on the left and the production API response on the right. JSON2X immediately highlights missing properties, changed data types, new enum values, or mutated arrays." },
            { q: "How to diff JSON in VSCode and command line?", a: "In VSCode, select two JSON files in the explorer, right-click, and choose 'Compare Selected'. In terminal, sort and diff with `diff <(jq -S . left.json) <(jq -S . right.json)` to ignore key order." },
            { q: "Can I swap or format both JSON diff inputs?", a: "Yes. The toolbar provides 'Format Both' to normalize indentation on both sides simultaneously, and 'Swap Sides' to reverse the comparison direction with one click." },
            { q: "How does semantic AST diffing handle nested arrays?", a: "The diff engine compares array elements by index or by unique identifier properties (`id`, `key`), accurately identifying inserted, deleted, and reordered list items." }
          ],
          'json-to-csv': [
            { q: "How to convert JSON to CSV online free?", a: "Paste an array of JSON objects into JSON to CSV Converter, choose your desired delimiter (comma, semicolon, or tab), and click Download CSV. The tool creates a clean, tabular spreadsheet ready for Excel, Google Sheets, or database imports." },
            { q: "How does JSON to CSV flatten nested object properties?", a: "The engine traverses child objects recursively, flattening nested keys using dot-notation headers (e.g. `user.address.city` and `user.address.zipCode`), creating rectangular tabular columns with zero data loss." },
            { q: "How to convert JSON to CSV in Python using Pandas?", a: "In Python, use: `import pandas as pd; df = pd.read_json('data.json'); df.to_csv('output.csv', index=False)`. For deeply nested payloads, use `pd.json_normalize(data)` to flatten nested objects into columns." },
            { q: "How are nested arrays handled in CSV export?", a: "Nested arrays can be serialized as stringified JSON cells (e.g., `[\"admin\", \"editor\"]`) or joined as custom delimited text strings (e.g., `admin; editor`) to preserve data accessibility in spreadsheets." },
            { q: "How to open converted CSV files in Microsoft Excel without character encoding issues?", a: "JSON2X exports CSV files with a UTF-8 Byte Order Mark (BOM: `\\uFEFF`), ensuring Excel automatically recognizes UTF-8 international characters, accented letters, and non-Latin alphabets without garbled symbols." },
            { q: "How to convert complex JSON with dynamic keys to CSV?", a: "Our parser executes a two-pass scan across all array items to build a comprehensive union of all unique keys. If some objects omit certain properties, empty cells are automatically populated to maintain tabular alignment." }
          ],
          'csv-to-json': [
            { q: "How to convert CSV file to JSON online?", a: "Upload or paste your CSV text into CSV to JSON Converter. The parser auto-detects column delimiters (commas, semicolons, tabs, pipes), processes quoted cells, and outputs a structured JSON array of objects." },
            { q: "Does CSV to JSON automatically infer numbers and boolean types?", a: "Yes! Numeric strings (`'42'`, `'3.14159'`) and boolean values (`'true'`, `'false'`, `'TRUE'`, `'FALSE'`) are converted into native JSON numbers and booleans rather than raw text strings." },
            { q: "How to parse CSV to JSON in JavaScript and Python?", a: "In Node.js or browser JS, use `PapaParse` (`Papa.parse(csvString, { header: true, dynamicTyping: true })`). In Python, use `import csv, json; reader = csv.DictReader(open('file.csv')); data = list(reader); json_str = json.dumps(data)`." },
            { q: "How does the converter handle commas and quotes inside CSV cells?", a: "The parser strictly conforms to RFC 4180 specifications, correctly handling double-quote escapes (`\"\"`), embedded commas within quoted strings, and multiline cell content." },
            { q: "How to convert Excel spreadsheets to JSON format?", a: "In Microsoft Excel or Google Sheets, export your sheet as `.csv`, then upload or paste the file into JSON2X CSV to JSON Converter to generate structured JSON in milliseconds." },
            { q: "Can I convert CSV into a nested JSON structure with dot-notation headers?", a: "Yes. Column headers formatted with dot notation (e.g. `user.profile.name` and `user.profile.age`) are automatically reconstructed into deep nested JavaScript objects." }
          ],
          'json-to-yaml': [
            { q: "How to convert JSON to YAML online?", a: "Paste your JSON configuration into JSON to YAML Converter. The engine parses the object hierarchy and formats it into clean, idiomatic YAML 1.2 with 2-space indentation, ready for Kubernetes, Docker Compose, or CI/CD pipelines." },
            { q: "Is valid JSON always valid YAML?", a: "Yes. According to the YAML 1.2 specification, JSON is an official syntactic subset of YAML. Every valid JSON document is structurally valid YAML, and our tool converts braces and brackets into clean YAML block style." },
            { q: "How to convert multiline strings from JSON to YAML block scalars?", a: "Strings containing embedded newline characters (`\\n`) are automatically formatted using YAML literal block scalars (`|`) or folded block scalars (`>`), ensuring readable multiline text." },
            { q: "How to convert JSON to YAML in Python or Node.js?", a: "In Python, use PyYAML: `import yaml, json; yaml.dump(json.loads(json_str), sort_keys=False)`. In Node.js, use the official `yaml` package: `import YAML from 'yaml'; const yamlStr = YAML.stringify(JSON.parse(jsonStr))`." },
            { q: "How to generate Kubernetes manifests from JSON payloads?", a: "Paste your Kubernetes deployment, service, or configmap JSON payload to generate standardized, 2-space indented Kubernetes YAML ready for `kubectl apply -f`." },
            { q: "How does the converter handle quotes in YAML output?", a: "Plain strings without special characters are output without quotation marks for maximum readability, while strings containing reserved symbols (`:`, `#`, `[`, `{`, `@`, `!`) are automatically quoted." }
          ],
          'json-to-xml': [
            { q: "How to convert JSON to XML online free?", a: "Paste your JSON document into JSON to XML Converter. The tool recursively translates key-value pairs into valid XML element hierarchies with configurable root and item tags." },
            { q: "How to handle XML attributes when converting from JSON?", a: "Properties prefixed with `@` (e.g., `\"@id\": \"100\"` or `\"@xmlns\": \"https://...\"`) are serialized directly as XML element attributes rather than nested child tags." },
            { q: "How to convert JSON to SOAP request payloads?", a: "Set the root tag to `soapenv:Envelope` and paste your payload. The converter constructs structured XML namespaces and envelope bodies suitable for enterprise SOAP web service integrations." },
            { q: "Does JSON to XML escape special characters like <, >, and &?", a: "Yes. Reserved XML markup characters (`<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `\"` → `&quot;`, `'` → `&apos;`) are automatically escaped to prevent XML parsing syntax errors." },
            { q: "How are JSON arrays transformed into XML tags?", a: "Arrays are mapped to repeating XML elements using either the parent key name or a designated child tag (e.g. `<item>`), maintaining clean element hierarchy." },
            { q: "How to add an XML declaration header?", a: "The converter automatically prepends `<?xml version=\"1.0\" encoding=\"UTF-8\"?>` to the generated output, ensuring compliance with XML parsers and schemas." }
          ],
          'json-to-toml': [
            { q: "How to convert JSON to TOML online?", a: "Paste your JSON configuration into JSON to TOML Converter. The tool compiles the structure into valid TOML v1.0.0 syntax with table headers and key-value pairs for Rust Cargo, Python packaging, or Hugo." },
            { q: "What is TOML used for in modern programming?", a: "TOML (Tom's Obvious Minimal Language) is designed for human-readable configuration files. It is the official configuration format for Rust's `Cargo.toml`, Python's `pyproject.toml`, Hugo static site configurations, and Poetry dependencies." },
            { q: "How are nested JSON objects represented in TOML tables?", a: "Nested objects are serialized as bracketed table headers `[section.subsection]`, while arrays of objects are formatted as double-bracketed array of tables `[[users]]`." },
            { q: "What is the difference between TOML, YAML, and JSON?", a: "JSON is optimized for machine data interchange, YAML is suited for complex multi-document CI/CD pipelines, and TOML is engineered specifically for human-editable application configuration with zero indentation sensitivity." },
            { q: "How does the converter format dates and timestamps in TOML?", a: "ISO 8601 formatted date-time strings are converted into native TOML `Offset Date-Time` literals (`1979-05-27T07:32:00Z`) or `Local Date` literals." }
          ],
          'json-to-sql': [
            { q: "How to convert JSON to SQL CREATE TABLE and INSERT statements?", a: "Paste an array of JSON objects into JSON to SQL Converter, select your SQL dialect (PostgreSQL, MySQL, SQLite, or SQL Server), and download generated schema DDL and bulk `INSERT INTO` statements." },
            { q: "How are JSON data types mapped to SQL column types?", a: "Primitive JSON types map to SQL types: integers → `INTEGER/BIGINT`, floating points → `NUMERIC/FLOAT`, booleans → `BOOLEAN/TINYINT(1)`, ISO dates → `TIMESTAMP WITH TIME ZONE`, and nested objects → `JSONB/JSON/TEXT`." },
            { q: "How does JSON to SQL handle nested objects and arrays?", a: "Nested objects and array columns are serialized into native PostgreSQL `JSONB` or MySQL `JSON` column literals, preserving document structure within relational tables." },
            { q: "How to handle single quotes and special characters in SQL INSERT statements?", a: "String literals are escaped using standard SQL single-quote doubling (`'O''Reilly'`) to prevent SQL syntax errors and guard against SQL injection vulnerabilities." },
            { q: "Can I export the generated SQL statements to a .sql migration file?", a: "Yes. Click 'Download .sql' to save ready-to-run database migration scripts with schema definitions and transactional batches directly to disk." }
          ],
          'json-converter': [
            { q: "What is the 7-in-1 JSON Multi-Converter?", a: "JSON2X Multi-Converter is an all-in-one developer utility that parses your JSON once and transforms it simultaneously into TypeScript interfaces, Zod runtime schemas, Mongoose models, SQL DDL, OpenAPI 3.0 specs, JSON Schema, and Mock Data." },
            { q: "How does the multi-converter process data without server uploads?", a: "All AST analysis and code synthesis execute locally within your browser's V8 JavaScript engine. No payload data is ever transmitted across the internet, ensuring 100% privacy and compliance." },
            { q: "Can I generate mock data and OpenAPI 3.0 specs from the same JSON?", a: "Yes. Switch seamlessly across the 7 output format tabs to copy or download ready-to-use specifications, database schemas, and testing payloads." },
            { q: "How does the multi-converter infer Mongoose schemas?", a: "It parses key types and generates complete Mongoose schema declarations with `mongoose.Schema({ ... })`, type definitions (`String`, `Number`, `Boolean`, `Date`), and required constraints." },
            { q: "Is there any file size limit or account registration required?", a: "No. JSON2X is 100% free, requires no user registration, no API keys, and has no daily conversion quotas or file size paywalls." }
          ],
          'json-to-ts': [
            { q: "How to generate TypeScript interfaces from JSON online?", a: "Paste your sample JSON into JSON to TypeScript Generator. The engine inspects object structures, primitive types, and nested arrays to synthesize clean, strongly-typed TypeScript `interface` or `type` definitions." },
            { q: "How to generate runtime Zod validation schemas from JSON?", a: "Toggle the Zod option to synthesize runtime `z.object({...})` schemas. You can use these schemas in full-stack applications with tRPC, React Hook Form, Next.js server actions, and Express validation middlewares." },
            { q: "How to parse typed JSON safely in TypeScript?", a: "Combine `JSON.parse()` with Zod schema validation: `const user = UserSchema.parse(JSON.parse(jsonString));`. This guarantees runtime type safety rather than relying on unsafe compile-time type assertions (`as User`)." },
            { q: "How does the generator handle optional and nullable fields?", a: "If a property is missing or null in some array records, the generator automatically marks the field as optional and nullable (`field?: string | null`)." },
            { q: "How to generate PascalCase interface names for nested JSON objects?", a: "The tool automatically capitalizes property names and removes special characters to generate clean, idiomatic interface hierarchies (e.g. `UserAccount`, `BillingAddress`)." }
          ],
          'json-to-code': [
            { q: "How to convert JSON to Go structs with json tags?", a: "Paste your JSON into JSON to Code Generator and select Go. The tool generates PascalCase struct definitions annotated with explicit `json:\"key\"` tags, pointers for nullable fields, and `time.Time` for dates." },
            { q: "How to convert JSON to Rust Serde structs?", a: "Select Rust to generate structs equipped with `#[derive(Serialize, Deserialize, Debug, Clone)]` and `#[serde(rename = \"...\")]` macros, mapping primitive types to `i64`, `f64`, `String`, `bool`, and `Option<T>`." },
            { q: "How to convert JSON to Python Pydantic v2 BaseModel classes?", a: "Select Python to generate modern Pydantic v2 `BaseModel` classes with Python 3.10+ type hints (`int`, `str`, `float`, `list[...]`, `Optional[...]`) and Field aliases." },
            { q: "How to convert JSON to C# Record and Java POJO classes?", a: "Select C# or Java to generate immutable C# `public record` classes with `[JsonPropertyName(\"...\")]` attributes or Java POJO classes with Jackson/Gson annotations." },
            { q: "How does the generator handle nested sub-structs and arrays?", a: "Child objects and arrays of records are recursively extracted into separate, strongly-typed model definitions, ensuring modular and readable source code." }
          ],
          schema: [
            { q: "How to generate Draft-07 JSON Schema from a JSON payload?", a: "Paste your sample JSON into JSON Schema Generator. The tool infers data types, generates `$schema: \"http://json-schema.org/draft-07/schema#\"`, and outputs structural rules with required properties." },
            { q: "How does the schema generator detect string formats (email, uri, date-time, uuid)?", a: "The inference engine applies regular expression pattern matching against string values to detect RFC 5322 emails, ISO 8601 timestamps, UUIDs (v4), and HTTP/HTTPS URLs, automatically annotating `\"format\": \"...\"`." },
            { q: "What is the difference between JSON Schema and TypeScript types?", a: "TypeScript types provide static compile-time safety within TypeScript projects, whereas JSON Schema provides a language-agnostic specification used for runtime payload validation, API documentation (OpenAPI), and automated contract testing." },
            { q: "How to validate API responses using the generated JSON Schema with Ajv?", a: "In Node.js: `import Ajv from 'ajv'; const ajv = new Ajv(); const validate = ajv.compile(schema); const isValid = validate(payload); if (!isValid) console.error(validate.errors);`." },
            { q: "Can I generate JSON Schema from an array of sample objects?", a: "Yes. When an array of multiple objects is supplied, the generator performs a schema union to identify all possible fields, optional properties, and type variations across all records." }
          ],
          'json-mock-generator': [
            { q: "How to generate synthetic JSON mock data online for API testing?", a: "Select a dataset preset (Users, E-commerce Products, Orders, Analytics Logs), specify your desired record count (from 1 to 500 records), and click Generate Mock Data for instant realistic test payloads." },
            { q: "Why use synthetic mock data instead of real customer data?", a: "Using synthetic mock data prevents compliance violations under GDPR, HIPAA, and CCPA by eliminating Personally Identifiable Information (PII) risks while still providing realistic names, emails, and transaction numbers." },
            { q: "Can I customize the generated mock data schema?", a: "Yes. You can edit the template JSON structure or add custom field types to generate domain-specific mock data for your application." },
            { q: "How to mock REST API responses for frontend unit tests in Jest and Cypress?", a: "Generate mock datasets in JSON2X and paste them into MSW (Mock Service Worker), MirageJS, Cypress fixtures (`cy.fixture('users.json')`), or Jest test mocks." },
            { q: "Is any synthetic mock data sent over the network?", a: "No. All fake data algorithms, random generation seeds, and string templating execute 100% locally in browser memory." }
          ],
          jsonpath: [
            { q: "What is JSONPath and what is its syntax?", a: "JSONPath (standardized in IETF RFC 9535) is a query language for JSON. It uses `$` for the root document, `.` for child property access, `..` for recursive descent, `*` as a wildcard, and `[?(@.price < 20)]` for filter expressions." },
            { q: "How to query and filter nested JSON arrays with JSONPath?", a: "Use filter expressions like `$.store.book[?(@.price < 10)]` to select all books priced under $10, or `$.users[?(@.role == 'admin')].email` to extract admin email addresses." },
            { q: "How to test JSONPath expressions for Apache JMeter and Postman?", a: "Paste your API response into JSON2X JSONPath Evaluator and enter your query. You will see instant match counts and extracted JSON arrays before adding the query to JMeter's JSON Extractor or Postman assertions (`pm.response.json()`)." },
            { q: "What is the difference between XPath and JSONPath?", a: "XPath queries XML document trees with elements and attributes, whereas JSONPath queries native JSON object and array hierarchies with JavaScript-style expressions." },
            { q: "How to slice arrays in JSONPath (e.g. first 5 items)?", a: "Use slice syntax: `$[0:5]` extracts the first 5 elements, `$[::2]` extracts every second item, and `$[-1:]` retrieves the last element of the array." }
          ],
          viewer: [
            { q: "How to view JSON as an interactive collapsible tree online?", a: "Paste your JSON payload into JSON Tree Viewer. The tool renders a visual, interactive collapsible node tree displaying data types, array item counts, object key counts, and color-coded values." },
            { q: "How to search and filter nested keys and values in a JSON tree?", a: "Type any string, number, or key name into the search bar. The tree viewer highlights matching nodes in real time and automatically expands the parent hierarchy." },
            { q: "Can I expand or collapse all JSON tree nodes with one click?", a: "Yes. Click 'Expand All' to inspect the entire document hierarchy or 'Collapse All' to collapse the view down to the root node." },
            { q: "How to copy specific JSON path and node value from tree viewer?", a: "Click on any node in the tree hierarchy to copy its exact JSONPath (e.g. `data.items[2].price`) or raw value directly to your clipboard." },
            { q: "How does the tree viewer handle large multi-megabyte JSON payloads?", a: "The tree viewer utilizes virtualized DOM rendering and lazy node mounting to smoothly render massive payloads without consuming excessive browser memory or freezing the UI." }
          ]
        };

        const faqs = TOOL_FAQS[tool.id] || 
                     (tool.aliases && tool.aliases.map(a => TOOL_FAQS[a]).find(Boolean)) || 
                     TOOL_FAQS[tool.dataTool] || 
                     TOOL_FAQS[currentId] || 
                     TOOL_FAQS.formatter;
        return faqs.map(item => `
          <div class="faq-card">
            <h3 class="faq-card__q">${item.q}</h3>
            <p class="faq-card__a">${item.a.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>
          </div>
        `).join('');
      })()}
    </div>
  </section>

  <!-- 9. Recommended Developer Guides -->
  <section class="tool-section">
    <h2 class="tool-section__title">Recommended Developer Guides</h2>
    <div class="faq-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-6);">
      <a href="${resolveHref('/blog/json-guides.html')}" class="faq-card" style="text-decoration:none; display:block;">
        <p class="faq-section__eyebrow">Guide</p>
        <h3 class="faq-card__q">RFC 8259 Specifications</h3>
        <p class="faq-card__a">Official rules of JSON grammar, numbers, booleans, and character escaping.</p>
      </a>
      <a href="${resolveHref('/blog/tutorials.html')}" class="faq-card" style="text-decoration:none; display:block;">
        <p class="faq-section__eyebrow">Tutorial</p>
        <h3 class="faq-card__q">TypeScript Schema Generation</h3>
        <p class="faq-card__a">Learn how to convert raw JSON samples into strongly-typed interfaces.</p>
      </a>
    </div>
  </section>

  <!-- 10. Call To Action -->
  <section class="tool-cta-banner">
    <h2 class="tool-cta-banner__title">Ready to Format &amp; Validate Your Data?</h2>
    <p class="tool-cta-banner__desc">Experience lightning-fast client-side processing with zero latency and 100% data privacy.</p>
    <a href="#main-content" class="btn btn--primary" style="padding:var(--space-3) var(--space-8); text-decoration:none; font-weight:var(--font-semibold);">Start Using ${tool.name}</a>
  </section>
</article>`;
  }

  /* ── Dynamic Technical SEO Metadata Engine ─────────────────
     Automatically populates / updates metadata, canonicals, hreflang,
     OpenGraph, Twitter cards, viewport, theme-color, manifest, author,
     and publisher tags for all existing & future pages.
  ────────────────────────────────────────────────────────── */
  const SITE_BASE_URL = 'https://json2x.com';
  const DEFAULT_OG_IMAGE = 'https://json2x.com/assets/og-image.png';

  function setMetaTag(attrName, attrValue, content) {
    if (!content) return;
    let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  function setLinkTag(rel, href, extraAttrs = {}) {
    if (!href) return;
    let selector = `link[rel="${rel}"]`;
    if (extraAttrs.hreflang) selector += `[hreflang="${extraAttrs.hreflang}"]`;
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      if (extraAttrs.hreflang) tag.setAttribute('hreflang', extraAttrs.hreflang);
      if (extraAttrs.type) tag.setAttribute('type', extraAttrs.type);
      document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
  }

  function injectTechnicalSEOMetadata(currentId) {
    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', 'en');
    }

    // Core application & branding metadata
    setMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('name', 'theme-color', '#0d1117');
    setMetaTag('name', 'color-scheme', 'dark light');
    setMetaTag('name', 'application-name', 'JSON2X');
    setMetaTag('name', 'apple-mobile-web-app-title', 'JSON2X');
    setMetaTag('name', 'author', 'JSON2X');
    setMetaTag('name', 'publisher', SITE_BASE_URL);
    setMetaTag('name', 'category', 'Developer Tools');

    // Google Search Console & Bing Webmaster Verification Tags
    setMetaTag('name', 'google-site-verification', 'GSC_VERIFICATION_TOKEN_JSON2X');
    setMetaTag('name', 'msvalidate.01', 'BING_VERIFICATION_TOKEN_JSON2X');

    // Manifest & icons
    setLinkTag('manifest', resolveHref('/site.webmanifest'));
    setLinkTag('publisher', SITE_BASE_URL);

    // Analytics Script Injection
    if (!document.getElementById('jt-analytics-script')) {
      const analyticsScript = document.createElement('script');
      analyticsScript.id = 'jt-analytics-script';
      analyticsScript.src = resolveHref('/assets/js/analytics.js');
      analyticsScript.defer = true;
      document.head.appendChild(analyticsScript);
    }

    // Determine current canonical path
    let canonicalUrl = SITE_BASE_URL + window.location.pathname;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && canonicalLink.getAttribute('href')) {
      canonicalUrl = canonicalLink.getAttribute('href');
    } else {
      setLinkTag('canonical', canonicalUrl);
    }

    // Dynamic Hreflang alternates
    setLinkTag('alternate', canonicalUrl, { hreflang: 'x-default' });
    setLinkTag('alternate', canonicalUrl, { hreflang: 'en' });

    // Lookup active tool metadata
    const activeTool = TOOLS.find(t => t.id === currentId || (t.aliases && t.aliases.includes(currentId)));
    if (activeTool) {
      const pageTitle = document.title || `${activeTool.name} — Free Online Developer Tool | JSON2X`;
      const metaDesc = document.querySelector('meta[name="description"]')?.content ||
        `${activeTool.name} online — ${activeTool.desc}. 100% browser-only client-side utility. No data leaves your device.`;

      // Open Graph
      setMetaTag('property', 'og:type', 'website');
      setMetaTag('property', 'og:url', canonicalUrl);
      setMetaTag('property', 'og:title', pageTitle);
      setMetaTag('property', 'og:description', metaDesc);
      setMetaTag('property', 'og:site_name', 'JSON2X');
      setMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);
      setMetaTag('property', 'og:locale', 'en_US');
    }
  }

  /* ── Dynamic Advanced Schema.org Graph Engine ──────────────
     Generates unified, linked @graph JSON-LD schema supporting:
     Organization, Person, WebSite, SearchAction, SiteNavigationElement,
     SoftwareApplication, WebApplication, BreadcrumbList, FAQPage,
     Article, BlogPosting, HowTo, CollectionPage, and WebPage.
  ────────────────────────────────────────────────────────── */
  function injectAdvancedStructuredData(currentId) {
    const pathname = window.location.pathname;
    let canonicalUrl = SITE_BASE_URL + pathname;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && canonicalLink.getAttribute('href')) {
      canonicalUrl = canonicalLink.getAttribute('href');
    }

    const graph = [];

    // 1. Organization
    graph.push({
      "@type": "Organization",
      "@id": `${SITE_BASE_URL}/#organization`,
      "name": "JSON2X",
      "url": SITE_BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "@id": `${SITE_BASE_URL}/#logo`,
        "url": `${SITE_BASE_URL}/favicon.svg`,
        "caption": "JSON2X Logo"
      },
      "image": { "@id": `${SITE_BASE_URL}/#logo` },
      "description": "Free browser-only JSON & CSV developer utilities. Zero latency, 100% client-side privacy.",
      "founder": { "@id": `${SITE_BASE_URL}/#person` },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@json2x.com",
        "contactType": "customer support"
      }
    });

    // 2. Person (Author / Founder)
    graph.push({
      "@type": "Person",
      "@id": `${SITE_BASE_URL}/#person`,
      "name": "JSON2X Engineering Team",
      "jobTitle": "Staff Developer Tools Engineer",
      "url": `${SITE_BASE_URL}/about.html`,
      "worksFor": { "@id": `${SITE_BASE_URL}/#organization` }
    });

    // 3. WebSite & SearchAction
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_BASE_URL}/#website`,
      "name": "JSON2X",
      "url": SITE_BASE_URL,
      "description": "Free online JSON and CSV developer tools.",
      "publisher": { "@id": `${SITE_BASE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_BASE_URL}/tools/json-formatter.html?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });

    // 4. SiteNavigationElement
    graph.push({
      "@type": "SiteNavigationElement",
      "@id": `${SITE_BASE_URL}/#navigation`,
      "name": "Primary Site Navigation",
      "hasPart": TOOLS.map(t => ({
        "@type": "WebPage",
        "name": t.name,
        "url": SITE_BASE_URL + t.href
      }))
    });

    // 5. BreadcrumbList
    const breadcrumbItems = [{ name: 'Home', url: SITE_BASE_URL + '/' }];
    if (pathname.includes('/tools/')) {
      breadcrumbItems.push({ name: 'Tools', url: `${SITE_BASE_URL}/tools/index.html` });
      const tool = TOOLS.find(t => t.id === currentId || (t.aliases && t.aliases.includes(currentId)));
      if (tool) breadcrumbItems.push({ name: tool.name, url: canonicalUrl });
    } else if (pathname.includes('/blog/')) {
      breadcrumbItems.push({ name: 'Blog', url: `${SITE_BASE_URL}/blog/index.html` });
      if (!pathname.endsWith('index.html')) breadcrumbItems.push({ name: document.title.split('—')[0].trim(), url: canonicalUrl });
    } else if (pathname.includes('/docs/')) {
      breadcrumbItems.push({ name: 'Docs', url: `${SITE_BASE_URL}/docs/index.html` });
      if (!pathname.endsWith('index.html')) breadcrumbItems.push({ name: document.title.split('—')[0].trim(), url: canonicalUrl });
    } else if (pathname.includes('/kb/')) {
      breadcrumbItems.push({ name: 'Knowledge Base', url: `${SITE_BASE_URL}/kb/index.html` });
      if (!pathname.endsWith('index.html')) breadcrumbItems.push({ name: document.title.split('—')[0].trim(), url: canonicalUrl });
    } else if (pathname.includes('/errors/')) {
      breadcrumbItems.push({ name: 'Errors', url: `${SITE_BASE_URL}/errors/index.html` });
      if (!pathname.endsWith('index.html')) breadcrumbItems.push({ name: document.title.split('|')[0].trim(), url: canonicalUrl });
    } else if (pathname.includes('about.html')) {
      breadcrumbItems.push({ name: 'About', url: canonicalUrl });
    } else if (pathname.includes('faq.html')) {
      breadcrumbItems.push({ name: 'FAQ', url: canonicalUrl });
    } else if (pathname.includes('privacy.html')) {
      breadcrumbItems.push({ name: 'Privacy Policy', url: canonicalUrl });
    }

    if (breadcrumbItems.length > 1) {
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": breadcrumbItems.map((item, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": item.name,
          "item": item.url
        }))
      });
    }

    // 6. Tool-specific: SoftwareApplication & WebApplication & HowTo
    const activeTool = TOOLS.find(t => t.id === currentId || (t.aliases && t.aliases.includes(currentId)));
    if (activeTool) {
      graph.push({
        "@type": ["SoftwareApplication", "WebApplication"],
        "@id": `${canonicalUrl}#softwareapplication`,
        "name": activeTool.name,
        "url": canonicalUrl,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any (browser-based)",
        "browserRequirements": "Requires JavaScript. 100% client-side execution.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": activeTool.desc,
        "provider": { "@id": `${SITE_BASE_URL}/#organization` },
        "author": { "@id": `${SITE_BASE_URL}/#person` }
      });

      graph.push({
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        "name": `How to use ${activeTool.name}`,
        "description": `Step-by-step developer instructions for ${activeTool.name}.`,
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Input Data",
            "text": "Paste your raw JSON or CSV code into the input editor panel or drag and drop a file."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Process Client-Side",
            "text": "The tool processes, validates, minifies, or transforms your code 100% locally in your browser."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Export Result",
            "text": "Copy the formatted output to your clipboard or download as a file."
          }
        ]
      });
    }

    // 7. Page-specific: CollectionPage / BlogPosting / Article / FAQPage
    if (pathname.includes('/blog/')) {
      if (pathname.endsWith('index.html') || pathname.endsWith('categories.html')) {
        graph.push({
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#webpage`,
          "url": canonicalUrl,
          "name": document.title,
          "description": document.querySelector('meta[name="description"]')?.content,
          "publisher": { "@id": `${SITE_BASE_URL}/#organization` }
        });
      } else {
        graph.push({
          "@type": ["Article", "BlogPosting"],
          "@id": `${canonicalUrl}#article`,
          "url": canonicalUrl,
          "headline": document.title,
          "description": document.querySelector('meta[name="description"]')?.content,
          "author": { "@id": `${SITE_BASE_URL}/#person` },
          "publisher": { "@id": `${SITE_BASE_URL}/#organization` },
          "mainEntityOfPage": canonicalUrl
        });
      }
    } else if (pathname.includes('/errors/')) {
      if (pathname.endsWith('index.html')) {
        graph.push({
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#webpage`,
          "url": canonicalUrl,
          "name": "JSON Error Knowledge Base",
          "publisher": { "@id": `${SITE_BASE_URL}/#organization` }
        });
      } else {
        graph.push({
          "@type": "TechArticle",
          "@id": `${canonicalUrl}#techarticle`,
          "url": canonicalUrl,
          "headline": document.title,
          "description": document.querySelector('meta[name="description"]')?.content,
          "author": { "@id": `${SITE_BASE_URL}/#person` },
          "publisher": { "@id": `${SITE_BASE_URL}/#organization` }
        });
      }
    } else if (pathname.includes('tools/index.html') || pathname === '/' || pathname.endsWith('index.html')) {
      graph.push({
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collectionpage`,
        "url": canonicalUrl,
        "name": "JSON & CSV Developer Tools Catalog",
        "description": "Catalog of free online developer utilities.",
        "publisher": { "@id": `${SITE_BASE_URL}/#organization` }
      });
    } else {
      graph.push({
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": document.title,
        "publisher": { "@id": `${SITE_BASE_URL}/#organization` }
      });
    }

    // 8. Extract FAQPage Q&As from HTML DOM
    const faqCards = document.querySelectorAll('.faq-card');
    if (faqCards && faqCards.length > 0) {
      const mainEntity = [];
      faqCards.forEach(card => {
        const q = card.querySelector('.faq-card__q')?.textContent?.trim();
        const a = card.querySelector('.faq-card__a')?.textContent?.trim();
        if (q && a) {
          mainEntity.push({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": a
            }
          });
        }
      });
      if (mainEntity.length > 0) {
        graph.push({
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faqpage`,
          "mainEntity": mainEntity
        });
      }
    }

    // Single unified @graph JSON-LD script tag injection
    const jsonLdGraph = {
      "@context": "https://schema.org",
      "@graph": graph
    };

    let scriptTag = document.getElementById('jsonld-dynamic-graph');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-dynamic-graph';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdGraph, null, 2);
  }

  /* ── Real-Time User Clock ──────────────────────────────── */
  function startLiveUserClock() {
    const clockEl = document.getElementById('live-user-clock');
    if (!clockEl) return;

    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const html = `<span class="top-bar__clock-pulse" aria-hidden="true"></span><span class="top-bar__clock-time">${timeStr}</span>`;
      if (clockEl.innerHTML !== html) {
        clockEl.innerHTML = html;
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ── Mount ────────────────────────────────────────────────*/
  function mount() {
    const currentId = getCurrentToolId();

    // Inject dynamic technical SEO metadata & advanced Schema.org graph
    injectTechnicalSEOMetadata(currentId);
    injectAdvancedStructuredData(currentId);

    // ── Non-blocking Google Fonts & Worker Prefetching (Core Web Vitals Optimization) ──
    if (!document.getElementById('gfonts-preconnect')) {
      const pc1 = document.createElement('link');
      pc1.id = 'gfonts-preconnect';
      pc1.rel = 'preconnect';
      pc1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(pc1);

      const pc2 = document.createElement('link');
      pc2.rel = 'preconnect';
      pc2.href = 'https://fonts.gstatic.com';
      pc2.crossOrigin = 'anonymous';
      document.head.appendChild(pc2);

      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
      document.head.appendChild(fontLink);

      // Prefetch worker script for instant INP interaction response
      const prefetchWorker = document.createElement('link');
      prefetchWorker.rel = 'prefetch';
      prefetchWorker.as = 'script';
      prefetchWorker.href = resolveHref('/assets/js/worker-formatter.js');
      document.head.appendChild(prefetchWorker);
    }

    // Header
    const headerEl = document.getElementById('site-header-placeholder');
    if (headerEl) {
      headerEl.outerHTML = renderHeader(currentId);
      startLiveUserClock();
    }

    // Mid-content leaderboard ad (injected inside main by tools that want it)
    document.querySelectorAll('[data-ad-slot-leaderboard]').forEach(el => {
      el.innerHTML = renderAdSlot('leaderboard', el.dataset.adSlotLeaderboard || 'LEADERBOARD_SLOT_ID');
    });

    // Related tools + 15-section Tool Deep Dive
    const relatedEl = document.getElementById('related-tools-placeholder');
    if (relatedEl) {
      relatedEl.outerHTML = renderToolDeepDiveSections(currentId) + renderRelatedTools(currentId);
    }

    const rectEl = document.getElementById('ad-slot-rectangle-placeholder');
    if (rectEl) {
      rectEl.outerHTML = renderAdSlot('rectangle', 'RECTANGLE_SLOT_ID');
    }

    // Footer
    const footerEl = document.getElementById('site-footer-placeholder');
    if (footerEl) {
      footerEl.outerHTML = renderFooter();
    }

    // Contextual internal linking engine
    autoLinkProse();

    // Initial DOM translation for newly inserted header/footer/related tools
    if (window.JSON2X_I18N && typeof window.JSON2X_I18N.translateDOM === 'function') {
      window.JSON2X_I18N.translateDOM();
    }

    // Listen to language change events and re-translate
    window.addEventListener('i18n:change', function () {
      if (window.JSON2X_I18N && typeof window.JSON2X_I18N.translateDOM === 'function') {
        window.JSON2X_I18N.translateDOM();
      }
    });

    // Mobile nav toggle & Theme toggle event delegation
    document.addEventListener('click', function (e) {
      const navBtn = e.target.closest('#nav-toggle');
      if (navBtn) {
        const nav = document.getElementById('mobile-nav');
        if (!nav) return;
        const isOpen = nav.classList.toggle('open');
        navBtn.setAttribute('aria-expanded', String(isOpen));
        return;
      }

      // Tools Mega-Menu dropdown toggle
      const megaBtn = e.target.closest('#nav-mega-btn');
      if (megaBtn) {
        const megaWrap = document.getElementById('nav-mega-wrap');
        if (!megaWrap) return;
        const isOpen = megaWrap.classList.toggle('open');
        megaBtn.setAttribute('aria-expanded', String(isOpen));
        return;
      }

      // Close Mega-Menu dropdown when clicking outside it
      const megaWrap = document.getElementById('nav-mega-wrap');
      if (megaWrap && megaWrap.classList.contains('open')) {
        if (!megaWrap.contains(e.target)) {
          megaWrap.classList.remove('open');
          const btn = document.getElementById('nav-mega-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      }

      const themeBtn = e.target.closest('#theme-toggle');
      if (themeBtn) {
        const current = getEffectiveTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next, true);
      }
    });

    // Close Mega-Menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const megaWrap = document.getElementById('nav-mega-wrap');
        if (megaWrap && megaWrap.classList.contains('open')) {
          megaWrap.classList.remove('open');
          const btn = document.getElementById('nav-mega-btn');
          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        }
      }
    });


    // Sync with OS theme changes if no manual override is saved
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleOSChange = function (e) {
        if (!getStoredTheme()) {
          setTheme(e.matches ? 'dark' : 'light', false);
        }
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleOSChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleOSChange);
      }
    }

    // Initialize interactive Command Palette (Ctrl+K)
    initCommandPalette();
  }

  // ── Command Palette (Quick Search) ──────────────────────────────────
  const SEARCH_ITEMS = [
    // Format & Validate
    { id: 'formatter', name: 'JSON Formatter', cat: 'Format & Validate', desc: 'Prettify, validate & syntax-highlight JSON with customizable indentation.', path: '/tools/json-formatter.html', badge: 'Popular', keywords: 'pretty print beautify indent format spacing tab linter json' },
    { id: 'validator', name: 'JSON Validator', cat: 'Format & Validate', desc: 'RFC 8259 compliance syntax checker with line and column error pinpointing.', path: '/tools/json-validator.html', badge: '', keywords: 'syntax check validate error lint rfc 8259 parse test' },
    { id: 'minifier', name: 'JSON Minifier', cat: 'Format & Validate', desc: 'Compress payloads, strip whitespace & see byte savings stats.', path: '/tools/json-minifier.html', badge: '', keywords: 'minify compress compact shrink whitespace strip reduce size' },
    { id: 'diff', name: 'JSON Diff Checker', cat: 'Format & Validate', desc: 'Side-by-side visual comparison with color-coded additions, deletions & modifications.', path: '/tools/json-diff.html', badge: '', keywords: 'diff compare difference visual inspect delta changes' },
    
    // Data Converters
    { id: 'json-to-csv', name: 'JSON to CSV Converter', cat: 'Data Converters', desc: 'Flatten JSON arrays into downloadable CSV tables with custom delimiters.', path: '/tools/json-to-csv.html', badge: '', keywords: 'csv excel spreadsheet export flatten array table delimiter' },
    { id: 'csv-to-json', name: 'CSV to JSON Converter', cat: 'Data Converters', desc: 'Parse CSV files or raw text to formatted JSON with auto-type inference.', path: '/tools/csv-to-json.html', badge: '', keywords: 'csv import parse excel to json auto detect types' },
    { id: 'json-to-yaml', name: 'JSON to YAML Converter', cat: 'Data Converters', desc: 'Transform JSON payloads into clean, indented YAML configuration files.', path: '/tools/json-to-yaml.html', badge: 'New', keywords: 'yaml yml kubernetes config ansible docker convert' },
    { id: 'json-to-xml', name: 'JSON to XML Converter', cat: 'Data Converters', desc: 'Generate valid XML structures with custom root and item tags.', path: '/tools/json-to-xml.html', badge: 'New', keywords: 'xml soap markup rss tags elements convert' },
    { id: 'json-to-toml', name: 'JSON to TOML Converter', cat: 'Data Converters', desc: 'Convert JSON into human-readable TOML documents for Cargo, Hugo, or Python.', path: '/tools/json-to-toml.html', badge: 'New', keywords: 'toml cargo rust hugo python config settings' },
    { id: 'json-to-sql', name: 'JSON to SQL Converter', cat: 'Data Converters', desc: 'Generate CREATE TABLE DDL schemas and INSERT statements for PostgreSQL, MySQL & SQLite.', path: '/tools/json-to-sql.html', badge: 'New', keywords: 'sql postgres mysql sqlite database table insert ddl schema relational' },
    
    // Code & Schema Generators
    { id: 'json-converter', name: 'JSON Multi-Converter', cat: 'Code & Schema', desc: '7-in-1 multi-format converter: TypeScript, Zod, Mongoose, SQL, OpenAPI, JSON Schema & Mock Data.', path: '/tools/json-converter.html', badge: '7-in-1', keywords: 'multi converter 7 in 1 all in one typescript zod mongoose openapi sql schema mock' },
    { id: 'json-to-ts', name: 'JSON to TypeScript & Zod', cat: 'Code & Schema', desc: 'Synthesize strongly-typed TypeScript interfaces, type aliases and runtime Zod schemas.', path: '/tools/typescript-generator.html', badge: '', keywords: 'typescript ts interface zod type schema validation types generator' },
    { id: 'json-to-code', name: 'JSON to Code (Go/Rust/Python)', cat: 'Code & Schema', desc: 'Generate typed Go structs with json tags, Rust Serde models, and Python Pydantic classes.', path: '/tools/json-to-code.html', badge: 'New', keywords: 'go golang rust serde python pydantic structs models classes data types' },
    { id: 'schema', name: 'JSON Schema Generator', cat: 'Code & Schema', desc: 'Infer Draft-07 JSON Schema specifications with types, formats and required properties.', path: '/tools/json-schema-generator.html', badge: '', keywords: 'json schema draft 07 specification contract validation model' },
    { id: 'json-mock-generator', name: 'JSON Mock Generator', cat: 'Code & Schema', desc: 'Create realistic synthetic JSON datasets for API testing and frontend prototyping.', path: '/tools/json-mock-generator.html', badge: 'New', keywords: 'mock synthetic fake data users products orders logs test dataset generator' },
    
    // Query & Inspection
    { id: 'jsonpath', name: 'JSONPath Tester & Evaluator', cat: 'Query & Inspection', desc: 'Evaluate JSONPath query expressions against live data structures in real-time.', path: '/tools/jsonpath.html', badge: '', keywords: 'jsonpath query filter search extract eval expression path tester' },
    { id: 'viewer', name: 'JSON Tree Viewer', cat: 'Query & Inspection', desc: 'Interactive collapsible tree diagram with node counts, depth control and key filtering.', path: '/tools/json-tree-viewer.html', badge: '', keywords: 'tree viewer hierarchy collapsible inspect visual explore nodes' },
    
    // Resources & Docs
    { id: 'catalog', name: 'All Tools Catalog (17 Tools)', cat: 'Navigation', desc: 'Browse and filter all 17 developer utilities by category with live search.', path: '/tools/index.html', badge: '17 Tools', keywords: 'catalog tools list directory explore filter all' },
    { id: 'docs-hub', name: 'Documentation Hub', cat: 'Resources', desc: 'Deep-dive developer guides on JSON parsing, RFC 8259, and TypeScript models.', path: '/docs/index.html', badge: 'Docs', keywords: 'docs guides tutorials reference specification' },
    { id: 'kb-hub', name: 'Knowledge Base Hub', cat: 'Resources', desc: 'Engineering articles, syntax references, data manipulation and API workflows.', path: '/kb/index.html', badge: 'KB', keywords: 'kb knowledge base articles learning examples tutorials' },
    { id: 'blog-hub', name: 'Blog & Articles', cat: 'Resources', desc: 'Technical articles, optimization insights, tutorials, and performance benchmarks.', path: '/blog/index.html', badge: 'Blog', keywords: 'blog articles news tutorials updates' },
    { id: 'err-token', name: 'Fix "Unexpected Token" Error', cat: 'Error Guides', desc: 'Diagnose and resolve JSON parse unexpected token syntax errors.', path: '/errors/unexpected-token.html', badge: 'Error Fix', keywords: 'unexpected token syntax error fix solve quote json' },
    { id: 'err-comma', name: 'Fix "Trailing Comma" Error', cat: 'Error Guides', desc: 'How to fix invalid trailing commas in JSON arrays and objects.', path: '/errors/trailing-comma.html', badge: 'Error Fix', keywords: 'trailing comma syntax error fix solve array object json' }
  ];

  function getItemIcon(item) {
    if (ICON[item.id]) return ICON[item.id];
    if (item.cat === 'Navigation' || item.cat === 'Resources') {
      return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 4h12M3 9h12M3 14h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    }
    if (item.cat === 'Error Guides') {
      return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="5" x2="9" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.75" fill="currentColor"/></svg>`;
    }
    return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`;
  }

  function initCommandPalette() {
    let modal = document.getElementById('cmd-palette-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cmd-palette-modal';
      modal.className = 'cmd-palette-backdrop';
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Search tools and resources');
      modal.innerHTML = `
        <div class="cmd-palette-dialog" role="document">
          <div class="cmd-palette-input-wrap">
            <svg class="cmd-palette-search-icon" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input type="text" class="cmd-palette-input" id="cmd-palette-input" placeholder="Type a tool name, format, or keyword..." autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-controls="cmd-palette-results" />
            <button class="cmd-palette-close-btn" id="cmd-palette-close-btn" aria-label="Close search (Esc)">ESC</button>
          </div>
          <div class="cmd-palette-results" id="cmd-palette-results" role="listbox"></div>
          <div class="cmd-palette-footer">
            <span class="cmd-palette-hint"><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
            <span class="cmd-palette-hint"><kbd>↵</kbd> select</span>
            <span class="cmd-palette-hint"><kbd>ESC</kbd> close</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const input = document.getElementById('cmd-palette-input');
    const resultsContainer = document.getElementById('cmd-palette-results');
    const closeBtn = document.getElementById('cmd-palette-close-btn');
    let selectedIndex = 0;
    let currentFiltered = [];

    function renderResults(items) {
      currentFiltered = items;
      selectedIndex = 0;
      if (!items.length) {
        resultsContainer.innerHTML = `<div class="cmd-palette-empty">No tools or guides found matching your query.</div>`;
        return;
      }

      // Group items by category
      const groups = {};
      items.forEach(item => {
        if (!groups[item.cat]) groups[item.cat] = [];
        groups[item.cat].push(item);
      });

      let html = '';
      let globalIdx = 0;
      for (const [catName, catItems] of Object.entries(groups)) {
        html += `<div class="cmd-palette-group-title">${catName}</div>`;
        catItems.forEach(item => {
          const isSelected = globalIdx === selectedIndex;
          const href = resolveHref(item.path);
          const iconSvg = getItemIcon(item);
          const badgeHtml = item.badge ? `<span class="cmd-palette-item-badge">${item.badge}</span>` : '';
          html += `
            <a class="cmd-palette-item${isSelected ? ' selected' : ''}" href="${href}" data-index="${globalIdx}" role="option" aria-selected="${isSelected}">
              <span class="cmd-palette-item-icon">${iconSvg}</span>
              <div class="cmd-palette-item-info">
                <div class="cmd-palette-item-name">${item.name} ${badgeHtml}</div>
                <div class="cmd-palette-item-desc">${item.desc}</div>
              </div>
            </a>
          `;
          globalIdx++;
        });
      }
      resultsContainer.innerHTML = html;
      updateSelection();
    }

    function updateSelection() {
      const items = resultsContainer.querySelectorAll('.cmd-palette-item');
      items.forEach((el, idx) => {
        const isSel = idx === selectedIndex;
        el.classList.toggle('selected', isSel);
        el.setAttribute('aria-selected', String(isSel));
        if (isSel) {
          el.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    function filterItems(query) {
      const q = query.toLowerCase().trim();
      if (!q) {
        renderResults(SEARCH_ITEMS);
        return;
      }
      const filtered = SEARCH_ITEMS.filter(item => {
        return item.name.toLowerCase().includes(q) ||
               item.desc.toLowerCase().includes(q) ||
               item.cat.toLowerCase().includes(q) ||
               item.keywords.toLowerCase().includes(q);
      });
      renderResults(filtered);
    }

    function openPalette() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      input.value = '';
      filterItems('');
      setTimeout(() => input.focus(), 50);
      document.body.style.overflow = 'hidden';
    }

    function closePalette() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      const triggerBtn = document.getElementById('header-search-btn');
      if (triggerBtn) triggerBtn.focus();
    }

    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentFiltered.length > 0) {
          selectedIndex = (selectedIndex + 1) % currentFiltered.length;
          updateSelection();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentFiltered.length > 0) {
          selectedIndex = (selectedIndex - 1 + currentFiltered.length) % currentFiltered.length;
          updateSelection();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedEl = resultsContainer.querySelector(`.cmd-palette-item[data-index="${selectedIndex}"]`);
        if (selectedEl) {
          selectedEl.click();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    });

    closeBtn.addEventListener('click', closePalette);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    // Global shortcut Ctrl+K / Cmd+K / Slash key
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (modal.classList.contains('open')) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === '/' && !modal.classList.contains('open')) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea' && !document.activeElement.isContentEditable) {
          e.preventDefault();
          openPalette();
        }
      }
    });

    // Header search button trigger
    document.addEventListener('click', (e) => {
      const searchBtn = e.target.closest('#header-search-btn');
      if (searchBtn) {
        e.preventDefault();
        openPalette();
      }
    });

    // Multi-Language (i18n) Dropdown & Selector Handling
    document.addEventListener('click', (e) => {
      const langBtn = e.target.closest('#lang-picker-btn');
      const langPicker = document.getElementById('lang-picker-wrapper');
      if (langBtn && langPicker) {
        e.stopPropagation();
        const isOpen = langPicker.classList.toggle('is-open');
        langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        return;
      }

      const langItem = e.target.closest('.lang-picker__item, .mobile-nav__lang-btn');
      if (langItem) {
        const code = langItem.getAttribute('data-lang');
        if (code && window.JSON2X_I18N) {
          window.JSON2X_I18N.setLanguage(code);
          if (langPicker) {
            langPicker.classList.remove('is-open');
            const btn = document.getElementById('lang-picker-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
          // Update active states
          document.querySelectorAll('.lang-picker__item, .mobile-nav__lang-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === code;
            btn.classList.toggle('active', isActive);
          });
          const flagEl = document.getElementById('lang-current-flag');
          const codeEl = document.getElementById('lang-current-code');
          const currentConfig = window.JSON2X_I18N.LANGUAGES.find(l => l.code === code);
          if (flagEl && currentConfig) flagEl.textContent = currentConfig.flag;
          if (codeEl) codeEl.textContent = code.toUpperCase();
        }
        return;
      }

      if (langPicker && !e.target.closest('#lang-picker-wrapper')) {
        langPicker.classList.remove('is-open');
        const btn = document.getElementById('lang-picker-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
