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
const brokenLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match href, src, action
  const regex = /(?:href|src|action)=["']([^"'#?]+)(?:\?[^"']*)?(?:#[^"']*)?["']/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const rawUrl = match[1];
    if (
      !rawUrl ||
      rawUrl.startsWith('http:') ||
      rawUrl.startsWith('https:') ||
      rawUrl.startsWith('//') ||
      rawUrl.startsWith('mailto:') ||
      rawUrl.startsWith('tel:') ||
      rawUrl.startsWith('javascript:') ||
      rawUrl.startsWith('data:') ||
      rawUrl.startsWith('#')
    ) {
      continue;
    }

    // Resolve as a browser would:
    // If rawUrl starts with '/', it is relative to root '.'
    // If rawUrl does NOT start with '/', it is relative to path.dirname(file)
    let resolvedPath;
    if (rawUrl.startsWith('/')) {
      resolvedPath = path.join('.', rawUrl);
    } else {
      resolvedPath = path.join(path.dirname(file), rawUrl);
    }

    resolvedPath = path.normalize(resolvedPath);

    // Check existence
    let exists = false;
    if (fs.existsSync(resolvedPath)) {
      const st = fs.statSync(resolvedPath);
      if (st.isFile()) exists = true;
      if (st.isDirectory() && fs.existsSync(path.join(resolvedPath, 'index.html'))) exists = true;
    }

    if (!exists) {
      brokenLinks.push({
        sourceFile: file,
        rawUrl: rawUrl,
        resolvedPath: resolvedPath
      });
    }
  }
});

console.log(`Total broken links found: ${brokenLinks.length}`);
brokenLinks.forEach(b => {
  console.log(`[Broken] In ${b.sourceFile}:`);
  console.log(`         href/src = "${b.rawUrl}" -> resolves to "${b.resolvedPath}" (NOT FOUND)`);
});
