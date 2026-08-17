const fs = require('fs');
const path = require('path');

const toolFiles = fs.readdirSync('tools').filter(f => f.endsWith('.html') && f !== '_template.html' && f !== 'index.html');

console.log(`Analyzing ${toolFiles.length} tool HTML files:\n`);

toolFiles.forEach(file => {
  const content = fs.readFileSync(path.join('tools', file), 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const metaRobotsMatch = content.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const isRedirect = content.includes('http-equiv="refresh"') || content.includes('location.replace') || content.includes('window.location =');
  const mainToolMatch = content.match(/<main[^>]+data-tool=["']([^"']+)["']/i);
  const scriptTags = [...content.matchAll(/<script[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
  const inlineScriptsCount = (content.match(/<script(?![^>]*src=)[^>]*>/gi) || []).length;
  
  console.log(`File: tools/${file}`);
  console.log(`  Title: ${titleMatch ? titleMatch[1] : 'NONE'}`);
  console.log(`  Canonical: ${canonicalMatch ? canonicalMatch[1] : 'NONE'}`);
  console.log(`  Robots: ${metaRobotsMatch ? metaRobotsMatch[1] : 'default (index, follow)'}`);
  console.log(`  data-tool: ${mainToolMatch ? mainToolMatch[1] : 'NONE'}`);
  console.log(`  Scripts (${scriptTags.length}): ${scriptTags.join(', ')}`);
  console.log(`  Inline scripts: ${inlineScriptsCount}`);
  console.log(`  Size: ${content.length} chars`);
  console.log('---');
});
