// src/logic/ImageTools/universalConverterLogic.ts

export type ImageFormat = 'JPG' | 'JPEG' | 'PNG' | 'WebP' | 'GIF' | 'SVG' | 'HEIC' | 'AVIF' | 'BMP' | 'TIFF' | 'ICO';

export const convertImage = (
  file: File,
  targetFormat: ImageFormat
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // SVG format custom logic
        if (targetFormat === 'SVG') {
          const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}"><image href="${event.target?.result}" width="${img.width}" height="${img.height}"/></svg>`;
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
          resolve(URL.createObjectURL(svgBlob));
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context failure'));
          return;
        }

        // Transparency fill for JPG backgrounds
        if (targetFormat === 'JPG' || targetFormat === 'JPEG') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        // Mime structure configuration
        let mimeType = 'image/png';
        switch (targetFormat) {
          case 'JPG':
          case 'JPEG':
            mimeType = 'image/jpeg';
            break;
          case 'WebP':
            mimeType = 'image/webp';
            break;
          case 'GIF':
            mimeType = 'image/gif';
            break;
          case 'BMP':
            mimeType = 'image/bmp';
            break;
          case 'ICO':
            mimeType = 'image/x-icon';
            break;
          case 'TIFF':
            mimeType = 'image/tiff';
            break;
          default:
            mimeType = `image/${targetFormat.toLowerCase()}`;
        }

        const dataUrl = canvas.toDataURL(mimeType, 0.95);
        resolve(dataUrl);
      };

      img.onerror = () => reject(new Error('Image failed to load.'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('File reading error.'));
    reader.readAsDataURL(file);
  });
};