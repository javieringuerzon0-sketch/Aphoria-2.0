import fs from 'fs';
import sharp from 'sharp';

const FILES = [
    './public/goldmask-landing/producto/producto 1 pcs.png',
    './public/avocado-landing/producto/avocado-producto.png',
    './public/productos front/colection-gold2.png',
    './public/productos front/seccion-avocado.png'
];

async function processFile(filePath) {
    console.log(`Cleaning ${filePath}...`);
    try {
        const img = sharp(filePath);
        const { width, height } = await img.metadata();
        const raw = await img.ensureAlpha().raw().toBuffer();

        for (let i = 0; i < raw.length; i += 4) {
            const r = raw[i];
            const g = raw[i + 1];
            const b = raw[i + 2];

            // Ultra-strong background removal
            // Beige/White/Light Gray removal
            const isBeige = Math.abs(r - 244) + Math.abs(g - 246) + Math.abs(b - 238) < 45;
            const isWhiteIsh = (r > 240 && g > 240 && b > 235);
            const isVeryLight = (r + g + b > 720);

            if (isBeige || isWhiteIsh || isVeryLight) {
                raw[i + 3] = 0;
            }
        }

        // Save to temporary file first
        const tmp = filePath.replace('.png', '_clean.png');
        await sharp(raw, { raw: { width, height, channels: 4 } })
            .png()
            .toFile(tmp);

        // Overwrite original
        fs.copyFileSync(tmp, filePath);
        fs.unlinkSync(tmp);

        // Also webp counterpart
        const webpPath = filePath.replace('.png', '.webp');
        if (fs.existsSync(webpPath)) {
            await sharp(raw, { raw: { width, height, channels: 4 } })
                .webp({ quality: 90 })
                .toFile(webpPath);
        }

        console.log(`Successfully cleaned ${filePath}`);
    } catch (e) {
        console.error(`Error processing ${filePath}:`, e);
    }
}

async function run() {
    for (const f of FILES) {
        await processFile(f);
    }
}
run();
