const fs = require('fs');
const path = require('path');
const http = require('http');

function getAllFiles(dir, exts = ['.html', '.js']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.wrangler') {
        results = results.concat(getAllFiles(fullPath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const allFiles = getAllFiles('.');
console.log(`Found ${allFiles.length} files.`);

// 1. Extract all hrefs, srcs, and canonical URLs
const linkPatterns = [
  /href=["']([^"'#]+)(#[^"']*)?["']/gi,
  /src=["']([^"'#]+)(#[^"']*)?["']/gi,
  /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/gi
];

const urlsToTest = new Set();
const linkSources = {};

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  linkPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const url = match[1];
      if (!url || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('javascript:') || url.startsWith('data:') || url.startsWith('#') || url.startsWith('tel:')) {
        // Also check if domain is json2x.com or jsontoolkit
        if (url.includes('json2x.com') || url.includes('jsontoolkit')) {
          try {
            const parsed = new URL(url);
            urlsToTest.add(parsed.pathname);
            linkSources[parsed.pathname] = linkSources[parsed.pathname] || [];
            linkSources[parsed.pathname].push(`${file} (full URL: ${url})`);
          } catch(e) {}
        }
        continue;
      }
      
      let norm = url;
      if (!norm.startsWith('/')) {
        // relative to file
        const relDir = path.dirname(path.relative('.', file)).replace(/\\/g, '/');
        norm = '/' + (relDir ? relDir + '/' : '') + norm;
      }
      // simplify /./ and /../
      norm = path.posix.normalize(norm);
      urlsToTest.add(norm);
      linkSources[norm] = linkSources[norm] || [];
      linkSources[norm].push(file);
    }
  });
});

// Also read sitemaps
const sitemaps = ['sitemap.xml', 'sitemap-index.xml', 'sitemap-news.xml', 'sitemap-images.xml'];
sitemaps.forEach(sm => {
  if (fs.existsSync(sm)) {
    const smContent = fs.readFileSync(sm, 'utf8');
    const matches = smContent.matchAll(/<loc>([^<]+)<\/loc>/g);
    for (const m of matches) {
      try {
        const parsed = new URL(m[1]);
        urlsToTest.add(parsed.pathname);
        linkSources[parsed.pathname] = linkSources[parsed.pathname] || [];
        linkSources[parsed.pathname].push(sm);
      } catch(e) {}
    }
  }
});

console.log(`Total unique internal paths to test: ${urlsToTest.size}`);

// Test against local server running on port 8080
function testUrl(pathname) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: pathname,
      method: 'GET',
      headers: {
        'Accept': 'text/html,*/*'
      }
    };
    const req = http.request(options, (res) => {
      resolve({
        path: pathname,
        statusCode: res.statusCode,
        location: res.headers.location || null
      });
    });
    req.on('error', (err) => {
      resolve({
        path: pathname,
        statusCode: 'ERROR: ' + err.message
      });
    });
    req.end();
  });
}

async function run() {
  const results = [];
  for (const u of urlsToTest) {
    const res = await testUrl(u);
    results.push(res);
  }

  const notFound = results.filter(r => r.statusCode === 404);
  const redirects = results.filter(r => r.statusCode >= 300 && r.statusCode < 400);
  const ok = results.filter(r => r.statusCode === 200);
  const errors = results.filter(r => typeof r.statusCode === 'string' || r.statusCode >= 500);

  console.log(`\n=== RESULTS ===`);
  console.log(`200 OK: ${ok.length}`);
  console.log(`Redirects: ${redirects.length}`);
  console.log(`404 Not Found: ${notFound.length}`);
  console.log(`Errors / 500: ${errors.length}`);

  if (notFound.length > 0) {
    console.log(`\n--- 404 NOT FOUND LIST ---`);
    notFound.forEach(n => {
      console.log(`URL: ${n.path}`);
      console.log(`  Sources:`, linkSources[n.path] ? linkSources[n.path].slice(0, 5) : 'Unknown');
    });
  }

  if (redirects.length > 0) {
    console.log(`\n--- REDIRECTS LIST ---`);
    redirects.forEach(r => {
      console.log(`URL: ${r.path} -> ${r.location} (${r.statusCode})`);
    });
  }
}

run();
