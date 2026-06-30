export interface ProcessedImage {
  blob: Blob;
  fileName: string;
  originalName: string;
  size: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load ${file.name}`));
    };
    img.src = url;
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType = "image/png",
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
      mimeType,
      quality
    );
  });
}

export function getBaseName(fileName: string): string {
  return fileName.replace(/\.[^/.]+$/, "");
}

export async function fileToProcessedImage(
  file: File,
  draw: (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => void,
  outputName?: string,
  mimeType = "image/png",
  quality = 0.92
): Promise<ProcessedImage> {
  const img = await loadImageFromFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  draw(ctx, img, canvas);
  const blob = await canvasToBlob(canvas, mimeType, quality);

  return {
    blob,
    fileName: outputName ?? `${getBaseName(file.name)}.png`,
    originalName: file.name,
    size: blob.size,
  };
}

export async function processFilesWithProgress(
  files: File[],
  processor: (file: File) => Promise<ProcessedImage>,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ProcessedImage[]> {
  const results: ProcessedImage[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, Math.round((i / files.length) * 100), file);
    results.push(await processor(file));
    onProgress?.(i + 1, Math.round(((i + 1) / files.length) * 100), file);
  }
  return results;
}

export function downloadProcessedImage(result: ProcessedImage): void {
  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = result.fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadProcessedImagesAsZip(
  results: ProcessedImage[],
  zipName = "processed-images.zip"
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  results.forEach((result) => zip.file(result.fileName, result.blob));
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = zipName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadResults(results: ProcessedImage[], zipName?: string): Promise<void> {
  if (results.length === 1) {
    downloadProcessedImage(results[0]);
  } else {
    await downloadProcessedImagesAsZip(results, zipName);
  }
}
