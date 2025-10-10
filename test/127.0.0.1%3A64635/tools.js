const fs = require('fs');
const path = require('path');

// WAV文件转Base64
function fileToBase64(filePath) {
  return new Promise((resolve, reject) => {
    try {
      // 读取文件
      const fileData = fs.readFileSync(filePath);

      // 获取文件扩展名
      const ext = path.extname(filePath).toLowerCase();
      let mimeType;

      // 根据扩展名设置MIME类型
      switch (ext) {
        case '.wav':
          mimeType = 'audio/wav';
          break;
        case '.mp3':
          mimeType = 'audio/mpeg';
          break;
        case '.ogg':
          mimeType = 'audio/ogg';
          break;
        default:
          mimeType = 'application/octet-stream';
      }

      // 转换为Base64
      const base64Data = fileData.toString('base64');
      const dataURL = `${base64Data}`;

      resolve(dataURL);
    } catch (error) {
      reject(error);
    }
  });
}

// 使用示例
async function main() {
  try {
    const filePath = './abc.wav'; // 你的WAV文件路径
    const base64 = await fileToBase64(filePath);

    console.log('Base64 Data URL:');
    console.log(base64.substring(0, 100) + '...'); // 只显示前100字符

    // 保存到文件
    fs.writeFileSync('output_base64.txt', base64);
    console.log('\n完整Base64已保存到 output_base64.txt');

    // 统计信息
    const stats = fs.statSync(filePath);
    console.log(`\n文件信息:`);
    console.log(`文件名: ${path.basename(filePath)}`);
    console.log(`文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`Base64长度: ${base64.length} 字符`);

  } catch (error) {
    console.error('转换失败:', error.message);
  }
}

// 命令行使用
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('使用方法: node wavToBase64.js <wav文件路径>');
    console.log('示例: node wavToBase64.js ./audio.wav');
    process.exit(1);
  }

  main(args[0]);
}

module.exports = fileToBase64;