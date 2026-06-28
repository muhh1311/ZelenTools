self.onmessage = function (e) {
  const { action, imageData, params } = e.data;

  try {
    let result;

    switch (action) {
      case 'grayscale':
        result = applyGrayscale(imageData);
        break;
      case 'sepia':
        result = applySepia(imageData);
        break;
      case 'brightness':
        result = applyBrightness(imageData, params.value);
        break;
      case 'contrast':
        result = applyContrast(imageData, params.value);
        break;
      case 'invert':
        result = applyInvert(imageData);
        break;
      case 'blur':
        result = applyBlur(imageData, params.radius || 3);
        break;
      default:
        throw new Error('Unknown action');
    }

    self.postMessage({ success: true, imageData: result });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};

function applyGrayscale(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  return imageData;
}

function applySepia(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  }
  return imageData;
}

function applyBrightness(imageData, brightness) {
  const data = imageData.data;
  const factor = brightness / 100;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] * factor));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor));
  }
  return imageData;
}

function applyContrast(imageData, contrast) {
  const data = imageData.data;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
    data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
    data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
  }
  return imageData;
}

function applyInvert(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  return imageData;
}

function applyBlur(imageData, radius) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const newData = new Uint8ClampedArray(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, count = 0;

      for (let ky = -radius; ky <= radius; ky++) {
        for (let kx = -radius; kx <= radius; kx++) {
          const px = x + kx;
          const py = y + ky;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const i = (py * width + px) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
      }

      const i = (y * width + x) * 4;
      newData[i] = r / count;
      newData[i + 1] = g / count;
      newData[i + 2] = b / count;
    }
  }

  for (let i = 0; i < data.length; i++) {
    data[i] = newData[i];
  }

  return imageData;
}
