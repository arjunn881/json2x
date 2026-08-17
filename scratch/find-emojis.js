const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const EXTENSIONS = ['.html', '.js'];

// Broad symbol & emoji matcher:
// - All emojis and pictographs
// - Miscellaneous Symbols \u2600-\u26FF
// - Dingbats \u2700-\u27BF
// - Arrows / geometric shapes that might be used as pseudo-icons
const SYMBOL_REGEX = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}-\u{2B55}\u{203C}\u{2049}\u{2139}\u{2194}-\u{21AA}\u{2934}-\u{2935}\u{25A0}-\u{25FF}\u{2702}-\u{27B0}]/gu;

function scanDir(dir, results = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === '.gemini' || item === 'brain') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, results);
    } else if (EXTENSIONS.includes(path.extname(fullPath))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        const matches = line.match(SYMBOL_REGEX);
        if (matches) {
          results.push({
            file: path.relative(WORKSPACE, fullPath).replace(/\\/g, '/'),
            line: idx + 1,
            matches: matches,
            text: line.trim()
          });
        }
      });
    }
  }
  return results;
}

const found = scanDir(WORKSPACE);
console.log(`Found ${found.length} lines with symbols/emojis:`);
found.forEach(f => {
  console.log(`${f.file}:${f.line} -> [${f.matches.join(', ')}] : ${f.text.substring(0, 120)}`);
});
