const fs = require('fs');
const path = require('path');
const http = require('http');

// Get all html files
function getAllFiles(dir, exts = ['.html']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.wrangler' && file !== 'scratch') {
        results = results.concat(getAllFiles(fullPath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const htmlFiles = getAllFiles('.');
console.log('Auditing HTML files:', htmlFiles.length);

// Extract all hrefs from static HTML
const allLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match href="..." and src="..."
  const regex = /(?:href|src)=["']([^"'#]+)(#[^"']*)?["']/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    let raw = m[1].split('?')[0].split('#')[0];
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//') || raw.startsWith('mailto:') || raw.startsWith('data:') || raw.startsWith('javascript:')) {
      continue;
    }
    allLinks.push({
      file,
      raw
    });
  }
});

// Also check links from layout.js
const layoutJs = fs.readFileSync('assets/js/layout.js', 'utf8');
// In layout.js, resolveHref is:
// function isSubdirectory(p) { return p.includes('/tools/') || p.includes('/errors/') || p.includes('/kb/') || p.includes('/blog/') || p.includes('/docs/'); }
// function resolveHref(currentPath, target) { return isSubdirectory(currentPath) ? '..' + target : '.' + target; }

// Let's test every page in htmlFiles with layout.js generated links!
htmlFiles.forEach(file => {
  const normPath = '/' + file.replace(/\\/g, '/');
  // Check if layout.js is included in file
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('layout.js')) {
    // layout.js links:
    const layoutHrefs = [
      '/about.html', '/faq.html', '/contact.html', '/privacy.html', '/terms.html', '/disclaimer.html', '/license.html',
      '/index.html', '/tools/index.html', '/docs/index.html', '/kb/index.html', '/blog/index.html',
      '/tools/json-formatter.html', '/tools/json-validator.html', '/tools/json-minifier.html', '/tools/json-diff.html',
      '/tools/json-to-csv.html', '/tools/csv-to-json.html', '/tools/json-to-yaml.html', '/tools/json-to-xml.html',
      '/tools/json-to-toml.html', '/tools/json-to-sql.html', '/tools/json-converter.html', '/tools/typescript-generator.html',
      '/tools/json-to-code.html', '/tools/json-schema-generator.html', '/tools/json-mock-generator.html',
      '/tools/jsonpath.html', '/tools/json-tree-viewer.html',
      '/errors/unexpected-token.html', '/errors/trailing-comma.html', '/errors/invalid-character.html',
      '/errors/unexpected-end.html', '/errors/index.html',
      '/blog/json-guides.html', '/blog/tutorials.html',
      '/security.html', '/editorial-policy.html', '/changelog.html', '/roadmap.html', '/open-source.html'
    ];

    const isSub = normPath.includes('/tools/') || normPath.includes('/errors/') || normPath.includes('/kb/') || normPath.includes('/blog/') || normPath.includes('/docs/');
    layoutHrefs.forEach(lh => {
      const resolvedRelative = isSub ? '..' + lh : '.' + lh;
      allLinks.push({
        file: file + ' (via layout.js)',
        raw: resolvedRelative,
        pageUrl: normPath
      });
    });
  }
});

console.log(`Total link occurrences to verify: ${allLinks.length}`);

// Now verify how each link resolves in browser
const broken = [];
allLinks.forEach(({ file, raw, pageUrl }) => {
  const baseFile = file.split(' ')[0];
  let fullTarget;
  if (raw.startsWith('/')) {
    fullTarget = path.join('.', raw);
  } else {
    fullTarget = path.join(path.dirname(baseFile), raw);
  }
  fullTarget = path.normalize(fullTarget);

  if (!fs.existsSync(fullTarget)) {
    broken.push({
      file,
      raw,
      fullTarget
    });
  }
});

console.log(`Broken links count: ${broken.length}`);
if (broken.length > 0) {
  broken.forEach(b => {
    console.log(`- From ${b.file}: link "${b.raw}" -> "${b.fullTarget}" does not exist!`);
  });
}
