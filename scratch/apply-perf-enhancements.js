/**
 * apply-perf-enhancements.js
 * Applies the following performance enhancements to all tool HTML pages:
 *
 * 1. Add <link rel="preconnect"> for Google Fonts (eliminates DNS lookup delay)
 * 2. Add <link rel="preload"> for critical CSS files (eliminates render-blocking)
 * 3. Add `defer` to i18n.js, common.js, layout.js (non-blocking JS execution)
 * 4. Add `loading="lazy"` to all <img> tags below the fold
 * 5. Add `fetchpriority="high"` to above-fold OG images in meta
 * 6. Add `<meta name="format-detection">` to prevent iOS phone number detection
 * 7. Ensure `<link rel="dns-prefetch">` for external resources
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// All HTML files to process (tools + root pages)
function getAllHtml(dir, results = []) {
  const SKIP = ['node_modules', 'scratch', 'scripts', '.git', 'admin'];
  const SKIP_FILES = ['_template.html', 'converter.html', 'formatter.html',
    'validator.html', 'minifier.html', 'diff.html', 'schema.html',
    'viewer.html', 'json-to-ts.html'];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP.includes(entry)) getAllHtml(full, results);
    } else if (entry.endsWith('.html') && !SKIP_FILES.includes(entry)) {
      results.push(full);
    }
  }
  return results;
}

const PRECONNECT_BLOCK = `  <!-- ── Performance: DNS prefetch & preconnect ─────────── -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />`;

const PRELOAD_CSS_BLOCK = `  <!-- ── Performance: Preload critical CSS ──────────────── -->
  <link rel="preload" href="/assets/css/design-system.css" as="style" />
  <link rel="preload" href="/assets/css/components.css" as="style" />`;

const FORMAT_DETECTION = `  <meta name="format-detection" content="telephone=no" />`;

let filesProcessed = 0;
let filesChanged = 0;

const files = getAllHtml(ROOT);

for (const filePath of files) {
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // 1. Add preconnect block after <head> opening if not already present
  if (!html.includes('fonts.googleapis.com') && !html.includes('preconnect')) {
    html = html.replace(/<head>\s*/i, `<head>\n${PRECONNECT_BLOCK}\n`);
  }

  // 2. Add preload for critical CSS (after charset meta, before stylesheets)
  if (!html.includes('rel="preload"') && !html.includes("rel='preload'")) {
    // Insert before the first <link rel="stylesheet">
    html = html.replace(
      /(\s*<link\s+rel="stylesheet"\s+href="\/assets\/css\/design-system\.css")/,
      `\n${PRELOAD_CSS_BLOCK}\n$1`
    );
  }

  // 3. Add format-detection meta (prevents iOS auto-linking numbers/emails)
  if (!html.includes('format-detection')) {
    html = html.replace(
      /(<meta\s+name="robots"[^>]+>)/i,
      `$1\n${FORMAT_DETECTION}`
    );
  }

  // 4. Add `defer` to shared script tags (i18n.js, common.js, layout.js)
  // These are at the bottom of body, but defer removes any render-blocking risk
  html = html.replace(
    /(<script\s+src="\/assets\/js\/i18n\.js")(\s*>)/g,
    '$1 defer$2'
  );
  html = html.replace(
    /(<script\s+src="\/assets\/js\/common\.js")(\s*>)/g,
    '$1 defer$2'
  );
  html = html.replace(
    /(<script\s+src="\/assets\/js\/layout\.js[^"]*")(\s*>)/g,
    '$1 defer$2'
  );

  // 5. Add loading="lazy" to <img> tags that don't already have it
  // (Excludes OG/Twitter meta images which are not actual DOM images)
  html = html.replace(
    /(<img\b(?![^>]*loading=)[^>]*)(\/?>)/g,
    '$1 loading="lazy"$2'
  );

  filesProcessed++;
  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    filesChanged++;
    const rel = path.relative(ROOT, filePath);
    console.log(`  ✓ Enhanced: ${rel}`);
  }
}

console.log(`\nPerformance enhancement complete.`);
console.log(`  Files scanned:  ${filesProcessed}`);
console.log(`  Files modified: ${filesChanged}`);
