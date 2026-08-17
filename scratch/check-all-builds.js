const fs = require('fs');
const path = require('path');

// 1. Check build-pseo.js
const pseoContent = fs.readFileSync('scripts/build-pseo.js', 'utf8');
const pseoTools = Array.from(pseoContent.matchAll(/primaryTool:\s*['"]([^'"]+)['"]/g), m => m[1]);
console.log('PSEO primaryTools:', [...new Set(pseoTools)]);
pseoTools.forEach(t => {
  if (!fs.existsSync(`tools/${t}.html`)) {
    console.log(`[PSEO ERROR] Missing tool file: tools/${t}.html`);
  }
});

// 2. Check build-docs.js
const docsContent = fs.readFileSync('scripts/build-docs.js', 'utf8');
const docsSlugs = Array.from(docsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g), m => m[1]);
console.log('Docs slugs:', docsSlugs);

// 3. Check build-trust-pages.js
const trustContent = fs.readFileSync('scripts/build-trust-pages.js', 'utf8');
const trustSlugs = Array.from(trustContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g), m => m[1]);
console.log('Trust slugs:', trustSlugs);

// 4. Check layout.js TOOLS vs files in /tools/
const layoutContent = fs.readFileSync('assets/js/layout.js', 'utf8');
const layoutHrefs = Array.from(layoutContent.matchAll(/href:\s*['"]([^'"]+)['"]/g), m => m[1]);
console.log('Layout hrefs count:', layoutHrefs.length);
layoutHrefs.forEach(h => {
  let target = h;
  if (target.startsWith('/')) target = '.' + target;
  if (!fs.existsSync(target)) {
    console.log(`[LAYOUT ERROR] Missing target file: ${target} (from href: ${h})`);
  }
});
