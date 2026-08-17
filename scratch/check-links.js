const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts = ['.html']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.wrangler') {
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
console.log('Total HTML files found:', htmlFiles.length);

const linkRegex = /href=["']([^"'#?]+)(\?[^"'#]*)?(#[^"']*)?["']/gi;
const broken = [];
const allLinks = new Set();
const linksWithHtmlExt = [];
const linksWithoutHtmlExt = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('data:')) {
      continue;
    }
    
    // Check internal link
    let targetPath;
    if (href.startsWith('/')) {
      targetPath = path.join('.', href);
    } else {
      targetPath = path.join(path.dirname(file), href);
    }
    
    targetPath = path.normalize(targetPath);
    
    let existsExact = false;
    let existsWithHtml = false;
    let existsAsIndex = false;
    
    if (fs.existsSync(targetPath)) {
      const stat = fs.statSync(targetPath);
      if (stat.isFile()) {
        existsExact = true;
      } else if (stat.isDirectory() && fs.existsSync(path.join(targetPath, 'index.html'))) {
        existsAsIndex = true;
      }
    }
    
    if (!existsExact && fs.existsSync(targetPath + '.html')) {
      existsWithHtml = true;
    }

    if (!existsExact && !existsWithHtml && !existsAsIndex) {
      broken.push({
        sourceFile: file,
        href: href,
        targetPath: targetPath
      });
    }
  }
}

console.log('Total broken link references found:', broken.length);
const brokenByTarget = {};
broken.forEach(b => {
  brokenByTarget[b.href] = brokenByTarget[b.href] || [];
  brokenByTarget[b.href].push(b.sourceFile);
});

console.log('Broken targets summary:');
for (const [target, sources] of Object.entries(brokenByTarget)) {
  console.log(`- "${target}" (referenced in ${sources.length} files, e.g. ${sources.slice(0, 3).join(', ')})`);
}
