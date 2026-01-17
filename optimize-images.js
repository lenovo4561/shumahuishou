const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 适度压缩设置 - 保证质量的同时减少体积
const CONFIG = {
  quality: 70,        // 较高质量
  maxWidth: 500,      // 保持较大尺寸
  maxHeight: 500
};

const srcDir = './src/static';

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      return null;
    }

    const originalSize = fs.statSync(filePath).size;
    
    // 小于 10KB 的文件跳过
    if (originalSize < 10 * 1024) {
      return null;
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // 计算新尺寸
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > CONFIG.maxWidth || height > CONFIG.maxHeight) {
      const ratio = Math.min(CONFIG.maxWidth / width, CONFIG.maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    let buffer;
    if (ext === '.png') {
      buffer = await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: CONFIG.quality, compressionLevel: 9 })
        .toBuffer();
    } else {
      buffer = await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: CONFIG.quality })
        .toBuffer();
    }

    // 只有变小才保存
    if (buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      const saved = ((originalSize - buffer.length) / originalSize * 100).toFixed(1);
      return {
        file: path.basename(filePath),
        original: (originalSize / 1024).toFixed(1) + 'KB',
        new: (buffer.length / 1024).toFixed(1) + 'KB',
        saved: saved + '%'
      };
    }
    return null;
  } catch (err) {
    console.error(`Error: ${filePath}:`, err.message);
    return null;
  }
}

async function walkDir(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log('开始优化图片...');
  console.log(`配置: 质量=${CONFIG.quality}%, 最大尺寸=${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
  console.log('');

  const files = await walkDir(srcDir);
  const imageFiles = files.filter(f => 
    ['.png', '.jpg', '.jpeg'].includes(path.extname(f).toLowerCase())
  );

  console.log(`找到 ${imageFiles.length} 个图片文件`);
  
  let optimizedCount = 0;
  let totalSaved = 0;

  for (const file of imageFiles) {
    const originalSize = fs.statSync(file).size;
    const result = await optimizeImage(file);
    if (result) {
      const newSize = fs.statSync(file).size;
      totalSaved += originalSize - newSize;
      optimizedCount++;
      console.log(`✓ ${result.file}: ${result.original} → ${result.new} (节省 ${result.saved})`);
    }
  }

  console.log('');
  console.log(`完成! 优化了 ${optimizedCount} 个文件`);
  console.log(`总共节省: ${(totalSaved / 1024).toFixed(1)} KB`);
}

main().catch(console.error);
