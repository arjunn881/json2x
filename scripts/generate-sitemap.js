const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://json2x.com';
const WORKSPACE_ROOT = path.resolve(__dirname, '..');

const EXCLUDE_DIRS = ['node_modules', 'scratch', 'scripts', 'admin', 'api', 'private', '.git'];
const EXCLUDE_FILES = [
  '404.html', '500.html', '_template.html',
  'formatter.html', 'validator.html', 'minifier.html', 'diff.html',
  'schema.html', 'viewer.html', 'json-to-ts.html'
];

// Per-tool unique OG preview images for Google Image Search
const TOOL_IMAGES = {
  'tools/json-formatter.html':       { file: '/assets/images/tools/json-formatter.jpg',       caption: 'JSON Formatter & Beautifier — JSON2X' },
  'tools/json-validator.html':       { file: '/assets/images/tools/json-validator.jpg',       caption: 'JSON Validator & Linter — JSON2X' },
  'tools/json-to-csv.html':          { file: '/assets/images/tools/json-to-csv.jpg',          caption: 'JSON to CSV Converter — JSON2X' },
  'tools/csv-to-json.html':          { file: '/assets/images/tools/csv-to-json.jpg',          caption: 'CSV to JSON Parser — JSON2X' },
  'tools/typescript-generator.html': { file: '/assets/images/tools/typescript-generator.jpg', caption: 'JSON to TypeScript Interface & Zod Schema Generator — JSON2X' },
  'tools/json-to-yaml.html':         { file: '/assets/images/tools/json-to-yaml.jpg',         caption: 'JSON to YAML Converter — JSON2X' },
  'tools/json-diff.html':            { file: '/assets/images/tools/json-diff.jpg',            caption: 'JSON Diff Checker — Compare JSON Objects Visually — JSON2X' },
  'tools/json-to-sql.html':          { file: '/assets/images/tools/json-to-sql.jpg',          caption: 'JSON to SQL Table & INSERT Statements Generator — JSON2X' },
  'tools/json-tree-viewer.html':     { file: '/assets/images/tools/json-tree-viewer.jpg',     caption: 'JSON Tree Viewer — Interactive JSON Explorer — JSON2X' },
  'tools/json-minifier.html':        { file: '/assets/images/tools/json-minifier.jpg',        caption: 'JSON Minifier & Compressor — Compress JSON for Production — JSON2X' },
  'tools/json-to-xml.html':          { file: '/assets/images/tools/json-to-xml.jpg',          caption: 'JSON to XML Converter — JSON2X' },
  'tools/json-to-toml.html':         { file: '/assets/images/tools/json-to-toml.jpg',         caption: 'JSON to TOML Converter — JSON2X' },
  'tools/json-schema-generator.html':{ file: '/assets/images/tools/json-schema-generator.jpg',caption: 'JSON Schema Generator — Draft-07 Schema Inference — JSON2X' },
  'tools/jsonpath.html':             { file: '/assets/images/tools/jsonpath.jpg',              caption: 'JSONPath Tester & Query Evaluator — JSON2X' },
  'tools/json-mock-generator.html':  { file: '/assets/images/tools/json-mock-generator.jpg',   caption: 'JSON Mock Data Generator — Fake Synthetic Data — JSON2X' },
  'tools/json-to-code.html':         { file: '/assets/images/tools/json-to-code.jpg',          caption: 'JSON to Code Models (Go, Rust, Python, Kotlin, Java) — JSON2X' },
  'tools/json-converter.html':       { file: '/assets/images/tools/json-converter.jpg',        caption: 'JSON Multi-Converter — Convert to CSV, YAML, XML, SQL, TS — JSON2X' },
  'tools/json-to-prisma.html':       { file: '/assets/images/tools/json-to-prisma.jpg',       caption: 'JSON to Prisma Schema Generator — JSON2X' },
  'tools/json-to-drizzle.html':      { file: '/assets/images/tools/json-to-drizzle.jpg',      caption: 'JSON to Drizzle ORM Schema Generator — JSON2X' },
  'tools/json-to-graphql.html':      { file: '/assets/images/tools/json-to-graphql.jpg',      caption: 'JSON to GraphQL Type Definitions Generator — JSON2X' },
  'tools/json-to-zod.html':          { file: '/assets/images/tools/json-to-zod.jpg',          caption: 'JSON to Zod Schema Generator — JSON2X' },
};

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
  // Tier 1: Highest Priority (1.0 - 0.90) — Core Interactive Tools & Hub
  if (relPath === 'index.html') return { priority: '1.0', freq: 'daily' };
  
  const topTierTools = [
    'tools/json-formatter.html', 'tools/json-validator.html',
    'tools/json-to-csv.html', 'tools/csv-to-json.html'
  ];
  if (topTierTools.includes(relPath)) return { priority: '0.95', freq: 'weekly' };

  if (relPath === 'tools/index.html' || relPath.startsWith('tools/')) {
    return { priority: '0.90', freq: 'weekly' };
  }

  // Tier 2: High Priority (0.85 - 0.80) — Error Troubleshooting & Top Guides
  const topErrors = [
    'errors/unexpected-token.html', 'errors/trailing-comma.html',
    'errors/invalid-character.html', 'errors/unexpected-end.html'
  ];
  if (topErrors.includes(relPath)) return { priority: '0.85', freq: 'weekly' };

  const topGuides = [
    'errors/index.html', 'docs/rfc8259-json-specification.html',
    'kb/json-to-yaml-guide.html', 'kb/json-to-csv-guide.html',
    'kb/typescript-json-guide.html',
    'blog/how-to-format-validate-large-json-in-the-browser.html'
  ];
  if (topGuides.includes(relPath)) return { priority: '0.80', freq: 'weekly' };

  // Tier 3: Medium Priority (0.75 - 0.65) — Documentation, Knowledge Base & Blog
  if (relPath === 'docs/index.html' || relPath === 'kb/index.html' || relPath === 'blog/index.html') {
    return { priority: '0.75', freq: 'weekly' };
  }
  if (relPath.startsWith('docs/') || relPath.startsWith('kb/') || relPath.startsWith('blog/')) {
    return { priority: '0.70', freq: 'monthly' };
  }

  // Tier 4: Trust & Brand Signals (0.50 - 0.40)
  const trustHigh = ['about.html', 'faq.html', 'security.html'];
  if (trustHigh.includes(relPath)) return { priority: '0.50', freq: 'monthly' };

  const trustMid = ['open-source.html', 'roadmap.html', 'changelog.html', 'editorial-policy.html', 'contact.html'];
  if (trustMid.includes(relPath)) return { priority: '0.40', freq: 'monthly' };

  // Tier 5: Legal & Administrative (0.25)
  return { priority: '0.25', freq: 'yearly' };
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

    // Inject unique per-tool OG image if available (takes priority over generic og-image.png)
    if (TOOL_IMAGES[relPath]) {
      const ti = TOOL_IMAGES[relPath];
      images.push({ url: BASE_URL + ti.file, title: ti.caption });
    }

    const ogImg = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    if (ogImg) {
      const ogUrl = ogImg[1].startsWith('http') ? ogImg[1] : BASE_URL + ogImg[1];
      // Add the og:image only if it's NOT the generic image (we already have a unique one) OR if no unique image was added
      if (!TOOL_IMAGES[relPath] && !images.some(i => i.url === ogUrl)) {
        images.push({ url: ogUrl, title: title });
      }
    }

    const imgTags = content.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)['"]/gi);
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

const SUPPORTED_LANGUAGES = ['en', 'es', 'zh', 'ja', 'pt', 'de', 'fr', 'hi', 'ru', 'ar'];

function buildSitemapXml(pages) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

  pages.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${p.url}</loc>\n`;
    xml += `    <lastmod>${p.lastMod}</lastmod>\n`;
    xml += `    <changefreq>${p.freq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    
    // Canonical hreflang (English-only site)
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${p.url}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${p.url}"/>\n`;

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
  fs.writeFileSync(path.join(WORKSPACE_ROOT, 'sitemap_index.xml'), indexSitemapContent);

  console.log(`Successfully generated 5 dynamic sitemaps for ${pages.length} public URLs:`);
  console.log(`   - sitemap.xml (${pages.length} URLs)`);
  console.log(`   - sitemap-images.xml`);
  console.log(`   - sitemap-news.xml (${pages.filter(p => p.isBlog).length} news URLs)`);
  console.log(`   - sitemap-index.xml & sitemap_index.xml`);
}

run();
