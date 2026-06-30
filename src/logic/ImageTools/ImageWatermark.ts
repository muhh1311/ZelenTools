import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export interface WatermarkOptions {
  text: string;
  opacity: number;
  fontSize: number;
  position: "center" | "bottom-right" | "bottom-left";
}

export async function addWatermark(
  files: File[],
  options: WatermarkOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    ctx.globalAlpha = options.opacity / 100;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.font = `bold ${options.fontSize}px Arial`;

    const metrics = ctx.measureText(options.text);
    let x = 20;
    let y = canvas.height - 20;

    if (options.position === "center") {
      x = (canvas.width - metrics.width) / 2;
      y = canvas.height / 2;
    } else if (options.position === "bottom-right") {
      x = canvas.width - metrics.width - 20;
    }

    ctx.strokeText(options.text, x, y);
    ctx.fillText(options.text, x, y);

    const blob = await canvasToBlob(canvas, "image/png");
    return {
      blob,
      fileName: `${getBaseName(file.name)}-watermarked.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
