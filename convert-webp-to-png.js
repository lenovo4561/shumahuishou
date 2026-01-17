const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const STATIC_DIR = path.join(__dirname, 'src/static');
const SRC_DIR = path.join(__dirname, 'src');

let convertedFiles = [];

async function convertWebpToPng(filePath) {
  const originalSize = fs.statSync(filePath).size;
  const pngPath = filePath.replace('.webp', '.png');
  
  try {
    await sharp(filePath)
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(pngPath);
    
    const newSize = fs.statSync(pngPath).size;
    
    // 删除 webp 文件
    fs.unlinkSync(filePath);
    
    convertedFiles.push({
      original: filePath,
      newPath: pngPath
    });
    
    console.log(`✅ ${path.basename(filePath)} → ${path.basename(pngPath)} (${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB)`);
    return true;
  } catch (error) {
    console.error(`❌ ${filePath}: ${error.message}`);
    return false;
  }
}

function getAllWebpFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.')) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllWebpFiles(fullPath, files);
    } else if (item.endsWith('.webp')) {
      files.push(fullPath);
    }
  }
  return files;
}

function updateCodeReferences() {
  const codeFiles = [];
  
  function findCodeFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !item.includes('node_modules')) {
        findCodeFiles(fullPath);
      } else if (item.endsWith('.vue') || item.endsWith('.ts') || item.endsWith('.js')) {
        codeFiles.push(fullPath);
      }
    }
  }
  
  findCodeFiles(SRC_DIR);
  
  let updatedCount = 0;
  
  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let updated = false;
    
    // 替换所有 .webp 为 .png
    if (content.includes('.webp')) {
      content = content.replace(/\.webp/g, '.png');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(file, content, 'utf-8');
      updatedCount++;
    }
  }
  
  return updatedCount;
}

async function main() {
  console.log('🔄 将 webp 图片转换回 png 格式以确保兼容性...\n');
  
  const webpFiles = getAllWebpFiles(STATIC_DIR);
  console.log(`找到 ${webpFiles.length} 个 webp 文件\n`);
  
  for (const file of webpFiles) {
    await convertWebpToPng(file);
  }
  
  console.log('\n🔄 更新代码中的图片引用...');
  const updatedFiles = updateCodeReferences();
  console.log(`✅ 更新了 ${updatedFiles} 个文件的图片引用`);
  
  console.log('\n✅ 完成！');
}

main();
