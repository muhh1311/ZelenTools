import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export type FlipDirection = "horizontal" | "vertical";

export async function flipImages(
  files: File[],
  direction: FlipDirection,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;

    if (direction === "horizontal") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }

    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-flipped-${direction}.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
