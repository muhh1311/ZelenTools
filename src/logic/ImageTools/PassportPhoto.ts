import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

const PASSPORT_SIZE = 600;

export async function createPassportPhotos(
  files: File[],
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const size = Math.min(img.naturalWidth, img.naturalHeight);
    const sx = (img.naturalWidth - size) / 2;
    const sy = (img.naturalHeight - size) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = PASSPORT_SIZE;
    canvas.height = PASSPORT_SIZE;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, PASSPORT_SIZE, PASSPORT_SIZE);
    ctx.drawImage(img, sx, sy, size, size, 0, 0, PASSPORT_SIZE, PASSPORT_SIZE);

    const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
    return {
      blob,
      fileName: `${getBaseName(file.name)}-passport.jpg`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
