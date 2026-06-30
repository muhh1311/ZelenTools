import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

function applyPixelFilter(
  img: HTMLImageElement,
  filter: (r: number, g: number, b: number, a: number) => [number, number, number, number]
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = filter(data[i], data[i + 1], data[i + 2], data[i + 3]);
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvasToBlob(canvas, "image/png");
}

export async function adjustBrightness(
  files: File[],
  amount: number,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const blob = await applyPixelFilter(img, (r, g, b, a) => [
      Math.min(255, Math.max(0, r + amount)),
      Math.min(255, Math.max(0, g + amount)),
      Math.min(255, Math.max(0, b + amount)),
      a,
    ]);
    return {
      blob,
      fileName: `${getBaseName(file.name)}-brightness.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}

export async function adjustContrast(
  files: File[],
  amount: number,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  const factor = (259 * (amount + 255)) / (255 * (259 - amount));
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const blob = await applyPixelFilter(img, (r, g, b, a) => {
      const adjust = (v: number) =>
        Math.min(255, Math.max(0, factor * (v - 128) + 128));
      return [adjust(r), adjust(g), adjust(b), a];
    });
    return {
      blob,
      fileName: `${getBaseName(file.name)}-contrast.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}

export async function adjustSaturation(
  files: File[],
  amount: number,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  const sat = amount / 100;
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const blob = await applyPixelFilter(img, (r, g, b, a) => {
      const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
      return [
        Math.min(255, Math.max(0, gray + sat * (r - gray))),
        Math.min(255, Math.max(0, gray + sat * (g - gray))),
        Math.min(255, Math.max(0, gray + sat * (b - gray))),
        a,
      ];
    });
    return {
      blob,
      fileName: `${getBaseName(file.name)}-saturation.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
