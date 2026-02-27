import fs from 'fs';
import path from 'path';

function reset(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
            reset(full);
        } else if (file.endsWith('.original.png')) {
            const purePng = full.replace('.original.png', '.png');
            const webp = full.replace('.original.png', '.webp');

            console.log('Restoring', purePng);
            fs.copyFileSync(full, purePng);

            if (fs.existsSync(webp)) {
                fs.unlinkSync(webp);
            }
        }
    }
}
reset('./public');
