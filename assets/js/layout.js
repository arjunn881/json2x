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
     Single source of truth for all 10 tools.
     Add / rename tools here — all pages update automatically.
  ────────────────────────────────────────────────────────── */
  /* SVG icon strings used in tool cards and related-tools grid */
  const ICON = {
    formatter: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/><rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor"/><rect x="2" y="13" width="12" height="2" rx="1" fill="currentColor"/></svg>`,
    validator:  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    minifier:   `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 3v12M4 8l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    diff:       `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="2" width="6" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="2" width="6" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 9h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    converter:  `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 6h10M11 3l3 3-3 3M14 12H4M7 9l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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
    {
      id:    'formatter',
      aliases: ['json-formatter', 'json-beautifier', 'json-prettifier', 'json-fixer', 'json-online-formatter', 'format-json'],
      name:  'JSON Formatter',
      desc:  'Prettify, validate and syntax-highlight JSON',
      icon:  ICON.formatter,
      href:  '/tools/json-formatter.html',
    },
    {
      id:    'validator',
      aliases: ['json-validator', 'json-checker', 'json-lint', 'json-syntax-checker'],
      name:  'JSON Validator',
      desc:  'Validate JSON with precise line-level error messages',
      icon:  ICON.validator,
      href:  '/tools/json-validator.html',
    },
    {
      id:    'minifier',
      aliases: ['json-minifier', 'minify-json', 'json-compressor'],
      name:  'JSON Minifier',
      desc:  'Strip whitespace and measure compression savings',
      icon:  ICON.minifier,
      href:  '/tools/json-minifier.html',
    },
    {
      id:    'diff',
      aliases: ['json-diff', 'json-compare', 'json-diff-checker', 'compare-json'],
      name:  'JSON Diff',
      desc:  'Compare two JSON objects and highlight every change',
      icon:  ICON.diff,
      href:  '/tools/json-diff.html',
    },
    {
      id:    'json-to-csv',
      aliases: ['json-to-csv', 'json2csv', 'json-csv-converter'],
      name:  'JSON to CSV',
      desc:  'Convert JSON arrays to downloadable CSV spreadsheets',
      icon:  ICON['json-to-csv'],
      href:  '/tools/json-to-csv.html',
    },
    {
      id:    'csv-to-json',
      aliases: ['csv-to-json', 'csv2json', 'csv-json-converter'],
      name:  'CSV to JSON',
      desc:  'Parse CSV files into formatted JSON with auto-detect',
      icon:  ICON['csv-to-json'],
      href:  '/tools/csv-to-json.html',
    },
    {
      id:    'json-to-yaml',
      aliases: ['json-to-yaml', 'yaml-to-json', 'json2yaml', 'yaml2json'],
      name:  'JSON to YAML',
      desc:  'Convert JSON payloads to clean YAML and vice versa',
      icon:  ICON['json-to-yaml'],
      href:  '/tools/json-to-yaml.html',
    },
    {
      id:    'json-to-xml',
      aliases: ['json-to-xml', 'xml-to-json', 'json2xml', 'xml2json'],
      name:  'JSON to XML',
      desc:  'Convert JSON objects to valid XML with customizable root tag',
      icon:  ICON['json-to-xml'],
      href:  '/tools/json-to-xml.html',
    },
    {
      id:    'json-to-toml',
      aliases: ['json-to-toml', 'json2toml'],
      name:  'JSON to TOML',
      desc:  'Convert JSON objects to TOML configuration files',
      icon:  ICON['json-to-toml'],
      href:  '/tools/json-to-toml.html',
    },
    {
      id:    'json-to-sql',
      aliases: ['json-to-sql', 'json2sql', 'json-sql-converter'],
      name:  'JSON to SQL',
      desc:  'Convert JSON payloads into CREATE TABLE and INSERT SQL queries',
      icon:  ICON['json-to-sql'],
      href:  '/tools/json-to-sql.html',
    },
    {
      id:    'json-to-code',
      aliases: ['json-to-code', 'json-to-go', 'json-to-rust', 'json-to-python'],
      name:  'JSON to Code',
      desc:  'Generate Go structs, Rust Serde models, and Python Pydantic classes',
      icon:  ICON['json-to-code'],
      href:  '/tools/json-to-code.html',
    },
    {
      id:    'json-mock-generator',
      aliases: ['json-mock-generator', 'fake-json', 'mock-json'],
      name:  'JSON Mock Generator',
      desc:  'Generate synthetic test JSON datasets for users, products, and logs',
      icon:  ICON['json-mock-generator'],
      href:  '/tools/json-mock-generator.html',
    },
    {
      id:    'json-to-ts',
      aliases: ['typescript-generator', 'json-to-typescript', 'json-to-zod'],
      name:  'JSON to TypeScript',
      desc:  'Generate TypeScript interfaces and Zod schemas from JSON',
      icon:  ICON['json-to-ts'],
      href:  '/tools/typescript-generator.html',
    },
    {
      id:    'jsonpath',
      aliases: ['jsonpath', 'jsonpath-evaluator', 'jsonpath-tester'],
      name:  'JSONPath Tester',
      desc:  'Test JSONPath expressions against live JSON data',
      icon:  ICON.jsonpath,
      href:  '/tools/jsonpath.html',
    },
    {
      id:    'schema',
      aliases: ['json-schema-generator', 'json-schema', 'schema-generator'],
      name:  'Schema Generator',
      desc:  'Generate a JSON Schema draft-07 from any JSON sample',
      icon:  ICON.schema,
      href:  '/tools/json-schema-generator.html',
    },
    {
      id:    'viewer',
      aliases: ['json-tree-viewer', 'json-viewer', 'json-tree'],
      name:  'Tree Viewer',
      desc:  'Explore JSON as a collapsible, searchable tree',
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

  /* ── Resolve absolute path for assets ────────────────────
     Works whether served from root or a subdirectory.
  ────────────────────────────────────────────────────────── */
  function isSubdirectory() {
    const p = (window.location.pathname || '').replace(/\\/g, '/');
    return p.includes('/tools/') || p.includes('/errors/') || p.includes('/kb/') || p.includes('/blog/') || p.includes('/docs/');
  }

  function resolveHref(path) {
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    return isSubdirectory() ? '..' + cleanPath : '.' + cleanPath;
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

  /* ── Render: Site Header ──────────────────────────────────*/
  function renderHeader(currentId) {
    const currentTheme = getEffectiveTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const toggleIcon = currentTheme === 'dark' ? SUN_ICON : MOON_ICON;

    const COMPANY_LINKS = [
      { id: 'about',      name: 'About Us',          href: '/about.html',      icon: SVG.about },
      { id: 'faq',        name: 'FAQ',               href: '/faq.html',        icon: SVG.faq },
      { id: 'contact',    name: 'Contact',           href: '/contact.html',    icon: SVG.contact },
      { id: 'privacy',    name: 'Privacy Policy',     href: '/privacy.html',    icon: SVG.privacy },
      { id: 'terms',      name: 'Terms & Conditions', href: '/terms.html',      icon: SVG.terms },
      { id: 'disclaimer', name: 'Disclaimer',        href: '/disclaimer.html', icon: SVG.disclaimer },
      { id: 'license',    name: 'License',           href: '/license.html',    icon: SVG.license },
    ];

    const PRIMARY_TOOLS = TOOLS.slice(0, 5);
    const REMAINING_TOOLS = TOOLS.slice(5);

    const isMoreActive = REMAINING_TOOLS.some(t => t.id === currentId || (t.aliases && t.aliases.includes(currentId)));

    const navLinks = `
      <a class="site-nav__link${currentId === 'tools-index' ? ' active' : ''}" href="${resolveHref('/tools/index.html')}">Tools Catalog</a>
      <a class="site-nav__link${currentId === 'docs' ? ' active' : ''}" href="${resolveHref('/docs/index.html')}">Docs</a>
      <a class="site-nav__link${currentId === 'kb' ? ' active' : ''}" href="${resolveHref('/kb/index.html')}">Knowledge Base</a>
      <a class="site-nav__link${currentId === 'blog' ? ' active' : ''}" href="${resolveHref('/blog/index.html')}">Blog</a>
      <a class="site-nav__link${currentId === 'json-formatter' || currentId === 'formatter' ? ' active' : ''}" href="${resolveHref('/tools/json-formatter.html')}">JSON Formatter</a>
    `;

    const remainingToolsDropdownItems = REMAINING_TOOLS.map(t => {
      const active = (t.id === currentId || (t.aliases && t.aliases.includes(currentId))) ? ' active' : '';
      return `<a class="nav-more__item${active}" href="${resolveHref(t.href)}">${t.icon} ${t.name}</a>`;
    }).join('\n          ');

    const mobileLinks = TOOLS.map(t => {
      const active = (t.id === currentId || (t.aliases && t.aliases.includes(currentId))) ? ' active' : '';
      return `<a class="mobile-nav__link${active}" href="${resolveHref(t.href)}">${t.icon} ${t.name}</a>`;
    }).join('\n        ');

    const companyMobileLinks = COMPANY_LINKS.map(c => {
      const active = c.id === currentId ? ' active' : '';
      return `<a class="mobile-nav__link${active}" href="${resolveHref(c.href)}">${c.icon} ${c.name}</a>`;
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
      ${navLinks}
    </nav>
    <div class="nav-more" id="nav-more">
      <button class="nav-more__btn${isMoreActive ? ' active' : ''}" id="nav-more-btn" aria-haspopup="true" aria-expanded="false" aria-controls="nav-more-dropdown">
        More Tools
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="nav-more__dropdown" id="nav-more-dropdown" role="menu">
          ${remainingToolsDropdownItems}
      </div>
    </div>
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
  ${mobileLinks}
  <span class="mobile-nav__sep" aria-hidden="true"></span>
  ${companyMobileLinks}
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
    const others = TOOLS.filter(t => t.id !== currentId).slice(0, 6);
    const cards = others.map(t => `
    <a class="tool-card" href="${resolveHref(t.href)}" aria-label="${t.name}: ${t.desc}">
      <div class="tool-card__icon" aria-hidden="true">${t.icon}</div>
      <div>
        <div class="tool-card__name">${t.name}</div>
        <div class="tool-card__desc">${t.desc}</div>
      </div>
    </a>`).join('');

    return `
<section class="related-tools" aria-label="Other tools">
  <h2 class="related-tools__title">More JSON Tools</h2>
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
            { q: "What is a JSON formatter?", a: "A JSON formatter is a developer tool that parses unformatted or minified JSON text and applies proper indentation (2-space, 4-space, or tabs), line breaks, and color syntax highlighting for human readability." },
            { q: "What is the best JSON formatter online?", a: "JSON2X's Formatter is widely considered the best online JSON formatter because it operates 100% client-side inside your browser V8 engine, guaranteeing complete data privacy, zero API latency, and Web Worker support for files up to 100MB." },
            { q: "What is a JSON validator?", a: "A JSON validator checks JSON text against strict RFC 8259 syntax specifications. It pinpoints line and column offsets for syntax errors like missing double quotes, unescaped characters, or illegal trailing commas." },
            { q: "How to add JSON formatter in Notepad++?", a: "Install JSTool or JSON Viewer via Plugins ➔ Plugins Admin in Notepad++, search for 'JSTool', click Install, and press Ctrl + Alt + M to format your open document." },
            { q: "How to use JSON Formatter Chrome extension?", a: "Install a JSON Formatter extension from the Chrome Web Store. Navigating to any REST API endpoint URL in Chrome will automatically format the raw JSON response into a collapsible tree view." },
            { q: "What is the difference between XML and JSON?", a: "JSON is lighter, less verbose, and parses faster natively in JavaScript V8 engines than XML. JSON uses simple key-value pairs while XML uses custom closing tags." }
          ],
          validator: [
            { q: "What is a JSON validator?", a: "A JSON validator is a diagnostic tool that checks JSON text against strict RFC 8259 syntax specifications and highlights exact line and column error offsets." },
            { q: "Why are single quotes invalid in JSON?", a: "RFC 8259 specifies that string literals and key names must be delimited strictly by double quotes (\"). Single quotes cause a syntax error." },
            { q: "How to fix trailing comma in JSON?", a: "Remove the trailing comma after the last key or array element. Strict JSON parsers forbid commas after final items." },
            { q: "How to use a JSON Schema Validator?", a: "Paste your payload alongside a JSON Schema Draft-07 specification into our Schema Validator. The tool verifies property types, required fields, and constraints." }
          ],
          minifier: [
            { q: "What is an online JSON minifier?", a: "An online JSON minifier compresses JSON by stripping unneeded spaces, tabs, and newlines outside string literals, reducing payload size for faster HTTP network transmission." },
            { q: "How to minify JSON via CLI (Command Line)?", a: "Use jq CLI (`jq -c . input.json > output.min.json`) or Node.js `JSON.stringify(require('./input.json'))` to compress JSON in the terminal." },
            { q: "Does minifying JSON change data values?", a: "No. The minification lexer preserves all string literals, numbers, booleans, and null values byte-for-byte." }
          ],
          diff: [
            { q: "What is an online JSON diff checker?", a: "An online JSON diff checker compares two JSON objects side-by-side, visually highlighting additions (green), deletions (red), and mutated values (yellow) while ignoring key ordering differences." },
            { q: "Does JSON diff care about key order?", a: "No. Our semantic comparison engine matches object keys by name regardless of arbitrary key order variations." }
          ],
          'json-to-csv': [
            { q: "How to convert JSON to CSV?", a: "Paste a JSON array of objects into the converter, select your delimiter, and click Download CSV." },
            { q: "How to convert JSON to CSV in Python?", a: "Use Python's built-in `json` and `csv` modules or `pandas.read_json('data.json').to_csv('output.csv', index=False)`." },
            { q: "What is the best tool for converting JSON to CSV?", a: "JSON2X's JSON to CSV Converter is the best online tool because it automatically flattens nested object keys into dot-notation headers and processes data 100% locally in browser memory." }
          ],
          'csv-to-json': [
            { q: "How to convert CSV to JSON online?", a: "Drop your CSV file into our CSV to JSON Converter. The tool automatically detects column headers and coerces numeric and boolean strings into native JSON data types." },
            { q: "Does the first row of CSV become JSON keys?", a: "Yes, header column names automatically populate object property keys across generated JSON records." }
          ],
          'json-to-ts': [
            { q: "How to generate TypeScript interfaces from JSON?", a: "Paste sample JSON into JSON to TypeScript Generator to automatically infer primitive types, optional fields, and nested interfaces." },
            { q: "How to parse JSON in TypeScript?", a: "Use `JSON.parse(jsonString)` and typecast the output to your target interface: `const user: User = JSON.parse(str) as User;`." },
            { q: "How to create an array of JSON objects in TypeScript?", a: "Define an interface array type `User[]` and initialize it: `const users: User[] = [{ id: 1, name: 'Alice' }];`." },
            { q: "How to push a JSON object into an array in TypeScript?", a: "Use `Array.prototype.push()`: `users.push({ id: 2, name: 'Bob' });`." }
          ],
          jsonpath: [
            { q: "What is JSONPath syntax?", a: "`$` represents root node, `.` accesses child properties, `[*]` targets array elements, and `?(@.key == val)` evaluates filter predicates." },
            { q: "How to use JSONPath Tester in Apache JMeter?", a: "In JMeter, add a JSON Extractor post-processor to your HTTP Sampler, test your expression in our JSONPath Tester, and paste it into JMeter's JSONPath Expressions field." }
          ],
          schema: [
            { q: "What is an online JSON Schema Generator?", a: "An online JSON Schema Generator creates Draft-07 schema specifications from sample JSON payloads, inferring properties, required fields, and data constraints." },
            { q: "What is an LD-JSON Schema Generator?", a: "An LD-JSON (JSON-LD) schema generator creates structured metadata (like FAQPage, Organization, SoftwareApplication) that search engines read for Rich Results." }
          ],
          viewer: [
            { q: "What is a JSON Tree Viewer?", a: "A JSON Tree Viewer displays complex JSON objects as expandable, collapsible nodes with real-time key/value search filtering." },
            { q: "How to view JSON tree in Python?", a: "Use the `rich` library in Python: `from rich print_json; print_json(data='{...}')` to render interactive JSON tree views in the terminal." },
            { q: "How to use JSON Tree Viewer in Notepad++?", a: "Install JSON Viewer plugin via Plugins Admin in Notepad++ and click Plugins ➔ JSON Viewer ➔ Show JSON Viewer." }
          ]
        };

        const faqs = TOOL_FAQS[tool.id] || TOOL_FAQS.formatter;
        return faqs.map(item => `
          <div class="faq-card">
            <h3 class="faq-card__q">${item.q}</h3>
            <p class="faq-card__a">${item.a}</p>
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

      // "More" dropdown toggle
      const moreBtn = e.target.closest('#nav-more-btn');
      if (moreBtn) {
        const moreWrap = document.getElementById('nav-more');
        if (!moreWrap) return;
        const isOpen = moreWrap.classList.toggle('open');
        moreBtn.setAttribute('aria-expanded', String(isOpen));
        return;
      }

      // Close the More dropdown when clicking outside it
      const moreWrap = document.getElementById('nav-more');
      if (moreWrap && moreWrap.classList.contains('open')) {
        if (!moreWrap.contains(e.target)) {
          moreWrap.classList.remove('open');
          const btn = document.getElementById('nav-more-btn');
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
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
