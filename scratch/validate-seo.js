/**
 * JSON2X — Automated SEO, Accessibility & Technical Metadata Validator
 * =========================================================================
 * Parses all public HTML files and validates compliance against Google Search
 * Essentials, Open Graph, Twitter Cards, JSON-LD Schemas, and Accessibility standards.
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const CANONICAL_DOMAIN = 'https://json2x.com';

// List of public pages to audit
const PUBLIC_PAGES = [
  'index.html',
  'about.html',
  'faq.html',
  'privacy.html',
  '404.html',
  '500.html',
  'errors/404.html',
  'errors/500.html',
  'tools/index.html',
  'tools/formatter.html',
  'tools/validator.html',
  'tools/minifier.html',
  'tools/diff.html',
  'tools/json-formatter.html',
  'tools/json-validator.html',
  'tools/json-minifier.html',
  'tools/json-diff.html',
  'tools/json-to-csv.html',
  'tools/csv-to-json.html',
  'tools/json-to-yaml.html',
  'tools/json-to-xml.html',
  'tools/json-to-toml.html',
  'tools/json-to-ts.html',
  'tools/typescript-generator.html',
  'tools/jsonpath.html',
  'tools/schema.html',
  'tools/json-schema-generator.html',
  'tools/json-to-sql.html',
  'tools/json-to-code.html',
  'tools/json-mock-generator.html',
  'tools/viewer.html',
  'tools/json-tree-viewer.html',
  'blog/index.html',
  'blog/categories.html',
  'blog/tutorials.html',
  'blog/json-guides.html',
  'errors/index.html',
  'errors/unexpected-token.html',
  'errors/trailing-comma.html',
  'errors/invalid-character.html',
  'errors/unexpected-end.html',
  'contact.html',
  'terms.html',
  'disclaimer.html',
  'editorial-policy.html',
  'changelog.html',
  'roadmap.html',
  'security.html',
  'open-source.html',
  'license.html'
];

// Dynamically include all Programmatic SEO pages in /kb/
const kbDir = path.join(WORKSPACE_ROOT, 'kb');
if (fs.existsSync(kbDir)) {
  fs.readdirSync(kbDir).forEach(f => {
    if (f.endsWith('.html')) {
      PUBLIC_PAGES.push(`kb/${f}`);
    }
  });
}

// Dynamically include all Documentation pages in /docs/
const docsDir = path.join(WORKSPACE_ROOT, 'docs');
if (fs.existsSync(docsDir)) {
  fs.readdirSync(docsDir).forEach(f => {
    if (f.endsWith('.html')) {
      PUBLIC_PAGES.push(`docs/${f}`);
    }
  });
}

let totalChecks = 0;
let passedChecks = 0;
let errors = [];

function check(pageName, condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
  } else {
    errors.push(`[${pageName}] ${message}`);
  }
}

console.log('🔍 Starting Comprehensive SEO & Technical Audit...\n');

PUBLIC_PAGES.forEach(relPath => {
  const fullPath = path.join(WORKSPACE_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`[${relPath}] File does not exist!`);
    return;
  }

  const html = fs.readFileSync(fullPath, 'utf-8');

  // 1. Title Tag
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  check(relPath, !!titleMatch, 'Missing <title> tag');
  if (titleMatch) {
    const title = titleMatch[1];
    check(relPath, title.length >= 15 && title.length <= 80, `<title> length (${title.length} chars) out of range 15-80`);
    check(relPath, title.includes('JSON2X'), `<title> missing brand keyword "JSON2X"`);
  }

  // 2. Meta Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  check(relPath, !!descMatch, 'Missing <meta name="description"> tag');
  if (descMatch) {
    const desc = descMatch[1];
    check(relPath, desc.length >= 50 && desc.length <= 180, `<meta name="description"> length (${desc.length} chars) out of recommended 50-180 range`);
  }

  // 3. Robots Meta Tag
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  check(relPath, !!robotsMatch, 'Missing <meta name="robots"> tag');

  // 4. Canonical Tag
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  check(relPath, !!canonicalMatch, 'Missing <link rel="canonical"> tag');
  if (canonicalMatch) {
    check(relPath, canonicalMatch[1].startsWith(CANONICAL_DOMAIN), `Canonical URL does not start with domain ${CANONICAL_DOMAIN}`);
  }

  // 5. Theme Color & App Branding
  const themeColorMatch = html.match(/<meta\s+name=["']theme-color["']/i);
  check(relPath, !!themeColorMatch, 'Missing <meta name="theme-color"> tag');

  // Layer 1 technical additions validation
  check(relPath, fs.existsSync(path.join(WORKSPACE_ROOT, 'site.webmanifest')), 'Missing site.webmanifest file');
  check(relPath, fs.existsSync(path.join(WORKSPACE_ROOT, 'favicon.svg')), 'Missing favicon.svg file');

  // 6. Open Graph Tags
  const ogTitle = html.match(/<meta\s+property=["']og:title["']/i);
  const ogDesc = html.match(/<meta\s+property=["']og:description["']/i);
  const ogUrl = html.match(/<meta\s+property=["']og:url["']/i);
  const ogType = html.match(/<meta\s+property=["']og:type["']/i);
  const ogImage = html.match(/<meta\s+property=["']og:image["']/i);

  check(relPath, !!ogTitle, 'Missing og:title tag');
  check(relPath, !!ogDesc, 'Missing og:description tag');
  check(relPath, !!ogUrl, 'Missing og:url tag');
  check(relPath, !!ogType, 'Missing og:type tag');
  check(relPath, !!ogImage, 'Missing og:image tag');

  // 7. Twitter Card Tags
  const twitterCard = html.match(/<meta\s+name=["']twitter:card["']/i);
  const twitterTitle = html.match(/<meta\s+name=["']twitter:title["']/i);
  const twitterDesc = html.match(/<meta\s+name=["']twitter:description["']/i);
  const twitterImage = html.match(/<meta\s+name=["']twitter:image["']/i);

  check(relPath, !!twitterCard, 'Missing twitter:card tag');
  check(relPath, !!twitterTitle, 'Missing twitter:title tag');
  check(relPath, !!twitterDesc, 'Missing twitter:description tag');
  check(relPath, !!twitterImage, 'Missing twitter:image tag');

  // 8. JSON-LD Schemas
  const ldJsonScripts = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (!relPath.endsWith('404.html') && !relPath.endsWith('500.html')) {
    check(relPath, ldJsonScripts && ldJsonScripts.length >= 1, 'Missing JSON-LD <script type="application/ld+json"> schema');
    if (ldJsonScripts) {
      ldJsonScripts.forEach(scriptTag => {
        const jsonContent = scriptTag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
        try {
          const parsed = JSON.parse(jsonContent);
          check(relPath, !!parsed['@context'] && (!!parsed['@type'] || !!parsed['@graph']), 'JSON-LD schema missing @context or @type');
        } catch (e) {
          check(relPath, false, `JSON-LD syntax parse error: ${e.message}`);
        }
      });
    }
  }

  // 9. Accessibility Landmark Main Tag
  const mainMatch = html.match(/<main[^>]*id=["']main-content["']/i);
  check(relPath, !!mainMatch, 'Missing <main id="main-content"> landmark element');

  // 10. Heading Structure
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (relPath !== '404.html') {
    check(relPath, h1Matches && h1Matches.length === 1, `Must have exactly 1 <h1> tag (found ${h1Matches ? h1Matches.length : 0})`);
  }

  // 11. Internal Links & Zero Orphan Pages
  const aTags = html.match(/<a\s+[^>]*href=["']([^"']+)["']/gi);
  check(relPath, aTags && aTags.length >= 3, 'Page must contain internal links to prevent orphan status');

  // 12. WCAG 2.2 AA Image Alt Text Validation
  const imgWithoutAlt = html.match(/<img\b(?![^>]*\balt=)[^>]*>/gi);
  check(relPath, !imgWithoutAlt, 'All <img> tags must have descriptive alt attributes');

  // 13. WCAG 2.2 AA ARIA Navigation Labels
  const navsWithoutLabel = html.match(/<nav\b(?![^>]*\baria-label=)(?![^>]*\baria-labelledby=)[^>]*>/gi);
  check(relPath, !navsWithoutLabel, 'All <nav> elements must have aria-label or aria-labelledby attributes');

  // 14. WCAG 2.2 AA Decorative SVG Accessibility
  const svgWithoutAria = html.match(/<svg\b(?![^>]*\baria-hidden=)(?![^>]*\brole=)[^>]*>/gi);
  check(relPath, !svgWithoutAria, 'All decorative <svg> elements must have aria-hidden="true" or role="img"');
});

console.log('====================================================');
console.log(`Results: ${passedChecks} / ${totalChecks} audit checks passed.`);

if (errors.length === 0) {
  console.log('✅ ALL SEO, ACCESSIBILITY & TECHNICAL AUDITS PASSED WITH ZERO REGRESSIONS!');
  process.exit(0);
} else {
  console.log('\n❌ Found the following issues:');
  errors.forEach(err => console.log(`   - ${err}`));
  process.exit(1);
}
