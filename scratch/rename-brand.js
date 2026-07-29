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
      if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.txt') || file.endsWith('.xml') || file.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walkDir(WORKSPACE_ROOT);
let modifiedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('JSON2X')) {
    content = content.replace(/JSON2X/g, 'JSON2X');
    fs.writeFileSync(filePath, content, 'utf-8');
    modifiedCount++;
    console.log(`Updated: ${path.relative(WORKSPACE_ROOT, filePath)}`);
  }
});

console.log(`\nSuccessfully updated ${modifiedCount} files.`);
