import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cursorsDir = path.join(__dirname, 'assets', 'cursors');
const files = ['Default.webp', 'Loading.webp', 'Text.webp'];

async function resizeCursors() {
  for (const file of files) {
    const inputPath = path.join(cursorsDir, file);
    const backupPath = path.join(cursorsDir, file.replace('.webp', '_original.webp'));
    const outputPath = path.join(cursorsDir, file);
    
    try {
      // 备份原文件
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
      }
      
      // 直接覆盖原文件
      await sharp(backupPath)
        .resize(32, 32, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(outputPath);
      
      console.log(`✓ Resized ${file} to 32x32`);
    } catch (error) {
      console.error(`✗ Error resizing ${file}:`, error.message);
    }
  }
}

resizeCursors().then(() => {
  console.log('\nAll cursors resized successfully!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
