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
let totalReplacements = 0;

// SVG Replacement Snippets
const svgLock = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3"/></svg>`;
const svgZap  = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
const svgShield = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
const svgGlobe = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M2 8h12M8 2a9 9 0 010 12M8 2a9 9 0 000 12" stroke="currentColor" stroke-width="1.3"/></svg>`;
const svgDoc = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3zM13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Specific text + emoji replacements in index.html and others
  if (content.includes('<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3"/></svg> Web Worker Privacy')) {
    content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3"/></svg>\s*Web Worker Privacy/g, `${svgLock} Web Worker Privacy`);
    changed = true;
  }
  if (content.includes('<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg> Zero Network Latency')) {
    content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>\s*Zero Network Latency/g, `${svgZap} Zero Network Latency`);
    changed = true;
  }
  if (content.includes('<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg> IETF RFC 8259 Compliant')) {
    content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>\s*IETF RFC 8259 Compliant/g, `${svgShield} IETF RFC 8259 Compliant`);
    changed = true;
  }
  if (content.includes('<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M2 8h12M8 2a9 9 0 010 12M8 2a9 9 0 000 12" stroke="currentColor" stroke-width="1.3"/></svg> Offline &amp; PWA Ready') || content.includes('<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M2 8h12M8 2a9 9 0 010 12M8 2a9 9 0 000 12" stroke="currentColor" stroke-width="1.3"/></svg> Offline & PWA Ready')) {
    content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M2 8h12M8 2a9 9 0 010 12M8 2a9 9 0 000 12" stroke="currentColor" stroke-width="1.3"/></svg>\s*Offline &amp; PWA Ready/g, `${svgGlobe} Offline &amp; PWA Ready`);
    content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M2 8h12M8 2a9 9 0 010 12M8 2a9 9 0 000 12" stroke="currentColor" stroke-width="1.3"/></svg>\s*Offline & PWA Ready/g, `${svgGlobe} Offline & PWA Ready`);
    changed = true;
  }

  // Generic replacements inside hub-item__icon or text
  if (content.includes('<div class="hub-item__icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></div>')) {
    content = content.replace('<div class="hub-item__icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></div>', `<div class="hub-item__icon">${svgZap}</div>`);
    changed = true;
  }
  if (content.includes('<div class="hub-item__icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3zM13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></div>')) {
    content = content.replace('<div class="hub-item__icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3zM13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></div>', `<div class="hub-item__icon">${svgDoc}</div>`);
    changed = true;
  }
  if (content.includes('<div class="hub-item__icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></div>')) {
    content = content.replace('<div class="hub-item__icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3zM13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></div>', `<div class="hub-item__icon">${svgShield}</div>`);
    changed = true;
  }

  // Strip orphan emojis in user-facing HTML/JS
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 7V4.5a3 3 0 016 0V7" stroke="currentColor" stroke-width="1.3"/></svg>/g, svgLock);
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>/g, svgZap);
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M8 2l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 14.5 2 11.5 2 8V4l6-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>/g, svgShield);
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M2 8h12M8 2a9 9 0 010 12M8 2a9 9 0 000 12" stroke="currentColor" stroke-width="1.3"/></svg>/g, svgGlobe);
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3zM13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>/g, svgDoc);
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M3 3h4a2 2 0 012 2v8a2 2 0 00-2-2H3V3zM13 3H9a2 2 0 00-2 2v8a2 2 0 012-2h4V3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>/g, svgDoc);
  content = content.replace(/<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>/g, svgZap);

  if (content !== fs.readFileSync(filePath, 'utf-8')) {
    fs.writeFileSync(filePath, content, 'utf-8');
    totalReplacements++;
    console.log(`Replaced emojis with SVG icons in: ${path.relative(WORKSPACE_ROOT, filePath)}`);
  }
});

console.log(`\nUpdated ${totalReplacements} files with clean SVG icons.`);
