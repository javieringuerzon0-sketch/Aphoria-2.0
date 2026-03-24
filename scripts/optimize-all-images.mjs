/**
 * Aphoria Beauty — Quality-Based Image Optimizer
 *
 * Generates WebP (quality 85) + AVIF (quality 80) for all images in public/
 * Also generates tiny LQIP (Low Quality Image Placeholder) base64 for blur-up.
 *
 * RULES:
 * - If optimized file is LARGER than original → DELETE it, keep original
 * - If a compressed .webp already exists and is smaller → keep existing
 * - Original files are NEVER modified or deleted
 * - Quality 85 WebP / 80 AVIF = visually indistinguishable from original
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');
const MANIFEST_DIR = path.join(__dirname, '..', 'src', 'generated');
const MANIFEST_PATH = path.join(MANIFEST_DIR, 'image-manifest.json');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.vite']);

const WEBP_QUALITY = 85;
const AVIF_QUALITY = 80;

let totalOriginalBytes = 0;
let totalWebpBytes = 0;
let totalAvifBytes = 0;
let filesProcessed = 0;
let filesSkipped = 0;
let filesBloated = 0; // Files where optimized was larger → deleted

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

function findImages(dir, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) findImages(fullPath, results);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTS.has(ext)) results.push(fullPath);
    }
  }
  return results;
}

async function processImage(filePath) {
  const relativePath = path.relative(PUBLIC, filePath).replace(/\\/g, '/');
  const ext = path.extname(filePath).toLowerCase();
  const baseName = filePath.slice(0, filePath.length - ext.length);
  const originalSize = fs.statSync(filePath).size;
  totalOriginalBytes += originalSize;

  const webpPath = baseName + '.webp';
  const avifPath = baseName + '.avif';

  const result = {
    original: '/' + relativePath,
    originalSize,
    webp: null, webpSize: null,
    avif: null, avifSize: null,
    lqip: null, width: null, height: null,
  };

  try {
    const image = sharp(filePath, { failOnError: false });
    const metadata = await image.metadata();
    result.width = metadata.width;
    result.height = metadata.height;

    // LQIP — tiny 20px placeholder for blur-up
    try {
      const lqipBuffer = await sharp(filePath, { failOnError: false })
        .resize(20, null, { withoutEnlargement: true })
        .blur(2)
        .jpeg({ quality: 40 })
        .toBuffer();
      result.lqip = `data:image/jpeg;base64,${lqipBuffer.toString('base64')}`;
    } catch (e) {
      console.log(`    ! LQIP failed: ${e.message}`);
    }

    // === WebP (quality 85) ===
    const existingWebp = fs.existsSync(webpPath);
    const existingWebpSize = existingWebp ? fs.statSync(webpPath).size : Infinity;

    if (!existingWebp || existingWebpSize >= originalSize) {
      // No existing webp, or existing is larger than original → generate new
      try {
        const tmpPath = webpPath + '.tmp';
        await sharp(filePath, { failOnError: false })
          .webp({ quality: WEBP_QUALITY, effort: 6 })
          .toFile(tmpPath);
        const newSize = fs.statSync(tmpPath).size;

        if (newSize < originalSize) {
          // New WebP is smaller → use it (replace existing if needed)
          if (existingWebp) fs.unlinkSync(webpPath);
          fs.renameSync(tmpPath, webpPath);
          totalWebpBytes += newSize;
          result.webp = '/' + path.relative(PUBLIC, webpPath).replace(/\\/g, '/');
          result.webpSize = newSize;
          const pct = ((1 - newSize / originalSize) * 100).toFixed(0);
          console.log(`  + WebP: ${formatBytes(newSize)} (-${pct}%)`);
        } else {
          // New WebP is LARGER than original → delete, don't serve it
          fs.unlinkSync(tmpPath);
          if (existingWebp && existingWebpSize < originalSize) {
            // Keep existing if it was actually smaller
            totalWebpBytes += existingWebpSize;
            result.webp = '/' + path.relative(PUBLIC, webpPath).replace(/\\/g, '/');
            result.webpSize = existingWebpSize;
            console.log(`  = WebP kept existing: ${formatBytes(existingWebpSize)}`);
          } else {
            if (existingWebp) fs.unlinkSync(webpPath);
            filesBloated++;
            console.log(`  x WebP LARGER (${formatBytes(newSize)} > ${formatBytes(originalSize)}) → skipped`);
          }
        }
      } catch (e) {
        console.log(`  x WebP failed: ${e.message}`);
      }
    } else {
      // Existing WebP is smaller than original → keep it
      totalWebpBytes += existingWebpSize;
      result.webp = '/' + path.relative(PUBLIC, webpPath).replace(/\\/g, '/');
      result.webpSize = existingWebpSize;
      const pct = ((1 - existingWebpSize / originalSize) * 100).toFixed(0);
      console.log(`  = WebP exists: ${formatBytes(existingWebpSize)} (-${pct}%)`);
    }

    // === AVIF (quality 80) ===
    if (!fs.existsSync(avifPath)) {
      try {
        const tmpPath = avifPath + '.tmp';
        await sharp(filePath, { failOnError: false })
          .avif({ quality: AVIF_QUALITY, effort: 4 })
          .toFile(tmpPath);
        const newSize = fs.statSync(tmpPath).size;

        if (newSize < originalSize) {
          fs.renameSync(tmpPath, avifPath);
          totalAvifBytes += newSize;
          result.avif = '/' + path.relative(PUBLIC, avifPath).replace(/\\/g, '/');
          result.avifSize = newSize;
          const pct = ((1 - newSize / originalSize) * 100).toFixed(0);
          console.log(`  + AVIF: ${formatBytes(newSize)} (-${pct}%)`);
        } else {
          fs.unlinkSync(tmpPath);
          filesBloated++;
          console.log(`  x AVIF LARGER (${formatBytes(newSize)} > ${formatBytes(originalSize)}) → skipped`);
        }
      } catch (e) {
        console.log(`  x AVIF failed: ${e.message}`);
      }
    } else {
      const avifSize = fs.statSync(avifPath).size;
      if (avifSize < originalSize) {
        totalAvifBytes += avifSize;
        result.avif = '/' + path.relative(PUBLIC, avifPath).replace(/\\/g, '/');
        result.avifSize = avifSize;
        console.log(`  = AVIF exists: ${formatBytes(avifSize)}`);
      } else {
        fs.unlinkSync(avifPath);
        filesBloated++;
        console.log(`  x AVIF exists but LARGER → deleted`);
      }
    }

    filesProcessed++;
  } catch (e) {
    console.log(`  x Error: ${e.message}`);
    filesSkipped++;
  }

  return result;
}

async function main() {
  console.log('\n  APHORIA QUALITY IMAGE OPTIMIZER');
  console.log('='.repeat(50));
  console.log(`WebP quality: ${WEBP_QUALITY} | AVIF quality: ${AVIF_QUALITY}`);
  console.log(`Rule: if optimized > original → DELETE optimized\n`);

  const imageFiles = findImages(PUBLIC);
  console.log(`Found ${imageFiles.length} images.\n`);

  const manifest = {};

  for (const filePath of imageFiles) {
    const relativePath = path.relative(PUBLIC, filePath).replace(/\\/g, '/');
    console.log(`\n${relativePath} (${formatBytes(fs.statSync(filePath).size)})`);
    const result = await processImage(filePath);
    manifest[result.original] = result;
  }

  if (!fs.existsSync(MANIFEST_DIR)) fs.mkdirSync(MANIFEST_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log('\n' + '='.repeat(50));
  console.log('RESULTS');
  console.log('='.repeat(50));
  console.log(`  Processed: ${filesProcessed}`);
  console.log(`  Skipped:   ${filesSkipped}`);
  console.log(`  Bloated (deleted): ${filesBloated}`);
  console.log(`  Original total:  ${formatBytes(totalOriginalBytes)}`);
  if (totalWebpBytes > 0) {
    console.log(`  WebP total:      ${formatBytes(totalWebpBytes)} (${((1 - totalWebpBytes / totalOriginalBytes) * 100).toFixed(1)}% savings)`);
  }
  if (totalAvifBytes > 0) {
    console.log(`  AVIF total:      ${formatBytes(totalAvifBytes)} (${((1 - totalAvifBytes / totalOriginalBytes) * 100).toFixed(1)}% savings)`);
  }

  // Final safety check
  console.log('\nSafety check — files > 50MB:');
  for (const entry of Object.values(manifest)) {
    if (entry.webpSize && entry.webpSize > 50 * 1024 * 1024) {
      console.log(`  WARNING: ${entry.webp} is ${formatBytes(entry.webpSize)}`);
    }
    if (entry.avifSize && entry.avifSize > 50 * 1024 * 1024) {
      console.log(`  WARNING: ${entry.avif} is ${formatBytes(entry.avifSize)}`);
    }
  }
  console.log('Done.\n');
}

main().catch(console.error);
