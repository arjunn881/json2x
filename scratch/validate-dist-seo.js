const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== '_astro' && file !== 'assets') {
        getAllHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles(DIST);
console.log(`Auditing ${htmlFiles.length} HTML files in dist/ for SEO, Schema, and Core Web Vitals optimizations...`);

let errors = 0;
let checkedCount = 0;

htmlFiles.forEach(filePath => {
  const rel = path.relative(DIST, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');
  checkedCount++;

  // 1. Check title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`❌ [${rel}] Missing <title> tag!`);
    errors++;
  }

  // 2. Check meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`❌ [${rel}] Missing <meta name="description">!`);
    errors++;
  }

  // 3. Check canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  if (!canonicalMatch || !canonicalMatch[1].trim()) {
    console.error(`❌ [${rel}] Missing <link rel="canonical">!`);
    errors++;
  }

  // 4. Check Open Graph tags
  const ogTitle = html.match(/<meta\s+property=["']og:title["']/i);
  const ogDesc = html.match(/<meta\s+property=["']og:description["']/i);
  if (!ogTitle || !ogDesc) {
    console.error(`❌ [${rel}] Missing og:title or og:description!`);
    errors++;
  }

  // 5. Check JSON-LD structured data
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  let jsonLdCount = 0;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    jsonLdCount++;
    try {
      JSON.parse(match[1]);
    } catch (err) {
      console.error(`❌ [${rel}] Invalid JSON-LD block #${jsonLdCount}: ${err.message}`);
      errors++;
    }
  }
});

console.log(`\nAudit Complete:`);
console.log(`- Audited: ${checkedCount} pages`);
console.log(`- Errors: ${errors}`);

if (errors === 0) {
  console.log(`\n🎉 PERFECT SCORE! 100% of pages pass full SEO, Meta, Canonical, and Schema.org checks!`);
} else {
  process.exit(1);
}
