import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const imagesDir = 'public/images';

console.log('Checking and stripping EXIF data from images...\n');

const files = await readdir(imagesDir);
const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg)$/i) && !f.startsWith('original-'));

for (const filename of imageFiles) {
  const inputPath = join(imagesDir, filename);
  const outputPath = join(imagesDir, `clean-${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`${filename}:`);

    // Check what metadata exists
    if (metadata.exif) {
      console.log('  ⚠️  Contains EXIF data');
    }
    if (metadata.icc) {
      console.log('  📊 Contains ICC color profile');
    }
    if (metadata.xmp) {
      console.log('  📋 Contains XMP data');
    }

    // Create clean version with no metadata
    await sharp(inputPath)
      .withMetadata({}) // Strip all metadata
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log(`  ✓ Clean version saved as: clean-${filename}\n`);

  } catch (error) {
    console.error(`  Error: ${error.message}\n`);
  }
}

console.log('\nTo use the clean versions, run:');
console.log('cd public/images && for f in clean-*.jpg; do mv "$f" "${f#clean-}"; done');
