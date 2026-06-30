import { type ProcessedImage, getBaseName } from "./imageUtils";

export interface OcrResult extends ProcessedImage {
  text: string;
}

export async function extractTextFromImages(
  files: File[],
  onProgress?: (fileIndex: number, percent: number, file: File) => void
): Promise<OcrResult[]> {
  const { createWorker } = await import("tesseract.js");
  const results: OcrResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, Math.round((i / files.length) * 100), file);

    const worker = await createWorker("eng");
    try {
      const { data } = await worker.recognize(file);
      const text = data.text.trim();
      results.push({
        blob: new Blob([text], { type: "text/plain" }),
        fileName: `${getBaseName(file.name)}-text.txt`,
        originalName: file.name,
        size: text.length,
        text,
      });
    } finally {
      await worker.terminate();
    }

    onProgress?.(i + 1, Math.round(((i + 1) / files.length) * 100), file);
  }

  return results;
}
