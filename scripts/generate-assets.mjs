/**
 * Generate all missing brand assets:
 * - Favicons (all sizes)
 * - OG image (1200x630)
 * - Twitter image (1200x630)
 * - Apple touch icons
 * - Android chrome icons
 * - MS tile
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

// Brand colors
const GREEN = '#0F3B2E';
const GOLD = '#C6A15B';
const BG = '#F5F3EF';
const BLACK = '#111111';

// ─── SVG LOGO (letter "A" in Cormorant Garamond style) ─────────────────────
function logoSvg(size, bgColor = GREEN, letterColor = '#FFFFFF') {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="${bgColor}"/>
  <text x="50%" y="54%" dominant-baseline="central" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-weight="400"
        font-size="${Math.round(size * 0.58)}" fill="${letterColor}"
        letter-spacing="-0.02em">A</text>
  <rect x="${size * 0.3}" y="${size * 0.82}" width="${size * 0.4}" height="${Math.max(1, size * 0.025)}" rx="1" fill="${GOLD}" opacity="0.9"/>
</svg>`);
}

// ─── OG / Twitter social card SVG ────────────────────────────────────────────
function socialCardSvg(width, height) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GREEN}"/>
      <stop offset="100%" stop-color="#1a5c47"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Decorative gold accent -->
  <circle cx="${width * 0.85}" cy="${height * 0.15}" r="${height * 0.4}" fill="${GOLD}" opacity="0.06"/>
  <circle cx="${width * 0.1}" cy="${height * 0.9}" r="${height * 0.3}" fill="${GOLD}" opacity="0.04"/>

  <!-- Top line -->
  <rect x="${width * 0.06}" y="${height * 0.12}" width="${width * 0.06}" height="2" fill="${GOLD}" opacity="0.8"/>
  <text x="${width * 0.14}" y="${height * 0.135}" font-family="Georgia, 'Times New Roman', serif"
        font-size="14" fill="${GOLD}" letter-spacing="6" opacity="0.9">CLINICAL SKINCARE</text>

  <!-- Brand name -->
  <text x="${width * 0.06}" y="${height * 0.48}" font-family="Georgia, 'Times New Roman', serif"
        font-size="96" font-weight="400" fill="#FFFFFF" letter-spacing="8">Aphoria</text>

  <!-- Tagline -->
  <text x="${width * 0.06}" y="${height * 0.62}" font-family="Arial, Helvetica, sans-serif"
        font-size="22" fill="rgba(255,255,255,0.7)" font-weight="300"
        letter-spacing="1">Visible Transformation in 28 Days</text>

  <!-- Gold divider -->
  <rect x="${width * 0.06}" y="${height * 0.72}" width="${width * 0.12}" height="2" fill="${GOLD}"/>

  <!-- Bottom info -->
  <text x="${width * 0.06}" y="${height * 0.82}" font-family="Arial, Helvetica, sans-serif"
        font-size="14" fill="rgba(255,255,255,0.5)" letter-spacing="3">60-DAY GUARANTEE</text>
  <text x="${width * 0.06}" y="${height * 0.87}" font-family="Arial, Helvetica, sans-serif"
        font-size="14" fill="rgba(255,255,255,0.5)" letter-spacing="3">FREE WORLDWIDE SHIPPING</text>

  <!-- Gold dot accent -->
  <circle cx="${width * 0.35}" cy="${height * 0.82}" r="3" fill="${GOLD}" opacity="0.6"/>
  <text x="${width * 0.37}" y="${height * 0.835}" font-family="Arial, Helvetica, sans-serif"
        font-size="14" fill="rgba(255,255,255,0.5)" letter-spacing="3">DERMATOLOGIST TESTED</text>

  <!-- Bottom right: website -->
  <text x="${width * 0.94}" y="${height * 0.93}" font-family="Arial, Helvetica, sans-serif"
        font-size="13" fill="rgba(255,255,255,0.35)" text-anchor="end" letter-spacing="2">aphoriabeauty.com</text>
</svg>`);
}

// ─── ICO file generator (minimal .ico with 16px and 32px) ────────────────────
function createIco(png16, png32) {
  // ICO format: header + directory entries + image data
  const numImages = 2;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = numImages * dirEntrySize;
  const dataOffset1 = headerSize + dirSize;
  const dataOffset2 = dataOffset1 + png16.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // type: ICO
  header.writeUInt16LE(numImages, 4); // count

  const dir1 = Buffer.alloc(dirEntrySize);
  dir1.writeUInt8(16, 0);           // width
  dir1.writeUInt8(16, 1);           // height
  dir1.writeUInt8(0, 2);            // color palette
  dir1.writeUInt8(0, 3);            // reserved
  dir1.writeUInt16LE(1, 4);         // color planes
  dir1.writeUInt16LE(32, 6);        // bits per pixel
  dir1.writeUInt32LE(png16.length, 8); // size
  dir1.writeUInt32LE(dataOffset1, 12); // offset

  const dir2 = Buffer.alloc(dirEntrySize);
  dir2.writeUInt8(32, 0);
  dir2.writeUInt8(32, 1);
  dir2.writeUInt8(0, 2);
  dir2.writeUInt8(0, 3);
  dir2.writeUInt16LE(1, 4);
  dir2.writeUInt16LE(32, 6);
  dir2.writeUInt32LE(png32.length, 8);
  dir2.writeUInt32LE(dataOffset2, 12);

  return Buffer.concat([header, dir1, dir2, png16, png32]);
}

async function main() {
  console.log('Generating brand assets...\n');

  // ─── FAVICONS ──────────────────────────────────────────────────
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
    'apple-touch-icon.png': 180,
    'apple-touch-icon-57x57.png': 57,
    'apple-touch-icon-60x60.png': 60,
    'apple-touch-icon-72x72.png': 72,
    'apple-touch-icon-76x76.png': 76,
    'apple-touch-icon-114x114.png': 114,
    'apple-touch-icon-120x120.png': 120,
    'apple-touch-icon-144x144.png': 144,
    'apple-touch-icon-152x152.png': 152,
    'apple-touch-icon-180x180.png': 180,
    'mstile-144x144.png': 144,
  };

  for (const [filename, size] of Object.entries(sizes)) {
    const svg = logoSvg(size);
    const png = await sharp(svg).resize(size, size).png().toBuffer();
    const outPath = join(PUBLIC, filename);
    writeFileSync(outPath, png);
    console.log(`  ✓ ${filename} (${size}x${size})`);
  }

  // Generate .ico (contains 16 + 32)
  const png16 = await sharp(logoSvg(16)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(logoSvg(32)).resize(32, 32).png().toBuffer();
  const ico = createIco(png16, png32);
  writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
  console.log('  ✓ favicon.ico (16+32)');

  // ─── OG IMAGE ──────────────────────────────────────────────────
  const ogSvg = socialCardSvg(1200, 630);
  const ogJpg = await sharp(ogSvg).resize(1200, 630).jpeg({ quality: 92 }).toBuffer();
  writeFileSync(join(PUBLIC, 'og-image.jpg'), ogJpg);
  console.log('  ✓ og-image.jpg (1200x630)');

  // ─── TWITTER IMAGE ─────────────────────────────────────────────
  // Twitter summary_large_image uses same dimensions
  writeFileSync(join(PUBLIC, 'twitter-image.jpg'), ogJpg);
  console.log('  ✓ twitter-image.jpg (1200x630)');

  console.log('\nAll assets generated successfully.');
}

main().catch(console.error);
