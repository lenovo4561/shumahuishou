const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 图片目录
const STATIC_DIR = path.join(__dirname, 'src/static');
const SRC_DIR = path.join(__dirname, 'src');

// 支持的图片格式
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

// 统计信息
let totalFiles = 0;
let totalOriginalSize = 0;
let totalConvertedSize = 0;
let convertedFiles = [];

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
 * 转换图片为 webp
 */
async function convertToWebp(file) {
  const { path: filePath, ext } = file;
  const originalSize = file.size;
  const webpPath = filePath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  
  try {
    // 跳过已经是 webp 的文件
    if (ext === '.webp') {
      return { success: false, reason: 'already webp' };
    }

    // 转换为 webp
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);

    const newStat = fs.statSync(webpPath);
    const newSize = newStat.size;

    // 只有当 webp 更小时才保留
    if (newSize < originalSize) {
      // 删除原文件
      fs.unlinkSync(filePath);
      
      totalOriginalSize += originalSize;
      totalConvertedSize += newSize;
      totalFiles++;
      
      convertedFiles.push({
        original: filePath,
        webp: webpPath,
        originalSize,
        newSize,
        saved: originalSize - newSize
      });

      return { 
        success: true, 
        originalSize, 
        newSize,
        saved: originalSize - newSize
      };
    } else {
      // webp 更大，删除 webp 保留原文件
      fs.unlinkSync(webpPath);
      return { success: false, reason: 'webp larger' };
    }
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error.message);
    return { success: false, reason: error.message };
  }
}

/**
 * 更新代码中的图片引用
 */
function updateCodeReferences() {
  const vueFiles = [];
  
  function findVueFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && !item.includes('node_modules')) {
        findVueFiles(fullPath);
      } else if (item.endsWith('.vue') || item.endsWith('.ts') || item.endsWith('.js')) {
        vueFiles.push(fullPath);
      }
    }
  }
  
  findVueFiles(SRC_DIR);
  
  let updatedCount = 0;
  
  for (const file of vueFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let updated = false;
    
    for (const converted of convertedFiles) {
      // 获取相对路径
      const relativePath = converted.original.replace(SRC_DIR, '').replace(/\\/g, '/');
      const newRelativePath = converted.webp.replace(SRC_DIR, '').replace(/\\/g, '/');
      
      // 替换各种可能的引用方式
      const patterns = [
        relativePath,
        relativePath.replace(/^\//, ''),
        `/static${relativePath.replace('/static', '')}`,
      ];
      
      for (const pattern of patterns) {
        const newPattern = pattern.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        if (content.includes(pattern)) {
          content = content.split(pattern).join(newPattern);
          updated = true;
        }
      }
    }
    
    if (updated) {
      fs.writeFileSync(file, content, 'utf-8');
      updatedCount++;
    }
  }
  
  return updatedCount;
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
  console.log('🖼️  图片转换为 WebP 工具\n');
  console.log(`📁 扫描目录: ${STATIC_DIR}`);

  // 获取所有图片文件
  const imageFiles = getImageFiles(STATIC_DIR);
  console.log(`\n📊 找到 ${imageFiles.length} 个图片文件\n`);

  if (imageFiles.length === 0) {
    console.log('没有找到需要转换的图片文件');
    return;
  }

  // 按大小排序，先处理大文件
  imageFiles.sort((a, b) => b.size - a.size);

  console.log('🔄 开始转换...\n');

  // 逐个转换
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const relativePath = file.path.replace(__dirname + '/', '');
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${relativePath}... `);
    
    const result = await convertToWebp(file);
    
    if (result.success) {
      console.log(`✅ ${formatSize(result.originalSize)} → ${formatSize(result.newSize)} (节省 ${((result.saved / result.originalSize) * 100).toFixed(1)}%)`);
    } else {
      console.log(`⏭️  ${result.reason}`);
    }
  }

  // 更新代码引用
  console.log('\n🔄 更新代码中的图片引用...');
  const updatedFiles = updateCodeReferences();
  console.log(`✅ 更新了 ${updatedFiles} 个文件的图片引用`);

  // 打印统计信息
  console.log('\n' + '='.repeat(60));
  console.log('📈 转换统计');
  console.log('='.repeat(60));
  console.log(`转换文件数: ${totalFiles}`);
  console.log(`原始大小: ${formatSize(totalOriginalSize)}`);
  console.log(`转换后大小: ${formatSize(totalConvertedSize)}`);
  console.log(`节省空间: ${formatSize(totalOriginalSize - totalConvertedSize)}`);
  console.log(`压缩率: ${((1 - totalConvertedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
}

main().catch(console.error);
