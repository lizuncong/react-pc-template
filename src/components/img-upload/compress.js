
// 将File（Blob）对象转变为一个dataURL字符串， 即base64格式
const fileToDataURL = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onloadend = (e) => resolve(e.target.result);
  reader.readAsDataURL(file);
});

// 将dataURL字符串转变为image对象，即base64转img对象
const dataURLToImage = (dataURL) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.src = dataURL;
});

// 将一个canvas对象转变为一个File（Blob）对象
const canvastoFile = (canvas, type, quality) => new Promise((resolve) => {
  canvas.toBlob((blob) => resolve(blob), type, quality);
});

const compress = (originfile, maxSize) => new Promise(async (resolve, reject) => {
  const originSize = originfile.size / 1024; // 单位为kb
  console.log('图片指定最大尺寸为', maxSize, '原始尺寸为：', originSize);

  // 将原图片转换成base64
  const base64 = await fileToDataURL(originfile);

  // 缩放图片需要的canvas
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // 小于maxSize，则不需要压缩，直接返回
  if (originSize < maxSize) {
    resolve({ compressBase64: base64, compressFile: originfile });
    console.log(`图片小于指定大小:${maxSize}KB，不用压缩`);
    return;
  }


  const img = await dataURLToImage(base64);

  const scale = 1;
  const originWidth = img.width;
  const originHeight = img.height;
  const targetWidth = originWidth * scale;
  const targetHeight = originHeight * scale;

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  context.clearRect(0, 0, targetWidth, targetHeight);
  context.drawImage(img, 0, 0, targetWidth, targetHeight);

  // 将Canvas对象转变为dataURL字符串，即压缩后图片的base64格式
  // const compressedBase64 = canvas.toDataURL('image/jpeg', 0.1);
  // 经过我的对比，通过scale控制图片的拉伸来压缩图片，能够压缩jpg，png等格式的图片
  // 通过canvastoFile方法传递quality来压缩图片，只能压缩jpeg类型的图片，png等格式不支持
  // scale的压缩效果没有canvastoFile好
  // 在压缩到指定大小时，通过scale压缩的图片比通过quality压缩的图片模糊的多
  // 压缩的思路，用二分法找最佳的压缩点
  // 这里为了规避浮点数计算的弊端，将quality转为整数再计算;
  // const preQuality = 100;
  const maxQualitySize = { quality: 100, size: Number.MAX_SAFE_INTEGER };
  const minQualitySize = { quality: 0, size: 0 };
  let quality = 100;
  let count = 0; // 压缩次数
  let compressFinish = false; // 压缩完成
  let invalidDesc = '';
  let compressBlob = null;

  // 二分法最多尝试8次即可覆盖全部可能
  while (!compressFinish && count < 12) {
    compressBlob = await canvastoFile(canvas, 'image/jpeg', quality / 100);
    const compressSize = compressBlob.size / 1024;
    count += 1;
    if (compressSize === maxSize) {
      console.log(`压缩完成，总共压缩了${count}次`);
      compressFinish = true;
      return;
    }
    if (compressSize > maxSize) {
      maxQualitySize.quality = quality;
      maxQualitySize.size = compressSize;
    }
    if (compressSize < maxSize) {
      minQualitySize.quality = quality;
      minQualitySize.size = compressSize;
    }
    console.log(`第${count}次压缩,压缩后大小${compressSize},quality参数:${quality}`);

    quality = Math.ceil((maxQualitySize.quality + minQualitySize.quality) / 2);

    if (maxQualitySize.quality - minQualitySize.quality < 2) {
      if (!minQualitySize.size && quality) {
        quality = minQualitySize.quality;
      } else if (!minQualitySize.size && !quality) {
        compressFinish = true;
        invalidDesc = '压缩失败，无法压缩到指定大小';
        console.log(`压缩完成，总共压缩了${count}次`);
      } else if (minQualitySize.size > maxSize) {
        compressFinish = true;
        invalidDesc = '压缩失败，无法压缩到指定大小';
        console.log(`压缩完成，总共压缩了${count}次`);
      } else {
        console.log(`压缩完成，总共压缩了${count}次`);
        compressFinish = true;
        quality = minQualitySize.quality;
      }
    }
  }

  if (invalidDesc) {
    // 压缩失败，则返回原始图片的信息
    console.log(`压缩失败，无法压缩到指定大小：${maxSize}KB`);
    reject({ msg: invalidDesc, compressBase64: base64, compressFile: originfile });
    return;
  }

  compressBlob = await canvastoFile(canvas, 'image/jpeg', quality / 100);
  const compressSize = compressBlob.size / 1024;
  console.log(`最后一次压缩（即第${count + 1}次），quality为:${quality}，大小：${compressSize}`);
  const compressedBase64 = await fileToDataURL(compressBlob);

  const compressedFile = new File([compressBlob], originfile.name, { type: 'image/jpeg' });

  resolve({ compressFile: compressedFile, compressBase64: compressedBase64 });
});


export default compress;
