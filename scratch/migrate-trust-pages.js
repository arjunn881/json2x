const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_PAGES = path.join(ROOT, 'src', 'pages');

const staticFiles = [
  'about.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'disclaimer.html',
  'editorial-policy.html',
  'security.html',
  'license.html',
  'open-source.html',
  'roadmap.html',
  'changelog.html',
  'faq.html',
  '404.html',
  '500.html'
];

staticFiles.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${file} does not exist, skipping.`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const baseName = file.replace('.html', '');

  // Extract <title>
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : `${baseName.charAt(0).toUpperCase() + baseName.slice(1)} — JSON2X`;

  // Extract meta description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : 'Free developer tools and utilities on JSON2X.';

  // Extract <style> if present
  const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
  const customStyle = styleMatch ? styleMatch[1].trim() : '';

  // Extract <main> content
  let mainBody = '';
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    mainBody = mainMatch[1].trim();
    // Remove breadcrumbs placeholder if any
    mainBody = mainBody.replace(/<div id="breadcrumb-placeholder"><\/div>/g, '');
    mainBody = mainBody.replace(/<div class="container">\s*<\/div>/g, '');
  }

  const astroContent = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import Breadcrumbs from '../components/layout/Breadcrumbs.astro';

const pageTitle = ${JSON.stringify(title)};
const pageDesc = ${JSON.stringify(description)};
---

<BaseLayout
  title={pageTitle}
  description={pageDesc}
  canonical="/${file}"
  currentId="${baseName}"
>
  <Breadcrumbs items={[{ label: ${JSON.stringify(title.split('—')[0].split('|')[0].trim())} }]} />

  ${customStyle ? `<style>\n${customStyle}\n</style>` : ''}

  ${mainBody}
</BaseLayout>
`;

  const outPath = path.join(OUT_PAGES, `${baseName}.astro`);
  fs.writeFileSync(outPath, astroContent, 'utf8');
  console.log(`Generated: src/pages/${baseName}.astro`);
});
