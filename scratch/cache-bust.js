const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', '.git', '.wrangler'];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        results = results.concat(walkDir(fullPath));
      }
    } else {
      if (file.endsWith('.html') || file.endsWith('.js')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walkDir(WORKSPACE_ROOT);
let count = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  if (content.includes('layout.js') && !content.includes('layout.js?v=2.5.1')) {
    content = content.replace(/layout\.js(?:\?v=[\d\.]+)?/g, 'layout.js?v=2.5.1');
    changed = true;
  }
  if (content.includes('components.css') && !content.includes('components.css?v=2.5.1')) {
    content = content.replace(/components\.css(?:\?v=[\d\.]+)?/g, 'components.css?v=2.5.1');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    count++;
    console.log(`Updated cache bust: ${path.relative(WORKSPACE_ROOT, filePath)}`);
  }
});

console.log(`\nUpdated ${count} files with cache bust query parameters.`);
