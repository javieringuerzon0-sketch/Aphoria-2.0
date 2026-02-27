import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const TARGETS = [
    { src: './public/bundlee/goldmask-bundlee.png', orig: './public/bundlee/goldmask-bundlee.original.png' },
    { src: './public/bundlee/avocado-bundlee.png', orig: './public/bundlee/avocado-bundlee.bg.png', isAvocado: true },
    { src: './public/avocado-landing/producto/avocado-producto.png', orig: './public/avocado-landing/producto/avocado-producto.bg.png', isAvocado: true },
    { src: './public/productos front/seccion-avocado.png', orig: './public/productos front/seccion-avocado.bg.png', isAvocado: true },
    { src: './public/productos front/colection-gold2.png', orig: './public/productos front/colection-gold2.original.png' },
    { src: './public/goldmask-landing/producto/producto 1 pcs.png', orig: './public/goldmask-landing/producto/producto 1 pcs.original.png' },
    { src: './public/goldmask-landing/producto/producto 2 pcs.png', orig: './public/goldmask-landing/producto/producto 2 pcs.original.png' }
];

async function removeAvocadoBg(inputFile, outputFile) {
    console.log("Deep masking:", inputFile);
    const image = sharp(inputFile);
    const { width, height } = await image.metadata();
    const rawBuffer = await image.ensureAlpha().raw().toBuffer();

    for (let i = 0; i < rawBuffer.length; i += 4) {
        const r = rawBuffer[i];
        const g = rawBuffer[i + 1];
        const b = rawBuffer[i + 2];

        const diff = Math.abs(r - 244) + Math.abs(g - 246) + Math.abs(b - 238);

        if (diff < 35 || (r > 240 && g > 240 && b > 230)) {
            rawBuffer[i + 3] = 0;
        } else if (diff < 60) {
            const alpha = Math.floor(((diff - 35) / 25) * 255);
            rawBuffer[i + 3] = alpha;
        }
    }

    // Save full resolution transparent PNG
    await sharp(rawBuffer, { raw: { width, height, channels: 4 } }).png().toFile(outputFile);
    console.log("Restored transparent high-res PNG at", outputFile);
}

async function run() {
    for (const target of TARGETS) {
        // If it's gold mask, we check if original backup exists and copy it back so it's 100% pristine
        if (!target.isAvocado && fs.existsSync(target.orig)) {
            fs.copyFileSync(target.orig, target.src);
            console.log("Restored pristine Gold PNG:", target.src);
        }

        // If it's avocado, we do the deep masking from the true original (.bg.png or .original.png)
        if (target.isAvocado) {
            let srcBg = target.orig;
            if (!fs.existsSync(srcBg)) {
                srcBg = target.orig.replace('.bg.png', '.original.png');
            }
            if (fs.existsSync(srcBg)) {
                await removeAvocadoBg(srcBg, target.src);
            }
        }

        // Now generate a HIGH QUALITY, UNRESIZED WebP exactly mirroring the PNG
        if (fs.existsSync(target.src)) {
            const webpOut = target.src.replace('.png', '.webp');
            await sharp(target.src)
                .webp({ quality: 95, effort: 6 }) // 95 is very high quality, practically lossless to eye, no maxW resize
                .toFile(webpOut);
            console.log("Generated ultra HQ WebP:", webpOut);
        }
    }
}
run();
