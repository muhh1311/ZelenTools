export type OutputFormat = "png" | "jpg" | "jpeg" | "webp" | "bmp" | "ico";

export interface ConvertedImage {
  blob: Blob;
  fileName: string;
  originalName: string;
  size: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function getImageOrientation(file: File): Promise<number> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const view = new DataView((e.target?.result as ArrayBuffer) || new ArrayBuffer(0));
        if (view.getUint16(0, false) !== 0xffd8) return resolve(1);
        let offset = 2;
        const length = view.byteLength;
        while (offset < length) {
          if (view.getUint16(offset, false) === 0xffe1) {
            const exifLength = view.getUint16(offset + 2, false);
            const start = offset + 4;
            if (view.getUint32(start, false) !== 0x45786966) return resolve(1);
            const little = view.getUint16(start + 6, false) === 0x4949;
            const tiffOffset = start + 10;
            const firstIFDOffset = tiffOffset + view.getUint32(start + 10 - start, little);
            const entries = view.getUint16(tiffOffset + (view.getUint32(start + 10 - start, little) || 0), little);
            for (let i = 0; i < entries; i++) {
              const entryOffset = tiffOffset + (view.getUint32(start + 10 - start, little) || 0) + 2 + i * 12;
              const tag = view.getUint16(entryOffset, little);
              if (tag === 0x0112) {
                const value = view.getUint16(entryOffset + 8, little);
                return resolve(value);
              }
            }
            break;
          } else {
            offset += 2 + view.getUint16(offset + 2, false);
          }
        }
      } catch (err) {
        // ignore and fallback
      }
      resolve(1);
    };
    reader.onerror = () => resolve(1);
    // read first 128KB should be enough for EXIF
    const slice = file.slice(0, 128 * 1024);
    reader.readAsArrayBuffer(slice);
  });
}

function createBmpBlobFromCanvas(canvas: HTMLCanvasElement): Blob {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  const imageData = ctx.getImageData(0, 0, width, height);
  const rowSize = Math.floor((24 * width + 31) / 32) * 4; // bytes per row (padded to 4)
  const pixelArraySize = rowSize * height;
  const headerSize = 14 + 40; // BITMAPFILEHEADER + BITMAPINFOHEADER
  const fileSize = headerSize + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);
  let offset = 0;

  // BITMAPFILEHEADER
  view.setUint16(offset, 0x4d42, true); // 'BM'
  offset += 2;
  view.setUint32(offset, fileSize, true);
  offset += 4;
  view.setUint32(offset, 0, true); // reserved
  offset += 4;
  view.setUint32(offset, headerSize, true); // pixel data offset
  offset += 4;

  // BITMAPINFOHEADER
  view.setUint32(offset, 40, true); // header size
  offset += 4;
  view.setInt32(offset, width, true);
  offset += 4;
  view.setInt32(offset, height, true);
  offset += 4;
  view.setUint16(offset, 1, true); // planes
  offset += 2;
  view.setUint16(offset, 24, true); // bit count
  offset += 2;
  view.setUint32(offset, 0, true); // compression
  offset += 4;
  view.setUint32(offset, pixelArraySize, true);
  offset += 4;
  view.setInt32(offset, 2835, true); // XPelsPerMeter (72 DPI)
  offset += 4;
  view.setInt32(offset, 2835, true); // YPelsPerMeter
  offset += 4;
  view.setUint32(offset, 0, true); // clrUsed
  offset += 4;
  view.setUint32(offset, 0, true); // clrImportant
  offset += 4;

  // Pixel data (bottom-up)
  const pixels = imageData.data;
  let pos = headerSize;
  const padding = rowSize - width * 3;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      view.setUint8(pos++, b);
      view.setUint8(pos++, g);
      view.setUint8(pos++, r);
    }
    // padding
    for (let p = 0; p < padding; p++) view.setUint8(pos++, 0);
  }

  return new Blob([buffer], { type: "image/bmp" });
}

async function createIcoBlobFromCanvas(canvas: HTMLCanvasElement): Promise<Blob> {
  // Create PNG from canvas
  const pngBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG export failed"))), "image/png");
  });
  const pngBuffer = await pngBlob.arrayBuffer();
  const pngSize = pngBuffer.byteLength;

  // ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes)
  const iconDirSize = 6 + 16;
  const buffer = new ArrayBuffer(iconDirSize + pngSize);
  const view = new DataView(buffer);
  let offset = 0;

  // ICONDIR
  view.setUint16(offset, 0, true); // reserved
  offset += 2;
  view.setUint16(offset, 1, true); // type 1 = icon
  offset += 2;
  view.setUint16(offset, 1, true); // count
  offset += 2;

  // ICONDIRENTRY
  const width = canvas.width >= 256 ? 0 : canvas.width;
  const height = canvas.height >= 256 ? 0 : canvas.height;
  view.setUint8(offset++, width);
  view.setUint8(offset++, height);
  view.setUint8(offset++, 0); // color count
  view.setUint8(offset++, 0); // reserved
  view.setUint16(offset, 1, true); // planes
  offset += 2;
  view.setUint16(offset, 32, true); // bit count
  offset += 2;
  view.setUint32(offset, pngSize, true); // bytes in resource
  offset += 4;
  view.setUint32(offset, iconDirSize, true); // image offset
  offset += 4;

  // copy PNG bytes
  const uint8 = new Uint8Array(buffer);
  uint8.set(new Uint8Array(pngBuffer), iconDirSize);

  return new Blob([buffer], { type: "image/x-icon" });
}

function getMimeType(format: OutputFormat): string {
  if (format === "png") return "image/png";
  if (format === "jpg" || format === "jpeg") return "image/jpeg";
  if (format === "bmp") return "image/bmp";
  if (format === "ico") return "image/x-icon";
  return "image/webp";
}

export function convertImage(
  file: File,
  format: OutputFormat,
  quality = 0.92
): Promise<ConvertedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);

      try {
        const orientation = await getImageOrientation(file);

        // determine canvas size based on orientation
        const needsSwap = [5, 6, 7, 8].includes(orientation);
        const width = needsSwap ? img.naturalHeight : img.naturalWidth;
        const height = needsSwap ? img.naturalWidth : img.naturalHeight;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Fill white background for JPEG
        if (format === "jpg" || format === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // handle EXIF orientation
        switch (orientation) {
          case 2:
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            break;
          case 3:
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            break;
          case 4:
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break;
          case 5:
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break;
          case 6:
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            break;
          case 7:
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            break;
          case 8:
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            break;
          default:
            break;
        }

        // draw the image into the canvas
        ctx.drawImage(img, 0, 0);

        let resultBlob: Blob;
        if (format === "bmp") {
          resultBlob = createBmpBlobFromCanvas(canvas);
        } else if (format === "ico") {
          resultBlob = await createIcoBlobFromCanvas(canvas);
        } else {
          resultBlob = await new Promise<Blob>((res, rej) => {
            canvas.toBlob((b) => (b ? res(b) : rej(new Error("Export failed"))), getMimeType(format), quality);
          });
        }

        const baseName = file.name.replace(/\.[^/.]+$/, "");
        const blobType = resultBlob.type || getMimeType(format);
        let ext = format;
        if (blobType.includes("png")) ext = "png";
        else if (blobType.includes("jpeg")) ext = "jpg";
        else if (blobType.includes("webp")) ext = "webp";
        else if (blobType.includes("bmp")) ext = "bmp";
        else if (blobType.includes("icon") || blobType === "image/vnd.microsoft.icon") ext = "ico";

        resolve({
          blob: resultBlob,
          fileName: `${baseName}.${ext}`,
          originalName: file.name,
          size: resultBlob.size,
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load ${file.name}`));
    };

    img.src = objectUrl;
  });
}

export async function convertImages(
  files: File[],
  format: OutputFormat,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ConvertedImage[]> {
  const results: ConvertedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, Math.round((i / files.length) * 100), file);

    const result = await convertImage(file, format);
    results.push(result);

    onProgress?.(i + 1, Math.round(((i + 1) / files.length) * 100), file);
  }

  return results;
}

export function downloadConvertedImage(result: ConvertedImage): void {
  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = result.fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadConvertedImagesAsZip(
  results: ConvertedImage[],
  zipName = "converted-images.zip"
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  results.forEach((result) => {
    zip.file(result.fileName, result.blob);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = zipName;
  anchor.click();
  URL.revokeObjectURL(url);
}
