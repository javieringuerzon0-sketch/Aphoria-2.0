import fs from 'fs';
import sharp from 'sharp';

const FILES = [
    { in: './public/bundlee/goldmask-bundlee.png', out: './public/bundlee/goldmask-jar-v2.png' },
    { in: './public/bundlee/avocado-bundlee.png', out: './public/bundlee/avocado-jar-v2.png' }
];

async function processFile(item) {
    console.log(`Cleaning ${item.in}...`);
    try {
        const img = sharp(item.in);
        const { width, height } = await img.metadata();
        const raw = await img.ensureAlpha().raw().toBuffer();

        for (let i = 0; i < raw.length; i += 4) {
            const r = raw[i];
            const g = raw[i + 1];
            const b = raw[i + 2];

            // Very aggressive: any pixel that's very light (sum > 700) and fairly desaturated 
            // OR specifically the beige color
            const isBeige = Math.abs(r - 244) + Math.abs(g - 246) + Math.abs(b - 238) < 40;
            const isWhiteIsh = (r > 240 && g > 240 && b > 235);
            const isVeryLight = (r + g + b > 730);

            if (isBeige || isWhiteIsh || isVeryLight) {
                raw[i + 3] = 0;
            }
        }

        await sharp(raw, { raw: { width, height, channels: 4 } })
            .png()
            .toFile(item.out);

        // Also webp
        await sharp(item.out).webp({ quality: 90 }).toFile(item.out.replace('.png', '.webp'));

        console.log(`Generated ${item.out}`);
    } catch (e) {
        console.error(`Error processing ${item.in}:`, e);
    }
}

async function run() {
    for (const item of FILES) {
        await processFile(item);
    }
}
run();
