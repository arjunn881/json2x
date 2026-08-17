const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir(WORKSPACE_ROOT);
let updatedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (/<svg\b(?![^>]*\baria-hidden=)(?![^>]*\brole=)[^>]*>/i.test(content)) {
    content = content.replace(/<svg\b(?![^>]*\baria-hidden=)(?![^>]*\brole=)/gi, '<svg aria-hidden="true"');
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated SVG accessibility in: ${path.relative(WORKSPACE_ROOT, filePath)}`);
  }
});

console.log(`\nAdded aria-hidden="true" to decorative SVGs across ${updatedCount} HTML files.`);
