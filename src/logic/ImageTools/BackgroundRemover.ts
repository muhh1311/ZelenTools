import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export interface BackgroundRemoverOptions {
  threshold: number;
  targetColor: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const num = parseInt(normalized, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export async function removeBackground(
  files: File[],
  options: BackgroundRemoverOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  const [tr, tg, tb] = hexToRgb(options.targetColor);

  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const diff =
        Math.abs(data[i] - tr) + Math.abs(data[i + 1] - tg) + Math.abs(data[i + 2] - tb);
      if (diff < options.threshold) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-no-bg.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
