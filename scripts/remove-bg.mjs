import sharp from 'sharp';

async function removeBackground(inputFile, outputFile) {
    console.log(`Processing ${inputFile}...`);
    try {
        const image = sharp(inputFile);
        const { width, height } = await image.metadata();
        const rawBuffer = await image.ensureAlpha().raw().toBuffer();

        // Loop through the pixels and make background transparent
        // RGB is [244, 246, 238] ish
        for (let i = 0; i < rawBuffer.length; i += 4) {
            const r = rawBuffer[i];
            const g = rawBuffer[i + 1];
            const b = rawBuffer[i + 2];

            // Check if pixel is close to [244, 246, 238]
            const diff = Math.abs(r - 244) + Math.abs(g - 246) + Math.abs(b - 238);

            // Allow a threshold to catch anti-aliasing (edges)
            // If color is very close to beige, make fully transparent
            if (diff < 20) {
                rawBuffer[i + 3] = 0; // Alpha channel to 0
            } else if (diff < 50) {
                // Soft edge / feathering
                const alpha = Math.floor(((diff - 20) / 30) * 255);
                rawBuffer[i + 3] = alpha;
                // Push color towards green to avoid white fringing 
                // just a tiny bit though
            }
        }

        await sharp(rawBuffer, {
            raw: { width, height, channels: 4 }
        })
            .png() // Must save as PNG for true alpha transparency
            .toFile(outputFile);

        console.log(`Success! Saved transparent version to ${outputFile}`);
    } catch (err) {
        console.error("Failed:", err);
    }
}

// We will apply this exclusively to the bundle image and the seccion image
const inputs = [
    { in: './public/bundlee/avocado-bundlee.original.png', out: './public/bundlee/avocado-bundlee.png' },
    { in: './public/avocado-landing/producto/avocado-producto.original.png', out: './public/avocado-landing/producto/avocado-producto.png' },
    { in: './public/productos front/seccion-avocado.original.png', out: './public/productos front/seccion-avocado.png' }
];

async function run() {
    for (let item of inputs) {
        await removeBackground(item.in, item.out);
    }
    console.log('Done rendering alpha PNGs.');
}

run();
