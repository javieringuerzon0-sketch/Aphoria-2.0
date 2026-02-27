import fs from 'fs';
import sharp from 'sharp';

const TARGETS = [
    { src: './public/bundlee/goldmask-bundlee.png', orig: './public/bundlee/goldmask-bundlee.original.png' },
    { src: './public/productos front/colection-gold2.png', orig: './public/productos front/colection-gold2.original.png' },
    { src: './public/goldmask-landing/producto/producto 1 pcs.png', orig: './public/goldmask-landing/producto/producto 1 pcs.original.png' },
    { src: './public/goldmask-landing/producto/producto 2 pcs.png', orig: './public/goldmask-landing/producto/producto 2 pcs.original.png' },
    { src: './public/bundlee/avocado-bundlee.png', orig: './public/bundlee/avocado-bundlee.bg.png', isAvocado: true },
    { src: './public/avocado-landing/producto/avocado-producto.png', orig: './public/avocado-landing/producto/avocado-producto.bg.png', isAvocado: true },
    { src: './public/productos front/seccion-avocado.png', orig: './public/productos front/seccion-avocado.bg.png', isAvocado: true }
];

async function removeBackgrounds(inputFile, outputFile, isAvocado) {
    if (!fs.existsSync(inputFile)) {
        console.log(`Skipping: ${inputFile} does not exist`);
        return;
    }
    const image = sharp(inputFile);
    const { width, height } = await image.metadata();
    const rawBuffer = await image.ensureAlpha().raw().toBuffer();

    for (let i = 0; i < rawBuffer.length; i += 4) {
        const r = rawBuffer[i];
        const g = rawBuffer[i + 1];
        const b = rawBuffer[i + 2];

        let diff;
        if (isAvocado) {
            diff = Math.abs(r - 244) + Math.abs(g - 246) + Math.abs(b - 238);
            if (diff < 35 || (r > 240 && g > 240 && b > 230)) {
                rawBuffer[i + 3] = 0;
            } else if (diff < 60) {
                const alpha = Math.floor(((diff - 35) / 25) * 255);
                rawBuffer[i + 3] = alpha;
            }
        } else {
            // Gold Mask (White background >= 248)
            diff = Math.abs(r - 255) + Math.abs(g - 255) + Math.abs(b - 255);
            // The tube is black/gold, so mostly very dark. 
            // We can safely remove everything that is close to bright white/gray.
            if (diff < 20 || (r > 248 && g > 248 && b > 248)) {
                rawBuffer[i + 3] = 0; // Pure transparent
            } else if (diff < 40) {
                const alpha = Math.floor(((diff - 20) / 20) * 255);
                rawBuffer[i + 3] = alpha;
            }
        }
    }

    // Save full resolution transparent PNG
    await sharp(rawBuffer, { raw: { width, height, channels: 4 } }).png().toFile(outputFile);

    // Generate WebP
    const webpOut = outputFile.replace('.png', '.webp');
    await sharp(outputFile).webp({ quality: 95, effort: 6 }).toFile(webpOut);
    console.log(`Masked and regenerated ${outputFile} and WebP`);
}

async function run() {
    for (const target of TARGETS) {
        let srcBg = target.orig;
        if (!fs.existsSync(srcBg)) {
            srcBg = target.orig.replace('.bg.png', '.original.png');
        }
        if (!fs.existsSync(srcBg)) continue;

        await removeBackgrounds(srcBg, target.src, target.isAvocado);
    }
}
run();
