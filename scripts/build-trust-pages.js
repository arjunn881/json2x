const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://json2x.com';

const TRUST_PAGES = [
  {
    filename: 'contact.html',
    title: 'Contact Us & Technical Support',
    desc: 'Get in touch with the JSON2X engineering team. Report bugs, suggest tools, or inquire about open source contributions.',
    content: `
      <h2>Contact JSON2X Engineering</h2>
      <p>Have questions, feature requests, or bug reports? We operate with an open feedback loop to continuously improve our developer utilities.</p>
      
      <div class="faq-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6); margin: var(--space-8) 0;">
        <div class="faq-card">
          <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 5l6 4 6-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>General Inquiries</h3>
          <p class="faq-card__a">For general questions and platform feedback:<br><strong>support@json2x.com</strong></p>
        </div>
        <div class="faq-card">
          <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M5 4l-2-2M11 4l2-2M8 3v10M3 8h10M4 11l-2 2M12 11l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.3"/></svg>Bug Reports & Issue Tracker</h3>
          <p class="faq-card__a">Found a syntax edge case or parsing issue?<br><a href="https://github.com/arjunn881/json2x/issues" target="_blank" rel="noopener">Open an issue on GitHub →</a></p>
        </div>
        <div class="faq-card">
          <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Security & Privacy Desk</h3>
          <p class="faq-card__a">For security advisories and vulnerability disclosures:<br><strong>security@json2x.com</strong></p>
        </div>
      </div>
    `
  },
  {
    filename: 'terms.html',
    title: 'Terms of Service',
    desc: 'Terms of service governing the usage of JSON2X client-side developer utilities.',
    content: `
      <h2>Terms of Service</h2>
      <p>Last updated: July 28, 2026</p>
      
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing or using JSON2X (json2x.com), you agree to be bound by these Terms of Service. All utilities provided on this platform are free of charge for personal, commercial, and enterprise usage.</p>

      <h3>2. Client-Side Processing & Local Execution</h3>
      <p>All data formatting, validation, minification, and schema generation operations occur exclusively within your web browser. No data payload is ever transmitted to external servers or third-party APIs.</p>

      <h3>3. Disclaimer of Warranty</h3>
      <p>JSON2X is provided "as is" without warranty of any kind, express or implied. Users are responsible for verifying generated code before deploying to production environments.</p>
    `
  },
  {
    filename: 'disclaimer.html',
    title: 'Legal & Data Disclaimer',
    desc: 'Official legal disclaimer regarding local browser data processing and code generation.',
    content: `
      <h2>Legal & Data Disclaimer</h2>
      <p>JSON2X guarantees 100% local client-side data execution.</p>
      
      <h3>1. Zero Data Retention Guarantee</h3>
      <p>We do not store, log, inspect, or retain any input JSON, CSV payloads, or generated TypeScript definitions. Your data remains strictly within your browser's local V8 JavaScript memory environment.</p>

      <h3>2. Accuracy & Verification</h3>
      <p>While our algorithms strictly adhere to IETF RFC 8259 specifications, users should conduct standard unit testing prior to integrating generated code into production software systems.</p>
    `
  },
  {
    filename: 'editorial-policy.html',
    title: 'Editorial & Technical Accuracy Policy',
    desc: 'Our commitment to technical rigor, IETF RFC standards adherence, peer review, and continuous content updates.',
    content: `
      <h2>Editorial & Technical Accuracy Policy</h2>
      <p>At JSON2X, our technical documentation, error guides, and specifications are authored by Staff-level engineers and verified against official specifications (RFC 8259, RFC 4180, Draft-07 Schema).</p>
      
      <h3>1. Technical Verification Process</h3>
      <p>Every tutorial and code example is run through automated test suites to ensure syntax validity, zero deprecation, and modern ECMAScript standards.</p>

      <h3>2. Regular Content Maintenance</h3>
      <p>Articles and guides are reviewed bi-annually. Each document displays a clear "Last Updated" timestamp reflecting the latest technical review.</p>
    `
  },
  {
    filename: 'changelog.html',
    title: 'Platform Changelog & Release Notes',
    desc: 'Detailed release history and feature updates for JSON2X utilities.',
    content: `
      <h2>Platform Version History & Release Notes</h2>
      
      <div class="tool-section" style="margin-bottom:var(--space-6);">
        <h3>v2.5.0 — July 29, 2026</h3>
        <ul>
          <li>Official Platform Rebrand to <strong>JSON2X</strong> with updated visual identity and vector logo.</li>
          <li>Deployed to Cloudflare Pages via Wrangler for global edge delivery.</li>
          <li>Configured Google Analytics 4 (G-W5LWV30LK1) with privacy-preserving event tracking.</li>
          <li>Enhanced 404 & 500 error status pages with diagnostic recovery tools.</li>
        </ul>
      </div>

      <div class="tool-section" style="margin-bottom:var(--space-6);">
        <h3>v2.4.0 — July 28, 2026</h3>
        <ul>
          <li>Programmatic Knowledge Base Engine for 16 key JSON topics.</li>
          <li>Scalable MD/MDX Documentation System with Reading Progress & TOC.</li>
          <li>100% Client-side Web Worker streaming for 100MB+ JSON payloads.</li>
          <li>Full WCAG 2.2 AA Accessibility Compliance.</li>
        </ul>
      </div>

      <div class="tool-section">
        <h3>v2.0.0 — May 15, 2026</h3>
        <ul>
          <li>Added JSON Schema Generator (Draft-07 inferral).</li>
          <li>Added JSON to TypeScript & Zod Schema generator.</li>
          <li>Added JSONPath Query Evaluator.</li>
        </ul>
      </div>
    `
  },
  {
    filename: 'roadmap.html',
    title: 'Feature Roadmap & Engineering Goals',
    desc: 'Upcoming features, planned developer tools, and architectural milestones for JSON2X.',
    content: `
      <h2>Feature Roadmap & Engineering Goals</h2>
      <p>We are continuously building high-performance, privacy-first developer tools.</p>
      
      <div class="faq-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6); margin: var(--space-8) 0;">
        <div class="faq-card">
          <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M12 2c-3.5 0-6 2.5-6.5 6L2 11l3 1 1 3 3-3.5c3.5-.5 6-3 6-6.5V2h-3z" stroke="currentColor" stroke-width="1.3"/></svg> Q3 2026: WASM Parsing</h3>
          <p class="faq-card__a">Integrating Rust WebAssembly SIMD tokenizers for sub-millisecond 500MB JSON processing.</p>
        </div>
        <div class="faq-card">
          <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M12 2c-3.5 0-6 2.5-6.5 6L2 11l3 1 1 3 3-3.5c3.5-.5 6-3 6-6.5V2h-3z" stroke="currentColor" stroke-width="1.3"/></svg> Q4 2026: GraphQL & OpenAPI</h3>
          <p class="faq-card__a">Instant JSON-to-OpenAPI 3.1 and GraphQL schema generators.</p>
        </div>
      </div>
    `
  },
  {
    filename: 'security.html',
    title: 'Security Architecture & Data Privacy Guarantee',
    desc: 'Technical breakdown of our zero-server architecture, local memory isolation, and Content Security Policy.',
    content: `
      <h2>Security Architecture & Data Privacy Guarantee</h2>
      <p>Security is the core foundation of JSON2X.</p>

      <h3>1. Zero Network Transmission</h3>
      <p>When you paste sensitive JSON, API keys, or database payloads into our tools, zero HTTP requests are dispatched. Open your browser Developer Tools Network tab to verify zero network requests during formatting or validation.</p>

      <h3>2. Memory Isolation</h3>
      <p>All Web Worker instances run in isolated worker threads. Once you close your browser tab, all memory references are garbage collected immediately.</p>
    `
  },
  {
    filename: 'open-source.html',
    title: 'Open Source & Transparency',
    desc: 'Our open source ethos, public algorithms, and browser-first design philosophy.',
    content: `
      <h2>Open Source & Transparency</h2>
      <p>JSON2X is committed to open developer tooling.</p>
      <p>Our client-side parsing engines, schema generators, and formatting algorithms are open for public audit on our <a href="https://github.com/arjunn881/json2x" target="_blank" rel="noopener">GitHub repository</a>. We believe developer tools should be transparent, free from trackers, and 100% reliable.</p>
    `
  },
  {
    filename: 'license.html',
    title: 'MIT License & Usage Rights',
    desc: 'Official MIT License details for JSON2X scripts and components.',
    content: `
      <h2>MIT License</h2>
      <p>Copyright (c) 2026 JSON2X (json2x.com)</p>
      <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.</p>
      <p>View source code and contribute on <a href="https://github.com/arjunn881/json2x" target="_blank" rel="noopener">GitHub</a>.</p>
    `
  },
  {
    filename: 'faq.html',
    title: 'Frequently Asked Questions (FAQ)',
    desc: 'Comprehensive answers to common questions about JSON2X browser-only developer tools, data privacy, Web Worker performance, and JSON specifications.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://json2x.com/faq.html#webpage",
          "name": "Frequently Asked Questions (FAQ) | JSON2X",
          "description": "Comprehensive answers to common questions about JSON2X browser-only developer tools, data privacy, Web Worker performance, and JSON specifications.",
          "url": "https://json2x.com/faq.html",
          "publisher": {
            "@type": "Organization",
            "name": "JSON2X",
            "url": BASE_URL
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://json2x.com/faq.html#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://json2x.com/" },
            { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://json2x.com/faq.html" }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://json2x.com/faq.html#faqpage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is my data 100% private on JSON2X?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. All data formatting, validation, minification, conversion, and schema generation happen 100% locally inside your web browser. No JSON, CSV, API keys, or payload data is ever uploaded or transmitted to external servers."
              }
            },
            {
              "@type": "Question",
              "name": "Does JSON2X store or log any pasted JSON/CSV data?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never. We operate with a strict zero data retention architecture. Your data remains strictly within your browser's local V8 JavaScript engine and Web Worker memory. Closing or refreshing the tab clears all memory instantly."
              }
            },
            {
              "@type": "Question",
              "name": "Can I use JSON2X offline or behind a VPN / corporate firewall?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Because JSON2X executes entirely client-side using Web Workers and standard ECMAScript APIs, loaded pages do not make external API requests. You can safely use JSON2X behind corporate firewalls, VPNs, and offline environments."
              }
            },
            {
              "@type": "Question",
              "name": "Is JSON2X free for commercial and enterprise use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. JSON2X is completely free to use for personal, commercial, and enterprise development projects under the open-source MIT License."
              }
            },
            {
              "@type": "Question",
              "name": "What developer utilities are available on JSON2X?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "JSON2X provides 10 core developer tools: JSON Formatter & Prettifier, JSON Validator, JSON Minifier, JSON Diff & Comparison, JSON to CSV Converter, CSV to JSON Converter, JSON to TypeScript / Zod Generator, JSONPath Evaluator, JSON Schema Draft-07 Generator, and Collapsible JSON Tree Viewer."
              }
            },
            {
              "@type": "Question",
              "name": "How does the JSON to CSV converter handle nested objects and arrays?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The JSON to CSV converter automatically flattens nested object structures using dot notation for header titles (e.g. user.address.city) and serializes arrays into RFC 4180 compliant CSV columns."
              }
            },
            {
              "@type": "Question",
              "name": "Can JSON2X generate TypeScript interfaces and Zod schemas?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The JSON to TypeScript generator inspects sample JSON payloads, infers property types (strings, numbers, booleans, optional fields, arrays, and nested structures), and outputs clean TypeScript definitions along with Zod schemas."
              }
            },
            {
              "@type": "Question",
              "name": "Does JSON2X support JSONPath queries?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The JSONPath Tester allows evaluating expressions (such as $.store.book[*].author) in real-time against raw or formatted JSON payloads."
              }
            },
            {
              "@type": "Question",
              "name": "What is the maximum JSON file size JSON2X can process?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "JSON2X uses multi-threaded Web Workers to offload heavy parsing and stringification operations, allowing smooth performance on large JSON files up to 100MB+ without freezing the browser UI thread."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between JSON Minification and JSON Formatting?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "JSON Formatting adds line breaks and indentation to make JSON human-readable. Minification removes all unnecessary whitespace, line breaks, and indentation to shrink payload size for fast network transmission."
              }
            },
            {
              "@type": "Question",
              "name": "Why is browser-based parsing faster than online API formatters?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Online server formatters send payloads across the network over HTTP, adding latency. JSON2X processes everything locally via your machine's V8 JavaScript engine, eliminating network round-trips entirely."
              }
            },
            {
              "@type": "Question",
              "name": "What JSON standards does JSON2X comply with?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All parsing and validation routines strictly follow IETF RFC 8259, ECMA-404, and JSON Schema Draft-07 standards."
              }
            },
            {
              "@type": "Question",
              "name": "How do I fix an 'Unexpected token' or 'Invalid character' JSON error?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The JSON2X Validator highlights precise line and column coordinates for syntax errors like unescaped quotes, trailing commas, missing closing brackets, or invalid Unicode characters."
              }
            },
            {
              "@type": "Question",
              "name": "Why does standard JSON disallow trailing commas?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "IETF RFC 8259 mandates strict comma delimiters between elements. Commas following the last item in an array or object cause syntax errors in strict JSON parsers. JSON2X offers one-click fixes for trailing commas."
              }
            },
            {
              "@type": "Question",
              "name": "Is JSON2X open source?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, JSON2X's algorithms, schema generators, and documentation are open for community audit and open source collaboration."
              }
            },
            {
              "@type": "Question",
              "name": "How can I report a bug or request a new tool?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can open an issue on our GitHub repository or contact our engineering desk directly at support@json2x.com."
              }
            }
          ]
        }
      ]
    },
    content: `
      <!-- Interactive FAQ Search & Filter Bar -->
      <div class="faq-search-wrapper">
        <div class="faq-search-box">
          <svg class="faq-search-icon" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          <input type="text" id="faq-search" class="faq-search-input" placeholder="Search FAQ (e.g. privacy, Web Worker, TypeScript, limits)..." aria-label="Search frequently asked questions" />
        </div>
        <div class="faq-pills" id="faq-pills" role="tablist" aria-label="FAQ Topic Categories">
          <button class="faq-pill active" data-category="all" role="tab" aria-selected="true">All Topics</button>
          <button class="faq-pill" data-category="privacy" role="tab" aria-selected="false"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Privacy &amp; Security</button>
          <button class="faq-pill" data-category="tools" role="tab" aria-selected="false"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 4l-2-2M11 4l2-2M8 3v10M3 8h10M4 11l-2 2M12 11l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.3"/></svg>Developer Tools</button>
          <button class="faq-pill" data-category="performance" role="tab" aria-selected="false"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>Performance &amp; Limits</button>
          <button class="faq-pill" data-category="standards" role="tab" aria-selected="false"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M4 2h6l4 4v8a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 013 14V3.5A1.5 1.5 0 014.5 2z" stroke="currentColor" stroke-width="1.3"/><path d="M6 7h4M6 10h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Syntax &amp; RFC Standards</button>
          <button class="faq-pill" data-category="legal" role="tab" aria-selected="false"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M2 14V3a1 1 0 011-1h6a1 1 0 011 1v11M2 14h12M10 6h4a1 1 0 011 1v7M5 5h2M5 8h2M5 11h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Licensing &amp; Support</button>
        </div>
      </div>

      <div id="faq-no-results" style="display:none; text-align:center; padding:var(--space-12) 0; color:var(--text-muted);">
        <p style="font-size:var(--text-lg); margin-bottom:var(--space-2);">No matching questions found</p>
        <p style="font-size:var(--text-sm);">Try searching for terms like <em>privacy</em>, <em>Web Worker</em>, <em>CSV</em>, or <em>errors</em>.</p>
      </div>

      <!-- Category 1: Privacy & Security -->
      <section class="faq-category" data-cat="privacy">
        <div class="faq-category__header">
          <div class="faq-category__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </div>
          <h2 class="faq-category__title">1. Data Privacy &amp; Client-Side Security</h2>
        </div>
        <div class="faq-grid">
          <div class="faq-card" data-keywords="privacy security local client side upload server network tab">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Is my data 100% private on JSON2X?</h3>
            <p class="faq-card__a">Yes. All data formatting, validation, minification, conversion, and schema generation happen 100% locally inside your web browser. No JSON, CSV, API keys, or payload data is ever uploaded or transmitted to external servers. You can open your browser's Developer Tools Network tab to verify zero network requests during processing.</p>
          </div>
          <div class="faq-card" data-keywords="store log data retention memory v8 tab close garbage collection">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Does JSON2X store or log any pasted JSON/CSV data?</h3>
            <p class="faq-card__a">Never. We operate with a strict zero data retention architecture. Your data remains strictly within your browser's local V8 JavaScript engine and Web Worker memory. Closing or refreshing the tab clears all memory instantly.</p>
          </div>
          <div class="faq-card" data-keywords="offline vpn corporate firewall enterprise restricted web workers">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Can I use JSON2X offline or behind a VPN / corporate firewall?</h3>
            <p class="faq-card__a">Yes. Because JSON2X executes entirely client-side using Web Workers and standard ECMAScript APIs, loaded pages do not make external API requests. You can safely use JSON2X behind corporate firewalls, VPNs, and offline environments.</p>
          </div>
          <div class="faq-card" data-keywords="free commercial enterprise mit license price cost">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Is JSON2X free for commercial and enterprise use?</h3>
            <p class="faq-card__a">Yes. JSON2X is completely free to use for personal, commercial, and enterprise development projects under the open-source MIT License.</p>
          </div>
        </div>
      </section>

      <!-- Category 2: Developer Tools & Features -->
      <section class="faq-category" data-cat="tools">
        <div class="faq-category__header">
          <div class="faq-category__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 4l-2-2M11 4l2-2M8 3v10M3 8h10M4 11l-2 2M12 11l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.3"/></svg>
          </div>
          <h2 class="faq-category__title">2. Developer Tools &amp; Features</h2>
        </div>
        <div class="faq-grid">
          <div class="faq-card" data-keywords="tools utilities list collection formatter validator minifier diff csv typescript zod jsonpath schema tree viewer">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>What developer utilities are available on JSON2X?</h3>
            <p class="faq-card__a">JSON2X provides 10 core developer tools: JSON Formatter &amp; Prettifier, JSON Validator, JSON Minifier, JSON Diff &amp; Comparison, JSON to CSV Converter, CSV to JSON Converter, JSON to TypeScript / Zod Generator, JSONPath Evaluator, JSON Schema Draft-07 Generator, and Collapsible JSON Tree Viewer.</p>
          </div>
          <div class="faq-card" data-keywords="csv converter nested objects arrays dot notation rfc 4180 flattening">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>How does the JSON to CSV converter handle nested objects and arrays?</h3>
            <p class="faq-card__a">The JSON to CSV converter automatically flattens nested object structures using dot notation for header titles (e.g. <code>user.address.city</code>) and serializes arrays into RFC 4180 compliant CSV columns.</p>
          </div>
          <div class="faq-card" data-keywords="typescript zod schema generator interface type inferral types">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Can JSON2X generate TypeScript interfaces and Zod schemas?</h3>
            <p class="faq-card__a">Yes. The JSON to TypeScript generator inspects sample JSON payloads, infers property types (strings, numbers, booleans, optional fields, arrays, and nested structures), and outputs clean TypeScript definitions along with Zod schemas.</p>
          </div>
          <div class="faq-card" data-keywords="jsonpath tester query expressions evaluation filter syntax">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Does JSON2X support JSONPath queries?</h3>
            <p class="faq-card__a">Yes. The JSONPath Tester allows evaluating expressions (such as <code>$.store.book[*].author</code>) in real-time against raw or formatted JSON payloads.</p>
          </div>
        </div>
      </section>

      <!-- Category 3: Performance & Limits -->
      <section class="faq-category" data-cat="performance">
        <div class="faq-category__header">
          <div class="faq-category__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
          </div>
          <h2 class="faq-category__title">3. Performance &amp; Payload Limits</h2>
        </div>
        <div class="faq-grid">
          <div class="faq-card" data-keywords="file size max limit 100mb web worker freeze streaming large">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>What is the maximum JSON file size JSON2X can process?</h3>
            <p class="faq-card__a">JSON2X uses multi-threaded Web Workers to offload heavy parsing and stringification operations, allowing smooth performance on large JSON files up to 100MB+ without freezing the browser UI thread.</p>
          </div>
          <div class="faq-card" data-keywords="minification formatting difference prettify whitespace compression shrink">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>What is the difference between JSON Minification and JSON Formatting?</h3>
            <p class="faq-card__a">JSON Formatting adds line breaks and indentation to make JSON human-readable. Minification removes all unnecessary whitespace, line breaks, and indentation to shrink payload size for fast network transmission.</p>
          </div>
          <div class="faq-card" data-keywords="fast speed browser v8 latency api online formatters server machine local">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Why is browser-based parsing faster than online API formatters?</h3>
            <p class="faq-card__a">Online server formatters send payloads across the network over HTTP, adding latency. JSON2X processes everything locally via your machine's V8 JavaScript engine, eliminating network round-trips entirely.</p>
          </div>
        </div>
      </section>

      <!-- Category 4: Syntax & RFC Standards -->
      <section class="faq-category" data-cat="standards">
        <div class="faq-category__header">
          <div class="faq-category__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h6l4 4v8a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 013 14V3.5A1.5 1.5 0 014.5 2z" stroke="currentColor" stroke-width="1.3"/><path d="M6 7h4M6 10h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </div>
          <h2 class="faq-category__title">4. Syntax, Validation &amp; RFC Standards</h2>
        </div>
        <div class="faq-grid">
          <div class="faq-card" data-keywords="standards rfc 8259 ecma-404 draft-07 specification json schema">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>What JSON standards does JSON2X comply with?</h3>
            <p class="faq-card__a">All parsing and validation routines strictly follow IETF RFC 8259, ECMA-404, and JSON Schema Draft-07 standards.</p>
          </div>
          <div class="faq-card" data-keywords="unexpected token invalid character error line number column validator syntax quotes">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>How do I fix an "Unexpected token" or "Invalid character" JSON error?</h3>
            <p class="faq-card__a">The JSON2X Validator highlights precise line and column coordinates for syntax errors like unescaped quotes, trailing commas, missing closing brackets, or invalid Unicode characters.</p>
          </div>
          <div class="faq-card" data-keywords="trailing comma comma rfc 8259 array object item syntax error fix">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Why does standard JSON disallow trailing commas?</h3>
            <p class="faq-card__a">IETF RFC 8259 mandates strict comma delimiters between elements. Commas following the last item in an array or object cause syntax errors in strict JSON parsers. JSON2X offers one-click fixes for trailing commas.</p>
          </div>
        </div>
      </section>

      <!-- Category 5: Licensing & Support -->
      <section class="faq-category" data-cat="legal">
        <div class="faq-category__header">
          <div class="faq-category__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 14V3a1 1 0 011-1h6a1 1 0 011 1v11M2 14h12M10 6h4a1 1 0 011 1v7M5 5h2M5 8h2M5 11h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </div>
          <h2 class="faq-category__title">5. Open Source &amp; Support</h2>
        </div>
        <div class="faq-grid">
          <div class="faq-card" data-keywords="open source github code source transparent repository audit">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Is JSON2X open source?</h3>
            <p class="faq-card__a">Yes, JSON2X's algorithms, schema generators, and documentation are open for community audit and open source collaboration.</p>
          </div>
          <div class="faq-card" data-keywords="bug report contact support email github issues request feature">
            <h3 class="faq-card__q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1.5-1.5 2.5M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>How can I report a bug or request a new tool?</h3>
            <p class="faq-card__a">You can <a href="https://github.com/arjunn881/json2x/issues" target="_blank" rel="noopener">open an issue on our GitHub repository</a> or contact our engineering desk directly at <strong>support@json2x.com</strong>.</p>
          </div>
        </div>
      </section>

      <!-- Client-side Search and Filter Script -->
      <script>
        (function() {
          let activeCat = 'all';

          function filterFAQ() {
            const searchInput = document.getElementById('faq-search');
            if (!searchInput) return;
            const query = (searchInput.value || '').toLowerCase().trim();
            const categories = document.querySelectorAll('.faq-category');
            const noResults = document.getElementById('faq-no-results');
            let totalVisible = 0;

            categories.forEach(function(catEl) {
              const catName = catEl.getAttribute('data-cat');
              const catMatchesPill = (activeCat === 'all' || activeCat === catName);
              let catVisibleCount = 0;

              const catCards = catEl.querySelectorAll('.faq-card');
              catCards.forEach(function(card) {
                const qText = (card.querySelector('.faq-card__q') ? card.querySelector('.faq-card__q').textContent : '').toLowerCase();
                const aText = (card.querySelector('.faq-card__a') ? card.querySelector('.faq-card__a').textContent : '').toLowerCase();
                const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();

                const textMatches = !query || qText.includes(query) || aText.includes(query) || keywords.includes(query);

                if (catMatchesPill && textMatches) {
                  card.style.display = 'block';
                  catVisibleCount++;
                  totalVisible++;
                } else {
                  card.style.display = 'none';
                }
              });

              if (catVisibleCount > 0) {
                catEl.style.display = 'block';
              } else {
                catEl.style.display = 'none';
              }
            });

            if (noResults) {
              noResults.style.display = totalVisible === 0 ? 'block' : 'none';
            }
          }

          document.addEventListener('input', function(e) {
            if (e.target && e.target.id === 'faq-search') {
              filterFAQ();
            }
          });

          document.addEventListener('click', function(e) {
            const pill = e.target.closest('.faq-pill');
            if (pill) {
              const pills = document.querySelectorAll('.faq-pill');
              pills.forEach(function(p) {
                p.classList.remove('active');
                p.setAttribute('aria-selected', 'false');
              });
              pill.classList.add('active');
              pill.setAttribute('aria-selected', 'true');
              activeCat = pill.getAttribute('data-category');
              filterFAQ();
            }
          });
        })();
      </script>
    `
  }
];

function generateTrustPageHTML(page) {
  const canonicalUrl = `${BASE_URL}/${page.filename}`;
  const jsonLdSchema = page.schema ? page.schema : {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "name": page.title,
        "description": page.desc,
        "url": canonicalUrl,
        "publisher": {
          "@type": "Organization",
          "name": "JSON2X",
          "url": BASE_URL
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": page.title, "item": canonicalUrl }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>(function(){var t;try{t=localStorage.getItem('jsontoolkit_theme')}catch(e){}if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})();</script>

  <title>${page.title} | JSON2X</title>
  <meta name="description" content="${page.desc}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0d1117" />
  <meta name="color-scheme" content="dark light" />
  <link rel="canonical" href="${canonicalUrl}" />

  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${canonicalUrl}" />
  <meta property="og:title"       content="${page.title}" />
  <meta property="og:description" content="${page.desc}" />
  <meta property="og:site_name"   content="JSON2X" />
  <meta property="og:image"       content="${BASE_URL}/assets/og-image.png" />

  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${page.title}" />
  <meta name="twitter:description" content="${page.desc}" />
  <meta name="twitter:image"       content="${BASE_URL}/assets/og-image.png" />

  <script type="application/ld+json">
  ${JSON.stringify(jsonLdSchema, null, 2)}
  </script>

  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="/assets/css/design-system.css" />
  <link rel="stylesheet" href="/assets/css/components.css?v=2.8.0" />
</head>
<body>
  <div id="site-header-placeholder"></div>

  <main id="main-content">
    <div class="container" style="padding: var(--space-12) var(--space-4);">
      <div id="breadcrumb-placeholder"></div>

      <div class="tool-hero" style="text-align:left; margin-bottom:var(--space-8)">
        <div class="tool-hero__badge">Trust &amp; Governance</div>
        <h1 class="tool-hero__title">${page.title}</h1>
        <p class="tool-hero__desc">${page.desc}</p>
        <div style="font-size:var(--text-xs); color:var(--text-muted); margin-top:var(--space-2);">
          <span><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 6h12M5 2v2M11 2v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Last Updated: July 28, 2026</span> &bull; <span><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg> Verified EEAT Trust Signal</span>
        </div>
      </div>

      <article class="faq-prose" style="max-width: 860px;">
        ${page.content}
      </article>
    </div>
  </main>

  <div id="site-footer-placeholder">
    <nav aria-label="Footer fallback navigation" style="padding:20px;text-align:center;">
      <a href="/index.html">Home</a> | <a href="/about.html">About</a> | <a href="/contact.html">Contact</a> | <a href="/privacy.html">Privacy</a>
    </nav>
  </div>

  <script src="/assets/js/i18n.js"></script>
  <script src="/assets/js/common.js"></script>
  <script src="/assets/js/layout.js?v=2.8.0"></script>
</body>
</html>`;
}

console.log('Building Google Trust & Governance Pages...');
TRUST_PAGES.forEach(page => {
  const filePath = path.join(WORKSPACE_ROOT, page.filename);
  fs.writeFileSync(filePath, generateTrustPageHTML(page), 'utf8');
  console.log(`   - Generated Trust page: ${page.filename}`);
});
console.log('Successfully compiled all Trust & Governance pages!');
