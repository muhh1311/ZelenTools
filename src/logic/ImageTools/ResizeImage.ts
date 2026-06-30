import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspect: boolean;
}

export async function resizeImages(
  files: File[],
  options: ResizeOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    let w = options.width;
    let h = options.height;

    if (options.maintainAspect) {
      const ratio = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      w = Math.round(img.naturalWidth * ratio);
      h = Math.round(img.naturalHeight * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-${w}x${h}.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
