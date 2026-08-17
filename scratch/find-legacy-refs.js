const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts = ['.html', '.js', '.xml', '.txt']) {
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

const files = getAllFiles('.');
const legacyNames = ['formatter.html', 'validator.html', 'minifier.html', 'diff.html', 'converter.html', 'schema.html', 'viewer.html', 'json-to-ts.html'];

console.log('Searching for legacy alias references across files:\n');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  legacyNames.forEach(legacy => {
    // Look for /tools/legacy or tools/legacy
    const pattern = new RegExp(`tools\\/${legacy}`, 'g');
    const matches = content.match(pattern);
    if (matches) {
      console.log(`In ${file}: found ${matches.length} occurrences of "tools/${legacy}"`);
    }
  });
});
