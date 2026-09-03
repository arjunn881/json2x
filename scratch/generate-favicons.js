const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG Definition of the JSON2X brand logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#brandGrad)" />
  <text x="256" y="270" dominant-baseline="central" text-anchor="middle" font-size="192" font-weight="900" font-family="'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace" letter-spacing="-5px" fill="#ffffff">{2X}</text>
</svg>`;

function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = numImages * dirEntrySize;
  let currentOffset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  const entries = [];
  const imageBuffers = [];

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(currentOffset, 12);

    entries.push(entry);
    imageBuffers.push(img.buffer);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

async function buildFavicons() {
  const baseSvgBuffer = Buffer.from(svgContent);

  // 1. Save favicon.svg
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent, 'utf8');
  console.log('Saved public/favicon.svg');

  // 2. Generate PNG sizes
  const sizes = [
    { name: 'favicon.png', size: 512 },
    { name: 'favicon-192.png', size: 192 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 }
  ];

  const icoBuffers = [];

  for (const item of sizes) {
    const dest = path.join(__dirname, '../public', item.name);
    const buf = await sharp(baseSvgBuffer)
      .resize(item.size, item.size)
      .png()
      .toBuffer();
    fs.writeFileSync(dest, buf);
    console.log(`Saved public/${item.name} (${item.size}x${item.size})`);

    if (item.size === 16 || item.size === 32) {
      icoBuffers.push({ width: item.size, height: item.size, buffer: buf });
    }
  }

  // Also create a 48x48 buffer for the .ico file
  const buf48 = await sharp(baseSvgBuffer)
    .resize(48, 48)
    .png()
    .toBuffer();
  icoBuffers.push({ width: 48, height: 48, buffer: buf48 });

  // 3. Create favicon.ico
  const icoBuffer = createIco(icoBuffers);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  console.log('Saved public/favicon.ico, total size:', icoBuffer.length);
}

buildFavicons().catch(console.error);
