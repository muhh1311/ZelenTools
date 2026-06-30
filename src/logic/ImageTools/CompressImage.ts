import imageCompression from "browser-image-compression";
import { type ProcessedImage, getBaseName, processFilesWithProgress } from "./imageUtils";

export interface CompressOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  quality: number;
}

export async function compressImages(
  files: File[],
  options: CompressOptions,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  return processFilesWithProgress(files, async (file) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: options.maxSizeMB,
      maxWidthOrHeight: options.maxWidthOrHeight,
      initialQuality: options.quality / 100,
      useWebWorker: true,
    });

    const ext = file.name.match(/\.[^/.]+$/)?.[0] ?? ".jpg";
    return {
      blob: compressed,
      fileName: `${getBaseName(file.name)}-compressed${ext}`,
      originalName: file.name,
      size: compressed.size,
    };
  }, onProgress);
}
