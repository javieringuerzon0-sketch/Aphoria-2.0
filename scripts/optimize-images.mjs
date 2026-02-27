import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');

const TARGETS = [
    { src: 'Hero video/hero-gold2.png', maxW: 1920, webp: true },
    { src: 'Hero video/hero-gold3.png', maxW: 1920, webp: true },
    { src: 'Hero video/hero-gold5.png', maxW: 1920, webp: true },
    { src: 'seccion gold mask/imagen-section.png', maxW: 1600, webp: true },
    { src: 'seccion gold mask/imagen-producto.png', maxW: 1200, webp: true },
    { src: 'bundlee/goldmask-bundlee.png', maxW: 1200, webp: true },
    { src: 'bundlee/avocado-bundlee.png', maxW: 1200, webp: true },
    { src: 'productos front/colection-gold2.png', maxW: 1200, webp: true },
    { src: 'productos front/seccion-avocado.png', maxW: 1200, webp: true },
    { src: 'goldmask-landing/producto/producto 1 pcs.png', maxW: 1000, webp: true },
    { src: 'goldmask-landing/producto/producto 2 pcs.png', maxW: 1000, webp: true },
    { src: 'avocado-landing/producto/avocado-producto.png', maxW: 1000, webp: true },
    { src: 'clinical index/deep-hydratation.PNG', maxW: 1200, webp: true },
    { src: 'clinical index/radiance-ativation.PNG', maxW: 1200, webp: true },
    { src: 'recomendation/goldmask-recomendation.png', maxW: 1200, webp: true },
    { src: 'seccion gold mask/apply.png', maxW: 900, webp: true },
    { src: 'seccion gold mask/activate.png', maxW: 900, webp: true },
    { src: 'seccion gold mask/reveal.png', maxW: 900, webp: true },
    { src: 'about-lab.jpg', maxW: 1400, webp: true },
    { src: 'BEFORE-AFTER/BEFORE.jpg', maxW: 1600, webp: true },
    { src: 'BEFORE-AFTER/AFTER.jpg', maxW: 1600, webp: true },
];

async function fmt(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function processImage({ src, maxW, webp }) {
    // We use the `.original` if it exists, otherwise the pure file
    const rootFullName = path.join(PUBLIC, src);
    const ext = path.extname(src).toLowerCase();
    const backupExt = ext === '.png' || ext === '.PNG' ? '.PNG' : ext;
    // Actually the backup is .original.png or .original.jpg (using literal paths matched previously)
    const backupPath = fullPath => {
        const b = path.basename(fullPath, path.extname(fullPath));
        return path.join(path.dirname(fullPath), b + '.original' + backupExt);
    };

    let originalSourceFile = rootFullName;

    // Check if backup exists, if so read from it so we don't scale a scaled image
    const bp = backupPath(rootFullName);
    if (fs.existsSync(bp)) {
        originalSourceFile = bp;
    } else if (!fs.existsSync(rootFullName)) {
        console.log(`  ⚠️  NOT FOUND: ${src}`);
        return;
    }

    const originalSize = fs.statSync(originalSourceFile).size;
    console.log(`\n  Processing: ${path.basename(src)} (${await fmt(originalSize)})`);

    const image = sharp(originalSourceFile, { failOnError: false });
    const meta = await image.metadata();

    if (webp) {
        const dir = path.dirname(rootFullName);
        const base = path.basename(rootFullName, path.extname(rootFullName));
        const webpPath = path.join(dir, base + '.webp');
        try {
            let p = sharp(originalSourceFile, { failOnError: false });
            if (meta.width && meta.width > maxW) {
                p = p.resize({ width: maxW, withoutEnlargement: true });
            }
            // Preserve alpha natively in WebP
            await p.webp({ quality: 85, effort: 6 }).toFile(webpPath);
            const webpSize = fs.statSync(webpPath).size;
            console.log(`    → WebP Created: ${await fmt(webpSize)}`);
        } catch (e) {
            console.log(`    → WebP failed: ${e.message}`);
        }
    }
}

async function main() {
    console.log('\n🚀 APHORIA IMAGE OPTIMIZER (SAFE WEBP ONLY)');
    for (const target of TARGETS) {
        await processImage(target);
    }
}
main().catch(console.error);
