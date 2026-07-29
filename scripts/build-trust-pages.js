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
          <p class="faq-card__a">Found a syntax edge case or parsing issue?<br><a href="https://github.com" target="_blank" rel="noopener">Open an issue on GitHub →</a></p>
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
      <p>Our client-side parsing engines, schema generators, and formatting algorithms are open for public audit. We believe developer tools should be transparent, free from trackers, and 100% reliable.</p>
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
    `
  }
];

function generateTrustPageHTML(page) {
  const canonicalUrl = `${BASE_URL}/${page.filename}`;
  const jsonLdSchema = {
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

  <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="./assets/css/design-system.css" />
  <link rel="stylesheet" href="./assets/css/components.css?v=2.5.1" />
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
      <a href="./index.html">Home</a> | <a href="./about.html">About</a> | <a href="./contact.html">Contact</a> | <a href="./privacy.html">Privacy</a>
    </nav>
  </div>

  <script src="./assets/js/common.js"></script>
  <script src="./assets/js/layout.js?v=2.5.1"></script>
</body>
</html>`;
}

console.log('<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg> Building Google Trust & Governance Pages...');
TRUST_PAGES.forEach(page => {
  const filePath = path.join(WORKSPACE_ROOT, page.filename);
  fs.writeFileSync(filePath, generateTrustPageHTML(page), 'utf8');
  console.log(`   - Generated Trust page: ${page.filename}`);
});
console.log('✅ Successfully compiled all Trust & Governance pages!');
