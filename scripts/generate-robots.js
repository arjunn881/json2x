const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const BASE_URL = process.env.SITE_URL || 'https://json2x.com';
const IS_STAGING = process.env.NODE_ENV === 'staging' || process.env.IS_STAGING === 'true' || process.env.VERCEL_ENV === 'preview';

function generateRobotsTxt() {
  let content = '';

  if (IS_STAGING) {
    content = `# JSON Toolkit (json2x.com) — Staging Environment Safeguard
# Disallow all search engine crawling on staging/preview deploys

User-agent: *
Disallow: /

`;
  } else {
    content = `# ============================================
# JSON Toolkit (json2x.com) — Optimized robots.txt
# Conforms to Google Search Central (RFC 9309)
# ============================================

User-agent: *
Allow: /

# Explicitly allow critical rendering assets for Googlebot & Bingbot
Allow: /assets/
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.svg$

# Block Administrative & Internal API Endpoints
Disallow: /admin/
Disallow: /api/

# Block Temporary & Preview Routes
Disallow: /tmp/
Disallow: /temp/
Disallow: /drafts/
Disallow: /preview/
Disallow: /*?preview=*
Disallow: /*?draft=*

# Block Unindexed Templates & Draft Tools
Disallow: /tools/_template.html
Disallow: /tools/converter.html

# Sitemaps
Sitemap: ${BASE_URL}/sitemap-index.xml
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-images.xml
Sitemap: ${BASE_URL}/sitemap-news.xml
`;
  }

  fs.writeFileSync(path.join(WORKSPACE_ROOT, 'robots.txt'), content, 'utf8');
  console.log(`🤖 Generated optimized robots.txt (${IS_STAGING ? 'STAGING DISALLOW ALL' : 'PRODUCTION OPTIMIZED'})`);
}

generateRobotsTxt();
