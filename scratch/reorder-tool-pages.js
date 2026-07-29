const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(WORKSPACE_ROOT, 'tools');

const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(filename => {
  const filePath = path.join(TOOLS_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // 1. Remove ad slot placeholders
  if (content.includes('ad-slot-rectangle-placeholder')) {
    content = content.replace(/<div style="display:flex;\s*justify-content:center;[^">]*">\s*<div id="ad-slot-rectangle-placeholder"><\/div>\s*<\/div>/g, '');
    content = content.replace(/<div id="ad-slot-rectangle-placeholder"><\/div>/g, '');
    modified = true;
  }

  // 2. Extract tool-hero__desc and place it below workspace
  const heroDescMatch = content.match(/<p class="tool-hero__desc">([\s\S]*?)<\/p>/i);
  if (heroDescMatch && content.includes('<div class="tool-hero">')) {
    const fullDesc = heroDescMatch[0];
    const innerDesc = heroDescMatch[1].trim();

    // Remove from top tool-hero
    content = content.replace(fullDesc, '');

    // Insert as a clean info block before related-tools-placeholder or faq-section
    const newDescBlock = `
      <div class="tool-info-prose" style="margin-top:var(--space-8);margin-bottom:var(--space-6);max-width:800px;">
        <p class="tool-hero__desc" style="font-size:var(--text-base);color:var(--text-secondary);line-height:var(--leading-relaxed)">${innerDesc}</p>
      </div>\n`;

    if (content.includes('<div id="related-tools-placeholder"')) {
      content = content.replace('<div id="related-tools-placeholder"', newDescBlock + '      <div id="related-tools-placeholder"');
      modified = true;
    } else if (content.includes('<section class="faq-section"')) {
      content = content.replace('<section class="faq-section"', newDescBlock + '      <section class="faq-section"');
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log(`Reordered tool layout: ${filename}`);
  }
});

// Also remove ad slot from index.html if present
const indexPath = path.join(WORKSPACE_ROOT, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  if (indexContent.includes('ad-slot-rectangle-placeholder')) {
    indexContent = indexContent.replace(/<div id="ad-slot-rectangle-placeholder"><\/div>/g, '');
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log('Removed ad slot from index.html');
  }
}

console.log(`\nReordered ${updatedCount} tool pages.`);
