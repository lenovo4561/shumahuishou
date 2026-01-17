const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 图片目录
const STATIC_DIR = path.join(__dirname, 'src/static');

// 支持的图片格式
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// 统计信息
let totalFiles = 0;
let totalOriginalSize = 0;
let totalCompressedSize = 0;

/**
 * 递归获取所有图片文件
 */
function getImageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getImageFiles(fullPath, files);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        files.push({
          path: fullPath,
          size: stat.size,
          ext: ext
        });
      }
    }
  }
  
  return files;
}

/**
 * 使用 sharp 压缩图片
 */
async function compressWithSharp(sharp, file) {
  const { path: filePath, ext } = file;
  const originalSize = file.size;
  
  try {
    let sharpInstance = sharp(filePath);
    const metadata = await sharpInstance.metadata();
    
    // 如果图片太大，先缩小尺寸
    const maxWidth = 800;
    const maxHeight = 800;
    
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    let buffer;
    
    if (ext === '.png') {
      buffer = await sharpInstance
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await sharpInstance
        .jpeg({ quality: 75, mozjpeg: true })
        .toBuffer();
    } else if (ext === '.webp') {
      buffer = await sharpInstance
        .webp({ quality: 75 })
        .toBuffer();
    } else if (ext === '.gif') {
      // GIF 保持原样或转换
      buffer = await sharpInstance.toBuffer();
    } else {
      return { success: false, reason: 'unsupported format' };
    }
    
    // 只有压缩后更小才保存
    if (buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      return {
        success: true,
        originalSize,
        compressedSize: buffer.length,
        saved: originalSize - buffer.length
      };
    } else {
      return {
        success: true,
        originalSize,
        compressedSize: originalSize,
        saved: 0,
        reason: 'already optimized'
      };
    }
  } catch (error) {
    return { success: false, reason: error.message };
  }
}

/**
 * 格式化文件大小
 */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * 主函数
 */
async function main() {
  console.log('🖼️  图片压缩工具\n');
  console.log('📁 扫描目录:', STATIC_DIR);
  
  // 检查是否安装了 sharp
  let sharp;
  try {
    sharp = require('sharp');
    console.log('✅ sharp 模块已加载\n');
  } catch (e) {
    console.log('⚠️  sharp 模块未安装，正在安装...\n');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      sharp = require('sharp');
      console.log('✅ sharp 安装成功\n');
    } catch (installError) {
      console.error('❌ 安装 sharp 失败，请手动运行: npm install sharp --save-dev');
      process.exit(1);
    }
  }
  
  // 获取所有图片
  const imageFiles = getImageFiles(STATIC_DIR);
  console.log(`📊 找到 ${imageFiles.length} 个图片文件\n`);
  
  if (imageFiles.length === 0) {
    console.log('没有找到需要压缩的图片');
    return;
  }
  
  // 按大小排序，优先处理大文件
  imageFiles.sort((a, b) => b.size - a.size);
  
  console.log('🔄 开始压缩...\n');
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const relativePath = path.relative(__dirname, file.path);
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${relativePath}...`);
    
    const result = await compressWithSharp(sharp, file);
    
    if (result.success) {
      totalFiles++;
      totalOriginalSize += result.originalSize;
      totalCompressedSize += result.compressedSize;
      
      if (result.saved > 0) {
        const percent = ((result.saved / result.originalSize) * 100).toFixed(1);
        console.log(` ✅ ${formatSize(result.originalSize)} → ${formatSize(result.compressedSize)} (节省 ${percent}%)`);
      } else {
        console.log(` ⏭️  已是最优`);
      }
    } else {
      console.log(` ❌ ${result.reason}`);
    }
  }
  
  // 输出统计
  console.log('\n' + '='.repeat(60));
  console.log('📈 压缩统计');
  console.log('='.repeat(60));
  console.log(`处理文件数: ${totalFiles}`);
  console.log(`原始大小: ${formatSize(totalOriginalSize)}`);
  console.log(`压缩后大小: ${formatSize(totalCompressedSize)}`);
  console.log(`节省空间: ${formatSize(totalOriginalSize - totalCompressedSize)}`);
  console.log(`压缩率: ${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
}

main().catch(console.error);
