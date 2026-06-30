import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export interface CropOptions {
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
}

export async function cropImages(
  files: File[],
  options: CropOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const sx = Math.round((options.xPercent / 100) * img.naturalWidth);
    const sy = Math.round((options.yPercent / 100) * img.naturalHeight);
    const sw = Math.round((options.widthPercent / 100) * img.naturalWidth);
    const sh = Math.round((options.heightPercent / 100) * img.naturalHeight);

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-cropped.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
