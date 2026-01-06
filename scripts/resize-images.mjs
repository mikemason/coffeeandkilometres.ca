import sharp from 'sharp';
import { join } from 'path';

const imagesDir = 'public/images';

const sizes = {
  'dempster-hero.jpg': { width: 1920, quality: 85 },
  'dempster-1.jpg': { width: 1200, quality: 85 },
  'dempster-2.jpg': { width: 1200, quality: 85 },
  'dempster-3.jpg': { width: 1200, quality: 85 },
  'dempster-4.jpg': { width: 1200, quality: 85 },
};

console.log('Resizing images for web...\n');

for (const [filename, config] of Object.entries(sizes)) {
  const inputPath = join(imagesDir, filename);
  const outputPath = join(imagesDir, `optimized-${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`${filename}:`);
    console.log(`  Original: ${metadata.width}×${metadata.height} (${(metadata.size / 1024 / 1024).toFixed(1)}MB)`);

    await image
      .resize(config.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: config.quality, mozjpeg: true })
      .toFile(outputPath);

    const newImage = sharp(outputPath);
    const newMeta = await newImage.metadata();

    console.log(`  Optimized: ${newMeta.width}×${newMeta.height} (${(newMeta.size / 1024).toFixed(0)}KB)`);
    console.log(`  Saved as: optimized-${filename}\n`);

  } catch (error) {
    console.error(`  Error: ${error.message}\n`);
  }
}

console.log('✓ Done! Now replace the originals with the optimized versions.');
