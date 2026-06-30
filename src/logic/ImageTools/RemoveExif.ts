import {
  type ProcessedImage,
  getBaseName,
  loadImageFromFile,
  canvasToBlob,
  processFilesWithProgress,
} from "./imageUtils";

export async function removeExifMetadata(
  files: File[],
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);

    return {
      blob,
      fileName: `${getBaseName(file.name)}-no-exif.jpg`,
      originalName: file.name,
      size: blob.size,
    };
  }, onProgress);
}
