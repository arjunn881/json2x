const fs = require('fs');
const path = require('path');

const toolsDir = path.resolve(__dirname, '..', 'tools');
const imgDir = path.resolve(__dirname, '..', 'assets', 'images', 'tools');

const imgs = fs.readdirSync(imgDir).filter(f => f.endsWith('.jpg'));

imgs.forEach(img => {
  const toolName = path.basename(img, '.jpg');
  const toolFile = path.join(toolsDir, toolName + '.html');
  if (fs.existsSync(toolFile)) {
    let html = fs.readFileSync(toolFile, 'utf-8');
    const newImgUrl = 'https://json2x.com/assets/images/tools/' + img;
    html = html.replace(/<meta property="og:image" content="[^"]*"/g, `<meta property="og:image" content="${newImgUrl}"`);
    html = html.replace(/<link rel="preload" as="image" href="[^"]*" fetchpriority="high" \/>/g, `<link rel="preload" as="image" href="${newImgUrl}" fetchpriority="high" />`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/g, `<meta name="twitter:image" content="${newImgUrl}"`);
    fs.writeFileSync(toolFile, html, 'utf-8');
    console.log('   ✓ Updated OG image for: ' + toolName);
  }
});

console.log('Tool OG images successfully synchronized!');
