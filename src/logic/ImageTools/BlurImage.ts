import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export async function blurImages(
  files: File[],
  radius: number,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `blur(${radius}px)`;
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-blur.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}

export async function grayscaleImages(
  files: File[],
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = "grayscale(100%)";
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-grayscale.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}

export async function sepiaImages(
  files: File[],
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = "sepia(100%)";
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");

    return {
      blob,
      fileName: `${getBaseName(file.name)}-sepia.png`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
