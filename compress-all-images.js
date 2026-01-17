const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const STATIC_IMG_DIR = path.join(__dirname, 'src/static/img');
const MIN_SIZE = 4 * 1024; // 4KB 以上的文件才压缩

let totalSaved = 0;

async function compressFile(fullPath) {
  const originalSize = fs.statSync(fullPath).size;
  
  if (originalSize < MIN_SIZE) {
    return;
  }
  
  const relativePath = fullPath.replace(STATIC_IMG_DIR + '/', '');
  
  try {
    let image = sharp(fullPath);
    const metadata = await image.metadata();
    
    // 如果图片尺寸太大，缩小
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > 300 || height > 300) {
      const scale = Math.min(300 / width, 300 / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
      image = image.resize(width, height);
    }
    
    // 极限压缩
    const tempPath = fullPath + '.tmp';
    
    await image
      .webp({ quality: 40 })
      .toFile(tempPath);
    
    const newSize = fs.statSync(tempPath).size;
    
    if (newSize < originalSize) {
      fs.unlinkSync(fullPath);
      const finalPath = fullPath.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp');
      fs.renameSync(tempPath, finalPath);
      
      totalSaved += (originalSize - newSize);
      console.log(`✅ ${relativePath}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB`);
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (error) {
    // 静默处理错误
  }
}

function getAllFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.')) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log('🔄 批量压缩所有大图片 (>8KB)...\n');
  
  const files = getAllFiles(STATIC_IMG_DIR);
  files.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);
  
  for (const file of files) {
    await compressFile(file);
  }
  
  console.log(`\n✅ 总共节省: ${(totalSaved/1024).toFixed(1)} KB`);
}

main();
