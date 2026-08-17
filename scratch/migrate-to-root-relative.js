const fs = require('fs');
const path = require('path');

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
let totalReplacements = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file).replace(/\\/g, '/'); // '.' or 'tools' or 'blog' etc.

  // Regex to match (href|src)="(\.\.?/[^"]*)" or '...'
  const updatedContent = content.replace(/(href|src)=["'](\.\.?[^"'#?]+)(\?[^"']*)?(#[^"']*)?["']/gi, (match, attr, relPath, query = '', hash = '') => {
    let resolved;
    if (fileDir === '.') {
      // file is in root
      resolved = path.posix.normalize('/' + relPath);
    } else {
      resolved = path.posix.normalize('/' + fileDir + '/' + relPath);
    }

    totalReplacements++;
    return `${attr}="${resolved}${query}${hash}"`;
  });

  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`\nCompleted migration! Total relative attributes converted: ${totalReplacements}`);
