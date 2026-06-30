import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export type RotateDegrees = 90 | 180 | 270;

export async function rotateImages(
  files: File[],
  degrees: RotateDegrees,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    if (degrees === 90 || degrees === 270) {
      canvas.width = img.naturalHeight;
      canvas.height = img.naturalWidth;
    } else {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    const blob = await canvasToBlob(canvas, "image/png");
    return {
      blob,
      fileName: `${getBaseName(file.name)}-rotated-${degrees}.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
