const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 需要强制压缩的大文件列表
const largeFiles = [
  'desktop/pc-host-motherboard.jpg',
  'electronics/mijia-air-purifier.jpg',
  'herb/turtle-shell.webp',
  'herb/wasp-nest.webp',
  '1.webp',
  'electronics/sony-cd.webp',
  'add-wechat.webp',
  'herb/cicada-slough.webp',
  'new-phone/IQOO.png',
  'follow-official-account.png'
];

const STATIC_IMG_DIR = path.join(__dirname, 'src/static/img');

async function compressFile(relativePath) {
  const fullPath = path.join(STATIC_IMG_DIR, relativePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  ${relativePath} 不存在`);
    return;
  }
  
  const originalSize = fs.statSync(fullPath).size;
  const ext = path.extname(fullPath).toLowerCase();
  
  try {
    // 读取图片
    let image = sharp(fullPath);
    const metadata = await image.metadata();
    
    // 如果图片太大，缩小尺寸
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > 400 || height > 400) {
      const scale = Math.min(400 / width, 400 / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
      image = image.resize(width, height);
    }
    
    // 转换为低质量 webp
    const webpPath = fullPath.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '_compressed.webp');
    
    await image
      .webp({ quality: 50 })
      .toFile(webpPath);
    
    const newSize = fs.statSync(webpPath).size;
    
    if (newSize < originalSize) {
      // 删除原文件，重命名新文件
      fs.unlinkSync(fullPath);
      const finalPath = fullPath.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp');
      if (fs.existsSync(finalPath) && finalPath !== webpPath) {
        fs.unlinkSync(finalPath);
      }
      fs.renameSync(webpPath, finalPath);
      
      console.log(`✅ ${relativePath}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (节省 ${((1-newSize/originalSize)*100).toFixed(1)}%)`);
    } else {
      fs.unlinkSync(webpPath);
      console.log(`⏭️  ${relativePath}: 压缩后更大，保持原样`);
    }
  } catch (error) {
    console.error(`❌ ${relativePath}: ${error.message}`);
  }
}

async function main() {
  console.log('🔄 强制压缩大文件...\n');
  
  for (const file of largeFiles) {
    await compressFile(file);
  }
  
  console.log('\n✅ 完成');
}

main();
