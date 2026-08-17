const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', 'scratch', 'scripts', '.git', '.wrangler'];

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
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walkDir(WORKSPACE_ROOT);
let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('/assets/js/common.js') && !content.includes('/assets/js/i18n.js')) {
    content = content.replace(
      /(<script\s+src=["']\/assets\/js\/common\.js["']><\/script>)/i,
      '<script src="/assets/js/i18n.js"></script>\n  $1'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Successfully added i18n.js script tag to ${updatedCount} HTML files.`);
