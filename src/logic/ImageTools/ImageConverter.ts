export type OutputFormat = "png" | "jpg" | "webp";

export interface ConvertedImage {
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

function getMimeType(format: OutputFormat): string {
  if (format === "png") return "image/png";
  if (format === "jpg") return "image/jpeg";
  return "image/webp";
}

export function convertImage(
  file: File,
  format: OutputFormat,
  quality = 0.92
): Promise<ConvertedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      if (format === "jpg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Conversion failed"));
            return;
          }

          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const ext = format === "jpg" ? "jpg" : format;

          resolve({
            blob,
            fileName: `${baseName}.${ext}`,
            originalName: file.name,
            size: blob.size,
          });
        },
        getMimeType(format),
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to load ${file.name}`));
    };

    img.src = objectUrl;
  });
}

export async function convertImages(
  files: File[],
  format: OutputFormat,
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<ConvertedImage[]> {
  const results: ConvertedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, Math.round((i / files.length) * 100), file);

    const result = await convertImage(file, format);
    results.push(result);

    onProgress?.(i + 1, Math.round(((i + 1) / files.length) * 100), file);
  }

  return results;
}

export function downloadConvertedImage(result: ConvertedImage): void {
  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = result.fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadConvertedImagesAsZip(
  results: ConvertedImage[],
  zipName = "converted-images.zip"
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  results.forEach((result) => {
    zip.file(result.fileName, result.blob);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = zipName;
  anchor.click();
  URL.revokeObjectURL(url);
}
