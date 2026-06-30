import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  formatFileSize,
} from "./imageUtils";

const FAVICON_SIZES = [16, 32, 48, 180];

export async function generateFavicons(
  files: File[],
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  const results: ProcessedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, Math.round((i / files.length) * 100), file);

    const img = await loadImageFromFile(file);
    const baseName = getBaseName(file.name);

    for (const size of FAVICON_SIZES) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      const blob = await canvasToBlob(canvas, "image/png");
      results.push({
        blob,
        fileName: `${baseName}-favicon-${size}x${size}.png`,
        originalName: file.name,
        size: blob.size,
      });
    }

    onProgress?.(i + 1, Math.round(((i + 1) / files.length) * 100), file);
  }

  return results;
}

export { formatFileSize };
