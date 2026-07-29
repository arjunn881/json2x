const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://json2x.com';
const DOCS_DIR = path.join(WORKSPACE_ROOT, 'docs');
const CONTENT_DIR = path.join(DOCS_DIR, 'content');

if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// ── Sample MD / MDX Content Files ────────────────────────────
const SAMPLE_DOCS = [
  {
    filename: 'rfc8259-json-specification.mdx',
    frontmatter: {
      title: 'Complete RFC 8259 JSON Specification & Grammar Reference',
      description: 'An authoritative developer reference on official RFC 8259 JSON syntax rules, primitive data types, string escaping, and number encoding.',
      category: 'Guides',
      tags: ['json', 'rfc8259', 'specification', 'syntax'],
      author: 'JSON2X Engineering Team',
      date: '2026-07-28'
    },
    markdown: `
# Complete RFC 8259 JSON Specification & Grammar Reference

JSON (JavaScript Object Notation) is defined by **IETF RFC 8259** and **ECMA-404**. It is a text-based format for data interchange that is completely language independent.

## 1. Primary Data Types in JSON

RFC 8259 defines six fundamental data types:

- **Objects:** Unordered collections of key-value pairs wrapped in \`{\}\`.
- **Arrays:** Ordered sequences of values wrapped in \`[]\`.
- **Strings:** Double-quoted Unicode character sequences.
- **Numbers:** Decimal numbers (integers or floating point).
- **Booleans:** \`true\` or \`false\` (strictly lowercase).
- **Null:** Represented by the keyword literal \`null\`.

## 2. Object Grammar & Key Rules

Objects consist of zero or more key-value pairs. Every key MUST be a double-quoted string.

\`\`\`json
{
  "name": "JSON2X",
  "version": 1.0,
  "isProduction": true
}
\`\`\`

## 3. String Escaping & Special Characters

Characters that must be escaped using a backslash (\`\\\`):

- Double quote: \`\\"\`
- Backslash: \`\\\\\`
- Line feed: \`\\n\`
- Carriage return: \`\\r\`
- Tab: \`\\t\`

## 4. Frequently Asked Questions

### Is single quotes allowed in RFC 8259?
No. RFC 8259 strictly requires double quotes for keys and string values. Single quotes trigger parse exceptions.

### Can JSON numbers have leading zeros?
No. Numbers with leading zeros (e.g. \`0123\`) are invalid in JSON.
    `
  },
  {
    filename: 'typescript-zod-generation-guide.mdx',
    frontmatter: {
      title: 'TypeScript Interface & Zod Schema Generation Guide',
      description: 'Step-by-step tutorial on converting raw JSON API responses into strongly-typed TypeScript declarations and runtime Zod validation schemas.',
      category: 'Tutorials',
      tags: ['typescript', 'zod', 'schema', 'api'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-07-28'
    },
    markdown: `
# TypeScript Interface & Zod Schema Generation Guide

Type safety is crucial for modern frontend and backend development. Converting raw JSON payloads into TypeScript interfaces prevents runtime null reference errors.

## 1. Why Automate Type Generation?

Manual type writing is prone to typos and missing properties. Automated type generation analyzes JSON payload structures, inferring primitive types, optional fields, and array item schemas.

## 2. Synthesizing Zod Schemas

Zod enables runtime validation alongside compile-time TypeScript static types.

\`\`\`typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  isActive: z.boolean()
});

export type User = z.infer<typeof UserSchema>;
\`\`\`

## 3. Best Practices for API Integration

1. Store generated types in a shared \`types/\` directory.
2. Validate incoming fetch responses against Zod schemas before passing data to UI components.
    `
  },
  {
    filename: 'parsing-large-json-web-workers.mdx',
    frontmatter: {
      title: 'Parsing 100MB+ JSON Payloads with Web Workers',
      description: 'Developer guide on offloading heavy JSON parsing and streaming tokenization to dedicated background Web Workers to maintain 60FPS UI performance.',
      category: 'Performance Notes',
      tags: ['web-workers', 'performance', 'parsing', 'javascript'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-07-28'
    },
    markdown: `
# Parsing 100MB+ JSON Payloads with Web Workers

Parsing massive JSON files directly on the main thread causes UI freezing, button unresponsiveness, and poor Core Web Vitals (INP).

## 1. Web Worker Thread Offloading

By delegating \`JSON.parse()\` to a dedicated background Worker, main-thread event loops remain completely responsive.

\`\`\`javascript
// worker-formatter.js
self.onmessage = function (e) {
  try {
    const parsed = JSON.parse(e.data);
    const formatted = JSON.stringify(parsed, null, 2);
    self.postMessage({ status: 'success', result: formatted });
  } catch (err) {
    self.postMessage({ status: 'error', message: err.message });
  }
};
\`\`\`

## 2. Memory Consumption & Stream Processing

For payloads exceeding 100MB, streaming tokenizers parse tokens sequentially without instantiating massive in-memory AST graphs.
    `
  }
];

// Write sample files if not present
SAMPLE_DOCS.forEach(doc => {
  const filePath = path.join(CONTENT_DIR, doc.filename);
  let fileContent = `---\n`;
  Object.keys(doc.frontmatter).forEach(key => {
    fileContent += `${key}: ${JSON.stringify(doc.frontmatter[key])}\n`;
  });
  fileContent += `---\n\n${doc.markdown.trim()}\n`;
  fs.writeFileSync(filePath, fileContent, 'utf8');
});

// ── Markdown & Frontmatter Compiler ─────────────────────────
function parseFrontmatter(rawContent) {
  const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    return { metadata: {}, body: rawContent };
  }

  const fmLines = fmMatch[1].split(/\r?\n/);
  const metadata = {};
  fmLines.forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      try {
        val = JSON.parse(val);
      } catch (e) {}
      metadata[key] = val;
    }
  });

  return { metadata, body: fmMatch[2] };
}

function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function extractTocAndHtml(markdownBody) {
  const lines = markdownBody.split(/\r?\n/);
  const toc = [];
  let htmlResult = '';

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      // H1 heading processed in hero
    } else if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      toc.push({ level: 2, title, slug });
      htmlResult += `<h2 id="${slug}">${title}</h2>\n`;
    } else if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      toc.push({ level: 3, title, slug });
      htmlResult += `<h3 id="${slug}">${title}</h3>\n`;
    } else if (line.startsWith('```')) {
      const lang = line.replace('```', '').trim();
      if (lang) {
        htmlResult += `<pre><code class="language-${lang}">`;
      } else {
        htmlResult += `</code></pre>\n`;
      }
    } else if (line.startsWith('- ')) {
      htmlResult += `<li>${line.replace('- ', '')}</li>\n`;
    } else if (line.trim() !== '') {
      let parsedParagraph = line
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      htmlResult += `<p>${parsedParagraph}</p>\n`;
    }
  });

  return { toc, htmlResult };
}

// ── HTML Document Generator ────────────────────────────────
function generateDocPage(slug, metadata, bodyText) {
  const canonicalUrl = `${BASE_URL}/docs/${slug}.html`;
  const readingTime = calculateReadingTime(bodyText);
  const { toc, htmlResult } = extractTocAndHtml(bodyText);

  const tocHtml = toc.map(item => `
    <li class="toc-item toc-item--level-${item.level}" style="margin-bottom:var(--space-2); padding-left:${item.level === 3 ? 'var(--space-4)' : '0'};">
      <a href="#${item.slug}" style="color:var(--text-secondary); text-decoration:none; font-size:var(--text-sm);">${item.title}</a>
    </li>
  `).join('');

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${canonicalUrl}#article`,
        "headline": metadata.title,
        "description": metadata.description,
        "url": canonicalUrl,
        "datePublished": metadata.date || '2026-07-28',
        "author": {
          "@type": "Person",
          "name": metadata.author || "JSON2X Engineering Team"
        },
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
          { "@type": "ListItem", "position": 2, "name": "Documentation", "item": `${BASE_URL}/docs/index.html` },
          { "@type": "ListItem", "position": 3, "name": metadata.title, "item": canonicalUrl }
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

  <title>${metadata.title} | JSON2X Docs</title>
  <meta name="description" content="${metadata.description}" />
  <meta name="keywords" content="${(metadata.tags || []).join(', ')}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0d1117" />
  <meta name="color-scheme" content="dark light" />
  <link rel="canonical" href="${canonicalUrl}" />

  <meta property="og:type"        content="article" />
  <meta property="og:url"         content="${canonicalUrl}" />
  <meta property="og:title"       content="${metadata.title}" />
  <meta property="og:description" content="${metadata.description}" />
  <meta property="og:site_name"   content="JSON2X" />
  <meta property="og:image"       content="${BASE_URL}/assets/og-image.png" />

  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${metadata.title}" />
  <meta name="twitter:description" content="${metadata.description}" />
  <meta name="twitter:image"       content="${BASE_URL}/assets/og-image.png" />

  <script type="application/ld+json">
  ${JSON.stringify(jsonLdSchema, null, 2)}
  </script>

  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../assets/css/design-system.css" />
  <link rel="stylesheet" href="../assets/css/components.css" />

  <style>
    /* Reading Progress Bar */
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--accent);
      width: 0%;
      z-index: 1000;
      transition: width 0.1s ease-out;
    }
  </style>
</head>
<body>
  <div class="reading-progress" id="reading-progress"></div>
  <div id="site-header-placeholder"></div>

  <main id="main-content">
    <div class="container" style="padding: var(--space-12) var(--space-4);">
      <div id="breadcrumb-placeholder"></div>

      <div class="tool-hero" style="text-align:left; margin-bottom:var(--space-8)">
        <div class="tool-hero__badge">${metadata.category || 'Documentation'}</div>
        <h1 class="tool-hero__title">${metadata.title}</h1>
        <p class="tool-hero__desc">${metadata.description}</p>
        <div style="font-size:var(--text-xs); color:var(--text-muted); margin-top:var(--space-4);">
          <span><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M12 2l2 2-9 9H3v-2l9-9z" stroke="currentColor" stroke-width="1.3"/></svg> Author: ${metadata.author || 'Engineering Team'}</span> &bull;
          <span>⏱️ Estimated Reading Time: ${readingTime} min read</span> &bull;
          <span><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 6h12M5 2v2M11 2v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Updated: ${metadata.date || '2026-07-28'}</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 260px 1fr; gap:var(--space-8);">
        <!-- Sidebar Sticky Table of Contents -->
        <aside style="position:sticky; top:var(--space-8); height:fit-content; background:var(--bg-surface); border:1px solid var(--bg-border); border-radius:var(--radius-lg); padding:var(--space-6);">
          <h3 style="font-size:var(--text-sm); font-weight:var(--font-bold); margin-bottom:var(--space-4); text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted);">Table of Contents</h3>
          <ul style="list-style:none; padding:0; margin:0;">
            ${tocHtml}
          </ul>
        </aside>

        <!-- Main Article Content -->
        <article class="faq-prose">
          ${htmlResult}

          <div class="tool-cta-banner" style="margin-top:var(--space-12)">
            <h2 class="tool-cta-banner__title">Test Your Code in the Browser</h2>
            <p class="tool-cta-banner__desc">Format, validate, or convert your JSON data locally with 100% data privacy.</p>
            <a href="../tools/json-formatter.html" class="btn btn--primary" style="padding:var(--space-3) var(--space-8); text-decoration:none; font-weight:var(--font-semibold);">Launch Interactive Tools</a>
          </div>
        </article>
      </div>
    </div>
  </main>

  <div id="site-footer-placeholder"></div>

  <script src="../assets/js/common.js"></script>
  <script src="../assets/js/layout.js"></script>
  <script>
    // Reading Progress Indicator Script
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('reading-progress').style.width = scrolled + '%';
    });
  </script>
</body>
</html>`;
}

// ── Documentation Hub Page ──────────────────────────────────
function generateDocsIndexPage(docItems) {
  const canonicalUrl = `${BASE_URL}/docs/index.html`;

  const cardsHtml = docItems.map(d => `
    <a href="./${d.slug}.html" class="faq-card" style="text-decoration:none; display:block;">
      <p class="faq-section__eyebrow">${d.metadata.category || 'Guide'}</p>
      <h2 class="faq-card__q">${d.metadata.title}</h2>
      <p class="faq-card__a">${d.metadata.description}</p>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>(function(){var t;try{t=localStorage.getItem('jsontoolkit_theme')}catch(e){}if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})();</script>

  <title>Developer Documentation &amp; Technical Guides | JSON2X</title>
  <meta name="description" content="Scalable developer documentation system covering JSON RFC 8259 specifications, TypeScript type generation, Web Worker performance, and error handling." />
  <meta name="keywords" content="json docs, developer documentation, rfc 8259, typescript schema, web worker parsing" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0d1117" />
  <meta name="color-scheme" content="dark light" />
  <link rel="canonical" href="${canonicalUrl}" />

  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${canonicalUrl}" />
  <meta property="og:title"       content="Developer Documentation | JSON2X" />
  <meta property="og:description" content="Comprehensive guides and technical references for JSON and CSV developers." />
  <meta property="og:site_name"   content="JSON2X" />
  <meta property="og:image"       content="${BASE_URL}/assets/og-image.png" />

  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="Developer Documentation" />
  <meta name="twitter:description" content="Comprehensive guides and technical references." />
  <meta name="twitter:image"       content="${BASE_URL}/assets/og-image.png" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "JSON2X Documentation Hub",
    "url": "${canonicalUrl}"
  }
  </script>

  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../assets/css/design-system.css" />
  <link rel="stylesheet" href="../assets/css/components.css" />
</head>
<body>
  <div id="site-header-placeholder"></div>

  <main id="main-content">
    <div class="container" style="padding: var(--space-12) var(--space-4);">
      <div id="breadcrumb-placeholder"></div>

      <div class="tool-hero" style="text-align:left; margin-bottom:var(--space-10)">
        <div class="tool-hero__badge">Docs System</div>
        <h1 class="tool-hero__title">Developer Documentation &amp; Guides</h1>
        <p class="tool-hero__desc">Technical specifications, API explanations, TypeScript generators, and performance notes.</p>
      </div>

      <div class="faq-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6);">
        ${cardsHtml}
      </div>
    </div>
  </main>

  <div id="site-footer-placeholder"></div>
  <script src="../assets/js/common.js"></script>
  <script src="../assets/js/layout.js"></script>
</body>
</html>`;
}

// ── Build Execution ─────────────────────────────────────────
function buildDocsSystem() {
  console.log('📚 Building Scalable MD/MDX Documentation System...');

  const files = fs.readdirSync(CONTENT_DIR);
  const docItems = [];

  files.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const filePath = path.join(CONTENT_DIR, file);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const { metadata, body } = parseFrontmatter(rawContent);

      const slug = file.replace(/\.(md|mdx)$/, '');
      const htmlPage = generateDocPage(slug, metadata, body);

      fs.writeFileSync(path.join(DOCS_DIR, `${slug}.html`), htmlPage, 'utf8');
      docItems.push({ slug, metadata });
      console.log(`   - Compiled docs page: docs/${slug}.html`);
    }
  });

  // Build Docs Hub Index
  const hubHtml = generateDocsIndexPage(docItems);
  fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), hubHtml, 'utf8');

  console.log(`✅ Successfully compiled Documentation System (${docItems.length} articles + 1 Hub index)`);
}

buildDocsSystem();
