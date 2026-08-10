const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const OLD_DOMAIN = 'json2x.com';
const NEW_DOMAIN = 'json2x.com';

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (/\.(html|js|txt|xml|json|webmanifest)$/i.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir(WORKSPACE_ROOT);
let updatedCount = 0;

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(OLD_DOMAIN)) {
    const updated = content.replaceAll(OLD_DOMAIN, NEW_DOMAIN);
    fs.writeFileSync(filePath, updated, 'utf8');
    updatedCount++;
    console.log(`Updated: ${path.relative(WORKSPACE_ROOT, filePath)}`);
  }
});

console.log(`\n🎉 Domain replacement complete. Updated ${updatedCount} files to use ${NEW_DOMAIN}.`);
