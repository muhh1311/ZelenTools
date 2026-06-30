import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export interface MemeOptions {
  topText: string;
  bottomText: string;
  fontSize: number;
}

function drawMemeText(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  canvasWidth: number,
  fontSize: number
) {
  if (!text.trim()) return;
  ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
  ctx.textAlign = "center";
  ctx.lineWidth = fontSize / 10;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#ffffff";
  const upper = text.toUpperCase();
  ctx.strokeText(upper, canvasWidth / 2, y);
  ctx.fillText(upper, canvasWidth / 2, y);
}

export async function generateMemes(
  files: File[],
  options: MemeOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    drawMemeText(ctx, options.topText, options.fontSize + 10, canvas.width, options.fontSize);
    drawMemeText(
      ctx,
      options.bottomText,
      canvas.height - 10,
      canvas.width,
      options.fontSize
    );

    const blob = await canvasToBlob(canvas, "image/png");
    return {
      blob,
      fileName: `${getBaseName(file.name)}-meme.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
