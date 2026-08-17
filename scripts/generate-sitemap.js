const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://json2x.com';
const WORKSPACE_ROOT = path.resolve(__dirname, '..');

const EXCLUDE_DIRS = ['node_modules', 'scratch', 'scripts', 'admin', 'api', 'private', '.git'];
const EXCLUDE_FILES = [
  '404.html', '500.html', '_template.html', 'converter.html',
  'formatter.html', 'validator.html', 'minifier.html', 'diff.html',
  'schema.html', 'viewer.html', 'json-to-ts.html'
];

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
      if (!EXCLUDE_FILES.includes(file)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getPriorityAndFreq(relPath) {
  if (relPath === 'index.html') return { priority: '1.0', freq: 'weekly' };
  if (relPath === 'tools/index.html') return { priority: '0.95', freq: 'weekly' };
  if (relPath.startsWith('tools/')) return { priority: '0.90', freq: 'monthly' };
  if (relPath === 'blog/index.html' || relPath === 'errors/index.html') return { priority: '0.80', freq: 'weekly' };
  if (relPath.startsWith('blog/') || relPath.startsWith('errors/')) return { priority: '0.75', freq: 'monthly' };
  return { priority: '0.50', freq: 'yearly' };
}

function processPages() {
  const allHtmlFiles = walkDir(WORKSPACE_ROOT);
  const validPages = [];

  allHtmlFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip any page with explicit noindex directive
    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']/i.test(content)) {
      return;
    }

    let relPath = path.relative(WORKSPACE_ROOT, filePath).replace(/\\/g, '/');
    let urlPath = relPath === 'index.html' ? '/' : '/' + relPath;
    const fullUrl = BASE_URL + urlPath;

    const stat = fs.statSync(filePath);
    const lastMod = formatDate(stat.mtime);
    const { priority, freq } = getPriorityAndFreq(relPath);

    // Extract title
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/\s*\|.*$/, '').trim() : 'JSON2X Page';

    // Extract images
    const images = [];
    const ogImg = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    if (ogImg) images.push({ url: ogImg[1].startsWith('http') ? ogImg[1] : BASE_URL + ogImg[1], title: title });

    const imgTags = content.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi);
    for (const match of imgTags) {
      const src = match[1];
      const alt = match[2] || title;
      const imgUrl = src.startsWith('http') ? src : BASE_URL + (src.startsWith('/') ? src : '/' + src);
      if (!images.some(i => i.url === imgUrl)) {
        images.push({ url: imgUrl, title: alt });
      }
    }

    validPages.push({
      filePath,
      relPath,
      url: fullUrl,
      lastMod,
      priority,
      freq,
      title,
      images,
      isBlog: relPath.startsWith('blog/')
    });
  });

  return validPages;
}

function buildSitemapXml(pages) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

  pages.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${p.url}</loc>\n`;
    xml += `    <lastmod>${p.lastMod}</lastmod>\n`;
    xml += `    <changefreq>${p.freq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    if (p.images.length > 0) {
      p.images.forEach(img => {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${img.url}</image:loc>\n`;
        xml += `      <image:title>${img.title.replace(/&/g, '&amp;')}</image:title>\n`;
        xml += `    </image:image>\n`;
      });
    }
    xml += `  </url>\n`;
  });

  xml += `\n</urlset>\n`;
  return xml;
}

function buildImageSitemapXml(pages) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

  pages.forEach(p => {
    if (p.images.length > 0) {
      xml += `  <url>\n`;
      xml += `    <loc>${p.url}</loc>\n`;
      p.images.forEach(img => {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${img.url}</image:loc>\n`;
        xml += `      <image:title>${img.title.replace(/&/g, '&amp;')}</image:title>\n`;
        xml += `    </image:image>\n`;
      });
      xml += `  </url>\n`;
    }
  });

  xml += `\n</urlset>\n`;
  return xml;
}

function buildNewsSitemapXml(pages) {
  const blogPages = pages.filter(p => p.isBlog);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n\n`;

  blogPages.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${p.url}</loc>\n`;
    xml += `    <news:news>\n`;
    xml += `      <news:publication>\n`;
    xml += `        <news:name>JSON2X Blog</news:name>\n`;
    xml += `        <news:language>en</news:language>\n`;
    xml += `      </news:publication>\n`;
    xml += `      <news:publication_date>${p.lastMod}</news:publication_date>\n`;
    xml += `      <news:title>${p.title.replace(/&/g, '&amp;')}</news:title>\n`;
    xml += `    </news:news>\n`;
    xml += `  </url>\n`;
  });

  xml += `\n</urlset>\n`;
  return xml;
}

function buildSitemapIndexXml(today) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  xml += `  <sitemap>\n`;
  xml += `    <loc>${BASE_URL}/sitemap.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `  </sitemap>\n`;

  xml += `  <sitemap>\n`;
  xml += `    <loc>${BASE_URL}/sitemap-images.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `  </sitemap>\n`;

  xml += `  <sitemap>\n`;
  xml += `    <loc>${BASE_URL}/sitemap-news.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `  </sitemap>\n`;

  xml += `\n</sitemapindex>\n`;
  return xml;
}

function run() {
  console.log('Traversing workspace for dynamic sitemap generation...');
  const pages = processPages();
  const today = formatDate(new Date());

  const sitemapContent = buildSitemapXml(pages);
  const imageSitemapContent = buildImageSitemapXml(pages);
  const newsSitemapContent = buildNewsSitemapXml(pages);
  const indexSitemapContent = buildSitemapIndexXml(today);

  fs.writeFileSync(path.join(WORKSPACE_ROOT, 'sitemap.xml'), sitemapContent);
  fs.writeFileSync(path.join(WORKSPACE_ROOT, 'sitemap-images.xml'), imageSitemapContent);
  fs.writeFileSync(path.join(WORKSPACE_ROOT, 'sitemap-news.xml'), newsSitemapContent);
  fs.writeFileSync(path.join(WORKSPACE_ROOT, 'sitemap-index.xml'), indexSitemapContent);

  console.log(`Successfully generated 4 dynamic sitemaps for ${pages.length} public URLs:`);
  console.log(`   - sitemap.xml (${pages.length} URLs)`);
  console.log(`   - sitemap-images.xml`);
  console.log(`   - sitemap-news.xml (${pages.filter(p => p.isBlog).length} news URLs)`);
  console.log(`   - sitemap-index.xml`);
}

run();
