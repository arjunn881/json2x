/**
 * update-tool-og-images.js
 * Updates og:image meta tags in the 9 priority tool HTML files
 * to point to their unique per-tool preview images.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TOOL_OG_UPDATES = [
  { file: 'tools/json-formatter.html',       img: '/assets/images/tools/json-formatter.jpg' },
  { file: 'tools/json-validator.html',       img: '/assets/images/tools/json-validator.jpg' },
  { file: 'tools/json-to-csv.html',          img: '/assets/images/tools/json-to-csv.jpg' },
  { file: 'tools/csv-to-json.html',          img: '/assets/images/tools/csv-to-json.jpg' },
  { file: 'tools/typescript-generator.html', img: '/assets/images/tools/typescript-generator.jpg' },
  { file: 'tools/json-to-yaml.html',         img: '/assets/images/tools/json-to-yaml.jpg' },
  { file: 'tools/json-diff.html',            img: '/assets/images/tools/json-diff.jpg' },
  { file: 'tools/json-to-sql.html',          img: '/assets/images/tools/json-to-sql.jpg' },
  { file: 'tools/json-tree-viewer.html',     img: '/assets/images/tools/json-tree-viewer.jpg' },
];

let updated = 0;
let skipped = 0;

TOOL_OG_UPDATES.forEach(({ file, img }) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ SKIP (not found): ${file}`);
    skipped++;
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Replace og:image content
  const before = html;
  html = html.replace(
    /(<meta\s+property=["']og:image["']\s+content=["'])[^"']+(['"])/i,
    `$1https://json2x.com${img}$2`
  );

  // Also update twitter:image if present
  html = html.replace(
    /(<meta\s+(?:name|property)=["']twitter:image["']\s+content=["'])[^"']+(['"])/i,
    `$1https://json2x.com${img}$2`
  );

  if (html !== before) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  ✓ Updated: ${file} → ${img}`);
    updated++;
  } else {
    console.log(`  ~ No og:image tag found in: ${file} (manual update may be needed)`);
    skipped++;
  }
});

console.log(`\nDone. Updated: ${updated}, Skipped/not-found: ${skipped}`);
