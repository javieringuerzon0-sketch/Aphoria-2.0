import sharp from 'sharp';
import fs from 'fs';

async function removeBackground(inputFile, outputFile) {
    if (!fs.existsSync(inputFile)) {
        console.error(`Not found: ${inputFile}`);
        return;
    }

    // Create a backup of the very very first opaque image if it doesn't exist yet
    const backupFile = inputFile.replace('.png', '.bg.png');
    if (!fs.existsSync(backupFile)) {
        fs.copyFileSync(inputFile, backupFile);
    }

    // We process from the backup to ensure we have original opaque pixels
    const image = sharp(backupFile);
    const { width, height } = await image.metadata();
    const rawBuffer = await image.ensureAlpha().raw().toBuffer();

    for (let i = 0; i < rawBuffer.length; i += 4) {
        const r = rawBuffer[i];
        const g = rawBuffer[i + 1];
        const b = rawBuffer[i + 2];

        // Background is roughly [244, 246, 238] to [255, 255, 255]
        const diff = Math.abs(r - 244) + Math.abs(g - 246) + Math.abs(b - 238);

        // Remove threshold 35 allows picking up slight compression blocks in the beige flat area
        if (diff < 35 || (r > 240 && g > 240 && b > 230)) {
            rawBuffer[i + 3] = 0; // Alpha 0
        } else if (diff < 60) {
            // Anti-aliasing soft edge
            const alpha = Math.floor(((diff - 35) / 25) * 255);
            // Cap to avoid harsh edges
            rawBuffer[i + 3] = alpha;
        }
    }

    // Save as .png
    await sharp(rawBuffer, {
        raw: { width, height, channels: 4 }
    })
        .png()
        .toFile(outputFile);

    console.log(`Saved transparent PNG: ${outputFile}`);
}

const inputs = [
    { in: './public/bundlee/avocado-bundlee.png', out: './public/bundlee/avocado-bundlee.png' },
    { in: './public/avocado-landing/producto/avocado-producto.png', out: './public/avocado-landing/producto/avocado-producto.png' },
    { in: './public/productos front/seccion-avocado.png', out: './public/productos front/seccion-avocado.png' }
];

async function run() {
    for (const item of inputs) {
        await removeBackground(item.in, item.out);
        // Now explicitly generate WebP from the NEW transparent PNG, overwriting the old WebP
        const webpOut = item.out.replace('.png', '.webp');
        await sharp(item.out).webp({ quality: 85, effort: 6 }).toFile(webpOut);
        console.log(`Saved transparent WebP: ${webpOut}`);
    }
}
run();
