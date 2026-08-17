const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts = ['.html', '.js']) {
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
const relativeLinks = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /(?:href|src)=["'](\.\.?[^"']*)["']/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    relativeLinks.push({ file, link: m[1] });
  }
});

console.log('Total relative href/src found:', relativeLinks.length);
const byDir = {};
relativeLinks.forEach(r => {
  const dir = path.dirname(r.file);
  byDir[dir] = byDir[dir] || [];
  byDir[dir].push(r);
});

for (const [dir, list] of Object.entries(byDir)) {
  console.log(`Directory: ${dir} (${list.length} occurrences)`);
  const uniqueLinks = [...new Set(list.map(x => x.link))];
  console.log(`   Unique relative links:`, uniqueLinks);
}
