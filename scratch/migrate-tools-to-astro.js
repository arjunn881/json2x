const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'tools');
const OUT_PAGES_TOOLS = path.join(ROOT, 'src', 'pages', 'tools');

const toolFiles = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.html') && f !== '_template.html' && f !== 'index.html');

console.log(`Found ${toolFiles.length} tool HTML files to migrate.`);

toolFiles.forEach(file => {
  const filePath = path.join(TOOLS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const baseName = file.replace('.html', '');

  // Extract <style>
  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  let customStyle = styleMatch ? styleMatch[1] : '';

  // Extract main body
  let mainBody = '';
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    let body = mainMatch[1];

    // Find starting point (first interactive toolbar or workspace pane)
    const startPoints = [
      '<div class="fm-toolbar"',
      '<div class="toolbar"',
      '<div class="options-bar"',
      '<div class="split-pane"',
      '<div class="pane"',
      '<div class="converter-workspace"',
      '<div class="diff-workspace"',
      '<div class="generator-workspace"'
    ];

    let startIdx = -1;
    for (const sp of startPoints) {
      const idx = body.indexOf(sp);
      if (idx !== -1 && (startIdx === -1 || idx < startIdx)) {
        startIdx = idx;
      }
    }

    if (startIdx !== -1) {
      body = body.slice(startIdx);
    }

    // Cut off everything from related-tools-placeholder, faq-section, info prose onwards
    const cutPoints = [
      '<div id="related-tools-placeholder"',
      '<div id="faq-placeholder"',
      '<div class="tool-info-prose"',
      '<section class="faq-section"',
      '<section class="tool-section"',
      '<section style="margin-top:var(--space-16)',
      '<section style="margin-top: var(--space-16)'
    ];

    let earliestCut = body.length;
    cutPoints.forEach(cp => {
      const idx = body.indexOf(cp);
      if (idx !== -1 && idx < earliestCut) {
        earliestCut = idx;
      }
    });

    body = body.slice(0, earliestCut).trim();

    // Check open/close <div> balance
    let openCount = (body.match(/<div(\s|>)/g) || []).length;
    let closeCount = (body.match(/<\/div>/g) || []).length;
    while (closeCount > openCount && body.endsWith('</div>')) {
      body = body.slice(0, body.lastIndexOf('</div>')).trim();
      closeCount = (body.match(/<\/div>/g) || []).length;
    }
    while (openCount > closeCount) {
      body = body + '\n</div>';
      closeCount++;
    }

    mainBody = body;
  }

  // Extract inline <script> tags
  const scripts = [];
  const scriptRegex = /<script(?![^>]*src=)([^>]*)>([\s\S]*?)<\/script>/g;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const attrs = match[1];
    const scriptBody = match[2];
    if (attrs.includes('application/ld+json') || scriptBody.includes('jsontoolkit_theme')) continue;
    scripts.push(scriptBody);
  }

  const astroContent = `---
import ToolLayout from '../../layouts/ToolLayout.astro';
import { getToolBySlugOrId } from '../../data/tools';

const tool = getToolBySlugOrId('${baseName}') || {
  id: '${baseName}',
  slug: '${baseName}',
  aliases: [],
  name: '${baseName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}',
  title: '${baseName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} — JSON2X',
  metaDesc: 'Free client-side developer tool on JSON2X.',
  keywords: '${baseName.replace(/-/g, ' ')}',
  desc: 'Developer tool',
  category: 'format-validate',
  icon: '',
  href: '/tools/${file}',
  related: [],
  faqs: []
};
---

<ToolLayout tool={tool}>
  ${customStyle ? `<style>\n${customStyle}\n</style>` : ''}

  ${mainBody}

  ${scripts.length > 0 ? `<script is:inline>\n${scripts.join('\n\n')}\n</script>` : ''}
</ToolLayout>
`;

  const outPath = path.join(OUT_PAGES_TOOLS, `${baseName}.astro`);
  fs.writeFileSync(outPath, astroContent, 'utf8');
});

console.log('Successfully regenerated all tool astro components with balanced markup.');
